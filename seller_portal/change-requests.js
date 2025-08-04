// Change Requests Page JavaScript

// Sample change requests data
const changeRequests = [
    {
        id: 1,
        opportunityId: 1,
        customerName: "John Doe",
        propertyName: "Modern 2BR Condo",
        requestType: "deadline",
        currentValue: "2024-02-15",
        newValue: "2024-03-15",
        reason: "Customer needs more time to gather documents",
        status: "pending",
        submittedDate: "2024-01-20",
        customerProof: "john_doe_signature.pdf",
        notes: "Customer is very cooperative and has good payment history"
    },
    {
        id: 2,
        opportunityId: 2,
        customerName: "Jane Smith",
        propertyName: "Family House",
        requestType: "payment",
        currentValue: "20 years, Monthly",
        newValue: "25 years, Quarterly",
        reason: "Customer wants to reduce monthly payment burden",
        status: "approved",
        submittedDate: "2024-01-18",
        customerProof: "jane_smith_consent.pdf",
        notes: "Approved after review of customer's financial capacity"
    },
    {
        id: 3,
        opportunityId: 4,
        customerName: "Sarah Wilson",
        propertyName: "Luxury Penthouse",
        requestType: "property",
        currentValue: "Luxury Penthouse - ₱8,500,000",
        newValue: "Modern 2BR Condo - ₱2,500,000",
        reason: "Customer wants to downgrade due to budget constraints",
        status: "rejected",
        submittedDate: "2024-01-22",
        customerProof: "sarah_wilson_request.pdf",
        notes: "Rejected - property already reserved by another customer"
    }
];

// Sample opportunities for dropdown
const opportunities = [
    { id: 1, customerName: "John Doe", propertyName: "Modern 2BR Condo" },
    { id: 2, customerName: "Jane Smith", propertyName: "Family House" },
    { id: 3, customerName: "Mike Johnson", propertyName: "Townhouse Unit" },
    { id: 4, customerName: "Sarah Wilson", propertyName: "Luxury Penthouse" },
    { id: 5, customerName: "David Brown", propertyName: "Suburban House" }
];

// DOM Elements
const requestsContainer = document.getElementById('requestsContainer');
const opportunitySelect = document.getElementById('opportunitySelect');
const requestTypeSelect = document.getElementById('requestType');
const newRequestModal = document.getElementById('newRequestModal');
const requestDetailsModal = document.getElementById('requestDetailsModal');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Change requests page loaded');
    console.log('Sample change requests:', changeRequests.length);
    console.log('Requests container:', requestsContainer);
    displayChangeRequests(changeRequests);
    loadOpportunities();
    setupEventListeners();
    injectChangeRequestsStyles();
});

// Setup event listeners
function setupEventListeners() {
    // Modal close buttons
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Change request form submission
    document.getElementById('changeRequestForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitChangeRequest();
    });
}

// Display change requests
function displayChangeRequests(requestsToShow) {
    console.log('Displaying change requests:', requestsToShow.length);
    
    if (!requestsContainer) {
        console.error('Requests container not found!');
        return;
    }
    
    requestsContainer.innerHTML = '';
    
    if (requestsToShow.length === 0) {
        requestsContainer.innerHTML = `
            <div class="no-requests">
                <i class="fas fa-inbox"></i>
                <h3>No Change Requests Found</h3>
                <p>No change requests match your current filters.</p>
            </div>
        `;
        return;
    }
    
    requestsToShow.forEach(request => {
        console.log('Creating card for request:', request.customerName);
        const requestCard = createRequestCard(request);
        requestsContainer.appendChild(requestCard);
    });
    
    console.log('Change requests displayed successfully');
}

