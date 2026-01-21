/**
 * =====================================================
 * RAED | رائد - PORTAL JOURNEY EXPERIENCE
 * Vanilla JavaScript with State Machine & Fixed Orbit
 * Mobile-First with iOS Safari Compatibility
 * =====================================================
 */

// =====================================================
// CONFIGURATION
// =====================================================

const WHATSAPP_NUMBER = "966536090915";

// Stages
const STAGES = {
    INTRO: 'intro',
    JOURNEY: 'journey',
    SERVICES_PORTAL: 'servicesPortal',
    SERVICES: 'services',
    WORKS_PORTAL: 'worksPortal',
    WORKS: 'works',
    CONTACT_PORTAL: 'contactPortal',
    CONTACT: 'contact'
};

// =====================================================
// SERVICES DATA
// =====================================================

const SERVICES = [
    {
        id: 1,
        title: 'تصميم متجر',
        subtitle: 'متجر احترافي جاهز للبيع',
        icon: '🛒',
        description: 'أصمّم لك متجر إلكتروني متكامل بهوية مرتبة وتجربة شراء سلسة، من الواجهة حتى صفحات المنتج والدفع.',
        bullets: [
            'تصميم واجهة رئيسية جذابة وبانرات مرتبة',
            'تهيئة صفحات المنتجات (صور/وصف/تنسيق) بشكل احترافي',
            'تحسين تجربة المستخدم للجوال وسهولة التصفح',
            'إعداد صفحات السياسات الأساسية (الشحن/الاسترجاع/الخصوصية)',
            'مراجعة نهائية وتسليم جاهز للانطلاق'
        ],
        duration: '3–7 أيام',
        startingPrice: 'حسب المتطلبات',
        color: '#6CEBFF'
    },
    {
        id: 2,
        title: 'صفحات هبوط',
        subtitle: 'تحويل أعلى وإقناع أسرع',
        icon: '🎯',
        description: 'صفحة هبوط مصممة لرفع التحويل: رسالة واضحة، أقسام مقنعة، ونقاط ثقة تدفع العميل لاتخاذ قرار.',
        bullets: [
            'تصميم سكشنات بيع قوية (Problem → Solution → Proof)',
            'نماذج طلب/تواصل واضحة + CTA ذكي',
            'تحسين السرعة وتجربة الجوال',
            'ربط واتساب/نماذج الإيميل بسهولة',
            'نسخة جاهزة للإعلانات والقياس'
        ],
        duration: '1–3 أيام',
        startingPrice: 'حسب الصفحة',
        color: '#A88BFF'
    },
    {
        id: 3,
        title: 'حملات إعلانية',
        subtitle: 'إعلانات مدفوعة بخطة واضحة',
        icon: '📢',
        description: 'أجهّز لك حملة إعلانية مبنية على هدف واضح (مبيعات/رسائل/زيارات) مع تحسينات تدريجية للوصول لأفضل نتيجة.',
        bullets: [
            'اختيار الهدف الصحيح وبناء هيكلة الحملة',
            'كتابة نصوص إعلانية مقنعة + أفكار كرييتف',
            'استهداف وتحسين حسب النتائج',
            'متابعة مؤشرات الأداء وتعديل مستمر',
            'تقرير مبسط يوضح ماذا حدث وماذا نعمل لاحقًا'
        ],
        duration: 'حسب الحملة',
        startingPrice: 'حسب المنصة والميزانية',
        color: '#E7D38A'
    },
    {
        id: 4,
        title: 'خدمات قوقل',
        subtitle: 'قياس + ظهور + مبيعات',
        icon: '🔍',
        description: 'أربط أدوات قوقل بشكل صحيح لتقيس كل شيء وتبني قرارات على بيانات حقيقية.',
        bullets: [
            'ربط Google Analytics 4 بشكل صحيح',
            'إعداد Google Tag Manager وتفعيل الأحداث',
            'تهيئة Google Search Console وفحص المشاكل',
            'إعداد Merchant Center (للمتاجر) عند الحاجة',
            'مراجعة تتبع التحويلات للإعلانات'
        ],
        duration: '1–2 يوم',
        startingPrice: 'حسب الربط',
        color: '#6CEBFF'
    },
    {
        id: 5,
        title: 'ربط واتساب',
        subtitle: 'تواصل أسرع وتحويل أعلى',
        icon: '💬',
        description: 'أجهز لك واتساب احترافي داخل الموقع: أزرار، رسائل جاهزة، ونماذج ترسل التفاصيل بشكل منظم.',
        bullets: [
            'زر واتساب عائم بمقاس متناسق للجوال والكمبيوتر',
            'رسائل جاهزة تلقائية حسب الخدمة المختارة',
            'نماذج تجمع الاسم/الجوال/الإيميل قبل الإرسال',
            'تنظيم الطلبات لتصل لك واضحة بدون لخبطة',
            'اختبار كامل قبل التسليم'
        ],
        duration: 'ساعات إلى يوم',
        startingPrice: 'حسب الربط',
        color: '#A88BFF'
    },
    {
        id: 6,
        title: 'تصميم هوية',
        subtitle: 'هوية تثبتك في ذهن العميل',
        icon: '🎨',
        description: 'أبني لك هوية بصرية هادئة وفخمة: ألوان، خطوط، أسلوب تصميم، واستخدامات جاهزة.',
        bullets: [
            'اختيار لوحة ألوان مريحة ومتناسقة',
            'تحديد الخطوط ونمط العناصر',
            'تصميم قوالب سوشال/بنرات/أيقونات حسب الحاجة',
            'إرشادات استخدام مختصرة وواضحة',
            'تسليم ملفات منظمة للاستخدام'
        ],
        duration: '3–5 أيام',
        startingPrice: 'حسب الباقة',
        color: '#E7D38A'
    },
    {
        id: 7,
        title: 'استشارات',
        subtitle: 'قرار أسرع بخبرة أوضح',
        icon: '💡',
        description: 'جلسة استشارية مركزة: نراجع وضعك، نحدد الأولويات، ونطلع بخطة تنفيذ واضحة ومختصرة.',
        bullets: [
            'تحليل سريع لمشكلتك أو هدفك',
            'خطة خطوات قابلة للتنفيذ',
            'اقتراحات تحسين تجربة العميل والمحتوى',
            'مؤشرات قياس بسيطة لمتابعة التقدم',
            'ملخص مكتوب بعد الجلسة'
        ],
        duration: '30–60 دقيقة',
        startingPrice: 'حسب الجلسة',
        color: '#6CEBFF'
    }
];

// =====================================================
// PORTFOLIO DATA
// =====================================================

