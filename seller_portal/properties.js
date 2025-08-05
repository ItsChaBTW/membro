// Properties Page JavaScript

// Sample property data with enhanced fields
const properties = [
    {
        id: 1,
        name: "Modern 2BR Condo",
        type: "condo",
        price: 2500000,
        location: "Makati City",
        project: "Makati 288 Condo",
        area: "65.5",
        rfAmount: 125000,
        images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1560448075-bb485b067938?w=400&h=250&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1560448076-0242-4b5c-bced-4765b1b3e3e7?w=400&h=250&fit=crop&crop=center"
        ],
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
        project: "Quezon Hills Subdivision",
        area: "120.0",
        rfAmount: 225000,
        images: [
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=250&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1570129477535-48c-45c003edd2be?w=400&h=250&fit=crop&crop=center"
        ],
        description: "Spacious family house with garden",
        features: ["3 Bedrooms", "2 Bathrooms", "Garden", "2 Car Garage"],
        status: "available"
    },
    {
        id: 3,
        name: "Commercial Lot",
        type: "lot",
        price: 3200000,
        location: "Taguig City",
        project: "BGC Commercial District",
        area: "200.0",
        rfAmount: 160000,
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop&crop=center"
        ],
        description: "Prime commercial lot in BGC area",
        features: ["Commercial Use", "Main Road Access", "Utilities Ready", "Corner Lot"],
        status: "available"
    },
    {
        id: 4,
        name: "Luxury Penthouse",
        type: "condo",
        price: 8500000,
        location: "Bonifacio Global City",
        project: "BGC Grand Tower",
        area: "150.0",
        rfAmount: 425000,
        images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=250&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=250&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1600607687914-4e2a09cf159d?w=400&h=250&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1600607687908-4e2a09cf159d?w=400&h=250&fit=crop&crop=center"
        ],
        description: "Exclusive penthouse with city views",
        features: ["4 Bedrooms", "3 Bathrooms", "City View", "Private Pool"],
        status: "available"
    },
    {
        id: 5,
        name: "Commercial Space",
        type: "commercial",
        price: 3800000,
        location: "Ortigas Center",
        project: "Ortigas Business Hub",
        area: "85.0",
        rfAmount: 190000,
        images: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=250&fit=crop&crop=center"
        ],
        description: "Prime commercial space in business district",
        features: ["Ground Floor", "High Ceiling", "Parking Slots", "Security"],
        status: "available"
    },
    {
        id: 6,
        name: "Residential Lot",
        type: "lot",
        price: 1200000,
        location: "Antipolo",
        project: "Antipolo Heights",
        area: "300.0",
        rfAmount: 60000,
        images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=250&fit=crop&crop=center"
        ],
        description: "Spacious residential lot with mountain view",
        features: ["Mountain View", "Clean Title", "Gated Community", "Underground Utilities"],
        status: "available"
    }
];

// DOM Elements
const propertiesGrid = document.getElementById('propertiesGrid');
const propertyTypeFilter = document.getElementById('propertyType');
const projectFilter = document.getElementById('projectFilter');
const priceRangeFilter = document.getElementById('priceRange');
const propertySearch = document.getElementById('propertySearch');
const searchClear = document.getElementById('searchClear');
const reservationModal = document.getElementById('reservationModal');
const closeModalBtn = document.querySelector('.close');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    displayProperties(properties);
    populateProjectFilter();
    setupEventListeners();
    injectPropertyStyles();
});



