// Dashboard JavaScript

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    // Update active navigation
    setActiveNavigation();
    
    // Load dashboard data
    loadDashboardData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Animate metrics on load
    animateMetrics();
}

function setActiveNavigation() {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to dashboard nav item
    const dashboardNav = document.querySelector('.nav-item:first-child');
    if (dashboardNav) {
        dashboardNav.classList.add('active');
    }
}

function loadDashboardData() {
    // In a real application, this would fetch data from an API
    const dashboardData = {
        stats: {
            totalProperties: 24,
            activeOpportunities: 15,
            rfPayments: 2500000,
            pendingReviews: 8
        },
        recentActivities: [
            {
                type: 'lead',
                title: 'New Lead Created',
                description: 'John Doe - Modern 2BR Condo',
                time: '2 hours ago',
                status: 'success'
            },
            {
                type: 'payment',
                title: 'RF Payment Received',
                description: 'Jane Smith - Family House (₱225,000)',
                time: '1 day ago',
                status: 'success'
            },
            {
                type: 'requirements',
                title: 'Requirements Submitted',
                description: 'Mike Johnson - Townhouse Unit',
                time: '2 days ago',
                status: 'warning'
            },
            {
                type: 'change',
                title: 'Change Request Approved',
                description: 'Sarah Wilson - Payment Term Extension',
                time: '3 days ago',
                status: 'success'
            }
        ]
    };
    
    // Update stats with loaded data
    updateStatsDisplay(dashboardData.stats);
}

function updateStatsDisplay(stats) {
    // Update stat values
    const statElements = document.querySelectorAll('.stat-value');
    
    if (statElements[0]) statElements[0].textContent = stats.totalProperties;
    if (statElements[1]) statElements[1].textContent = stats.activeOpportunities;
    if (statElements[2]) statElements[2].textContent = formatCurrency(stats.rfPayments);
    if (statElements[3]) statElements[3].textContent = stats.pendingReviews;
}

function setupEventListeners() {
    // Time period selector
    const periodSelect = document.querySelector('.period-select');
    if (periodSelect) {
        periodSelect.addEventListener('change', updateDashboardPeriod);
    }
    
    // Refresh button
    const refreshBtn = document.querySelector('.btn-primary');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshDashboard);
    }
    
    // View all activities button
    const viewAllBtn = document.querySelector('.btn-text');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', viewAllActivities);
    }
}

function animateMetrics() {
    // Animate metric cards on load
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }, index * 100);
    });
    
    // Animate progress bars
    setTimeout(() => {
        const progressBars = document.querySelectorAll('.stage-progress, .progress-bar');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }, 800);
}

function exportDashboardData() {
    // Create sample export data
    const exportData = [
        { metric: 'Total Properties', value: '24', change: '+8%' },
        { metric: 'Active Opportunities', value: '15', change: '+12%' },
        { metric: 'RF Payments', value: '₱2.5M', change: '+15%' },
        { metric: 'Pending Reviews', value: '8', change: '-3%' }
    ];
    
    // Generate CSV
    let csvContent = "Metric,Value,Change\n";
    exportData.forEach(row => {
        csvContent += `${row.metric},${row.value},${row.change}\n`;
    });
    
    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification('Dashboard data exported successfully!', 'success');
}

function refreshDashboard() {
    // Show loading state
    showNotification('Refreshing dashboard...', 'info');
    
    // Simulate data refresh
    setTimeout(() => {
        // Reload dashboard data
        loadDashboardData();
        animateMetrics();
        showNotification('Dashboard refreshed successfully!', 'success');
    }, 1000);
}

function updateDashboardPeriod() {
    const periodSelect = document.querySelector('.period-select');
    const selectedPeriod = periodSelect.value;
    
    // Update dashboard based on selected period
    showNotification(`Updated dashboard for: ${selectedPeriod}`, 'info');
    
    // In a real app, this would fetch new data for the selected period
    setTimeout(() => {
        animateMetrics();
    }, 500);
}

function viewAllActivities() {
    // Redirect to opportunities page to view all activities
    window.location.href = 'opportunities.html';
}

function updatePerformanceMetrics() {
    const filter = document.querySelector('.select-filter').value;
    
    // Sample performance data based on filter
    const performanceData = {
        'This Month': {
            conversionRate: 78,
            averageDealSize: 3200000,
            targetAchievement: 92
        },
        'Last Month': {
            conversionRate: 82,
            averageDealSize: 2800000,
            targetAchievement: 88
        },
        'Last 3 Months': {
            conversionRate: 75,
            averageDealSize: 3500000,
            targetAchievement: 95
        }
    };
    
    const data = performanceData[filter] || performanceData['This Month'];
    
    // Update metric values and progress bars
    const metricItems = document.querySelectorAll('.metric-item');
    
    if (metricItems[0]) {
        metricItems[0].querySelector('.metric-value').textContent = `${data.conversionRate}%`;
        metricItems[0].querySelector('.metric-progress').style.width = `${data.conversionRate}%`;
    }
    
    if (metricItems[1]) {
        metricItems[1].querySelector('.metric-value').textContent = formatCurrency(data.averageDealSize);
        metricItems[1].querySelector('.metric-progress').style.width = `${(data.averageDealSize / 5000000) * 100}%`;
    }
    
    if (metricItems[2]) {
        metricItems[2].querySelector('.metric-value').textContent = `${data.targetAchievement}%`;
        metricItems[2].querySelector('.metric-progress').style.width = `${data.targetAchievement}%`;
    }
}

// Utility functions
function formatCurrency(amount) {
    if (amount >= 1000000) {
        return `₱${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
        return `₱${(amount / 1000).toFixed(0)}K`;
    }
    return `₱${amount.toLocaleString()}`;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Add notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 1001;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    }
    
    .notification.success {
        border-left: 4px solid var(--success-color);
        color: var(--success-color);
    }
    
    .notification.info {
        border-left: 4px solid var(--info-color);
        color: var(--info-color);
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
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet); 