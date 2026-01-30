<?php
/**
 * =====================================================
 * RAED | رائد - Database Configuration
 * =====================================================
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'raed_store');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// JWT Configuration
define('JWT_SECRET', 'your-secret-key-change-in-production');
define('JWT_EXPIRY', 60 * 60 * 24 * 7); // 7 days

// CORS Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/**
 * Database connection class
 */
class Database {
    private static $instance = null;
    private $pdo;
    
    private function __construct() {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            $this->pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            $this->sendError('Database connection failed', 500);
        }
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function getConnection() {
        return $this->pdo;
    }
    
    private function sendError($message, $code = 500) {
        http_response_code($code);
        echo json_encode(['success' => false, 'message' => $message]);
        exit();
    }
}

/**
 * Response helper functions
 */
function sendResponse($data, $code = 200) {
    http_response_code($code);
    echo json_encode([
        'success' => true,
        'data' => $data
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

function sendError($message, $code = 400) {
    http_response_code($code);
    echo json_encode([
        'success' => false,
        'message' => $message
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

/**
 * Get request body as JSON
 */
function getJsonBody() {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    return $data ?: [];
}

/**
 * Validate required fields
 */
function validateRequired($data, $fields) {
    $missing = [];
    foreach ($fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            $missing[] = $field;
        }
    }
    if (!empty($missing)) {
        sendError('الحقول المطلوبة: ' . implode(', ', $missing), 400);
    }
}

/**
 * Validate email format
 */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

/**
 * Validate Saudi phone number
 */
function validatePhone($phone) {
    return preg_match('/^05\d{8}$/', $phone);
}

/**
 * Generate JWT token
 */
function generateToken($userId) {
    $header = base64_encode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $payload = base64_encode(json_encode([
        'user_id' => $userId,
        'iat' => time(),
        'exp' => time() + JWT_EXPIRY
    ]));
    $signature = hash_hmac('sha256', "$header.$payload", JWT_SECRET, true);
    $signature = base64_encode($signature);
    
    return "$header.$payload.$signature";
}

/**
 * Verify JWT token
 */
function verifyToken($token) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return false;
    }
    
    list($header, $payload, $signature) = $parts;
    
    $validSignature = hash_hmac('sha256', "$header.$payload", JWT_SECRET, true);
    $validSignature = base64_encode($validSignature);
    
    if ($signature !== $validSignature) {
        return false;
    }
    
    $data = json_decode(base64_decode($payload), true);
    
    if ($data['exp'] < time()) {
        return false;
    }
    
    return $data;
}

/**
 * Get authenticated user from token
 */
function getAuthUser() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? '';
    
    if (empty($authHeader) || !preg_match('/Bearer\s+(.+)/', $authHeader, $matches)) {
        return null;
    }
    
    $token = $matches[1];
    $data = verifyToken($token);
    
    if (!$data) {
        return null;
    }
    
    // Get user from database
    $db = Database::getInstance()->getConnection();
    $stmt = $db->prepare("SELECT id, first_name, last_name, email, phone, created_at FROM users WHERE id = ?");
    $stmt->execute([$data['user_id']]);
    
    return $stmt->fetch();
}

/**
 * Require authentication
 */
function requireAuth() {
    $user = getAuthUser();
    if (!$user) {
        sendError('غير مصرح بالوصول', 401);
    }
    return $user;
}

/**
 * Generate unique order number
 */
function generateOrderNumber() {
    $timestamp = strtoupper(base_convert(time(), 10, 36));
    $random = strtoupper(substr(md5(uniqid()), 0, 4));
    return "RD-{$timestamp}-{$random}";
}
