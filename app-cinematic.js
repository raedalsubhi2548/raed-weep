/**
 * =============================================
 * RAED | رائد - Cinematic Portal Experience
 * app.js - Complete JavaScript (Hash Routing)
 * =============================================
 */

// =============================================
// CONFIGURATION
// =============================================

const WHATSAPP_NUMBER = '966536090915';

// Services Data
const SERVICES = [
    {
        id: 1,
        title: 'تصميم متجر',
        subtitle: 'متجر إلكتروني احترافي',
        icon: '🛒',
        description: 'أصمّم لك متجر إلكتروني متكامل بهوية مرتبة وتجربة شراء سلسة، من الواجهة حتى صفحات المنتج والدفع.',
        features: [
            'تصميم واجهة رئيسية جذابة',
            'تهيئة صفحات المنتجات بشكل احترافي',
            'تحسين تجربة المستخدم للجوال',
            'إعداد صفحات السياسات الأساسية',
            'مراجعة نهائية وتسليم جاهز'
        ],
        duration: '3-7 أيام',
        price: 'حسب المتطلبات'
    },
    {
        id: 2,
        title: 'صفحات هبوط',
        subtitle: 'تحويل أعلى وإقناع أسرع',
        icon: '🎯',
        description: 'صفحة هبوط مصممة لرفع التحويل: رسالة واضحة، أقسام مقنعة، ونقاط ثقة تدفع العميل لاتخاذ قرار.',
        features: [
            'تصميم سكشنات بيع قوية',
            'نماذج طلب واضحة + CTA ذكي',
            'تحسين السرعة وتجربة الجوال',
            'ربط واتساب ونماذج الإيميل',
            'نسخة جاهزة للإعلانات'
        ],
        duration: '1-3 أيام',
        price: 'حسب الصفحة'
    },
    {
        id: 3,
        title: 'حملات إعلانية',
        subtitle: 'إعلانات بخطة واضحة',
        icon: '📢',
        description: 'أجهّز لك حملة إعلانية مبنية على هدف واضح مع تحسينات تدريجية للوصول لأفضل نتيجة.',
        features: [
            'اختيار الهدف الصحيح وبناء الحملة',
            'كتابة نصوص إعلانية مقنعة',
            'استهداف وتحسين حسب النتائج',
            'متابعة مؤشرات الأداء',
            'تقرير مبسط للنتائج'
        ],
        duration: 'حسب الحملة',
        price: 'حسب الميزانية'
    },
    {
        id: 4,
        title: 'خدمات قوقل',
        subtitle: 'قياس وظهور ومبيعات',
        icon: '🔍',
        description: 'أربط أدوات قوقل بشكل صحيح لتقيس كل شيء وتبني قرارات على بيانات حقيقية.',
        features: [
            'ربط Google Analytics 4',
            'إعداد Google Tag Manager',
            'تهيئة Search Console',
            'إعداد Merchant Center',
            'مراجعة تتبع التحويلات'
        ],
        duration: '1-2 يوم',
        price: 'حسب الربط'
    },
    {
        id: 5,
        title: 'ربط واتساب',
        subtitle: 'تواصل مباشر مع العملاء',
        icon: '💬',
        description: 'أربط واتساب بموقعك أو متجرك بطريقة احترافية تسهّل التواصل مع العملاء.',
        features: [
            'زر واتساب عائم احترافي',
            'رسائل ترحيب تلقائية',
            'ربط مع نماذج الموقع',
            'إشعارات الطلبات',
            'تخصيص حسب الصفحات'
        ],
        duration: '1 يوم',
        price: 'سعر ثابت'
    },
    {
        id: 6,
        title: 'تصميم هوية',
        subtitle: 'هوية بصرية متكاملة',
        icon: '🎨',
        description: 'أصمّم لك هوية بصرية تعكس شخصية مشروعك وتميزك عن المنافسين.',
        features: [
            'تصميم شعار احترافي',
            'اختيار الألوان والخطوط',
            'تصميم بطاقة العمل',
            'قوالب السوشال ميديا',
            'دليل الهوية البصرية'
        ],
        duration: '5-10 أيام',
        price: 'حسب الباقة'
    },
    {
        id: 7,
        title: 'استشارات',
        subtitle: 'نصائح وتوجيه رقمي',
        icon: '💡',
        description: 'جلسة استشارية لمناقشة مشروعك وتقديم نصائح عملية لتحسين حضورك الرقمي.',
        features: [
            'تحليل الوضع الحالي',
            'تحديد نقاط التحسين',
            'خطة عمل واضحة',
            'نصائح تسويقية',
            'متابعة بعد الجلسة'
        ],
        duration: '30-60 دقيقة',
        price: 'سعر ثابت'
    }
];

