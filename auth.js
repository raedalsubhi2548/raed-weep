// ========================================
// EmailJS + Auth + Cart System
// ========================================

// EmailJS Configuration
const EMAILJS_CONFIG = {
    serviceId: 'service_z0lk3tn',
    templateId: 'template_mhmr647',
    publicKey: 'TUdDbkfaWfsnwxIRE'
};

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// Global Variables
let currentOTP = null;
let otpExpiry = null;
let currentEmail = null;

// ==================== OTP FUNCTIONS ====================

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTP(email) {
    if (!isValidEmail(email)) {
        showToast('يرجى إدخال بريد إلكتروني صحيح', 'error');
        return false;
    }

    currentOTP = generateOTP();
    currentEmail = email;
    otpExpiry = Date.now() + (10 * 60 * 1000);

    const btn = document.getElementById('sendOtpBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';

    try {
        await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            {
                email: email,
                passcode: currentOTP,
                to_email: email
            }
        );

        showStep('otpStep');
        showToast('تم إرسال رمز التحقق إلى ' + email, 'success');
        startResendTimer();
        return true;

    } catch (error) {
        console.error('Error:', error);
        showToast('حدث خطأ، يرجى المحاولة مرة أخرى', 'error');
        return false;
    } finally {
        btn.disabled = false;
        btn.innerHTML = 'إرسال رمز التحقق';
    }
}

function verifyOTP(enteredOTP) {
    if (Date.now() > otpExpiry) {
        showToast('انتهت صلاحية الرمز، يرجى طلب رمز جديد', 'error');
        return false;
    }

    if (enteredOTP === currentOTP) {
        onAuthSuccess(currentEmail);
        return true;
    } else {
        showToast('الرمز غير صحيح', 'error');
        return false;
    }
}

async function onAuthSuccess(email) {
    console.log('🔐 Auth success for:', email);
    
    // Save login state
    const user = {
        email: email,
        loggedInAt: Date.now(),
        isLoggedIn: true
    };
    localStorage.setItem('user', JSON.stringify(user));
    
    // IMPORTANT: Check Firebase FIRST for existing profile
    let profile = null;
    
    try {
        // Try to get from Firebase
        if (typeof getUserFromDatabase === 'function') {
            profile = await getUserFromDatabase(email);
            console.log('Firebase profile result:', profile);
        }
    } catch (error) {
        console.error('Error checking Firebase:', error);
    }
    
    // If not in Firebase, check localStorage
    if (!profile) {
        const localData = localStorage.getItem('userProfile_' + email);
        if (localData) {
            profile = JSON.parse(localData);
            console.log('Found profile in localStorage:', profile);
            
            // Sync to Firebase
            if (typeof saveUserToDatabase === 'function') {
                await saveUserToDatabase(profile);
            }
        }
    }
    
    // Decide what to show
    if (profile && profile.firstName) {
        // RETURNING USER - has profile
        console.log('✅ Returning user:', profile.firstName);
        
        // Save to localStorage as backup
        localStorage.setItem('userProfile_' + email, JSON.stringify(profile));
        
        closeAuthModal();
        updateUIForLoggedInUser(profile);
        
        if (typeof isAdmin === 'function' && isAdmin(email)) {
            showToast('مرحباً مدير المتجر! 👑', 'success');
        } else {
            showToast('مرحباً بعودتك ' + profile.firstName + '! 👋', 'success');
        }
    } else {
        // NEW USER - needs to complete profile
        console.log('🆕 New user, showing profile form');
        showStep('profileStep');
    }
    
    // Clear OTP data
    currentOTP = null;
    otpExpiry = null;
}

async function saveUserProfile(firstName, lastName, phone) {
    console.log('💾 Saving new user profile...');
    
    // Validate
    if (!firstName || !firstName.trim()) {
        showToast('يرجى إدخال الاسم الأول', 'error');
        return;
    }
    if (!lastName || !lastName.trim()) {
        showToast('يرجى إدخال الاسم الأخير', 'error');
        return;
    }
    
    const profile = {
        email: currentEmail,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone ? phone.trim() : '',
        createdAt: Date.now()
    };
    
    console.log('Profile to save:', profile);
    
    // Save to localStorage FIRST (backup)
    localStorage.setItem('userProfile_' + currentEmail, JSON.stringify(profile));
    console.log('✅ Saved to localStorage');
    
    // Save to Firebase
    let firebaseSaved = false;
    if (typeof saveUserToDatabase === 'function') {
        firebaseSaved = await saveUserToDatabase(profile);
    }
    
    if (firebaseSaved) {
        console.log('✅ Saved to Firebase');
    } else {
        console.log('⚠️ Firebase save failed, but localStorage is OK');
    }
    
    // Close modal and update UI
    closeAuthModal();
    updateUIForLoggedInUser(profile);
    showToast('تم إنشاء حسابك بنجاح! 🎉', 'success');
}

function logout() {
    localStorage.removeItem('user');
    updateUIForLoggedOutUser();
    showToast('تم تسجيل الخروج', 'success');
}

function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.isLoggedIn) {
        const profile = JSON.parse(localStorage.getItem('userProfile_' + user.email));
        if (profile) {
            updateUIForLoggedInUser(profile);
            return true;
        }
    }
    updateUIForLoggedOutUser();
    return false;
}

