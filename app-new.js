/* ========================================
   WAARFE - Raed | 3D Grid Static App
   NO ORBIT - Static Grid Layout
   ======================================== */

(() => {
    'use strict';

    // ========== CONFIG ==========
    const CONFIG = {
        WHATSAPP_NUMBER: '966536090915',
        EMAIL: 'raed@raed.digital',
        STARS_COUNT: 80,
        STAGES: {
            INTRO: 'intro',
            JOURNEY: 'journey',
            SERVICES_PORTAL: 'services-portal',
            SERVICES: 'services',
            WORKS_PORTAL: 'works-portal',
            WORKS: 'works',
            CONTACT_PORTAL: 'contact-portal',
            CONTACT: 'contact'
        }
    };

    // ========== DATA ==========
    const SERVICES_DATA = [
        {
            id: 'web',
            icon: '🌐',
            title: 'تطوير المواقع',
            subtitle: 'مواقع احترافية',
            description: 'أصمم مواقع ويب حديثة ومتجاوبة تعكس هوية علامتك التجارية. استخدم أحدث التقنيات لضمان أداء عالي وتجربة مستخدم رائعة.',
            features: ['تصميم متجاوب', 'تحسين SEO', 'سرعة عالية', 'واجهة مستخدم حديثة'],
            duration: '2-4 أسابيع',
            investment: 'يبدأ من 3000 ر.س'
        },
        {
            id: 'app',
            icon: '📱',
            title: 'تطبيقات الجوال',
            subtitle: 'iOS & Android',
            description: 'أطور تطبيقات جوال عالية الجودة تعمل على جميع الأجهزة. تصميم جذاب وأداء سلس مع ميزات متقدمة.',
            features: ['متوافق مع iOS/Android', 'إشعارات فورية', 'تصميم عصري', 'أداء سريع'],
            duration: '4-8 أسابيع',
            investment: 'يبدأ من 5000 ر.س'
        },
        {
            id: 'brand',
            icon: '🎨',
            title: 'تصميم الهوية',
            subtitle: 'علامة مميزة',
            description: 'أصمم هويات بصرية متكاملة تميز علامتك التجارية. شعارات إبداعية وألوان متناسقة وتصاميم فريدة.',
            features: ['شعار احترافي', 'دليل الهوية', 'مطبوعات', 'ملفات متعددة'],
            duration: '1-2 أسبوع',
            investment: 'يبدأ من 1500 ر.س'
        },
        {
            id: 'ui',
            icon: '✨',
            title: 'تصميم واجهات',
            subtitle: 'UI/UX Design',
            description: 'أصمم واجهات مستخدم جذابة وسهلة الاستخدام. دراسة تجربة المستخدم وتصميم تفاعلي يحقق أهداف مشروعك.',
            features: ['تصميم Figma', 'تجربة مستخدم', 'نماذج تفاعلية', 'اختبار قابلية الاستخدام'],
            duration: '1-3 أسابيع',
            investment: 'يبدأ من 2000 ر.س'
        },
        {
            id: 'motion',
            icon: '🎬',
            title: 'موشن جرافيك',
            subtitle: 'رسوم متحركة',
            description: 'أنتج فيديوهات موشن جرافيك إبداعية تشرح أفكارك وخدماتك بطريقة جذابة ومؤثرة.',
            features: ['سكربت إبداعي', 'تعليق صوتي', 'مؤثرات بصرية', 'جودة 4K'],
            duration: '1-2 أسبوع',
            investment: 'يبدأ من 2500 ر.س'
        },
        {
            id: 'consult',
            icon: '💡',
            title: 'استشارات رقمية',
            subtitle: 'خبرة وتوجيه',
            description: 'أقدم استشارات متخصصة في التحول الرقمي والتسويق الإلكتروني لمساعدتك في تحقيق أهداف مشروعك.',
            features: ['تحليل السوق', 'خطة استراتيجية', 'توصيات عملية', 'متابعة مستمرة'],
            duration: 'جلسات مرنة',
            investment: 'يبدأ من 500 ر.س/ساعة'
        }
    ];

    const WORKS_DATA = [
        {
            id: 'work1',
            icon: '🌿',
            title: 'متجر نباتات',
            tag: 'موقع ويب',
            description: 'متجر إلكتروني متكامل لبيع النباتات الداخلية والخارجية مع نظام حجز ودفع إلكتروني.',
            details: 'تم تصميم المتجر بأسلوب عصري يعكس طبيعة المنتجات. يتضمن كتالوج منتجات تفاعلي، سلة مشتريات ذكية، ونظام دفع متعدد الخيارات.',
            tags: ['E-commerce', 'React', 'Node.js']
        },
        {
            id: 'work2',
            icon: '☕',
            title: 'تطبيق مقهى',
            tag: 'تطبيق جوال',
            description: 'تطبيق لطلب القهوة والمشروبات مع نظام ولاء وتتبع الطلبات.',
            details: 'تطبيق متكامل يتيح للعملاء تصفح المنيو، الطلب المسبق، الدفع الإلكتروني، وجمع نقاط الولاء. يتضمن لوحة تحكم للإدارة.',
            tags: ['Flutter', 'Firebase', 'UX Design']
        },
        {
            id: 'work3',
            icon: '🏢',
            title: 'هوية شركة عقارية',
            tag: 'براندينج',
            description: 'هوية بصرية متكاملة لشركة تطوير عقاري تشمل الشعار والمطبوعات.',
            details: 'صممت هوية فاخرة تعكس الاحترافية والثقة. تشمل الشعار، الألوان، الخطوط، بطاقات العمل، الترويسات، وقوالب السوشيال ميديا.',
            tags: ['Logo Design', 'Brand Identity', 'Print']
        },
        {
            id: 'work4',
            icon: '📊',
            title: 'لوحة تحكم SaaS',
            tag: 'UI/UX',
            description: 'تصميم واجهة مستخدم للوحة تحكم نظام إدارة المشاريع.',
            details: 'واجهة حديثة وسهلة الاستخدام مع رسوم بيانية تفاعلية، نظام إشعارات، وإدارة المهام. تصميم متجاوب يعمل على جميع الأجهزة.',
            tags: ['Dashboard', 'Figma', 'Design System']
        },
        {
            id: 'work5',
            icon: '🎥',
            title: 'فيديو إعلاني',
            tag: 'موشن جرافيك',
            description: 'فيديو ترويجي لتطبيق توصيل مع رسوم متحركة جذابة.',
            details: 'فيديو مدته 60 ثانية يشرح مميزات التطبيق بأسلوب ممتع. يتضمن شخصيات متحركة، انتقالات سلسة، وتعليق صوتي احترافي.',
            tags: ['After Effects', 'Animation', 'Storytelling']
        },
        {
            id: 'work6',
            icon: '🛒',
            title: 'منصة تسوق',
            tag: 'تطبيق ويب',
            description: 'منصة تسوق إلكترونية متعددة البائعين مع نظام عمولات.',
            details: 'سوق إلكتروني يجمع البائعين والمشترين. يتضمن نظام تقييمات، دردشة مباشرة، تتبع شحن، ولوحات تحكم متعددة المستويات.',
            tags: ['Marketplace', 'Vue.js', 'Laravel']
        }
    ];

    // ========== STATE ==========
    const state = {
        currentStage: CONFIG.STAGES.INTRO,
        selectedService: null,
        selectedWork: null,
        menuOpen: false,
        panelOpen: false,
        orders: []
    };

    // ========== DOM CACHE ==========
    const dom = {};

    function cacheDom() {
        // Loader
        dom.loader = document.getElementById('loader');

        // Stars
        dom.starsContainer = document.getElementById('starsContainer');

        // Global buttons
        dom.globalMenuToggle = document.getElementById('globalMenuToggle');
        dom.globalHomeBtn = document.getElementById('globalHomeBtn');

        // Stages
        dom.stages = {
            intro: document.getElementById('stageIntro'),
            journey: document.getElementById('stageJourney'),
            servicesPortal: document.getElementById('stageServicesPortal'),
            services: document.getElementById('stageServices'),
            worksPortal: document.getElementById('stageWorksPortal'),
            works: document.getElementById('stageWorks'),
            contactPortal: document.getElementById('stageContactPortal'),
            contact: document.getElementById('stageContact')
        };

        // 3D Grids
        dom.servicesGrid = document.getElementById('servicesGrid');
        dom.worksGrid = document.getElementById('worksGrid');

        // Navigation buttons
        dom.btnServicesGoWorks = document.getElementById('btnServicesGoWorks');
        dom.btnServicesBack = document.getElementById('btnServicesBack');
        dom.btnWorksGoContact = document.getElementById('btnWorksGoContact');
        dom.btnWorksBack = document.getElementById('btnWorksBack');

        // CTA & Journey portals
        dom.ctaStart = document.getElementById('ctaStart');
        dom.portalServices = document.getElementById('portalServices');
        dom.portalWorks = document.getElementById('portalWorks');
        dom.portalContact = document.getElementById('portalContact');
        dom.portalEnterServices = document.getElementById('portalEnterServices');
        dom.portalEnterWorks = document.getElementById('portalEnterWorks');
        dom.portalEnterContact = document.getElementById('portalEnterContact');

        // Menu
        dom.menuOverlay = document.getElementById('menuOverlay');
        dom.mainMenu = document.getElementById('mainMenu');
        dom.menuCloseBtn = document.getElementById('menuCloseBtn');
        dom.menuItems = document.querySelectorAll('.menu-item');

        // Details Panel
        dom.panelOverlay = document.getElementById('panelOverlay');
        dom.detailsPanel = document.getElementById('detailsPanel');
        dom.panelClose = document.getElementById('panelClose');
        dom.panelIcon = document.getElementById('panelIcon');
        dom.panelTitle = document.getElementById('panelTitle');
        dom.panelSubtitle = document.getElementById('panelSubtitle');
        dom.panelDescription = document.getElementById('panelDescription');
        dom.panelFeatures = document.getElementById('panelFeatures');
        dom.panelMeta = document.getElementById('panelMeta');
        dom.panelDuration = document.getElementById('panelDuration');
        dom.panelInvestment = document.getElementById('panelInvestment');
        dom.panelActions = document.getElementById('panelActions');
        dom.btnPanelOrder = document.getElementById('btnPanelOrder');
        dom.btnPanelWhatsapp = document.getElementById('btnPanelWhatsapp');

        // Modals
        dom.modalOverlay = document.getElementById('modalOverlay');
        dom.orderModal = document.getElementById('orderModal');
        dom.orderModalClose = document.getElementById('orderModalClose');
        dom.orderForm = document.getElementById('orderForm');
        dom.orderServiceName = document.getElementById('orderServiceName');
        dom.orderServiceHidden = document.getElementById('orderServiceHidden');

        dom.ordersModal = document.getElementById('ordersModal');
        dom.ordersModalClose = document.getElementById('ordersModalClose');
        dom.ordersList = document.getElementById('ordersList');
        dom.ordersEmptyState = document.getElementById('ordersEmptyState');

        dom.policyModal = document.getElementById('policyModal');
        dom.policyModalClose = document.getElementById('policyModalClose');
        dom.policyModalTitle = document.getElementById('policyModalTitle');
        dom.policyContent = document.getElementById('policyContent');

        dom.portfolioModal = document.getElementById('portfolioModal');
        dom.portfolioModalClose = document.getElementById('portfolioModalClose');
        dom.portfolioModalTitle = document.getElementById('portfolioModalTitle');
        dom.portfolioDetailContent = document.getElementById('portfolioDetailContent');
        dom.btnPortfolioWhatsapp = document.getElementById('btnPortfolioWhatsapp');

        // Contact
        dom.contactForm = document.getElementById('contactForm');

        // Portal transition
        dom.portalTransition = document.getElementById('portalTransition');
    }

    // ========== STARS ==========
    function createStars() {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < CONFIG.STARS_COUNT; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                --duration: ${2 + Math.random() * 3}s;
                --delay: ${Math.random() * 3}s;
            `;
            fragment.appendChild(star);
        }
        dom.starsContainer.appendChild(fragment);
    }

    // ========== STAGE MANAGEMENT ==========
    function setStage(newStage) {
        Object.values(dom.stages).forEach(stage => {
            if (stage) stage.classList.remove('active');
        });

        const stageMapping = {
            [CONFIG.STAGES.INTRO]: dom.stages.intro,
            [CONFIG.STAGES.JOURNEY]: dom.stages.journey,
            [CONFIG.STAGES.SERVICES_PORTAL]: dom.stages.servicesPortal,
            [CONFIG.STAGES.SERVICES]: dom.stages.services,
            [CONFIG.STAGES.WORKS_PORTAL]: dom.stages.worksPortal,
            [CONFIG.STAGES.WORKS]: dom.stages.works,
            [CONFIG.STAGES.CONTACT_PORTAL]: dom.stages.contactPortal,
            [CONFIG.STAGES.CONTACT]: dom.stages.contact
        };

        const targetStage = stageMapping[newStage];
        if (targetStage) {
            targetStage.classList.add('active');
        }

        state.currentStage = newStage;

        // Update body class for styling
        document.body.className = '';
        document.body.classList.add(`stage-is-${newStage}`);

        // Close panel if open
        closePanel();
    }

    function showPortalTransition(callback) {
        dom.portalTransition.classList.add('active');
        setTimeout(() => {
            dom.portalTransition.classList.remove('active');
            if (callback) callback();
        }, 600);
    }

    // ========== 3D GRID GENERATION ==========
    function createServicesGrid() {
        dom.servicesGrid.innerHTML = '';
        const fragment = document.createDocumentFragment();

        SERVICES_DATA.forEach((service, index) => {
            const card = document.createElement('div');
            card.className = 'card3d';
            card.dataset.serviceId = service.id;
            card.innerHTML = `
                <span class="card3d-icon">${service.icon}</span>
                <h3 class="card3d-title">${service.title}</h3>
                <p class="card3d-desc">${service.subtitle}</p>
            `;
            
            // Alternate 3D tilt for visual interest
            const tiltX = (index % 2 === 0) ? 2 : -2;
            const tiltY = (index % 3 === 0) ? -3 : 3;
            card.style.transform = `rotateY(${tiltY}deg) rotateX(${tiltX}deg)`;

            card.addEventListener('click', () => selectService(service.id));
            fragment.appendChild(card);
        });

        dom.servicesGrid.appendChild(fragment);
    }

    function createWorksGrid() {
        dom.worksGrid.innerHTML = '';
        const fragment = document.createDocumentFragment();

        WORKS_DATA.forEach((work, index) => {
            const card = document.createElement('div');
            card.className = 'card3d card3d-work';
            card.dataset.workId = work.id;
            card.innerHTML = `
                <span class="card3d-icon">${work.icon}</span>
                <h3 class="card3d-title">${work.title}</h3>
                <span class="card3d-tag">${work.tag}</span>
            `;
            
            // Alternate 3D tilt
            const tiltX = (index % 2 === 0) ? -2 : 2;
            const tiltY = (index % 3 === 0) ? 3 : -3;
            card.style.transform = `rotateY(${tiltY}deg) rotateX(${tiltX}deg)`;

            card.addEventListener('click', () => selectWork(work.id));
            fragment.appendChild(card);
        });

        dom.worksGrid.appendChild(fragment);
    }

    // ========== SERVICE SELECTION ==========
    function selectService(serviceId) {
        const service = SERVICES_DATA.find(s => s.id === serviceId);
        if (!service) return;

        state.selectedService = service;

        // Highlight selected card
        document.querySelectorAll('#servicesGrid .card3d').forEach(card => {
            if (card.dataset.serviceId === serviceId) {
                card.classList.add('active');
            } else {
                card.classList.add('dimmed');
            }
        });

        showServicePanel(service);
    }

    function showServicePanel(service) {
        dom.panelIcon.textContent = service.icon;
        dom.panelTitle.textContent = service.title;
        dom.panelSubtitle.textContent = service.subtitle;
        dom.panelDescription.textContent = service.description;

        // Features
        dom.panelFeatures.innerHTML = service.features
            .map(f => `<li>${f}</li>`)
            .join('');

        // Meta
        dom.panelMeta.classList.remove('hidden');
        dom.panelDuration.textContent = service.duration;
        dom.panelInvestment.textContent = service.investment;

        // Actions
        dom.panelActions.innerHTML = `
            <button class="btn-primary" id="btnPanelOrder">
                <span>🚀</span> اطلب الآن
            </button>
            <button class="btn-whatsapp" id="btnPanelWhatsapp">
                <span>💬</span> واتساب
            </button>
        `;

        document.getElementById('btnPanelOrder').addEventListener('click', openOrderModal);
        document.getElementById('btnPanelWhatsapp').addEventListener('click', () => {
            const msg = `مرحباً، أود الاستفسار عن خدمة: ${service.title}`;
            window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
        });

        openPanel();
    }

    // ========== WORK SELECTION ==========
    function selectWork(workId) {
        const work = WORKS_DATA.find(w => w.id === workId);
        if (!work) return;

        state.selectedWork = work;

        // Show work detail in modal
        showPortfolioDetail(work);
    }

    function showPortfolioDetail(work) {
        dom.portfolioModalTitle.textContent = work.title;
        dom.portfolioDetailContent.innerHTML = `
            <h4>${work.icon} ${work.title}</h4>
            <p>${work.details}</p>
            <div class="detail-tags">
                ${work.tags.map(t => `<span class="detail-tag">${t}</span>`).join('')}
            </div>
            <div class="portfolio-detail-actions">
                <button class="btn-whatsapp btn-full" id="btnPortfolioWhatsapp">
                    <span>💬</span> استفسر عن مشروع مماثل
                </button>
            </div>
        `;

        document.getElementById('btnPortfolioWhatsapp').addEventListener('click', () => {
            const msg = `مرحباً، أعجبني مشروع "${work.title}" وأود الاستفسار عن مشروع مماثل`;
            window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
        });

        openModal('portfolio');
    }

    // ========== PANEL ==========
    function openPanel() {
        state.panelOpen = true;
        dom.panelOverlay.classList.add('open');
        dom.detailsPanel.classList.add('open');
    }

    function closePanel() {
        state.panelOpen = false;
        dom.panelOverlay.classList.remove('open');
        dom.detailsPanel.classList.remove('open');

        // Reset card highlights
        document.querySelectorAll('.card3d').forEach(card => {
            card.classList.remove('active', 'dimmed');
        });

        state.selectedService = null;
    }

    // ========== MENU ==========
    function openMenu() {
        state.menuOpen = true;
        dom.menuOverlay.classList.add('open');
        dom.mainMenu.classList.add('open');
        dom.globalMenuToggle.classList.add('active');
    }

    function closeMenu() {
        state.menuOpen = false;
        dom.menuOverlay.classList.remove('open');
        dom.mainMenu.classList.remove('open');
        dom.globalMenuToggle.classList.remove('active');
    }

    // ========== MODALS ==========
    function openModal(type) {
        dom.modalOverlay.classList.add('open');
        
        switch(type) {
            case 'order':
                dom.orderModal.classList.add('open');
                break;
            case 'orders':
                renderOrders();
                dom.ordersModal.classList.add('open');
                break;
            case 'policy':
                dom.policyModal.classList.add('open');
                break;
            case 'portfolio':
                dom.portfolioModal.classList.add('open');
                break;
        }
    }

    function closeAllModals() {
        dom.modalOverlay.classList.remove('open');
        dom.orderModal.classList.remove('open');
        dom.ordersModal.classList.remove('open');
        dom.policyModal.classList.remove('open');
        dom.portfolioModal.classList.remove('open');
    }

    function openOrderModal() {
        if (!state.selectedService) return;
        dom.orderServiceName.textContent = state.selectedService.title;
        dom.orderServiceHidden.value = state.selectedService.id;
        openModal('order');
    }

    // ========== ORDERS ==========
    function loadOrders() {
        const stored = localStorage.getItem('waarfe_orders');
        state.orders = stored ? JSON.parse(stored) : [];
    }

    function saveOrders() {
        localStorage.setItem('waarfe_orders', JSON.stringify(state.orders));
    }

    function addOrder(order) {
        state.orders.unshift(order);
        saveOrders();
    }

    function renderOrders() {
        if (state.orders.length === 0) {
            dom.ordersList.classList.add('hidden');
            dom.ordersEmptyState.classList.remove('hidden');
        } else {
            dom.ordersList.classList.remove('hidden');
            dom.ordersEmptyState.classList.add('hidden');
            dom.ordersList.innerHTML = state.orders.map(order => `
                <div class="order-card">
                    <div class="order-header">
                        <span class="order-service">${order.serviceName}</span>
                        <span class="order-date">${order.date}</span>
                    </div>
                    <div class="order-details">
                        <p><strong>الاسم:</strong> ${order.name}</p>
                        <p><strong>التفاصيل:</strong> ${order.details}</p>
                    </div>
                    <span class="order-status">قيد المراجعة</span>
                </div>
            `).join('');
        }
    }

    // ========== POLICY ==========
    function showPolicy(type) {
        const policies = {
            terms: {
                title: 'الشروط والأحكام',
                content: `
                    <h4>1. الخدمات</h4>
                    <p>يتم تقديم الخدمات وفقاً للمواصفات المتفق عليها مع العميل. أي تعديلات إضافية قد تتطلب تكلفة إضافية.</p>
                    
                    <h4>2. الدفع</h4>
                    <p>يتم الدفع وفقاً للاتفاق المبرم. عادةً 50% مقدماً و50% عند التسليم.</p>
                    
                    <h4>3. التسليم</h4>
                    <p>يتم تسليم المشاريع في المواعيد المحددة. التأخير من جانب العميل قد يؤثر على موعد التسليم.</p>
                    
                    <h4>4. الملكية</h4>
                    <p>تنتقل ملكية العمل للعميل بعد استلام كامل المبلغ المتفق عليه.</p>
                `
            },
            privacy: {
                title: 'سياسة الخصوصية',
                content: `
                    <h4>جمع البيانات</h4>
                    <p>نجمع فقط المعلومات الضرورية لتقديم خدماتنا مثل الاسم وبيانات التواصل.</p>
                    
                    <h4>استخدام البيانات</h4>
                    <p>تُستخدم بياناتك فقط للتواصل معك بخصوص الخدمات المطلوبة ولن يتم مشاركتها مع أطراف ثالثة.</p>
                    
                    <h4>حماية البيانات</h4>
                    <p>نتخذ إجراءات أمنية مناسبة لحماية بياناتك الشخصية.</p>
                    
                    <h4>حقوقك</h4>
                    <p>يمكنك طلب حذف بياناتك في أي وقت عبر التواصل معنا.</p>
                `
            }
        };

        const policy = policies[type];
        if (policy) {
            dom.policyModalTitle.textContent = policy.title;
            dom.policyContent.innerHTML = policy.content;
            openModal('policy');
        }
    }

    // ========== EVENT LISTENERS ==========
    function initEventListeners() {
        // CTA Start
        dom.ctaStart?.addEventListener('click', () => {
            showPortalTransition(() => setStage(CONFIG.STAGES.JOURNEY));
        });

        // Journey Portals
        dom.portalServices?.addEventListener('click', () => {
            showPortalTransition(() => setStage(CONFIG.STAGES.SERVICES_PORTAL));
        });
        dom.portalWorks?.addEventListener('click', () => {
            showPortalTransition(() => setStage(CONFIG.STAGES.WORKS_PORTAL));
        });
        dom.portalContact?.addEventListener('click', () => {
            showPortalTransition(() => setStage(CONFIG.STAGES.CONTACT_PORTAL));
        });

        // Portal Enter buttons
        dom.portalEnterServices?.addEventListener('click', () => {
            showPortalTransition(() => setStage(CONFIG.STAGES.SERVICES));
        });
        dom.portalEnterWorks?.addEventListener('click', () => {
            showPortalTransition(() => setStage(CONFIG.STAGES.WORKS));
        });
        dom.portalEnterContact?.addEventListener('click', () => {
            showPortalTransition(() => setStage(CONFIG.STAGES.CONTACT));
        });

        // Grid Navigation
        dom.btnServicesGoWorks?.addEventListener('click', () => {
            showPortalTransition(() => setStage(CONFIG.STAGES.WORKS));
        });
        dom.btnServicesBack?.addEventListener('click', () => {
            setStage(CONFIG.STAGES.JOURNEY);
        });
        dom.btnWorksGoContact?.addEventListener('click', () => {
            showPortalTransition(() => setStage(CONFIG.STAGES.CONTACT));
        });
        dom.btnWorksBack?.addEventListener('click', () => {
            setStage(CONFIG.STAGES.SERVICES);
        });

        // Global buttons
        dom.globalHomeBtn?.addEventListener('click', () => {
            setStage(CONFIG.STAGES.INTRO);
            closeMenu();
        });

        dom.globalMenuToggle?.addEventListener('click', () => {
            if (state.menuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Menu
        dom.menuOverlay?.addEventListener('click', closeMenu);
        dom.menuCloseBtn?.addEventListener('click', closeMenu);

        dom.menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const target = item.dataset.target;
                closeMenu();
                
                switch(target) {
                    case 'journey':
                        setStage(CONFIG.STAGES.JOURNEY);
                        break;
                    case 'services':
                        showPortalTransition(() => setStage(CONFIG.STAGES.SERVICES));
                        break;
                    case 'works':
                        showPortalTransition(() => setStage(CONFIG.STAGES.WORKS));
                        break;
                    case 'contact':
                        showPortalTransition(() => setStage(CONFIG.STAGES.CONTACT));
                        break;
                    case 'orders':
                        openModal('orders');
                        break;
                    case 'terms':
                        showPolicy('terms');
                        break;
                    case 'privacy':
                        showPolicy('privacy');
                        break;
                }
            });
        });

        // Panel
        dom.panelOverlay?.addEventListener('click', closePanel);
        dom.panelClose?.addEventListener('click', closePanel);

        // Modals
        dom.modalOverlay?.addEventListener('click', closeAllModals);
        dom.orderModalClose?.addEventListener('click', closeAllModals);
        dom.ordersModalClose?.addEventListener('click', closeAllModals);
        dom.policyModalClose?.addEventListener('click', closeAllModals);
        dom.portfolioModalClose?.addEventListener('click', closeAllModals);

        // Order Form
        dom.orderForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const order = {
                serviceId: formData.get('service'),
                serviceName: state.selectedService?.title || 'خدمة',
                name: formData.get('name'),
                phone: formData.get('phone'),
                details: formData.get('details'),
                date: new Date().toLocaleDateString('ar-SA'),
                status: 'pending'
            };

            addOrder(order);
            closeAllModals();
            closePanel();
            e.target.reset();

            // Send to WhatsApp
            const msg = `🚀 طلب جديد

📋 الخدمة: ${order.serviceName}
👤 الاسم: ${order.name}
📱 الجوال: ${order.phone}
📝 التفاصيل: ${order.details}`;

            window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
        });

        // Contact Form
        dom.contactForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const msg = `📬 رسالة من الموقع

👤 الاسم: ${formData.get('name')}
📧 البريد: ${formData.get('email')}
📝 الرسالة: ${formData.get('message')}`;

            window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
            e.target.reset();
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (state.menuOpen) closeMenu();
                if (state.panelOpen) closePanel();
                closeAllModals();
            }
        });
    }

    // ========== INIT ==========
    function init() {
        cacheDom();
        createStars();
        createServicesGrid();
        createWorksGrid();
        loadOrders();
        initEventListeners();

        // Hide loader
        setTimeout(() => {
            dom.loader?.classList.add('hidden');
            setStage(CONFIG.STAGES.INTRO);
        }, 500);
    }

    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