// Works/Portfolio Data
const WORKS = [
    {
        id: 1,
        title: 'متجر أزياء',
        subtitle: 'متجر إلكتروني',
        icon: '👗',
        description: 'متجر إلكتروني متكامل لبيع الملابس والأزياء النسائية مع تجربة تسوق سلسة.',
        tags: ['تصميم متجر', 'تجربة مستخدم', 'ربط دفع']
    },
    {
        id: 2,
        title: 'صفحة هبوط دورة',
        subtitle: 'صفحة تسويقية',
        icon: '📚',
        description: 'صفحة هبوط لدورة تدريبية حققت معدل تحويل عالي من الإعلانات.',
        tags: ['صفحة هبوط', 'تحويل عالي', 'تصميم جذاب']
    },
    {
        id: 3,
        title: 'حملة إعلانية',
        subtitle: 'إعلانات سناب شات',
        icon: '📱',
        description: 'حملة إعلانية على سناب شات حققت مبيعات ممتازة بتكلفة منخفضة.',
        tags: ['حملة إعلانية', 'سناب شات', 'ROI عالي']
    },
    {
        id: 4,
        title: 'هوية مطعم',
        subtitle: 'هوية بصرية',
        icon: '🍔',
        description: 'هوية بصرية متكاملة لمطعم تشمل الشعار والألوان والقوالب.',
        tags: ['هوية بصرية', 'شعار', 'قوالب']
    },
    {
        id: 5,
        title: 'متجر عطور',
        subtitle: 'متجر إلكتروني',
        icon: '🌸',
        description: 'متجر إلكتروني فاخر لبيع العطور مع تصميم يعكس الفخامة.',
        tags: ['تصميم متجر', 'تجربة فاخرة', 'ربط شحن']
    },
    {
        id: 6,
        title: 'موقع شركة',
        subtitle: 'موقع تعريفي',
        icon: '🏢',
        description: 'موقع تعريفي احترافي لشركة خدمات مع نموذج تواصل متكامل.',
        tags: ['موقع تعريفي', 'تصميم احترافي', 'نموذج تواصل']
    }
];

// =============================================
// STATE
// =============================================

const state = {
    currentStage: 'intro',
    isMenuOpen: false,
    isPanelOpen: false,
    isModalOpen: false
};

// =============================================
// DOM CACHE
// =============================================

const DOM = {};

function cacheDOMElements() {
    // Stars
    DOM.stars = document.getElementById('stars');
    
    // Menu
    DOM.menuToggle = document.getElementById('menuToggle');
    DOM.menuClose = document.getElementById('menuClose');
    DOM.menuOverlay = document.getElementById('menuOverlay');
    DOM.sideMenu = document.getElementById('sideMenu');
    DOM.menuLinks = document.querySelectorAll('.menu-links a');
    
    // Stages
    DOM.stageIntro = document.getElementById('stageIntro');
    DOM.stagePortals = document.getElementById('stagePortals');
    DOM.stageServices = document.getElementById('stageServices');
    DOM.stageWorks = document.getElementById('stageWorks');
    DOM.stageContact = document.getElementById('stageContact');
    
    // Intro
    DOM.btnEnterPortals = document.getElementById('btnEnterPortals');
    
    // Portal Cards
    DOM.portalCards = document.querySelectorAll('.portal-card');
    
    // Grids
    DOM.servicesGrid = document.getElementById('servicesGrid');
    DOM.worksGrid = document.getElementById('worksGrid');
    
    // Back Buttons
    DOM.backBtns = document.querySelectorAll('.back-btn');
    
    // Panel
    DOM.panelOverlay = document.getElementById('panelOverlay');
    DOM.detailsPanel = document.getElementById('detailsPanel');
    DOM.panelClose = document.getElementById('panelClose');
    DOM.panelContent = document.getElementById('panelContent');
    
    // Contact Form
    DOM.contactForm = document.getElementById('contactForm');
    
    // Policy Modals
    DOM.privacyOverlay = document.getElementById('privacyOverlay');
    DOM.privacyModal = document.getElementById('privacyModal');
    DOM.refundOverlay = document.getElementById('refundOverlay');
    DOM.refundModal = document.getElementById('refundModal');
}

// =============================================
// INITIALIZATION
// =============================================

function init() {
    cacheDOMElements();
    generateStars();
    renderServices();
    renderWorks();
    setupEventListeners();
    handleHashRoute();
}

// =============================================
// STARS BACKGROUND
// =============================================

function generateStars() {
    if (!DOM.stars) return;
    
    const fragment = document.createDocumentFragment();
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star' + (Math.random() > 0.9 ? ' large' : '');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
        star.style.setProperty('--delay', `${Math.random() * 4}s`);
        fragment.appendChild(star);
    }
    
    DOM.stars.appendChild(fragment);
}

