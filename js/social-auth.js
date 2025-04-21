// Social Authentication Configuration
// Replace these with your actual client IDs
const GOOGLE_CLIENT_ID = '913333802494-l5anvau78sa94mbivsgbiof3rv6cdts2.apps.googleusercontent.com';
const FACEBOOK_APP_ID = 'YOUR_FACEBOOK_APP_ID';

// Initialize the authentication providers
function initAuth() {
    // Initialize Facebook SDK
    FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v18.0'
    });

    // Add event listeners for social buttons
    setupSocialButtons();
}

// Setup social login/signup button handlers
function setupSocialButtons() {
    // Google Sign In
    const googleSignInBtn = document.getElementById('googleSignIn');
    const googleSignUpBtn = document.getElementById('googleSignUp');
    
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', handleGoogleSignIn);
    }
    
    if (googleSignUpBtn) {
        googleSignUpBtn.addEventListener('click', handleGoogleSignIn);
    }
    
    // Facebook Sign In
    const facebookSignInBtn = document.getElementById('facebookSignIn');
    const facebookSignUpBtn = document.getElementById('facebookSignUp');
    
    if (facebookSignInBtn) {
        facebookSignInBtn.addEventListener('click', handleFacebookSignIn);
    }
    
    if (facebookSignUpBtn) {
        facebookSignUpBtn.addEventListener('click', handleFacebookSignIn);
    }
}

// Handle Google Sign In
function handleGoogleSignIn() {
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse
    });
    
    google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Try another way to display Google sign-in
            console.log("Google sign-in prompt not displayed");
        }
    });
}

// Handle Google Sign In Response
function handleGoogleResponse(response) {
    // Parse JWT token from Google
    const payload = parseJwt(response.credential);
    
    // Create user object
    const user = {
        fullName: payload.name,
        email: payload.email,
        profilePic: payload.picture,
        authProvider: 'google'
    };
    
    // Save user to localStorage
    saveUserAndLogin(user);
}

// Handle Facebook Sign In
function handleFacebookSignIn() {
    FB.login(function(response) {
        if (response.authResponse) {
            // Get user info from Facebook
            FB.api('/me', {fields: 'name,email,picture'}, function(response) {
                const user = {
                    fullName: response.name,
                    email: response.email,
                    profilePic: response.picture?.data?.url,
                    authProvider: 'facebook'
                };
                
                // Save user to localStorage
                saveUserAndLogin(user);
            });
        } else {
            console.log('Facebook login failed');
        }
    }, {scope: 'public_profile,email'});
}

// Helper function to parse JWT token
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
}

// Save user data and redirect
function saveUserAndLogin(user) {
    // Get existing users
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    const existingUserIndex = users.findIndex(u => u.email === user.email);
    
    if (existingUserIndex === -1) {
        // Add new user
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Store current user in session
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Initialize when the window loads
window.addEventListener('load', initAuth); 