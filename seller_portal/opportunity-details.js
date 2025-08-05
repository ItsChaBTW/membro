// Opportunity Details Page JavaScript

// Import opportunities data from the main file
// In a real application, this would be fetched from an API
const opportunities = [
    {
        id: 1,
        customers: [
            {
                name: "John Doe",
                email: "john.doe@email.com",
                phone: "+63 912 345 6789",
                address: "123 Main St, Makati City",
                type: "primary"
            }
        ],
        propertyName: "Modern 2BR Condo",
        propertyPrice: 2500000,
        propertyLocation: "Makati City",
        reservationDate: "2024-01-15",
        reservationFee: 125000,
        rfPaid: true,
        stage: "requirements",
        status: "active",
        salesTeam: {
            propertyConsultant: "Maria Santos",
            manager: "Roberto Cruz",
            salesDirector: "Ana Reyes"
        },
        paymentTerms: {
            downPaymentPercent: 20,
            loanTerm: 15,
            interestRate: 6.5,
            paymentFrequency: "monthly"
        },
        promos: [
            {
                name: "Early Bird Discount",
                type: "percentage",
                value: 5,
                description: "5% discount for early reservations"
            }
        ],
        requirements: [
            { name: "Valid ID", status: "completed", dueDate: "2024-01-20" },
            { name: "Income Certificate", status: "pending", dueDate: "2024-01-25" },
            { name: "Bank Statement", status: "pending", dueDate: "2024-01-30" },
            { name: "COE", status: "pending", dueDate: "2024-02-05" }
        ],
        notes: "Customer is very interested and has good credit score"
    },
    {
        id: 2,
        customers: [
            {
                name: "Jane Smith",
                email: "jane.smith@email.com",
                phone: "+63 923 456 7890",
                address: "456 Oak Ave, Quezon City",
                type: "primary"
            },
            {
                name: "Michael Smith",
                email: "michael.smith@email.com",
                phone: "+63 923 456 7891",
                address: "456 Oak Ave, Quezon City",
                type: "co-buyer"
            }
        ],
        propertyName: "Family House",
        propertyPrice: 4500000,
        propertyLocation: "Quezon City",
        reservationDate: "2024-01-10",
        reservationFee: 225000,
        rfPaid: true,
        stage: "approval",
        status: "active",
        salesTeam: {
            propertyConsultant: "Carlos Mendoza",
            manager: "Roberto Cruz",
            salesDirector: "Ana Reyes"
        },
        paymentTerms: {
            downPaymentPercent: 25,
            loanTerm: 20,
            interestRate: 6.0,
            paymentFrequency: "monthly"
        },
        promos: [
            {
                name: "Family Package Deal",
                type: "fixed",
                value: 100000,
                description: "₱100,000 discount for family purchases"
            },
            {
                name: "Cash Payment Bonus",
                type: "percentage",
                value: 3,
                description: "3% additional discount for cash payments"
            }
        ],
        requirements: [
            { name: "Valid ID", status: "completed", dueDate: "2024-01-15" },
            { name: "Income Certificate", status: "completed", dueDate: "2024-01-20" },
            { name: "Bank Statement", status: "completed", dueDate: "2024-01-25" },
            { name: "COE", status: "completed", dueDate: "2024-01-30" }
        ],
        notes: "All requirements submitted, waiting for approval"
    }
    // Add other opportunities as needed
];

let currentOpportunity = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Opportunity details page loaded');
    
    // Get opportunity ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const opportunityId = parseInt(urlParams.get('id'));
    
    if (opportunityId) {
        loadOpportunityDetails(opportunityId);
    } else {
        showError('No opportunity ID provided');
        return;
    }
    
    setupEventListeners();
    injectDetailPageStyles();
});

// Setup event listeners
function setupEventListeners() {
    // Modal close buttons
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Form submissions
    document.getElementById('addCustomerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitAddCustomer();
    });
    
    document.getElementById('addPromoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitAddPromo();
    });
    
    document.getElementById('stageForm').addEventListener('submit', function(e) {
        e.preventDefault();
        updateOpportunityStage();
    });
}