const PORTFOLIO = [
    {
        id: 1,
        title: 'متجر أزياء راقية',
        description: 'متجر إلكتروني متكامل لبيع الأزياء النسائية الفاخرة',
        tag: 'متجر إلكتروني',
        gradient: 'linear-gradient(135deg, #6CEBFF 0%, #A88BFF 100%)',
        details: 'تم تصميم وتطوير متجر إلكتروني متكامل يشمل واجهة رئيسية جذابة، صفحات منتجات احترافية، نظام سلة شراء سلس، وربط بوابات الدفع. المتجر محسّن للجوال ويحقق معدلات تحويل عالية.',
        tags: ['Shopify', 'تصميم UI/UX', 'تحسين التحويل']
    },
    {
        id: 2,
        title: 'صفحة هبوط منتج',
        description: 'صفحة هبوط تسويقية لمنتج صحي حققت 12% معدل تحويل',
        tag: 'صفحة هبوط',
        gradient: 'linear-gradient(135deg, #A88BFF 0%, #E7D38A 100%)',
        details: 'صفحة هبوط مصممة بأسلوب البيع القوي، تتضمن أقسام المشكلة والحل، شهادات العملاء، ضمانات الشراء، ونداء للعمل واضح. حققت معدل تحويل 12% من الزوار.',
        tags: ['تصميم تحويلي', 'كتابة إعلانية', 'A/B Testing']
    },
    {
        id: 3,
        title: 'حملة إعلانية ناجحة',
        description: 'حملة Meta Ads حققت ROAS 4.5x لمتجر إلكتروني',
        tag: 'حملات إعلانية',
        gradient: 'linear-gradient(135deg, #E7D38A 0%, #6CEBFF 100%)',
        details: 'إدارة حملة إعلانية متكاملة على منصة Meta شملت اختبار الجماهير، تحسين الإبداعات، وتوسيع نطاق الحملة. حققت عائد على الإنفاق الإعلاني 4.5x.',
        tags: ['Meta Ads', 'استهداف متقدم', 'تحسين مستمر']
    },
    {
        id: 4,
        title: 'هوية بصرية متكاملة',
        description: 'هوية بصرية فاخرة لعلامة تجارية في مجال العطور',
        tag: 'هوية بصرية',
        gradient: 'linear-gradient(135deg, #6CEBFF 0%, #E7D38A 100%)',
        details: 'تصميم هوية بصرية شاملة تتضمن الشعار، لوحة الألوان، الخطوط، قوالب السوشال ميديا، والإرشادات التطبيقية. هوية تعكس الفخامة والتميز.',
        tags: ['تصميم شعار', 'Brand Guidelines', 'قوالب جاهزة']
    },
    {
        id: 5,
        title: 'ربط أدوات التتبع',
        description: 'إعداد Google Analytics 4 و GTM لمتجر كبير',
        tag: 'خدمات قوقل',
        gradient: 'linear-gradient(135deg, #A88BFF 0%, #6CEBFF 100%)',
        details: 'إعداد متكامل لأدوات القياس شمل GA4، GTM، تتبع التحويلات، تتبع التجارة الإلكترونية المحسّن، وربط مع Google Ads للقياس الدقيق.',
        tags: ['GA4', 'GTM', 'تتبع التحويلات']
    },
    {
        id: 6,
        title: 'نظام واتساب ذكي',
        description: 'ربط واتساب متقدم مع نماذج ورسائل تلقائية',
        tag: 'ربط واتساب',
        gradient: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
        details: 'تصميم وتنفيذ نظام تواصل عبر واتساب يشمل أزرار ذكية، نماذج جمع البيانات، رسائل مخصصة حسب الخدمة، وتنظيم الطلبات الواردة.',
        tags: ['WhatsApp API', 'أتمتة', 'نماذج ذكية']
    }
];

// =====================================================
// STATE MACHINE
// =====================================================

const state = {
    currentStage: STAGES.INTRO,
    selectedServiceId: null,
    selectedWorkId: null,
    focusedCardIndex: 0,
    focusedWorkIndex: 0,
    orbitAngle: 0,
    worksOrbitAngle: 0,
    orbitPaused: false,
    worksOrbitPaused: false,
    isPanelOpen: false,
    isWorksPanelOpen: false,
    isMenuOpen: false,
    prefersReducedMotion: false,
    animationFrameId: null,
    worksAnimationFrameId: null,
    openModals: [],
    orbitCenter: { x: 0, y: 0 },
    worksOrbitCenter: { x: 0, y: 0 },
    orbitRadius: 120,
    worksOrbitRadius: 120,
    isMobile: false,
    viewportWidth: 0,
    viewportHeight: 0
};

// =====================================================
// DOM ELEMENTS
// =====================================================

const DOM = {};

