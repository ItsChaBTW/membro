// Opportunities Page JavaScript

// Sample opportunities data with enhanced fields
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
    },
    {
        id: 3,
        customers: [
            {
                name: "Mike Johnson",
                email: "mike.johnson@email.com",
                phone: "+63 934 567 8901",
                address: "789 Pine St, Taguig City",
                type: "primary"
            }
        ],
        propertyName: "Townhouse Unit",
        propertyPrice: 3200000,
        propertyLocation: "Taguig City",
        reservationDate: "2024-01-20",
        reservationFee: 160000,
        rfPaid: false,
        stage: "reservation",
        status: "pending",
        salesTeam: {
            propertyConsultant: "Lisa Garcia",
            manager: "Roberto Cruz",
            salesDirector: "Ana Reyes"
        },
        paymentTerms: {
            downPaymentPercent: 15,
            loanTerm: 25,
            interestRate: 7.0,
            paymentFrequency: "monthly"
        },
        promos: [],
        requirements: [],
        notes: "Customer needs to pay RF first"
    },
    {
        id: 4,
        customers: [
            {
                name: "Sarah Wilson",
                email: "sarah.wilson@email.com",
                phone: "+63 945 678 9012",
                address: "321 Elm St, BGC",
                type: "primary"
            }
        ],
        propertyName: "Luxury Penthouse",
        propertyPrice: 8500000,
        propertyLocation: "Bonifacio Global City",
        reservationDate: "2024-01-05",
        reservationFee: 425000,
        rfPaid: true,
        stage: "ra",
        status: "active",
        salesTeam: {
            propertyConsultant: "Patricia Lim",
            manager: "Roberto Cruz",
            salesDirector: "Ana Reyes"
        },
        paymentTerms: {
            downPaymentPercent: 30,
            loanTerm: 10,
            interestRate: 5.5,
            paymentFrequency: "monthly"
        },
        promos: [
            {
                name: "Luxury Suite Package",
                type: "percentage",
                value: 8,
                description: "8% discount for luxury properties"
            }
        ],
        requirements: [
            { name: "Valid ID", status: "completed", dueDate: "2024-01-10" },
            { name: "Income Certificate", status: "completed", dueDate: "2024-01-15" },
            { name: "Bank Statement", status: "completed", dueDate: "2024-01-20" },
            { name: "COE", status: "completed", dueDate: "2024-01-25" }
        ],
        notes: "RA signed, closing soon"
    },
    {
        id: 5,
        customers: [
            {
                name: "David Brown",
                email: "david.brown@email.com",
                phone: "+63 956 789 0123",
                address: "654 Maple Dr, Cavite",
                type: "primary"
            }
        ],
        propertyName: "Suburban House",
        propertyPrice: 3800000,
        propertyLocation: "Cavite",
        reservationDate: "2024-01-12",
        reservationFee: 190000,
        rfPaid: true,
        stage: "screening",
        status: "active",
        salesTeam: {
            propertyConsultant: "Jose Rivera",
            manager: "Roberto Cruz",
            salesDirector: "Ana Reyes"
        },
        paymentTerms: {
            downPaymentPercent: 20,
            loanTerm: 20,
            interestRate: 6.8,
            paymentFrequency: "monthly"
        },
        promos: [
            {
                name: "New Year Special",
                type: "fixed",
                value: 50000,
                description: "₱50,000 New Year discount"
            }
        ],
        requirements: [],
        notes: "Initial screening in progress"
    }
];

// DOM Elements
const opportunitiesTableBody = document.getElementById('opportunitiesTableBody');
const stageFilter = document.getElementById('stageFilter');
const statusFilter = document.getElementById('statusFilter');
const opportunityModal = document.getElementById('opportunityModal');
const stageModal = document.getElementById('stageModal');
let currentOpportunityId = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Opportunities page loaded');
    console.log('Sample opportunities:', opportunities.length);
    displayOpportunities(opportunities);
    setupEventListeners();
    injectOpportunitiesStyles();
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
    
    // Stage form submission
    document.getElementById('stageForm').addEventListener('submit', function(e) {
        e.preventDefault();
        updateOpportunityStage();
    });
    
    // Add customer form submission
    document.getElementById('addCustomerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitAddCustomer();
    });
    
    // Add promo form submission
    document.getElementById('addPromoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitAddPromo();
    });
}