// Create request card
function createRequestCard(request) {
    const card = document.createElement('div');
    card.className = `request-card ${request.status}`;
    
    const statusBadge = getStatusBadge(request.status);
    const typeIcon = getRequestTypeIcon(request.requestType);
    
    card.innerHTML = `
        <div class="request-header">
            <div class="request-type">
                ${typeIcon}
                <span>${request.requestType.toUpperCase()}</span>
            </div>
            ${statusBadge}
        </div>
        
        <div class="request-content">
            <h3>${request.customerName}</h3>
            <p class="property-name">${request.propertyName}</p>
            
            <div class="request-details">
                <div class="detail-item">
                    <label>Current:</label>
                    <span>${request.currentValue}</span>
                </div>
                <div class="detail-item">
                    <label>Requested:</label>
                    <span>${request.newValue}</span>
                </div>
                <div class="detail-item">
                    <label>Submitted:</label>
                    <span>${formatDate(request.submittedDate)}</span>
                </div>
            </div>
            
            <p class="request-reason">${request.reason}</p>
        </div>
        
        <div class="request-actions">
            <button class="btn-icon" onclick="viewRequestDetails(${request.id})" title="View Details">
                <i class="fas fa-eye"></i>
            </button>
            <button class="btn-icon" onclick="downloadProof(${request.id})" title="Download Proof">
                <i class="fas fa-download"></i>
            </button>
            ${request.status === 'pending' ? `
                <button class="btn-icon approve" onclick="approveRequest(${request.id})" title="Approve">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn-icon reject" onclick="rejectRequest(${request.id})" title="Reject">
                    <i class="fas fa-times"></i>
                </button>
            ` : ''}
        </div>
    `;
    
    return card;
}