function cacheDOMElements() {
    DOM.loader = document.getElementById('loader');
    DOM.stars = document.getElementById('stars');
    DOM.portalTransition = document.getElementById('portalTransition');
    
    // Stages
    DOM.stageIntro = document.getElementById('stageIntro');
    DOM.stageJourney = document.getElementById('stageJourney');
    DOM.stageServicesPortal = document.getElementById('stageServicesPortal');
    DOM.stageServices = document.getElementById('stageServices');
    DOM.stageWorksPortal = document.getElementById('stageWorksPortal');
    DOM.stageWorks = document.getElementById('stageWorks');
    DOM.stageContactPortal = document.getElementById('stageContactPortal');
    DOM.stageContact = document.getElementById('stageContact');
    
    // Global buttons
    DOM.globalMenuToggle = document.getElementById('globalMenuToggle');
    DOM.globalHomeBtn = document.getElementById('globalHomeBtn');
    
    // Stage buttons
    DOM.btnStartJourney = document.getElementById('btnStartJourney');
    DOM.btnEnterServices = document.getElementById('btnEnterServices');
    DOM.btnToWorksPortal = document.getElementById('btnToWorksPortal');
    DOM.btnEnterWorks = document.getElementById('btnEnterWorks');
    DOM.btnEnterContact = document.getElementById('btnEnterContact');
    DOM.btnBackToServices = document.getElementById('btnBackToServices');
    DOM.btnBackToJourney = document.getElementById('btnBackToJourney');
    DOM.btnBackFromContact = document.getElementById('btnBackFromContact');
    DOM.btnHomeServices = document.getElementById('btnHomeServices');
    DOM.btnHomeWorks = document.getElementById('btnHomeWorks');
    DOM.btnHomeContact = document.getElementById('btnHomeContact');
    
    // Journey portal cards
    DOM.journeyPortalCards = document.querySelectorAll('.journey-portal-card');
    
    // Character & Orbit (Services)
    DOM.characterContainer = document.getElementById('characterContainer');
    DOM.handAnchor = document.getElementById('handAnchor');
    DOM.handBeam = document.getElementById('handBeam');
    DOM.orbitContainer = document.getElementById('orbitContainer');
    DOM.hint = document.getElementById('hint');
    
    // Character & Orbit (Works)
    DOM.characterContainerWorks = document.getElementById('characterContainerWorks');
    DOM.handAnchorWorks = document.getElementById('handAnchorWorks');
    DOM.handBeamWorks = document.getElementById('handBeamWorks');
    DOM.worksOrbitContainer = document.getElementById('worksOrbitContainer');
    DOM.hintWorks = document.getElementById('hintWorks');
    
    // Menu
    DOM.menuToggle = document.getElementById('menuToggle');
    DOM.menuToggle2 = document.getElementById('menuToggle2');
    DOM.menuToggle3 = document.getElementById('menuToggle3');
    DOM.mainMenu = document.getElementById('mainMenu');
    DOM.menuOverlay = document.getElementById('menuOverlay');
    DOM.menuCloseBtn = document.getElementById('menuCloseBtn');
    
    // Contact
    DOM.contactForm = document.getElementById('contactForm');
    DOM.btnContactWhatsapp = document.getElementById('btnContactWhatsapp');
    
    // Details Panel
    DOM.panelOverlay = document.getElementById('panelOverlay');
    DOM.detailsPanel = document.getElementById('detailsPanel');
    DOM.panelClose = document.getElementById('panelClose');
    DOM.panelContent = document.getElementById('panelContent');
    DOM.panelTitle = document.getElementById('panelTitle');
    DOM.panelSubtitle = document.getElementById('panelSubtitle');
    DOM.panelDescription = document.getElementById('panelDescription');
    DOM.panelIcon = document.getElementById('panelIcon');
    DOM.panelFeatures = document.getElementById('panelFeatures');
    DOM.panelDuration = document.getElementById('panelDuration');
    DOM.panelPrice = document.getElementById('panelPrice');
    DOM.btnPanelBack = document.getElementById('btnPanelBack');
    DOM.btnOrderForm = document.getElementById('btnOrderForm');
    
    // Order Form Modal
    DOM.orderFormOverlay = document.getElementById('orderFormOverlay');
    DOM.orderFormModal = document.getElementById('orderFormModal');
    DOM.orderFormClose = document.getElementById('orderFormClose');
    DOM.orderForm = document.getElementById('orderForm');
    DOM.orderService = document.getElementById('orderService');
    DOM.btnWhatsappOrder = document.getElementById('btnWhatsappOrder');
    
    // Policy Modals
    DOM.privacyOverlay = document.getElementById('privacyOverlay');
    DOM.privacyModal = document.getElementById('privacyModal');
    DOM.refundOverlay = document.getElementById('refundOverlay');
    DOM.refundModal = document.getElementById('refundModal');
    
    // Portfolio
    DOM.portfolioGrid = document.getElementById('portfolioGrid');
    DOM.portfolioDetailOverlay = document.getElementById('portfolioDetailOverlay');
    DOM.portfolioDetailModal = document.getElementById('portfolioDetailModal');
    DOM.portfolioDetailTitle = document.getElementById('portfolioDetailTitle');
    DOM.portfolioDetailContent = document.getElementById('portfolioDetailContent');
    
    // Orders Modal
    DOM.ordersOverlay = document.getElementById('ordersOverlay');
    DOM.ordersModal = document.getElementById('ordersModal');
    DOM.ordersList = document.getElementById('ordersList');
    DOM.ordersEmpty = document.getElementById('ordersEmpty');
    DOM.btnBrowseServices = document.getElementById('btnBrowseServices');
}

// =====================================================
// INITIALIZATION
// =====================================================

function init() {
    cacheDOMElements();
    
    // Check reduced motion
    state.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Initial stage is intro, hide global buttons
    document.body.classList.add('stage-is-intro');
    
    // Calculate viewport
    recalcLayout();
    
    // Generate stars
    generateStars();
    
    // Create service cards
    createServiceCards();
    
    // Create work cards
    createWorkCards();
    
    // Setup events
    setupEventListeners();
    
    // Hide loader
    setTimeout(() => {
        if (DOM.loader) DOM.loader.classList.add('hidden');
    }, 600);
}

// =====================================================
// LAYOUT CALCULATION
// =====================================================

function recalcLayout() {
    state.viewportWidth = window.innerWidth;
    state.viewportHeight = window.innerHeight;
    state.isMobile = state.viewportWidth < 768;
    
    // Calculate orbit centers (screen center, above character)
    calculateOrbitCenter();
    calculateWorksOrbitCenter();
    
    // Calculate responsive radius for services
    const minDim = Math.min(state.viewportWidth, state.viewportHeight);
    if (state.isMobile) {
        state.orbitRadius = clamp(minDim * 0.32, 130, 200);
        state.worksOrbitRadius = clamp(minDim * 0.30, 120, 190);
    } else {
        state.orbitRadius = clamp(minDim * 0.38, 180, 320);
        state.worksOrbitRadius = clamp(minDim * 0.36, 170, 300);
    }
}

function calculateOrbitCenter() {
    // Orbit center is screen center, vertically adjusted above character
    const centerX = state.viewportWidth / 2;
    const centerY = state.isMobile 
        ? state.viewportHeight * 0.42 
        : state.viewportHeight * 0.45;
    
    state.orbitCenter = { x: centerX, y: centerY };
}

