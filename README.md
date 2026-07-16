# Colack: Premium AI Engineering Marketplace

Colack is a premium, high-fidelity e-commerce storefront engineered specifically for AI builders, machine learning researchers, and hardware enthusiasts. The application integrates dynamic catalog filters, localized checkout streams, orders history logs, a custom Python admin catalog manager, and a secure client-side Firebase Authentication interface.

---

## ⚡ Key Features

*   **Indian Rupee (INR / ₹) Currency Localization**: All pricing across home, shop, cart, checkout, and order history pages is formatted natively under the `en-IN` Indian standard grouping system.
*   **High-Resolution Product Imagery**: Fully populated with real tech assets hosted on Unsplash (RTX 4090, H100s, low-profile keyboards, deep learning books) instead of placeholder icons.
*   **Secure Route Guards**: The storefront blocks unauthorized guests from accessing index, shop, catalog, cart, checkout, or orders pages, redirecting unauthenticated traffic to the secure auth gateway.
*   **4 Authentication Methods**: Fully integrated with **Firebase Authentication**:
    *   *Credentials*: Email & Password signup and login (includes forgot-password email flows).
    *   *Passwordless*: Magic Email links (with simulated falls for quick local developer test cycles).
    *   *OAuth*: Google Popup authentication.
    *   *Guest Mode*: Anonymous user login.
*   **Catalog Manager (Admin Portal)**: A private page (`/admin.html`) linked to a local Python CRUD server to add products, delete products, or restore catalog defaults.
*   **Order History History**: Dynamically saves purchase order logs on checkout success and presents them on a unified orders history dashboard.

---

## 📂 Project Architecture

```
├── index.html            # Main Landing Page / Bento Grid Featured Categories
├── shop.html             # Advanced Product Filter, Search, and Catalog grid
├── product-detail.html   # Detailed specifications & features populator
├── cart.html             # Subtotal calculations and quantity selectors
├── checkout.html         # Shipping info form, payment tab, and spinner simulation
├── orders.html           # Historical order receipt list
├── admin.html            # Standalone developer CRUD Catalog Manager
├── login.html            # Tabbed Sign-In gateway
├── signup.html           # User Account Registration
├── forgot-password.html  # Password recovery mail triggers
├── brand.js              # Core module: router guards, cart state, global navigation
├── firebase-config.js    # Firebase SDK initialization parameters
├── products.json         # Master products database file
└── server.py             # Python SimpleHTTP CRUD developer server
```

---

## 🚀 Local Development & Setup

To run and preview the marketplace locally (which is required for Google Popup Auth and the local Catalog Manager APIs):

1. **Start the local Dev Server**:
   Make sure you have Python 3 installed, then execute:
   ```bash
   python server.py
   ```
2. **Open the Storefront**:
   Go to: **[http://localhost:3000](http://localhost:3000)** (you will be redirected to log in first).
3. **Open the Catalog Manager**:
   Go to: **[http://localhost:3000/admin.html](http://localhost:3000/admin.html)** to manage products.

---

## 🌐 Hosting Storefront on GitHub Pages

Since the storefront is static-based (HTML, JS, CSS), you can host it for free on **GitHub Pages**:

### Step 1: Enable GitHub Pages in your Repository
1. Go to your repository on GitHub: **[https://github.com/amandeepintl/Cloack](https://github.com/amandeepintl/Cloack)**.
2. Select **Settings** (top bar) -> **Pages** (left sidebar).
3. Under **Build and deployment**, set the source to **Deploy from a branch**.
4. Select the **`main`** branch and directory **`/ (root)`**, then click **Save**.
5. After 1-2 minutes, your hosted URL will be ready at:  
   `https://amandeepintl.github.io/Cloack/`

### Step 2: Authorize your Hosted Domain in Firebase
To allow your Google Login popups and Magic Link redirects to work on the hosted domain:
1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Select your project **`cloack-fb1c8`**.
3. Go to **Authentication** (left sidebar) -> **Settings** (top tab) -> **Authorized Domains**.
4. Click **Add Domain** and enter:
   `amandeepintl.github.io`
5. Save changes. Your hosted authentication flows are now fully secure and active!
