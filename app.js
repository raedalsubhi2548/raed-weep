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
        title: 'صفحات هبوط',
        subtitle: 'Landing Pages',
        icon: '📄',
        description: 'صفحات هبوط احترافية مصممة لتحويل الزوار إلى عملاء. تصميم جذاب وسرعة عالية.',
        features: [
            'تصميم مخصص يعكس هوية علامتك',
            'متجاوب مع جميع الأجهزة',
            'سرعة تحميل عالية',
            'تحسين لمحركات البحث SEO',
            'ربط مع أدوات التحليل'
        ],
        duration: '3-5 أيام',
        price: 'من 800 ريال'
    },
    {
        id: 2,
        title: 'تصميم متجر',
        subtitle: 'E-Commerce Store',
        icon: '🛒',
        description: 'متجر إلكتروني متكامل بتجربة شراء سلسة من الواجهة حتى الدفع.',
        features: [
            'واجهة رئيسية جذابة',
            'صفحات منتجات احترافية',
            'تجربة مستخدم ممتازة للجوال',
            'صفحات السياسات جاهزة',
            'تسليم جاهز للانطلاق'
        ],
        duration: '5-10 أيام',
        price: 'من 1500 ريال'
    },
    {
        id: 3,
        title: 'خدمات قوقل',
        subtitle: 'Google Services',
        icon: '📍',
        description: 'إعداد وتحسين حسابك على قوقل بزنس وتحسين ظهورك في نتائج البحث.',
        features: [
            'إعداد Google Business Profile',
            'تحسين الظهور المحلي',
            'إدارة التقييمات والردود',
            'تحليلات وتقارير شهرية',
            'صور ومعلومات محدثة'
        ],
        duration: '2-4 أيام',
        price: 'من 500 ريال'
    },
    {
        id: 4,
        title: 'حملات إعلانية',
        subtitle: 'Ad Campaigns',
        icon: '📢',
        description: 'حملات إعلانية مدروسة على جوجل وسناب وإنستغرام لجذب العملاء المناسبين.',
        features: [
            'دراسة الجمهور المستهدف',
            'تصميم إعلانات جذابة',
            'إدارة الميزانية بذكاء',
            'تقارير أداء دورية',
            'تحسين مستمر للنتائج'
        ],
        duration: 'مستمر',
        price: 'من 1000 ريال/شهر'
    },
    {
        id: 5,
        title: 'تصميم هوية',
        subtitle: 'Brand Identity',
        icon: '🎨',
        description: 'هوية بصرية متكاملة تعكس قيم علامتك وتميزك عن المنافسين.',
        features: [
            'شعار احترافي',
            'لوحة ألوان متناسقة',
            'خطوط وأنماط مميزة',
            'دليل الهوية البصرية',
            'تطبيقات الهوية'
        ],
        duration: '5-7 أيام',
        price: 'من 1200 ريال'
    },
    {
        id: 6,
        title: 'ربط واتساب',
        subtitle: 'WhatsApp Integration',
        icon: '💬',
        description: 'ربط موقعك أو متجرك بالواتساب لتسهيل التواصل مع العملاء.',
        features: [
            'زر واتساب ثابت',
            'رسائل ترحيب تلقائية',
            'ربط مع نماذج الطلب',
            'إشعارات الطلبات',
            'دعم متعدد الأرقام'
        ],
        duration: '1-2 يوم',
        price: 'من 300 ريال'
    },
    {
        id: 7,
        title: 'استشارات',
        subtitle: 'Consulting',
        icon: '💡',
        description: 'جلسات استشارية لمساعدتك في بناء استراتيجية رقمية فعالة.',
        features: [
            'تحليل الوضع الحالي',
            'خطة عمل مفصلة',
            'نصائح وتوجيهات عملية',
            'متابعة وتقييم',
            'دعم مستمر'
        ],
        duration: 'جلسة 60 دقيقة',
        price: 'من 200 ريال'
    }
];

