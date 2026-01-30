<?php
/**
 * =====================================================
 * RAED | رائد - Cart API
 * Endpoints: get, add, update, remove, clear
 * =====================================================
 */

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'get':
        if ($method !== 'GET') sendError('Method not allowed', 405);
        handleGetCart();
        break;
        
    case 'add':
        if ($method !== 'POST') sendError('Method not allowed', 405);
        handleAddToCart();
        break;
        
    case 'update':
        if ($method !== 'PUT') sendError('Method not allowed', 405);
        handleUpdateCart();
        break;
        
    case 'remove':
        if ($method !== 'DELETE') sendError('Method not allowed', 405);
        handleRemoveFromCart();
        break;
        
    case 'clear':
        if ($method !== 'DELETE') sendError('Method not allowed', 405);
        handleClearCart();
        break;
        
    case 'sync':
        if ($method !== 'POST') sendError('Method not allowed', 405);
        handleSyncCart();
        break;
        
    default:
        sendError('Endpoint not found', 404);
}

/**
 * Get user's cart
 */
function handleGetCart() {
    $user = requireAuth();
    
    $db = Database::getInstance()->getConnection();
    
    $stmt = $db->prepare("
        SELECT c.id, c.service_id, c.quantity, c.created_at,
               s.name_ar as service_name, s.price, s.price_display, s.icon as service_icon
        FROM cart c
        JOIN services s ON c.service_id = s.id
        WHERE c.user_id = ?
        ORDER BY c.created_at DESC
    ");
    $stmt->execute([$user['id']]);
    $items = $stmt->fetchAll();
    
    // Calculate total
    $total = 0;
    foreach ($items as &$item) {
        $item['subtotal'] = $item['price'] * $item['quantity'];
        $total += $item['subtotal'];
    }
    
    sendResponse([
        'items' => $items,
        'count' => count($items),
        'total' => $total
    ]);
}

/**
 * Add item to cart
 */
function handleAddToCart() {
    $user = requireAuth();
    $data = getJsonBody();
    
    $serviceId = intval($data['service_id'] ?? 0);
    $quantity = max(1, intval($data['quantity'] ?? 1));
    
    if ($serviceId <= 0) {
        sendError('معرف الخدمة غير صحيح');
    }
    
    $db = Database::getInstance()->getConnection();
    
    // Check if service exists
    $stmt = $db->prepare("SELECT id, name_ar, price FROM services WHERE id = ? AND is_active = TRUE");
    $stmt->execute([$serviceId]);
    $service = $stmt->fetch();
    
    if (!$service) {
        sendError('الخدمة غير موجودة');
    }
    
    // Check if already in cart
    $stmt = $db->prepare("SELECT id, quantity FROM cart WHERE user_id = ? AND service_id = ?");
    $stmt->execute([$user['id'], $serviceId]);
    $existing = $stmt->fetch();
    
    if ($existing) {
        // Update quantity
        $newQuantity = $existing['quantity'] + $quantity;
        $stmt = $db->prepare("UPDATE cart SET quantity = ? WHERE id = ?");
        $stmt->execute([$newQuantity, $existing['id']]);
    } else {
        // Add new item
        $stmt = $db->prepare("INSERT INTO cart (user_id, service_id, quantity) VALUES (?, ?, ?)");
        $stmt->execute([$user['id'], $serviceId, $quantity]);
    }
    
    sendResponse(['message' => 'تمت الإضافة للسلة']);
}

/**
 * Update cart item quantity
 */
function handleUpdateCart() {
    $user = requireAuth();
    $data = getJsonBody();
    
    $serviceId = intval($data['service_id'] ?? 0);
    $quantity = intval($data['quantity'] ?? 0);
    
    if ($serviceId <= 0) {
        sendError('معرف الخدمة غير صحيح');
    }
    
    $db = Database::getInstance()->getConnection();
    
    if ($quantity <= 0) {
        // Remove item
        $stmt = $db->prepare("DELETE FROM cart WHERE user_id = ? AND service_id = ?");
        $stmt->execute([$user['id'], $serviceId]);
    } else {
        // Update quantity
        $stmt = $db->prepare("UPDATE cart SET quantity = ? WHERE user_id = ? AND service_id = ?");
        $stmt->execute([$quantity, $user['id'], $serviceId]);
    }
    
    sendResponse(['message' => 'تم تحديث السلة']);
}

/**
 * Remove item from cart
 */
function handleRemoveFromCart() {
    $user = requireAuth();
    
    $serviceId = intval($_GET['service_id'] ?? 0);
    
    if ($serviceId <= 0) {
        sendError('معرف الخدمة غير صحيح');
    }
    
    $db = Database::getInstance()->getConnection();
    
    $stmt = $db->prepare("DELETE FROM cart WHERE user_id = ? AND service_id = ?");
    $stmt->execute([$user['id'], $serviceId]);
    
    sendResponse(['message' => 'تم الحذف من السلة']);
}

/**
 * Clear entire cart
 */
function handleClearCart() {
    $user = requireAuth();
    
    $db = Database::getInstance()->getConnection();
    
    $stmt = $db->prepare("DELETE FROM cart WHERE user_id = ?");
    $stmt->execute([$user['id']]);
    
    sendResponse(['message' => 'تم إفراغ السلة']);
}

/**
 * Sync localStorage cart with database
 */
function handleSyncCart() {
    $user = requireAuth();
    $data = getJsonBody();
    
    $items = $data['items'] ?? [];
    
    if (!is_array($items)) {
        sendError('البيانات غير صحيحة');
    }
    
    $db = Database::getInstance()->getConnection();
    
    try {
        $db->beginTransaction();
        
        // Clear existing cart
        $stmt = $db->prepare("DELETE FROM cart WHERE user_id = ?");
        $stmt->execute([$user['id']]);
        
        // Add new items
        $stmt = $db->prepare("INSERT INTO cart (user_id, service_id, quantity) VALUES (?, ?, ?)");
        
        foreach ($items as $item) {
            $serviceId = intval($item['serviceId'] ?? $item['service_id'] ?? 0);
            $quantity = max(1, intval($item['quantity'] ?? 1));
            
            if ($serviceId > 0) {
                $stmt->execute([$user['id'], $serviceId, $quantity]);
            }
        }
        
        $db->commit();
        
        sendResponse(['message' => 'تم مزامنة السلة']);
        
    } catch (Exception $e) {
        $db->rollBack();
        sendError('حدث خطأ أثناء المزامنة', 500);
    }
}