// Populate project filter
function populateProjectFilter() {
    const projects = [...new Set(properties.map(p => p.project))].sort();
    const projectSelect = document.getElementById('projectFilter');
    
    // Clear existing options except the first one
    projectSelect.innerHTML = '<option value="">All Projects</option>';
    
    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project;
        option.textContent = project;
        projectSelect.appendChild(option);
    });
}

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
    
    const formattedRfAmount = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0
    }).format(property.rfAmount);
    
    card.innerHTML = `
        <div class="property-image">
            <div class="image-slider">
                ${property.images.map((img, index) => `
                    <img src="${img}" alt="${property.name}" class="slider-image ${index === 0 ? 'active' : ''}" style="display: ${index === 0 ? 'block' : 'none'}">
                `).join('')}
                ${property.images.length > 1 ? `
                    <button class="slider-btn prev" onclick="changeImage(event, ${property.id}, -1)">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="slider-btn next" onclick="changeImage(event, ${property.id}, 1)">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    <div class="image-indicators">
                        ${property.images.map((_, index) => `
                            <div class="indicator ${index === 0 ? 'active' : ''}" onclick="goToImage(event, ${property.id}, ${index})"></div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="property-status ${property.status}">${property.status}</div>
            <div class="property-type">${property.type.toUpperCase()}</div>
        </div>
        <div class="property-content">
            <h3>${property.name}</h3>
            <p class="property-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
            <p class="property-project"><i class="fas fa-building"></i> ${property.project}</p>
            <div class="property-details-grid">
                <div class="detail-item">
                    <span class="detail-label">Price</span>
                    <span class="detail-value">${formattedPrice}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Area</span>
                    <span class="detail-value">${property.area} sqm</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">RF Amount</span>
                    <span class="detail-value">${formattedRfAmount}</span>
                </div>
            </div>
            <p class="property-description">${property.description}</p>
            <div class="property-features">
                ${property.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
            <button class="reserve-btn" onclick="viewPropertyDetails(${property.id})">
                <i class="fas fa-eye"></i>
                View Details
            </button>
        </div>
    `;
    
    return card;
}

// Change image in slider
function changeImage(event, propertyId, direction) {
    event.stopPropagation();
    const property = properties.find(p => p.id === propertyId);
    const card = event.target.closest('.property-card');
    const images = card.querySelectorAll('.slider-image');
    const indicators = card.querySelectorAll('.indicator');
    
    let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    let newIndex = currentIndex + direction;
    
    if (newIndex >= property.images.length) newIndex = 0;
    if (newIndex < 0) newIndex = property.images.length - 1;
    
    // Update images
    images[currentIndex].classList.remove('active');
    images[currentIndex].style.display = 'none';
    images[newIndex].classList.add('active');
    images[newIndex].style.display = 'block';
    
    // Update indicators
    if (indicators.length > 0) {
        indicators[currentIndex].classList.remove('active');
        indicators[newIndex].classList.add('active');
    }
}

// Go to specific image
function goToImage(event, propertyId, index) {
    event.stopPropagation();
    const card = event.target.closest('.property-card');
    const images = card.querySelectorAll('.slider-image');
    const indicators = card.querySelectorAll('.indicator');
    
    const currentActive = card.querySelector('.slider-image.active');
    const currentIndicator = card.querySelector('.indicator.active');
    
    if (currentActive) {
        currentActive.classList.remove('active');
        currentActive.style.display = 'none';
    }
    if (currentIndicator) {
        currentIndicator.classList.remove('active');
    }
    
    images[index].classList.add('active');
    images[index].style.display = 'block';
    indicators[index].classList.add('active');
}

// Filter properties
function filterProperties() {
    const typeFilter = propertyTypeFilter.value;
    const projectFilterValue = projectFilter.value;
    const priceFilter = priceRangeFilter.value;
    
    let filteredProperties = properties;
    
    // Filter by type
    if (typeFilter) {
        filteredProperties = filteredProperties.filter(property => property.type === typeFilter);
    }
    
    // Filter by project
    if (projectFilterValue) {
        filteredProperties = filteredProperties.filter(property => property.project === projectFilterValue);
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
    document.getElementById('modalPropertyImage').src = property.images[0]; // Use the first image for modal
    document.getElementById('modalPropertyName').textContent = property.name;
    document.getElementById('modalPropertyPrice').textContent = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0
    }).format(property.price);
    document.getElementById('modalPropertyLocation').textContent = property.location;
    document.getElementById('modalPropertyProject').textContent = property.project;
    document.getElementById('modalPropertyArea').textContent = `${property.area} sqm`;
    
    // Populate readonly fields
    document.getElementById('modalLotArea').value = `${property.area} sqm`;
    document.getElementById('modalProjectReadonly').value = property.project;
    document.getElementById('modalTotalPrice').value = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0
    }).format(property.price);
    
    // Set default reservation fee
    document.getElementById('reservationFee').value = property.rfAmount;
    
    // Set default date to today
    document.getElementById('reservationDate').value = new Date().toISOString().split('T')[0];
    
    // Store property ID for form submission
    document.getElementById('reservationForm').dataset.propertyId = propertyId;
    
    reservationModal.style.display = 'block';
}

