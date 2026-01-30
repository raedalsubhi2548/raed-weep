/**
 * =====================================================
 * RAED | رائد - Checkout Page Logic
 * =====================================================
 */

// =====================================================
// STATE
// =====================================================

let currentStep = 1;
let orderData = null;

// =====================================================
// INITIALIZATION
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    // Generate stars background
    generateStars();
    
    // Check if user is logged in
    if (!Auth.isLoggedIn()) {
        showToast('يجب تسجيل الدخول أولاً', 'error');
        setTimeout(() => {
            window.location.href = 'index.html#services';
        }, 1500);
        return;
    }
    
    // Check if cart is empty
    if (Cart.isEmpty()) {
        showToast('السلة فارغة!', 'error');
        setTimeout(() => {
            window.location.href = 'index.html#services';
        }, 1500);
        return;
    }
    
    // Initialize checkout
    initCheckout();
});

/**
 * Initialize checkout page
 */
function initCheckout() {
    renderCartItems();
    renderUserInfo();
    setupPaymentMethods();
    updateTotals();
}

/**
 * Generate stars for background
 */
function generateStars() {
    const container = document.getElementById('stars');
    if (!container) return;
    
    for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'star' + (Math.random() > 0.9 ? ' big' : '');
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--dur', (2 + Math.random() * 4) + 's');
        star.style.setProperty('--del', (Math.random() * 3) + 's');
        container.appendChild(star);
    }
}

// =====================================================
// STEP NAVIGATION
// =====================================================

/**
 * Go to specific step
 */
function goToStep(step) {
    // Validate before moving forward
    if (step > currentStep) {
        if (!validateStep(currentStep)) {
            return;
        }
    }
    
    // Update steps UI
    document.querySelectorAll('.step').forEach((el, index) => {
        el.classList.remove('active', 'completed');
        if (index + 1 < step) {
            el.classList.add('completed');
        } else if (index + 1 === step) {
            el.classList.add('active');
        }
    });
    
    // Update content
    document.querySelectorAll('.checkout-step-content').forEach((el, index) => {
        el.classList.remove('active');
        if (index + 1 === step) {
            el.classList.add('active');
        }
    });
    
    currentStep = step;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Validate step before proceeding
 */
function validateStep(step) {
    switch (step) {
        case 1:
            if (Cart.isEmpty()) {
                showToast('السلة فارغة!', 'error');
                return false;
            }
            return true;
            
        case 2:
            // Order details are optional
            return true;
            
        case 3:
            const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
            if (!selectedPayment) {
                showToast('يرجى اختيار طريقة الدفع', 'error');
                return false;
            }
            return true;
            
        default:
            return true;
    }
}

// =====================================================
// RENDER FUNCTIONS
// =====================================================

/**
 * Render cart items in checkout
 */
function renderCartItems() {
    const container = document.getElementById('checkoutCartItems');
    if (!container) return;
    
    const items = Cart.getCart();
    
    container.innerHTML = items.map(item => `
        <div class="checkout-cart-item">
            <div class="checkout-item-icon">${item.serviceIcon}</div>
            <div class="checkout-item-info">
                <div class="checkout-item-name">${item.serviceName}</div>
                <div class="checkout-item-qty">الكمية: ${item.quantity}</div>
            </div>
            <div class="checkout-item-price">${item.servicePrice * item.quantity} ريال</div>
        </div>
    `).join('');
}

/**
 * Render user info
 */
function renderUserInfo() {
    const container = document.getElementById('userInfoCard');
    if (!container) return;
    
    const user = Auth.getCurrentUser();
    if (!user) return;
    
    container.innerHTML = `
        <div class="user-info-header">
            <div class="user-info-avatar">${user.firstName.charAt(0)}</div>
            <div class="user-info-name">${user.firstName} ${user.lastName}</div>
        </div>
        <div class="user-info-details">
            <div class="user-info-item">
                <label>الجوال</label>
                <span>${user.phone}</span>
            </div>
            <div class="user-info-item">
                <label>البريد الإلكتروني</label>
                <span>${user.email}</span>
            </div>
        </div>
    `;
}

/**
 * Update totals
 */
function updateTotals() {
    const total = Cart.getCartTotal();
    
    const subtotalEl = document.getElementById('checkoutSubtotal');
    const totalEl = document.getElementById('checkoutTotal');
    const finalTotalEl = document.getElementById('finalTotal');
    
    if (subtotalEl) subtotalEl.textContent = `${total} ريال`;
    if (totalEl) totalEl.textContent = `${total} ريال`;
    if (finalTotalEl) finalTotalEl.textContent = `${total} ريال`;
}

// =====================================================
// PAYMENT METHODS
// =====================================================

/**
 * Setup payment method selection
 */
function setupPaymentMethods() {
    const methods = document.querySelectorAll('.payment-method');
    
    methods.forEach(method => {
        method.addEventListener('click', () => {
            // Prevent selecting "coming soon" methods
            if (method.querySelector('.coming-soon')) {
                showToast('هذه الطريقة غير متاحة حالياً', 'info');
                return;
            }
            
            // Update selection
            methods.forEach(m => m.classList.remove('selected'));
            method.classList.add('selected');
            method.querySelector('input').checked = true;
            
            // Show/hide bank details
            const bankDetails = document.getElementById('bankDetails');
            if (bankDetails) {
                bankDetails.style.display = method.dataset.method === 'bank' ? 'block' : 'none';
            }
        });
    });
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('تم النسخ ✓', 'success');
    }).catch(() => {
        showToast('فشل النسخ', 'error');
    });
}

