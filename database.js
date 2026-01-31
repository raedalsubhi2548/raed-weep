// ========================================
// FIREBASE DATABASE SERVICE
// رائد | Raed - E-Commerce System
// ========================================

const firebaseConfig = {
    apiKey: "AIzaSyCvRUAfFT_sPaAqENElPo_ReQ-U8glB3Zo",
    authDomain: "raed-web.firebaseapp.com",
    projectId: "raed-web",
    storageBucket: "raed-web.firebasestorage.app",
    messagingSenderId: "580083663609",
    appId: "1:580083663609:web:49544bfe46794b1eb0d828",
    measurementId: "G-BEBF5G9GHC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Admin Email - Store Owner
const ADMIN_EMAIL = 'r1alsubhi@gmail.com';

// ==================== USER FUNCTIONS ====================

/**
 * Save user profile to Firestore
 */
async function saveUserToDatabase(profile) {
    try {
        await db.collection('users').doc(profile.email).set({
            ...profile,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        console.log('✅ User saved to Firebase:', profile.email);
        return true;
    } catch (error) {
        console.error('❌ Error saving user:', error);
        return false;
    }
}

/**
 * Get user profile from Firestore
 */
async function getUserFromDatabase(email) {
    try {
        const doc = await db.collection('users').doc(email).get();
        if (doc.exists) {
            console.log('✅ User loaded from Firebase:', email);
            return doc.data();
        }
        return null;
    } catch (error) {
        console.error('❌ Error getting user:', error);
        return null;
    }
}

// ==================== ORDER FUNCTIONS ====================

/**
 * Save order to Firestore
 */
async function saveOrderToDatabase(order, userEmail) {
    try {
        await db.collection('orders').doc(order.orderNumber).set({
            ...order,
            userEmail: userEmail,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ Order saved to Firebase:', order.orderNumber);
        return true;
    } catch (error) {
        console.error('❌ Error saving order:', error);
        return false;
    }
}

/**
 * Get user's orders from Firestore
 */
async function getUserOrders(email) {
    try {
        const snapshot = await db.collection('orders')
            .where('userEmail', '==', email)
            .orderBy('createdAt', 'desc')
            .get();
        
        const orders = [];
        snapshot.forEach(doc => orders.push({ id: doc.id, ...doc.data() }));
        console.log('✅ Loaded', orders.length, 'orders for:', email);
        return orders;
    } catch (error) {
        console.error('❌ Error getting orders:', error);
        return [];
    }
}

// ==================== ADMIN FUNCTIONS ====================

/**
 * Check if user is admin
 */
function isAdmin(email) {
    return email === ADMIN_EMAIL;
}

/**
 * Get all orders (Admin only)
 */
async function getAllOrders() {
    try {
        const snapshot = await db.collection('orders')
            .orderBy('createdAt', 'desc')
            .get();
        
        const orders = [];
        snapshot.forEach(doc => orders.push({ id: doc.id, ...doc.data() }));
        console.log('✅ Admin: Loaded', orders.length, 'total orders');
        return orders;
    } catch (error) {
        console.error('❌ Error getting all orders:', error);
        return [];
    }
}

/**
 * Get all users (Admin only)
 */
async function getAllUsers() {
    try {
        const snapshot = await db.collection('users').get();
        const users = [];
        snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
        console.log('✅ Admin: Loaded', users.length, 'users');
        return users;
    } catch (error) {
        console.error('❌ Error getting all users:', error);
        return [];
    }
}

/**
 * Update order status (Admin only)
 */
async function updateOrderStatus(orderNumber, newStatus) {
    try {
        await db.collection('orders').doc(orderNumber).update({
            status: newStatus,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ Order status updated:', orderNumber, '→', newStatus);
        return true;
    } catch (error) {
        console.error('❌ Error updating order status:', error);
        return false;
    }
}

/**
 * Get admin dashboard statistics
 */
async function getAdminStats() {
    try {
        const ordersSnapshot = await db.collection('orders').get();
        const usersSnapshot = await db.collection('users').get();
        
        let totalRevenue = 0;
        let pendingOrders = 0;
        
        ordersSnapshot.forEach(doc => {
            const order = doc.data();
            totalRevenue += order.total || 0;
            if (order.status === 'pending') pendingOrders++;
        });
        
        return {
            totalOrders: ordersSnapshot.size,
            totalUsers: usersSnapshot.size,
            totalRevenue,
            pendingOrders
        };
    } catch (error) {
        console.error('❌ Error getting stats:', error);
        return null;
    }
}

// ==================== MAKE FUNCTIONS GLOBAL ====================
window.saveUserToDatabase = saveUserToDatabase;
window.getUserFromDatabase = getUserFromDatabase;
window.saveOrderToDatabase = saveOrderToDatabase;
window.getUserOrders = getUserOrders;
window.isAdmin = isAdmin;
window.getAllOrders = getAllOrders;
window.getAllUsers = getAllUsers;
window.updateOrderStatus = updateOrderStatus;
window.getAdminStats = getAdminStats;
window.ADMIN_EMAIL = ADMIN_EMAIL;
window.db = db;

console.log('🔥 Firebase Database Service Initialized');
