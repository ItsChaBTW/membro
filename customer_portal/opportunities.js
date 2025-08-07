// Opportunities Page JavaScript

// Sample opportunities data
const opportunities = [
    {
        id: 'OPP-001',
        title: 'Modern 2BR Condo',
        property: 'Makati City, Metro Manila',
        stage: 'reservation',
        status: 'active',
        price: 2500000,
        date: '2024-01-10',
        progress: 60,
        description: 'Premium condominium unit with modern amenities',
        seller: 'Jane Smith',
        rfAmount: 125000,
        rfPaid: true,
        rfDate: '2024-01-15',
        nextStep: 'Complete document requirements'
    },
    {
        id: 'OPP-002',
        title: 'Family House',
        property: 'Quezon City, Metro Manila',
        stage: 'screening',
        status: 'pending',
        price: 4500000,
        date: '2024-02-01',
        progress: 25,
        description: 'Spacious family house with garden',
        seller: 'Mike Johnson',
        rfAmount: 225000,
        rfPaid: false,
        rfDate: null,
        nextStep: 'Await screening results'
    },
    {
        id: 'OPP-003',
        title: 'Luxury Penthouse',
        property: 'BGC, Taguig',
        stage: 'ra',
        status: 'completed',
        price: 8500000,
        date: '2023-12-01',
        progress: 100,
        description: 'Premium penthouse with city view',
        seller: 'Sarah Wilson',
        rfAmount: 425000,
        rfPaid: true,
        rfDate: '2023-12-15',
        nextStep: 'Agreement signed'
    }
];

let filteredOpportunities = [...opportunities];

// Initialize opportunities page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Opportunities page loaded');
    console.log('Sample opportunities:', opportunities.length);
    
    initializeOpportunities();
    loadOpportunities();
    setupEventListeners();
});

function initializeOpportunities() {
    // Update statistics
    updateOpportunitiesStats();
    
    // Display opportunities
    displayOpportunities();
    
    // Set initial sort
    sortOpportunities();
}

function loadOpportunities() {
    // In a real application, this would fetch data from an API
    console.log('Loading opportunities data...');
    
    // Simulate loading delay
    setTimeout(() => {
        displayOpportunities();
        console.log('Opportunities loaded successfully');
    }, 500);
}

function updateOpportunitiesStats() {
    const totalOpportunities = opportunities.length;
    const activeOpportunities = opportunities.filter(opp => opp.status === 'active').length;
    const pendingOpportunities = opportunities.filter(opp => opp.status === 'pending').length;
    
    // Update stat displays
    const totalElement = document.getElementById('totalOpportunities');
    const activeElement = document.getElementById('activeOpportunities');
    const pendingElement = document.getElementById('pendingOpportunities');
    
    if (totalElement) totalElement.textContent = totalOpportunities;
    if (activeElement) activeElement.textContent = activeOpportunities;
    if (pendingElement) pendingElement.textContent = pendingOpportunities;
}