function calculateWorksOrbitCenter() {
    // Works orbit center is screen center, vertically adjusted above character
    const centerX = state.viewportWidth / 2;
    const centerY = state.isMobile 
        ? state.viewportHeight * 0.42 
        : state.viewportHeight * 0.45;
    
    state.worksOrbitCenter = { x: centerX, y: centerY };
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// =====================================================
// STAGE NAVIGATION (STATE MACHINE)
// =====================================================

function goToStage(targetStage) {
    if (state.currentStage === targetStage) return;
    
    const prevStage = state.currentStage;
    
    // Show portal transition effect
    if (DOM.portalTransition && !state.prefersReducedMotion) {
        DOM.portalTransition.classList.add('active');
    }
    
    setTimeout(() => {
        // Hide all stages
        document.querySelectorAll('.stage').forEach(stage => {
            stage.classList.remove('active');
        });
        
        // Show target stage
        const stageMap = {
            [STAGES.INTRO]: DOM.stageIntro,
            [STAGES.JOURNEY]: DOM.stageJourney,
            [STAGES.SERVICES_PORTAL]: DOM.stageServicesPortal,
            [STAGES.SERVICES]: DOM.stageServices,
            [STAGES.WORKS_PORTAL]: DOM.stageWorksPortal,
            [STAGES.WORKS]: DOM.stageWorks,
            [STAGES.CONTACT_PORTAL]: DOM.stageContactPortal,
            [STAGES.CONTACT]: DOM.stageContact
        };
        
        const targetEl = stageMap[targetStage];
        if (targetEl) {
            targetEl.classList.add('active');
        }
        
        state.currentStage = targetStage;
        
        // Toggle body class for intro stage (hide global buttons)
        if (targetStage === STAGES.INTRO) {
            document.body.classList.add('stage-is-intro');
        } else {
            document.body.classList.remove('stage-is-intro');
        }
        
        // Start/stop orbit animation
        if (targetStage === STAGES.SERVICES) {
            recalcLayout();
            if (!state.prefersReducedMotion) {
                startOrbitAnimation();
            } else {
                positionCardsStatic();
            }
            stopWorksOrbitAnimation();
        } else if (targetStage === STAGES.WORKS) {
            recalcLayout();
            if (!state.prefersReducedMotion) {
                startWorksOrbitAnimation();
            } else {
                positionWorksCardsStatic();
            }
            stopOrbitAnimation();
        } else {
            stopOrbitAnimation();
            stopWorksOrbitAnimation();
        }
        
        // Hide portal transition
        setTimeout(() => {
            if (DOM.portalTransition) {
                DOM.portalTransition.classList.remove('active');
            }
        }, 300);
        
    }, state.prefersReducedMotion ? 0 : 400);
}

// =====================================================
// STARS
// =====================================================

function generateStars() {
    if (!DOM.stars) return;
    
    const count = 60;
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${2 + Math.random() * 3}s`);
        star.style.setProperty('--delay', `${Math.random() * 3}s`);
        fragment.appendChild(star);
    }
    
    DOM.stars.appendChild(fragment);
}

// =====================================================
// SERVICE CARDS
// =====================================================

function createServiceCards() {
    if (!DOM.orbitContainer) return;
    
    SERVICES.forEach((service, index) => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.dataset.id = service.id;
        card.dataset.index = index;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', service.title);
        
        card.innerHTML = `
            <div class="card-icon">${service.icon}</div>
            <div class="card-title">${service.title}</div>
        `;
        
        DOM.orbitContainer.appendChild(card);
    });
}

// =====================================================
// PORTFOLIO GRID
// =====================================================

function createPortfolioGrid() {
    if (!DOM.portfolioGrid) return;
    
    DOM.portfolioGrid.innerHTML = '';
    
    PORTFOLIO.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.innerHTML = `
            <div class="portfolio-thumb" style="background: ${item.gradient};">
                <span style="filter: grayscale(1) brightness(2);">🖼️</span>
            </div>
            <div class="portfolio-info">
                <h4 class="portfolio-title">${item.title}</h4>
                <p class="portfolio-desc">${item.description}</p>
                <span class="portfolio-tag">${item.tag}</span>
                <button class="portfolio-btn" data-id="${item.id}">عرض التفاصيل</button>
            </div>
        `;
        
        DOM.portfolioGrid.appendChild(card);
    });
}

// =====================================================
// WORK CARDS (ORBIT)
// =====================================================

function createWorkCards() {
    if (!DOM.worksOrbitContainer) return;
    
    PORTFOLIO.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'work-card';
        card.dataset.id = item.id;
        card.dataset.index = index;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', item.title);
        
        card.innerHTML = `
            <div class="work-card-icon">🖼️</div>
            <div class="work-card-title">${item.title}</div>
            <span class="work-card-tag">${item.tag}</span>
        `;
        
        DOM.worksOrbitContainer.appendChild(card);
    });
}

// =====================================================
// ORBIT ANIMATION - FIXED FOR MOBILE
// =====================================================

function startOrbitAnimation() {
    if (state.animationFrameId) {
        cancelAnimationFrame(state.animationFrameId);
    }
    
    const cards = DOM.orbitContainer ? DOM.orbitContainer.querySelectorAll('.service-card') : [];
    if (cards.length === 0) return;
    
    const cardCount = cards.length;
    
    function animate() {
        if (state.orbitPaused || state.isPanelOpen || state.currentStage !== STAGES.SERVICES) {
            state.animationFrameId = requestAnimationFrame(animate);
            return;
        }
        
        // Slower rotation speed (0.0015 instead of 0.004)
        state.orbitAngle += 0.0015;
        
        const centerX = state.orbitCenter.x;
        const centerY = state.orbitCenter.y;
        const radius = state.orbitRadius;
        const radiusY = radius * 0.5;
        
        cards.forEach((card, index) => {
            if (card.classList.contains('selected')) return;
            
            const angle = (index / cardCount) * Math.PI * 2 + state.orbitAngle;
            
            // Calculate raw position
            let x = centerX + Math.cos(angle) * radius;
            let y = centerY + Math.sin(angle) * radiusY;
            
            // Card dimensions (155x110 mobile, 200x140 desktop)
            const cardW = state.isMobile ? 155 : 200;
            const cardH = state.isMobile ? 110 : 140;
            
            // Clamp position to keep cards within viewport with more padding
            const padding = 15;
            const topPadding = 80;
            const bottomPadding = 100;
            
            x = clamp(x - cardW / 2, padding, state.viewportWidth - cardW - padding) + cardW / 2;
            y = clamp(y - cardH / 2, topPadding, state.viewportHeight - cardH - bottomPadding) + cardH / 2;
            
            // Depth factor for 3D effect (using sin of angle)
            const depth = (Math.sin(angle) + 1) / 2;
            const scale = 0.75 + depth * 0.3;
            const opacity = 0.6 + depth * 0.4;
            const zIndex = Math.round(depth * 10);
            
            // Use translate3d(x,y,0) + scale ONLY (no perspective, no rotateX/Y)
            const translateX = x - cardW / 2;
            const translateY = y - cardH / 2;
            
            card.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.zIndex = zIndex;
            
            // Subtle blur for depth on desktop only
            if (!state.isMobile && depth < 0.35) {
                card.style.filter = `blur(${(1 - depth) * 1.2}px)`;
            } else {
                card.style.filter = 'none';
            }
        });
        
        state.animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
}

function stopOrbitAnimation() {
    if (state.animationFrameId) {
        cancelAnimationFrame(state.animationFrameId);
        state.animationFrameId = null;
    }
}

function positionCardsStatic() {
    const cards = DOM.orbitContainer ? DOM.orbitContainer.querySelectorAll('.service-card') : [];
    if (cards.length === 0) return;
    
    const centerX = state.orbitCenter.x;
    const centerY = state.orbitCenter.y;
    const radius = state.orbitRadius;
    const radiusY = radius * 0.5;
    
    cards.forEach((card, index) => {
        const angle = (index / cards.length) * Math.PI * 2 - Math.PI / 2;
        
        let x = centerX + Math.cos(angle) * radius;
        let y = centerY + Math.sin(angle) * radiusY;
        
        const cardW = state.isMobile ? 155 : 200;
        const cardH = state.isMobile ? 110 : 140;
        
        // Clamp position
        const padding = 15;
        const topPadding = 80;
        const bottomPadding = 100;
        
        x = clamp(x - cardW / 2, padding, state.viewportWidth - cardW - padding) + cardW / 2;
        y = clamp(y - cardH / 2, topPadding, state.viewportHeight - cardH - bottomPadding) + cardH / 2;
        
        const translateX = x - cardW / 2;
        const translateY = y - cardH / 2;
        
        card.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
        card.style.opacity = 1;
        card.style.filter = 'none';
    });
}

// =====================================================
// WORKS ORBIT ANIMATION
// =====================================================

function startWorksOrbitAnimation() {
    if (state.worksAnimationFrameId) {
        cancelAnimationFrame(state.worksAnimationFrameId);
    }
    
    const cards = DOM.worksOrbitContainer ? DOM.worksOrbitContainer.querySelectorAll('.work-card') : [];
    if (cards.length === 0) return;
    
    const cardCount = cards.length;
    
    function animate() {
        if (state.worksOrbitPaused || state.isWorksPanelOpen || state.currentStage !== STAGES.WORKS) {
            state.worksAnimationFrameId = requestAnimationFrame(animate);
            return;
        }
        
        // Even slower rotation for works (0.001)
        state.worksOrbitAngle += 0.001;
        
        const centerX = state.worksOrbitCenter.x;
        const centerY = state.worksOrbitCenter.y;
        const radius = state.worksOrbitRadius;
        const radiusY = radius * 0.5;
        
        cards.forEach((card, index) => {
            if (card.classList.contains('selected')) return;
            
            const angle = (index / cardCount) * Math.PI * 2 + state.worksOrbitAngle;
            
            // Calculate raw position
            let x = centerX + Math.cos(angle) * radius;
            let y = centerY + Math.sin(angle) * radiusY;
            
            // Card dimensions (155x110 mobile, 200x140 desktop)
            const cardW = state.isMobile ? 155 : 200;
            const cardH = state.isMobile ? 110 : 140;
            
            // Clamp position
            const padding = 15;
            const topPadding = 80;
            const bottomPadding = 100;
            
            x = clamp(x - cardW / 2, padding, state.viewportWidth - cardW - padding) + cardW / 2;
            y = clamp(y - cardH / 2, topPadding, state.viewportHeight - cardH - bottomPadding) + cardH / 2;
            
            // Depth factor
            const depth = (Math.sin(angle) + 1) / 2;
            const scale = 0.75 + depth * 0.3;
            const opacity = 0.6 + depth * 0.4;
            const zIndex = Math.round(depth * 10);
            
            const translateX = x - cardW / 2;
            const translateY = y - cardH / 2;
            
            card.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.zIndex = zIndex;
            
            if (!state.isMobile && depth < 0.35) {
                card.style.filter = `blur(${(1 - depth) * 1.2}px)`;
            } else {
                card.style.filter = 'none';
            }
        });
        
        state.worksAnimationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
}

function stopWorksOrbitAnimation() {
    if (state.worksAnimationFrameId) {
        cancelAnimationFrame(state.worksAnimationFrameId);
        state.worksAnimationFrameId = null;
    }
}

function positionWorksCardsStatic() {
    const cards = DOM.worksOrbitContainer ? DOM.worksOrbitContainer.querySelectorAll('.work-card') : [];
    if (cards.length === 0) return;
    
    const centerX = state.worksOrbitCenter.x;
    const centerY = state.worksOrbitCenter.y;
    const radius = state.worksOrbitRadius;
    const radiusY = radius * 0.5;
    
    cards.forEach((card, index) => {
        const angle = (index / cards.length) * Math.PI * 2 - Math.PI / 2;
        
        let x = centerX + Math.cos(angle) * radius;
        let y = centerY + Math.sin(angle) * radiusY;
        
        const cardW = state.isMobile ? 155 : 200;
        const cardH = state.isMobile ? 110 : 140;
        
        const padding = 15;
        const topPadding = 80;
        const bottomPadding = 100;
        
        x = clamp(x - cardW / 2, padding, state.viewportWidth - cardW - padding) + cardW / 2;
        y = clamp(y - cardH / 2, topPadding, state.viewportHeight - cardH - bottomPadding) + cardH / 2;
        
        const translateX = x - cardW / 2;
        const translateY = y - cardH / 2;
        
        card.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
        card.style.opacity = 1;
        card.style.filter = 'none';
    });
}

// =====================================================
// CARD SELECTION
// =====================================================

function selectCard(serviceId) {
    if (state.isPanelOpen) return;
    
    const service = SERVICES.find(s => s.id === parseInt(serviceId));
    if (!service) return;
    
    const cards = DOM.orbitContainer.querySelectorAll('.service-card');
    const selectedCard = DOM.orbitContainer.querySelector(`[data-id="${serviceId}"]`);
    
    state.selectedServiceId = serviceId;
    state.orbitPaused = true;
    
    // Card dimensions
    const cardW = state.isMobile ? 155 : 200;
    
    // Dim other cards, highlight selected
    cards.forEach((card) => {
        if (card.dataset.id === serviceId.toString()) {
            card.classList.add('selected');
            card.classList.remove('dimmed');
            
            // Fly forward - use translate3d only
            if (!state.prefersReducedMotion && selectedCard) {
                const targetX = state.viewportWidth / 2 - cardW / 2;
                const targetY = state.viewportHeight * 0.22;
                
                card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease';
                card.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(1.15)`;
                card.style.opacity = 1;
                card.style.filter = 'none';
                card.style.zIndex = 100;
            }
        } else {
            card.classList.add('dimmed');
            card.classList.remove('selected');
        }
    });
    
    // Show hand beam
    if (DOM.handBeam) DOM.handBeam.classList.add('active');
    
    // Hide hint
    if (DOM.hint) DOM.hint.classList.add('hidden');
    
    // Update and show panel
    updatePanelContent(service);
    
    setTimeout(() => {
        openPanel();
    }, state.prefersReducedMotion ? 0 : 300);
}

