/**
 * =============================================
 * RAED | رائد - Complete JavaScript
 * Clean, Optimized, Mobile-First
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

// Portfolio Data
const PORTFOLIO = [
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
// DOM ELEMENTS
// =============================================

const DOM = {};

function cacheDOMElements() {
    // Loader
    DOM.loader = document.getElementById('loader');
    
    // Stars
    DOM.starsBg = document.getElementById('starsBg');
    
    // Menu
    DOM.menuToggle = document.getElementById('menuToggle');
    DOM.menuClose = document.getElementById('menuClose');
    DOM.menuOverlay = document.getElementById('menuOverlay');
    DOM.sideMenu = document.getElementById('sideMenu');
    DOM.menuLinks = document.querySelectorAll('.menu-links a');
    
    // Home Button
    DOM.homeBtn = document.getElementById('homeBtn');
    
    // Sections
    DOM.sectionHome = document.getElementById('sectionHome');
    DOM.sectionServices = document.getElementById('sectionServices');
    DOM.sectionPortfolio = document.getElementById('sectionPortfolio');
    DOM.sectionContact = document.getElementById('sectionContact');
    
    // Grids
    DOM.servicesGrid = document.getElementById('servicesGrid');
    DOM.portfolioGrid = document.getElementById('portfolioGrid');
    
    // Portals
    DOM.portalCards = document.querySelectorAll('.portal-card');
    
    // Back Buttons
    DOM.backBtns = document.querySelectorAll('.back-btn');
    
    // Details Modal
    DOM.detailsOverlay = document.getElementById('detailsOverlay');
    DOM.detailsModal = document.getElementById('detailsModal');
    DOM.detailsClose = document.getElementById('detailsClose');
    DOM.detailsContent = document.getElementById('detailsContent');
    
    // Policy Modals
    DOM.privacyOverlay = document.getElementById('privacyOverlay');
    DOM.privacyModal = document.getElementById('privacyModal');
    DOM.refundOverlay = document.getElementById('refundOverlay');
    DOM.refundModal = document.getElementById('refundModal');
}

// =============================================
// STATE
// =============================================

const state = {
    currentSection: 'home',
    isMenuOpen: false,
    isModalOpen: false
};

// =============================================
// INITIALIZATION
// =============================================

function init() {
    cacheDOMElements();
    generateStars();
    renderServices();
    renderPortfolio();
    setupEventListeners();
    hideLoader();
}

function hideLoader() {
    setTimeout(() => {
        if (DOM.loader) {
            DOM.loader.classList.add('hidden');
        }
    }, 800);
}

// =============================================
// STARS BACKGROUND
// =============================================

function generateStars() {
    if (!DOM.starsBg) return;
    
    const fragment = document.createDocumentFragment();
    const starCount = 80;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${2 + Math.random() * 3}s`);
        star.style.setProperty('--delay', `${Math.random() * 3}s`);
        fragment.appendChild(star);
    }
    
    DOM.starsBg.appendChild(fragment);
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
        card.dataset.type = 'service';
        card.dataset.id = service.id;
        card.innerHTML = `
            <div class="item-icon">${service.icon}</div>
            <div class="item-title">${service.title}</div>
        `;
        
        card.addEventListener('click', () => openServiceDetails(service));
        DOM.servicesGrid.appendChild(card);
    });
}

// =============================================
// RENDER PORTFOLIO
// =============================================

function renderPortfolio() {
    if (!DOM.portfolioGrid) return;
    
    DOM.portfolioGrid.innerHTML = '';
    
    PORTFOLIO.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.dataset.type = 'portfolio';
        card.dataset.id = item.id;
        card.innerHTML = `
            <div class="item-icon">${item.icon}</div>
            <div class="item-title">${item.title}</div>
            <div class="item-subtitle">${item.subtitle}</div>
        `;
        
        card.addEventListener('click', () => openPortfolioDetails(item));
        DOM.portfolioGrid.appendChild(card);
    });
}

// =============================================
// NAVIGATION
// =============================================

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const sectionMap = {
        'home': DOM.sectionHome,
        'services': DOM.sectionServices,
        'portfolio': DOM.sectionPortfolio,
        'contact': DOM.sectionContact
    };
    
    const targetSection = sectionMap[sectionName];
    if (targetSection) {
        targetSection.classList.add('active');
        state.currentSection = sectionName;
    }
    
    // Toggle home button visibility
    if (DOM.homeBtn) {
        if (sectionName === 'home') {
            DOM.homeBtn.classList.remove('visible');
        } else {
            DOM.homeBtn.classList.add('visible');
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
}

function closeMenu() {
    state.isMenuOpen = false;
    DOM.menuToggle?.classList.remove('active');
    DOM.sideMenu?.classList.remove('open');
    DOM.menuOverlay?.classList.remove('open');
}

function toggleMenu() {
    if (state.isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

// =============================================
// DETAILS MODAL
// =============================================

function openServiceDetails(service) {
    if (!DOM.detailsContent) return;
    
    const featuresHTML = service.features
        .map(f => `<li>${f}</li>`)
        .join('');
    
    DOM.detailsContent.innerHTML = `
        <div class="modal-icon">${service.icon}</div>
        <h2 class="modal-title">${service.title}</h2>
        <p class="modal-subtitle">${service.subtitle}</p>
        <p class="modal-description">${service.description}</p>
        <ul class="modal-features">${featuresHTML}</ul>
        <div class="modal-meta">
            <div class="meta-item">
                <span class="meta-label">المدة المتوقعة</span>
                <span class="meta-value">${service.duration}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">التكلفة</span>
                <span class="meta-value">${service.price}</span>
            </div>
        </div>
        <div class="modal-actions">
            <a href="https://wa.me/${WHATSAPP_NUMBER}?text=مرحباً، أريد الاستفسار عن خدمة: ${service.title}" target="_blank" class="btn-primary">
                <span>اطلب الخدمة</span>
            </a>
            <button class="btn-secondary" onclick="closeDetailsModal()">إغلاق</button>
        </div>
    `;
    
    openDetailsModal();
}

function openPortfolioDetails(item) {
    if (!DOM.detailsContent) return;
    
    const tagsHTML = item.tags
        .map(t => `<span style="display:inline-block;padding:0.3rem 0.8rem;background:rgba(108,235,255,0.1);border-radius:20px;font-size:0.8rem;margin-left:0.5rem;margin-bottom:0.5rem;">${t}</span>`)
        .join('');
    
    DOM.detailsContent.innerHTML = `
        <div class="modal-icon">${item.icon}</div>
        <h2 class="modal-title">${item.title}</h2>
        <p class="modal-subtitle">${item.subtitle}</p>
        <p class="modal-description">${item.description}</p>
        <div style="margin-bottom:1.5rem;">${tagsHTML}</div>
        <div class="modal-actions">
            <a href="https://wa.me/${WHATSAPP_NUMBER}?text=مرحباً، أعجبني مشروع: ${item.title} وأريد مشروع مشابه" target="_blank" class="btn-primary">
                <span>اطلب مشروع مشابه</span>
            </a>
            <button class="btn-secondary" onclick="closeDetailsModal()">إغلاق</button>
        </div>
    `;
    
    openDetailsModal();
}

function openDetailsModal() {
    state.isModalOpen = true;
    DOM.detailsOverlay?.classList.add('open');
    DOM.detailsModal?.classList.add('open');
}

function closeDetailsModal() {
    state.isModalOpen = false;
    DOM.detailsOverlay?.classList.remove('open');
    DOM.detailsModal?.classList.remove('open');
}

// =============================================
// POLICY MODALS
// =============================================

function openPolicyModal(type) {
    if (type === 'privacy') {
        DOM.privacyOverlay?.classList.add('open');
        DOM.privacyModal?.classList.add('open');
    } else if (type === 'refund') {
        DOM.refundOverlay?.classList.add('open');
        DOM.refundModal?.classList.add('open');
    }
    state.isModalOpen = true;
}

function closePolicyModal(type) {
    if (type === 'privacy') {
        DOM.privacyOverlay?.classList.remove('open');
        DOM.privacyModal?.classList.remove('open');
    } else if (type === 'refund') {
        DOM.refundOverlay?.classList.remove('open');
        DOM.refundModal?.classList.remove('open');
    }
    state.isModalOpen = false;
}

// =============================================
// EVENT LISTENERS
// =============================================

function setupEventListeners() {
    // Menu Toggle
    DOM.menuToggle?.addEventListener('click', toggleMenu);
    DOM.menuClose?.addEventListener('click', closeMenu);
    DOM.menuOverlay?.addEventListener('click', closeMenu);
    
    // Home Button
    DOM.homeBtn?.addEventListener('click', () => showSection('home'));
    
    // Portal Cards
    DOM.portalCards.forEach(card => {
        card.addEventListener('click', () => {
            const portal = card.dataset.portal;
            if (portal) {
                showSection(portal);
            }
        });
    });
    
    // Back Buttons
    DOM.backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const back = btn.dataset.back;
            if (back) {
                showSection(back);
            }
        });
    });
    
    // Menu Links
    DOM.menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const section = link.dataset.section;
            const modal = link.dataset.modal;
            
            if (section) {
                showSection(section);
            } else if (modal) {
                closeMenu();
                setTimeout(() => openPolicyModal(modal), 300);
            }
        });
    });
    
    // Details Modal Close
    DOM.detailsClose?.addEventListener('click', closeDetailsModal);
    DOM.detailsOverlay?.addEventListener('click', closeDetailsModal);
    
    // Policy Modal Close Buttons
    document.querySelectorAll('.modal-close[data-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.close;
            closePolicyModal(type);
        });
    });
    
    // Close policy modals on overlay click
    DOM.privacyOverlay?.addEventListener('click', () => closePolicyModal('privacy'));
    DOM.refundOverlay?.addEventListener('click', () => closePolicyModal('refund'));
    
    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (state.isModalOpen) {
                closeDetailsModal();
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

window.closeDetailsModal = closeDetailsModal;

// =============================================
// START
// =============================================

document.addEventListener('DOMContentLoaded', init);
