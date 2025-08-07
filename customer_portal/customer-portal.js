// Customer Portal Main JavaScript

// Initialize customer portal
document.addEventListener('DOMContentLoaded', function() {
    initializeCustomerPortal();
});

function initializeCustomerPortal() {
    // Check customer status and show/hide conditional elements
    checkCustomerStatus();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize mobile navigation
    initializeMobileNavigation();
    
    // Update mobile nav state
    updateMobileNavState();
    
    // Setup common event listeners
    setupCommonEventListeners();
    
    // Initialize profile dropdown
    initializeProfileDropdown();
    
    // Load customer data
    loadCustomerData();
}

function checkCustomerStatus() {
    // Get customer status from localStorage or API
    const customerData = getCustomerData();
    
    // Show/hide change requests navigation based on RF payment status
    const changeRequestNav = document.getElementById('changeRequestNav');
    if (changeRequestNav) {
        if (customerData.rfPaid) {
            changeRequestNav.style.display = 'block';
        } else {
            changeRequestNav.style.display = 'none';
        }
    }
    
    // Update notification count
    updateNotificationCount();
}

function getCustomerData() {
    // In a real application, this would come from an API
    return {
        id: 'CUST-001',
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+63 912 345 6789',
        propertyId: 'PROP-001',
        propertyName: 'Modern 2BR Condo',
        propertyStatus: 'reservation',
        rfPaid: true, // This determines if change requests are available
        rfAmount: 125000,
        rfPaidDate: '2024-01-15',
        documentsComplete: 3,
        documentsTotal: 5,
        nextPaymentDue: '2024-04-15',
        nextPaymentAmount: 125000
    };
}

function initializeNavigation() {
    // Set active navigation item
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        if (link && link.getAttribute('href') === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function initializeMobileNavigation() {
    // Set active mobile navigation item
    const currentPage = window.location.pathname.split('/').pop();
    const mobileNavTabs = document.querySelectorAll('.mobile-nav-tab');
    
    mobileNavTabs.forEach(tab => {
        const href = tab.getAttribute('href');
        if (href === currentPage) {
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
        } else {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        }
    });
    
    // Add click event listeners for mobile navigation
    mobileNavTabs.forEach(tab => {
        tab.addEventListener('click', handleMobileNavClick);
    });
    
    // Add page transition animation
    addPageTransitionAnimation();
}

function handleMobileNavClick(event) {
    event.preventDefault();
    
    const clickedTab = event.currentTarget;
    const targetHref = clickedTab.getAttribute('href');
    
    // Don't navigate if already on the same page
    const currentPage = window.location.pathname.split('/').pop();
    if (targetHref === currentPage) {
        return;
    }
    
    // Add loading state to clicked tab
    clickedTab.style.pointerEvents = 'none';
    
    // Create ripple effect
    createRippleEffect(event);
    
    // Smooth transition animation
    animateTabTransition(clickedTab, () => {
        // Navigate to the new page
        window.location.href = targetHref;
    });
    
    // Optional: Add haptic feedback for mobile devices
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
    
    console.log('Mobile nav clicked:', targetHref);
}

function animateTabTransition(clickedTab, callback) {
    // Add transition class to main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.classList.add('page-transition');
    }
    
    // Animate the clicked tab
    clickedTab.style.transform = 'scale(0.95)';
    
    // Delay the navigation to allow animation to complete
    setTimeout(() => {
        if (callback) callback();
    }, 150);
}

function createRippleEffect(event) {
    const tab = event.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = tab.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(59, 130, 246, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    tab.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function addPageTransitionAnimation() {
    // Add CSS for ripple animation if not already present
    if (!document.querySelector('#mobile-nav-styles')) {
        const style = document.createElement('style');
        style.id = 'mobile-nav-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .mobile-nav-tab {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add page transition class to main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.classList.add('page-transition');
    }
}

function updateMobileNavState() {
    const currentPage = window.location.pathname.split('/').pop();
    const mobileNavTabs = document.querySelectorAll('.mobile-nav-tab');
    
    mobileNavTabs.forEach(tab => {
        const href = tab.getAttribute('href');
        const isActive = href === currentPage;
        
        // Smoothly update active state
        if (isActive) {
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            
            // Animate the active state
            tab.style.animation = 'none';
            tab.offsetHeight; // Trigger reflow
            tab.style.animation = 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        } else {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        }
    });
}

function setupCommonEventListeners() {
    // Global search functionality (if implemented)
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleGlobalSearch);
    }
    
    // Modal close functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
        if (e.target.classList.contains('close')) {
            const modal = e.target.closest('.modal');
            if (modal) closeModal(modal);
        }
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal:not([style*="display: none"])');
            if (openModal) closeModal(openModal);
        }
    });
}

