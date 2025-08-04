// Notifications Page JavaScript

// Sample notifications data based on the requirements
const notifications = [
    {
        id: 1,
        type: 'customer-paid-rf',
        title: 'Customer Paid RF',
        message: 'John Doe has paid the reservation fee of ₱125,000 for Modern 2BR Condo',
        timestamp: '2024-01-25T14:30:00Z',
        read: false,
        priority: 'high',
        customerName: 'John Doe',
        propertyName: 'Modern 2BR Condo',
        amount: 125000
    },
    {
        id: 2,
        type: 'customer-completed-requirements',
        title: 'Customer Completed Requirements',
        message: 'Jane Smith has submitted all required documents for Family House reservation',
        timestamp: '2024-01-25T10:15:00Z',
        read: false,
        priority: 'medium',
        customerName: 'Jane Smith',
        propertyName: 'Family House',
        requirementsSubmitted: ['Valid ID', 'Income Certificate', 'Bank Statement', 'COE']
    },
    {
        id: 3,
        type: 'customer-no-rf',
        title: 'No RF Submission Deadline Approaching',
        message: 'Mike Johnson has 3 days left to submit RF for Townhouse Unit (Deadline: Jan 28, 2024)',
        timestamp: '2024-01-25T09:00:00Z',
        read: true,
        priority: 'urgent',
        customerName: 'Mike Johnson',
        propertyName: 'Townhouse Unit',
        deadline: '2024-01-28'
    },
    {
        id: 4,
        type: 'cancelled-reservation',
        title: 'Cancelled Reservation',
        message: 'David Brown has cancelled the reservation for Suburban House due to budget constraints',
        timestamp: '2024-01-24T16:45:00Z',
        read: false,
        priority: 'medium',
        customerName: 'David Brown',
        propertyName: 'Suburban House',
        reason: 'Budget constraints'
    },
    {
        id: 5,
        type: 'customer-paid-rf',
        title: 'Customer Paid RF',
        message: 'Sarah Wilson has paid the reservation fee of ₱425,000 for Luxury Penthouse',
        timestamp: '2024-01-24T11:20:00Z',
        read: true,
        priority: 'high',
        customerName: 'Sarah Wilson',
        propertyName: 'Luxury Penthouse',
        amount: 425000
    },
    {
        id: 6,
        type: 'customer-completed-requirements',
        title: 'Customer Completed Requirements',
        message: 'Robert Chen has submitted initial requirements for Studio Condo. Missing: Bank Statement',
        timestamp: '2024-01-24T08:30:00Z',
        read: true,
        priority: 'low',
        customerName: 'Robert Chen',
        propertyName: 'Studio Condo',
        requirementsSubmitted: ['Valid ID', 'Income Certificate'],
        requirementsMissing: ['Bank Statement', 'COE']
    },
    {
        id: 7,
        type: 'customer-no-rf',
        title: 'No RF Submission Deadline Passed',
        message: 'Lisa Garcia missed the RF submission deadline for Condo Unit A (Deadline was: Jan 23, 2024)',
        timestamp: '2024-01-24T00:01:00Z',
        read: false,
        priority: 'urgent',
        customerName: 'Lisa Garcia',
        propertyName: 'Condo Unit A',
        deadline: '2024-01-23',
        overdue: true
    }
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('Notifications page loaded');
    console.log('Sample notifications:', notifications.length);
    initializeNotifications();
    injectNotificationsStyles();
});

function initializeNotifications() {
    displayNotifications(notifications);
    setupEventListeners();
    updateNotificationCounts();
}

function setupEventListeners() {
    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            filterNotifications(this.dataset.filter);
            setActiveTab(this);
        });
    });
}

function displayNotifications(notificationsToShow) {
    const notificationsList = document.getElementById('notificationsList');
    
    if (notificationsToShow.length === 0) {
        notificationsList.innerHTML = `
            <div class="no-notifications">
                <i class="fas fa-bell-slash"></i>
                <h3>No Notifications Found</h3>
                <p>No notifications match your current filter.</p>
            </div>
        `;
        return;
    }
    
    notificationsList.innerHTML = notificationsToShow.map(notification => 
        createNotificationCard(notification)
    ).join('');
}

