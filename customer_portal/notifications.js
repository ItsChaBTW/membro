// Notifications Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize notification filters
    initializeFilters();
    
    // Add click handlers for notification items
    addNotificationHandlers();
});

// Initialize filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const notificationItems = document.querySelectorAll('.notification-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter notification items
            filterNotifications(filter, notificationItems);
        });
    });
}

// Filter notifications based on selected category
function filterNotifications(filter, items) {
    items.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'flex';
        } else {
            if (item.classList.contains(filter)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        }
    });
    
    // Show empty state if no notifications match filter
    showEmptyStateIfNeeded(filter, items);
}

// Show empty state when no notifications match filter
function showEmptyStateIfNeeded(filter, items) {
    const notificationsList = document.querySelector('.notifications-list');
    let visibleCount = 0;
    
    items.forEach(item => {
        if (item.style.display !== 'none') {
            visibleCount++;
        }
    });
    
    // Remove existing empty state
    const existingEmpty = notificationsList.querySelector('.notifications-empty');
    if (existingEmpty) {
        existingEmpty.remove();
    }
    
    // Add empty state if no notifications are visible
    if (visibleCount === 0) {
        const emptyState = createEmptyState(filter);
        notificationsList.appendChild(emptyState);
    }
}

// Create empty state element
function createEmptyState(filter) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'notifications-empty';
    
    const icon = document.createElement('i');
    icon.className = 'fas fa-bell-slash';
    
    const title = document.createElement('h3');
    title.textContent = `No ${filter === 'all' ? '' : filter} notifications`;
    
    const description = document.createElement('p');
    description.textContent = filter === 'all' 
        ? 'You\'re all caught up! No notifications at the moment.'
        : `No ${filter} notifications at the moment.`;
    
    emptyDiv.appendChild(icon);
    emptyDiv.appendChild(title);
    emptyDiv.appendChild(description);
    
    return emptyDiv;
}

// Add click handlers for notification items
function addNotificationHandlers() {
    const notificationItems = document.querySelectorAll('.notification-item');
    
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            // Mark as read if unread
            if (this.classList.contains('unread')) {
                markAsRead(this);
            }
            
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Mark notification as read
function markAsRead(notificationItem) {
    notificationItem.classList.remove('unread');
    
    // Remove unread dot
    const unreadDot = notificationItem.querySelector('.unread-dot');
    if (unreadDot) {
        unreadDot.remove();
    }
    
    // Update notification count in sidebar
    updateNotificationCount();
}

// Update notification count in sidebar
function updateNotificationCount() {
    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
    const notificationCount = document.querySelector('.notification-count');
    
    if (notificationCount) {
        const count = unreadNotifications.length;
        if (count > 0) {
            notificationCount.textContent = count;
            notificationCount.style.display = 'inline';
        } else {
            notificationCount.style.display = 'none';
        }
    }
}

// Mark all notifications as read
function markAllAsRead() {
    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
    
    unreadNotifications.forEach(item => {
        item.classList.remove('unread');
        const unreadDot = item.querySelector('.unread-dot');
        if (unreadDot) {
            unreadDot.remove();
        }
    });
    
    updateNotificationCount();
}

// Add notification (for demo purposes)
function addNotification(type, title, message, time) {
    const notificationsList = document.querySelector('.notifications-list');
    
    const notificationItem = document.createElement('div');
    notificationItem.className = `notification-item unread ${type}`;
    
    const iconClass = type === 'payment' ? 'fas fa-credit-card' : 
                     type === 'document' ? 'fas fa-file-alt' : 
                     'fas fa-building';
    
    notificationItem.innerHTML = `
        <div class="notification-icon ${type}">
            <i class="${iconClass}"></i>
        </div>
        <div class="notification-content">
            <h4>${title}</h4>
            <p>${message}</p>
            <span class="notification-time">${time}</span>
        </div>
        <div class="notification-status">
            <span class="unread-dot"></span>
        </div>
    `;
    
    // Add to the beginning of the list
    notificationsList.insertBefore(notificationItem, notificationsList.firstChild);
    
    // Add click handler
    notificationItem.addEventListener('click', function() {
        if (this.classList.contains('unread')) {
            markAsRead(this);
        }
    });
    
    // Update notification count
    updateNotificationCount();
    
    // Add animation
    notificationItem.style.opacity = '0';
    notificationItem.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        notificationItem.style.transition = 'all 0.3s ease';
        notificationItem.style.opacity = '1';
        notificationItem.style.transform = 'translateY(0)';
    }, 100);
}

// Initialize notification count on page load
updateNotificationCount(); 