// =============================================
// RENDER SERVICES
// =============================================

function renderServices() {
    if (!DOM.servicesGrid) return;
    
    DOM.servicesGrid.innerHTML = '';
    
    SERVICES.forEach(service => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.dataset.id = service.id;
        card.innerHTML = `
            <div class="item-icon">${service.icon}</div>
            <div class="item-title">${service.title}</div>
            <div class="item-subtitle">${service.subtitle}</div>
        `;
        
        card.addEventListener('click', () => openServicePanel(service));
        DOM.servicesGrid.appendChild(card);
    });
}

// =============================================
// RENDER WORKS
// =============================================

function renderWorks() {
    if (!DOM.worksGrid) return;
    
    DOM.worksGrid.innerHTML = '';
    
    WORKS.forEach(work => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.dataset.id = work.id;
        card.innerHTML = `
            <div class="item-icon">${work.icon}</div>
            <div class="item-title">${work.title}</div>
            <div class="item-subtitle">${work.subtitle}</div>
        `;
        
        card.addEventListener('click', () => openWorkPanel(work));
        DOM.worksGrid.appendChild(card);
    });
}

// =============================================
// HASH ROUTING
// =============================================

function handleHashRoute() {
    const hash = window.location.hash.slice(1) || 'intro';
    
    const validStages = ['intro', 'portals', 'services', 'works', 'contact'];
    
    if (validStages.includes(hash)) {
        navigateToStage(hash, false);
    } else {
        navigateToStage('intro', false);
    }
}

function updateHash(stage) {
    // Use replaceState for intro, pushState for others
    if (stage === 'intro') {
        history.replaceState(null, '', window.location.pathname);
    } else {
        history.pushState(null, '', `#${stage}`);
    }
}

// =============================================
// STAGE NAVIGATION
// =============================================

function navigateToStage(targetStage, updateUrl = true) {
    // Hide all stages
    document.querySelectorAll('.stage').forEach(stage => {
        stage.classList.remove('active', 'entering', 'leaving');
    });
    
    // Show target stage
    const stageMap = {
        'intro': DOM.stageIntro,
        'portals': DOM.stagePortals,
        'services': DOM.stageServices,
        'works': DOM.stageWorks,
        'contact': DOM.stageContact
    };
    
    const targetElement = stageMap[targetStage];
    if (targetElement) {
        targetElement.classList.add('active', 'entering');
        state.currentStage = targetStage;
        
        if (updateUrl) {
            updateHash(targetStage);
        }
    }
    
    // Close menu if open
    closeMenu();
}

// =============================================
// MENU
// =============================================

function openMenu() {
    state.isMenuOpen = true;
    DOM.menuToggle?.classList.add('active');
    DOM.sideMenu?.classList.add('open');
    DOM.menuOverlay?.classList.add('open');
    document.body.classList.add('no-scroll');
}

function closeMenu() {
    state.isMenuOpen = false;
    DOM.menuToggle?.classList.remove('active');
    DOM.sideMenu?.classList.remove('open');
    DOM.menuOverlay?.classList.remove('open');
    document.body.classList.remove('no-scroll');
}

