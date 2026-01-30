<?php
/**
 * =====================================================
 * RAED | رائد - Authentication API
 * Endpoints: register, login, profile, update
 * =====================================================
 */

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'register':
        if ($method !== 'POST') sendError('Method not allowed', 405);
        handleRegister();
        break;
        
    case 'login':
        if ($method !== 'POST') sendError('Method not allowed', 405);
        handleLogin();
        break;
        
    case 'profile':
        if ($method === 'GET') {
            handleGetProfile();
        } elseif ($method === 'PUT') {
            handleUpdateProfile();
        } else {
            sendError('Method not allowed', 405);
        }
        break;
        
    case 'check':
        handleCheckAuth();
        break;
        
    default:
        sendError('Endpoint not found', 404);
}

/**
 * Handle user registration
 */
function handleRegister() {
    $data = getJsonBody();
    
    // Validate required fields
    validateRequired($data, ['first_name', 'last_name', 'phone', 'email', 'password']);
    
    $firstName = trim($data['first_name']);
    $lastName = trim($data['last_name']);
    $phone = trim($data['phone']);
    $email = strtolower(trim($data['email']));
    $password = $data['password'];
    
    // Validate email
    if (!validateEmail($email)) {
        sendError('البريد الإلكتروني غير صحيح');
    }
    
    // Validate phone
    if (!validatePhone($phone)) {
        sendError('رقم الجوال غير صحيح (يجب أن يبدأ بـ 05 ويتكون من 10 أرقام)');
    }
    
    // Validate password length
    if (strlen($password) < 8) {
        sendError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
    }
    
    $db = Database::getInstance()->getConnection();
    
    // Check if email exists
    $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        sendError('البريد الإلكتروني مسجل مسبقاً');
    }
    
    // Check if phone exists
    $stmt = $db->prepare("SELECT id FROM users WHERE phone = ?");
    $stmt->execute([$phone]);
    if ($stmt->fetch()) {
        sendError('رقم الجوال مسجل مسبقاً');
    }
    
    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    
    // Insert user
    $stmt = $db->prepare("
        INSERT INTO users (first_name, last_name, phone, email, password)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute([$firstName, $lastName, $phone, $email, $hashedPassword]);
    
    $userId = $db->lastInsertId();
    
    // Generate token
    $token = generateToken($userId);
    
    // Get user data
    $stmt = $db->prepare("SELECT id, first_name, last_name, email, phone, created_at FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch();
    
    sendResponse([
        'user' => $user,
        'token' => $token
    ], 201);
}

/**
 * Handle user login
 */
function handleLogin() {
    $data = getJsonBody();
    
    $identifier = trim($data['identifier'] ?? $data['email'] ?? '');
    $password = $data['password'] ?? '';
    
    if (empty($identifier) || empty($password)) {
        sendError('يرجى ملء جميع الحقول');
    }
    
    $db = Database::getInstance()->getConnection();
    
    // Find user by email or phone
    $stmt = $db->prepare("
        SELECT id, first_name, last_name, email, phone, password, is_active, created_at
        FROM users 
        WHERE email = ? OR phone = ?
    ");
    $stmt->execute([$identifier, $identifier]);
    $user = $stmt->fetch();
    
    if (!$user) {
        sendError('البريد الإلكتروني أو رقم الجوال غير مسجل');
    }
    
    if (!$user['is_active']) {
        sendError('الحساب معطل. يرجى التواصل مع الدعم');
    }
    
    // Verify password
    if (!password_verify($password, $user['password'])) {
        sendError('كلمة المرور غير صحيحة');
    }
    
    // Generate token
    $token = generateToken($user['id']);
    
    // Remove password from response
    unset($user['password']);
    unset($user['is_active']);
    
    sendResponse([
        'user' => $user,
        'token' => $token
    ]);
}

/**
 * Handle get profile
 */
function handleGetProfile() {
    $user = requireAuth();
    sendResponse(['user' => $user]);
}

/**
 * Handle update profile
 */
function handleUpdateProfile() {
    $user = requireAuth();
    $data = getJsonBody();
    
    $db = Database::getInstance()->getConnection();
    
    $updates = [];
    $params = [];
    
    // Update first name
    if (isset($data['first_name']) && !empty(trim($data['first_name']))) {
        $updates[] = "first_name = ?";
        $params[] = trim($data['first_name']);
    }
    
    // Update last name
    if (isset($data['last_name']) && !empty(trim($data['last_name']))) {
        $updates[] = "last_name = ?";
        $params[] = trim($data['last_name']);
    }
    
    // Update phone
    if (isset($data['phone']) && $data['phone'] !== $user['phone']) {
        $phone = trim($data['phone']);
        
        if (!validatePhone($phone)) {
            sendError('رقم الجوال غير صحيح');
        }
        
        // Check if phone exists
        $stmt = $db->prepare("SELECT id FROM users WHERE phone = ? AND id != ?");
        $stmt->execute([$phone, $user['id']]);
        if ($stmt->fetch()) {
            sendError('رقم الجوال مسجل مسبقاً');
        }
        
        $updates[] = "phone = ?";
        $params[] = $phone;
    }
    
    if (empty($updates)) {
        sendError('لا توجد بيانات للتحديث');
    }
    
    $params[] = $user['id'];
    $sql = "UPDATE users SET " . implode(', ', $updates) . " WHERE id = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    
    // Get updated user
    $stmt = $db->prepare("SELECT id, first_name, last_name, email, phone, created_at FROM users WHERE id = ?");
    $stmt->execute([$user['id']]);
    $updatedUser = $stmt->fetch();
    
    sendResponse(['user' => $updatedUser]);
}

/**
 * Check if user is authenticated
 */
function handleCheckAuth() {
    $user = getAuthUser();
    if ($user) {
        sendResponse(['authenticated' => true, 'user' => $user]);
    } else {
        sendResponse(['authenticated' => false]);
    }
}