// Load opportunity details
function loadOpportunityDetails(opportunityId) {
    currentOpportunity = opportunities.find(opp => opp.id === opportunityId);
    
    if (!currentOpportunity) {
        showError('Opportunity not found');
        return;
    }
    
    displayOpportunityDetails(currentOpportunity);
}

// Display opportunity details
function displayOpportunityDetails(opportunity) {
    const primaryCustomer = opportunity.customers.find(c => c.type === 'primary') || opportunity.customers[0];
    
    // Update page title
    document.getElementById('opportunityTitle').textContent = `${opportunity.propertyName} - ${primaryCustomer.name}`;
    
    // Update stage and status badges
    document.getElementById('opportunityStage').textContent = opportunity.stage.toUpperCase();
    document.getElementById('opportunityStage').className = `stage-badge ${opportunity.stage}`;
    
    document.getElementById('opportunityStatus').textContent = opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1);
    document.getElementById('opportunityStatus').className = `status-badge ${opportunity.status}`;
    
    // Update customer information
    document.getElementById('customerName').textContent = primaryCustomer.name;
    document.getElementById('customerEmail').textContent = primaryCustomer.email;
    document.getElementById('customerPhone').textContent = primaryCustomer.phone;
    document.getElementById('customerAddress').textContent = primaryCustomer.address;
    
    // Update property information
    document.getElementById('propertyName').textContent = opportunity.propertyName;
    document.getElementById('propertyPrice').textContent = formatCurrency(opportunity.propertyPrice);
    document.getElementById('propertyLocation').textContent = opportunity.propertyLocation;
    
    // Update reservation details
    document.getElementById('reservationDate').textContent = formatDate(opportunity.reservationDate);
    document.getElementById('reservationFee').textContent = formatCurrency(opportunity.reservationFee);
    document.getElementById('rfPaid').textContent = opportunity.rfPaid ? 'Yes' : 'No';
    
    // Display customers, sales team, payment terms, promos, and requirements
    displayCustomers(opportunity.customers);
    displaySalesTeam(opportunity.salesTeam);
    displayPaymentTerms(opportunity.paymentTerms);
    displayPromos(opportunity.promos);
    displayRequirements(opportunity.requirements);
}

// Display customers
function displayCustomers(customers) {
    const customersList = document.getElementById('customersList');
    
    customersList.innerHTML = customers.map(customer => `
        <tr>
            <td class="customer-name">${customer.name}</td>
            <td class="customer-email">${customer.email}</td>
            <td class="customer-phone">${customer.phone}</td>
            <td class="customer-type">
                <span class="type-badge ${customer.type}">${customer.type.charAt(0).toUpperCase() + customer.type.slice(1)}</span>
            </td>
        </tr>
    `).join('');
}

// Display sales team
function displaySalesTeam(salesTeam) {
    document.getElementById('propertyConsultant').textContent = salesTeam.propertyConsultant;
    document.getElementById('salesManager').textContent = salesTeam.manager;
    document.getElementById('salesDirector').textContent = salesTeam.salesDirector;
}

// Display payment terms
function displayPaymentTerms(paymentTerms) {
    document.getElementById('downPaymentPercent').textContent = `${paymentTerms.downPaymentPercent}%`;
    document.getElementById('loanTerm').textContent = `${paymentTerms.loanTerm} years`;
    document.getElementById('interestRate').textContent = `${paymentTerms.interestRate}% per annum`;
    document.getElementById('paymentFrequency').textContent = paymentTerms.paymentFrequency.charAt(0).toUpperCase() + paymentTerms.paymentFrequency.slice(1);
}

// Display promos
function displayPromos(promos) {
    const promosList = document.getElementById('promosList');
    
    if (promos.length === 0) {
        promosList.innerHTML = '<tr><td colspan="4" class="no-data">No promos applied</td></tr>';
        return;
    }
    
    promosList.innerHTML = promos.map(promo => `
        <tr>
            <td class="promo-name">${promo.name}</td>
            <td class="promo-type">
                <span class="type-badge ${promo.type}">${promo.type.charAt(0).toUpperCase() + promo.type.slice(1)}</span>
            </td>
            <td class="promo-value">
                ${promo.type === 'percentage' ? `${promo.value}%` : formatCurrency(promo.value)}
            </td>
            <td class="promo-description">${promo.description}</td>
        </tr>
    `).join('');
}

