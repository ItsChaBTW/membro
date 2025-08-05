// Agreement Details Page JavaScript

// Import reservation agreements data
// In a real application, this would be fetched from an API
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
            { 
                seq: 1, 
                dateDue: "2024-02-15", 
                amount: 125000, 
                checkNumber: "CHK001", 
                chequeDate: "2024-02-10", 
                chequeStatus: "Cleared", 
                datePaid: "2024-02-10", 
                amountPaid: 125000, 
                refNumber: "REF001", 
                orNumber: "OR001", 
                penalty: 0, 
                paymentStatus: "Paid", 
                bcConfirmationDate: "2024-02-11" 
            },
            { 
                seq: 2, 
                dateDue: "2024-03-15", 
                amount: 125000, 
                checkNumber: "CHK002", 
                chequeDate: "2024-03-12", 
                chequeStatus: "Cleared", 
                datePaid: "2024-03-12", 
                amountPaid: 125000, 
                refNumber: "REF002", 
                orNumber: "OR002", 
                penalty: 0, 
                paymentStatus: "Paid", 
                bcConfirmationDate: "2024-03-13" 
            },
            { 
                seq: 3, 
                dateDue: "2024-04-15", 
                amount: 125000, 
                checkNumber: "CHK003", 
                chequeDate: "2024-04-14", 
                chequeStatus: "Cleared", 
                datePaid: "2024-04-14", 
                amountPaid: 125000, 
                refNumber: "REF003", 
                orNumber: "OR003", 
                penalty: 0, 
                paymentStatus: "Paid", 
                bcConfirmationDate: "2024-04-15" 
            },
            { 
                seq: 4, 
                dateDue: "2024-05-15", 
                amount: 125000, 
                checkNumber: "", 
                chequeDate: "", 
                chequeStatus: "", 
                datePaid: "", 
                amountPaid: 0, 
                refNumber: "", 
                orNumber: "", 
                penalty: 0, 
                paymentStatus: "Pending", 
                bcConfirmationDate: "" 
            },
            { 
                seq: 5, 
                dateDue: "2024-06-15", 
                amount: 125000, 
                checkNumber: "", 
                chequeDate: "", 
                chequeStatus: "", 
                datePaid: "", 
                amountPaid: 0, 
                refNumber: "", 
                orNumber: "", 
                penalty: 0, 
                paymentStatus: "Pending", 
                bcConfirmationDate: "" 
            },
            { 
                seq: 6, 
                dateDue: "2024-11-01", 
                amount: 216000, 
                checkNumber: "", 
                chequeDate: "", 
                chequeStatus: "", 
                datePaid: "", 
                amountPaid: 0, 
                refNumber: "", 
                orNumber: "", 
                penalty: 0, 
                paymentStatus: "Pending", 
                bcConfirmationDate: "" 
            }
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
            { 
                seq: 1, 
                dateDue: "2024-02-10", 
                amount: 225000, 
                checkNumber: "CHK101", 
                chequeDate: "2024-02-05", 
                chequeStatus: "Cleared", 
                datePaid: "2024-02-05", 
                amountPaid: 225000, 
                refNumber: "REF101", 
                orNumber: "OR101", 
                penalty: 0, 
                paymentStatus: "Paid", 
                bcConfirmationDate: "2024-02-06" 
            },
            { 
                seq: 2, 
                dateDue: "2024-03-10", 
                amount: 225000, 
                checkNumber: "CHK102", 
                chequeDate: "2024-03-08", 
                chequeStatus: "Cleared", 
                datePaid: "2024-03-08", 
                amountPaid: 225000, 
                refNumber: "REF102", 
                orNumber: "OR102", 
                penalty: 0, 
                paymentStatus: "Paid", 
                bcConfirmationDate: "2024-03-09" 
            },
            { 
                seq: 3, 
                dateDue: "2024-04-10", 
                amount: 225000, 
                checkNumber: "", 
                chequeDate: "", 
                chequeStatus: "", 
                datePaid: "", 
                amountPaid: 0, 
                refNumber: "", 
                orNumber: "", 
                penalty: 0, 
                paymentStatus: "Pending", 
                bcConfirmationDate: "" 
            }
        ],
        amortizationSchedule: [
            { number: 1, dueDate: "2024-05-10", amount: 28500, principal: 18000, interest: 10500, balance: 3825000, status: "pending" },
            { number: 2, dueDate: "2024-06-10", amount: 28500, principal: 18050, interest: 10450, balance: 3806950, status: "pending" },
            { number: 3, dueDate: "2024-07-10", amount: 28500, principal: 18100, interest: 10400, balance: 3788850, status: "pending" }
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

let currentAgreement = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Agreement details page loaded');
    
    // Get agreement ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const agreementId = parseInt(urlParams.get('id'));
    
    if (agreementId) {
        loadAgreementDetails(agreementId);
    } else {
        showError('No agreement ID provided');
        return;
    }
    
    injectAgreementDetailStyles();
    initializePaymentCalculator(); // Initialize the payment calculator
});