function toggleMenu() {
    if (state.isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

// =============================================
// DETAILS PANEL
// =============================================

function openServicePanel(service) {
    if (!DOM.panelContent) return;
    
    const featuresHTML = service.features
        .map(f => `<li>${f}</li>`)
        .join('');
    
    DOM.panelContent.innerHTML = `
        <div class="panel-icon">${service.icon}</div>
        <h2 class="panel-title">${service.title}</h2>
        <p class="panel-subtitle">${service.subtitle}</p>
        <p class="panel-description">${service.description}</p>
        <ul class="panel-features">${featuresHTML}</ul>
        <div class="panel-meta">
            <div class="meta-box">
                <div class="meta-label">المدة المتوقعة</div>
                <div class="meta-value">${service.duration}</div>
            </div>
            <div class="meta-box">
                <div class="meta-label">التكلفة</div>
                <div class="meta-value">${service.price}</div>
            </div>
        </div>
        <div class="panel-actions">
            <a href="https://wa.me/${WHATSAPP_NUMBER}?text=مرحباً رائد، أريد الاستفسار عن خدمة: ${service.title}" target="_blank" class="btn-panel-primary">
                اطلب الخدمة عبر واتساب
            </a>
            <button class="btn-panel-secondary" onclick="closePanel()">إغلاق</button>
        </div>
    `;
    
    openPanel();
}

function openWorkPanel(work) {
    if (!DOM.panelContent) return;
    
    const tagsHTML = work.tags
        .map(t => `<span class="panel-tag">${t}</span>`)
        .join('');
    
    DOM.panelContent.innerHTML = `
        <div class="panel-icon">${work.icon}</div>
        <h2 class="panel-title">${work.title}</h2>
        <p class="panel-subtitle">${work.subtitle}</p>
        <p class="panel-description">${work.description}</p>
        <div class="panel-tags">${tagsHTML}</div>
        <div class="panel-actions">
            <a href="https://wa.me/${WHATSAPP_NUMBER}?text=مرحباً رائد، أعجبني مشروع: ${work.title} وأريد مشروع مشابه" target="_blank" class="btn-panel-primary">
                اطلب مشروع مشابه
            </a>
            <button class="btn-panel-secondary" onclick="closePanel()">إغلاق</button>
        </div>
    `;
    
    openPanel();
}

function openPanel() {
    state.isPanelOpen = true;
    DOM.panelOverlay?.classList.add('open');
    DOM.detailsPanel?.classList.add('open');
    document.body.classList.add('no-scroll');
}

function closePanel() {
    state.isPanelOpen = false;
    DOM.panelOverlay?.classList.remove('open');
    DOM.detailsPanel?.classList.remove('open');
    document.body.classList.remove('no-scroll');
}

// =============================================
// POLICY MODALS
// =============================================

function openPolicyModal(type) {
    state.isModalOpen = true;
    
    if (type === 'privacy') {
        DOM.privacyOverlay?.classList.add('open');
        DOM.privacyModal?.classList.add('open');
    } else if (type === 'refund') {
        DOM.refundOverlay?.classList.add('open');
        DOM.refundModal?.classList.add('open');
    }
    
    document.body.classList.add('no-scroll');
}

function closePolicyModal(type) {
    state.isModalOpen = false;
    
    if (type === 'privacy') {
        DOM.privacyOverlay?.classList.remove('open');
        DOM.privacyModal?.classList.remove('open');
    } else if (type === 'refund') {
        DOM.refundOverlay?.classList.remove('open');
        DOM.refundModal?.classList.remove('open');
    }
    
    document.body.classList.remove('no-scroll');
}

// =============================================
// CONTACT FORM
// =============================================

function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('formName')?.value || '';
    const phone = document.getElementById('formPhone')?.value || '';
    const message = document.getElementById('formMessage')?.value || '';
    
    const whatsappMessage = `مرحباً رائد،
الاسم: ${name}
الجوال: ${phone}
الرسالة: ${message}`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
}

// =============================================
// EVENT LISTENERS
// =============================================

function setupEventListeners() {
    // Menu Toggle
    DOM.menuToggle?.addEventListener('click', toggleMenu);
    DOM.menuClose?.addEventListener('click', closeMenu);
    DOM.menuOverlay?.addEventListener('click', closeMenu);
    
    // Enter Portals Button
    DOM.btnEnterPortals?.addEventListener('click', () => {
        navigateToStage('portals');
    });
    
    // Portal Cards
    DOM.portalCards.forEach(card => {
        card.addEventListener('click', () => {
            const target = card.dataset.target;
            if (target) {
                navigateToStage(target);
            }
        });
    });
    
    // Back Buttons
    DOM.backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const back = btn.dataset.back;
            if (back) {
                navigateToStage(back);
            }
        });
    });
    
    // Menu Links
    DOM.menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const stage = link.dataset.stage;
            const modal = link.dataset.modal;
            
            if (stage) {
                navigateToStage(stage);
            } else if (modal) {
                closeMenu();
                setTimeout(() => openPolicyModal(modal), 300);
            }
        });
    });
    
    // Panel Close
    DOM.panelClose?.addEventListener('click', closePanel);
    DOM.panelOverlay?.addEventListener('click', closePanel);
    
    // Policy Modal Close Buttons
    document.querySelectorAll('.modal-close[data-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.close;
            closePolicyModal(type);
        });
    });
    
    // Policy Overlays
    DOM.privacyOverlay?.addEventListener('click', () => closePolicyModal('privacy'));
    DOM.refundOverlay?.addEventListener('click', () => closePolicyModal('refund'));
    
    // Contact Form
    DOM.contactForm?.addEventListener('submit', handleContactForm);
    
    // Hash Change (Browser Back/Forward)
    window.addEventListener('hashchange', handleHashRoute);
    
    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (state.isPanelOpen) {
                closePanel();
            } else if (state.isModalOpen) {
                closePolicyModal('privacy');
                closePolicyModal('refund');
            } else if (state.isMenuOpen) {
                closeMenu();
            }
        }
    });
}

// =============================================
// GLOBAL FUNCTIONS (for inline onclick)
// =============================================

window.closePanel = closePanel;

// =============================================
// START
// =============================================

document.addEventListener('DOMContentLoaded', init);