// View property details
function viewPropertyDetails(propertyId) {
    // Navigate to the property details page
    window.location.href = `property-details.html?id=${propertyId}`;
}



// Handle reservation form submission
function handleReservationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const propertyId = this.dataset.propertyId;
    const property = properties.find(p => p.id === parseInt(propertyId));
    
    // Build customer name from separate fields
    const firstName = formData.get('firstName') || '';
    const middleName = formData.get('middleName') || '';
    const lastName = formData.get('lastName') || '';
    const customerName = `${firstName} ${middleName} ${lastName}`.replace(/\s+/g, ' ').trim();
    
    // Create reservation object
    const reservation = {
        propertyId: propertyId,
        propertyName: property.name,
        customerType: formData.get('customerType'),
        customerName: customerName,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
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
        background: #B91C1C;
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
        background: #B91C1C;
    }
    
    .image-slider {
        position: relative;
        width: 100%;
        height: 100%;
    }
    
    .slider-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
        position: absolute;
        top: 0;
        left: 0;
    }
    
    .property-card:hover .slider-image {
        transform: scale(1.05);
    }
    
    .slider-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0,0,0,0.5);
        color: white;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 2;
    }
    
    .property-card:hover .slider-btn {
        opacity: 1;
    }
    
    .slider-btn.prev {
        left: 10px;
    }
    
    .slider-btn.next {
        right: 10px;
    }
    
    .slider-btn:hover {
        background: rgba(0,0,0,0.7);
    }
    
    .image-indicators {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 5px;
        z-index: 2;
    }
    
    .indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255,255,255,0.5);
        cursor: pointer;
        transition: background 0.3s ease;
    }
    
    .indicator.active {
        background: white;
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
        z-index: 2;
    }
    
    .property-status.available {
        background: #28a745;
        color: white;
    }
    
    .property-type {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        padding: 0.5rem 1rem;
        background: rgba(0,0,0,0.6);
        color: white;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
        text-transform: uppercase;
        z-index: 2;
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
    
    .property-project {
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
        border-color: #B91C1C;
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
        background: #B91C1C;
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
            flex-wrap: wrap;
        }
        
        .properties-grid {
            grid-template-columns: 1fr;
        }
        
        .property-details-grid {
            grid-template-columns: 1fr;
            gap: 0.5rem;
        }
        
        .form-row {
            grid-template-columns: 1fr;
        }
        
        #nameFields.form-row {
            grid-template-columns: 1fr;
        }
        
        .modal-content {
            width: 95%;
            margin: 10% auto;
        }
        
        
        
        .slider-btn {
            width: 25px;
            height: 25px;
        }
        
        .property-type {
            font-size: 0.7rem;
            padding: 0.25rem 0.5rem;
        }
    }

    .property-details-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
        padding: 1rem;
        background: rgba(102, 126, 234, 0.05);
        border-radius: 8px;
        border: 1px solid rgba(102, 126, 234, 0.1);
    }
    
    .detail-item {
        text-align: center;
    }
    
    .detail-label {
        display: block;
        font-size: 0.75rem;
        color: #666;
        font-weight: 500;
        margin-bottom: 0.25rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .detail-value {
        display: block;
        font-size: 0.9rem;
        color: #333;
        font-weight: 600;
    }
    
    .property-details-readonly input {
        background: #f8f9fa !important;
        cursor: not-allowed;
    }
    
    .reservation-form h5 {
        margin: 1.5rem 0 1rem 0;
        color: #333;
        font-size: 1.1rem;
        font-weight: 600;
        border-bottom: 2px solid #B91C1C;
        padding-bottom: 0.5rem;
    }
    
    .reservation-form h5:first-child {
        margin-top: 0;
    }
    
    #nameFields.form-row {
        grid-template-columns: 1fr 1fr 1fr;
    }
    


        /* Header Styles - Professional Layout */
        .top-header {
            background: white;
            padding: 2rem;
            border-bottom: 1px solid #e5e7eb;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .header-content {
            display: grid;
            grid-template-columns: 1fr auto auto;
            gap: 2rem;
            align-items: start;
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .page-title-section {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .page-title {
            color: #111827;
            font-size: 2rem;
            font-weight: 700;
            margin: 0;
            line-height: 1.2;
        }
        
        .page-subtitle {
            color: #6b7280;
            font-size: 1rem;
            margin: 0;
            line-height: 1.5;
        }
        
        .search-filters-section {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            min-width: 600px;
        }
        
        .search-container {
            width: 100%;
        }
        
        .search-input-wrapper {
            position: relative;
            width: 100%;
        }
        
        .search-input {
            width: 100%;
            padding: 0.75rem 1rem 0.75rem 2.25rem;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            font-size: 0.875rem;
            background: #f9fafb;
            transition: all 0.2s ease;
            color: #374151;
        }
        
        .search-input:focus {
            outline: none;
            border-color: #B91C1C;
            background: white;
            box-shadow: 0 0 0 2px rgba(185, 28, 28, 0.1);
        }
        
        .search-input::placeholder {
            color: #9ca3af;
        }
        
        .search-icon {
            position: absolute;
            left: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            color: #9ca3af;
            font-size: 0.875rem;
        }
        
        .search-clear {
            position: absolute;
            right: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #9ca3af;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 4px;
            transition: all 0.2s ease;
            font-size: 0.75rem;
        }
        
        .search-clear:hover {
            background: #e5e7eb;
            color: #6b7280;
        }
        
        .filters-row {
            display: flex;
            gap: 1rem;
            align-items: center;
        }
        
        .filter-select {
            padding: 0.75rem 1rem;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            background: white;
            font-size: 0.875rem;
            color: #374151;
            cursor: pointer;
            transition: all 0.2s ease;
            min-width: 140px;
        }
        
        .filter-select:focus {
            outline: none;
            border-color: #B91C1C;
            box-shadow: 0 0 0 3px rgba(185, 28, 28, 0.1);
        }
        
        .filter-btn {
            padding: 0.75rem 1.5rem;
            background: #B91C1C;
            color: white;
            border: none;
            border-radius: 6px;
            font-weight: 500;
            font-size: 0.875rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            white-space: nowrap;
        }
        
        .filter-btn:hover {
            background: #991B1B;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(185, 28, 28, 0.3);
        }
        
        .header-actions {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-wrapper {
            position: relative;
        }
        
        .notification-btn {
            padding: 0.75rem;
            background: transparent;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            color: #6b7280;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .notification-btn:hover {
            background: #B91C1C;
            color: white;
            border-color: #B91C1C;
        }
        
        .notification-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #B91C1C;
            color: white;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: 600;
        }
        
        /* Responsive Design for Header */
        @media (max-width: 1200px) {
            .header-content {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            
            .search-filters-section {
                min-width: auto;
                width: 100%;
            }
            
            .filters-row {
                flex-wrap: wrap;
            }
            
            .filter-select {
                flex: 1;
                min-width: 120px;
            }
        }
        
        @media (max-width: 768px) {
            .top-header {
                padding: 1.5rem;
            }
            
            .page-title {
                font-size: 1.75rem;
            }
            
            .search-filters-section {
                gap: 0.75rem;
            }
            
            .filters-row {
                flex-direction: column;
                gap: 0.75rem;
            }
            
            .filter-select {
                width: 100%;
                min-width: auto;
            }
            
            .filter-btn {
                width: 100%;
                justify-content: center;
            }
            
            .header-actions {
                justify-content: center;
                margin-top: 1rem;
        }
    }
`;

    // Add styles to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
} 