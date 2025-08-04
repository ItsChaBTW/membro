// Profile Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Profile page loaded');
    initializeProfile();
    injectProfileStyles();
});

function initializeProfile() {
    setupEventListeners();
    loadProfileData();
}

function setupEventListeners() {
    // Profile form submission
    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveProfile();
    });
    
    // Password form submission
    document.getElementById('passwordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        changePassword();
    });
    
    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveContactDetails();
    });
    
    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            filterTab(this);
        });
    });
}

function loadProfileData() {
    // In a real application, this would load from an API
    const profileData = {
        firstName: 'John',
        lastName: 'Seller',
        email: 'john.seller@membro.com',
        phone: '+63 912 345 6789',
        department: 'Sales Department',
        reportsTo: 'Sales Manager',
        address: '123 Business District, Makati City, Metro Manila'
    };
    
    // Populate form fields
    Object.keys(profileData).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.value = profileData[key];
        }
    });
}

function editProfile() {
    // Enable form fields
    const formInputs = document.querySelectorAll('#profileForm input, #profileForm textarea');
    formInputs.forEach(input => {
        if (input.id !== 'email' && input.id !== 'department' && input.id !== 'reportsTo') {
            input.removeAttribute('readonly');
            input.classList.add('editable');
        }
    });
    
    // Show form actions
    document.getElementById('profileActions').style.display = 'flex';
    
    // Change edit button text
    const editButton = document.querySelector('.card-header .btn-text');
    editButton.innerHTML = '<i class="fas fa-times"></i> Cancel';
    editButton.onclick = cancelEdit;
}

function cancelEdit() {
    // Disable form fields
    const formInputs = document.querySelectorAll('#profileForm input, #profileForm textarea');
    formInputs.forEach(input => {
        input.setAttribute('readonly', true);
        input.classList.remove('editable');
    });
    
    // Hide form actions
    document.getElementById('profileActions').style.display = 'none';
    
    // Restore original values
    loadProfileData();
    
    // Change button back
    const editButton = document.querySelector('.card-header .btn-text');
    editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
    editButton.onclick = editProfile;
}

function saveProfile() {
    const formData = new FormData(document.getElementById('profileForm'));
    
    // Validate form data
    if (!validateProfileForm(formData)) {
        return;
    }
    
    // In a real application, this would send data to server
    console.log('Saving profile:', Object.fromEntries(formData));
    
    // Show success message
    showNotification('Profile updated successfully!', 'success');
    
    // Disable editing mode
    cancelEdit();
}

