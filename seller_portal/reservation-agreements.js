// Reservation Agreements Page JavaScript

// Sample reservation agreements data
const reservationAgreements = [
    {
        id: 1,
        customerName: "John Doe",
        customerEmail: "john.doe@email.com",
        customerPhone: "+63 912 345 6789",
        propertyName: "Modern 2BR Condo",
        propertyPrice: 2500000,
        propertyLocation: "Makati City",
        agreementDate: "2024-01-15",
        totalAmount: 2500000,
        paymentTerms: "20 years, Monthly",
        status: "active",
        paymentSchedule: [
            { number: 1, dueDate: "2024-02-15", amount: 125000, status: "paid", paymentDate: "2024-02-10" },
            { number: 2, dueDate: "2024-03-15", amount: 125000, status: "paid", paymentDate: "2024-03-12" },
            { number: 3, dueDate: "2024-04-15", amount: 125000, status: "paid", paymentDate: "2024-04-14" },
            { number: 4, dueDate: "2024-05-15", amount: 125000, status: "pending", paymentDate: null },
            { number: 5, dueDate: "2024-06-15", amount: 125000, status: "pending", paymentDate: null }
        ]
    },
    {
        id: 2,
        customerName: "Jane Smith",
        customerEmail: "jane.smith@email.com",
        customerPhone: "+63 923 456 7890",
        propertyName: "Family House",
        propertyPrice: 4500000,
        propertyLocation: "Quezon City",
        agreementDate: "2024-01-10",
        totalAmount: 4500000,
        paymentTerms: "25 years, Quarterly",
        status: "active",
        paymentSchedule: [
            { number: 1, dueDate: "2024-04-10", amount: 450000, status: "paid", paymentDate: "2024-04-05" },
            { number: 2, dueDate: "2024-07-10", amount: 450000, status: "pending", paymentDate: null },
            { number: 3, dueDate: "2024-10-10", amount: 450000, status: "pending", paymentDate: null },
            { number: 4, dueDate: "2025-01-10", amount: 450000, status: "pending", paymentDate: null }
        ]
    },
    {
        id: 3,
        customerName: "Sarah Wilson",
        customerEmail: "sarah.wilson@email.com",
        customerPhone: "+63 945 678 9012",
        propertyName: "Luxury Penthouse",
        propertyPrice: 8500000,
        propertyLocation: "Bonifacio Global City",
        agreementDate: "2024-01-05",
        totalAmount: 8500000,
        paymentTerms: "30 years, Monthly",
        status: "active",
        paymentSchedule: [
            { number: 1, dueDate: "2024-02-05", amount: 283333, status: "paid", paymentDate: "2024-02-01" },
            { number: 2, dueDate: "2024-03-05", amount: 283333, status: "paid", paymentDate: "2024-03-03" },
            { number: 3, dueDate: "2024-04-05", amount: 283333, status: "paid", paymentDate: "2024-04-04" },
            { number: 4, dueDate: "2024-05-05", amount: 283333, status: "pending", paymentDate: null },
            { number: 5, dueDate: "2024-06-05", amount: 283333, status: "pending", paymentDate: null }
        ]
    },
    {
        id: 4,
        customerName: "Mike Johnson",
        customerEmail: "mike.johnson@email.com",
        customerPhone: "+63 934 567 8901",
        propertyName: "Townhouse Unit",
        propertyPrice: 3200000,
        propertyLocation: "Taguig City",
        agreementDate: "2024-01-20",
        totalAmount: 3200000,
        paymentTerms: "15 years, Monthly",
        status: "completed",
        paymentSchedule: [
            { number: 1, dueDate: "2024-02-20", amount: 213333, status: "paid", paymentDate: "2024-02-18" },
            { number: 2, dueDate: "2024-03-20", amount: 213333, status: "paid", paymentDate: "2024-03-19" },
            { number: 3, dueDate: "2024-04-20", amount: 213333, status: "paid", paymentDate: "2024-04-20" }
        ]
    }
];

