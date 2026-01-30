/**
 * =====================================================
 * RAED | رائد - Dashboard Logic
 * =====================================================
 */

// =====================================================
// STATE
// =====================================================

let currentFilter = 'all';
let allOrders = [];

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
            window.location.href = 'index.html';
        }, 1500);
        return;
    }
    
    // Initialize dashboard
    initDashboard();
});

/**
 * Initialize dashboard
 */
function initDashboard() {
    renderProfile();
    loadOrders();
    setupNavigation();
    setupFilters();
    setupEditProfileForm();
    
    // Check hash for initial section
    const hash = window.location.hash.slice(1);
    if (hash === 'orders') {
        showSection('orders');
    }
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
// NAVIGATION
// =====================================================

/**
 * Setup sidebar navigation
 */
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            showSection(section);
            
            // Update URL hash
            history.pushState(null, '', `#${section}`);
        });
    });
    
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1);
        if (hash === 'profile' || hash === 'orders') {
            showSection(hash);
        }
    });
}

/**
 * Show specific section
 */
function showSection(sectionName) {
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.section === sectionName);
    });
    
    // Update sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(`${sectionName}Section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// =====================================================
// PROFILE
// =====================================================

/**
 * Render user profile
 */
function renderProfile() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    
    // Profile card
    document.getElementById('profileAvatar').textContent = user.firstName.charAt(0);
    document.getElementById('profileName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('profileEmail').textContent = user.email;
    
    // Profile details
    document.getElementById('profileFirstName').textContent = user.firstName;
    document.getElementById('profileLastName').textContent = user.lastName;
    document.getElementById('profilePhone').textContent = user.phone;
    document.getElementById('profileEmailDetail').textContent = user.email;
    document.getElementById('profileCreatedAt').textContent = formatDate(user.createdAt);
}

/**
 * Show edit profile modal
 */
function showEditProfileModal() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    
    // Populate form
    document.getElementById('editFirstName').value = user.firstName;
    document.getElementById('editLastName').value = user.lastName;
    document.getElementById('editPhone').value = user.phone;
    
    // Show modal
    document.getElementById('editProfileModal').classList.add('is-open');
    document.body.classList.add('no-scroll');
}

/**
 * Hide edit profile modal
 */
function hideEditProfileModal() {
    document.getElementById('editProfileModal').classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    document.getElementById('editProfileError').textContent = '';
}

/**
 * Setup edit profile form
 */
function setupEditProfileForm() {
    const form = document.getElementById('editProfileForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const data = {
            firstName: document.getElementById('editFirstName').value,
            lastName: document.getElementById('editLastName').value,
            phone: document.getElementById('editPhone').value
        };
        
        try {
            await Auth.updateProfile(data);
            hideEditProfileModal();
            renderProfile();
            showToast('تم تحديث البيانات بنجاح ✓', 'success');
        } catch (error) {
            document.getElementById('editProfileError').textContent = error.message;
        }
    });
}

// =====================================================
// ORDERS
// =====================================================

/**
 * Load user orders
 */
function loadOrders() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    
    try {
        const ordersKey = 'raed_orders';
        const orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
        
        // Filter orders for current user
        allOrders = orders.filter(order => order.userId === user.id);
        
        // Sort by date (newest first)
        allOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        // Update stats
        updateStats();
        
        // Render orders
        renderOrders();
        
    } catch (e) {
        console.error('Error loading orders:', e);
        allOrders = [];
    }
}

/**
 * Update stats cards
 */
function updateStats() {
    const total = allOrders.length;
    const pending = allOrders.filter(o => o.status === 'pending').length;
    const completed = allOrders.filter(o => o.status === 'completed').length;
    
    document.getElementById('totalOrders').textContent = total;
    document.getElementById('pendingOrders').textContent = pending;
    document.getElementById('completedOrders').textContent = completed;
    
    // Update orders badge
    const badge = document.getElementById('ordersBadge');
    if (badge) {
        if (pending > 0) {
            badge.textContent = pending;
            badge.classList.add('has-orders');
        } else {
            badge.classList.remove('has-orders');
        }
    }
}

/**
 * Setup filter buttons
 */
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderOrders();
        });
    });
}

/**
 * Render orders list
 */
