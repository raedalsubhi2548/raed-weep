/**
 * =====================================================
 * RAED | رائد - Shopping Cart System
 * E-Commerce Cart Module
 * =====================================================
 */

// =====================================================
// CART STATE & STORAGE
// =====================================================

const CART_STORAGE_KEY = 'raed_cart';
const CART_VERSION = '1.0';

/**
 * Cart Module - IIFE Pattern for encapsulation
 */
const Cart = (function() {
    
    // Private cart data
    let cartItems = [];
    let cartChangeCallbacks = [];
    
    // =====================================================
    // INITIALIZATION
    // =====================================================
    
    function init() {
        loadFromStorage();
        updateCartBadge();
        renderCartDrawer();
        
        // Listen for storage changes from other tabs
        window.addEventListener('storage', (e) => {
            if (e.key === CART_STORAGE_KEY) {
                loadFromStorage();
                notifyCartChange();
            }
        });
    }
    
    // =====================================================
    // STORAGE FUNCTIONS
    // =====================================================
    
    function loadFromStorage() {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed.version === CART_VERSION) {
                    cartItems = parsed.items || [];
                }
            }
        } catch (e) {
            console.error('Error loading cart:', e);
            cartItems = [];
        }
    }
    
    function saveToStorage() {
        try {
            const data = {
                version: CART_VERSION,
                items: cartItems,
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving cart:', e);
        }
    }
    
    // =====================================================
    // CART OPERATIONS
    // =====================================================
    
    /**
     * Add item to cart
     * @param {Object|number} arg - Service object or Service ID
     * @param {string} serviceName - Service name (if first arg is ID)
     * @param {number|string} servicePrice - Service price (if first arg is ID)
     * @param {string} serviceIcon - Service icon (if first arg is ID)
     * @param {number} quantity - Quantity (default 1)
     */
    function addToCart(arg, serviceName, servicePrice, serviceIcon = '📦', quantity = 1) {
        // Handle object parameter format from app.js
        let serviceId, sName, sPrice, sIcon, qty;
        
        if (typeof arg === 'object' && arg !== null) {
            serviceId = arg.serviceId;
            sName = arg.serviceName;
            sPrice = arg.servicePrice;
            sIcon = arg.serviceIcon || '📦';
            qty = arg.quantity || 1;
        } else {
            serviceId = arg;
            sName = serviceName;
            sPrice = servicePrice;
            sIcon = serviceIcon;
            qty = quantity;
        }
        
        // Parse price (handle strings like "250 ريال" or "يبدأ من 250 ريال")
        let numericPrice = 0;
        if (typeof sPrice === 'number') {
            numericPrice = sPrice;
        } else if (typeof sPrice === 'string') {
            const priceMatch = sPrice.match(/(\d+)/);
            numericPrice = priceMatch ? parseFloat(priceMatch[1]) : 0;
        }
        
        // Check if item already exists
        const existingIndex = cartItems.findIndex(item => item.serviceId === serviceId);
        
        if (existingIndex !== -1) {
            // Increment quantity
            cartItems[existingIndex].quantity += qty;
        } else {
            // Add new item
            cartItems.push({
                serviceId,
                serviceName: sName,
                servicePrice: numericPrice,
                servicePriceDisplay: sPrice,
                serviceIcon: sIcon,
                quantity: qty,
                addedAt: new Date().toISOString()
            });
        }
        
        saveToStorage();
        notifyCartChange();
        showToast('تمت الإضافة للسلة ✓', 'success');
        
        // Animate cart icon
        animateCartIcon();
        
        return true;
    }
    
    /**
     * Remove item from cart
     * @param {number} serviceId - Service ID to remove
     */
    function removeFromCart(serviceId) {
        const index = cartItems.findIndex(item => item.serviceId === serviceId);
        
        if (index !== -1) {
            const removedItem = cartItems[index];
            cartItems.splice(index, 1);
            saveToStorage();
            notifyCartChange();
            showToast(`تم إزالة ${removedItem.serviceName}`, 'info');
            return true;
        }
        
        return false;
    }
    
    /**
     * Update item quantity
     * @param {number} serviceId - Service ID
     * @param {number} quantity - New quantity
     */
    function updateQuantity(serviceId, quantity) {
        const item = cartItems.find(item => item.serviceId === serviceId);
        
        if (item) {
            if (quantity <= 0) {
                return removeFromCart(serviceId);
            }
            item.quantity = quantity;
            saveToStorage();
            notifyCartChange();
            return true;
        }
        
        return false;
    }
    
    /**
     * Get all cart items
     */
    function getCart() {
        return [...cartItems];
    }
    
    /**
     * Clear entire cart
     */
    function clearCart() {
        cartItems = [];
        saveToStorage();
        notifyCartChange();
        showToast('تم إفراغ السلة', 'info');
    }
    
    /**
     * Get cart total amount
     */
    function getCartTotal() {
        return cartItems.reduce((total, item) => {
            return total + (item.servicePrice * item.quantity);
        }, 0);
    }
    
    /**
     * Get total items count
     */
    function getCartCount() {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    }
    
    /**
     * Check if cart is empty
     */
    function isEmpty() {
        return cartItems.length === 0;
    }
    
    /**
     * Check if item is in cart
     */
    function isInCart(serviceId) {
        return cartItems.some(item => item.serviceId === serviceId);
    }
    
    // =====================================================
    // CART UI
    // =====================================================
    
    /**
     * Update cart badge count
     */
    function updateCartBadge() {
        // Update floating cart count
        const floatingCount = document.getElementById('floatingCartCount');
        const count = getCartCount();
        
        if (floatingCount) {
            floatingCount.textContent = count;
        }
        
        // Show/hide floating cart
        const floatingCart = document.getElementById('floatingCart');
        if (floatingCart) {
            if (count > 0) {
                floatingCart.classList.add('visible');
            } else {
                floatingCart.classList.remove('visible');
            }
        }
    }
    
    /**
     * Animate cart icon when item added
     */
    function animateCartIcon() {
        const cartBtn = document.getElementById('floatingCartBtn');
        if (cartBtn) {
            cartBtn.classList.add('cart-bounce');
            setTimeout(() => {
                cartBtn.classList.remove('cart-bounce');
            }, 500);
        }
    }
    
    /**
     * Render cart drawer content
     */
    function renderCartDrawer() {
        const cartItems = document.getElementById('cartItems');
        const cartFooter = document.getElementById('cartFooter');
        const cartTotal = document.getElementById('cartTotal');
        
        if (!cartItems) return;
        
        if (getCartCount() === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>السلة فارغة</p>
                </div>
            `;
            if (cartFooter) cartFooter.style.display = 'none';
            return;
        }
        
        if (cartFooter) cartFooter.style.display = 'block';
        
        const items = getCart();
        cartItems.innerHTML = items.map(item => `
            <div class="cart-item" data-id="${item.serviceId}">
                <button class="cart-item-remove" onclick="Cart.removeFromCart(${item.serviceId})">
                    <i class="fas fa-trash"></i>
                </button>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.serviceName}</div>
                    <div class="cart-item-price">${item.servicePrice} ريال</div>
                </div>
            </div>
        `).join('');
        
        // Update total
        if (cartTotal) {
            cartTotal.textContent = `${getCartTotal()} ريال`;
        }
    }
    
    /**
     * Open cart drawer
     */
    function openDrawer() {
        renderCartDrawer();
        const overlay = document.getElementById('cartOverlay');
        const drawer = document.getElementById('cartDrawer');
        
        if (overlay) overlay.classList.add('active');
        if (drawer) drawer.classList.add('open');
        document.body.classList.add('no-scroll');
    }
    
    /**
     * Close cart drawer
     */
    function closeDrawer() {
        const overlay = document.getElementById('cartOverlay');
        const drawer = document.getElementById('cartDrawer');
        
        if (overlay) overlay.classList.remove('active');
        if (drawer) drawer.classList.remove('open');
        document.body.classList.remove('no-scroll');
    }
    
    /**
     * Toggle cart drawer
     */
    function toggleDrawer() {
        const drawer = document.querySelector('.cart-drawer');
        if (drawer && drawer.classList.contains('is-open')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    }
    
    // =====================================================
    // NOTIFICATIONS
    // =====================================================
    
    /**
     * Subscribe to cart changes
     */
    function onChange(callback) {
        if (typeof callback === 'function') {
            cartChangeCallbacks.push(callback);
        }
    }
    
    /**
     * Notify all subscribers of cart change
     */
    function notifyCartChange() {
        updateCartBadge();
        renderCartDrawer();
        cartChangeCallbacks.forEach(cb => cb(getCart()));
    }
    
    // =====================================================
    // PUBLIC API
    // =====================================================
    
    return {
        init,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCart,
        clearCart,
        getCartTotal,
        getCartCount,
        isEmpty,
        isInCart,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        updateCartBadge,
        renderCartDrawer,
        onChange,
        onCartChange: onChange // Alias for firebase-auth.js
    };
    
})();

// =====================================================
// TOAST NOTIFICATION SYSTEM
// =====================================================

function showToast(message, type = 'info', duration = 3000) {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('is-visible'), 10);
    
    // Auto remove
    setTimeout(() => {
        toast.classList.remove('is-visible');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// =====================================================
// CHECKOUT FUNCTIONS
// =====================================================

const Checkout = {
    
    /**
     * Start checkout process
     */
    startCheckout() {
        if (Cart.isEmpty()) {
            showToast('السلة فارغة!', 'error');
            return;
        }
        
        // Check if user is logged in
        if (!Auth.isLoggedIn()) {
            // Show login/register modal
            Auth.showAuthModal('checkout');
            return;
        }
        
        // Navigate to checkout page
        window.location.href = 'checkout.html';
    },
    
    /**
     * Place order
     */
    async placeOrder(notes = '') {
        if (Cart.isEmpty()) {
            showToast('السلة فارغة!', 'error');
            return null;
        }
        
        const user = Auth.getCurrentUser();
        if (!user) {
            showToast('يرجى تسجيل الدخول أولاً', 'error');
            return null;
        }
        
        const orderData = {
            userId: user.id,
            items: Cart.getCart(),
            total: Cart.getCartTotal(),
            notes,
            status: 'pending',
            orderNumber: generateOrderNumber(),
            createdAt: new Date().toISOString()
        };
        
        // In a real app, this would call the API
        // For now, save to localStorage
        saveOrder(orderData);
        
        // Clear cart
        Cart.clearCart();
        
        showToast('تم تأكيد طلبك بنجاح! ✓', 'success');
        
        return orderData;
    }
};

/**
 * Generate unique order number
 */
function generateOrderNumber() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `RD-${timestamp}-${random}`;
}

/**
 * Save order to localStorage (mock database)
 */
function saveOrder(orderData) {
    try {
        const ordersKey = 'raed_orders';
        const orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
        orders.push(orderData);
        localStorage.setItem(ordersKey, JSON.stringify(orders));
    } catch (e) {
        console.error('Error saving order:', e);
    }
}

/**
 * Get user orders from localStorage
 */
function getUserOrders(userId) {
    try {
        const ordersKey = 'raed_orders';
        const orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
        return orders.filter(order => order.userId === userId);
    } catch (e) {
        console.error('Error getting orders:', e);
        return [];
    }
}

/**
 * Get order by ID
 */
function getOrderById(orderNumber) {
    try {
        const ordersKey = 'raed_orders';
        const orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
        return orders.find(order => order.orderNumber === orderNumber);
    } catch (e) {
        console.error('Error getting order:', e);
        return null;
    }
}

// =====================================================
// INITIALIZE ON DOM READY
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    Cart.init();
    
    // Setup floating cart button
    const floatingCartBtn = document.getElementById('floatingCartBtn');
    if (floatingCartBtn) {
        floatingCartBtn.addEventListener('click', () => Cart.openDrawer());
    }
    
    // Setup close cart drawer button
    const closeCartDrawer = document.getElementById('closeCartDrawer');
    if (closeCartDrawer) {
        closeCartDrawer.addEventListener('click', () => Cart.closeDrawer());
    }
    
    // Setup cart overlay
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => Cart.closeDrawer());
    }
    
    // Setup checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.isLoggedIn) {
                if (typeof showToast === 'function') {
                    showToast('يرجى تسجيل الدخول أولاً', 'info');
                }
                Cart.closeDrawer();
                if (typeof openAuthModal === 'function') {
                    setTimeout(openAuthModal, 300);
                }
                return;
            }
            // Navigate to checkout
            window.location.href = 'checkout.html';
        });
    }
});
