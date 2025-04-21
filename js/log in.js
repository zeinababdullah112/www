// Password visibility toggle
const passwordInput = document.getElementById('password');
const passwordToggle = document.querySelector('.password-toggle');

passwordToggle.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? '��️' : '👁️';
});

// Handle login form submission
const signinForm = document.getElementById('signin-form');

signinForm.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent actual form submission

    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find user with matching email and password
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Store logged-in user info in session
        sessionStorage.setItem('currentUser', JSON.stringify({
            fullName: user.fullName,
            email: user.email
        }));
        
        // Redirect to homepage
        window.location.href = 'index.html';
    } else {
        // Check if the email exists
        const emailExists = users.some(user => user.email === email);
        
        if (emailExists) {
            alert('Incorrect password. Please try again.');
        } else {
            alert('No account found with this email. Please check your email or sign up.');
        }
    }
});
