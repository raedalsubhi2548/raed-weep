-- =====================================================
-- RAED | رائد - Database Seed Data
-- Sample data for testing
-- =====================================================

USE raed_store;

-- =====================================================
-- INSERT SERVICES
-- =====================================================
INSERT INTO services (name_ar, name_en, subtitle, description_ar, price, price_display, duration_days, icon, features, category, sort_order, is_active, is_featured) VALUES

-- Service 1: Salla Store Design
(
    'تصميم متجر في سلة',
    'Salla Store Design',
    'Salla Store',
    'بناء متجر احترافي بالكامل مع هوية بصرية متناسقة وتجربة مستخدم سلسة.',
    250.00,
    'يبدأ من 250 ريال',
    '5-10 أيام',
    '🛒',
    '["تصميم واجهة احترافية", "هوية بصرية متناسقة", "تجربة مستخدم سلسة", "صفحات المنتجات", "جاهز للانطلاق"]',
    'stores',
    1,
    TRUE,
    TRUE
),

-- Service 2: Google Tools Integration
(
    'ربط أدوات قوقل',
    'Google Tools Integration',
    'Google Tools',
    'ربط Google Analytics – Google Tag Manager – Google Search Console',
    75.00,
    'الأداة الواحدة بـ 75 ريال',
    '1-2 يوم',
    '📊',
    '["Google Analytics", "Google Tag Manager", "Google Search Console", "إعداد التتبع الكامل", "تقارير الأداء"]',
    'analytics',
    2,
    TRUE,
    FALSE
),

-- Service 3: Social Media Pixels
(
    'ربط البكسل لمنصات التواصل',
    'Social Media Pixels',
    'Social Pixels',
    'Meta Pixel – TikTok Pixel – Snapchat Pixel',
    75.00,
    'المنصة الواحدة بـ 75 ريال',
    '1-2 يوم',
    '📱',
    '["Meta Pixel (فيسبوك وإنستغرام)", "TikTok Pixel", "Snapchat Pixel", "تتبع التحويلات", "تحسين الحملات الإعلانية"]',
    'analytics',
    3,
    TRUE,
    FALSE
),

-- Service 4: SEO Optimization
(
    'تحسين محركات البحث SEO',
    'SEO Optimization',
    'SEO Optimization',
    'تحسين ظهور المتجر في نتائج البحث – بناء صفحات محسّنة – تحسين المنتجات',
    0.00,
    'طلب عرض سعر',
    'حسب المشروع',
    '🔍',
    '["تحسين ظهور المتجر", "بناء صفحات محسّنة", "تحسين المنتجات", "الكلمات المفتاحية", "تقارير الأداء"]',
    'seo',
    4,
    TRUE,
    FALSE
),

-- Service 5: Landing Pages
(
    'تصميم وإنشاء صفحات الهبوط',
    'Landing Pages',
    'Landing Pages',
    'صفحة هبوط احترافية متوافقة مع الهوية البصرية',
    300.00,
    'طلب عرض سعر',
    '3-5 أيام',
    '🚀',
    '["تصميم احترافي", "متوافقة مع الهوية البصرية", "سرعة تحميل عالية", "تحسين التحويلات", "متجاوبة مع الجوال"]',
    'design',
    5,
    TRUE,
    TRUE
),

-- Service 6: Websites
(
    'تصميم وإنشاء مواقع إلكترونية',
    'Website Development',
    'Websites',
    'مواقع للشركات والمكاتب والمتاجر – تصميم + برمجة كاملة',
    500.00,
    'طلب عرض سعر',
    '10-15 يوم',
    '🌐',
    '["مواقع للشركات والمكاتب", "تصميم احترافي", "برمجة كاملة", "لوحة تحكم", "دعم فني"]',
    'development',
    6,
    TRUE,
    TRUE
),

-- Service 7: Ad Campaigns
(
    'إنشاء حملات إعلانية',
    'Ad Campaigns',
    'Ad Campaigns',
    'حملات على سناب – تيك توك – إنستغرام مع تحسين الأداء',
    200.00,
    'طلب عرض سعر',
    'مستمر',
    '📢',
    '["حملات سناب شات", "حملات تيك توك", "حملات إنستغرام", "تحسين الأداء", "تقارير دورية"]',
    'marketing',
    7,
    TRUE,
    FALSE
);

-- =====================================================
-- INSERT SAMPLE ADMIN USER (Password: Admin@123)
-- =====================================================
INSERT INTO users (first_name, last_name, phone, email, password, is_active, email_verified, phone_verified) VALUES
('رائد', 'المشرف', '0500000000', 'admin@raed.sa', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', TRUE, TRUE, TRUE);

-- =====================================================
-- INSERT APPLICATION SETTINGS
-- =====================================================
INSERT INTO settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'رائد | Raed', 'string', 'اسم الموقع'),
('site_description', 'حلول رقمية متكاملة لتطوير حضورك وزيادة مبيعاتك', 'string', 'وصف الموقع'),
('whatsapp_number', '+966536090915', 'string', 'رقم الواتساب للتواصل'),
('email', 'info@raed.sa', 'string', 'البريد الإلكتروني'),
('bank_name', 'مصرف الراجحي', 'string', 'اسم البنك'),
('bank_account_name', 'رائد للخدمات الرقمية', 'string', 'اسم صاحب الحساب'),
('bank_account_number', '123456789012', 'string', 'رقم الحساب البنكي'),
('bank_iban', 'SA0380000000123456789012', 'string', 'رقم الآيبان'),
('currency', 'SAR', 'string', 'العملة'),
('currency_symbol', 'ريال', 'string', 'رمز العملة'),
('maintenance_mode', 'false', 'boolean', 'وضع الصيانة'),
('allow_registration', 'true', 'boolean', 'السماح بالتسجيل');

-- =====================================================
-- INSERT SAMPLE TEST USER (Password: Test@123)
-- =====================================================
INSERT INTO users (first_name, last_name, phone, email, password, is_active) VALUES
('محمد', 'أحمد', '0512345678', 'test@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', TRUE);

-- =====================================================
-- INSERT SAMPLE ORDER
-- =====================================================
SET @test_user_id = (SELECT id FROM users WHERE email = 'test@example.com');
SET @order_number = CONCAT('RD-', UPPER(CONV(UNIX_TIMESTAMP(), 10, 36)), '-TEST');

INSERT INTO orders (user_id, order_number, total_amount, status, payment_method, contact_method, notes) VALUES
(@test_user_id, @order_number, 325.00, 'pending', 'bank', 'whatsapp', 'طلب تجريبي');

SET @order_id = LAST_INSERT_ID();

INSERT INTO order_items (order_id, service_id, service_name, service_icon, price, quantity) VALUES
(@order_id, 1, 'تصميم متجر في سلة', '🛒', 250.00, 1),
(@order_id, 2, 'ربط أدوات قوقل', '📊', 75.00, 1);