// Close add customer modal
function closeAddCustomerModal() {
    document.getElementById('addCustomerModal').style.display = 'none';
    document.getElementById('addCustomerForm').reset();
}

// Close add promo modal
function closeAddPromoModal() {
    document.getElementById('addPromoModal').style.display = 'none';
    document.getElementById('addPromoForm').reset();
}

// Update promo value label based on type
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

// Submit add customer
function submitAddCustomer() {
    const formData = new FormData(document.getElementById('addCustomerForm'));
    const opportunityId = window.currentOpportunityId;
    
    if (!opportunityId) return;
    
    const opportunity = opportunities.find(opp => opp.id === opportunityId);
    if (!opportunity) return;
    
    // Create new customer object
    const newCustomer = {
        name: formData.get('customerName'),
        email: formData.get('customerEmail'),
        phone: formData.get('customerPhone'),
        address: formData.get('customerAddress'),
        type: formData.get('customerType')
    };
    
    // Add customer to opportunity
    opportunity.customers.push(newCustomer);
    
    // Refresh the opportunities table
    displayOpportunities(opportunities);
    
    // If the opportunity modal is open, refresh it
    if (opportunityModal.style.display === 'block') {
        viewOpportunity(opportunityId);
    }
    
    // Close modal and show success message
    closeAddCustomerModal();
    showNotification('Customer added successfully!', 'success');
}

// Submit add promo
function submitAddPromo() {
    const formData = new FormData(document.getElementById('addPromoForm'));
    const opportunityId = window.currentOpportunityId;
    
    if (!opportunityId) return;
    
    const opportunity = opportunities.find(opp => opp.id === opportunityId);
    if (!opportunity) return;
    
    // Create new promo object
    const newPromo = {
        name: formData.get('promoName'),
        type: formData.get('promoType'),
        value: parseFloat(formData.get('promoValue')),
        description: formData.get('promoDescription') || ''
    };
    
    // Add promo to opportunity
    opportunity.promos.push(newPromo);
    
    // If the opportunity modal is open, refresh it
    if (opportunityModal.style.display === 'block') {
        viewOpportunity(opportunityId);
    }
    
    // Close modal and show success message
    closeAddPromoModal();
    showNotification('Promo added successfully!', 'success');
}

