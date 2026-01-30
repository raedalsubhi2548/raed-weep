/**
 * =====================================================
 * RAED | رائد - Portal Journey v2
 * Hash-based Routing, No Orbits, Clean UX
 * =====================================================
 */

// =====================================================
// CONFIGURATION
// =====================================================

const CONFIG = {
    whatsapp: '+966536090915',
    email: 'raed@example.com',
    starCount: 80
};

// =====================================================
// SERVICES DATA
// =====================================================

const SERVICES = [
    {
        id: 1,
        title: 'تصميم متجر في سلة',
        subtitle: 'Salla Store',
        icon: '🛒',
        description: 'بناء متجر احترافي بالكامل مع هوية بصرية متناسقة وتجربة مستخدم سلسة.',
        features: [
            'تصميم واجهة احترافية',
            'هوية بصرية متناسقة',
            'تجربة مستخدم سلسة',
            'صفحات المنتجات',
            'جاهز للانطلاق'
        ],
        duration: '5-10 أيام',
        price: 'يبدأ من 250 ريال'
    },
    {
        id: 2,
        title: 'ربط أدوات قوقل',
        subtitle: 'Google Tools',
        icon: '📊',
        description: 'ربط Google Analytics – Google Tag Manager – Google Search Console',
        features: [
            'Google Analytics',
            'Google Tag Manager',
            'Google Search Console',
            'إعداد التتبع الكامل',
            'تقارير الأداء'
        ],
        duration: '1-2 يوم',
        price: 'الأداة الواحدة بـ 75 ريال'
    },
    {
        id: 3,
        title: 'ربط البكسل لمنصات التواصل',
        subtitle: 'Social Pixels',
        icon: '📱',
        description: 'Meta Pixel – TikTok Pixel – Snapchat Pixel',
        features: [
            'Meta Pixel (فيسبوك وإنستغرام)',
            'TikTok Pixel',
            'Snapchat Pixel',
            'تتبع التحويلات',
            'تحسين الحملات الإعلانية'
        ],
        duration: '1-2 يوم',
        price: 'المنصة الواحدة بـ 75 ريال'
    },
    {
        id: 4,
        title: 'تحسين محركات البحث SEO',
        subtitle: 'SEO Optimization',
        icon: '🔍',
        description: 'تحسين ظهور المتجر في نتائج البحث – بناء صفحات محسّنة – تحسين المنتجات',
        features: [
            'تحسين ظهور المتجر',
            'بناء صفحات محسّنة',
            'تحسين المنتجات',
            'الكلمات المفتاحية',
            'تقارير الأداء'
        ],
        duration: 'حسب المشروع',
        price: 'طلب عرض سعر'
    },
    {
        id: 5,
        title: 'تصميم وإنشاء صفحات الهبوط',
        subtitle: 'Landing Pages',
        icon: '🚀',
        description: 'صفحة هبوط احترافية متوافقة مع الهوية البصرية',
        features: [
            'تصميم احترافي',
            'متوافقة مع الهوية البصرية',
            'سرعة تحميل عالية',
            'تحسين التحويلات',
            'متجاوبة مع الجوال'
        ],
        duration: '3-5 أيام',
        price: 'طلب عرض سعر'
    },
    {
        id: 6,
        title: 'تصميم وإنشاء مواقع إلكترونية',
        subtitle: 'Websites',
        icon: '🌐',
        description: 'مواقع للشركات والمكاتب والمتاجر – تصميم + برمجة كاملة',
        features: [
            'مواقع للشركات والمكاتب',
            'تصميم احترافي',
            'برمجة كاملة',
            'لوحة تحكم',
            'دعم فني'
        ],
        duration: '10-15 يوم',
        price: 'طلب عرض سعر'
    },
    {
        id: 7,
        title: 'إنشاء حملات إعلانية',
        subtitle: 'Ad Campaigns',
        icon: '📢',
        description: 'حملات على سناب – تيك توك – إنستغرام مع تحسين الأداء',
        features: [
            'حملات سناب شات',
            'حملات تيك توك',
            'حملات إنستغرام',
            'تحسين الأداء',
            'تقارير دورية'
        ],
        duration: 'مستمر',
        price: 'طلب عرض سعر'
    }
];

// =====================================================
// STATE
// =====================================================