// Load agreement details
function loadAgreementDetails(agreementId) {
    currentAgreement = reservationAgreements.find(agreement => agreement.id === agreementId);
    
    if (!currentAgreement) {
        showError('Reservation agreement not found');
        return;
    }
    
    displayAgreementDetails(currentAgreement);
}

// Display agreement details
function displayAgreementDetails(agreement) {
    // Update page title
    document.getElementById('agreementTitle').textContent = `${agreement.propertyName} - ${agreement.customerName}`;
    
    // Update status badge
    document.getElementById('agreementStatus').textContent = agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1);
    document.getElementById('agreementStatus').className = `status-badge ${agreement.status}`;
    
    // Update opportunity information
    document.getElementById('opportunityId').textContent = agreement.opportunityId;
    document.getElementById('opportunityName').textContent = agreement.opportunityName;
    
    // Update customer information
    document.getElementById('customerName').textContent = agreement.customerName;
    document.getElementById('customerEmail').textContent = agreement.customerEmail;
    document.getElementById('customerPhone').textContent = agreement.customerPhone;
    
    // Update property information
    document.getElementById('propertyName').textContent = agreement.propertyName;
    document.getElementById('propertyPrice').textContent = formatCurrency(agreement.propertyPrice);
    document.getElementById('propertyLocation').textContent = agreement.propertyLocation;
    
    // Update agreement details
    document.getElementById('agreementDate').textContent = formatDate(agreement.agreementDate);
    document.getElementById('totalAmount').textContent = formatCurrency(agreement.totalAmount);
    document.getElementById('paymentTerms').textContent = agreement.paymentTerms;
    
    // Display schedules
    displayDownpaymentSchedule(agreement.downpaymentSchedule);
    displayAmortizationSchedule(agreement.amortizationSchedule);
}