function deselectCard() {
    const cards = DOM.orbitContainer ? DOM.orbitContainer.querySelectorAll('.service-card') : [];
    
    cards.forEach((card) => {
        card.classList.remove('selected', 'dimmed');
        card.style.transition = 'transform 0.4s ease, opacity 0.3s ease, filter 0.3s ease';
    });
    
    if (DOM.handBeam) DOM.handBeam.classList.remove('active');
    state.selectedServiceId = null;
    state.orbitPaused = false;
    
    // Show hint
    if (DOM.hint) DOM.hint.classList.remove('hidden');
    
    if (state.prefersReducedMotion) {
        positionCardsStatic();
    }
}

// =====================================================
// PANEL
// =====================================================

function updatePanelContent(service) {
    if (DOM.panelIcon) DOM.panelIcon.textContent = service.icon;
    if (DOM.panelTitle) DOM.panelTitle.textContent = service.title;
    if (DOM.panelSubtitle) DOM.panelSubtitle.textContent = service.subtitle;
    if (DOM.panelDescription) DOM.panelDescription.textContent = service.description;
    if (DOM.panelDuration) DOM.panelDuration.textContent = service.duration;
    if (DOM.panelPrice) DOM.panelPrice.textContent = service.startingPrice;
    
    if (DOM.panelFeatures) {
        DOM.panelFeatures.innerHTML = service.bullets
            .map(b => `<li>${b}</li>`)
            .join('');
    }
}

