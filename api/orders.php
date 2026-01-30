<?php
/**
 * =====================================================
 * RAED | رائد - Orders API
 * Endpoints: create, list, get, update status
 * =====================================================
 */

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'create':
        if ($method !== 'POST') sendError('Method not allowed', 405);
        handleCreateOrder();
        break;
        
    case 'list':
        if ($method !== 'GET') sendError('Method not allowed', 405);
        handleListOrders();
        break;
        
    case 'get':
        if ($method !== 'GET') sendError('Method not allowed', 405);
        handleGetOrder();
        break;
        
    case 'update':
        if ($method !== 'PUT') sendError('Method not allowed', 405);
        handleUpdateOrder();
        break;
        
    default:
        sendError('Endpoint not found', 404);
}

/**
 * Create new order
 */
function handleCreateOrder() {
    $user = requireAuth();
    $data = getJsonBody();
    
    // Validate items
    if (!isset($data['items']) || !is_array($data['items']) || empty($data['items'])) {
        sendError('السلة فارغة');
    }
    
    $items = $data['items'];
    $notes = $data['notes'] ?? '';
    $contactMethod = $data['contact_method'] ?? 'whatsapp';
    $paymentMethod = $data['payment_method'] ?? 'bank';
    
    // Validate contact method
    if (!in_array($contactMethod, ['whatsapp', 'email', 'phone'])) {
        $contactMethod = 'whatsapp';
    }
    
    // Validate payment method
    if (!in_array($paymentMethod, ['bank', 'online', 'cash'])) {
        $paymentMethod = 'bank';
    }
    
    $db = Database::getInstance()->getConnection();
    
    try {
        $db->beginTransaction();
        
        // Calculate total
        $totalAmount = 0;
        foreach ($items as $item) {
            $price = floatval($item['servicePrice'] ?? $item['price'] ?? 0);
            $quantity = intval($item['quantity'] ?? 1);
            $totalAmount += $price * $quantity;
        }
        
        // Generate order number
        $orderNumber = generateOrderNumber();
        
        // Insert order
        $stmt = $db->prepare("
            INSERT INTO orders (user_id, order_number, total_amount, payment_method, contact_method, notes)
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$user['id'], $orderNumber, $totalAmount, $paymentMethod, $contactMethod, $notes]);
        
        $orderId = $db->lastInsertId();
        
        // Insert order items
        $stmt = $db->prepare("
            INSERT INTO order_items (order_id, service_id, service_name, service_icon, price, quantity)
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        
        foreach ($items as $item) {
            $serviceId = intval($item['serviceId'] ?? $item['service_id'] ?? 0);
            $serviceName = $item['serviceName'] ?? $item['service_name'] ?? 'خدمة';
            $serviceIcon = $item['serviceIcon'] ?? $item['icon'] ?? '📦';
            $price = floatval($item['servicePrice'] ?? $item['price'] ?? 0);
            $quantity = intval($item['quantity'] ?? 1);
            
            $stmt->execute([$orderId, $serviceId, $serviceName, $serviceIcon, $price, $quantity]);
        }
        
        $db->commit();
        
        // Get order with items
        $order = getOrderById($db, $orderId);
        
        sendResponse([
            'order' => $order,
            'message' => 'تم إنشاء الطلب بنجاح'
        ], 201);
        
    } catch (Exception $e) {
        $db->rollBack();
        sendError('حدث خطأ أثناء إنشاء الطلب', 500);
    }
}

/**
 * List user orders
 */
