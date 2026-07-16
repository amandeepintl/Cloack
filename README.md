# Cloack

A minimal e-commerce marketplace for AI engineering hardware and books. Built with a client-side Firebase Auth configuration, local storage cart states, and a local Python server for editing the catalog database.

## Features

- **INR Pricing**: Prices formatted in Indian Rupees (₹) across the storefront.
- **Firebase Auth**: Supports standard Credentials, passwordless Magic Links, Google Popup sign-in, and anonymous guest sessions. Redirect guards are enabled to block unauthorized navigation.
- **Order History**: Logs purchase items into localStorage on checkout and displays them on a dedicated orders dashboard (`/orders.html`).
- **Catalog CRUD**: An admin helper page (`/admin.html`) connected to a zero-dependency Python backend server to add/remove products or restore catalog presets.
- **Auto-Checkout**: Includes a quick auto-fill and submit button in checkout for rapid transaction testing.

## Local Setup

Start the developer server to run the storefront and local APIs:

```bash
python server.py
```

The site will be available at: **http://localhost:3000**

## Project Files

- `index.html` - Homepage and featured catalog
- `shop.html` - Grid with category and brand filters
- `product-detail.html` - Detailed technical specification view
- `cart.html` - Cart summary and quantity controls
- `checkout.html` - Shipping details and payment form
- `orders.html` - Completed order records log
- `admin.html` - Product CRUD portal
- `brand.js` - Global navigation, route guards, cart helpers, and auth state
- `firebase-config.js` - Firebase config credentials
- `products.json` - Active products database
- `server.py` - Python local CRUD web server

## Hosting on GitHub Pages

1. In your GitHub repository settings, go to the **Pages** tab.
2. Under **Build and deployment**, select the `main` branch and `/ (root)` directory, then save.
3. In your **Firebase Console** (Auth -> Settings -> Authorized Domains), add `amandeepintl.github.io` to allow Google Login and Magic Links to redirect correctly on your hosted URL.