// Display requirements
function displayRequirements(requirements) {
    const requirementsList = document.getElementById('requirementsList');
    
    if (requirements.length === 0) {
        requirementsList.innerHTML = '<tr><td colspan="3" class="no-data">No requirements yet</td></tr>';
        return;
    }
    
    requirementsList.innerHTML = requirements.map(req => `
        <tr class="requirement-row ${req.status}">
            <td class="requirement-name">${req.name}</td>
            <td class="requirement-due">${formatDate(req.dueDate)}</td>
            <td class="requirement-status">
                <span class="status-badge ${req.status}">${req.status.charAt(0).toUpperCase() + req.status.slice(1)}</span>
            </td>
        </tr>
    `).join('');
}

// Modal functions
function openAddCustomerModal() {
    document.getElementById('addCustomerModal').style.display = 'block';
}

function closeAddCustomerModal() {
    document.getElementById('addCustomerModal').style.display = 'none';
    document.getElementById('addCustomerForm').reset();
}

function openAddPromoModal() {
    document.getElementById('addPromoModal').style.display = 'block';
}

function closeAddPromoModal() {
    document.getElementById('addPromoModal').style.display = 'none';
    document.getElementById('addPromoForm').reset();
}

function openUpdateStageModal() {
    if (currentOpportunity) {
        document.getElementById('newStage').value = currentOpportunity.stage;
    }
    document.getElementById('stageModal').style.display = 'block';
}

function closeStageModal() {
    document.getElementById('stageModal').style.display = 'none';
    document.getElementById('stageForm').reset();
}

// Form submission functions
function submitAddCustomer() {
    const formData = new FormData(document.getElementById('addCustomerForm'));
    
    if (!currentOpportunity) return;
    
    const newCustomer = {
        name: formData.get('customerName'),
        email: formData.get('customerEmail'),
        phone: formData.get('customerPhone'),
        address: formData.get('customerAddress'),
        type: formData.get('customerType')
    };
    
    currentOpportunity.customers.push(newCustomer);
    displayCustomers(currentOpportunity.customers);
    
    closeAddCustomerModal();
    showNotification('Customer added successfully!', 'success');
}

function submitAddPromo() {
    const formData = new FormData(document.getElementById('addPromoForm'));
    
    if (!currentOpportunity) return;
    
    const newPromo = {
        name: formData.get('promoName'),
        type: formData.get('promoType'),
        value: parseFloat(formData.get('promoValue')),
        description: formData.get('promoDescription') || ''
    };
    
    currentOpportunity.promos.push(newPromo);
    displayPromos(currentOpportunity.promos);
    
    closeAddPromoModal();
    showNotification('Promo added successfully!', 'success');
}

function updateOpportunityStage() {
    const newStage = document.getElementById('newStage').value;
    const notes = document.getElementById('stageNotes').value;
    
    if (currentOpportunity) {
        currentOpportunity.stage = newStage;
        currentOpportunity.notes = notes;
        
        // Update the display
        document.getElementById('opportunityStage').textContent = newStage.toUpperCase();
        document.getElementById('opportunityStage').className = `stage-badge ${newStage}`;
        
        showNotification('Stage updated successfully!', 'success');
    }
    
    closeStageModal();
}

// Utility functions
function updatePromoValueLabel() {
    const promoType = document.getElementById('promoType').value;
    const label = document.getElementById('promoValueLabel');
    
    if (promoType === 'percentage') {
        label.textContent = 'Percentage Value *';
        document.getElementById('promoValue').setAttribute('max', '100');
    } else {
        label.textContent = 'Fixed Amount (₱) *';
        document.getElementById('promoValue').removeAttribute('max');
    }
}