// Display opportunities
function displayOpportunities(opportunitiesToShow) {
    console.log('Displaying opportunities:', opportunitiesToShow.length);
    console.log('Table body element:', opportunitiesTableBody);
    
    if (!opportunitiesTableBody) {
        console.error('Opportunities table body not found!');
        return;
    }
    
    opportunitiesTableBody.innerHTML = '';
    
    if (opportunitiesToShow.length === 0) {
        opportunitiesTableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2rem; color: #666;">
                    No opportunities found
                </td>
            </tr>
        `;
        return;
    }
    
    opportunitiesToShow.forEach(opportunity => {
        console.log('Creating row for:', opportunity.customerName);
        const row = createOpportunityRow(opportunity);
        opportunitiesTableBody.appendChild(row);
    });
    
    console.log('Opportunities displayed successfully');
}

// Create opportunity table row
function createOpportunityRow(opportunity) {
    const row = document.createElement('tr');
    
    const formattedPrice = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0
    }).format(opportunity.propertyPrice);
    
    const formattedFee = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0
    }).format(opportunity.reservationFee);
    
    // Get primary customer
    const primaryCustomer = opportunity.customers.find(c => c.type === 'primary') || opportunity.customers[0];
    const customerCount = opportunity.customers.length;
    const customerDisplay = customerCount > 1 ? `${primaryCustomer.name} (+${customerCount - 1} more)` : primaryCustomer.name;
    
    row.innerHTML = `
        <td>
            <div class="customer-info">
                <strong>${customerDisplay}</strong>
                <small>${primaryCustomer.email}</small>
                ${customerCount > 1 ? `<small class="customer-count">${customerCount} customers</small>` : ''}
            </div>
        </td>
        <td>
            <div class="property-info">
                <strong>${opportunity.propertyName}</strong>
                <small>${formattedPrice}</small>
            </div>
        </td>
        <td>
            <span class="stage-badge ${opportunity.stage}">${opportunity.stage.toUpperCase()}</span>
        </td>
        <td>
            <span class="status-badge ${opportunity.status}">${opportunity.status}</span>
        </td>
        <td>${new Date(opportunity.reservationDate).toLocaleDateString()}</td>
        <td>
            <span class="rf-status ${opportunity.rfPaid ? 'paid' : 'unpaid'}">
                ${opportunity.rfPaid ? 'Paid' : 'Unpaid'}
            </span>
        </td>
        <td>
            <div class="action-buttons">
                <button class="btn-icon" onclick="viewOpportunity(${opportunity.id})" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon" onclick="generateForm(${opportunity.id})" title="Generate Form">
                    <i class="fas fa-file-alt"></i>
                </button>
                <button class="btn-icon" onclick="updateStage(${opportunity.id})" title="Update Stage">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="addCustomer(${opportunity.id})" title="Add Customer">
                    <i class="fas fa-user-plus"></i>
                </button>
                <button class="btn-icon" onclick="addPromo(${opportunity.id})" title="Add Promo">
                    <i class="fas fa-tags"></i>
                </button>
            </div>
        </td>
    `;
    
    return row;
}

// Filter opportunities
function filterOpportunities() {
    const stageFilterValue = stageFilter.value;
    const statusFilterValue = statusFilter.value;
    
    let filteredOpportunities = opportunities;
    
    if (stageFilterValue) {
        filteredOpportunities = filteredOpportunities.filter(opp => opp.stage === stageFilterValue);
    }
    
    if (statusFilterValue) {
        filteredOpportunities = filteredOpportunities.filter(opp => opp.status === statusFilterValue);
    }
    
    displayOpportunities(filteredOpportunities);
}

// View opportunity details
function viewOpportunity(opportunityId) {
    // Navigate to the opportunity details page
    window.location.href = `opportunity-details.html?id=${opportunityId}`;
}

// Display customers
function displayCustomers(customers) {
    const customersList = document.getElementById('customersList');
    if (!customersList) return;
    
    customersList.innerHTML = customers.map(customer => `
        <div class="customer-item">
            <div class="customer-info">
                <span class="customer-name">${customer.name}</span>
                <span class="customer-type">${customer.type}</span>
            </div>
            <div class="customer-details">
                <span class="customer-email">${customer.email}</span>
                <span class="customer-phone">${customer.phone}</span>
            </div>
        </div>
    `).join('');
}

// Display sales team
function displaySalesTeam(salesTeam) {
    const salesTeamList = document.getElementById('salesTeamList');
    if (!salesTeamList) return;
    
    salesTeamList.innerHTML = `
        <div class="sales-team-item">
            <span class="team-role">Property Consultant:</span>
            <span class="team-name">${salesTeam.propertyConsultant}</span>
        </div>
        <div class="sales-team-item">
            <span class="team-role">Manager:</span>
            <span class="team-name">${salesTeam.manager}</span>
        </div>
        <div class="sales-team-item">
            <span class="team-role">Sales Director:</span>
            <span class="team-name">${salesTeam.salesDirector}</span>
        </div>
    `;
}

// Display payment terms
function displayPaymentTerms(paymentTerms) {
    const paymentTermsList = document.getElementById('paymentTermsList');
    if (!paymentTermsList) return;
    
    paymentTermsList.innerHTML = `
        <div class="payment-term-item">
            <span class="term-label">Down Payment:</span>
            <span class="term-value">${paymentTerms.downPaymentPercent}%</span>
        </div>
        <div class="payment-term-item">
            <span class="term-label">Loan Term:</span>
            <span class="term-value">${paymentTerms.loanTerm} years</span>
        </div>
        <div class="payment-term-item">
            <span class="term-label">Interest Rate:</span>
            <span class="term-value">${paymentTerms.interestRate}% p.a.</span>
        </div>
        <div class="payment-term-item">
            <span class="term-label">Payment Frequency:</span>
            <span class="term-value">${paymentTerms.paymentFrequency.charAt(0).toUpperCase() + paymentTerms.paymentFrequency.slice(1)}</span>
        </div>
    `;
}

// Display promos
function displayPromos(promos) {
    const promosList = document.getElementById('promosList');
    if (!promosList) return;
    
    if (promos.length === 0) {
        promosList.innerHTML = '<p class="no-promos">No promos applied</p>';
        return;
    }
    
    promosList.innerHTML = promos.map(promo => `
        <div class="promo-item">
            <div class="promo-info">
                <span class="promo-name">${promo.name}</span>
                <span class="promo-value">
                    ${promo.type === 'percentage' ? `${promo.value}%` : `₱${promo.value.toLocaleString()}`}
                </span>
            </div>
            <span class="promo-description">${promo.description}</span>
        </div>
    `).join('');
}

// Display requirements
function displayRequirements(requirements) {
    const requirementsList = document.getElementById('requirementsList');
    
    if (requirements.length === 0) {
        requirementsList.innerHTML = '<p class="no-requirements">No requirements yet</p>';
        return;
    }
    
    requirementsList.innerHTML = requirements.map(req => `
        <div class="requirement-item ${req.status}">
            <div class="requirement-info">
                <span class="requirement-name">${req.name}</span>
                <span class="requirement-due">Due: ${new Date(req.dueDate).toLocaleDateString()}</span>
            </div>
            <span class="requirement-status">${req.status}</span>
        </div>
    `).join('');
}

// Generate form
function generateForm(opportunityId) {
    const opportunity = opportunities.find(opp => opp.id === opportunityId);
    if (!opportunity) return;
    
    // Create form data
    const formData = {
        customerName: opportunity.customerName,
        customerEmail: opportunity.customerEmail,
        customerPhone: opportunity.customerPhone,
        propertyName: opportunity.propertyName,
        propertyPrice: opportunity.propertyPrice,
        reservationDate: opportunity.reservationDate,
        reservationFee: opportunity.reservationFee
    };
    
    // Generate PDF (in real app, this would call a server endpoint)
    console.log('Generating form for:', formData);
    
    // Show success message
    showNotification('Form generated successfully!', 'success');
}

// Update stage
function updateStage(opportunityId) {
    currentOpportunityId = opportunityId;
    const opportunity = opportunities.find(opp => opp.id === opportunityId);
    
    if (opportunity) {
        document.getElementById('newStage').value = opportunity.stage;
    }
    
    stageModal.style.display = 'block';
}

// Close stage modal
function closeStageModal() {
    stageModal.style.display = 'none';
    document.getElementById('stageForm').reset();
}

// Update opportunity stage
function updateOpportunityStage() {
    const newStage = document.getElementById('newStage').value;
    const notes = document.getElementById('stageNotes').value;
    
    if (currentOpportunityId) {
        const opportunity = opportunities.find(opp => opp.id === currentOpportunityId);
        if (opportunity) {
            opportunity.stage = newStage;
            opportunity.notes = notes;
            
            // Refresh the table
            displayOpportunities(opportunities);
            
            showNotification('Stage updated successfully!', 'success');
        }
    }
    
    closeStageModal();
}

// Add customer function
function addCustomer(opportunityId) {
    // Store current opportunity ID for later use
    window.currentOpportunityId = opportunityId;
    
    // Open add customer modal
    document.getElementById('addCustomerModal').style.display = 'block';
}

// Add promo function  
function addPromo(opportunityId) {
    // Store current opportunity ID for later use
    window.currentOpportunityId = opportunityId;
    
    // Open add promo modal
    document.getElementById('addPromoModal').style.display = 'block';
}

// Export opportunities
function exportOpportunities() {
    const filteredOpportunities = getFilteredOpportunities();
    
    // Create CSV content
    let csvContent = "Customer Name,Email,Phone,Property,Price,Stage,Status,Reservation Date,RF Paid\n";
    
    filteredOpportunities.forEach(opp => {
        csvContent += `"${opp.customerName}","${opp.customerEmail}","${opp.customerPhone}","${opp.propertyName}","${opp.propertyPrice}","${opp.stage}","${opp.status}","${opp.reservationDate}","${opp.rfPaid ? 'Yes' : 'No'}"\n`;
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'opportunities.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification('Opportunities exported successfully!', 'success');
}

// Get filtered opportunities
function getFilteredOpportunities() {
    const stageFilterValue = stageFilter.value;
    const statusFilterValue = statusFilter.value;
    
    let filteredOpportunities = opportunities;
    
    if (stageFilterValue) {
        filteredOpportunities = filteredOpportunities.filter(opp => opp.stage === stageFilterValue);
    }
    
    if (statusFilterValue) {
        filteredOpportunities = filteredOpportunities.filter(opp => opp.status === statusFilterValue);
    }
    
    return filteredOpportunities;
}

// Show notification
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

// Add CSS for opportunities page
const additionalStyles = `
    .opportunities-page {
        padding: 0;
    }
    
    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        gap: 1rem;
    }
    
    .header-actions {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
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
    
    .btn-primary {
        padding: 0.5rem 1rem;
        background: #B91C1C;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
    }
    
    .opportunities-table-container {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
    
    .opportunities-table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .opportunities-table th,
    .opportunities-table td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #eee;
    }
    
    .opportunities-table th {
        background: #f8f9fa;
        font-weight: 600;
        color: #333;
    }
    
    .customer-info,
    .property-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .customer-info strong,
    .property-info strong {
        color: #333;
        font-weight: 600;
    }
    
    .customer-info small,
    .property-info small {
        color: #666;
        font-size: 0.8rem;
    }
    
    .customer-count {
        color: #B91C1C !important;
        font-weight: 500;
    }
    
    .customers-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .customer-item {
        padding: 0.75rem;
        background: #f8f9fa;
        border-radius: 6px;
        border-left: 3px solid #B91C1C;
    }
    
    .customer-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    
    .customer-name {
        font-weight: 600;
        color: #333;
    }
    
    .customer-type {
        font-size: 0.75rem;
        background: #B91C1C;
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        text-transform: uppercase;
        font-weight: 500;
    }
    
    .customer-details {
        display: flex;
        gap: 1rem;
        font-size: 0.85rem;
        color: #666;
    }
    
    .sales-team-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .sales-team-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        background: #f8f9fa;
        border-radius: 6px;
    }
    
    .team-role {
        font-weight: 500;
        color: #666;
        font-size: 0.9rem;
    }
    
    .team-name {
        font-weight: 600;
        color: #333;
    }
    
    .payment-terms-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
    }
    
    .payment-term-item {
        padding: 0.75rem;
        background: #f8f9fa;
        border-radius: 6px;
        text-align: center;
    }
    
    .term-label {
        display: block;
        font-size: 0.75rem;
        color: #666;
        font-weight: 500;
        margin-bottom: 0.25rem;
        text-transform: uppercase;
    }
    
    .term-value {
        display: block;
        font-size: 1rem;
        color: #333;
        font-weight: 600;
    }
    
    .promos-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .promo-item {
        padding: 0.75rem;
        background: #e8f5e8;
        border-radius: 6px;
        border-left: 3px solid #28a745;
    }
    
    .promo-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    
    .promo-name {
        font-weight: 600;
        color: #333;
    }
    
    .promo-value {
        font-weight: 600;
        color: #28a745;
        font-size: 1.1rem;
    }
    
    .promo-description {
        font-size: 0.85rem;
        color: #666;
        font-style: italic;
    }
    
    .no-promos {
        text-align: center;
        color: #666;
        font-style: italic;
        padding: 1rem;
    }
    
    .action-buttons {
        display: flex;
        gap: 0.25rem;
        flex-wrap: wrap;
    }
    
    .btn-icon {
        width: 28px;
        height: 28px;
        border: none;
        border-radius: 6px;
        background: #f8f9fa;
        color: #666;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        font-size: 0.8rem;
    }
    
    .btn-icon:hover {
        background: #B91C1C;
        color: white;
    }
    
    .stage-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
        text-transform: uppercase;
    }
    
    .stage-badge.screening {
        background: #fff3cd;
        color: #856404;
    }
    
    .stage-badge.reservation {
        background: #d1ecf1;
        color: #0c5460;
    }
    
    .stage-badge.requirements {
        background: #d4edda;
        color: #155724;
    }
    
    .stage-badge.approval {
        background: #f8d7da;
        color: #721c24;
    }
    
    .stage-badge.ra {
        background: #cce5ff;
        color: #004085;
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
    
    .status-badge.pending {
        background: #fff3cd;
        color: #856404;
    }
    
    .status-badge.completed {
        background: #d1ecf1;
        color: #0c5460;
    }
    
    .status-badge.cancelled {
        background: #f8d7da;
        color: #721c24;
    }
    
    .rf-status {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .rf-status.paid {
        background: #d4edda;
        color: #155724;
    }
    
    .rf-status.unpaid {
        background: #f8d7da;
        color: #721c24;
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
        max-width: 800px;
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
    
    .opportunity-details {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .detail-section h4 {
        margin: 0 0 1rem 0;
        color: #333;
        font-size: 1.1rem;
        font-weight: 600;
    }
    
    .detail-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
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
    
    .requirements-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .requirement-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        border-radius: 6px;
        background: #f8f9fa;
    }
    
    .requirement-item.completed {
        background: #d4edda;
        color: #155724;
    }
    
    .requirement-item.pending {
        background: #fff3cd;
        color: #856404;
    }
    
    .requirement-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .requirement-name {
        font-weight: 500;
    }
    
    .requirement-due {
        font-size: 0.8rem;
        opacity: 0.8;
    }
    
    .requirement-status {
        font-weight: 500;
        text-transform: capitalize;
    }
    
    .no-requirements {
        color: #666;
        font-style: italic;
        text-align: center;
        padding: 1rem;
    }
    
    .modal-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid #eee;
    }
    
    .btn-secondary {
        padding: 0.75rem 1.5rem;
        background: #f8f9fa;
        color: #666;
        border: 1px solid #ddd;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .form-group label {
        font-weight: 500;
        color: #333;
    }
    
    .form-group select,
    .form-group textarea {
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 0.9rem;
    }
    
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #B91C1C;
    }
    
    .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 1rem;
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
        border-left: 4px solid #28a745;
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
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .page-header {
            flex-direction: column;
            align-items: stretch;
        }
        
        .header-actions {
            justify-content: center;
        }
        
        .filters {
            justify-content: center;
        }
        
        .opportunities-table {
            font-size: 0.9rem;
        }
        
        .opportunities-table th,
        .opportunities-table td {
            padding: 0.75rem 0.5rem;
        }
        
        .detail-grid {
            grid-template-columns: 1fr;
        }
        
        .modal-content {
            width: 95%;
            margin: 10% auto;
        }
        
        .action-buttons {
            flex-direction: column;
        }
    }
`;

// Inject opportunities-specific styles
function injectOpportunitiesStyles() {
    // Add styles to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
} 

 