function openPanel() {
    if (DOM.panelOverlay) DOM.panelOverlay.classList.add('open');
    if (DOM.detailsPanel) DOM.detailsPanel.classList.add('open');
    if (DOM.stageServices) DOM.stageServices.classList.add('is-panel-open');
    state.isPanelOpen = true;
    
    // Focus management
    setTimeout(() => {
        if (DOM.panelClose) DOM.panelClose.focus();
    }, 100);
}

function closePanel() {
    if (DOM.panelOverlay) DOM.panelOverlay.classList.remove('open');
    if (DOM.detailsPanel) DOM.detailsPanel.classList.remove('open');
    if (DOM.stageServices) DOM.stageServices.classList.remove('is-panel-open');
    state.isPanelOpen = false;
    deselectCard();
}

// =====================================================
// MENU
// =====================================================

function openMenu() {
    state.isMenuOpen = true;
    if (DOM.globalMenuToggle) DOM.globalMenuToggle.classList.add('active');
    if (DOM.menuToggle) DOM.menuToggle.classList.add('active');
    if (DOM.menuToggle2) DOM.menuToggle2.classList.add('active');
    if (DOM.mainMenu) DOM.mainMenu.classList.add('open');
    if (DOM.menuOverlay) DOM.menuOverlay.classList.add('open');
}

function closeMenu() {
    state.isMenuOpen = false;
    if (DOM.globalMenuToggle) DOM.globalMenuToggle.classList.remove('active');
    if (DOM.menuToggle) DOM.menuToggle.classList.remove('active');
    if (DOM.menuToggle2) DOM.menuToggle2.classList.remove('active');
    if (DOM.mainMenu) DOM.mainMenu.classList.remove('open');
    if (DOM.menuOverlay) DOM.menuOverlay.classList.remove('open');
}

function toggleMenu() {
    if (state.isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

function handleMenuItemClick(item) {
    closeMenu();
    
    const stage = item.dataset.stage;
    const modal = item.dataset.modal;
    
    if (stage) {
        switch (stage) {
            case 'intro':
                goToStage(STAGES.INTRO);
                break;
            case 'journey':
                goToStage(STAGES.JOURNEY);
                break;
            case 'servicesPortal':
                goToStage(STAGES.SERVICES_PORTAL);
                break;
            case 'worksPortal':
                goToStage(STAGES.WORKS_PORTAL);
                break;
            case 'contactPortal':
                goToStage(STAGES.CONTACT_PORTAL);
                break;
            case 'contact':
                goToStage(STAGES.CONTACT);
                break;
            case 'orders':
                openModal('orders');
                loadOrders();
                break;
        }
    }
    
    if (modal) {
        openModal(modal);
    }
}

// =====================================================
// MODALS
// =====================================================

function openModal(modalName) {
    const overlay = document.getElementById(`${modalName}Overlay`);
    const modal = document.getElementById(`${modalName}Modal`);
    
    if (overlay && modal) {
        overlay.classList.add('open');
        modal.classList.add('open');
        state.openModals.push(modalName);
        
        // Focus first focusable element
        setTimeout(() => {
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) closeBtn.focus();
        }, 100);
    }
}

function closeModal(modalName) {
    const overlay = document.getElementById(`${modalName}Overlay`);
    const modal = document.getElementById(`${modalName}Modal`);
    
    if (overlay && modal) {
        overlay.classList.remove('open');
        modal.classList.remove('open');
        state.openModals = state.openModals.filter(m => m !== modalName);
        
        // If closing portfolio detail from works stage, deselect work card
        if (modalName === 'portfolioDetail' && state.currentStage === STAGES.WORKS) {
            deselectWorkCard();
        }
    }
}

function closeAllModals() {
    const modals = ['orderForm', 'privacy', 'refund', 'portfolioDetail', 'orders'];
    modals.forEach(closeModal);
}

// =====================================================
// ORDER FORM
// =====================================================

function openOrderForm() {
    const service = SERVICES.find(s => s.id === parseInt(state.selectedServiceId));
    if (service && DOM.orderService) {
        DOM.orderService.value = service.title;
    }
    openModal('orderForm');
}

function handleOrderSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(DOM.orderForm);
    const order = {
        id: Date.now(),
        service: formData.get('service') || (DOM.orderService ? DOM.orderService.value : ''),
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        notes: formData.get('notes'),
        date: new Date().toLocaleDateString('ar-SA'),
        status: 'قيد المراجعة'
    };
    
    // Save to localStorage
    saveOrder(order);
    
    // Close modals
    closeModal('orderForm');
    closePanel();
    
    // Show success feedback
    alert('تم حفظ طلبك بنجاح! يمكنك متابعته من صفحة "طلباتي"');
    
    // Reset form
    if (DOM.orderForm) DOM.orderForm.reset();
}

function handleWhatsAppOrder() {
    const formData = new FormData(DOM.orderForm);
    const service = formData.get('service') || (DOM.orderService ? DOM.orderService.value : '');
    const name = formData.get('name') || '';
    const phone = formData.get('phone') || '';
    const email = formData.get('email') || '';
    const notes = formData.get('notes') || '';
    
    let message = `مرحباً، أود طلب خدمة:\n\n`;
    message += `📋 الخدمة: ${service}\n`;
    if (name) message += `👤 الاسم: ${name}\n`;
    if (phone) message += `📱 الجوال: ${phone}\n`;
    if (email) message += `📧 البريد: ${email}\n`;
    if (notes) message += `📝 ملاحظات: ${notes}\n`;
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// =====================================================
// CONTACT FORM
// =====================================================

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(DOM.contactForm);
    const name = formData.get('name') || '';
    const phone = formData.get('phone') || '';
    const message = formData.get('message') || '';
    
    let whatsappMessage = `رسالة من الموقع:\n\n`;
    if (name) whatsappMessage += `👤 الاسم: ${name}\n`;
    if (phone) whatsappMessage += `📱 الجوال: ${phone}\n`;
    if (message) whatsappMessage += `💬 الرسالة:\n${message}\n`;
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
    
    // Reset form
    if (DOM.contactForm) DOM.contactForm.reset();
}

// =====================================================
// ORDERS STORAGE
// =====================================================

function saveOrder(order) {
    const orders = getOrders();
    orders.unshift(order);
    localStorage.setItem('raed_orders', JSON.stringify(orders));
}

function getOrders() {
    try {
        return JSON.parse(localStorage.getItem('raed_orders')) || [];
    } catch {
        return [];
    }
}