function displayOpportunities() {
    const container = document.getElementById('opportunitiesContainer');
    
    if (!container) {
        console.error('Opportunities container not found');
        return;
    }
    
    if (filteredOpportunities.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>No Opportunities Found</h3>
                <p>No opportunities match your current filters.</p>
            </div>
        `;
        return;
    }
    
    const opportunitiesHTML = filteredOpportunities.map(opportunity => `
        <div class="opportunity-item" onclick="viewOpportunityDetails('${opportunity.id}')">
            <div class="opportunity-header">
                <div class="opportunity-info">
                    <h3 class="opportunity-title">${opportunity.title}</h3>
                    <p class="opportunity-property">${opportunity.property}</p>
                </div>
                <div class="opportunity-meta">
                    <span class="opportunity-stage ${opportunity.stage}">${formatStage(opportunity.stage)}</span>
                    <span class="opportunity-date">${formatDate(opportunity.date)}</span>
                </div>
            </div>
            <div class="opportunity-details">
                <div class="detail-item">
                    <span class="detail-label">Price</span>
                    <span class="detail-value">₱${formatCurrency(opportunity.price)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Progress</span>
                    <span class="detail-value">${opportunity.progress}%</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Status</span>
                    <span class="detail-value">${formatStatus(opportunity.status)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Seller</span>
                    <span class="detail-value">${opportunity.seller}</span>
                </div>
            </div>
            <div class="opportunity-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${opportunity.progress}%"></div>
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = opportunitiesHTML;
    console.log('Displayed', filteredOpportunities.length, 'opportunities');
}

function setupEventListeners() {
    // Filter change events are handled by the HTML onchange attributes
    console.log('Event listeners setup complete');
}

function applyFilters() {
    const stageFilter = document.getElementById('stageFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    filteredOpportunities = opportunities.filter(opportunity => {
        const stageMatch = !stageFilter || opportunity.stage === stageFilter;
        const statusMatch = !statusFilter || opportunity.status === statusFilter;
        
        return stageMatch && statusMatch;
    });
    
    console.log('Applied filters - Stage:', stageFilter, 'Status:', statusFilter);
    console.log('Filtered results:', filteredOpportunities.length);
    
    displayOpportunities();
}

function sortOpportunities() {
    const sortBy = document.getElementById('sortBy').value;
    
    filteredOpportunities.sort((a, b) => {
        switch (sortBy) {
            case 'date-desc':
                return new Date(b.date) - new Date(a.date);
            case 'date-asc':
                return new Date(a.date) - new Date(b.date);
            case 'property-asc':
                return a.property.localeCompare(b.property);
            case 'property-desc':
                return b.property.localeCompare(a.property);
            case 'stage':
                const stageOrder = ['screening', 'reservation', 'requirements', 'approval', 'ra'];
                return stageOrder.indexOf(a.stage) - stageOrder.indexOf(b.stage);
            default:
                return 0;
        }
    });
    
    console.log('Sorted opportunities by:', sortBy);
    displayOpportunities();
}

function viewOpportunityDetails(opportunityId) {
    const opportunity = opportunities.find(opp => opp.id === opportunityId);
    
    if (!opportunity) {
        console.error('Opportunity not found:', opportunityId);
        return;
    }
    
    // Create modal content
    const modalContent = `
        <div class="opportunity-detail-view">
            <div class="detail-header">
                <h2>${opportunity.title}</h2>
                <span class="opportunity-stage ${opportunity.stage}">${formatStage(opportunity.stage)}</span>
            </div>
            
            <div class="detail-sections">
                <div class="detail-section">
                    <h4>Property Information</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">Location</span>
                            <span class="detail-value">${opportunity.property}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Price</span>
                            <span class="detail-value">₱${formatCurrency(opportunity.price)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Description</span>
                            <span class="detail-value">${opportunity.description}</span>
                        </div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>Progress Information</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">Current Stage</span>
                            <span class="detail-value">${formatStage(opportunity.stage)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Progress</span>
                            <span class="detail-value">${opportunity.progress}%</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Status</span>
                            <span class="detail-value">${formatStatus(opportunity.status)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Next Step</span>
                            <span class="detail-value">${opportunity.nextStep}</span>
                        </div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>Sales Information</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">Seller</span>
                            <span class="detail-value">${opportunity.seller}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">RF Amount</span>
                            <span class="detail-value">₱${formatCurrency(opportunity.rfAmount)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">RF Status</span>
                            <span class="detail-value ${opportunity.rfPaid ? 'success' : 'warning'}">
                                ${opportunity.rfPaid ? 'Paid' : 'Pending'}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">RF Date</span>
                            <span class="detail-value">${opportunity.rfDate ? formatDate(opportunity.rfDate) : 'Not paid'}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="detail-progress">
                <h4>Overall Progress</h4>
                <div class="progress-bar large">
                    <div class="progress-fill" style="width: ${opportunity.progress}%"></div>
                </div>
                <span class="progress-text">${opportunity.progress}% Complete</span>
            </div>
        </div>
    `;
    
    // Update modal content
    const modal = document.getElementById('opportunityModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDetails = document.getElementById('opportunityDetails');
    
    if (modalTitle) modalTitle.textContent = `${opportunity.title} - Details`;
    if (modalDetails) modalDetails.innerHTML = modalContent;
    
    // Show modal
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeOpportunityModal() {
    const modal = document.getElementById('opportunityModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Utility functions
function formatStage(stage) {
    const stages = {
        'screening': 'Screening',
        'reservation': 'Reservation',
        'requirements': 'Requirements',
        'approval': 'Approval',
        'ra': 'RA'
    };
    return stages[stage] || stage;
}

function formatStatus(status) {
    const statuses = {
        'active': 'Active',
        'pending': 'Pending',
        'completed': 'Completed',
        'cancelled': 'Cancelled'
    };
    return statuses[status] || status;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH').format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Inject additional styles for opportunities page
function injectOpportunitiesStyles() {
    const styles = `
        <style>
        .empty-state {
            text-align: center;
            padding: 3rem 1rem;
            color: var(--text-muted);
        }
        
        .empty-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
            opacity: 0.5;
        }
        
        .empty-state h3 {
            margin: 0 0 0.5rem 0;
            color: var(--text-secondary);
        }
        
        .empty-state p {
            margin: 0;
            font-size: 0.875rem;
        }
        
        .opportunity-progress {
            margin-top: 1rem;
        }
        
        .progress-bar.large {
            height: 12px;
            border-radius: 6px;
            margin-bottom: 0.5rem;
        }
        
        .progress-text {
            font-size: 0.875rem;
            color: var(--text-secondary);
            font-weight: 500;
        }
        
        .opportunity-detail-view {
            padding: 1rem 0;
        }
        
        .detail-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid var(--border-color);
        }
        
        .detail-header h2 {
            margin: 0;
            color: var(--text-primary);
        }
        
        .detail-sections {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .detail-section h4 {
            margin: 0 0 1rem 0;
            color: var(--text-primary);
            font-weight: 600;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--border-color);
        }
        
        .detail-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        
        .detail-progress {
            background: var(--bg-secondary);
            border-radius: var(--radius-md);
            padding: 1.5rem;
        }
        
        .detail-progress h4 {
            margin: 0 0 1rem 0;
            color: var(--text-primary);
        }
        
        .detail-value.success {
            color: var(--success-color);
            font-weight: 600;
        }
        
        .detail-value.warning {
            color: var(--warning-color);
            font-weight: 600;
        }
        
        @media (max-width: 768px) {
            .detail-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
            }
            
            .detail-grid {
                grid-template-columns: 1fr;
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Call the function to inject styles
injectOpportunitiesStyles(); 