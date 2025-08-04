// Properties Page JavaScript

// Sample property data
const properties = [
    {
        id: 1,
        name: "Modern 2BR Condo",
        type: "condo",
        price: 2500000,
        location: "Makati City",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop&crop=center",
        description: "Beautiful 2-bedroom condo with modern amenities",
        features: ["2 Bedrooms", "2 Bathrooms", "Balcony", "Parking"],
        status: "available"
    },
    {
        id: 2,
        name: "Family House",
        type: "house",
        price: 4500000,
        location: "Quezon City",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=250&fit=crop&crop=center",
        description: "Spacious family house with garden",
        features: ["3 Bedrooms", "2 Bathrooms", "Garden", "2 Car Garage"],
        status: "available"
    },
    {
        id: 3,
        name: "Townhouse Unit",
        type: "townhouse",
        price: 3200000,
        location: "Taguig City",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop&crop=center",
        description: "Elegant townhouse with modern design",
        features: ["3 Bedrooms", "2.5 Bathrooms", "Terrace", "Security"],
        status: "available"
    },
    {
        id: 4,
        name: "Luxury Penthouse",
        type: "condo",
        price: 8500000,
        location: "Bonifacio Global City",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=250&fit=crop&crop=center",
        description: "Exclusive penthouse with city views",
        features: ["4 Bedrooms", "3 Bathrooms", "City View", "Private Pool"],
        status: "available"
    },
    {
        id: 5,
        name: "Suburban House",
        type: "house",
        price: 3800000,
        location: "Cavite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=250&fit=crop&crop=center",
        description: "Peaceful suburban house with large lot",
        features: ["4 Bedrooms", "3 Bathrooms", "Large Lot", "Garden"],
        status: "available"
    },
    {
        id: 6,
        name: "Studio Condo",
        type: "condo",
        price: 1200000,
        location: "Manila",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=250&fit=crop&crop=center",
        description: "Affordable studio condo for young professionals",
        features: ["Studio", "1 Bathroom", "Balcony", "Security"],
        status: "available"
    }
];

// DOM Elements
const propertiesGrid = document.getElementById('propertiesGrid');
const propertyTypeFilter = document.getElementById('propertyType');
const priceRangeFilter = document.getElementById('priceRange');
const propertySearch = document.getElementById('propertySearch');
const searchClear = document.getElementById('searchClear');
const reservationModal = document.getElementById('reservationModal');
const closeModalBtn = document.querySelector('.close');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Properties page loaded, displaying properties...');
    displayProperties(properties);
    setupEventListeners();
    injectPropertyStyles();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    propertySearch.addEventListener('input', handleSearch);
    searchClear.addEventListener('click', clearSearch);
    
    // Filter button
    document.querySelector('.filter-btn').addEventListener('click', filterProperties);
    
    // Modal close
    closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === reservationModal) {
            closeModal();
        }
    });
    
    // Form submission
    document.getElementById('reservationForm').addEventListener('submit', handleReservationSubmit);
}

// Display properties
function displayProperties(propertiesToShow) {
    console.log('Displaying properties:', propertiesToShow.length, 'properties');
    console.log('Properties grid element:', propertiesGrid);
    
    if (!propertiesGrid) {
        console.error('Properties grid element not found!');
        return;
    }
    
    propertiesGrid.innerHTML = '';
    
    if (propertiesToShow.length === 0) {
        propertiesGrid.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No properties available</p>';
        return;
    }
    
    propertiesToShow.forEach(property => {
        console.log('Creating card for property:', property.name);
        const propertyCard = createPropertyCard(property);
        propertiesGrid.appendChild(propertyCard);
    });
    
    console.log('Properties displayed successfully');
}

// Create property card
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    
    const formattedPrice = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0
    }).format(property.price);
    
    card.innerHTML = `
        <div class="property-image">
            <img src="${property.image}" alt="${property.name}">
            <div class="property-status ${property.status}">${property.status}</div>
        </div>
        <div class="property-content">
            <h3>${property.name}</h3>
            <p class="property-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
            <p class="property-price">${formattedPrice}</p>
            <p class="property-description">${property.description}</p>
            <div class="property-features">
                ${property.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
            <button class="reserve-btn" onclick="openReservationModal(${property.id})">
                <i class="fas fa-handshake"></i>
                Reserve Property
            </button>
        </div>
    `;
    
    return card;
}

// Filter properties
function filterProperties() {
    const typeFilter = propertyTypeFilter.value;
    const priceFilter = priceRangeFilter.value;
    
    let filteredProperties = properties;
    
    // Filter by type
    if (typeFilter) {
        filteredProperties = filteredProperties.filter(property => property.type === typeFilter);
    }
    
    // Filter by price range
    if (priceFilter) {
        const [min, max] = priceFilter.split('-').map(Number);
        filteredProperties = filteredProperties.filter(property => {
            if (priceFilter.includes('+')) {
                return property.price >= min;
            } else {
                return property.price >= min && property.price <= max;
            }
        });
    }
    
    displayProperties(filteredProperties);
}

// Search functionality
function handleSearch() {
    const searchTerm = propertySearch.value.toLowerCase().trim();
    
    // Show/hide clear button
    if (searchTerm.length > 0) {
        searchClear.style.display = 'block';
    } else {
        searchClear.style.display = 'none';
    }
    
    // Filter properties by name
    const filteredProperties = properties.filter(property => 
        property.name.toLowerCase().includes(searchTerm)
    );
    
    displayProperties(filteredProperties);
}

