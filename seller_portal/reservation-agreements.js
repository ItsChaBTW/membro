// Reservation Agreements Page JavaScript

// Sample reservation agreements data with enhanced fields
const reservationAgreements = [
    {
        id: 1,
        opportunityId: 1,
        opportunityName: "Modern 2BR Condo - John Doe",
        customerName: "John Doe",
        customerEmail: "john.doe@email.com",
        customerPhone: "+63 912 345 6789",
        propertyName: "Modern 2BR Condo",
        propertyPrice: 2500000,
        propertyLocation: "Makati City",
        agreementDate: "2024-01-15",
        totalAmount: 2500000,
        paymentTerms: "15 years, Monthly",
        status: "active",
        downpaymentSchedule: [
            { number: 1, dueDate: "2024-02-15", amount: 125000, description: "Reservation Fee", status: "paid", paymentDate: "2024-02-10" },
            { number: 2, dueDate: "2024-03-15", amount: 125000, description: "1st Monthly DP", status: "paid", paymentDate: "2024-03-12" },
            { number: 3, dueDate: "2024-04-15", amount: 125000, description: "2nd Monthly DP", status: "paid", paymentDate: "2024-04-14" },
            { number: 4, dueDate: "2024-05-15", amount: 125000, description: "3rd Monthly DP", status: "pending", paymentDate: null },
            { number: 5, dueDate: "2024-06-15", amount: 125000, description: "4th Monthly DP", status: "pending", paymentDate: null }
        ],
        amortizationSchedule: [
            { number: 1, dueDate: "2024-07-15", amount: 18500, principal: 12000, interest: 6500, balance: 1875000, status: "pending" },
            { number: 2, dueDate: "2024-08-15", amount: 18500, principal: 12050, interest: 6450, balance: 1862950, status: "pending" },
            { number: 3, dueDate: "2024-09-15", amount: 18500, principal: 12100, interest: 6400, balance: 1850850, status: "pending" },
            { number: 4, dueDate: "2024-10-15", amount: 18500, principal: 12150, interest: 6350, balance: 1838700, status: "pending" },
            { number: 5, dueDate: "2024-11-15", amount: 18500, principal: 12200, interest: 6300, balance: 1826500, status: "pending" }
        ]
    },
    {
        id: 2,
        opportunityId: 2,
        opportunityName: "Family House - Jane Smith",
        customerName: "Jane Smith",
        customerEmail: "jane.smith@email.com",
        customerPhone: "+63 923 456 7890",
        propertyName: "Family House",
        propertyPrice: 4500000,
        propertyLocation: "Quezon City",
        agreementDate: "2024-01-10",
        totalAmount: 4500000,
        paymentTerms: "20 years, Monthly",
        status: "active",
        downpaymentSchedule: [
            { number: 1, dueDate: "2024-02-10", amount: 225000, description: "Reservation Fee", status: "paid", paymentDate: "2024-02-05" },
            { number: 2, dueDate: "2024-03-10", amount: 225000, description: "1st Monthly DP", status: "paid", paymentDate: "2024-03-08" },
            { number: 3, dueDate: "2024-04-10", amount: 225000, description: "2nd Monthly DP", status: "paid", paymentDate: "2024-04-09" },
            { number: 4, dueDate: "2024-05-10", amount: 225000, description: "3rd Monthly DP", status: "paid", paymentDate: "2024-05-08" },
            { number: 5, dueDate: "2024-06-10", amount: 225000, description: "4th Monthly DP", status: "pending", paymentDate: null }
        ],
        amortizationSchedule: [
            { number: 1, dueDate: "2024-07-10", amount: 29500, principal: 15000, interest: 14500, balance: 3375000, status: "pending" },
            { number: 2, dueDate: "2024-08-10", amount: 29500, principal: 15075, interest: 14425, balance: 3359925, status: "pending" },
            { number: 3, dueDate: "2024-09-10", amount: 29500, principal: 15150, interest: 14350, balance: 3344775, status: "pending" },
            { number: 4, dueDate: "2024-10-10", amount: 29500, principal: 15225, interest: 14275, balance: 3329550, status: "pending" },
            { number: 5, dueDate: "2024-11-10", amount: 29500, principal: 15300, interest: 14200, balance: 3314250, status: "pending" }
        ]
    },
    {
        id: 3,
        opportunityId: 4,
        opportunityName: "Luxury Penthouse - Sarah Wilson",
        customerName: "Sarah Wilson",
        customerEmail: "sarah.wilson@email.com",
        customerPhone: "+63 945 678 9012",
        propertyName: "Luxury Penthouse",
        propertyPrice: 8500000,
        propertyLocation: "Bonifacio Global City",
        agreementDate: "2024-01-05",
        totalAmount: 8500000,
        paymentTerms: "10 years, Monthly",
        status: "active",
        downpaymentSchedule: [
            { number: 1, dueDate: "2024-02-05", amount: 425000, description: "Reservation Fee", status: "paid", paymentDate: "2024-02-01" },
            { number: 2, dueDate: "2024-03-05", amount: 425000, description: "1st Monthly DP", status: "paid", paymentDate: "2024-03-03" },
            { number: 3, dueDate: "2024-04-05", amount: 425000, description: "2nd Monthly DP", status: "paid", paymentDate: "2024-04-04" },
            { number: 4, dueDate: "2024-05-05", amount: 425000, description: "3rd Monthly DP", status: "paid", paymentDate: "2024-05-03" },
            { number: 5, dueDate: "2024-06-05", amount: 425000, description: "4th Monthly DP", status: "paid", paymentDate: "2024-06-02" },
            { number: 6, dueDate: "2024-07-05", amount: 425000, description: "5th Monthly DP", status: "pending", paymentDate: null }
        ],
        amortizationSchedule: [
            { number: 1, dueDate: "2024-08-05", amount: 65000, principal: 32000, interest: 33000, balance: 5525000, status: "pending" },
            { number: 2, dueDate: "2024-09-05", amount: 65000, principal: 32150, interest: 32850, balance: 5492850, status: "pending" },
            { number: 3, dueDate: "2024-10-05", amount: 65000, principal: 32300, interest: 32700, balance: 5460550, status: "pending" },
            { number: 4, dueDate: "2024-11-05", amount: 65000, principal: 32450, interest: 32550, balance: 5428100, status: "pending" },
            { number: 5, dueDate: "2024-12-05", amount: 65000, principal: 32600, interest: 32400, balance: 5395500, status: "pending" }
        ]
    },
    {
        id: 4,
        opportunityId: 3,
        opportunityName: "Townhouse Unit - Mike Johnson",
        customerName: "Mike Johnson",
        customerEmail: "mike.johnson@email.com",
        customerPhone: "+63 934 567 8901",
        propertyName: "Townhouse Unit",
        propertyPrice: 3200000,
        propertyLocation: "Taguig City",
        agreementDate: "2024-01-20",
        totalAmount: 3200000,
        paymentTerms: "25 years, Monthly",
        status: "completed",
        downpaymentSchedule: [
            { number: 1, dueDate: "2024-02-20", amount: 160000, description: "Reservation Fee", status: "paid", paymentDate: "2024-02-18" },
            { number: 2, dueDate: "2024-03-20", amount: 160000, description: "1st Monthly DP", status: "paid", paymentDate: "2024-03-19" },
            { number: 3, dueDate: "2024-04-20", amount: 160000, description: "Final DP", status: "paid", paymentDate: "2024-04-20" }
        ],
        amortizationSchedule: [
            { number: 1, dueDate: "2024-05-20", amount: 22000, principal: 8000, interest: 14000, balance: 2720000, status: "pending" },
            { number: 2, dueDate: "2024-06-20", amount: 22000, principal: 8050, interest: 13950, balance: 2711950, status: "pending" },
            { number: 3, dueDate: "2024-07-20", amount: 22000, principal: 8100, interest: 13900, balance: 2703850, status: "pending" }
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
    const paidPayments = agreement.downpaymentSchedule.filter(payment => payment.status === 'paid').length;
    const totalPayments = agreement.downpaymentSchedule.length;
    
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
                        <p class="opportunity-link">
                            <i class="fas fa-link"></i>
                            Opportunity: ${agreement.opportunityName}
                        </p>
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
                    <div class="detail-label">DP Progress</div>
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
                <button class="action-btn outline" onclick="event.stopPropagation(); viewOpportunity(${agreement.opportunityId})">
                    <i class="fas fa-external-link-alt"></i>
                    View Opportunity
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

// Get next payment from downpayment schedule
function getNextPayment(agreement) {
    const nextPayment = agreement.downpaymentSchedule.find(p => p.status === 'pending');
    if (nextPayment) {
        return nextPayment;
    }
    // If downpayment is complete, check amortization schedule
    const nextAmortization = agreement.amortizationSchedule.find(p => p.status === 'pending');
    return nextAmortization || null;
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
    // Navigate to the agreement details page
    window.location.href = `agreement-details.html?id=${agreementId}`;
}

// Display downpayment schedule
function displayDownpaymentSchedule(schedule) {
    const tableBody = document.getElementById('downpaymentTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = schedule.map(payment => `
        <tr class="${payment.status}">
            <td>${payment.number}</td>
            <td>${formatDate(payment.dueDate)}</td>
            <td>${payment.description}</td>
            <td>${formatCurrency(payment.amount)}</td>
            <td>
                <span class="payment-status ${payment.status}">
                    ${payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
            </td>
            <td>${payment.paymentDate ? formatDate(payment.paymentDate) : '-'}</td>
        </tr>
    `).join('');
}

// Display amortization schedule
function displayAmortizationSchedule(schedule) {
    const tableBody = document.getElementById('amortizationTableBody');
    if (!tableBody) return;
    
    // Show only first 12 months or all if less than 12
    const displaySchedule = schedule.slice(0, 12);
    
    tableBody.innerHTML = displaySchedule.map(payment => `
        <tr class="${payment.status}">
            <td>${payment.number}</td>
            <td>${formatDate(payment.dueDate)}</td>
            <td>${formatCurrency(payment.amount)}</td>
            <td>${formatCurrency(payment.principal)}</td>
            <td>${formatCurrency(payment.interest)}</td>
            <td>${formatCurrency(payment.balance)}</td>
            <td>
                <span class="payment-status ${payment.status}">
                    ${payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
            </td>
        </tr>
    `).join('');
}

// View related opportunity
function viewOpportunity(opportunityId) {
    if (opportunityId) {
        // In a real application, this would navigate to the opportunities page
        // and open the specific opportunity
        window.location.href = `opportunities.html?id=${opportunityId}`;
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
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
        background: #B91C1C;
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
    
    .opportunity-link {
        color: #B91C1C !important;
        font-size: 0.85rem;
        margin: 0.25rem 0 0 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
    }
    
    .opportunity-link i {
        font-size: 0.75rem;
    }
    
    .payment-sections {
        margin-top: 2rem;
    }
    
    .payment-section {
        margin-bottom: 2rem;
    }
    
    .payment-section h4 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0 0 1rem 0;
        color: #333;
        font-size: 1.1rem;
        font-weight: 600;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #B91C1C;
    }
    
    .payment-section h4 i {
        color: #B91C1C;
    }
    
    .schedule-table-container {
        background: #f8f9fa;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .schedule-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
    }
    
    .schedule-table th,
    .schedule-table td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid #dee2e6;
    }
    
    .schedule-table th {
        background: #B91C1C;
        color: white;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.8rem;
        letter-spacing: 0.5px;
    }
    
    .schedule-table tbody tr:hover {
        background: #f1f3f5;
    }
    
    .schedule-table tr.paid {
        background: rgba(40, 167, 69, 0.1);
    }
    
    .schedule-table tr.pending {
        background: rgba(255, 193, 7, 0.1);
    }
    
    .payment-status {
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .payment-status.paid {
        background: #28a745;
        color: white;
    }
    
    .payment-status.pending {
        background: #ffc107;
        color: #212529;
    }
    
    .payment-status.overdue {
        background: #dc3545;
        color: white;
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
    
    /* Enhanced agreement actions */
    .agreement-actions {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
        flex-wrap: wrap;
    }
    
    .action-btn {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.85rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
        text-decoration: none;
    }
    
    .action-btn.outline {
        background: #f8f9fa;
        color: #666;
        border: 1px solid #dee2e6;
    }
    
    .action-btn.outline:hover {
        background: #e9ecef;
        border-color: #adb5bd;
    }
    
    .action-btn.primary {
        background: #B91C1C;
        color: white;
    }
    
    .action-btn.primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
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