function loadOrders() {
    const orders = getOrders();
    
    if (orders.length === 0) {
        if (DOM.ordersList) DOM.ordersList.classList.add('hidden');
        if (DOM.ordersEmpty) DOM.ordersEmpty.classList.remove('hidden');
    } else {
        if (DOM.ordersList) {
            DOM.ordersList.classList.remove('hidden');
            DOM.ordersList.innerHTML = orders.map(order => `
                <div class="order-card">
                    <div class="order-header">
                        <span class="order-service">${order.service}</span>
                        <span class="order-date">${order.date}</span>
                    </div>
                    <div class="order-details">
                        <p><strong>الاسم:</strong> ${order.name}</p>
                        <p><strong>الجوال:</strong> ${order.phone}</p>
                        ${order.email ? `<p><strong>البريد:</strong> ${order.email}</p>` : ''}
                        ${order.notes ? `<p><strong>ملاحظات:</strong> ${order.notes}</p>` : ''}
                    </div>
                    <span class="order-status">${order.status}</span>
                </div>
            `).join('');
        }
        if (DOM.ordersEmpty) DOM.ordersEmpty.classList.add('hidden');
    }
}

// =====================================================
// PORTFOLIO DETAIL
// =====================================================

function openPortfolioDetail(itemId) {
    const item = PORTFOLIO.find(p => p.id === parseInt(itemId));
    if (!item) return;
    
    if (DOM.portfolioDetailTitle) DOM.portfolioDetailTitle.textContent = item.title;
    if (DOM.portfolioDetailContent) {
        DOM.portfolioDetailContent.innerHTML = `
            <div class="portfolio-thumb" style="background: ${item.gradient}; height: 180px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 4rem; margin-bottom: 1.5rem;">
                <span style="filter: grayscale(1) brightness(2);">🖼️</span>
            </div>
            <h4>${item.title}</h4>
            <p>${item.details}</p>
            <div class="detail-tags">
                ${item.tags.map(tag => `<span class="detail-tag">${tag}</span>`).join('')}
            </div>
        `;
    }
    
    openModal('portfolioDetail');
}

// =====================================================
// WORK CARD SELECTION
// =====================================================

