// Property Details Page JavaScript

// Import properties data from the main file
// In a real application, this would be fetched from an API
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
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&h=600&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1560448076-0242-4b5c-bced-4765b1b3e3e7?w=800&h=600&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop&crop=center"
        ],
        description: "Beautiful 2-bedroom condo with modern amenities and stunning city views. Perfect for professionals or small families looking for convenience and luxury in the heart of Makati.",
        features: ["2 Bedrooms", "2 Bathrooms", "Balcony", "Parking", "Swimming Pool", "Gym", "24/7 Security"],
        status: "available"
    },
    {
        id: 2,
        name: "Family House",
        type: "house",
        price: 4500000,
        location: "Quezon City",
        project: "Green Valley Homes",
        area: "120.0",
        rfAmount: 225000,
        images: [
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center"
        ],
        description: "Spacious family house in a quiet residential area with garden space and modern amenities. Ideal for growing families.",
        features: ["3 Bedrooms", "2 Bathrooms", "Garden", "Garage", "Modern Kitchen"],
        status: "available"
    },
    {
        id: 3,
        name: "Townhouse Unit",
        type: "house",
        price: 3200000,
        location: "Taguig City",
        project: "Metro Town Square",
        area: "90.0",
        rfAmount: 160000,
        images: [
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop&crop=center"
        ],
        description: "Modern townhouse with contemporary design and premium finishes. Located in a secured subdivision.",
        features: ["2 Bedrooms", "1.5 Bathrooms", "Small Garden", "Parking", "Security"],
        status: "reserved"
    },
    {
        id: 4,
        name: "Luxury Penthouse",
        type: "condo",
        price: 8500000,
        location: "Bonifacio Global City",
        project: "BGC Sky Tower",
        area: "150.0",
        rfAmount: 425000,
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&crop=center"
        ],
        description: "Stunning penthouse with panoramic city views and luxury amenities. The epitome of urban living.",
        features: ["3 Bedrooms", "3 Bathrooms", "Large Balcony", "City View", "Premium Finishes", "Concierge Service"],
        status: "available"
    },
    {
        id: 5,
        name: "Commercial Lot",
        type: "lot",
        price: 15000000,
        location: "Ortigas Center",
        project: "Ortigas Business District",
        area: "500.0",
        rfAmount: 750000,
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&crop=center"
        ],
        description: "Prime commercial lot in the heart of Ortigas business district. Perfect for commercial development.",
        features: ["Commercial Zoning", "Prime Location", "High Foot Traffic", "Near Transportation"],
        status: "available"
    }
];

let currentProperty = null;
let currentImageIndex = 0;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Property details page loaded');
    
    // Get property ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = parseInt(urlParams.get('id'));
    
    if (propertyId) {
        loadPropertyDetails(propertyId);
    } else {
        showError('No property ID provided');
        return;
    }
    
    setupEventListeners();
    injectPropertyDetailStyles();
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
    document.getElementById('reservationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleReservationSubmit();
    });
}

// Load property details
function loadPropertyDetails(propertyId) {
    currentProperty = properties.find(prop => prop.id === propertyId);
    
    if (!currentProperty) {
        showError('Property not found');
        return;
    }
    
    displayPropertyDetails(currentProperty);
}

// Display property details
function displayPropertyDetails(property) {
    // Update page title
    document.getElementById('propertyTitle').textContent = property.name;
    
    // Update status and type badges
    document.getElementById('propertyStatus').textContent = property.status.charAt(0).toUpperCase() + property.status.slice(1);
    document.getElementById('propertyStatus').className = `status-badge ${property.status}`;
    
    document.getElementById('propertyType').textContent = property.type.toUpperCase();
    document.getElementById('propertyType').className = `type-badge ${property.type}`;
    
    // Update property information
    document.getElementById('propertyName').textContent = property.name;
    document.getElementById('project').textContent = property.project;
    document.getElementById('location').textContent = property.location;
    document.getElementById('type').textContent = property.type.charAt(0).toUpperCase() + property.type.slice(1);
    document.getElementById('area').textContent = `${property.area} sqm`;
    document.getElementById('status').textContent = property.status.charAt(0).toUpperCase() + property.status.slice(1);
    document.getElementById('description').textContent = property.description;
    
    // Update pricing information
    document.getElementById('price').textContent = formatCurrency(property.price);
    document.getElementById('rfAmount').textContent = formatCurrency(property.rfAmount);
    
    const pricePerSqm = property.price / parseFloat(property.area);
    document.getElementById('pricePerSqm').textContent = formatCurrency(pricePerSqm);
    
    // Display images
    displayImages(property.images);
    
    // Display features
    displayFeatures(property.features);
}

