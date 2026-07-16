// Colack Core Brand and Security Module
import { auth, onAuthStateChanged, signOut } from './firebase-config.js';

// PRODUCTS_START
export const products = [
    {
        id: 'prod_1',
        name: 'GeForce RTX 4090 Founders Edition',
        brand: 'NVIDIA',
        category: 'hardware',
        price: 149999.00,
        rating: 4.9,
        reviews: 128,
        badge: 'Limited Stock',
        img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'prod_2',
        name: 'Deep Learning (Adaptive Computation)',
        brand: "O'Reilly",
        category: 'books',
        price: 4999.00,
        rating: 4.8,
        reviews: 254,
        badge: 'Best Seller',
        img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'prod_12',
        name: 'NVIDIA H100 Tensor Core GPU PCIe',
        brand: 'NVIDIA',
        category: 'hardware',
        price: 2500000.00,
        rating: 5.0,
        reviews: 14,
        badge: 'AI Enterprise',
        img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'prod_13',
        name: 'GeForce RTX 4080 Super Founders Edition',
        brand: 'NVIDIA',
        category: 'hardware',
        price: 105000.00,
        rating: 4.8,
        reviews: 54,
        badge: 'Popular',
        img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'prod_14',
        name: 'AMD Radeon RX 7900 XTX Elite',
        brand: 'AMD',
        category: 'hardware',
        price: 95000.00,
        rating: 4.7,
        reviews: 29,
        badge: 'RDNA 3',
        img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'prod_15',
        name: 'Designing Data-Intensive Applications',
        brand: "O'Reilly",
        category: 'books',
        price: 1599.00,
        rating: 4.9,
        reviews: 842,
        badge: 'Must Read',
        img: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80'
    }
];
// PRODUCTS_END