function generateForm() {
    if (!currentOpportunity) return;
    
    console.log('Generating form for opportunity:', currentOpportunity);
    showNotification('Form generated successfully!', 'success');
}

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
            <a href="opportunities.html" class="btn btn-primary">
                <i class="fas fa-arrow-left"></i>
                Back to Opportunities
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

// Inject styles specific to detail page
function injectDetailPageStyles() {
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
        
        .opportunity-form-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            border: 1px solid #f3f4f6;
        }
        
        .status-bar {
            background: #B91C1C;
            padding: 1.5rem 2rem;
            color: white;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
        
        .stage-status {
            display: flex;
            gap: 1rem;
            align-items: center;
        }
        
        .stage-badge, .status-badge {
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .stage-badge {
            background: rgba(255,255,255,0.2);
            color: white;
        }
        
        .status-badge {
            background: rgba(255,255,255,0.3);
            color: white;
        }
        
        .form-section {
            padding: 2rem;
            border-bottom: 1px solid #e9ecef;
        }
        
        .form-section:last-child {
            border-bottom: none;
        }
        
        .section-header {
            display: flex;
            justify-content: between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .section-header h2 {
            margin: 0;
            color: #374151;
            font-size: 1.25rem;
            font-weight: 600;
            flex: 1;
        }
        
        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            align-items: start;
        }
        
        .form-field {
            display: flex;
            flex-direction: column;
        }
        
        .form-field.full-width {
            grid-column: 1 / -1;
        }
        
        .form-field label {
            font-weight: 600;
            color: #4b5563;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .field-value {
            padding: 0.75rem 0;
            color: #111827;
            font-size: 1rem;
            font-weight: 500;
            border-bottom: 1px solid #e5e7eb;
            min-height: 1.5rem;
        }
        
        .field-value.amount {
            color: #10B981;
            font-weight: 600;
        }
        
        .field-value.status {
            color: #DC2626;
            font-weight: 600;
        }
        
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
            font-size: 0.9rem;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            overflow: hidden;
        }
        
        .data-table th {
            background: #f9fafb;
            color: #374151;
            font-weight: 600;
            padding: 1rem 0.75rem;
            text-align: left;
            border-bottom: 2px solid #e5e7eb;
            text-transform: uppercase;
            font-size: 0.8rem;
            letter-spacing: 0.5px;
        }
        
        .data-table td {
            padding: 0.75rem;
            border-bottom: 1px solid #e5e7eb;
            vertical-align: middle;
        }
        
        .data-table tr:hover {
            background: #fef2f2;
        }
        
        .data-table tr:last-child td {
            border-bottom: none;
        }
        
        .type-badge, .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .type-badge.primary {
            background: #fef2f2;
            color: #B91C1C;
        }
        
        .type-badge.co-buyer {
            background: #fef2f2;
            color: #B91C1C;
        }
        
        .type-badge.spouse {
            background: #fef2f2;
            color: #B91C1C;
        }
        
        .type-badge.guarantor {
            background: #fef2f2;
            color: #B91C1C;
        }
        
        .type-badge.beneficiary {
            background: #fef2f2;
            color: #B91C1C;
        }
        
        .type-badge.percentage {
            background: #fef2f2;
            color: #B91C1C;
        }
        
        .type-badge.fixed {
            background: #fef2f2;
            color: #B91C1C;
        }
        
        .status-badge.completed {
            background: #fef2f2;
            color: #B91C1C;
        }
        
        .status-badge.pending {
            background: #fef2f2;
            color: #B91C1C;
        }
        
        .status-badge.overdue {
            background: #fef2f2;
            color: #B91C1C;
        }
        
        .no-data {
            text-align: center;
            color: #6b7280;
            font-style: italic;
            padding: 2rem !important;
        }
        
        .btn {
            padding: 0.5rem 1.5rem;
            border: none;
            border-radius: 4px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background: #B91C1C;
            color: white;
        }
        
        .btn-primary:hover {
            background: #991B1B;
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(185, 28, 28, 0.3);
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
            .opportunity-form-container {
                margin: 0;
                border-radius: 0;
            }
            
            .form-section {
                padding: 1.5rem 1rem;
            }
            
            .status-bar {
                padding: 1rem;
            }
            
            .form-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            
            .data-table {
                font-size: 0.8rem;
            }
            
            .data-table th,
            .data-table td {
                padding: 0.5rem 0.25rem;
            }
        }
        
        @media (max-width: 480px) {
            .section-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
            }
            
            .stage-status {
                flex-direction: column;
                gap: 0.5rem;
                align-items: flex-start;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
}

// Tab switching functionality for opportunity details
function switchDetailsTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.opportunity-details-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.opportunity-details-tabs .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active class to clicked tab and corresponding content
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Load content for the specific tab
    loadDetailsTabContent(tabName);
}