const state = {
    currentStage: 'intro',
    menuOpen: false,
    panelOpen: false,
    panelData: null,
    panelType: null
};

// =====================================================
// DOM ELEMENTS
// =====================================================

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// =====================================================
// INITIALIZATION
// =====================================================

function init() {
    generateStars();
    renderServices();
    setupEventListeners();
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
}

// =====================================================
// STARS GENERATION
// =====================================================

function generateStars() {
    const container = $('.stars');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < CONFIG.starCount; i++) {
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
// HASH-BASED ROUTING
// =====================================================

function handleHashChange() {
    const hash = window.location.hash.slice(1) || 'intro';
    navigateToStage(hash, false);
}

function navigateToStage(stageName, updateHash = true) {
    // Valid stages
    const validStages = ['intro', 'map', 'services', 'contact', 'privacy'];
    
    if (!validStages.includes(stageName)) {
        stageName = 'intro';
    }
    
    // Update hash without triggering hashchange
    if (updateHash && window.location.hash.slice(1) !== stageName) {
        history.pushState(null, '', '#' + stageName);
    }
    
    // Close panel if open
    closePanel();
    
    // Transition animation
    const transition = $('.portal-transition');
    if (transition && state.currentStage !== stageName) {
        transition.classList.add('is-active');
        
        setTimeout(() => {
            // Hide all stages
            $$('.stage').forEach(stage => stage.classList.remove('is-active'));
            
            // Show target stage
            const targetStage = $('#stage' + capitalize(stageName));
            if (targetStage) {
                targetStage.classList.add('is-active');
            }
            
            state.currentStage = stageName;
            
            setTimeout(() => {
                transition.classList.remove('is-active');
            }, 400);
        }, 300);
    } else {
        // No transition for initial load
        $$('.stage').forEach(stage => stage.classList.remove('is-active'));
        const targetStage = $('#stage' + capitalize(stageName));
        if (targetStage) {
            targetStage.classList.add('is-active');
        }
        state.currentStage = stageName;
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// =====================================================
// RENDER SERVICES
// =====================================================

function renderServices() {
    const grid = $('#servicesGrid');
    if (!grid) return;
    
    grid.innerHTML = SERVICES.map(service => `
        <div class="item-card" data-id="${service.id}" data-type="service">
            <span class="item-icon">${service.icon}</span>
            <span class="item-title">${service.title}</span>
            <span class="item-subtitle">${service.subtitle}</span>
        </div>
    `).join('');
}

// =====================================================
// PANEL MANAGEMENT
// =====================================================

function openPanel(type, id) {
    const data = SERVICES.find(s => s.id === id);
    
    if (!data) return;
    
    state.panelOpen = true;
    state.panelType = 'service';
    state.panelData = data;
    
    const panelBody = $('#panelBody');
    if (!panelBody) return;
    
    // Check if item is already in cart
    const cart = window.Cart ? Cart.getCart() : [];
    const isInCart = cart.some(item => item.serviceId === data.id);
    
    panelBody.innerHTML = `
        <div class="panel-icon">${data.icon}</div>
        <h2 class="panel-title">${data.title}</h2>
        <p class="panel-subtitle">${data.subtitle}</p>
        <p class="panel-desc">${data.description}</p>
        
        <ul class="panel-features">
            ${data.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        
        <div class="panel-meta">
            <div class="meta-box">
                <div class="meta-label">المدة</div>
                <div class="meta-value">${data.duration}</div>
            </div>
            <div class="meta-box">
                <div class="meta-label">السعر</div>
                <div class="meta-value">${data.price}</div>
            </div>
        </div>
        
        <div class="panel-actions">
            <button class="btn-add-to-cart ${isInCart ? 'in-cart' : ''}" 
                    data-service-id="${data.id}"
                    data-service-name="${data.title}"
                    data-service-price="${extractPrice(data.price)}"
                    data-service-icon="${data.icon}"
                    ${isInCart ? 'disabled' : ''}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <span>${isInCart ? 'في السلة' : 'أضف للسلة'}</span>
            </button>
            <a href="https://wa.me/${CONFIG.whatsapp.replace('+', '')}?text=${encodeURIComponent('مرحباً، أريد الاستفسار عن خدمة: ' + data.title)}" 
               class="btn-panel-secondary" target="_blank">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                <span>استفسار</span>
            </a>
        </div>
    `;
    
    $('.panel-overlay').classList.add('is-open');
    $('.details-panel').classList.add('is-open');
    document.body.classList.add('no-scroll');
}

/**
 * Extract numeric price from price string
 */
function extractPrice(priceStr) {
    const match = priceStr.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
}

function closePanel() {
    state.panelOpen = false;
    state.panelData = null;
    state.panelType = null;
    
    const overlay = $('.panel-overlay');
    const panel = $('.details-panel');
    
    if (overlay) overlay.classList.remove('is-open');
    if (panel) panel.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
}

// =====================================================
// MENU MANAGEMENT
// =====================================================

function openMenu() {
    state.menuOpen = true;
    $('.menu-toggle').classList.add('is-active');
    $('.menu-overlay').classList.add('is-open');
    $('.side-menu').classList.add('is-open');
    document.body.classList.add('no-scroll');
}

function closeMenu() {
    state.menuOpen = false;
    $('.menu-toggle').classList.remove('is-active');
    $('.menu-overlay').classList.remove('is-open');
    $('.side-menu').classList.remove('is-open');
    document.body.classList.remove('no-scroll');
}

function toggleMenu() {
    if (state.menuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

// =====================================================
// CONTACT FORM
// =====================================================

function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const name = form.querySelector('#contactName').value.trim();
    const message = form.querySelector('#contactMessage').value.trim();
    
    if (!name || !message) {
        alert('يرجى ملء جميع الحقول');
        return;
    }
    
    const whatsappMessage = `مرحباً، أنا ${name}\n\n${message}`;
    const whatsappURL = `https://wa.me/${CONFIG.whatsapp.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappURL, '_blank');
    form.reset();
}

// =====================================================
// EVENT LISTENERS
// =====================================================

function setupEventListeners() {
    // Menu toggle
    const menuToggle = $('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    // Menu overlay close
    const menuOverlay = $('.menu-overlay');
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Menu close button
    const menuClose = $('.menu-close');
    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }
    
    // Menu links
    $$('.menu-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            closeMenu();
        });
    });
    
    // Panel overlay close
    const panelOverlay = $('.panel-overlay');
    if (panelOverlay) {
        panelOverlay.addEventListener('click', closePanel);
    }
    
    // Panel close button
    const panelClose = $('.panel-close');
    if (panelClose) {
        panelClose.addEventListener('click', closePanel);
    }
    
    // Service cards
    const servicesGrid = $('#servicesGrid');
    if (servicesGrid) {
        servicesGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.item-card');
            if (card) {
                const id = parseInt(card.dataset.id);
                openPanel('service', id);
            }
        });
    }
    
    // Contact form
    const contactForm = $('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Map portals
    $$('.map-portal').forEach(portal => {
        portal.addEventListener('click', () => {
            const target = portal.dataset.target;
            if (target) {
                navigateToStage(target);
            }
        });
    });
    
    // Back buttons
    $$('.btn-back').forEach(btn => {
        btn.addEventListener('click', () => {
            const backTarget = btn.dataset.back || 'map';
            navigateToStage(backTarget);
        });
    });
    
    // Enter button on intro
    const btnEnter = $('.btn-enter');
    if (btnEnter) {
        btnEnter.addEventListener('click', () => {
            navigateToStage('map');
        });
    }
    
    // Add to cart button (delegated to document for dynamic content)
    document.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.btn-add-to-cart');
        if (addBtn && !addBtn.disabled && window.Cart) {
            const serviceId = parseInt(addBtn.dataset.serviceId);
            const serviceName = addBtn.dataset.serviceName;
            const servicePrice = parseFloat(addBtn.dataset.servicePrice);
            const serviceIcon = addBtn.dataset.serviceIcon;
            
            Cart.addToCart({
                serviceId,
                serviceName,
                servicePrice,
                serviceIcon,
                quantity: 1
            });
            
            // Update button state
            addBtn.classList.add('in-cart');
            addBtn.disabled = true;
            addBtn.querySelector('span').textContent = 'في السلة';
        }
    });
    
    // Escape key to close panel/menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (state.panelOpen) {
                closePanel();
            } else if (state.menuOpen) {
                closeMenu();
            }
        }
    });
}

// =====================================================
// START
// =====================================================

document.addEventListener('DOMContentLoaded', init);