// Get status badge
function getStatusBadge(status) {
    const statusConfig = {
        pending: { class: 'pending', text: 'Pending', icon: 'clock' },
        approved: { class: 'approved', text: 'Approved', icon: 'check-circle' },
        rejected: { class: 'rejected', text: 'Rejected', icon: 'times-circle' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return `
        <span class="status-badge ${config.class}">
            <i class="fas fa-${config.icon}"></i>
            ${config.text}
        </span>
    `;
}

// Get request type icon
function getRequestTypeIcon(type) {
    const icons = {
        deadline: 'fas fa-calendar-alt',
        payment: 'fas fa-credit-card',
        property: 'fas fa-building'
    };
    
    return `<i class="${icons[type] || 'fas fa-edit'}"></i>`;
}

// Load opportunities for dropdown
function loadOpportunities() {
    if (!opportunitySelect) return;
    
    opportunitySelect.innerHTML = '<option value="">Choose an opportunity...</option>';
    opportunities.forEach(opp => {
        const option = document.createElement('option');
        option.value = opp.id;
        option.textContent = `${opp.customerName} - ${opp.propertyName}`;
        opportunitySelect.appendChild(option);
    });
}

// Filter requests
function filterRequests() {
    const typeFilter = document.getElementById('requestTypeFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    let filteredRequests = changeRequests;
    
    if (typeFilter) {
        filteredRequests = filteredRequests.filter(request => request.requestType === typeFilter);
    }
    
    if (statusFilter) {
        filteredRequests = filteredRequests.filter(request => request.status === statusFilter);
    }
    
    displayChangeRequests(filteredRequests);
}

// Open new request modal
function openNewRequestModal() {
    newRequestModal.style.display = 'block';
    document.getElementById('changeRequestForm').reset();
}

// Close new request modal
function closeNewRequestModal() {
    newRequestModal.style.display = 'none';
    document.getElementById('changeRequestForm').reset();
}

// Toggle request fields based on type
function toggleRequestFields() {
    const requestType = requestTypeSelect.value;
    
    // Hide all request fields
    document.querySelectorAll('.request-fields').forEach(field => {
        field.style.display = 'none';
    });
    
    // Show relevant fields
    if (requestType === 'deadline') {
        document.getElementById('deadlineFields').style.display = 'block';
    } else if (requestType === 'payment') {
        document.getElementById('paymentFields').style.display = 'block';
    } else if (requestType === 'property') {
        document.getElementById('propertyFields').style.display = 'block';
    }
}

// Submit change request
function submitChangeRequest() {
    const formData = new FormData(document.getElementById('changeRequestForm'));
    
    // Validate form
    if (!validateChangeRequestForm(formData)) {
        return;
    }
    
    // Create request object
    const request = {
        id: changeRequests.length + 1,
        opportunityId: parseInt(formData.get('opportunityId')),
        customerName: getOpportunityCustomerName(formData.get('opportunityId')),
        propertyName: getOpportunityPropertyName(formData.get('opportunityId')),
        requestType: formData.get('requestType'),
        currentValue: getCurrentValue(formData),
        newValue: getNewValue(formData),
        reason: getReason(formData),
        status: 'pending',
        submittedDate: new Date().toISOString().split('T')[0],
        customerProof: formData.get('customerProof').name,
        notes: formData.get('additionalNotes')
    };
    
    // Add to requests array
    changeRequests.push(request);
    
    // Refresh display
    displayChangeRequests(changeRequests);
    
    // Show success message
    showNotification('Change request submitted successfully!', 'success');
    
    // Close modal
    closeNewRequestModal();
}

// Validate form
function validateChangeRequestForm(formData) {
    const opportunityId = formData.get('opportunityId');
    const requestType = formData.get('requestType');
    const customerProof = formData.get('customerProof');
    
    if (!opportunityId) {
        showNotification('Please select an opportunity', 'error');
        return false;
    }
    
    if (!requestType) {
        showNotification('Please select a request type', 'error');
        return false;
    }
    
    if (!customerProof.name) {
        showNotification('Please upload customer proof', 'error');
        return false;
    }
    
    return true;
}

// Get opportunity customer name
function getOpportunityCustomerName(opportunityId) {
    const opportunity = opportunities.find(opp => opp.id === parseInt(opportunityId));
    return opportunity ? opportunity.customerName : '';
}

// Get opportunity property name
function getOpportunityPropertyName(opportunityId) {
    const opportunity = opportunities.find(opp => opp.id === parseInt(opportunityId));
    return opportunity ? opportunity.propertyName : '';
}

// Get current value based on request type
function getCurrentValue(formData) {
    const requestType = formData.get('requestType');
    
    if (requestType === 'deadline') {
        return formData.get('currentDeadline');
    } else if (requestType === 'payment') {
        return `${formData.get('currentPaymentYears')} years, ${formData.get('currentPaymentTerm')}`;
    } else if (requestType === 'property') {
        return formData.get('currentProperty');
    }
    
    return '';
}

// Get new value based on request type
function getNewValue(formData) {
    const requestType = formData.get('requestType');
    
    if (requestType === 'deadline') {
        return formData.get('newDeadline');
    } else if (requestType === 'payment') {
        return `${formData.get('newPaymentYears')} years, ${formData.get('newPaymentTerm')}`;
    } else if (requestType === 'property') {
        return formData.get('newProperty');
    }
    
    return '';
}

// Get reason based on request type
function getReason(formData) {
    const requestType = formData.get('requestType');
    
    if (requestType === 'deadline') {
        return formData.get('deadlineReason');
    } else if (requestType === 'payment') {
        return formData.get('paymentReason');
    } else if (requestType === 'property') {
        return formData.get('propertyReason');
    }
    
    return '';
}

// View request details
function viewRequestDetails(requestId) {
    const request = changeRequests.find(req => req.id === requestId);
    if (!request) return;
    
    const detailsContainer = document.getElementById('requestDetails');
    
    detailsContainer.innerHTML = `
        <div class="request-detail-section">
            <h4>Request Information</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <label>Customer:</label>
                    <span>${request.customerName}</span>
                </div>
                <div class="detail-item">
                    <label>Property:</label>
                    <span>${request.propertyName}</span>
                </div>
                <div class="detail-item">
                    <label>Request Type:</label>
                    <span>${request.requestType.toUpperCase()}</span>
                </div>
                <div class="detail-item">
                    <label>Status:</label>
                    <span class="status-badge ${request.status}">${request.status}</span>
                </div>
            </div>
        </div>
        
        <div class="request-detail-section">
            <h4>Change Details</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <label>Current Value:</label>
                    <span>${request.currentValue}</span>
                </div>
                <div class="detail-item">
                    <label>Requested Value:</label>
                    <span>${request.newValue}</span>
                </div>
                <div class="detail-item">
                    <label>Reason:</label>
                    <span>${request.reason}</span>
                </div>
                <div class="detail-item">
                    <label>Submitted Date:</label>
                    <span>${formatDate(request.submittedDate)}</span>
                </div>
            </div>
        </div>
        
        <div class="request-detail-section">
            <h4>Additional Information</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <label>Customer Proof:</label>
                    <span>${request.customerProof}</span>
                </div>
                <div class="detail-item">
                    <label>Notes:</label>
                    <span>${request.notes || 'No additional notes'}</span>
                </div>
            </div>
        </div>
    `;
    
    requestDetailsModal.style.display = 'block';
}

// Download proof
function downloadProof(requestId) {
    const request = changeRequests.find(req => req.id === requestId);
    if (!request) return;
    
    // In a real app, this would download the actual file
    showNotification(`Downloading ${request.customerProof}...`, 'info');
}

// Approve request
function approveRequest(requestId) {
    const request = changeRequests.find(req => req.id === requestId);
    if (!request) return;
    
    request.status = 'approved';
    displayChangeRequests(changeRequests);
    showNotification('Request approved successfully!', 'success');
}

// Reject request
function rejectRequest(requestId) {
    const request = changeRequests.find(req => req.id === requestId);
    if (!request) return;
    
    request.status = 'rejected';
    displayChangeRequests(changeRequests);
    showNotification('Request rejected', 'info');
}

// Add CSS for change requests
const additionalStyles = `
    .change-requests-page {
        padding: 0;
    }
    
    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }
    
    .filters-section {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
    
    .filters {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
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
    
    .requests-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 1.5rem;
    }
    
    .request-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .request-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(0,0,0,0.12);
    }
    
    .request-card.pending {
        border-left: 4px solid #ffc107;
    }
    
    .request-card.approved {
        border-left: 4px solid #28a745;
    }
    
    .request-card.rejected {
        border-left: 4px solid #dc3545;
    }
    
    .request-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .request-type {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        color: #333;
    }
    
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    
    .status-badge.pending {
        background: #fff3cd;
        color: #856404;
    }
    
    .status-badge.approved {
        background: #d4edda;
        color: #155724;
    }
    
    .status-badge.rejected {
        background: #f8d7da;
        color: #721c24;
    }
    
    .request-content h3 {
        margin: 0 0 0.5rem 0;
        color: #333;
        font-size: 1.1rem;
    }
    
    .property-name {
        color: #666;
        font-size: 0.9rem;
        margin: 0 0 1rem 0;
    }
    
    .request-details {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .detail-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
    
    .request-reason {
        color: #666;
        font-size: 0.9rem;
        font-style: italic;
        margin: 0 0 1rem 0;
        line-height: 1.4;
    }
    
    .request-actions {
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
        font-size: 0.9rem;
    }
    
    .btn-icon {
        background: #f8f9fa;
        color: #666;
    }
    
    .btn-icon:hover {
        background: #667eea;
        color: white;
    }
    
    .btn-icon.approve:hover {
        background: #28a745;
    }
    
    .btn-icon.reject:hover {
        background: #dc3545;
    }
    
    .no-requests {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        color: #666;
    }
    
    .no-requests i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #ddd;
    }
    
    .no-requests h3 {
        margin: 0 0 0.5rem 0;
        color: #333;
    }
    
    .no-requests p {
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
    
    .change-request-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    
    .form-group label {
        font-weight: 500;
        color: #333;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 0.9rem;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #667eea;
    }
    
    .form-group small {
        color: #666;
        font-size: 0.8rem;
    }
    
    .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 1rem;
    }
    
    .btn-primary,
    .btn-secondary {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
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
    
    .request-detail-section {
        margin-bottom: 2rem;
    }
    
    .request-detail-section h4 {
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
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .page-header {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
        }
        
        .filters {
            justify-content: center;
        }
        
        .requests-container {
            grid-template-columns: 1fr;
        }
        
        .form-row {
            grid-template-columns: 1fr;
        }
        
        .detail-grid {
            grid-template-columns: 1fr;
        }
        
        .modal-content {
            width: 95%;
            margin: 10% auto;
        }
    }
`;

// Inject change requests specific styles
function injectChangeRequestsStyles() {
    // Add styles to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
} 