function loadCustomerData() {
    const customerData = getCustomerData();
    
    // Update user profile in sidebar
    const userName = document.querySelector('.user-name');
    const userRole = document.querySelector('.user-role');
    
    if (userName) userName.textContent = customerData.name;
    if (userRole) userRole.textContent = 'Property Owner';
    
    // Update property status if on dashboard
    const propertyStatus = document.getElementById('propertyStatus');
    if (propertyStatus) {
        propertyStatus.textContent = capitalizeFirst(customerData.propertyStatus);
    }
    
    // Update RF status
    const rfStatus = document.getElementById('rfStatus');
    if (rfStatus) {
        rfStatus.textContent = customerData.rfPaid ? 'Paid' : 'Pending';
    }
    
    // Update documents status
    const documentsStatus = document.getElementById('documentsStatus');
    if (documentsStatus) {
        documentsStatus.textContent = `${customerData.documentsComplete} of ${customerData.documentsTotal} Complete`;
    }
}

function updateNotificationCount() {
    // Get unread notifications count
    const unreadCount = getUnreadNotificationsCount();
    const notificationCounts = document.querySelectorAll('.notification-count');
    
    notificationCounts.forEach(count => {
        if (unreadCount > 0) {
            count.textContent = unreadCount;
            count.style.display = 'inline-block';
        } else {
            count.style.display = 'none';
        }
    });
}

function getUnreadNotificationsCount() {
    // In a real application, this would come from an API
    return 2;
}

// Utility Functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP'
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatDateTime(dateString) {
    return new Date(dateString).toLocaleString('en-PH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus trap for accessibility
        const focusableElements = modal.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }
}