function renderOrders() {
    const container = document.getElementById('ordersList');
    const emptyState = document.getElementById('emptyOrdersState');
    
    if (!container) return;
    
    // Filter orders
    let filteredOrders = allOrders;
    if (currentFilter !== 'all') {
        filteredOrders = allOrders.filter(o => o.status === currentFilter);
    }
    
    // Show empty state if no orders
    if (filteredOrders.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    container.style.display = 'flex';
    emptyState.style.display = 'none';
    
    const statusMap = {
        'pending': { text: 'قيد المراجعة', icon: '⏳' },
        'in_progress': { text: 'قيد التنفيذ', icon: '🔄' },
        'completed': { text: 'مكتمل', icon: '✅' },
        'cancelled': { text: 'ملغي', icon: '❌' }
    };
    
    container.innerHTML = filteredOrders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <span class="order-number">${order.orderNumber}</span>
                <span class="order-date">${formatDate(order.createdAt)}</span>
            </div>
            <div class="order-body">
                <div class="order-services">
                    ${order.items.map(item => `
                        <span class="service-tag">
                            <span>${item.serviceIcon}</span>
                            ${item.serviceName}
                        </span>
                    `).join('')}
                </div>
                <div class="order-meta">
                    <span class="order-total">${order.total} ريال</span>
                    <span class="order-status ${order.status}">
                        ${statusMap[order.status]?.icon || '📦'}
                        ${statusMap[order.status]?.text || order.status}
                    </span>
                </div>
            </div>
            <div class="order-footer">
                <button class="btn-view-order" onclick="showOrderDetails('${order.orderNumber}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    عرض التفاصيل
                </button>
            </div>
        </div>
    `).join('');
}

/**
 * Show order details modal
 */
function showOrderDetails(orderNumber) {
    const order = allOrders.find(o => o.orderNumber === orderNumber);
    if (!order) return;
    
    const statusMap = {
        'pending': { text: 'قيد المراجعة', class: 'pending' },
        'in_progress': { text: 'قيد التنفيذ', class: 'in_progress' },
        'completed': { text: 'مكتمل', class: 'completed' },
        'cancelled': { text: 'ملغي', class: 'cancelled' }
    };
    
    const paymentMap = {
        'bank': 'تحويل بنكي',
        'online': 'دفع إلكتروني'
    };
    
    const contactMap = {
        'whatsapp': 'واتساب',
        'email': 'بريد إلكتروني',
        'phone': 'اتصال هاتفي'
    };
    
    const content = document.getElementById('orderDetailsContent');
    content.innerHTML = `
        <div class="order-details-header">
            <h2>
                📦 الطلب رقم 
                <span class="order-id">${order.orderNumber}</span>
            </h2>
            <span class="order-status ${statusMap[order.status]?.class}">
                ${statusMap[order.status]?.text || order.status}
            </span>
        </div>
        
        <div class="order-details-body">
            <div class="order-detail-section">
                <h3>الخدمات المطلوبة</h3>
                <div class="order-items-list">
                    ${order.items.map(item => `
                        <div class="order-item-row">
                            <div class="order-item-name">
                                <span class="order-item-icon">${item.serviceIcon}</span>
                                <span>${item.serviceName}</span>
                                <span style="color: var(--text-muted)">×${item.quantity}</span>
                            </div>
                            <span class="order-item-price">${item.servicePrice * item.quantity} ريال</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="order-detail-section">
                <h3>معلومات الطلب</h3>
                <div class="order-info-grid">
                    <div class="order-info-item">
                        <label>تاريخ الطلب</label>
                        <span>${formatDate(order.createdAt)}</span>
                    </div>
                    <div class="order-info-item">
                        <label>طريقة الدفع</label>
                        <span>${paymentMap[order.paymentMethod] || order.paymentMethod}</span>
                    </div>
                    <div class="order-info-item">
                        <label>طريقة التواصل</label>
                        <span>${contactMap[order.contactMethod] || order.contactMethod}</span>
                    </div>
                    <div class="order-info-item">
                        <label>الحالة</label>
                        <span class="order-status ${statusMap[order.status]?.class}" style="padding: 0;">
                            ${statusMap[order.status]?.text || order.status}
                        </span>
                    </div>
                </div>
            </div>
            
            ${order.notes ? `
                <div class="order-detail-section">
                    <h3>ملاحظات</h3>
                    <p style="color: var(--text-dim); padding: var(--space-sm); background: rgba(255,255,255,0.03); border-radius: var(--radius-sm);">
                        ${order.notes}
                    </p>
                </div>
            ` : ''}
            
            <div class="order-total-row">
                <span>المبلغ الإجمالي</span>
                <span>${order.total} ريال</span>
            </div>
        </div>
    `;
    
    document.getElementById('orderDetailsModal').classList.add('is-open');
    document.body.classList.add('no-scroll');
}

/**
 * Hide order details modal
 */
function hideOrderDetailsModal() {
    document.getElementById('orderDetailsModal').classList.remove('is-open');
    document.body.classList.remove('no-scroll');
}

// =====================================================
// UTILITIES
// =====================================================

/**
 * Format date to Arabic locale
 */
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (e) {
        return dateString;
    }
}

// Close modals on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideEditProfileModal();
        hideOrderDetailsModal();
    }
});