// Load content for each tab
function loadDetailsTabContent(tabName) {
    switch(tabName) {
        case 'overview':
            // Overview content is already loaded
            break;
        case 'requirements':
            loadRequirementsContent();
            break;
        case 'promo':
            loadPromoContent();
            break;
        case 'payment-terms':
            loadPaymentTermsContent();
            break;
        case 'change-requests':
            loadChangeRequestsContent();
            break;
    }
}

// Load Requirements Tab Content
function loadRequirementsContent() {
    const requiredDocs = [
        { id: 1, name: 'Valid Government ID', status: 'submitted', type: 'required', description: 'Driver\'s License or SSS ID' },
        { id: 2, name: 'Income Tax Return', status: 'pending', type: 'required', description: 'Latest ITR with BIR stamp' },
        { id: 3, name: 'Certificate of Employment', status: 'missing', type: 'required', description: 'For employed buyers' },
        { id: 4, name: 'Bank Statements', status: 'submitted', type: 'required', description: '3 months bank statements' }
    ];
    
    const financialDocs = [
        { id: 5, name: 'Payslips', status: 'submitted', type: 'financial', description: 'Latest 3 months payslips' },
        { id: 6, name: 'Business License', status: 'missing', type: 'financial', description: 'For self-employed buyers' },
        { id: 7, name: 'Audited Financial Statement', status: 'pending', type: 'financial', description: 'For business owners' }
    ];
    
    const legalDocs = [
        { id: 8, name: 'Marriage Certificate', status: 'submitted', type: 'legal', description: 'For married buyers' },
        { id: 9, name: 'Birth Certificate', status: 'submitted', type: 'legal', description: 'Certified true copy' },
        { id: 10, name: 'Special Power of Attorney', status: 'missing', type: 'legal', description: 'If represented by agent' }
    ];
    
    // Populate required documents
    const requiredContainer = document.getElementById('requiredDocuments');
    requiredContainer.innerHTML = requiredDocs.map(doc => createDocumentItem(doc)).join('');
    
    // Populate financial documents
    const financialContainer = document.getElementById('financialDocuments');
    financialContainer.innerHTML = financialDocs.map(doc => createDocumentItem(doc)).join('');
    
    // Populate legal documents
    const legalContainer = document.getElementById('legalDocuments');
    legalContainer.innerHTML = legalDocs.map(doc => createDocumentItem(doc)).join('');
}

// Create document item HTML
function createDocumentItem(doc) {
    const iconClass = getDocumentIcon(doc.type);
    return `
        <div class="document-item">
            <div class="document-info">
                <div class="document-icon">
                    <i class="${iconClass}"></i>
                </div>
                <div class="document-details">
                    <h5>${doc.name}</h5>
                    <p>${doc.description}</p>
                </div>
            </div>
            <div class="document-status">
                <span class="document-status-badge ${doc.status}">${doc.status.toUpperCase()}</span>
                <button class="btn btn-sm btn-outline" onclick="viewDocument(${doc.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
    `;
}

// Get document icon based on type
function getDocumentIcon(type) {
    switch(type) {
        case 'required': return 'fas fa-id-card';
        case 'financial': return 'fas fa-chart-line';
        case 'legal': return 'fas fa-gavel';
        default: return 'fas fa-file-alt';
    }
}

// Load Promo Content (already exists in promosList)
function loadPromoContent() {
    // Promo content is already loaded via existing functions
    console.log('Promo content loaded');
}