// DOM Elements
const agreementsList = document.getElementById('agreementsList');
const statusFilter = document.getElementById('statusFilter');
const agreementModal = document.getElementById('agreementModal');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Reservation agreements page loaded');
    console.log('Sample agreements:', reservationAgreements.length);
    console.log('Agreements list:', agreementsList);
    displayAgreements(reservationAgreements);
    setupEventListeners();
    injectAgreementsStyles();
});

// Setup event listeners
function setupEventListeners() {
    // Filter button
    document.querySelector('.filter-btn').addEventListener('click', filterAgreements);
    
    // Modal close
    const closeModalBtn = document.querySelector('.close');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === agreementModal) {
            closeModal();
        }
    });
}

// Display agreements in list format
function displayAgreements(agreementsToShow) {
    if (!agreementsList) {
        console.error('Agreements list element not found');
        return;
    }
    
    console.log('Displaying agreements:', agreementsToShow.length);
    
    if (agreementsToShow.length === 0) {
        agreementsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-contract"></i>
                <h3>No agreements found</h3>
                <p>No reservation agreements match your current filters.</p>
            </div>
        `;
        return;
    }
    
    agreementsList.innerHTML = agreementsToShow.map(agreement => createAgreementListItem(agreement)).join('');
}

// Create agreement list item
function createAgreementListItem(agreement) {
    const nextPayment = getNextPayment(agreement);
    const paidPayments = agreement.paymentSchedule.filter(payment => payment.status === 'paid').length;
    const totalPayments = agreement.paymentSchedule.length;
    
    return `
        <div class="agreement-item" onclick="viewAgreementDetails(${agreement.id})">
        <div class="agreement-header">
                <div class="agreement-customer">
                    <div class="customer-avatar">
                        ${agreement.customerName.split(' ').map(name => name[0]).join('')}
                    </div>
                    <div class="customer-info">
                        <h4>${agreement.customerName}</h4>
                        <p>${agreement.customerEmail}</p>
                    </div>
            </div>
            <div class="agreement-status">
                    <span class="status-badge ${agreement.status}">${agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}</span>
            </div>
        </div>
        
        <div class="agreement-details">
                <div class="detail-group">
                    <div class="detail-label">Property</div>
                    <div class="detail-value">${agreement.propertyName}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">Location</div>
                    <div class="detail-value">${agreement.propertyLocation}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">Total Amount</div>
                    <div class="detail-value">₱${agreement.totalAmount.toLocaleString()}</div>
            </div>
                <div class="detail-group">
                    <div class="detail-label">Payment Terms</div>
                    <div class="detail-value">${agreement.paymentTerms}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">Agreement Date</div>
                    <div class="detail-value">${new Date(agreement.agreementDate).toLocaleDateString()}</div>
                </div>
                <div class="detail-group">
                    <div class="detail-label">Progress</div>
                    <div class="detail-value">${paidPayments}/${totalPayments} payments completed</div>
            </div>
                ${nextPayment ? `
                <div class="detail-group">
                    <div class="detail-label">Next Payment</div>
                    <div class="detail-value">₱${nextPayment.amount.toLocaleString()} - ${new Date(nextPayment.dueDate).toLocaleDateString()}</div>
            </div>
                ` : ''}
        </div>
        
        <div class="agreement-actions">
                <button class="action-btn outline" onclick="event.stopPropagation(); printAgreement(${agreement.id})">
                <i class="fas fa-print"></i>
                    Print
            </button>
                <button class="action-btn outline" onclick="event.stopPropagation(); downloadAgreement(${agreement.id})">
                <i class="fas fa-download"></i>
                    Download
                </button>
                <button class="action-btn primary" onclick="event.stopPropagation(); viewAgreementDetails(${agreement.id})">
                    <i class="fas fa-eye"></i>
                    View Details
            </button>
            </div>
        </div>
    `;
}

// Get next payment
function getNextPayment(agreement) {
    const nextPayment = agreement.paymentSchedule.find(p => p.status === 'pending');
    if (nextPayment) {
        return nextPayment;
    }
    return null;
}

// Filter agreements
function filterAgreements() {
    const statusFilterValue = statusFilter.value;
    let filteredAgreements = reservationAgreements;
    
    if (statusFilterValue) {
        filteredAgreements = reservationAgreements.filter(agreement => 
            agreement.status === statusFilterValue
        );
    }
    
    displayAgreements(filteredAgreements);
}

// Close modal
function closeModal() {
    if (agreementModal) {
        agreementModal.style.display = 'none';
    }
}

// View agreement details
function viewAgreementDetails(agreementId) {
    const agreement = reservationAgreements.find(a => a.id === agreementId);
    if (!agreement) {
        console.error('Agreement not found:', agreementId);
        return;
    }
    
    // Populate modal with agreement details
    const modalBody = agreementModal.querySelector('.modal-body');
    modalBody.innerHTML = `
        <div class="agreement-summary">
            <div class="summary-section">
                <h4>Customer Information</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Name:</label>
                        <span>${agreement.customerName}</span>
                    </div>
                    <div class="detail-item">
                        <label>Email:</label>
                        <span>${agreement.customerEmail}</span>
                    </div>
                    <div class="detail-item">
                        <label>Phone:</label>
                        <span>${agreement.customerPhone}</span>
                    </div>
                </div>
            </div>
            
            <div class="summary-section">
                <h4>Property Information</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Property:</label>
                        <span>${agreement.propertyName}</span>
                    </div>
                    <div class="detail-item">
                        <label>Location:</label>
                        <span>${agreement.propertyLocation}</span>
                    </div>
                    <div class="detail-item">
                        <label>Price:</label>
                        <span>₱${agreement.propertyPrice.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            
            <div class="summary-section">
                <h4>Agreement Details</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Agreement Date:</label>
                        <span>${new Date(agreement.agreementDate).toLocaleDateString()}</span>
                    </div>
                    <div class="detail-item">
                        <label>Total Amount:</label>
                        <span>₱${agreement.totalAmount.toLocaleString()}</span>
                    </div>
                    <div class="detail-item">
                        <label>Payment Terms:</label>
                        <span>${agreement.paymentTerms}</span>
                    </div>
                    <div class="detail-item">
                        <label>Status:</label>
                        <span class="status-badge ${agreement.status}">${agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}</span>
                    </div>
                </div>
            </div>
            
            <div class="summary-section">
                <h4>Payment Schedule</h4>
                <div class="payment-schedule">
                    ${displayPaymentSchedule(agreement.paymentSchedule)}
                </div>
            </div>
        </div>
    `;
    
    agreementModal.style.display = 'block';
}

// Display payment schedule
function displayPaymentSchedule(schedule) {
    const scheduleTableBody = document.getElementById('scheduleTableBody');
    
    scheduleTableBody.innerHTML = schedule.map(payment => `
        <tr class="${payment.status}">
            <td>${payment.number}</td>
            <td>${formatDate(payment.dueDate)}</td>
            <td>${formatCurrency(payment.amount)}</td>
            <td>
                <span class="payment-status ${payment.status}">
                    ${payment.status}
                </span>
            </td>
            <td>${payment.paymentDate ? formatDate(payment.paymentDate) : '-'}</td>
        </tr>
    `).join('');
}

// Print agreement
function printAgreement(agreementId) {
    const agreement = reservationAgreements.find(ag => ag.id === agreementId);
    if (!agreement) return;
    
    // Create print content
    const printContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1>Reservation Agreement</h1>
            <h2>Customer Information</h2>
            <p><strong>Name:</strong> ${agreement.customerName}</p>
            <p><strong>Email:</strong> ${agreement.customerEmail}</p>
            <p><strong>Phone:</strong> ${agreement.customerPhone}</p>
            
            <h2>Property Information</h2>
            <p><strong>Property:</strong> ${agreement.propertyName}</p>
            <p><strong>Price:</strong> ${formatCurrency(agreement.propertyPrice)}</p>
            <p><strong>Location:</strong> ${agreement.propertyLocation}</p>
            
            <h2>Agreement Details</h2>
            <p><strong>Agreement Date:</strong> ${formatDate(agreement.agreementDate)}</p>
            <p><strong>Total Amount:</strong> ${formatCurrency(agreement.totalAmount)}</p>
            <p><strong>Payment Terms:</strong> ${agreement.paymentTerms}</p>
            
            <h2>Payment Schedule</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th style="border: 1px solid #ddd; padding: 8px;">Payment #</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Due Date</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Amount</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${agreement.paymentSchedule.map(payment => `
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">${payment.number}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${formatDate(payment.dueDate)}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${formatCurrency(payment.amount)}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${payment.status}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
    
    showNotification('Print dialog opened', 'info');
}

// Download agreement
function downloadAgreement(agreementId) {
    const agreement = reservationAgreements.find(ag => ag.id === agreementId);
    if (!agreement) return;
    
    // In a real app, this would generate a PDF
    console.log('Downloading agreement:', agreement);
    showNotification('PDF download would be implemented with a library like jsPDF', 'info');
}

// Export agreements
function exportAgreements() {
    const filteredAgreements = getFilteredAgreements();
    
    // Create CSV content
    let csvContent = "Customer Name,Email,Property,Price,Agreement Date,Payment Terms,Status\n";
    
    filteredAgreements.forEach(agreement => {
        csvContent += `"${agreement.customerName}","${agreement.customerEmail}","${agreement.propertyName}","${agreement.propertyPrice}","${agreement.agreementDate}","${agreement.paymentTerms}","${agreement.status}"\n`;
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reservation_agreements.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification('Agreements exported successfully!', 'success');
}

// Get filtered agreements
function getFilteredAgreements() {
    const statusFilterValue = statusFilter.value;
    
    let filteredAgreements = reservationAgreements;
    
    if (statusFilterValue) {
        filteredAgreements = filteredAgreements.filter(agreement => agreement.status === statusFilterValue);
    }
    
    return filteredAgreements;
}

// Add CSS for reservation agreements
const additionalStyles = `
    .reservation-agreements-page {
        padding: 0;
    }
    
    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }
    
    .header-actions {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    
    .filters {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    
    .filter-select {
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 6px;
        background: white;
    }
    
    .filter-btn {
        padding: 0.5rem 1rem;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .agreements-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 1.5rem;
    }
    
    .agreement-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .agreement-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(0,0,0,0.12);
    }
    
    .agreement-card.active {
        border-left: 4px solid #28a745;
    }
    
    .agreement-card.completed {
        border-left: 4px solid #007bff;
    }
    
    .agreement-card.cancelled {
        border-left: 4px solid #dc3545;
    }
    
    .agreement-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
    }
    
    .agreement-info h3 {
        margin: 0 0 0.5rem 0;
        color: #333;
        font-size: 1.1rem;
    }
    
    .property-name {
        color: #666;
        font-size: 0.9rem;
        margin: 0 0 0.25rem 0;
    }
    
    .agreement-date {
        color: #999;
        font-size: 0.8rem;
        margin: 0;
    }
    
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .status-badge.active {
        background: #d4edda;
        color: #155724;
    }
    
    .status-badge.completed {
        background: #cce5ff;
        color: #004085;
    }
    
    .status-badge.cancelled {
        background: #f8d7da;
        color: #721c24;
    }
    
    .agreement-details {
        margin-bottom: 1rem;
    }
    
    .detail-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .detail-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .detail-item label {
        font-weight: 500;
        color: #666;
        font-size: 0.9rem;
    }
    
    .detail-item span {
        color: #333;
        font-weight: 500;
    }
    
    .payment-progress {
        margin-bottom: 1rem;
    }
    
    .progress-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        color: #666;
    }
    
    .progress-bar {
        width: 100%;
        height: 8px;
        background: #f0f0f0;
        border-radius: 4px;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        transition: width 0.3s ease;
    }
    
    .next-payment {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        background: #f8f9fa;
        border-radius: 6px;
        font-size: 0.9rem;
    }
    
    .next-payment label {
        font-weight: 500;
        color: #666;
    }
    
    .next-payment span {
        color: #333;
        font-weight: 500;
    }
    
    .agreement-actions {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
    }
    
    .btn-icon {
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        background: #f8f9fa;
        color: #666;
    }
    
    .btn-icon:hover {
        background: #667eea;
        color: white;
    }
    
    .no-agreements {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        color: #666;
    }
    
    .no-agreements i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #ddd;
    }
    
    .no-agreements h3 {
        margin: 0 0 0.5rem 0;
        color: #333;
    }
    
    .no-agreements p {
        margin: 0;
        color: #666;
    }
    
    /* Modal Styles */
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
    }
    
    .modal-content {
        background-color: white;
        margin: 5% auto;
        padding: 0;
        border-radius: 12px;
        width: 90%;
        max-width: 1000px;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    .modal-header {
        padding: 1.5rem;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h3 {
        margin: 0;
        color: #333;
    }
    
    .close {
        color: #aaa;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
    }
    
    .close:hover {
        color: #333;
    }
    
    .modal-body {
        padding: 1.5rem;
    }
    
    .agreement-summary {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin-bottom: 2rem;
    }
    
    .summary-section h4 {
        margin: 0 0 1rem 0;
        color: #333;
        font-size: 1.1rem;
        font-weight: 600;
    }
    
    .summary-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    
    .summary-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .summary-item label {
        font-weight: 500;
        color: #666;
        font-size: 0.9rem;
    }
    
    .summary-item span {
        color: #333;
        font-weight: 500;
    }
    
    .payment-schedule h4 {
        margin: 0 0 1rem 0;
        color: #333;
        font-size: 1.1rem;
        font-weight: 600;
    }
    
    .schedule-table-container {
        background: #f8f9fa;
        border-radius: 8px;
        overflow: hidden;
    }
    
    .schedule-table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .schedule-table th,
    .schedule-table td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid #eee;
    }
    
    .schedule-table th {
        background: #e9ecef;
        font-weight: 600;
        color: #333;
    }
    
    .schedule-table tr.paid {
        background: #d4edda;
    }
    
    .schedule-table tr.pending {
        background: #fff3cd;
    }
    
    .payment-status {
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .payment-status.paid {
        background: #28a745;
        color: white;
    }
    
    .payment-status.pending {
        background: #ffc107;
        color: #212529;
    }
    
    .agreement-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid #eee;
    }
    
    .btn-primary,
    .btn-secondary {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
    }
    
    .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }
    
    .btn-secondary {
        background: #f8f9fa;
        color: #666;
        border: 1px solid #ddd;
    }
    
    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    
    .btn-secondary:hover {
        background: #e9ecef;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .page-header {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
        }
        
        .header-actions {
            justify-content: center;
        }
        
        .filters {
            justify-content: center;
        }
        
        .agreements-grid {
            grid-template-columns: 1fr;
        }
        
        .detail-row {
            grid-template-columns: 1fr;
        }
        
        .summary-grid {
            grid-template-columns: 1fr;
        }
        
        .modal-content {
            width: 95%;
            margin: 10% auto;
        }
        
        .schedule-table {
            font-size: 0.9rem;
        }
        
        .schedule-table th,
        .schedule-table td {
            padding: 0.5rem;
        }
    }
`;

// Inject agreements-specific styles
function injectAgreementsStyles() {
    // Add styles to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
} 