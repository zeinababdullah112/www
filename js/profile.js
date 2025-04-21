// Profile page functionality

// DOM elements
const profileForm = document.getElementById('profile-form');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const currentPasswordInput = document.getElementById('currentPassword');
const newPasswordInput = document.getElementById('newPassword');
const editProfileBtn = document.getElementById('editProfileBtn');
const saveProfileBtn = document.getElementById('saveProfileBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const userNameElements = document.querySelectorAll('.user-name');
const userEmailElement = document.querySelector('.user-email');
const authProviderElement = document.querySelector('.auth-provider');
const passwordFields = document.querySelectorAll('.password-field');

// Get current user data
const currentUser = getCurrentUser();

// Redirect if not logged in
if (!currentUser) {
    window.location.href = 'log in.html';
}

// Initialize profile data
function initializeProfile() {
    if (currentUser) {
        // Set user name
        userNameElements.forEach(el => {
            if (el) el.textContent = currentUser.fullName;
        });
        
        // Set form values
        fullNameInput.value = currentUser.fullName;
        emailInput.value = currentUser.email;
        
        // Set email display
        userEmailElement.textContent = currentUser.email;
        
        // Set auth provider badge if available
        if (currentUser.authProvider) {
            authProviderElement.textContent = `Signed in with ${currentUser.authProvider.charAt(0).toUpperCase() + currentUser.authProvider.slice(1)}`;
            
            // Hide password fields for social login users
            passwordFields.forEach(field => {
                field.style.display = 'none';
            });
        } else {
            authProviderElement.style.display = 'none';
        }
    }
}

// Toggle edit mode
function toggleEditMode(isEditing) {
    fullNameInput.disabled = !isEditing;
    
    // Show/hide buttons
    editProfileBtn.style.display = isEditing ? 'none' : 'inline-block';
    saveProfileBtn.style.display = isEditing ? 'inline-block' : 'none';
    cancelEditBtn.style.display = isEditing ? 'inline-block' : 'none';
    
    // Reset password fields when not editing
    if (!isEditing) {
        currentPasswordInput.value = '';
        newPasswordInput.value = '';
    }
}

// Button event listeners
editProfileBtn.addEventListener('click', function() {
    toggleEditMode(true);
});

cancelEditBtn.addEventListener('click', function() {
    // Reset form to original values
    fullNameInput.value = currentUser.fullName;
    toggleEditMode(false);
});

// Save profile changes
profileForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get updated values
    const updatedName = fullNameInput.value.trim();
    const currentPassword = currentPasswordInput.value;
    const newPassword = newPasswordInput.value;
    
    // Validate
    if (!updatedName) {
        alert('Name cannot be empty');
        return;
    }
    
    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find current user index
    const userIndex = users.findIndex(user => user.email === currentUser.email);
    
    if (userIndex !== -1) {
        // Update name
        users[userIndex].fullName = updatedName;
        
        // Update password if provided (and not a social login)
        if (!currentUser.authProvider && newPassword) {
            // Verify current password
            if (users[userIndex].password !== currentPassword) {
                alert('Current password is incorrect');
                return;
            }
            
            // Update password
            users[userIndex].password = newPassword;
        }
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Update session storage
        const updatedUser = {
            ...currentUser,
            fullName: updatedName
        };
        sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        // Update UI
        userNameElements.forEach(el => {
            if (el) el.textContent = updatedName;
        });
        
        // Exit edit mode
        toggleEditMode(false);
        
        alert('Profile updated successfully');
    } else {
        alert('Error updating profile. Please try again.');
    }
});

// Initialize profile when page loads
document.addEventListener('DOMContentLoaded', initializeProfile); 