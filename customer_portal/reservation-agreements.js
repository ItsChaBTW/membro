// Reservation Agreements Page JavaScript

// Tab switching functionality
function switchTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked tab button
    const clickedButton = event.target.closest('.tab-btn');
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

// Contract download functionality
function downloadContract(contractType) {
    // Simulate contract download
    const contracts = {
        'reservation-agreement': {
            filename: 'Reservation_Agreement_John_Doe_2024.pdf',
            size: '2.3 MB'
        },
        'payment-terms': {
            filename: 'Payment_Terms_Agreement_John_Doe_2024.pdf',
            size: '1.8 MB'
        },
        'property-transfer': {
            filename: 'Property_Transfer_Agreement_John_Doe_2024.pdf',
            size: '3.1 MB'
        }
    };
    
    const contract = contracts[contractType];
    if (contract) {
        // Show download notification
        showNotification(`Downloading ${contract.filename}...`, 'success');
        
        // Simulate download delay
        setTimeout(() => {
            // In a real application, this would trigger an actual file download
            // For now, we'll just show a success message
            showNotification(`${contract.filename} downloaded successfully!`, 'success');
        }, 2000);
    }
}

// Contract preview functionality
function previewContract(contractType) {
    const contracts = {
        'reservation-agreement': {
            title: 'Reservation Agreement',
            content: 'This is a preview of the Reservation Agreement signed on January 15, 2024...'
        },
        'payment-terms': {
            title: 'Payment Terms Agreement',
            content: 'This is a preview of the Payment Terms Agreement...'
        },
        'property-transfer': {
            title: 'Property Transfer Agreement',
            content: 'This is a preview of the Property Transfer Agreement...'
        }
    };
    
    const contract = contracts[contractType];
    if (contract) {
        // Show preview modal
        showContractPreview(contract.title, contract.content);
    }
}

// Show contract preview modal
function showContractPreview(title, content) {
    // Create modal HTML
    const modalHTML = `
        <div id="contractPreviewModal" class="modal">
            <div class="modal-content" style="max-width: 800px; width: 90%;">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <span class="close" onclick="closeContractPreview()">&times;</span>
            </div>
                <div class="modal-body">
                    <div class="contract-preview">
                        <div class="preview-header">
                            <i class="fas fa-file-pdf" style="font-size: 3rem; color: #dc2626; margin-bottom: 1rem;"></i>
                            <h4>Document Preview</h4>
                            <p>This is a preview of your contract document. For the full document, please use the download button.</p>
                </div>
                        <div class="preview-content">
                            <p>${content}</p>
                            <p>This document contains the complete terms and conditions of your agreement, including all legal clauses, payment schedules, and property details.</p>
                            <p>Please note that this preview shows only a portion of the document. The full PDF contains all pages and complete information.</p>
                </div>
                </div>
            </div>
                <div class="modal-footer">
                    <button class="btn btn-outline" onclick="closeContractPreview()">Close</button>
                    <button class="btn btn-primary" onclick="downloadContractFromPreview('${title.toLowerCase().replace(/\s+/g, '-')}')">
                    <i class="fas fa-download"></i>
                        Download Full Document
                </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    document.getElementById('contractPreviewModal').style.display = 'flex';
}

// Close contract preview modal
function closeContractPreview() {
    const modal = document.getElementById('contractPreviewModal');
    if (modal) {
        modal.remove();
    }
}

// Download contract from preview modal
function downloadContractFromPreview(contractType) {
    closeContractPreview();
    downloadContract(contractType);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Payment filtering functionality
function filterPayments() {
    const yearFilter = document.getElementById('yearFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    // In a real application, this would filter the payment schedule
    // For now, we'll just show a notification
    showNotification(`Filtering payments for ${yearFilter} with status: ${statusFilter}`, 'info');
}

// View receipt functionality
function viewReceipt(paymentNumber) {
    showNotification(`Viewing receipt for payment #${paymentNumber}`, 'info');
    // In a real application, this would open a receipt modal or redirect to receipt page
}

// Make payment functionality
function makePayment(paymentNumber) {
    showNotification(`Redirecting to payment gateway for payment #${paymentNumber}`, 'info');
    // In a real application, this would redirect to a payment gateway
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set default active tab
    switchTab('agreement-details');
    
    // Add any additional initialization logic here
    console.log('Reservation Agreements page initialized');
}); 