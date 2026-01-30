<?php
/**
 * =====================================================
 * RAED | رائد - Services API
 * Endpoints: list, get
 * =====================================================
 */

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'list';

switch ($action) {
    case 'list':
        if ($method !== 'GET') sendError('Method not allowed', 405);
        handleListServices();
        break;
        
    case 'get':
        if ($method !== 'GET') sendError('Method not allowed', 405);
        handleGetService();
        break;
        
    default:
        sendError('Endpoint not found', 404);
}

/**
 * List all active services
 */
function handleListServices() {
    $category = $_GET['category'] ?? null;
    $featured = isset($_GET['featured']) ? filter_var($_GET['featured'], FILTER_VALIDATE_BOOLEAN) : null;
    
    $db = Database::getInstance()->getConnection();
    
    $where = "WHERE is_active = TRUE";
    $params = [];
    
    if ($category) {
        $where .= " AND category = ?";
        $params[] = $category;
    }
    
    if ($featured !== null) {
        $where .= " AND is_featured = ?";
        $params[] = $featured;
    }
    
    $stmt = $db->prepare("
        SELECT id, name_ar, name_en, subtitle, description_ar, description_en,
               price, price_display, duration_days, icon, features, category,
               is_featured
        FROM services 
        $where
        ORDER BY sort_order ASC, id ASC
    ");
    $stmt->execute($params);
    $services = $stmt->fetchAll();
    
    // Parse JSON features
    foreach ($services as &$service) {
        $service['features'] = json_decode($service['features'], true) ?: [];
    }
    
    sendResponse(['services' => $services]);
}

/**
 * Get single service
 */
function handleGetService() {
    $id = $_GET['id'] ?? 0;
    
    if (empty($id)) {
        sendError('معرف الخدمة مطلوب');
    }
    
    $db = Database::getInstance()->getConnection();
    
    $stmt = $db->prepare("
        SELECT id, name_ar, name_en, subtitle, description_ar, description_en,
               price, price_display, duration_days, icon, features, category,
               is_featured
        FROM services 
        WHERE id = ? AND is_active = TRUE
    ");
    $stmt->execute([$id]);
    $service = $stmt->fetch();
    
    if (!$service) {
        sendError('الخدمة غير موجودة', 404);
    }
    
    $service['features'] = json_decode($service['features'], true) ?: [];
    
    sendResponse(['service' => $service]);
}