// Centralized Cart Logic
export const cart = {
  get() {
    try {
      const data = localStorage.getItem('colack_cart');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("🔒 Security: Failed to parse cart data", e);
      return [];
    }
  },
  save(items) {
    localStorage.setItem('colack_cart', JSON.stringify(items));
    this.updateBadge();
  },
  add(product) {
    // Input sanitization to prevent XSS/injection into cart state
    const cleanProduct = {
      id: String(product.id).replace(/[^\w-]/g, ''),
      name: String(product.name).replace(/[<>&"']/g, ''),
      price: parseFloat(product.price) || 0,
      img: String(product.img),
      quantity: parseInt(product.quantity) || 1,
      category: String(product.category || 'Hardware')
    };

    let items = this.get();
    const existing = items.find(i => i.id === cleanProduct.id);
    if (existing) {
      existing.quantity += cleanProduct.quantity;
    } else {
      items.push(cleanProduct);
    }
    this.save(items);
    showToast(`Added ${cleanProduct.name} to cart!`);
  },
  remove(id) {
    let items = this.get();
    items = items.filter(i => i.id !== id);
    this.save(items);
    showToast("Item removed from cart.", "info");
  },
  updateQuantity(id, qty) {
    let items = this.get();
    const item = items.find(i => i.id === id);
    if (item) {
      item.quantity = Math.max(1, parseInt(qty) || 1);
      this.save(items);
    }
  },
  clear() {
    localStorage.removeItem('colack_cart');
    this.updateBadge();
  },
  count() {
    return this.get().reduce((sum, item) => sum + item.quantity, 0);
  },
  updateBadge() {
    const badge = document.querySelector('[data-icon="shopping_cart"] span, .shopping-cart-badge');
    if (badge) {
      const cnt = this.count();
      badge.textContent = cnt;
      badge.style.display = cnt > 0 ? 'flex' : 'none';
    }
    // Update header total indicator if it exists
    const cartButton = document.querySelector('[data-icon="shopping_cart"]');
    if (cartButton) {
      // Find or create badge count
      let subBadge = cartButton.querySelector('.cart-badge-count');
      if (!subBadge) {
        subBadge = document.createElement('span');
        subBadge.className = 'cart-badge-count absolute -top-1 -right-1 w-4 h-4 bg-secondary text-[10px] text-white flex items-center justify-center rounded-full font-bold';
        cartButton.appendChild(subBadge);
      }
      const cnt = this.count();
      subBadge.textContent = cnt;
      subBadge.style.display = cnt > 0 ? 'flex' : 'none';
    }
  }
};

// Sleek Toast Notification System
export function showToast(message, type = 'success') {
  // Check if container exists, else create it
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg transform translate-x-12 opacity-0 transition-all duration-300 bg-surface text-on-surface border-border-subtle';
  
  // Apply brand colors based on notification type
  let icon = 'info';
  let iconColor = 'text-primary';
  if (type === 'success') {
    icon = 'check_circle';
    iconColor = 'text-success';
    toast.classList.add('border-l-4', 'border-l-success');
  } else if (type === 'error') {
    icon = 'error';
    iconColor = 'text-error';
    toast.classList.add('border-l-4', 'border-l-error');
  } else if (type === 'warning') {
    icon = 'warning';
    iconColor = 'text-secondary';
    toast.classList.add('border-l-4', 'border-l-secondary');
  }

  // Use textContent for safety against XSS injections
  const iconSpan = document.createElement('span');
  iconSpan.className = `material-symbols-outlined ${iconColor}`;
  iconSpan.textContent = icon;

  const textSpan = document.createElement('span');
  textSpan.className = 'font-body-sm text-body-sm text-on-surface font-medium';
  textSpan.textContent = message;

  toast.appendChild(iconSpan);
  toast.appendChild(textSpan);
  container.appendChild(toast);

  // Trigger animation frame
  requestAnimationFrame(() => {
    toast.classList.remove('translate-x-12', 'opacity-0');
  });

  // Automatically dismiss after 4 seconds
  setTimeout(() => {
    toast.classList.add('translate-x-12', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Security Route Guards
function enforceRouteGuards(user) {
  const publicPages = ['login.html', 'signup.html', 'forgot-password.html'];
  const path = window.location.pathname.split('/').pop() || 'index.html';
  
  if (!publicPages.includes(path) && !user) {
    console.warn(`🔒 Security Guard: Access blocked to ${path}. Authentication required.`);
    // Store path in sessionStorage to redirect user back after signing in
    sessionStorage.setItem('redirect_after_auth', path);
    window.location.href = './login.html?error=auth_required';
  }
}

// Dynamic Header User Dropdown & Navigation links
function setupNavigationAndProfile(user) {
  // Hook up logo and shop navigation links if they are present
  const logoLink = document.querySelector('header a[href="/"], header a[href="#"], header a.font-display');
  if (logoLink) {
    logoLink.href = './index.html';
  }

  // Navigation Links
  const navLinks = document.querySelectorAll('header nav a');
  navLinks.forEach(link => {
    const text = link.textContent.trim().toLowerCase();
    if (text === 'shop') {
      link.href = './shop.html';
    } else if (text === 'categories' || text === 'new arrivals' || text === 'deals' || text === 'digital products') {
      link.href = './shop.html?filter=' + text.replace(' ', '-');
    }
  });

  // Hook up Cart icon click
  const cartBtn = document.querySelector('[data-icon="shopping_cart"], button .material-symbols-outlined[textContent="shopping_cart"]');
  if (cartBtn) {
    // Find closest clickable button parent
    const clickableCart = cartBtn.tagName === 'BUTTON' ? cartBtn : cartBtn.closest('button') || cartBtn;
    clickableCart.style.cursor = 'pointer';
    clickableCart.onclick = (e) => {
      e.preventDefault();
      window.location.href = './cart.html';
    };
  }

  // Hook up Profile dropdown
  const targetBtn = document.querySelector('[data-icon="person"]') || 
                    document.querySelector('button[title="Account"]') ||
                    Array.from(document.querySelectorAll('button')).find(btn => btn.querySelector('span')?.textContent.trim() === 'person');
  
  if (targetBtn) {
    const parent = targetBtn.parentNode;
    parent.classList.add('relative');

    // Remove static onclick if any
    targetBtn.removeAttribute('onclick');

    // Create dropdown element
    const dropdown = document.createElement('div');
    dropdown.id = 'profile-dropdown';
    dropdown.className = 'hidden absolute right-0 mt-2 w-56 rounded-lg bg-surface border border-border-subtle shadow-xl z-50 p-2 flex flex-col gap-1 text-left';
    
    // Inject dropdown
    parent.appendChild(dropdown);

    // Toggle dropdown visibility
    targetBtn.onclick = (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('hidden');
    };

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      dropdown.classList.add('hidden');
    });

    dropdown.onclick = (e) => e.stopPropagation();

    // Render dropdown contents based on Auth state
    if (user) {
      // Dynamic initials or guest avatar
      let initials = 'U';
      let subtitle = 'Registered User';
      if (user.isAnonymous) {
        initials = 'G';
        subtitle = 'Anonymous Guest';
      } else if (user.displayName) {
        initials = user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        subtitle = user.email;
      } else if (user.email) {
        initials = user.email[0].toUpperCase();
        subtitle = user.email;
      }

      // Update the header person icon with an initials avatar
      targetBtn.innerHTML = `<div class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs hover:bg-primary-hover transition-colors">${initials}</div>`;

      // Build User Dropdown Menu
      dropdown.innerHTML = `
        <div class="px-3 py-2 border-b border-border-subtle mb-1">
          <p class="font-body-sm font-semibold text-on-surface truncate">${user.displayName || 'Security Account'}</p>
          <p class="font-label-caps text-[10px] text-text-secondary truncate mt-0.5">${subtitle}</p>
        </div>
        <a href="./orders.html" class="flex items-center gap-2 px-3 py-2 font-body-sm text-body-sm text-on-surface hover:bg-surface-secondary rounded-md transition-colors">
          <span class="material-symbols-outlined text-lg">package_2</span>
          My Orders
        </a>
        <a href="./cart.html" class="flex items-center gap-2 px-3 py-2 font-body-sm text-body-sm text-on-surface hover:bg-surface-secondary rounded-md transition-colors">
          <span class="material-symbols-outlined text-lg">shopping_cart</span>
          My Shopping Cart
        </a>
        <button id="signout-button" class="w-full text-left flex items-center gap-2 px-3 py-2 font-body-sm text-body-sm text-error hover:bg-error-container/30 rounded-md transition-colors">
          <span class="material-symbols-outlined text-lg text-error">logout</span>
          Sign Out
        </button>
      `;

      dropdown.querySelector('#signout-button').onclick = async () => {
        try {
          await signOut(auth);
          showToast("Signed out successfully.");
          setTimeout(() => {
            window.location.href = './login.html';
          }, 1000);
        } catch (error) {
          showToast("Failed to sign out: " + error.message, "error");
        }
      };

    } else {
      // Logged out dropdown menu
      targetBtn.innerHTML = `<span class="material-symbols-outlined text-on-surface">person</span>`;
      dropdown.innerHTML = `
        <a href="./login.html" class="flex items-center gap-2 px-3 py-2 font-body-sm text-body-sm text-on-surface hover:bg-surface-secondary rounded-md transition-colors">
          <span class="material-symbols-outlined text-lg">login</span>
          Sign In
        </a>
        <a href="./signup.html" class="flex items-center gap-2 px-3 py-2 font-body-sm text-body-sm text-on-surface hover:bg-surface-secondary rounded-md transition-colors">
          <span class="material-symbols-outlined text-lg">person_add</span>
          Create Account
        </a>
      `;
    }
  }
}

// Initialization of Page elements
document.addEventListener('DOMContentLoaded', () => {
  // Listen to Auth changes securely
  onAuthStateChanged(auth, (user) => {
    // 1. Enforce route guards first
    enforceRouteGuards(user);
    
    // 2. Setup Header profile and Dropdowns
    setupNavigationAndProfile(user);
    
    // 3. Update Cart counts
    cart.updateBadge();
  });

  // Enhance forms with standard security: prevent autocomplete on sensitive parameters
  const pwInputs = document.querySelectorAll('input[type="password"]');
  pwInputs.forEach(i => i.setAttribute('autocomplete', 'new-password'));
});
