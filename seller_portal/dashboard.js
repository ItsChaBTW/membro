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

// Reservation management functions
function updateReservationAlerts() {
    console.log('Updating reservation alerts...');
    
    let reservationSummary;
    if (typeof MembroData !== 'undefined' && MembroData.getReservationSummary) {
        reservationSummary = MembroData.getReservationSummary();
    } else {
        // Sample data for testing
        reservationSummary = getSampleReservationSummary();
    }
    
    // Update active reservations count
    const activeReservationsElement = document.getElementById('activeReservations');
    if (activeReservationsElement) {
        activeReservationsElement.textContent = reservationSummary.reserved || 0;
    }
    
    // Update alerts
    updateAlertsList(reservationSummary);
}

function getSampleReservationSummary() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return {
        totalProperties: 5,
        available: 2,
        reserved: 1,
        sold: 1,
        notAvailable: 1,
        activeReservations: [
            {
                id: 'inv_003',
                unitNumber: '23',
                block: '1',
                reservation: {
                    reservationId: 'RES-2024-001',
                    buyerName: 'Maria Santos',
                    buyerPhone: '+63 912 345 6789',
                    expiryDate: tomorrow.toISOString(),
                    status: 'active'
                }
            }
        ],
        expiringReservations: [
            {
                id: 'inv_003',
                unitNumber: '23',
                block: '1',
                reservation: {
                    reservationId: 'RES-2024-001',
                    buyerName: 'Maria Santos',
                    expiryDate: tomorrow.toISOString()
                }
            }
        ]
    };
}

function updateAlertsList(reservationSummary) {
    const alertsList = document.getElementById('reservationAlertsList');
    const alertCount = document.getElementById('alertCount');
    
    if (!alertsList) return;
    
    const alerts = [];
    
    // Check for expiring reservations (within 24 hours)
    if (reservationSummary.expiringReservations && reservationSummary.expiringReservations.length > 0) {
        reservationSummary.expiringReservations.forEach(property => {
            const expiryDate = new Date(property.reservation.expiryDate);
            const hoursRemaining = Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60));
            
            alerts.push({
                type: 'expiring',
                title: `Reservation Expiring Soon`,
                message: `Unit ${property.unitNumber} (Block ${property.block}) reserved by ${property.reservation.buyerName} expires in ${hoursRemaining} hours`,
                urgency: hoursRemaining <= 6 ? 'urgent' : 'warning',
                action: 'property-map.html',
                icon: 'fas fa-clock'
            });
        });
    }
    
    // Check for overdue follow-ups (reservations that need attention)
    if (reservationSummary.activeReservations && reservationSummary.activeReservations.length > 0) {
        reservationSummary.activeReservations.forEach(property => {
            const reservationDate = new Date(property.reservation.reservationDate || Date.now());
            const daysSinceReservation = Math.floor((new Date() - reservationDate) / (1000 * 60 * 60 * 24));
            
            if (daysSinceReservation >= 2) {
                alerts.push({
                    type: 'follow-up',
                    title: `Follow-up Required`,
                    message: `Unit ${property.unitNumber} reserved by ${property.reservation.buyerName} - no recent activity (${daysSinceReservation} days)`,
                    urgency: 'normal',
                    action: 'property-map.html',
                    icon: 'fas fa-phone'
                });
            }
        });
    }
    
    // Update alert count
    if (alertCount) {
        alertCount.textContent = alerts.length === 0 ? '0 alerts' : `${alerts.length} alert${alerts.length !== 1 ? 's' : ''}`;
    }
    
    // Clear existing alerts
    alertsList.innerHTML = '';
    
    if (alerts.length === 0) {
        alertsList.appendChild(createNoAlertsMessage());
    } else {
        alerts.forEach(alert => {
            alertsList.appendChild(createAlertItem(alert));
        });
    }
}

function createNoAlertsMessage() {
    const div = document.createElement('div');
    div.className = 'no-alerts';
    div.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>No reservation alerts at this time</p>
    `;
    return div;
}

function createAlertItem(alert) {
    const div = document.createElement('div');
    div.className = `alert-item ${alert.urgency}`;
    div.innerHTML = `
        <div class="alert-icon">
            <i class="${alert.icon}"></i>
        </div>
        <div class="alert-content">
            <h4>${alert.title}</h4>
            <p>${alert.message}</p>
        </div>
        <div class="alert-actions">
            <button class="alert-action-btn" onclick="window.location.href='${alert.action}'">
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
    return div;
}

function refreshReservations() {
    console.log('Refreshing reservation data...');
    updateReservationAlerts();
    
    // Show loading indicator
    const alertsList = document.getElementById('reservationAlertsList');
    if (alertsList) {
        alertsList.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Refreshing...</div>';
    }
    
    // Simulate loading delay
    setTimeout(() => {
        updateReservationAlerts();
    }, 1000);
}

// Initialize reservation alerts when dashboard loads
document.addEventListener('DOMContentLoaded', function() {
    // Add small delay to ensure DOM is fully loaded
    setTimeout(() => {
        if (document.getElementById('reservationAlertsList')) {
            updateReservationAlerts();
        }
    }, 500);
    
    // Update every 30 seconds
    setInterval(() => {
        if (document.getElementById('reservationAlertsList')) {
            updateReservationAlerts();
        }
    }, 30000);
}); 