// Display downpayment schedule
function displayDownpaymentSchedule(schedule) {
    const tableBody = document.getElementById('downpaymentTableBody');
    
    tableBody.innerHTML = schedule.map(payment => `
        <tr class="payment-row ${payment.paymentStatus ? payment.paymentStatus.toLowerCase() : 'pending'}">
            <td class="select-cell">
                <input type="checkbox" name="paymentSelect" value="${payment.seq}">
            </td>
            <td class="seq-cell">${payment.seq}</td>
            <td class="date-cell">${formatDate(payment.dateDue)}</td>
            <td class="amount-cell">${formatCurrency(payment.amount)}</td>
            <td class="check-number-cell">${payment.checkNumber || '-'}</td>
            <td class="cheque-date-cell">${payment.chequeDate ? formatDate(payment.chequeDate) : '-'}</td>
            <td class="cheque-status-cell">
                <span class="cheque-status ${payment.chequeStatus ? payment.chequeStatus.toLowerCase().replace(' ', '-') : ''}">
                    ${payment.chequeStatus || '-'}
                </span>
            </td>
            <td class="date-paid-cell">${payment.datePaid ? formatDate(payment.datePaid) : '-'}</td>
            <td class="amount-paid-cell">${payment.amountPaid ? formatCurrency(payment.amountPaid) : '-'}</td>
            <td class="ref-number-cell">${payment.refNumber || '-'}</td>
            <td class="or-number-cell">${payment.orNumber || '-'}</td>
            <td class="penalty-cell">${payment.penalty ? formatCurrency(payment.penalty) : '₱0.00'}</td>
            <td class="payment-status-cell">
                <span class="payment-status ${payment.paymentStatus ? payment.paymentStatus.toLowerCase() : 'pending'}">
                    ${payment.paymentStatus || 'Pending'}
                </span>
            </td>
            <td class="bc-confirmation-cell">${payment.bcConfirmationDate ? formatDate(payment.bcConfirmationDate) : '-'}</td>
            <td class="actions-cell">
                <div class="action-buttons">
                    <button class="btn-action edit" onclick="editPayment(${payment.seq})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action delete" onclick="deletePayment(${payment.seq})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Update summary information
    updateScheduleSummary(schedule);
}

// Update schedule summary
function updateScheduleSummary(schedule) {
    const totalRows = schedule.length;
    const totalPaid = schedule.reduce((sum, payment) => {
        return sum + (payment.amountPaid || 0);
    }, 0);
    
    // Get last updated date (most recent payment or BC confirmation)
    let lastUpdatedDate = null;
    schedule.forEach(payment => {
        const dates = [payment.datePaid, payment.bcConfirmationDate].filter(date => date);
        dates.forEach(date => {
            const paymentDate = new Date(date);
            if (!lastUpdatedDate || paymentDate > lastUpdatedDate) {
                lastUpdatedDate = paymentDate;
            }
        });
    });
    
    // Check if DP is completed (all payments have status 'Paid')
    const isCompleted = schedule.every(payment => payment.paymentStatus === 'Paid');
    const dpCompletionDate = isCompleted && lastUpdatedDate ? lastUpdatedDate : null;
    
    // Update DOM elements
    document.getElementById('totalRows').textContent = totalRows;
    document.getElementById('dpTotalPaid').textContent = formatCurrency(totalPaid);
    document.getElementById('lastUpdated').textContent = lastUpdatedDate ? 
        formatDateWithTime(lastUpdatedDate) : '-';
    document.getElementById('dpCompletionDate').textContent = dpCompletionDate ? 
        formatDate(dpCompletionDate) : '-';
}

// Helper function to format date with time
function formatDateWithTime(date) {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    }) + ' ' + d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

// Schedule action functions
function selectAllPayments() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('input[name="paymentSelect"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
}

function refreshSchedule() {
    if (currentAgreement) {
        displayDownpaymentSchedule(currentAgreement.downpaymentSchedule);
        showNotification('Schedule refreshed successfully', 'success');
    }
}

function flowPayments() {
    showNotification('Flow payments feature coming soon', 'info');
}

function runReport() {
    showNotification('Run report feature coming soon', 'info');
}

function exportTemplates() {
    showNotification('Export templates feature coming soon', 'info');
}

function editPayment(seq) {
    showNotification(`Edit payment ${seq} feature coming soon`, 'info');
}

function deletePayment(seq) {
    if (confirm(`Are you sure you want to delete payment ${seq}?`)) {
        showNotification(`Delete payment ${seq} feature coming soon`, 'info');
    }
}

// Show notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Display amortization schedule
function displayAmortizationSchedule(schedule) {
    const tableBody = document.getElementById('amortizationTableBody');
    
    // Show only first 12 months or all if less than 12
    const displaySchedule = schedule.slice(0, 12);
    
    tableBody.innerHTML = displaySchedule.map(payment => `
        <tr class="payment-row ${payment.status}">
            <td class="payment-number">${payment.number}</td>
            <td class="payment-date">${formatDate(payment.dueDate)}</td>
            <td class="payment-amount">${formatCurrency(payment.amount)}</td>
            <td class="payment-amount">${formatCurrency(payment.principal)}</td>
            <td class="payment-amount">${formatCurrency(payment.interest)}</td>
            <td class="payment-amount">${formatCurrency(payment.balance)}</td>
            <td class="payment-status-cell">
                <span class="payment-status ${payment.status}">
                    ${payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
            </td>
        </tr>
    `).join('');
}

// Payment Terms Calculator Functions
function updatePaymentTermFields() {
    const paymentTerm = document.getElementById('calcPaymentTerm').value;
    const dpPercentageField = document.getElementById('calcDPPercentage');
    const noOfSplitsField = document.getElementById('calcNoOfSplits');
    
    // Enable/disable fields based on payment term
    switch(paymentTerm) {
        case 'full_cash':
            dpPercentageField.value = 100;
            dpPercentageField.disabled = true;
            noOfSplitsField.disabled = true;
            break;
        case 'full_dp':
            dpPercentageField.disabled = false;
            noOfSplitsField.value = 1;
            noOfSplitsField.disabled = true;
            break;
        case 'split_dp':
        case 'split_cash':
            dpPercentageField.disabled = false;
            noOfSplitsField.disabled = false;
            break;
        default:
            dpPercentageField.disabled = false;
            noOfSplitsField.disabled = false;
    }
    
    // Recalculate when payment term changes
    calculatePaymentTerms();
}

function calculatePaymentTerms() {
    // Get input values
    const totalSellingPrice = parseFloat(document.getElementById('calcTotalSellingPrice').value) || 0;
    const rf = parseFloat(document.getElementById('calcRF').value) || 0;
    const paymentTerm = document.getElementById('calcPaymentTerm').value;
    const dpPercentage = parseFloat(document.getElementById('calcDPPercentage').value) || 0;
    const noOfSplits = parseInt(document.getElementById('calcNoOfSplits').value) || 1;
    const discountPercent = parseFloat(document.getElementById('calcDiscountPercent').value) || 0;
    const promoDiscount = parseFloat(document.getElementById('calcPromoDiscount').value) || 0;
    const noOfYearsToPay = parseInt(document.getElementById('calcNoOfYearsToPay').value) || 20;
    
    if (totalSellingPrice <= 0) {
        return;
    }
    
    // Calculate total discount
    const totalDiscountPercent = discountPercent + promoDiscount;
    document.getElementById('calcTotalDiscount').value = totalDiscountPercent.toFixed(2);
    
    // Calculate discount amount
    const discountAmount = totalSellingPrice * (totalDiscountPercent / 100);
    
    // Calculate net selling price
    const netSellingPrice = totalSellingPrice - discountAmount;
    
    // Calculate VAT (usually 0 for residential properties in PH)
    const vatAmount = 0;
    const nspWithVAT = netSellingPrice + vatAmount;
    
    // Calculate DP
    const dp = nspWithVAT * (dpPercentage / 100);
    const dpLessRF = dp - rf;
    
    // Calculate monthly DP split (if applicable)
    let moDPSplit = 0;
    if (paymentTerm === 'split_dp' && noOfSplits > 0) {
        moDPSplit = dpLessRF / noOfSplits;
    }
    
    // Calculate balance for amortization
    let balanceForAmortization = 0;
    if (paymentTerm !== 'full_cash') {
        balanceForAmortization = nspWithVAT - dp;
    }
    
    // Calculate monthly amortization and factor rate
    let moAmortization = 0;
    let factorRate = 0;
    
    if (balanceForAmortization > 0 && noOfYearsToPay > 0) {
        // Standard interest rate for residential properties in PH
        const annualInterestRate = 0.06; // 6% default
        const monthlyInterestRate = annualInterestRate / 12;
        const totalMonths = noOfYearsToPay * 12;
        
        // Calculate factor rate (monthly payment factor)
        if (monthlyInterestRate > 0) {
            factorRate = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths) / 
                        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
            moAmortization = balanceForAmortization * factorRate;
        } else {
            factorRate = 1 / totalMonths;
            moAmortization = balanceForAmortization / totalMonths;
        }
    }
    
    // Calculate dates
    const today = new Date();
    const fullDPDate = new Date(today);
    fullDPDate.setMonth(fullDPDate.getMonth() + 1);
    
    const startSplitDP = new Date(fullDPDate);
    const endSplitDP = new Date(startSplitDP);
    endSplitDP.setMonth(endSplitDP.getMonth() + noOfSplits - 1);
    
    const startAmortization = new Date(endSplitDP);
    startAmortization.setMonth(startAmortization.getMonth() + 1);
    
    const endAmortization = new Date(startAmortization);
    endAmortization.setMonth(endAmortization.getMonth() + (noOfYearsToPay * 12) - 1);
    
    // Display results
    document.getElementById('resultDiscountAmount').textContent = formatCurrency(discountAmount);
    document.getElementById('resultNetSellingPrice').textContent = formatCurrency(netSellingPrice);
    document.getElementById('resultVATAmount').textContent = formatCurrency(vatAmount);
    document.getElementById('resultNSPWithVAT').textContent = formatCurrency(nspWithVAT);
    document.getElementById('resultDP').textContent = formatCurrency(dp);
    document.getElementById('resultDPLessRF').textContent = formatCurrency(dpLessRF);
    document.getElementById('resultMoDPSplit').textContent = formatCurrency(moDPSplit);
    document.getElementById('resultBalanceAmortization').textContent = formatCurrency(balanceForAmortization);
    document.getElementById('resultMoAmortization').textContent = formatCurrency(moAmortization);
    document.getElementById('resultFactorRate').textContent = factorRate.toFixed(9);
    
    // Display dates
    document.getElementById('resultFullDPDate').textContent = fullDPDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });
    document.getElementById('resultStartSplitDP').textContent = startSplitDP.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });
    document.getElementById('resultEndSplitDP').textContent = endSplitDP.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });
    document.getElementById('resultStartAmortization').textContent = startAmortization.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });
    document.getElementById('resultEndAmortization').textContent = endAmortization.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });
}

// Initialize calculator when page loads
function initializePaymentCalculator() {
    // Add event listeners to input fields
    const inputFields = [
        'calcTotalSellingPrice',
        'calcRF',
        'calcDPPercentage',
        'calcNoOfSplits',
        'calcDiscountPercent',
        'calcPromoDiscount',
        'calcNoOfYearsToPay'
    ];
    
    inputFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', calculatePaymentTerms);
        }
    });
    
    // Initial calculation
    calculatePaymentTerms();
}

// Action functions
function printAgreement() {
    if (!currentAgreement) return;
    
    // Create print content
    const printContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto;">
            <h1 style="text-align: center; color: #333; margin-bottom: 30px;">Reservation Agreement</h1>
            
            <div style="margin-bottom: 30px;">
                <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 5px;">Agreement Information</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
                    <div>
                        <p><strong>Agreement Date:</strong> ${formatDate(currentAgreement.agreementDate)}</p>
                        <p><strong>Status:</strong> ${currentAgreement.status.toUpperCase()}</p>
                        <p><strong>Total Amount:</strong> ${formatCurrency(currentAgreement.totalAmount)}</p>
                    </div>
                    <div>
                        <p><strong>Payment Terms:</strong> ${currentAgreement.paymentTerms}</p>
                        <p><strong>Opportunity ID:</strong> ${currentAgreement.opportunityId}</p>
                    </div>
                </div>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 5px;">Customer Information</h2>
                <div style="margin-top: 15px;">
                    <p><strong>Name:</strong> ${currentAgreement.customerName}</p>
                    <p><strong>Email:</strong> ${currentAgreement.customerEmail}</p>
                    <p><strong>Phone:</strong> ${currentAgreement.customerPhone}</p>
                </div>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 5px;">Property Information</h2>
                <div style="margin-top: 15px;">
                    <p><strong>Property:</strong> ${currentAgreement.propertyName}</p>
                    <p><strong>Price:</strong> ${formatCurrency(currentAgreement.propertyPrice)}</p>
                    <p><strong>Location:</strong> ${currentAgreement.propertyLocation}</p>
                </div>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 5px;">Downpayment Schedule</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <thead>
                        <tr style="background-color: #f8f9fa;">
                            <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Payment #</th>
                            <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Due Date</th>
                            <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Description</th>
                            <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Amount</th>
                            <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${currentAgreement.downpaymentSchedule.map(payment => `
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 12px;">${payment.seq}</td>
                                <td style="border: 1px solid #ddd; padding: 12px;">${formatDate(payment.dateDue)}</td>
                                <td style="border: 1px solid #ddd; padding: 12px;">${payment.description}</td>
                                <td style="border: 1px solid #ddd; padding: 12px;">${formatCurrency(payment.amount)}</td>
                                <td style="border: 1px solid #ddd; padding: 12px;">${payment.paymentStatus.toUpperCase()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 5px;">Amortization Schedule (Sample - First 12 months)</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <thead>
                        <tr style="background-color: #f8f9fa;">
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px;">Payment #</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px;">Due Date</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px;">Payment</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px;">Principal</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px;">Interest</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px;">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${currentAgreement.amortizationSchedule.slice(0, 12).map(payment => `
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px; font-size: 12px;">${payment.number}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; font-size: 12px;">${formatDate(payment.dueDate)}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; font-size: 12px;">${formatCurrency(payment.amount)}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; font-size: 12px;">${formatCurrency(payment.principal)}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; font-size: 12px;">${formatCurrency(payment.interest)}</td>
                                <td style="border: 1px solid #ddd; padding: 8px; font-size: 12px;">${formatCurrency(payment.balance)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Reservation Agreement - ${currentAgreement.customerName}</title>
            <style>
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            ${printContent}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
    
    showNotification('Print dialog opened', 'info');
}

function downloadAgreement() {
    if (!currentAgreement) return;
    
    // In a real app, this would generate a PDF
    console.log('Downloading agreement:', currentAgreement);
    showNotification('PDF download would be implemented with a library like jsPDF', 'info');
}

function viewRelatedOpportunity() {
    if (currentAgreement && currentAgreement.opportunityId) {
        window.location.href = `opportunity-details.html?id=${currentAgreement.opportunityId}`;
    }
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showError(message) {
    console.error(message);
    document.querySelector('.dashboard-content').innerHTML = `
        <div class="error-state">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Error</h3>
            <p>${message}</p>
            <a href="reservation-agreements.html" class="btn btn-primary">
                <i class="fas fa-arrow-left"></i>
                Back to Agreements
            </a>
        </div>
    `;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Inject styles specific to agreement detail page
function injectAgreementDetailStyles() {
    const additionalStyles = `
        .breadcrumb {
            margin-bottom: 1rem;
        }
        
        .breadcrumb-link {
            color: #B91C1C;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        
        .breadcrumb-link:hover {
            color: #DC2626;
        }
        
        .agreement-details-layout {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        
        .details-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            overflow: hidden;
        }
        
        .card-header {
            padding: 1.5rem;
            background: #B91C1C;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .card-header h3 {
            margin: 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 600;
        }
        
        .agreement-status {
            display: flex;
            gap: 0.5rem;
        }
        
        .schedule-note {
            font-size: 0.85rem;
            opacity: 0.9;
        }
        
        .card-content {
            padding: 1.5rem;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        
        .info-section h4 {
            margin: 0 0 1rem 0;
            color: #333;
            font-weight: 600;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #f0f0f0;
        }
        
        .info-items {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        
        .info-item {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }
        
        .info-item label {
            font-weight: 500;
            color: #666;
            font-size: 0.9rem;
        }
        
        .info-item span {
            color: #333;
            font-weight: 500;
        }
        
        .schedule-container {
            overflow-x: auto;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        }
        
        .schedule-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
            min-width: 600px;
        }
        
        .schedule-table th {
            background: #f8f9fa;
            color: #333;
            font-weight: 600;
            padding: 1rem 0.75rem;
            text-align: left;
            border-bottom: 2px solid #dee2e6;
            white-space: nowrap;
        }
        
        .schedule-table td {
            padding: 0.75rem;
            border-bottom: 1px solid #dee2e6;
            vertical-align: middle;
        }
        
        .payment-row {
            transition: background-color 0.2s ease;
        }
        
        .payment-row:hover {
            background-color: #f8f9fa;
        }
        
        .payment-row.paid {
            background-color: rgba(185, 28, 28, 0.05);
        }
        
        .payment-row.pending {
            background-color: rgba(185, 28, 28, 0.05);
        }
        
        .payment-row.overdue {
            background-color: rgba(239, 68, 68, 0.1);
        }
        
        .payment-number {
            font-weight: 600;
            color: #333;
            text-align: center;
        }
        
        .payment-date {
            color: #666;
            white-space: nowrap;
        }
        
        .payment-description {
            color: #333;
            font-weight: 500;
        }
        
        .payment-amount {
            font-weight: 600;
            color: #333;
            text-align: right;
        }
        
        .payment-status-cell {
            text-align: center;
        }
        
        .payment-status {
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .payment-status.paid {
            background: #fef2f2;
            color: #B91C1C;
        }
        
        .payment-status.pending {
            background: #fef2f2;
            color: #B91C1C;
        }
        
        .payment-status.overdue {
            background: #fef2f2;
            color: #B91C1C;
        }
        
        .status-badge {
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .status-badge.active {
            background: rgba(255,255,255,0.2);
            color: white;
        }
        
        .status-badge.completed {
            background: rgba(255,255,255,0.2);
            color: white;
        }
        
        .error-state {
            text-align: center;
            padding: 4rem 2rem;
            color: #666;
        }
        
        .error-state i {
            font-size: 4rem;
            color: #EF4444;
            margin-bottom: 1rem;
        }
        
        .error-state h3 {
            margin: 0 0 1rem 0;
            color: #333;
        }
        
        .error-state p {
            margin: 0 0 2rem 0;
        }
        
        /* Notification Styles */
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
            border-left: 4px solid #10B981;
        }
        
        .notification.info {
            border-left: 4px solid #3B82F6;
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
        
        @media (max-width: 768px) {
            .info-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            
            .schedule-container {
                font-size: 0.8rem;
            }
            
            .schedule-table th,
            .schedule-table td {
                padding: 0.5rem 0.25rem;
            }
            
            .advanced-table {
                font-size: 0.75rem;
            }
            
            .advanced-table th,
            .advanced-table td {
                padding: 8px 4px;
            }
            
            .summary-grid {
                grid-template-columns: 1fr;
                gap: 12px;
            }
            
            .schedule-actions {
                flex-wrap: wrap;
                gap: 4px;
            }
        }
        
        /* Enhanced Down Payment Schedule Styles */
        .schedule-actions {
            display: flex;
            gap: 0.5rem;
            align-items: center;
        }
        
        .table-responsive {
            overflow-x: auto;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
        
        .advanced-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.875rem;
            min-width: 1400px;
        }
        
        .advanced-table th {
            background: #f9fafb;
            color: #374151;
            font-weight: 600;
            padding: 12px 8px;
            text-align: left;
            border-bottom: 2px solid #e5e7eb;
            white-space: nowrap;
            position: sticky;
            top: 0;
            z-index: 10;
        }
        
        .advanced-table th i {
            margin-left: 4px;
            opacity: 0.5;
            font-size: 0.75rem;
            cursor: pointer;
        }
        
        .advanced-table td {
            padding: 10px 8px;
            border-bottom: 1px solid #e5e7eb;
            white-space: nowrap;
        }
        
        .advanced-table tr:hover {
            background-color: #fef2f2;
        }
        
        .select-cell input[type="checkbox"] {
            cursor: pointer;
        }
        
        .seq-cell {
            font-weight: 600;
            color: #374151;
            text-align: center;
        }
        
        .amount-cell, .amount-paid-cell, .penalty-cell {
            font-weight: 600;
            color: #059669;
            text-align: right;
        }
        
        .date-cell, .cheque-date-cell, .date-paid-cell, .bc-confirmation-cell {
            color: #6b7280;
            font-size: 0.8rem;
        }
        
        .check-number-cell, .ref-number-cell, .or-number-cell {
            color: #374151;
            font-family: monospace;
            font-size: 0.8rem;
        }
        
        .cheque-status {
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 500;
            text-transform: capitalize;
        }
        
        .cheque-status.cleared {
            background-color: #fef2f2;
            color: #B91C1C;
        }
        
        .cheque-status.pending {
            background-color: #fef2f2;
            color: #B91C1C;
        }
        
        .cheque-status.bounced {
            background-color: #fef2f2;
            color: #B91C1C;
        }
        
        .payment-status {
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 500;
            text-transform: capitalize;
        }
        
        .payment-status.paid {
            background-color: #fef2f2;
            color: #B91C1C;
        }
        
        .payment-status.pending {
            background-color: #fef2f2;
            color: #B91C1C;
        }
        
        .payment-status.overdue {
            background-color: #fef2f2;
            color: #B91C1C;
        }
        
        .action-buttons {
            display: flex;
            gap: 4px;
            justify-content: center;
        }
        
        .btn-action {
            width: 24px;
            height: 24px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            transition: all 0.2s ease;
        }
        
        .btn-action.edit {
            background: #e0f2fe;
            color: #0277bd;
        }
        
        .btn-action.edit:hover {
            background: #b3e5fc;
        }
        
        .btn-action.delete {
            background: #ffebee;
            color: #d32f2f;
        }
        
        .btn-action.delete:hover {
            background: #ffcdd2;
        }
        
        .schedule-footer {
            padding: 12px 16px;
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
            font-size: 0.875rem;
            color: #6b7280;
        }
        
        .schedule-summary {
            padding: 20px;
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
        }
        
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        
        .summary-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        
        .summary-label {
            font-size: 0.875rem;
            color: #6b7280;
            font-weight: 500;
        }
        
        .summary-value {
            font-weight: 600;
            color: #111827;
            font-size: 1rem;
        }
        
        .amount-highlight {
            color: #B91C1C !important;
            font-size: 1.125rem;
        }
        
        .payment-row.paid {
            background-color: rgba(185, 28, 28, 0.05);
        }
        
        .payment-row.pending {
            background-color: rgba(185, 28, 28, 0.02);
        }
        
        .payment-row.overdue {
            background-color: rgba(239, 68, 68, 0.1);
        }
        
        /* Payment Terms Calculator Styles */
        .calculator-card {
            margin-bottom: 2rem;
        }
        
        .calculator-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 1.5rem;
        }
        
        .calculator-inputs,
        .calculator-results {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .input-section,
        .results-section {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 1.5rem;
        }
        
        .input-section h5,
        .results-section h5 {
            color: #374151;
            margin: 0 0 1rem 0;
            font-weight: 600;
            font-size: 1rem;
            border-bottom: 2px solid #B91C1C;
            padding-bottom: 0.5rem;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            position: relative;
        }
        
        .form-group.locked {
            opacity: 0.7;
        }
        
        .form-group.required label {
            color: #374151;
            font-weight: 500;
            font-size: 0.875rem;
        }
        
        .required-mark {
            color: #B91C1C;
            font-weight: bold;
        }
        
        .form-group label {
            color: #6b7280;
            font-weight: 500;
            font-size: 0.875rem;
        }
        
        .form-group input,
        .form-group select {
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 0.875rem;
            background: white;
            transition: border-color 0.2s ease;
        }
        
        .form-group input:focus,
        .form-group select:focus {
            outline: none;
            border-color: #B91C1C;
            box-shadow: 0 0 0 3px rgba(185, 28, 28, 0.1);
        }
        
        .form-group.locked input {
            background: #f3f4f6;
            cursor: not-allowed;
        }
        
        .form-group.locked i {
            position: absolute;
            right: 0.75rem;
            top: 2.5rem;
            color: #9ca3af;
            font-size: 0.875rem;
        }
        
        .results-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        
        .result-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            position: relative;
        }
        
        .result-item.highlight {
            background: #fef2f2;
            border-color: #B91C1C;
        }
        
        .result-item label {
            font-weight: 500;
            color: #374151;
            font-size: 0.875rem;
        }
        
        .result-item span {
            font-weight: 600;
            color: #111827;
            font-size: 0.875rem;
        }
        
        .result-item span.locked {
            color: #059669;
        }
        
        .result-item i {
            position: absolute;
            right: 0.75rem;
            color: #9ca3af;
            font-size: 0.75rem;
        }
        
        .result-item.highlight span {
            color: #B91C1C;
            font-size: 1rem;
        }
        
        /* Responsive design for calculator */
        @media (max-width: 1024px) {
            .calculator-layout {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            
            .form-row {
                grid-template-columns: 1fr;
                gap: 0.75rem;
            }
        }
        
        @media (max-width: 768px) {
            .calculator-layout {
                padding: 1rem;
            }
            
            .input-section,
            .results-section {
                padding: 1rem;
            }
            
            .form-group input,
            .form-group select {
                padding: 0.5rem;
                font-size: 0.8rem;
            }
            
            .result-item {
                padding: 0.5rem;
            }
            
            .result-item label,
            .result-item span {
                font-size: 0.8rem;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
} 