// ==================== UI HELPERS ====================

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidSaudiPhone(phone) {
    return /^05\d{8}$/.test(phone);
}

function showStep(stepId) {
    document.querySelectorAll('.auth-step').forEach(step => step.classList.remove('active'));
    document.getElementById(stepId)?.classList.add('active');
}

function showToast(message, type = 'info') {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();
    
    const icons = { success: 'check-circle', error: 'exclamation-circle', info: 'info-circle' };
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `<i class="fas fa-${icons[type]}"></i><span>${message}</span>`;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function openAuthModal() {
    document.getElementById('authModal')?.classList.add('active');
    showStep('emailStep');
    document.body.classList.add('no-scroll');
}

function closeAuthModal() {
    document.getElementById('authModal')?.classList.remove('active');
    document.body.classList.remove('no-scroll');
    // Reset form
    const emailInput = document.getElementById('loginEmail');
    const otpInput = document.getElementById('otpInput');
    if (emailInput) emailInput.value = '';
    if (otpInput) otpInput.value = '';
}

let resendTimer = null;
function startResendTimer() {
    let seconds = 60;
    const btn = document.getElementById('resendOtpBtn');
    if (!btn) return;
    
    btn.disabled = true;
    clearInterval(resendTimer);
    
    resendTimer = setInterval(() => {
        seconds--;
        btn.textContent = `إعادة الإرسال (${seconds})`;
        
        if (seconds <= 0) {
            clearInterval(resendTimer);
            btn.disabled = false;
            btn.textContent = 'إعادة إرسال الرمز';
        }
    }, 1000);
}

function updateUIForLoggedInUser(profile) {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    const adminLink = document.getElementById('adminLink');
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (userMenu) {
        userMenu.style.display = 'block';
        const userName = document.getElementById('userName');
        const userEmail = document.getElementById('userEmail');
        if (userName) userName.textContent = profile.firstName + ' ' + profile.lastName;
        if (userEmail) userEmail.textContent = profile.email;
    }
    
    // Show admin link only for admin
    if (adminLink) {
        if (typeof isAdmin === 'function' && isAdmin(profile.email)) {
            adminLink.style.display = 'flex';
        } else {
            adminLink.style.display = 'none';
        }
    }
}

function updateUIForLoggedOutUser() {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    
    if (loginBtn) loginBtn.style.display = 'flex';
    if (userMenu) userMenu.style.display = 'none';
}

// ==================== EVENT LISTENERS ====================

document.addEventListener('DOMContentLoaded', function() {
    // Check auth status
    checkAuthStatus();
    
    // Auth events - Login button in menu
    document.getElementById('loginBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal();
        // Close side menu if open
        const sideMenu = document.querySelector('.side-menu');
        const menuOverlay = document.querySelector('.menu-overlay');
        const menuToggle = document.querySelector('.menu-toggle');
        if (sideMenu) sideMenu.classList.remove('is-open');
        if (menuOverlay) menuOverlay.classList.remove('is-open');
        if (menuToggle) menuToggle.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
        // Then add no-scroll for modal
        setTimeout(() => document.body.classList.add('no-scroll'), 10);
    });
    
    document.querySelector('.close-auth-modal')?.addEventListener('click', closeAuthModal);
    
    document.getElementById('authModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'authModal') closeAuthModal();
    });
    
    document.getElementById('sendOtpBtn')?.addEventListener('click', () => {
        const email = document.getElementById('loginEmail').value.trim();
        sendOTP(email);
    });
    
    document.getElementById('verifyOtpBtn')?.addEventListener('click', () => {
        const otp = document.getElementById('otpInput').value.trim();
        verifyOTP(otp);
    });
    
    document.getElementById('resendOtpBtn')?.addEventListener('click', () => {
        if (currentEmail) sendOTP(currentEmail);
    });
    
    document.getElementById('saveProfileBtn')?.addEventListener('click', () => {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const phone = document.getElementById('phoneNumber').value.trim();
        
        if (!firstName || !lastName) {
            showToast('يرجى إدخال الاسم الأول والأخير', 'error');
            return;
        }
        
        if (phone && !isValidSaudiPhone(phone)) {
            showToast('يرجى إدخال رقم جوال صحيح', 'error');
            return;
        }
        
        saveUserProfile(firstName, lastName, phone);
    });
    
    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
        // Close dropdown
        document.getElementById('userDropdown')?.classList.remove('active');
    });
    
    // User menu dropdown
    document.getElementById('userMenuBtn')?.addEventListener('click', () => {
        document.getElementById('userDropdown')?.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.user-menu')) {
            document.getElementById('userDropdown')?.classList.remove('active');
        }
    });
    
    // Auto-verify OTP when 6 digits entered
    document.getElementById('otpInput')?.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        if (e.target.value.length === 6) verifyOTP(e.target.value);
    });
    
    // Enter key support
    document.getElementById('loginEmail')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') document.getElementById('sendOtpBtn')?.click();
    });
    
    document.getElementById('otpInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') document.getElementById('verifyOtpBtn')?.click();
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (document.getElementById('authModal')?.classList.contains('active')) {
                closeAuthModal();
            }
        }
    });
});