function selectWorkCard(workId) {
    if (state.isWorksPanelOpen) return;
    
    const work = PORTFOLIO.find(p => p.id === parseInt(workId));
    if (!work) return;
    
    const cards = DOM.worksOrbitContainer.querySelectorAll('.work-card');
    const selectedCard = DOM.worksOrbitContainer.querySelector(`[data-id="${workId}"]`);
    
    state.selectedWorkId = workId;
    state.worksOrbitPaused = true;
    
    const cardW = state.isMobile ? 155 : 200;
    
    cards.forEach((card) => {
        if (card.dataset.id === workId.toString()) {
            card.classList.add('selected');
            card.classList.remove('dimmed');
            
            if (!state.prefersReducedMotion && selectedCard) {
                const targetX = state.viewportWidth / 2 - cardW / 2;
                const targetY = state.viewportHeight * 0.22;
                
                card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease';
                card.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(1.15)`;
                card.style.opacity = 1;
                card.style.filter = 'none';
                card.style.zIndex = 100;
            }
        } else {
            card.classList.add('dimmed');
            card.classList.remove('selected');
        }
    });
    
    if (DOM.handBeamWorks) DOM.handBeamWorks.classList.add('active');
    if (DOM.hintWorks) DOM.hintWorks.classList.add('hidden');
    
    // Open portfolio detail modal
    setTimeout(() => {
        openPortfolioDetail(workId);
        state.isWorksPanelOpen = true;
    }, state.prefersReducedMotion ? 0 : 300);
}

function deselectWorkCard() {
    const cards = DOM.worksOrbitContainer ? DOM.worksOrbitContainer.querySelectorAll('.work-card') : [];
    
    cards.forEach((card) => {
        card.classList.remove('selected', 'dimmed');
        card.style.transition = 'transform 0.4s ease, opacity 0.3s ease, filter 0.3s ease';
    });
    
    if (DOM.handBeamWorks) DOM.handBeamWorks.classList.remove('active');
    state.selectedWorkId = null;
    state.worksOrbitPaused = false;
    state.isWorksPanelOpen = false;
    
    if (DOM.hintWorks) DOM.hintWorks.classList.remove('hidden');
    
    if (state.prefersReducedMotion) {
        positionWorksCardsStatic();
    }
}

// =====================================================
// KEYBOARD NAVIGATION
// =====================================================

function handleKeyboard(e) {
    // Escape to close
    if (e.key === 'Escape') {
        if (state.openModals.length > 0) {
            e.preventDefault();
            closeModal(state.openModals[state.openModals.length - 1]);
            return;
        }
        if (state.isPanelOpen) {
            e.preventDefault();
            closePanel();
            return;
        }
        if (state.isMenuOpen) {
            e.preventDefault();
            closeMenu();
            return;
        }
    }
    
    if (state.currentStage !== STAGES.SERVICES || state.isPanelOpen || state.isMenuOpen || state.openModals.length > 0) return;
    
    const cards = DOM.orbitContainer ? DOM.orbitContainer.querySelectorAll('.service-card') : [];
    if (cards.length === 0) return;
    
    switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            state.focusedCardIndex = (state.focusedCardIndex - 1 + cards.length) % cards.length;
            updateFocusedCard(cards);
            break;
            
        case 'ArrowRight':
        case 'ArrowDown':
            e.preventDefault();
            state.focusedCardIndex = (state.focusedCardIndex + 1) % cards.length;
            updateFocusedCard(cards);
            break;
            
        case 'Enter':
        case ' ':
            e.preventDefault();
            const focusedCard = cards[state.focusedCardIndex];
            if (focusedCard) {
                selectCard(focusedCard.dataset.id);
            }
            break;
    }
}

function updateFocusedCard(cards) {
    cards.forEach((card, i) => {
        if (i === state.focusedCardIndex) {
            card.classList.add('focused');
            card.focus();
        } else {
            card.classList.remove('focused');
        }
    });
}

// =====================================================
// EVENT LISTENERS
// =====================================================

function setupEventListeners() {
    // Stage navigation buttons
    if (DOM.btnStartJourney) {
        DOM.btnStartJourney.addEventListener('click', () => goToStage(STAGES.JOURNEY));
    }
    if (DOM.btnEnterServices) {
        DOM.btnEnterServices.addEventListener('click', () => goToStage(STAGES.SERVICES));
    }
    if (DOM.btnToWorksPortal) {
        DOM.btnToWorksPortal.addEventListener('click', () => goToStage(STAGES.WORKS_PORTAL));
    }
    if (DOM.btnEnterWorks) {
        DOM.btnEnterWorks.addEventListener('click', () => goToStage(STAGES.WORKS));
    }
    if (DOM.btnEnterContact) {
        DOM.btnEnterContact.addEventListener('click', () => goToStage(STAGES.CONTACT));
    }
    if (DOM.btnBackToServices) {
        DOM.btnBackToServices.addEventListener('click', () => goToStage(STAGES.JOURNEY));
    }
    if (DOM.btnBackToJourney) {
        DOM.btnBackToJourney.addEventListener('click', () => goToStage(STAGES.JOURNEY));
    }
    if (DOM.btnBackFromContact) {
        DOM.btnBackFromContact.addEventListener('click', () => goToStage(STAGES.JOURNEY));
    }
    
    // Global buttons
    if (DOM.globalMenuToggle) {
        DOM.globalMenuToggle.addEventListener('click', toggleMenu);
    }
    if (DOM.globalHomeBtn) {
        DOM.globalHomeBtn.addEventListener('click', () => goToStage(STAGES.INTRO));
    }
    
    // Journey portal cards
    if (DOM.journeyPortalCards) {
        DOM.journeyPortalCards.forEach(card => {
            card.addEventListener('click', () => {
                const portal = card.dataset.portal;
                if (portal === 'services') {
                    goToStage(STAGES.SERVICES_PORTAL);
                } else if (portal === 'works') {
                    goToStage(STAGES.WORKS_PORTAL);
                } else if (portal === 'contact') {
                    goToStage(STAGES.CONTACT_PORTAL);
                }
            });
        });
    }
    
    // Home buttons
    if (DOM.btnHomeServices) {
        DOM.btnHomeServices.addEventListener('click', () => goToStage(STAGES.INTRO));
    }
    if (DOM.btnHomeWorks) {
        DOM.btnHomeWorks.addEventListener('click', () => goToStage(STAGES.INTRO));
    }
    if (DOM.btnHomeContact) {
        DOM.btnHomeContact.addEventListener('click', () => goToStage(STAGES.INTRO));
    }
    
    // Service card clicks
    if (DOM.orbitContainer) {
        DOM.orbitContainer.addEventListener('click', (e) => {
            const card = e.target.closest('.service-card');
            if (card && !state.isPanelOpen) {
                selectCard(card.dataset.id);
            }
        });
        
        // Card keyboard
        DOM.orbitContainer.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const card = e.target.closest('.service-card');
                if (card && !state.isPanelOpen) {
                    e.preventDefault();
                    selectCard(card.dataset.id);
                }
            }
        });
    }
    
    // Work card clicks
    if (DOM.worksOrbitContainer) {
        DOM.worksOrbitContainer.addEventListener('click', (e) => {
            const card = e.target.closest('.work-card');
            if (card && !state.isWorksPanelOpen) {
                selectWorkCard(card.dataset.id);
            }
        });
        
        // Card keyboard
        DOM.worksOrbitContainer.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const card = e.target.closest('.work-card');
                if (card && !state.isWorksPanelOpen) {
                    e.preventDefault();
                    selectWorkCard(card.dataset.id);
                }
            }
        });
    }
    
    // Menu toggles
    if (DOM.menuToggle) DOM.menuToggle.addEventListener('click', toggleMenu);
    if (DOM.menuToggle2) DOM.menuToggle2.addEventListener('click', toggleMenu);
    if (DOM.menuToggle3) DOM.menuToggle3.addEventListener('click', toggleMenu);
    if (DOM.menuCloseBtn) DOM.menuCloseBtn.addEventListener('click', closeMenu);
    if (DOM.menuOverlay) DOM.menuOverlay.addEventListener('click', closeMenu);
    
    // Menu items
    if (DOM.mainMenu) {
        DOM.mainMenu.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => handleMenuItemClick(item));
        });
    }
    
    // Contact form
    if (DOM.contactForm) {
        DOM.contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    // Panel close
    if (DOM.panelClose) DOM.panelClose.addEventListener('click', closePanel);
    if (DOM.btnPanelBack) DOM.btnPanelBack.addEventListener('click', closePanel);
    if (DOM.panelOverlay) DOM.panelOverlay.addEventListener('click', closePanel);
    
    // Order form
    if (DOM.btnOrderForm) DOM.btnOrderForm.addEventListener('click', openOrderForm);
    if (DOM.orderFormClose) DOM.orderFormClose.addEventListener('click', () => closeModal('orderForm'));
    if (DOM.orderFormOverlay) DOM.orderFormOverlay.addEventListener('click', () => closeModal('orderForm'));
    if (DOM.orderForm) DOM.orderForm.addEventListener('submit', handleOrderSubmit);
    if (DOM.btnWhatsappOrder) DOM.btnWhatsappOrder.addEventListener('click', handleWhatsAppOrder);
    
    // Modal close buttons with data-close attribute
    document.querySelectorAll('.modal-close[data-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.dataset.close);
        });
    });
    
    // Modal overlays
    if (DOM.privacyOverlay) DOM.privacyOverlay.addEventListener('click', () => closeModal('privacy'));
    if (DOM.refundOverlay) DOM.refundOverlay.addEventListener('click', () => closeModal('refund'));
    if (DOM.portfolioDetailOverlay) DOM.portfolioDetailOverlay.addEventListener('click', () => closeModal('portfolioDetail'));
    if (DOM.ordersOverlay) DOM.ordersOverlay.addEventListener('click', () => closeModal('orders'));
    
    // Portfolio grid clicks
    if (DOM.portfolioGrid) {
        DOM.portfolioGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('.portfolio-btn');
            if (btn) {
                openPortfolioDetail(btn.dataset.id);
            }
        });
    }
    
    // Browse services from orders
    if (DOM.btnBrowseServices) {
        DOM.btnBrowseServices.addEventListener('click', () => {
            closeModal('orders');
            goToStage(STAGES.SERVICES);
        });
    }
    
    // Keyboard
    document.addEventListener('keydown', handleKeyboard);
    
    // Resize & orientation change
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            recalcLayout();
            if (state.currentStage === STAGES.SERVICES) {
                if (state.prefersReducedMotion) {
                    positionCardsStatic();
                }
            } else if (state.currentStage === STAGES.WORKS) {
                if (state.prefersReducedMotion) {
                    positionWorksCardsStatic();
                }
            }
        }, 100);
    });
    
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            recalcLayout();
            if (state.currentStage === STAGES.SERVICES && state.prefersReducedMotion) {
                positionCardsStatic();
            } else if (state.currentStage === STAGES.WORKS && state.prefersReducedMotion) {
                positionWorksCardsStatic();
            }
        }, 200);
    });
    
    // Reduced motion change
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
        state.prefersReducedMotion = e.matches;
        if (e.matches) {
            stopOrbitAnimation();
            stopWorksOrbitAnimation();
            if (state.currentStage === STAGES.SERVICES) {
                positionCardsStatic();
            } else if (state.currentStage === STAGES.WORKS) {
                positionWorksCardsStatic();
            }
        } else {
            if (state.currentStage === STAGES.SERVICES) {
                startOrbitAnimation();
            } else if (state.currentStage === STAGES.WORKS) {
                startWorksOrbitAnimation();
            }
        }
    });
    
    // Prevent touch scroll issues on iOS
    document.addEventListener('touchmove', (e) => {
        const scrollable = e.target.closest('.panel-content, .modal-body, .modal-scroll, .works-container');
        if (scrollable) return;
    }, { passive: true });
}

// =====================================================
// START
// =====================================================

document.addEventListener('DOMContentLoaded', init);