function closeModal(modal) {
    if (typeof modal === 'string') {
        modal = document.getElementById(modal);
    }
    
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Form Validation
function validateRequired(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    return isValid;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^(\+63|0)[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    const errorElement = document.createElement('small');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Notification Functions
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    let container = document.querySelector('.notifications-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notifications-container';
        document.body.appendChild(container);
    }
    
    container.appendChild(notification);
    
    // Auto remove after duration
    if (duration > 0) {
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, duration);
    }
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Loading States
function showLoading(element) {
    if (typeof element === 'string') {
        element = document.getElementById(element);
    }
    
    if (element) {
        element.classList.add('loading');
        const originalContent = element.innerHTML;
        element.dataset.originalContent = originalContent;
        element.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Loading...</span>
            </div>
        `;
    }
}

function hideLoading(element) {
    if (typeof element === 'string') {
        element = document.getElementById(element);
    }
    
    if (element && element.classList.contains('loading')) {
        element.classList.remove('loading');
        element.innerHTML = element.dataset.originalContent || '';
    }
}

// File Upload Helpers
function handleFileUpload(input, callback) {
    const files = input.files;
    if (files.length === 0) return;
    
    Array.from(files).forEach(file => {
        if (validateFile(file)) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (callback) callback(file, e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
}

function validateFile(file) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    
    if (file.size > maxSize) {
        showNotification('File size must be less than 10MB', 'error');
        return false;
    }
    
    if (!allowedTypes.includes(file.type)) {
        showNotification('Only PDF, JPG, and PNG files are allowed', 'error');
        return false;
    }
    
    return true;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Local Storage Helpers
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function getFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
}

// Export/Download Functions
function downloadFile(content, filename, contentType = 'text/plain') {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function downloadJSON(data, filename) {
    const content = JSON.stringify(data, null, 2);
    downloadFile(content, filename, 'application/json');
}

function downloadCSV(data, filename) {
    if (!Array.isArray(data) || data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => 
            JSON.stringify(row[header] || '')
        ).join(','))
    ].join('\n');
    
    downloadFile(csvContent, filename, 'text/csv');
}

// Sign Out Function
function signOut() {
    if (confirm('Are you sure you want to sign out?')) {
        // Clear any stored session data
        removeFromStorage('customerSession');
        removeFromStorage('customerData');
        
        // Show loading
        showNotification('Signing out...', 'info');
        
        // Redirect to login page
        setTimeout(() => {
            window.location.href = '../login.html';
        }, 1000);
    }
}

// Profile Dropdown Functions
function initializeProfileDropdown() {
    // Close dropdown on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const dropdown = document.getElementById('profileDropdown');
            if (dropdown) {
                dropdown.classList.remove('active');
            }
        }
    });
}

function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    if (!dropdown) return;
    
    dropdown.classList.toggle('active');
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function closeDropdown(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
            document.removeEventListener('click', closeDropdown);
        }
    });
}

// Initialize tooltips and other UI enhancements
function initializeUIEnhancements() {
    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled && !this.classList.contains('btn-text')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });
    
    // Auto-resize textareas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
}

// Mobile Navigation Tabs Functionality
function initializeMobileNavTabs() {
    const tabs = document.querySelector('.tabs');
    const tabButtons = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    if (!tabs || !tabButtons.length) return;

    // Handle click
    function handleClick(e) {
        tabPanels.forEach(tabPanel => {
            tabPanel.hidden = true;
            tabPanel.classList.remove('active');
        });
        
        tabButtons.forEach(tabButton => {
            tabButton.setAttribute('aria-selected', 'false');
        });
        
        e.currentTarget.setAttribute('aria-selected', 'true');
        
        const { id } = e.currentTarget;
        const tabPanel = tabs.querySelector(`[aria-labelledby="${id}"]`);
        
        if (tabPanel) {
            tabPanel.hidden = false;
            tabPanel.classList.add('active');
        }
        
        const label = e.currentTarget.querySelector('.label');
        if (label) {
            console.log('Tab clicked:', label.textContent, 'Label width:', label.offsetWidth);
        }
    }

    tabButtons.forEach(tabButton => {
        tabButton.addEventListener('click', handleClick);
    });

    // Set active tab based on current page
    function setActiveTab() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        let activeTabId = 'home'; // default
        
        switch(currentPage) {
            case 'index.html':
            case '':
                activeTabId = 'home';
                break;
            case 'opportunities.html':
                activeTabId = 'opportunities';
                break;
            case 'documents.html':
                activeTabId = 'documents';
                break;
            case 'payments.html':
                activeTabId = 'payments';
                break;
            case 'reservation-agreements.html':
                activeTabId = 'agreements';
                break;
            case 'change-requests.html':
                activeTabId = 'requests';
                break;
            case 'profile.html':
                activeTabId = 'profile';
                break;
        }
        
        // Reset all tabs
        tabButtons.forEach(button => {
            button.setAttribute('aria-selected', 'false');
        });
        
        // Set active tab
        const activeTab = document.getElementById(activeTabId);
        if (activeTab) {
            activeTab.setAttribute('aria-selected', 'true');
        }
    }
    
    // Initialize active tab
    setActiveTab();
}

// Initialize mobile nav tabs when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileNavTabs();
});

// Call UI enhancements after DOM is loaded
document.addEventListener('DOMContentLoaded', initializeUIEnhancements);

// Function to add mobile menu toggle to header


// Global Search Function
function handleGlobalSearch(e) {
    const query = e.target.value.toLowerCase();
    if (query.length < 2) return;
    
    // Implement global search functionality
    console.log('Searching for:', query);
    // This would typically make an API call to search across all customer data
}

// Initialize tooltips and other UI enhancements
function initializeUIEnhancements() {
    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled && !this.classList.contains('btn-text')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });
    
    // Auto-resize textareas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
}

// Mobile Navigation Tabs Functionality
function initializeMobileNavTabs() {
    const tabs = document.querySelector('.tabs');
    const tabButtons = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    if (!tabs || !tabButtons.length) return;

    // Handle click
    function handleClick(e) {
        tabPanels.forEach(tabPanel => {
            tabPanel.hidden = true;
            tabPanel.classList.remove('active');
        });
        
        tabButtons.forEach(tabButton => {
            tabButton.setAttribute('aria-selected', 'false');
        });
        
        e.currentTarget.setAttribute('aria-selected', 'true');
        
        const { id } = e.currentTarget;
        const tabPanel = tabs.querySelector(`[aria-labelledby="${id}"]`);
        
        if (tabPanel) {
            tabPanel.hidden = false;
            tabPanel.classList.add('active');
        }
        
        const label = e.currentTarget.querySelector('.label');
        if (label) {
            console.log('Tab clicked:', label.textContent, 'Label width:', label.offsetWidth);
        }
    }

    tabButtons.forEach(tabButton => {
        tabButton.addEventListener('click', handleClick);
    });

    // Set active tab based on current page
    function setActiveTab() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        let activeTabId = 'home'; // default
        
        switch(currentPage) {
            case 'index.html':
            case '':
                activeTabId = 'home';
                break;
            case 'opportunities.html':
                activeTabId = 'opportunities';
                break;
            case 'documents.html':
                activeTabId = 'documents';
                break;
            case 'payments.html':
                activeTabId = 'payments';
                break;
            case 'reservation-agreements.html':
                activeTabId = 'agreements';
                break;
            case 'change-requests.html':
                activeTabId = 'requests';
                break;
            case 'profile.html':
                activeTabId = 'profile';
                break;
        }
        
        // Reset all tabs
        tabButtons.forEach(button => {
            button.setAttribute('aria-selected', 'false');
        });
        
        // Set active tab
        const activeTab = document.getElementById(activeTabId);
        if (activeTab) {
            activeTab.setAttribute('aria-selected', 'true');
        }
    }
    
    // Initialize active tab
    setActiveTab();
}

// Initialize mobile nav tabs when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileNavTabs();
});