// =====================================================
// CONFIRM ORDER
// =====================================================

/**
 * Confirm and place order
 */
function confirmOrder() {
    const user = Auth.getCurrentUser();
    if (!user) {
        showToast('يجب تسجيل الدخول', 'error');
        return;
    }
    
    // Get form data
    const notes = document.getElementById('orderNotes')?.value || '';
    const contactMethod = document.querySelector('input[name="contactMethod"]:checked')?.value || 'whatsapp';
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'bank';
    
    // Create order
    orderData = {
        orderNumber: generateOrderNumber(),
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userEmail: user.email,
        userPhone: user.phone,
        items: Cart.getCart(),
        total: Cart.getCartTotal(),
        notes,
        contactMethod,
        paymentMethod,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    // Save order
    saveOrder(orderData);
    
    // Clear cart
    Cart.clearCart();
    
    // Render confirmation
    renderConfirmation();
    
    // Go to confirmation step
    goToStep(4);
}

/**
 * Generate unique order number
 */
function generateOrderNumber() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `RD-${timestamp}-${random}`;
}

/**
 * Save order to localStorage
 */
function saveOrder(order) {
    try {
        const ordersKey = 'raed_orders';
        const orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
        orders.push(order);
        localStorage.setItem(ordersKey, JSON.stringify(orders));
    } catch (e) {
        console.error('Error saving order:', e);
    }
}

/**
 * Render order confirmation
 */
function renderConfirmation() {
    const container = document.getElementById('orderConfirmationDetails');
    if (!container || !orderData) return;
    
    const statusMap = {
        'pending': 'قيد المراجعة',
        'in_progress': 'قيد التنفيذ',
        'completed': 'مكتمل',
        'cancelled': 'ملغي'
    };
    
    const paymentMap = {
        'bank': 'تحويل بنكي',
        'online': 'دفع إلكتروني'
    };
    
    container.innerHTML = `
        <div class="order-detail-row order-number">
            <span>رقم الطلب:</span>
            <span>${orderData.orderNumber}</span>
        </div>
        <div class="order-detail-row">
            <span>التاريخ:</span>
            <span>${new Date(orderData.createdAt).toLocaleDateString('ar-SA')}</span>
        </div>
        <div class="order-detail-row">
            <span>الخدمات:</span>
            <span>${orderData.items.map(i => i.serviceName).join('، ')}</span>
        </div>
        <div class="order-detail-row">
            <span>المبلغ الإجمالي:</span>
            <span>${orderData.total} ريال</span>
        </div>
        <div class="order-detail-row">
            <span>طريقة الدفع:</span>
            <span>${paymentMap[orderData.paymentMethod]}</span>
        </div>
        <div class="order-detail-row">
            <span>الحالة:</span>
            <span>${statusMap[orderData.status]}</span>
        </div>
    `;
    
    // Update WhatsApp link
    const whatsappLink = document.getElementById('whatsappOrderLink');
    if (whatsappLink) {
        const message = encodeURIComponent(`مرحباً، قمت بإتمام طلب جديد\n\nرقم الطلب: ${orderData.orderNumber}\nالمبلغ: ${orderData.total} ريال\n\nأرفق صورة إيصال التحويل`);
        whatsappLink.href = `https://wa.me/966536090915?text=${message}`;
    }
}
