// Seller Portal Main JavaScript

// Common functionality for all seller portal pages

// Initialize portal
document.addEventListener('DOMContentLoaded', function() {
    initializePortal();
    setupCommonEventListeners();
});

// Initialize portal
function initializePortal() {
    // Set current date for date inputs
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        if (!input.value) {
            input.value = today;
        }
    });
    
    // Update notification count
    updateNotificationCount();
    
    // Load user data
    loadUserData();
}

// Setup common event listeners
function setupCommonEventListeners() {
    // Navigation active state
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Profile dropdown
    const profileDropdown = document.querySelector('.profile-dropdown');
    if (profileDropdown) {
        profileDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.querySelector('.dropdown-content');
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    });
}

// Update notification count
function updateNotificationCount() {
    const notificationBadge = document.querySelector('.notification-badge');
    if (notificationBadge) {
        // In a real app, this would fetch from server
        const count = Math.floor(Math.random() * 5) + 1;
        notificationBadge.textContent = count;
    }
}

// Load user data
function loadUserData() {
    // In a real app, this would fetch user data from server
    const userData = {
        name: 'John Seller',
        email: 'john.seller@membro.com',
        department: 'Sales',
        reportsTo: 'Sales Manager'
    };
    
    // Store user data for use across pages
    localStorage.setItem('sellerUserData', JSON.stringify(userData));
}

// Get user data
function getUserData() {
    const userData = localStorage.getItem('sellerUserData');
    return userData ? JSON.parse(userData) : null;
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Format currency
function formatCurrency(amount, currency = 'PHP') {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Format date for input fields
function formatDateForInput(dateString) {
    return new Date(dateString).toISOString().split('T')[0];
}

// Get date range for reports
function getDateRange(startDateId, endDateId) {
    const startDate = document.getElementById(startDateId)?.value;
    const endDate = document.getElementById(endDateId)?.value;
    
    if (!startDate || !endDate) {
        showNotification('Please select both start and end dates', 'error');
        return null;
    }
    
    return { startDate, endDate };
}

// Validate date range
function validateDateRange(startDate, endDate) {
    if (new Date(startDate) > new Date(endDate)) {
        showNotification('Start date cannot be after end date', 'error');
        return false;
    }
    return true;
}

// Generate CSV from data
function generateCSV(data, filename) {
    if (!data || data.length === 0) {
        showNotification('No data to export', 'error');
        return;
    }
    
    const headers = Object.keys(data[0]);
    let csvContent = headers.join(',') + '\n';
    
    data.forEach(row => {
        const values = headers.map(header => {
            const value = row[header];
            return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        });
        csvContent += values.join(',') + '\n';
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification('Report exported successfully!', 'success');
}

// Generate PDF (placeholder - in real app would use a library like jsPDF)
function generatePDF(data, filename) {
    console.log('Generating PDF for:', data);
    showNotification('PDF generation would be implemented with a library like jsPDF', 'info');
}

// Print element
function printElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        table { border-collapse: collapse; width: 100%; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    ${element.outerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// Close modal with escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
});

// Loading spinner
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading-spinner';
    loading.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.querySelector('.loading-spinner');
    if (loading) {
        loading.remove();
    }
}

// Add loading spinner styles
const loadingStyles = `
    .loading-spinner {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    
    .loading-spinner i {
        font-size: 3rem;
        color: white;
    }
    
    .notification {
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 1001;
        animation: slideIn 0.3s ease;
    }
    
    .notification.success {
        border-left: 4px solid #28a745;
    }
    
    .notification.error {
        border-left: 4px solid #dc3545;
    }
    
    .notification.info {
        border-left: 4px solid #007bff;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// Seller Mobile Sidebar Navigation Functions
function openSellerMobileNav() {
    const overlay = document.getElementById('sellerMobileNavOverlay');
    const sidebar = document.getElementById('sellerMobileSidebar');
    
    if (overlay && sidebar) {
        overlay.classList.add('active');
        sidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSellerMobileNav() {
    const overlay = document.getElementById('sellerMobileNavOverlay');
    const sidebar = document.getElementById('sellerMobileSidebar');
    
    if (overlay && sidebar) {
        overlay.classList.remove('active');
        sidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close seller mobile nav on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSellerMobileNav();
    }
});

// Initialize seller mobile sidebar navigation
function initializeSellerMobileSidebar() {
    // Set active navigation item in mobile sidebar
    const currentPage = window.location.pathname.split('/').pop();
    const mobileNavLinks = document.querySelectorAll('.seller-mobile-nav-link');
    
    mobileNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update DOM loaded event to include seller mobile sidebar initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeSellerMobileSidebar();
}); 