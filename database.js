// ========================================
// FIREBASE DATABASE SERVICE - FIXED VERSION
// ========================================

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCvRUAfFT_sPaAqENElPo_ReQ-U8glB3Zo",
    authDomain: "raed-web.firebaseapp.com",
    projectId: "raed-web",
    storageBucket: "raed-web.firebasestorage.app",
    messagingSenderId: "580083663609",
    appId: "1:580083663609:web:49544bfe46794b1eb0d828",
    measurementId: "G-BEBF5G9GHC"
};

// Initialize Firebase (only once)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// Admin Email
const ADMIN_EMAIL = 'r1alsubhi@gmail.com';

// ==================== USER FUNCTIONS ====================

// Save user to Firebase
async function saveUserToDatabase(profile) {
    console.log('💾 Saving user to Firebase:', profile.email);
    
    try {
        const userRef = db.collection('users').doc(profile.email);
        
        await userRef.set({
            email: profile.email,
            firstName: profile.firstName,
            lastName: profile.lastName,
            phone: profile.phone || '',
            createdAt: profile.createdAt || Date.now(),
            updatedAt: Date.now()
        }, { merge: true });
        
        console.log('✅ User saved successfully to Firebase');
        return true;
    } catch (error) {
        console.error('❌ Error saving user to Firebase:', error);
        return false;
    }
}

// Get user from Firebase
async function getUserFromDatabase(email) {
    console.log('🔍 Looking for user in Firebase:', email);
    
    try {
        const userRef = db.collection('users').doc(email);
        const doc = await userRef.get();
        
        if (doc.exists) {
            console.log('✅ User found in Firebase:', doc.data());
            return doc.data();
        } else {
            console.log('ℹ️ User NOT found in Firebase');
            return null;
        }
    } catch (error) {
        console.error('❌ Error getting user from Firebase:', error);
        return null;
    }
}

// ==================== ORDER FUNCTIONS ====================

// Save order to Firebase
async function saveOrderToDatabase(order, userEmail) {
    console.log('💾 Saving order to Firebase:', order.orderNumber);
    
    try {
        const orderRef = db.collection('orders').doc(order.orderNumber);
        
        await orderRef.set({
            orderNumber: order.orderNumber,
            userEmail: userEmail,
            items: order.items,
            total: order.total,
            status: order.status || 'pending',
            createdAt: Date.now()
        });
        
        console.log('✅ Order saved successfully to Firebase');
        return true;
    } catch (error) {
        console.error('❌ Error saving order to Firebase:', error);
        return false;
    }
}

// Get user's orders from Firebase
async function getUserOrders(email) {
    console.log('🔍 Getting orders for:', email);
    
    try {
        const snapshot = await db.collection('orders')
            .where('userEmail', '==', email)
            .get();
        
        const orders = [];
        snapshot.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
        });
        
        // Sort by createdAt descending
        orders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        
        console.log('✅ Found', orders.length, 'orders');
        return orders;
    } catch (error) {
        console.error('❌ Error getting orders:', error);
        return [];
    }
}

// ==================== ADMIN FUNCTIONS ====================

// Check if admin
function isAdmin(email) {
    return email && email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

// Get ALL orders (Admin)
async function getAllOrders() {
    console.log('👑 Admin: Getting all orders');
    
    try {
        const snapshot = await db.collection('orders').get();
        
        const orders = [];
        snapshot.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
        });
        
        // Sort by createdAt descending
        orders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        
        console.log('✅ Admin: Found', orders.length, 'total orders');
        return orders;
    } catch (error) {
        console.error('❌ Error getting all orders:', error);
        return [];
    }
}

// Get ALL users (Admin)
async function getAllUsers() {
    console.log('👑 Admin: Getting all users');
    
    try {
        const snapshot = await db.collection('users').get();
        
        const users = [];
        snapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });
        
        console.log('✅ Admin: Found', users.length, 'total users');
        return users;
    } catch (error) {
        console.error('❌ Error getting all users:', error);
        return [];
    }
}

// Update order status (Admin)
async function updateOrderStatus(orderNumber, newStatus) {
    console.log('✏️ Updating order status:', orderNumber, '→', newStatus);
    
    try {
        await db.collection('orders').doc(orderNumber).update({
            status: newStatus,
            updatedAt: Date.now()
        });
        
        console.log('✅ Order status updated');
        return true;
    } catch (error) {
        console.error('❌ Error updating order:', error);
        return false;
    }
}

// Get admin statistics
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
            totalRevenue: totalRevenue,
            pendingOrders: pendingOrders
        };
    } catch (error) {
        console.error('❌ Error getting stats:', error);
        return {
            totalOrders: 0,
            totalUsers: 0,
            totalRevenue: 0,
            pendingOrders: 0
        };
    }
}

// ==================== MAKE FUNCTIONS GLOBAL ====================
window.db = db;
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

console.log('🔥 Firebase Database Service Loaded');
console.log('👑 Admin Email:', ADMIN_EMAIL);

console.log('🔥 Firebase Database Service Initialized');