function handleListOrders() {
    $user = requireAuth();
    
    $status = $_GET['status'] ?? null;
    $page = max(1, intval($_GET['page'] ?? 1));
    $limit = min(50, max(1, intval($_GET['limit'] ?? 10)));
    $offset = ($page - 1) * $limit;
    
    $db = Database::getInstance()->getConnection();
    
    // Build query
    $where = "WHERE user_id = ?";
    $params = [$user['id']];
    
    if ($status && in_array($status, ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'])) {
        $where .= " AND status = ?";
        $params[] = $status;
    }
    
    // Get total count
    $stmt = $db->prepare("SELECT COUNT(*) FROM orders $where");
    $stmt->execute($params);
    $total = $stmt->fetchColumn();
    
    // Get orders
    $params[] = $limit;
    $params[] = $offset;
    
    $stmt = $db->prepare("
        SELECT id, order_number, total_amount, status, payment_method, payment_status, 
               contact_method, notes, created_at, updated_at, completed_at
        FROM orders 
        $where
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
    ");
    $stmt->execute($params);
    $orders = $stmt->fetchAll();
    
    // Get items for each order
    foreach ($orders as &$order) {
        $stmt = $db->prepare("
            SELECT service_id, service_name, service_icon, price, quantity, subtotal
            FROM order_items
            WHERE order_id = ?
        ");
        $stmt->execute([$order['id']]);
        $order['items'] = $stmt->fetchAll();
    }
    
    sendResponse([
        'orders' => $orders,
        'pagination' => [
            'page' => $page,
            'limit' => $limit,
            'total' => $total,
            'pages' => ceil($total / $limit)
        ]
    ]);
}

/**
 * Get single order
 */
function handleGetOrder() {
    $user = requireAuth();
    
    $orderNumber = $_GET['order_number'] ?? '';
    $orderId = $_GET['id'] ?? 0;
    
    if (empty($orderNumber) && empty($orderId)) {
        sendError('رقم الطلب مطلوب');
    }
    
    $db = Database::getInstance()->getConnection();
    
    // Get order
    if (!empty($orderNumber)) {
        $stmt = $db->prepare("
            SELECT * FROM orders 
            WHERE order_number = ? AND user_id = ?
        ");
        $stmt->execute([$orderNumber, $user['id']]);
    } else {
        $stmt = $db->prepare("
            SELECT * FROM orders 
            WHERE id = ? AND user_id = ?
        ");
        $stmt->execute([$orderId, $user['id']]);
    }
    
    $order = $stmt->fetch();
    
    if (!$order) {
        sendError('الطلب غير موجود', 404);
    }
    
    // Get items
    $stmt = $db->prepare("
        SELECT service_id, service_name, service_icon, price, quantity, subtotal
        FROM order_items
        WHERE order_id = ?
    ");
    $stmt->execute([$order['id']]);
    $order['items'] = $stmt->fetchAll();
    
    sendResponse(['order' => $order]);
}

/**
 * Update order (admin only - for future use)
 */
function handleUpdateOrder() {
    $user = requireAuth();
    $data = getJsonBody();
    
    // For now, only allow cancelling own pending orders
    $orderNumber = $data['order_number'] ?? '';
    $action = $data['action'] ?? '';
    
    if (empty($orderNumber)) {
        sendError('رقم الطلب مطلوب');
    }
    
    $db = Database::getInstance()->getConnection();
    
    // Get order
    $stmt = $db->prepare("
        SELECT * FROM orders 
        WHERE order_number = ? AND user_id = ?
    ");
    $stmt->execute([$orderNumber, $user['id']]);
    $order = $stmt->fetch();
    
    if (!$order) {
        sendError('الطلب غير موجود', 404);
    }
    
    if ($action === 'cancel') {
        if ($order['status'] !== 'pending') {
            sendError('لا يمكن إلغاء هذا الطلب');
        }
        
        $stmt = $db->prepare("UPDATE orders SET status = 'cancelled' WHERE id = ?");
        $stmt->execute([$order['id']]);
        
        sendResponse(['message' => 'تم إلغاء الطلب بنجاح']);
    }
    
    sendError('الإجراء غير مدعوم');
}

/**
 * Helper: Get order by ID with items
 */
function getOrderById($db, $orderId) {
    $stmt = $db->prepare("
        SELECT id, order_number, total_amount, status, payment_method, payment_status,
               contact_method, notes, created_at
        FROM orders 
        WHERE id = ?
    ");
    $stmt->execute([$orderId]);
    $order = $stmt->fetch();
    
    if ($order) {
        $stmt = $db->prepare("
            SELECT service_id, service_name, service_icon, price, quantity, subtotal
            FROM order_items
            WHERE order_id = ?
        ");
        $stmt->execute([$orderId]);
        $order['items'] = $stmt->fetchAll();
    }
    
    return $order;
}