// =====================================================
// WORKS DATA
// =====================================================

const WORKS = [
    {
        id: 1,
        title: 'متجر أزياء راقٍ',
        subtitle: 'Fashion Store',
        icon: '👗',
        description: 'متجر أزياء نسائية بتصميم أنيق وتجربة تسوق سلسة.',
        tags: ['تصميم متجر', 'Shopify', 'UI/UX']
    },
    {
        id: 2,
        title: 'صفحة هبوط منتج',
        subtitle: 'Product Landing',
        icon: '🚀',
        description: 'صفحة هبوط لإطلاق منتج تقني مع رسوم متحركة جذابة.',
        tags: ['صفحة هبوط', 'تحويلات', 'Motion']
    },
    {
        id: 3,
        title: 'حملة إعلانية',
        subtitle: 'Ad Campaign',
        icon: '📈',
        description: 'حملة إعلانية متكاملة حققت زيادة 300% في المبيعات.',
        tags: ['إعلانات', 'Google Ads', 'تحسين']
    },
    {
        id: 4,
        title: 'هوية لمطعم',
        subtitle: 'Restaurant Brand',
        icon: '🍽️',
        description: 'هوية بصرية كاملة لمطعم راقٍ مع جميع التطبيقات.',
        tags: ['هوية بصرية', 'شعار', 'تصميم']
    },
    {
        id: 5,
        title: 'موقع شركة',
        subtitle: 'Corporate Site',
        icon: '🏢',
        description: 'موقع مؤسسي احترافي مع صفحات متعددة وبوابة خدمات.',
        tags: ['موقع', 'WordPress', 'SEO']
    },
    {
        id: 6,
        title: 'متجر عطور',
        subtitle: 'Perfume Store',
        icon: '🌸',
        description: 'متجر عطور فاخر بتصميم يعكس الأناقة والفخامة.',
        tags: ['تصميم متجر', 'Salla', 'UI/UX']
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
    renderWorks();
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
    const validStages = ['intro', 'map', 'services', 'works', 'contact', 'privacy'];
    
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
// RENDER WORKS
// =====================================================

function renderWorks() {
    const grid = $('#worksGrid');
    if (!grid) return;
    
    grid.innerHTML = WORKS.map(work => `
        <div class="item-card" data-id="${work.id}" data-type="work">
            <span class="item-icon">${work.icon}</span>
            <span class="item-title">${work.title}</span>
            <span class="item-subtitle">${work.subtitle}</span>
        </div>
    `).join('');
}

// =====================================================
// PANEL MANAGEMENT
// =====================================================

function openPanel(type, id) {
    const data = type === 'service' 
        ? SERVICES.find(s => s.id === id)
        : WORKS.find(w => w.id === id);
    
    if (!data) return;
    
    state.panelOpen = true;
    state.panelType = type;
    state.panelData = data;
    
    const panelBody = $('#panelBody');
    if (!panelBody) return;
    
    if (type === 'service') {
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
    } else {
        panelBody.innerHTML = `
            <div class="panel-icon">${data.icon}</div>
            <h2 class="panel-title">${data.title}</h2>
            <p class="panel-subtitle">${data.subtitle}</p>
            <p class="panel-desc">${data.description}</p>
            
            <div class="panel-tags">
                ${data.tags.map(t => `<span class="panel-tag">${t}</span>`).join('')}
            </div>
            
            <div class="panel-actions">
                <a href="https://wa.me/${CONFIG.whatsapp.replace('+', '')}?text=${encodeURIComponent('مرحباً، أريد مشروع مشابه لـ: ' + data.title)}" 
                   class="btn-panel-primary" target="_blank">
                    💬 أريد مشروع مشابه
                </a>
            </div>
        `;
    }
    
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
    
    // Works cards
    const worksGrid = $('#worksGrid');
    if (worksGrid) {
        worksGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.item-card');
            if (card) {
                const id = parseInt(card.dataset.id);
                openPanel('work', id);
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