// Display images
function displayImages(images) {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.getElementById('imageThumbnails');
    
    // Set main image
    mainImage.innerHTML = `<img src="${images[0]}" alt="Property Image" class="main-property-image">`;
    
    // Set thumbnails
    thumbnails.innerHTML = images.map((img, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="selectImage(${index})">
            <img src="${img}" alt="Property Image ${index + 1}">
        </div>
    `).join('');
    
    currentImageIndex = 0;
}

// Display features
function displayFeatures(features) {
    const featuresContainer = document.getElementById('featuresContainer');
    
    featuresContainer.innerHTML = `
        <div class="features-grid">
            ${features.map(feature => `
                <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>${feature}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Image navigation functions
function selectImage(index) {
    if (!currentProperty || index >= currentProperty.images.length) return;
    
    currentImageIndex = index;
    
    // Update main image
    const mainImage = document.getElementById('mainImage');
    mainImage.innerHTML = `<img src="${currentProperty.images[index]}" alt="Property Image" class="main-property-image">`;
    
    // Update thumbnails
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

function previousImage() {
    if (!currentProperty) return;
    
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : currentProperty.images.length - 1;
    selectImage(currentImageIndex);
}

function nextImage() {
    if (!currentProperty) return;
    
    currentImageIndex = currentImageIndex < currentProperty.images.length - 1 ? currentImageIndex + 1 : 0;
    selectImage(currentImageIndex);
}

// Reservation functions
function openReservationForm() {
    if (!currentProperty) return;
    
    // Pre-populate form
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('reservationDate').value = today;
    document.getElementById('reservationFee').value = currentProperty.rfAmount;
    
    document.getElementById('reservationModal').style.display = 'block';
}

function closeReservationForm() {
    document.getElementById('reservationModal').style.display = 'none';
    document.getElementById('reservationForm').reset();
}

function handleReservationSubmit() {
    const formData = new FormData(document.getElementById('reservationForm'));
    
    const reservationData = {
        propertyId: currentProperty.id,
        propertyName: currentProperty.name,
        customerType: formData.get('customerType'),
        firstName: formData.get('firstName'),
        middleName: formData.get('middleName'),
        lastName: formData.get('lastName'),
        email: formData.get('customerEmail'),
        phone: formData.get('customerPhone'),
        address: formData.get('customerAddress'),
        reservationDate: formData.get('reservationDate'),
        reservationFee: formData.get('reservationFee'),
        notes: formData.get('notes')
    };
    
    console.log('Reservation submitted:', reservationData);
    
    // In a real app, this would send to API
    showNotification('Property reservation submitted successfully!', 'success');
    closeReservationForm();
    
    // Redirect to opportunities page
    setTimeout(() => {
        window.location.href = 'opportunities.html';
    }, 2000);
}

// Payment calculator functions
function openPaymentCalculator() {
    // Redirect to payment calculator page with current property data
    if (currentProperty) {
        window.open(`payment-calculator.html?propertyId=${currentProperty.id}`, '_blank');
        } else {
        window.open('payment-calculator.html', '_blank');
    }
}







// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0
    }).format(amount);
}

function showError(message) {
    console.error(message);
    document.querySelector('.dashboard-content').innerHTML = `
        <div class="error-state">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Error</h3>
            <p>${message}</p>
            <a href="properties.html" class="btn btn-primary">
                <i class="fas fa-arrow-left"></i>
                Back to Properties
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

// Inject styles specific to property detail page
function injectPropertyDetailStyles() {
    const additionalStyles = `
        /* Main Layout Fixes */
        .portal-container {
            display: flex;
            min-height: 100vh;
            background: #f8fafc;
        }
        
        .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
        }
        
        .dashboard-content {
            flex: 1;
            padding: 1rem;
            max-width: 100%;
            margin: 0;
        }
        
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
        
        .property-form-container {
            max-width: 100%;
            margin: 0;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            border: 1px solid #f3f4f6;
            width: 100%;
        }
        
        .images-section {
            padding: 1rem;
            border-bottom: 1px solid #e5e7eb;
            background: #f9fafb;
        }
        
        .main-image-container {
            position: relative;
            width: 100%;
            height: 500px;
            border-radius: 12px;
            overflow: hidden;
            background: #B91C1C;
            margin-bottom: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .main-image {
            width: 100%;
            height: 100%;
            position: relative;
        }
        
        .main-property-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        
        .image-controls {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 1rem;
            pointer-events: none;
            z-index: 10;
        }
        
        .image-nav-btn {
            background: rgba(0,0,0,0.6);
            color: white;
            border: none;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            pointer-events: all;
            transition: all 0.3s ease;
            font-size: 1.125rem;
        }
        
        .image-nav-btn:hover {
            background: rgba(0,0,0,0.8);
            transform: scale(1.1);
        }
        
        .image-thumbnails {
            display: flex;
            gap: 0.75rem;
            overflow-x: auto;
            padding: 0.5rem;
            margin-top: 1rem;
        }
        
        .thumbnail {
            flex-shrink: 0;
            width: 100px;
            height: 75px;
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
            border: 3px solid transparent;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .thumbnail.active {
            border-color: #B91C1C;
            box-shadow: 0 4px 8px rgba(185, 28, 28, 0.3);
        }
        
        .thumbnail:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .thumbnail img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        
        .status-bar {
            padding: 1rem 2rem;
            background: #B91C1C;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .property-status {
            display: flex;
            gap: 1rem;
            align-items: center;
        }
        
        .status-badge {
            background: rgba(255,255,255,0.2);
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .type-badge {
            background: rgba(255,255,255,0.1);
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.875rem;
        }
        
        .form-section {
            padding: 1rem;
        }
        
        .section-header {
            margin-bottom: 1.5rem;
        }
        
        .section-header h2 {
            color: #374151;
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0;
        }
        
        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
        }
        
        .form-field {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .form-field.full-width {
            grid-column: 1 / -1;
        }
        
        .form-field label {
            color: #4b5563;
            font-weight: 500;
            font-size: 0.875rem;
        }
        
        .field-value {
            color: #111827;
            font-weight: 600;
            padding: 0.75rem;
            background: #f9fafb;
            border-radius: 6px;
            border-bottom: 2px solid #e5e7eb;
            min-height: 20px;
        }
        
        .field-value.amount {
            color: #10B981;
        }
        
        .field-value.status {
            color: #B91C1C;
        }
        
        .features-section {
            padding: 1rem;
            border-top: 1px solid #e5e7eb;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        
        .feature-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem;
            background: #fef2f2;
            border-radius: 8px;
            border-left: 4px solid #B91C1C;
        }
        
        .feature-item i {
            color: #B91C1C;
            font-size: 1.125rem;
        }
        
        .feature-item span {
            color: #374151;
            font-weight: 500;
        }
        
        /* Header Styles */
        .top-header {
            background: white;
            padding: 1rem;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .header-left {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .page-title {
            color: #111827;
            font-size: 1.875rem;
            font-weight: 700;
            margin: 0;
        }
        
        .page-subtitle {
            color: #6b7280;
            font-size: 1rem;
            margin: 0;
        }
        
        .header-right {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .header-actions {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            border: none;
            transition: all 0.3s ease;
            font-size: 0.875rem;
        }
        
        .btn-primary {
            background: #B91C1C;
            color: white;
        }
        
        .btn-primary:hover {
            background: #991B1B;
            box-shadow: 0 4px 12px rgba(185, 28, 28, 0.3);
        }
        
        .btn-outline {
            background: transparent;
            color: #374151;
            border: 1px solid #d1d5db;
        }
        
        .btn-outline:hover {
            background: #f9fafb;
            border-color: #B91C1C;
            color: #B91C1C;
        }
        
        .btn-icon {
            padding: 0.5rem;
            border-radius: 6px;
            background: transparent;
            color: #6b7280;
            border: 1px solid #d1d5db;
        }
        
        .btn-icon:hover {
            background: #B91C1C;
            color: white;
            border-color: #B91C1C;
        }
        
        .notification-wrapper {
            position: relative;
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
        
        /* Responsive Design */
        @media (max-width: 1024px) {
            .dashboard-content {
                padding: 1.5rem;
            }
            
            .property-form-container {
                margin: 0 1rem;
            }
            
            .form-grid {
                grid-template-columns: 1fr;
            }
        }
        
        @media (max-width: 768px) {
            .dashboard-content {
                padding: 1rem;
            }
            
            .property-form-container {
                margin: 0;
                border-radius: 0;
            }
            
            .images-section,
            .form-section,
            .features-section {
                padding: 1rem;
            }
            
            .main-image-container {
                height: 350px;
                border-radius: 8px;
            }
            
            .image-nav-btn {
                width: 40px;
                height: 40px;
                font-size: 1rem;
            }
            
            .thumbnail {
                width: 80px;
                height: 60px;
            }
            
            .top-header {
                padding: 1rem;
                flex-direction: column;
                align-items: flex-start;
            }
            
            .header-actions {
                width: 100%;
                justify-content: flex-start;
            }
            
            .page-title {
                font-size: 1.5rem;
            }
        }
        
        @media (max-width: 480px) {
            .main-image-container {
                height: 300px;
            }
            
            .image-thumbnails {
                gap: 0.5rem;
            }
            
            .thumbnail {
                width: 70px;
                height: 52px;
            }
        }
        
        /* Error State */
        .error-state {
            text-align: center;
            padding: 3rem 1rem;
            color: #6b7280;
        }
        
        .error-state i {
            font-size: 3rem;
            color: #EF4444;
            margin-bottom: 1rem;
        }
        
        .error-state h3 {
            color: #111827;
            margin-bottom: 0.5rem;
        }
        
        /* Notification Styles */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        }
        
        .notification.success {
            background: #f0fdf4;
            color: #166534;
            border-left: 4px solid #10B981;
        }
        
        .notification.info {
            background: #eff6ff;
            color: #1e40af;
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
    `;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = additionalStyles;
    document.head.appendChild(styleElement);
} 