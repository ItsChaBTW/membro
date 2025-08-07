// Reservation Agreements Page JavaScript

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Reservation Agreements page loaded');
    initializeAgreements();
    setupEventListeners();
});

function initializeAgreements() {
    // Load payment schedule
    loadPaymentSchedule();
    
    // Setup filters
    setupFilters();
}

function setupEventListeners() {
    // Filter change events are handled by HTML onchange attributes
    console.log('Agreement event listeners setup complete');
}

function loadPaymentSchedule() {
    // This would typically load from an API
    console.log('Payment schedule loaded');
}

function filterPayments() {
    const yearFilter = document.getElementById('yearFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    const rows = document.querySelectorAll('.table-row');
    
    rows.forEach(row => {
        let showRow = true;
        
        // Year filter logic would go here
        if (yearFilter && yearFilter !== 'all') {
            // Implementation for year filtering
        }
        
        // Status filter logic
        if (statusFilter && statusFilter !== 'all') {
            const statusBadge = row.querySelector('.status-badge');
            if (statusBadge) {
                const rowStatus = statusBadge.textContent.toLowerCase();
                showRow = showRow && (
                    (statusFilter === 'paid' && rowStatus === 'paid') ||
                    (statusFilter === 'pending' && (rowStatus === 'pending' || rowStatus === 'future')) ||
                    (statusFilter === 'overdue' && rowStatus === 'overdue')
                );
            }
        }
        
        row.style.display = showRow ? 'grid' : 'none';
    });
    
    console.log('Payment filters applied - Year:', yearFilter, 'Status:', statusFilter);
}

function setupFilters() {
    // Initialize filter dropdowns
    const yearFilter = document.getElementById('yearFilter');
    const statusFilter = document.getElementById('statusFilter');
    
    if (yearFilter) {
        yearFilter.addEventListener('change', filterPayments);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterPayments);
    }
}

function viewReceipt(paymentNumber) {
    console.log('Viewing receipt for payment:', paymentNumber);
    
    // Sample receipt data
    const receiptData = {
        paymentNumber: paymentNumber,
        amount: '₱125,000.00',
        date: 'March 13, 2024',
        method: 'Credit Card',
        reference: 'PAY-2024-' + paymentNumber,
        property: 'Modern 2BR Condo',
        customer: 'John Doe'
    };
    
    const receiptContent = `
        <div class="receipt-view">
            <div class="receipt-header">
                <h3>Payment Receipt</h3>
                <p>Payment #${receiptData.paymentNumber}</p>
            </div>
            
            <div class="receipt-details">
                <div class="receipt-row">
                    <span class="receipt-label">Reference Number:</span>
                    <span class="receipt-value">${receiptData.reference}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Amount Paid:</span>
                    <span class="receipt-value">${receiptData.amount}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Payment Date:</span>
                    <span class="receipt-value">${receiptData.date}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Payment Method:</span>
                    <span class="receipt-value">${receiptData.method}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Property:</span>
                    <span class="receipt-value">${receiptData.property}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Customer:</span>
                    <span class="receipt-value">${receiptData.customer}</span>
                </div>
            </div>
            
            <div class="receipt-actions">
                <button class="btn btn-outline" onclick="downloadReceipt('${paymentNumber}')">
                    <i class="fas fa-download"></i>
                    Download PDF
                </button>
                <button class="btn btn-primary" onclick="printReceipt('${paymentNumber}')">
                    <i class="fas fa-print"></i>
                    Print Receipt
                </button>
            </div>
        </div>
    `;
    
    // Show receipt modal
    const modal = document.getElementById('receiptModal');
    const modalTitle = document.getElementById('receiptModalTitle');
    const modalDetails = document.getElementById('receiptDetails');
    
    if (modalTitle) modalTitle.textContent = `Payment Receipt #${paymentNumber}`;
    if (modalDetails) modalDetails.innerHTML = receiptContent;
    
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeReceiptModal() {
    const modal = document.getElementById('receiptModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function makePayment(paymentNumber) {
    console.log('Redirecting to payment for:', paymentNumber);
    // Redirect to payments page with payment number
    window.location.href = `payments.html?payment=${paymentNumber}`;
}

function downloadAgreement() {
    console.log('Downloading agreement PDF');
    
    // Show loading notification
    if (typeof showNotification === 'function') {
        showNotification('Preparing agreement download...', 'info');
    }
    
    // Simulate download
    setTimeout(() => {
        // In a real application, this would generate and download the actual PDF
        const link = document.createElement('a');
        link.href = '#'; // Would be actual PDF URL
        link.download = 'Reservation_Agreement_JohnDoe.pdf';
        
        if (typeof showNotification === 'function') {
            showNotification('Agreement downloaded successfully!', 'success');
        }
    }, 1500);
}

function downloadReceipt(paymentNumber) {
    console.log('Downloading receipt for payment:', paymentNumber);
    
    // Show loading notification
    if (typeof showNotification === 'function') {
        showNotification('Preparing receipt download...', 'info');
    }
    
    // Simulate download
    setTimeout(() => {
        if (typeof showNotification === 'function') {
            showNotification('Receipt downloaded successfully!', 'success');
        }
    }, 1000);
}

function printReceipt(paymentNumber) {
    console.log('Printing receipt for payment:', paymentNumber);
    
    // In a real application, this would open a print-friendly version
    window.print();
}

// Inject additional styles for agreements page
function injectAgreementsStyles() {
    const styles = `
        <style>
        .receipt-view {
            padding: 1rem 0;
        }
        
        .receipt-header {
            text-align: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid var(--border-color);
        }
        
        .receipt-header h3 {
            margin: 0 0 0.5rem 0;
            color: var(--text-primary);
            font-size: 1.5rem;
        }
        
        .receipt-header p {
            margin: 0;
            color: var(--text-secondary);
            font-size: 0.875rem;
        }
        
        .receipt-details {
            background: var(--bg-secondary);
            border-radius: var(--radius-md);
            padding: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .receipt-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 0;
            border-bottom: 1px solid var(--border-color);
        }
        
        .receipt-row:last-child {
            border-bottom: none;
        }
        
        .receipt-label {
            font-size: 0.875rem;
            color: var(--text-secondary);
            font-weight: 500;
        }
        
        .receipt-value {
            font-size: 0.875rem;
            color: var(--text-primary);
            font-weight: 600;
        }
        
        .receipt-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        
        @media (max-width: 768px) {
            .receipt-actions {
                flex-direction: column;
            }
            
            .receipt-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.25rem;
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Call the function to inject styles
injectAgreementsStyles(); 