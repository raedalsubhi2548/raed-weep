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
            <a href="https://wa.me/${CONFIG.whatsapp.replace('+', '')}?text=${encodeURIComponent('مرحباً، أريد الاستفسار عن خدمة: ' + data.title)}" 
               class="btn-panel-primary" target="_blank">
                💬 اطلب الآن عبر واتساب
            </a>
        </div>
    `;
    
    $('.panel-overlay').classList.add('is-open');
    $('.details-panel').classList.add('is-open');
    document.body.classList.add('no-scroll');
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
            navigateToStage('map');
        });
    });
    
    // Enter button on intro
    const btnEnter = $('.btn-enter');
    if (btnEnter) {
        btnEnter.addEventListener('click', () => {
            navigateToStage('map');
        });
    }
    
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