// Clear search
function clearSearch() {
    propertySearch.value = '';
    searchClear.style.display = 'none';
    displayProperties(properties);
}

// Open reservation modal
function openReservationModal(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    // Populate modal with property details
    document.getElementById('modalPropertyImage').src = property.image;
    document.getElementById('modalPropertyName').textContent = property.name;
    document.getElementById('modalPropertyPrice').textContent = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0
    }).format(property.price);
    document.getElementById('modalPropertyLocation').textContent = property.location;
    
    // Set default reservation fee
    document.getElementById('reservationFee').value = Math.round(property.price * 0.05); // 5% of property price
    
    // Set default date to today
    document.getElementById('reservationDate').value = new Date().toISOString().split('T')[0];
    
    // Store property ID for form submission
    document.getElementById('reservationForm').dataset.propertyId = propertyId;
    
    reservationModal.style.display = 'block';
}

// Close modal
function closeModal() {
    reservationModal.style.display = 'none';
    document.getElementById('reservationForm').reset();
}

// Handle reservation form submission
function handleReservationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const propertyId = this.dataset.propertyId;
    const property = properties.find(p => p.id === parseInt(propertyId));
    
    // Create reservation object
    const reservation = {
        propertyId: propertyId,
        propertyName: property.name,
        customerName: formData.get('customerName'),
        customerEmail: formData.get('customerEmail'),
        customerPhone: formData.get('customerPhone'),
        customerAddress: formData.get('customerAddress'),
        reservationDate: formData.get('reservationDate'),
        reservationFee: formData.get('reservationFee'),
        notes: formData.get('notes'),
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    // Save reservation (in real app, this would be sent to server)
    saveReservation(reservation);
    
    // Show success message
    showNotification('Property reserved successfully! Customer will receive payment instructions.', 'success');
    
    // Close modal
    closeModal();
}

// Save reservation
function saveReservation(reservation) {
    // In a real application, this would be sent to the server
    console.log('Reservation saved:', reservation);
    
    // Store in localStorage for demo purposes
    const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    existingReservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(existingReservations));
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
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Inject property-specific styles
function injectPropertyStyles() {
    const additionalStyles = `
    .properties-page {
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
    
    .properties-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2rem;
    }
    
    .property-card {
        background: white;
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-md);
        transition: all 0.3s ease;
        border: 1px solid var(--border-color);
    }
    
    .property-card:hover {
        transform: translateY(-8px);
        box-shadow: var(--shadow-xl);
        border-color: var(--primary-color);
    }
    
    .property-image {
        position: relative;
        height: 220px;
        overflow: hidden;
        border-radius: var(--radius-lg) var(--radius-lg) 0 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .property-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
    
    .property-card:hover .property-image img {
        transform: scale(1.05);
    }
    
    .property-status {
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
        text-transform: uppercase;
    }
    
    .property-status.available {
        background: #28a745;
        color: white;
    }
    
    .property-content {
        padding: 1.5rem;
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    }
    
    .property-content h3 {
        margin: 0 0 0.75rem 0;
        color: var(--text-primary);
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 1.3;
    }
    
    .property-location {
        color: var(--text-secondary);
        font-size: 0.875rem;
        margin: 0 0 0.75rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
    }
    
    .property-price {
        color: var(--primary-color);
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 0.75rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .property-price::before {
        content: '₱';
        font-size: 1.2rem;
        opacity: 0.8;
    }
    
    .property-description {
        color: var(--text-secondary);
        font-size: 0.875rem;
        margin: 0 0 1.25rem 0;
        line-height: 1.5;
    }
    
    .property-features {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }
    
    .feature-tag {
        background: var(--bg-secondary);
        color: var(--text-secondary);
        padding: 0.375rem 0.75rem;
        border-radius: var(--radius-md);
        font-size: 0.75rem;
        font-weight: 500;
        border: 1px solid var(--border-color);
        transition: all 0.2s ease;
    }
    
    .feature-tag:hover {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
    }
    
    .reserve-btn {
        width: 100%;
        padding: 1rem;
        background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
        color: white;
        border: none;
        border-radius: var(--radius-md);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-weight: 600;
        font-size: 0.875rem;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.025em;
    }
    
    .reserve-btn:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
        background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%);
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
        max-width: 600px;
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
    
    .property-summary {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #eee;
    }
    
    .property-summary img {
        width: 100px;
        height: 70px;
        object-fit: cover;
        border-radius: 6px;
    }
    
    .property-details h4 {
        margin: 0 0 0.5rem 0;
        color: #333;
    }
    
    .property-details p {
        margin: 0 0 0.25rem 0;
        color: #666;
        font-size: 0.9rem;
    }
    
    .reservation-form {
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
    .form-group textarea,
    .form-group select {
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 0.9rem;
    }
    
    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
        outline: none;
        border-color: #667eea;
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
        
        .filters {
            justify-content: center;
        }
        
        .properties-grid {
            grid-template-columns: 1fr;
        }
        
        .form-row {
            grid-template-columns: 1fr;
        }
        
        .modal-content {
            width: 95%;
            margin: 10% auto;
        }
    }
`;

    // Add styles to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
} 