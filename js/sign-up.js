// Toggle password visibility
const passwordInput = document.getElementById('password');
const passwordToggle = document.querySelector('.password-toggle');

passwordToggle.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? '��️' : '👁️';
});

// Handle sign up form submission
const signinForm = document.getElementById('signin-form');

signinForm.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent default form submission
    
    // Get form values
    const fullName = document.getElementById('Full name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Create new user object
    const newUser = {
        fullName: fullName,
        email: email,
        password: password
    };
    
    // Retrieve existing users from localStorage or initialize empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user with this email already exists
    const userExists = users.some(user => user.email === email);
    
    if (userExists) {
        alert('A user with this email already exists. Please use a different email.');
        return;
    }
    
    // Add new user to array
    users.push(newUser);
    
    // Save updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Account created successfully! Please log in.');
    
    // Redirect to login page
    window.location.href = 'log in.html';
});

document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle functionality
    const toggleButtons = document.querySelectorAll('.password-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
            } else {
                passwordInput.type = 'password';
            }
        });
    });
});
