// Authentication utilities

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// Get current user data
function getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

// Sign out functionality
function signOut() {
    // Remove user data from local storage
    localStorage.removeItem('currentUser');
    
    // Redirect to home page
    window.location.href = 'home.html';
}

// Update UI based on login status
function updateUIForAuthState() {
    const loggedIn = isLoggedIn();
    const currentUser = getCurrentUser();
    
    // Elements to update
    const loginButtons = document.querySelectorAll('.login-btn');
    const profileButtons = document.querySelectorAll('.profile-btn');
    const userNameElements = document.querySelectorAll('.user-name');
    
    if (loggedIn && currentUser) {
        // User is logged in
        
        // Hide login buttons
        loginButtons.forEach(btn => {
            if (btn) btn.style.display = 'none';
        });
        
        // Show profile buttons
        profileButtons.forEach(btn => {
            if (btn) btn.style.display = 'inline-block';
        });
        
        // Update user name elements
        userNameElements.forEach(el => {
            if (el) el.textContent = currentUser.fullName;
        });
        
        // Enable access to protected pages by removing click event listeners
        updateNavigationLinks(true);
    } else {
        // User is not logged in
        
        // Show login buttons
        loginButtons.forEach(btn => {
            if (btn) btn.style.display = 'inline-block';
        });
        
        // Hide profile buttons
        profileButtons.forEach(btn => {
            if (btn) btn.style.display = 'none';
        });
        
        // Ensure protected pages require login
        updateNavigationLinks(false);
    }
}

// Update navigation links based on login status
function updateNavigationLinks(isLoggedIn) {
    const navLinks = document.querySelectorAll('.mainmenu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Skip home and login/signup pages
        if (href === './home.html' || href === 'home.html' || 
            href === 'log in.html' || href === 'sign-up.html') {
            return;
        }
        
        if (isLoggedIn) {
            // If user is logged in, enable direct navigation
            if (link.hasAttribute('onclick')) {
                link.removeAttribute('onclick');
                
                // Restore the original href if it was stored
                const originalHref = link.getAttribute('data-original-href');
                if (originalHref) {
                    link.href = originalHref;
                }
            }
        } else {
            // If user is not logged in, intercept clicks to show login message
            if (!link.hasAttribute('onclick')) {
                // Store original href if not already stored
                if (!link.hasAttribute('data-original-href') && href && href !== '#') {
                    link.setAttribute('data-original-href', href);
                }
                
                link.setAttribute('onclick', 'showLoginMessage(event)');
                link.href = '#';
            }
        }
    });
}

// Listen for storage events to sync login state across tabs
window.addEventListener('storage', function(e) {
    // If the currentUser item changed in another tab
    if (e.key === 'currentUser') {
        // Update the UI to reflect the new login state
        updateUIForAuthState();
        
        // If user logged out in another tab and we're on a restricted page, redirect to home
        if (!e.newValue && isRestrictedPage()) {
            window.location.href = 'home.html';
        }
    }
});

// Check if the current page is a restricted page that requires login
function isRestrictedPage() {
    const publicPages = ['home.html', 'index.html', 'log in.html', 'sign-up.html'];
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    return !publicPages.some(page => currentPage === page || currentPage === '');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateUIForAuthState();
    
    // Add login form submission handler if on login page
    const loginForm = document.getElementById('signin-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (!email || !password) {
                alert('Please enter both email and password');
                return;
            }
            
            // Get users from localStorage or create empty array
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Check if user exists
            const user = users.find(u => u.email === email);
            
            if (user) {
                // In a real application, you would verify the password hash here
                // For this demo, we'll just log the user in
                
                // Store current user in local storage
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // Redirect to index page instead of home page
                window.location.href = 'index.html';
            } else {
                alert('Invalid email or password');
            }
        });
    }
    
    // Add signup form submission handler if on signup page
    const signupForm = document.getElementById('signin-form');
    if (signupForm && window.location.href.includes('sign-up.html')) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Basic validation
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            // Check if passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Get users from localStorage or create empty array
            let users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Check if user already exists
            if (users.some(u => u.email === email)) {
                alert('An account with this email already exists');
                return;
            }
            
            // Create new user
            const newUser = {
                firstName: firstName,
                lastName: lastName,
                fullName: firstName + ' ' + lastName,
                email: email,
                password: password, // In a real app, this should be hashed
                authProvider: 'email'
            };
            
            // Add user to array
            users.push(newUser);
            
            // Save updated users array
            localStorage.setItem('users', JSON.stringify(users));
            
            // Store current user in local storage
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            // Redirect to index page instead of home page
            window.location.href = 'index.html';
        });
    }
}); 