function validateProfileForm(formData) {
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const phone = formData.get('phone');
    
    if (!firstName || firstName.trim().length < 2) {
        showNotification('First name must be at least 2 characters', 'error');
        return false;
    }
    
    if (!lastName || lastName.trim().length < 2) {
        showNotification('Last name must be at least 2 characters', 'error');
        return false;
    }
    
    if (!phone || !isValidPhone(phone)) {
        showNotification('Please enter a valid phone number', 'error');
        return false;
    }
    
    return true;
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function changePassword() {
    const formData = new FormData(document.getElementById('passwordForm'));
    
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');
    
    // Validate passwords
    if (!validatePasswordForm(currentPassword, newPassword, confirmPassword)) {
        return;
    }
    
    // In a real application, this would send to server
    console.log('Changing password');
    
    // Show success message
    showNotification('Password changed successfully!', 'success');
    
    // Clear form
    document.getElementById('passwordForm').reset();
}

function validatePasswordForm(currentPassword, newPassword, confirmPassword) {
    if (!currentPassword) {
        showNotification('Please enter your current password', 'error');
        return false;
    }
    
    if (!isValidPassword(newPassword)) {
        showNotification('Password must be at least 8 characters with uppercase, lowercase, and numbers', 'error');
        return false;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('New passwords do not match', 'error');
        return false;
    }
    
    if (currentPassword === newPassword) {
        showNotification('New password must be different from current password', 'error');
        return false;
    }
    
    return true;
}

function isValidPassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggleBtn = input.nextElementSibling;
    const icon = toggleBtn.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function editContact() {
    // Enable contact form fields
    const contactInputs = document.querySelectorAll('#contactForm input');
    contactInputs.forEach(input => {
        input.removeAttribute('readonly');
        input.classList.add('editable');
    });
    
    // Show form actions
    document.getElementById('contactActions').style.display = 'flex';
    
    // Change edit button
    const editButton = document.querySelector('#contactForm').closest('.dashboard-card').querySelector('.btn-text');
    editButton.innerHTML = '<i class="fas fa-times"></i> Cancel';
    editButton.onclick = cancelContactEdit;
}

function cancelContactEdit() {
    // Disable contact form fields
    const contactInputs = document.querySelectorAll('#contactForm input');
    contactInputs.forEach(input => {
        input.setAttribute('readonly', true);
        input.classList.remove('editable');
    });
    
    // Hide form actions
    document.getElementById('contactActions').style.display = 'none';
    
    // Change button back
    const editButton = document.querySelector('#contactForm').closest('.dashboard-card').querySelector('.btn-text');
    editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
    editButton.onclick = editContact;
}

function saveContactDetails() {
    const formData = new FormData(document.getElementById('contactForm'));
    
    // Validate contact data
    if (!validateContactForm(formData)) {
        return;
    }
    
    // In a real application, this would send to server
    console.log('Saving contact details:', Object.fromEntries(formData));
    
    // Show success message
    showNotification('Contact details updated successfully!', 'success');
    
    // Disable editing mode
    cancelContactEdit();
}

function validateContactForm(formData) {
    const primaryEmail = formData.get('primaryEmail');
    const mobileNumber = formData.get('mobileNumber');
    
    if (!isValidEmail(primaryEmail)) {
        showNotification('Please enter a valid primary email', 'error');
        return false;
    }
    
    if (!isValidPhone(mobileNumber)) {
        showNotification('Please enter a valid mobile number', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Add profile-specific styles
const profileStyles = `
    .profile-layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .profile-section {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .profile-avatar-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid var(--border-color);
    }
    
    .profile-avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        border: 4px solid var(--border-color);
    }
    
    .avatar-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .btn-sm {
        padding: 0.5rem 0.75rem;
        font-size: 0.8rem;
    }
    
    .profile-form,
    .password-form,
    .contact-form {
        width: 100%;
    }
    
    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .form-group.full-width {
        grid-column: 1 / -1;
    }
    
    .form-group label {
        font-weight: 500;
        color: var(--text-primary);
        font-size: 0.875rem;
    }
    
    .form-group input,
    .form-group textarea,
    .form-group select {
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        background-color: var(--bg-secondary);
        color: var(--text-primary);
        transition: all 0.2s ease;
    }
    
    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgb(99 102 241 / 0.1);
        background-color: var(--bg-primary);
    }
    
    .form-group input.editable,
    .form-group textarea.editable {
        background-color: var(--bg-primary);
        border-color: var(--primary-color);
    }
    
    .form-group input[readonly],
    .form-group textarea[readonly] {
        background-color: var(--bg-secondary);
        cursor: default;
    }
    
    .password-input {
        position: relative;
    }
    
    .password-toggle {
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        padding: 0.25rem;
    }
    
    .password-toggle:hover {
        color: var(--text-primary);
    }
    
    .password-requirements {
        margin-top: 0.25rem;
    }
    
    .password-requirements small {
        color: var(--text-muted);
        font-size: 0.75rem;
    }
    
    .contact-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .contact-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background-color: var(--bg-secondary);
        border-radius: var(--radius-lg);
    }
    
    .contact-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.125rem;
    }
    
    .contact-details {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .contact-details label {
        font-weight: 500;
        color: var(--text-secondary);
        font-size: 0.875rem;
    }
    
    .contact-details input {
        background-color: transparent;
        border: none;
        padding: 0;
        font-size: 0.875rem;
        color: var(--text-primary);
        font-weight: 500;
    }
    
    .contact-details input.editable {
        background-color: var(--bg-primary);
        border: 1px solid var(--border-color);
        padding: 0.5rem;
        border-radius: var(--radius-md);
    }
    
    .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color);
    }
    
    @media (max-width: 768px) {
        .form-grid {
            grid-template-columns: 1fr;
        }
        
        .form-actions {
            flex-direction: column;
        }
    }
`;

// Inject profile-specific styles
function injectProfileStyles() {
    // Add styles to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = profileStyles;
    document.head.appendChild(styleSheet);
}

// Export profile data
function exportProfile() {
    const profileData = {
        name: 'John Seller',
        email: 'john.seller@membro.com',
        phone: '+63 912 345 6789',
        department: 'Sales Department',
        performance: {
            totalSales: '₱12.5M',
            propertiesSold: 24,
            conversionRate: '78%',
            activeLeads: 15
        }
    };
    
    const dataStr = JSON.stringify(profileData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'profile-data.json';
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Profile data exported successfully', 'success');
}

// Print profile
function printProfile() {
    window.print();
    showNotification('Print dialog opened', 'info');
} 