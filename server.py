import http.server
import socketserver
import os
import json

PORT = 3000

class SecureDevServerHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Set basic headers for development convenience and local testing
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def translate_path(self, path):
        # Serve index.html if pointing to root /
        path = super().translate_path(path)
        if os.path.isdir(path):
            index_path = os.path.join(path, "index.html")
            if os.path.exists(index_path):
                return index_path
        return path

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/add-product':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            product = json.loads(post_data.decode('utf-8'))
            
            # Load existing products
            products_list = self.load_products_list()
            
            if isinstance(product, list):
                # Bulk save / Restore defaults
                products_list = product
            else:
                # Remove existing product with same ID to avoid duplicates
                products_list = [p for p in products_list if p['id'] != product['id']]
                products_list.append(product)
            
            # Save products
            self.save_products_list(products_list)
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "success", "message": "Product added successfully"}).encode('utf-8'))
            
        elif self.path == '/api/delete-product':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            req_data = json.loads(post_data.decode('utf-8'))
            prod_id = req_data.get('id')
            
            # Load and filter
            products_list = self.load_products_list()
            products_list = [p for p in products_list if p['id'] != prod_id]
            
            # Save
            self.save_products_list(products_list)
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "success", "message": "Product deleted successfully"}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

    def load_products_list(self):
        if os.path.exists('products.json'):
            try:
                with open('products.json', 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception:
                pass
        return []

    def save_products_list(self, products_list):
        # Save to products.json
        with open('products.json', 'w', encoding='utf-8') as f:
            json.dump(products_list, f, indent=4)
            
        # Update brand.js
        if os.path.exists('brand.js'):
            try:
                with open('brand.js', 'r', encoding='utf-8') as f:
                    content = f.read()
                if "// PRODUCTS_START" in content and "// PRODUCTS_END" in content:
                    parts = content.split("// PRODUCTS_START")
                    prefix = parts[0] + "// PRODUCTS_START\n"
                    suffix = "\n// PRODUCTS_END" + parts[1].split("// PRODUCTS_END")[1]
                    
                    js_array_str = f"export const products = {json.dumps(products_list, indent=4)};"
                    new_content = prefix + js_array_str + suffix
                    
                    with open('brand.js', 'w', encoding='utf-8') as f:
                        f.write(new_content)
            except Exception as e:
                print("Error writing to brand.js:", e)

if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), SecureDevServerHandler) as httpd:
        print("==================================================")
        print("Colack Startup Dev Server running at:")
        print(f"http://localhost:{PORT}")
        print("==================================================")
        print("CORS, Dynamic API, and authentication active.")
        print("Press Ctrl+C to terminate the server process.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer shutdown successfully.")