// Load Payment Terms Content
function loadPaymentTermsContent() {
    const paymentSchedule = [
        { id: 1, payment: 'Reservation Fee', dueDate: '2024-01-15', amount: '₱50,000', status: 'paid' },
        { id: 2, payment: 'Down Payment 1', dueDate: '2024-02-15', amount: '₱200,000', status: 'pending' },
        { id: 3, payment: 'Down Payment 2', dueDate: '2024-03-15', amount: '₱200,000', status: 'upcoming' },
        { id: 4, payment: 'Monthly Amortization', dueDate: '2024-04-15', amount: '₱35,000', status: 'upcoming' }
    ];
    
    const scheduleBody = document.getElementById('paymentScheduleList');
    scheduleBody.innerHTML = paymentSchedule.map(payment => `
        <tr>
            <td>${payment.id}</td>
            <td>${new Date(payment.dueDate).toLocaleDateString()}</td>
            <td>${payment.amount}</td>
            <td><span class="status-badge ${payment.status}">${payment.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="viewPaymentDetails(${payment.id})">View</button>
                ${payment.status === 'pending' ? 
                    '<button class="btn btn-sm btn-primary" onclick="processPayment(' + payment.id + ')">Pay Now</button>' : ''
                }
            </td>
        </tr>
    `).join('');
}

// Load Change Requests Content
function loadChangeRequestsContent() {
    const changeRequests = [
        { id: 'CR001', type: 'Unit Transfer', description: 'Request to transfer from Block 1 to Block 2', status: 'pending', date: '2024-01-15' },
        { id: 'CR002', type: 'Payment Terms', description: 'Request to extend payment terms', status: 'approved', date: '2024-01-10' },
        { id: 'CR003', type: 'Buyer Information', description: 'Update contact information', status: 'completed', date: '2024-01-05' }
    ];
    
    const requestsBody = document.getElementById('changeRequestsList');
    requestsBody.innerHTML = changeRequests.map(request => `
        <tr>
            <td>${request.id}</td>
            <td>${request.type}</td>
            <td>${request.description}</td>
            <td><span class="status-badge ${request.status}">${request.status}</span></td>
            <td>${new Date(request.date).toLocaleDateString()}</td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="viewChangeRequest('${request.id}')">View</button>
                ${request.status === 'pending' ? 
                    '<button class="btn btn-sm btn-success" onclick="approveChangeRequest(\'' + request.id + '\')">Approve</button>' : ''
                }
            </td>
        </tr>
    `).join('');
    
    // Load requirements status
    const requirementsStatus = [
        { requirement: 'Government ID', dueDate: '2024-01-20', status: 'submitted' },
        { requirement: 'Income Documents', dueDate: '2024-01-25', status: 'pending' },
        { requirement: 'Bank Statements', dueDate: '2024-01-30', status: 'missing' }
    ];
    
    const requirementsBody = document.getElementById('requirementsList');
    requirementsBody.innerHTML = requirementsStatus.map(req => `
        <tr>
            <td>${req.requirement}</td>
            <td>${new Date(req.dueDate).toLocaleDateString()}</td>
            <td><span class="status-badge ${req.status}">${req.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="followUpRequirement('${req.requirement}')">Follow Up</button>
            </td>
        </tr>
    `).join('');
}

// Helper functions for button actions
function uploadDocument() {
    alert('Upload document functionality to be implemented');
}

function editPaymentTerms() {
    alert('Edit payment terms functionality to be implemented');
}

function createChangeRequest() {
    alert('Create change request functionality to be implemented');
}

function viewDocument(id) {
    alert(`View document ${id}`);
}

function viewPaymentDetails(id) {
    alert(`View payment details ${id}`);
}

function processPayment(id) {
    alert(`Process payment ${id}`);
}

function viewChangeRequest(id) {
    alert(`View change request ${id}`);
}

function approveChangeRequest(id) {
    alert(`Approve change request ${id}`);
}

function followUpRequirement(requirement) {
    alert(`Follow up on ${requirement}`);
} 