function createNotificationCard(notification) {
    const timeAgo = getTimeAgo(notification.timestamp);
    const priorityClass = notification.priority;
    const readClass = notification.read ? 'read' : 'unread';
    const typeIcon = getNotificationIcon(notification.type);
    
    return `
        <div class="notification-card ${readClass} ${priorityClass}" data-id="${notification.id}">
            <div class="notification-indicator"></div>
            <div class="notification-icon ${notification.type}">
                ${typeIcon}
            </div>
            <div class="notification-content">
                <div class="notification-header">
                    <h4 class="notification-title">${notification.title}</h4>
                    <div class="notification-meta">
                        <span class="notification-priority ${priorityClass}">${notification.priority}</span>
                        <span class="notification-time">${timeAgo}</span>
                    </div>
                </div>
                <p class="notification-message">${notification.message}</p>
                ${createNotificationDetails(notification)}
            </div>
            <div class="notification-actions">
                <button class="btn-icon" onclick="toggleReadStatus(${notification.id})" title="${notification.read ? 'Mark as unread' : 'Mark as read'}">
                    <i class="fas fa-${notification.read ? 'envelope' : 'envelope-open'}"></i>
                </button>
                <button class="btn-icon" onclick="viewNotificationDetails(${notification.id})" title="View details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon delete" onclick="deleteNotification(${notification.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

function getNotificationIcon(type) {
    const icons = {
        'customer-paid-rf': '<i class="fas fa-credit-card"></i>',
        'customer-completed-requirements': '<i class="fas fa-file-check"></i>',
        'customer-no-rf': '<i class="fas fa-exclamation-triangle"></i>',
        'cancelled-reservation': '<i class="fas fa-times-circle"></i>'
    };
    return icons[type] || '<i class="fas fa-bell"></i>';
}

function createNotificationDetails(notification) {
    let details = '';
    
    switch (notification.type) {
        case 'customer-paid-rf':
            details = `
                <div class="notification-details">
                    <div class="detail-item">
                        <span class="detail-label">Customer:</span>
                        <span class="detail-value">${notification.customerName}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Property:</span>
                        <span class="detail-value">${notification.propertyName}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Amount:</span>
                        <span class="detail-value amount">₱${notification.amount.toLocaleString()}</span>
                    </div>
                </div>
            `;
            break;
            
        case 'customer-completed-requirements':
            const submitted = notification.requirementsSubmitted || [];
            const missing = notification.requirementsMissing || [];
            details = `
                <div class="notification-details">
                    <div class="detail-item">
                        <span class="detail-label">Customer:</span>
                        <span class="detail-value">${notification.customerName}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Property:</span>
                        <span class="detail-value">${notification.propertyName}</span>
                    </div>
                    ${submitted.length > 0 ? `
                    <div class="detail-item">
                        <span class="detail-label">Submitted:</span>
                        <span class="detail-value requirements-list">
                            ${submitted.map(req => `<span class="requirement submitted">${req}</span>`).join('')}
                        </span>
                    </div>
                    ` : ''}
                    ${missing.length > 0 ? `
                    <div class="detail-item">
                        <span class="detail-label">Missing:</span>
                        <span class="detail-value requirements-list">
                            ${missing.map(req => `<span class="requirement missing">${req}</span>`).join('')}
                        </span>
                    </div>
                    ` : ''}
                </div>
            `;
            break;
            
        case 'customer-no-rf':
            const isOverdue = notification.overdue;
            details = `
                <div class="notification-details">
                    <div class="detail-item">
                        <span class="detail-label">Customer:</span>
                        <span class="detail-value">${notification.customerName}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Property:</span>
                        <span class="detail-value">${notification.propertyName}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Deadline:</span>
                        <span class="detail-value deadline ${isOverdue ? 'overdue' : ''}">${formatDate(notification.deadline)}</span>
                    </div>
                </div>
            `;
            break;
            
        case 'cancelled-reservation':
            details = `
                <div class="notification-details">
                    <div class="detail-item">
                        <span class="detail-label">Customer:</span>
                        <span class="detail-value">${notification.customerName}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Property:</span>
                        <span class="detail-value">${notification.propertyName}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Reason:</span>
                        <span class="detail-value">${notification.reason}</span>
                    </div>
                </div>
            `;
            break;
    }
    
    return details;
}

function filterNotifications(filter) {
    let filteredNotifications = notifications;
    
    if (filter !== 'all') {
        filteredNotifications = notifications.filter(notification => notification.type === filter);
    }
    
    displayNotifications(filteredNotifications);
}

function setActiveTab(activeTab) {
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    activeTab.classList.add('active');
}

function toggleReadStatus(notificationId) {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = !notification.read;
        
        // Re-render notifications
        const currentFilter = document.querySelector('.filter-tab.active').dataset.filter;
        filterNotifications(currentFilter);
        updateNotificationCounts();
        
        showNotification(`Notification marked as ${notification.read ? 'read' : 'unread'}`, 'info');
    }
}

function viewNotificationDetails(notificationId) {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
        // Mark as read when viewing
        if (!notification.read) {
            toggleReadStatus(notificationId);
        }
        
        // In a real app, this might open a detailed modal or navigate to a specific page
        showNotification('Opening notification details...', 'info');
    }
}

function deleteNotification(notificationId) {
    const index = notifications.findIndex(n => n.id === notificationId);
    if (index > -1) {
        notifications.splice(index, 1);
        
        // Re-render notifications
        const currentFilter = document.querySelector('.filter-tab.active').dataset.filter;
        filterNotifications(currentFilter);
        updateNotificationCounts();
        
        showNotification('Notification deleted', 'success');
    }
}

function markAllAsRead() {
    notifications.forEach(notification => {
        notification.read = true;
    });
    
    // Re-render notifications
    const currentFilter = document.querySelector('.filter-tab.active').dataset.filter;
    filterNotifications(currentFilter);
    updateNotificationCounts();
    
    showNotification('All notifications marked as read', 'success');
}

function openNotificationSettings() {
    showNotification('Notification settings coming soon...', 'info');
}

function updateNotificationCounts() {
    const unreadCount = notifications.filter(n => !n.read).length;
    
    // Update notification badge in sidebar
    const notificationBadge = document.querySelector('.notification-count');
    if (notificationBadge) {
        notificationBadge.textContent = unreadCount;
        notificationBadge.style.display = unreadCount > 0 ? 'block' : 'none';
    }
    
    // Update filter tab counts
    document.querySelectorAll('.filter-tab').forEach(tab => {
        const filter = tab.dataset.filter;
        let count = 0;
        
        if (filter === 'all') {
            count = notifications.length;
        } else {
            count = notifications.filter(n => n.type === filter).length;
        }
        
        // Remove existing count
        const existingCount = tab.querySelector('.filter-count');
        if (existingCount) {
            existingCount.remove();
        }
        
        // Add new count if > 0
        if (count > 0) {
            const countSpan = document.createElement('span');
            countSpan.className = 'filter-count';
            countSpan.textContent = count;
            tab.appendChild(countSpan);
        }
    });
}

function getTimeAgo(timestamp) {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffMs = now - notificationTime;
    
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
        return `${diffMins}m ago`;
    } else if (diffHours < 24) {
        return `${diffHours}h ago`;
    } else {
        return `${diffDays}d ago`;
    }
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Add notification-specific styles
const notificationStyles = `
    .notification-filters {
        margin-bottom: 2rem;
    }
    
    .filter-tabs {
        display: flex;
        gap: 0.5rem;
        background-color: var(--bg-primary);
        padding: 0.5rem;
        border-radius: var(--radius-lg);
        border: 1px solid var(--border-color);
        overflow-x: auto;
    }
    
    .filter-tab {
        padding: 0.75rem 1rem;
        border: none;
        background: none;
        color: var(--text-secondary);
        border-radius: var(--radius-md);
        cursor: pointer;
        white-space: nowrap;
        font-weight: 500;
        font-size: 0.875rem;
        transition: all 0.2s ease;
        position: relative;
    }
    
    .filter-tab:hover {
        background-color: var(--bg-tertiary);
        color: var(--text-primary);
    }
    
    .filter-tab.active {
        background-color: var(--primary-color);
        color: white;
    }
    
    .filter-count {
        background-color: rgba(255, 255, 255, 0.2);
        color: inherit;
        padding: 0.125rem 0.375rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        margin-left: 0.5rem;
        font-weight: 600;
    }
    
    .filter-tab:not(.active) .filter-count {
        background-color: var(--danger-color);
        color: white;
    }
    
    .notifications-container {
        background-color: var(--bg-primary);
        border-radius: var(--radius-xl);
        border: 1px solid var(--border-color);
        overflow: hidden;
    }
    
    .notifications-list {
        max-height: 70vh;
        overflow-y: auto;
    }
    
    .notification-card {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1.5rem;
        border-bottom: 1px solid var(--border-color);
        transition: all 0.2s ease;
        position: relative;
    }
    
    .notification-card:last-child {
        border-bottom: none;
    }
    
    .notification-card:hover {
        background-color: var(--bg-secondary);
    }
    
    .notification-card.unread {
        background-color: rgba(99, 102, 241, 0.02);
    }
    
    .notification-card.urgent {
        border-left: 4px solid var(--danger-color);
    }
    
    .notification-card.high {
        border-left: 4px solid var(--warning-color);
    }
    
    .notification-card.medium {
        border-left: 4px solid var(--info-color);
    }
    
    .notification-card.low {
        border-left: 4px solid var(--success-color);
    }
    
    .notification-indicator {
        position: absolute;
        top: 1.5rem;
        left: 0.5rem;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--primary-color);
    }
    
    .notification-card.read .notification-indicator {
        display: none;
    }
    
    .notification-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        color: white;
        flex-shrink: 0;
    }
    
    .notification-icon.customer-paid-rf {
        background-color: var(--success-color);
    }
    
    .notification-icon.customer-completed-requirements {
        background-color: var(--info-color);
    }
    
    .notification-icon.customer-no-rf {
        background-color: var(--warning-color);
    }
    
    .notification-icon.cancelled-reservation {
        background-color: var(--danger-color);
    }
    
    .notification-content {
        flex: 1;
    }
    
    .notification-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.5rem;
        gap: 1rem;
    }
    
    .notification-title {
        font-weight: 600;
        color: var(--text-primary);
        font-size: 1rem;
        margin: 0;
    }
    
    .notification-meta {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-shrink: 0;
    }
    
    .notification-priority {
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
    }
    
    .notification-priority.urgent {
        background-color: rgba(239, 68, 68, 0.1);
        color: var(--danger-color);
    }
    
    .notification-priority.high {
        background-color: rgba(245, 158, 11, 0.1);
        color: var(--warning-color);
    }
    
    .notification-priority.medium {
        background-color: rgba(59, 130, 246, 0.1);
        color: var(--info-color);
    }
    
    .notification-priority.low {
        background-color: rgba(16, 185, 129, 0.1);
        color: var(--success-color);
    }
    
    .notification-time {
        color: var(--text-muted);
        font-size: 0.875rem;
    }
    
    .notification-message {
        color: var(--text-secondary);
        margin: 0 0 1rem 0;
        line-height: 1.5;
    }
    
    .notification-details {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color);
    }
    
    .detail-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    
    .detail-label {
        font-weight: 500;
        color: var(--text-secondary);
        font-size: 0.875rem;
        min-width: 80px;
    }
    
    .detail-value {
        color: var(--text-primary);
        font-weight: 500;
        font-size: 0.875rem;
    }
    
    .detail-value.amount {
        color: var(--success-color);
        font-weight: 600;
    }
    
    .detail-value.deadline.overdue {
        color: var(--danger-color);
        font-weight: 600;
    }
    
    .requirements-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
    }
    
    .requirement {
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .requirement.submitted {
        background-color: rgba(16, 185, 129, 0.1);
        color: var(--success-color);
    }
    
    .requirement.missing {
        background-color: rgba(239, 68, 68, 0.1);
        color: var(--danger-color);
    }
    
    .notification-actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        flex-shrink: 0;
    }
    
    .btn-icon {
        width: 36px;
        height: 36px;
        border: 1px solid var(--border-color);
        background-color: var(--bg-primary);
        border-radius: var(--radius-md);
        color: var(--text-secondary);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        font-size: 0.875rem;
    }
    
    .btn-icon:hover {
        background-color: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
    }
    
    .btn-icon.delete:hover {
        background-color: var(--danger-color);
        border-color: var(--danger-color);
    }
    
    .no-notifications {
        text-align: center;
        padding: 4rem 2rem;
        color: var(--text-muted);
    }
    
    .no-notifications i {
        font-size: 4rem;
        margin-bottom: 1rem;
        color: var(--border-color);
    }
    
    .no-notifications h3 {
        margin: 0 0 0.5rem 0;
        color: var(--text-primary);
    }
    
    .no-notifications p {
        margin: 0;
    }
    
    @media (max-width: 768px) {
        .notification-card {
            padding: 1rem;
        }
        
        .notification-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
        
        .notification-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
        }
        
        .notification-actions {
            flex-direction: row;
        }
        
        .detail-item {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .detail-label {
            min-width: auto;
        }
    }
`;

// Inject notifications-specific styles
function injectNotificationsStyles() {
    // Add styles to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);
} 