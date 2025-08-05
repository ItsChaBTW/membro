// Payment Calculator JavaScript
// Professional payment calculator with property connection

// Global variables
let selectedProperty = null;
let calculationHistory = [];
let currentCalculation = null;

// Initialize the calculator
document.addEventListener('DOMContentLoaded', function() {
    initializeCalculator();
    loadPropertyFromURL();
    setupEventListeners();
    loadSavedCalculations();
});

// Initialize calculator
function initializeCalculator() {
    // Set default dates
    const today = new Date();
    const fullDPDate = new Date(today);
    fullDPDate.setMonth(fullDPDate.getMonth() + 1);
    
    const startSplitDP = new Date(fullDPDate);
    
    document.getElementById('calcFullDPDate').value = fullDPDate.toISOString().split('T')[0];
    document.getElementById('calcStartSplitDP').value = startSplitDP.toISOString().split('T')[0];
    
    // Initialize calculation timestamp
    updateCalculationTimestamp();
}

// Setup event listeners
function setupEventListeners() {
    // Add event listeners to input fields for real-time calculation
    const inputFields = [
        'calcTotalSellingPrice',
        'calcRF',
        'calcDPPercentage',
        'calcNoOfSplits',
        'calcDiscountPercent',
        'calcPromoDiscount',
        'calcNoOfYearsToPay'
    ];
    
    inputFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', debounce(autoCalculate, 500));
        }
    });
    
    // Add event listener for payment term dropdown
    const paymentTermField = document.getElementById('calcPaymentTerm');
    if (paymentTermField) {
        paymentTermField.addEventListener('change', function() {
            updatePaymentTermFields();
            autoCalculate();
        });
    }
    
    // Date fields
    document.getElementById('calcFullDPDate').addEventListener('change', autoCalculate);
    document.getElementById('calcStartSplitDP').addEventListener('change', autoCalculate);
}

// Load property from URL parameters
function loadPropertyFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('propertyId');
    
    if (propertyId) {
        loadPropertyById(parseInt(propertyId));
    } else {
        // Show property selection if no property is specified
        showPropertySelection();
    }
}

// Load property by ID
function loadPropertyById(propertyId) {
    // Try to get from MembroData first (for reservation system properties)
    if (typeof MembroData !== 'undefined' && MembroData.getPropertyInventory) {
        const inventory = MembroData.getPropertyInventory();
        const property = inventory.find(p => p.id === propertyId || p.propertyId === propertyId);
        if (property) {
            selectProperty(convertInventoryToProperty(property));
            return;
        }
    }
    
    // Try to get from properties array (if available)
    if (typeof properties !== 'undefined') {
        const property = properties.find(p => p.id === propertyId);
        if (property) {
            selectProperty(property);
            return;
        }
    }
    
    // Try to get from property-details.js properties array
    const propertyDetailsProperties = [
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
    
    const property = propertyDetailsProperties.find(p => p.id === propertyId);
    if (property) {
        selectProperty(property);
        return;
    }
    
    // If property not found, show selection
    showPropertySelection();
}

// Convert inventory property to calculator property format
function convertInventoryToProperty(inventoryProperty) {
    return {
        id: inventoryProperty.id,
        name: `Unit ${inventoryProperty.unitNumber} - Block ${inventoryProperty.block}`,
        price: inventoryProperty.price,
        location: inventoryProperty.address,
        project: inventoryProperty.project,
        area: inventoryProperty.area,
        rfAmount: inventoryProperty.reservationFee,
        images: inventoryProperty.images || ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=250&fit=crop'],
        type: inventoryProperty.lotType || 'lot',
        status: inventoryProperty.status
    };
}

// Select property for calculation
function selectProperty(property) {
    selectedProperty = property;
    displaySelectedProperty(property);
    populatePropertyData(property);
    
    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('propertyId', property.id);
    window.history.replaceState({}, '', url);
}

// Display selected property
function displaySelectedProperty(property) {
    const section = document.getElementById('selectedPropertySection');
    if (!section) return;
    
    // Show the section
    section.style.display = 'block';
    
    // Populate property details
    document.getElementById('selectedPropertyImage').src = property.images[0];
    document.getElementById('selectedPropertyName').textContent = property.name;
    document.getElementById('selectedPropertyLocation').textContent = property.location;
    document.getElementById('selectedPropertyProject').textContent = property.project;
    document.getElementById('selectedPropertyArea').textContent = `${property.area} sqm`;
    document.getElementById('selectedPropertyPrice').textContent = formatCurrency(property.price);
    document.getElementById('selectedPropertyRF').textContent = formatCurrency(property.rfAmount);
    
    // Set status
    const statusBadge = document.getElementById('selectedPropertyStatus');
    statusBadge.textContent = getStatusText(property.status || 'available');
    statusBadge.className = `property-status-badge ${property.status || 'available'}`;
}

// Populate property data into calculator fields
function populatePropertyData(property) {
    document.getElementById('calcTotalSellingPrice').value = property.price;
    document.getElementById('calcRF').value = property.rfAmount;
    
    // Auto-calculate when property is loaded
    setTimeout(autoCalculate, 100);
}

// Get status text
function getStatusText(status) {
    const statusTexts = {
        'available': 'Available',
        'reserved': 'Reserved',
        'sold': 'Sold',
        'not_available': 'Not Available'
    };
    return statusTexts[status] || 'Available';
}

// Show property selection modal
function showPropertySelection() {
    const modal = document.getElementById('propertySelectionModal');
    if (!modal) return;
    
    loadPropertiesIntoModal();
    modal.style.display = 'flex';
}

// Close property selection modal
function closePropertySelection() {
    const modal = document.getElementById('propertySelectionModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Load properties into modal
function loadPropertiesIntoModal() {
    const container = document.getElementById('propertiesListModal');
    if (!container) return;
    
    let propertiesToShow = [];
    
    // Try to get from MembroData first
    if (typeof MembroData !== 'undefined' && MembroData.getPropertyInventory) {
        const inventory = MembroData.getPropertyInventory();
        propertiesToShow = inventory.map(convertInventoryToProperty);
    }
    
    // Add property details properties
    const propertyDetailsProperties = [
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
    
    // Add property details properties to the list
    propertiesToShow = propertiesToShow.concat(propertyDetailsProperties);
    
    // Fallback to properties array
    if (propertiesToShow.length === 0 && typeof properties !== 'undefined') {
        propertiesToShow = properties;
    }
    
    // If still no properties, show sample data
    if (propertiesToShow.length === 0) {
        propertiesToShow = getSampleProperties();
    }
    
    container.innerHTML = '';
    
    propertiesToShow.forEach(property => {
        const item = document.createElement('div');
        item.className = 'property-item';
        item.onclick = () => {
            selectProperty(property);
            closePropertySelection();
        };
        
        item.innerHTML = `
            <img src="${property.images[0]}" alt="${property.name}">
            <div class="property-item-details">
                <h4>${property.name}</h4>
                <p><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                <p><i class="fas fa-building"></i> ${property.project}</p>
            </div>
            <div class="property-item-price">${formatCurrency(property.price)}</div>
        `;
        
        container.appendChild(item);
    });
}

// Get sample properties for testing
function getSampleProperties() {
    return [
        {
            id: 1,
            name: "Modern 2BR Condo",
            price: 2500000,
            location: "Makati City",
            project: "Makati 288 Condo",
            area: 65.5,
            rfAmount: 125000,
            images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop"],
            type: "condo",
            status: "available"
        },
        {
            id: 2,
            name: "Family House",
            price: 4500000,
            location: "Quezon City",
            project: "Quezon Hills Subdivision",
            area: 120.0,
            rfAmount: 225000,
            images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=250&fit=crop"],
            type: "house",
            status: "available"
        },
        {
            id: 3,
            name: "Commercial Lot",
            price: 3200000,
            location: "Taguig City",
            project: "BGC Commercial District",
            area: 200.0,
            rfAmount: 160000,
            images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop"],
            type: "lot",
            status: "available"
        }
    ];
}

// Filter properties in modal
function filterProperties() {
    const searchInput = document.getElementById('propertySearchInput');
    const searchTerm = searchInput.value.toLowerCase();
    const propertyItems = document.querySelectorAll('.property-item');
    
    propertyItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Select different property
function selectDifferentProperty() {
    showPropertySelection();
}

// Update payment term fields based on selection
function updatePaymentTermFields() {
    const paymentTerm = document.getElementById('calcPaymentTerm').value;
    const dpPercentageField = document.getElementById('calcDPPercentage');
    const noOfSplitsField = document.getElementById('calcNoOfSplits');
    
    // Enable/disable fields based on payment term
    switch(paymentTerm) {
        case 'full_cash':
            dpPercentageField.value = 100;
            dpPercentageField.disabled = true;
            noOfSplitsField.disabled = true;
            break;
        case 'full_dp':
            dpPercentageField.disabled = false;
            noOfSplitsField.value = 1;
            noOfSplitsField.disabled = true;
            break;
        case 'split_dp':
        case 'split_cash':
            dpPercentageField.disabled = false;
            noOfSplitsField.disabled = false;
            break;
        default:
            dpPercentageField.disabled = false;
            noOfSplitsField.disabled = false;
    }
}

// Auto-calculate (debounced)
function autoCalculate() {
    if (selectedProperty && hasValidInputs()) {
        calculatePayment();
    }
}

// Check if inputs are valid for calculation
function hasValidInputs() {
    const totalPrice = parseFloat(document.getElementById('calcTotalSellingPrice').value) || 0;
    return totalPrice > 0;
}

// Main calculation function
function calculatePayment() {
    // Get input values
    const totalSellingPrice = parseFloat(document.getElementById('calcTotalSellingPrice').value) || 0;
    const rf = parseFloat(document.getElementById('calcRF').value) || 0;
    const paymentTerm = document.getElementById('calcPaymentTerm').value;
    const dpPercentage = parseFloat(document.getElementById('calcDPPercentage').value) || 0;
    const noOfSplits = parseInt(document.getElementById('calcNoOfSplits').value) || 1;
    const discountPercent = parseFloat(document.getElementById('calcDiscountPercent').value) || 0;
    const promoDiscount = parseFloat(document.getElementById('calcPromoDiscount').value) || 0;
    const noOfYearsToPay = parseInt(document.getElementById('calcNoOfYearsToPay').value) || 20;
    const fullDPDate = document.getElementById('calcFullDPDate').value;
    const startSplitDP = document.getElementById('calcStartSplitDP').value;
    
    if (totalSellingPrice <= 0) {
        return;
    }
    
    // Calculate discount amount
    const totalDiscountPercent = discountPercent + promoDiscount;
    const discountAmount = totalSellingPrice * (totalDiscountPercent / 100);
    
    // Calculate net selling price
    const netSellingPrice = totalSellingPrice - discountAmount;
    
    // Calculate VAT (usually 0 for residential properties in PH, but can be configurable)
    const vatAmount = 0; // Set to 0 as per Philippine residential property standards
    const nspWithVAT = netSellingPrice + vatAmount;
    
    // Calculate DP
    const dp = nspWithVAT * (dpPercentage / 100);
    const dpLessRF = dp - rf;
    
    // Calculate monthly DP split (if applicable)
    let moDPSplit = 0;
    if (paymentTerm === 'split_dp' && noOfSplits > 0) {
        moDPSplit = dpLessRF / noOfSplits;
    }
    
    // Calculate balance for amortization
    let balanceForAmortization = 0;
    if (paymentTerm !== 'full_cash') {
        balanceForAmortization = nspWithVAT - dp;
    }
    
    // Calculate monthly amortization and factor rate
    let moAmortization = 0;
    let factorRate = 0;
    let monthlyInterestRate = 0;
    
    if (balanceForAmortization > 0 && noOfYearsToPay > 0) {
        // Standard interest rate for residential properties in PH (can be configurable)
        const annualInterestRate = 0.06; // 6% default
        monthlyInterestRate = annualInterestRate / 12;
        const totalMonths = noOfYearsToPay * 12;
        
        // Calculate factor rate (monthly payment factor)
        if (monthlyInterestRate > 0) {
            factorRate = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths) / 
                        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
            moAmortization = balanceForAmortization * factorRate;
        } else {
            factorRate = 1 / totalMonths;
            moAmortization = balanceForAmortization / totalMonths;
        }
    }
    
    // Calculate dates
    let endSplitDP = '';
    let startAmortization = '';
    let endAmortization = '';
    
    if (startSplitDP) {
        const startDate = new Date(startSplitDP);
        
        // End of Split DP (add number of split months)
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + noOfSplits - 1);
        endSplitDP = endDate.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'});
        
        // Start of Amortization (month after end of split DP)
        const amortStartDate = new Date(endDate);
        amortStartDate.setMonth(amortStartDate.getMonth() + 1);
        startAmortization = amortStartDate.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'});
        
        // End of Amortization
        const amortEndDate = new Date(amortStartDate);
        amortEndDate.setMonth(amortEndDate.getMonth() + (noOfYearsToPay * 12) - 1);
        endAmortization = amortEndDate.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'});
    }
    
    // Store current calculation
    currentCalculation = {
        property: selectedProperty,
        inputs: {
            totalSellingPrice,
            rf,
            paymentTerm,
            dpPercentage,
            noOfSplits,
            discountPercent,
            promoDiscount,
            noOfYearsToPay,
            fullDPDate,
            startSplitDP
        },
        results: {
            discountAmount,
            netSellingPrice,
            vatAmount,
            nspWithVAT,
            dp,
            dpLessRF,
            moDPSplit,
            balanceForAmortization,
            moAmortization,
            factorRate,
            endSplitDP,
            startAmortization,
            endAmortization
        },
        timestamp: new Date().toISOString()
    };
    
    // Display results
    displayResults(currentCalculation);
    
    // Generate amortization schedule (first 12 months)
    if (balanceForAmortization > 0) {
        generateAmortizationSchedule(balanceForAmortization, monthlyInterestRate, moAmortization, 12);
    }
    
    // Update timestamp
    updateCalculationTimestamp();
}

// Display calculation results
function displayResults(calculation) {
    const { results } = calculation;
    
    // Update summary cards
    document.getElementById('summaryMoDPSplit').textContent = formatCurrency(results.moDPSplit);
    document.getElementById('summaryMoAmortization').textContent = formatCurrency(results.moAmortization);
    document.getElementById('summaryTotalSavings').textContent = formatCurrency(results.discountAmount);
    
    // Update detailed results
    document.getElementById('resultDiscountAmount').textContent = formatCurrency(results.discountAmount);
    document.getElementById('resultNetSellingPrice').textContent = formatCurrency(results.netSellingPrice);
    document.getElementById('resultVATAmount').textContent = formatCurrency(results.vatAmount);
    document.getElementById('resultNSPWithVAT').textContent = formatCurrency(results.nspWithVAT);
    document.getElementById('resultDP').textContent = formatCurrency(results.dp);
    document.getElementById('resultDPLessRF').textContent = formatCurrency(results.dpLessRF);
    document.getElementById('resultMoDPSplit').textContent = formatCurrency(results.moDPSplit);
    document.getElementById('resultBalanceAmortization').textContent = formatCurrency(results.balanceForAmortization);
    document.getElementById('resultMoAmortization').textContent = formatCurrency(results.moAmortization);
    document.getElementById('resultFactorRate').textContent = results.factorRate.toFixed(9);
    
    // Update schedule dates
    const { inputs } = calculation;
    
    document.getElementById('resultFullDPDate').textContent = inputs.fullDPDate ? 
        new Date(inputs.fullDPDate).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'}) : '-';
    document.getElementById('resultStartSplitDP').textContent = inputs.startSplitDP ? 
        new Date(inputs.startSplitDP).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'}) : '-';
    document.getElementById('resultEndSplitDP').textContent = results.endSplitDP || '-';
    document.getElementById('resultStartAmortization').textContent = results.startAmortization || '-';
    document.getElementById('resultEndAmortization').textContent = results.endAmortization || '-';
    
    // Show results section
    document.getElementById('calculatorResults').style.display = 'block';
}

// Generate amortization schedule
function generateAmortizationSchedule(loanAmount, periodInterestRate, periodicPayment, months) {
    const tableBody = document.getElementById('amortizationTableBody');
    tableBody.innerHTML = '';
    
    let balance = loanAmount;
    
    for (let month = 1; month <= months && balance > 0; month++) {
        const interestPayment = balance * periodInterestRate;
        const principalPayment = periodicPayment - interestPayment;
        balance = Math.max(0, balance - principalPayment);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${month}</td>
            <td>${formatCurrency(periodicPayment)}</td>
            <td>${formatCurrency(principalPayment)}</td>
            <td>${formatCurrency(interestPayment)}</td>
            <td>${formatCurrency(balance)}</td>
        `;
        tableBody.appendChild(row);
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0
    }).format(amount);
}

// Update calculation timestamp
function updateCalculationTimestamp() {
    const timestampElement = document.getElementById('calculationTime');
    if (timestampElement) {
        timestampElement.textContent = `Last calculated: ${new Date().toLocaleString()}`;
    }
}

// Debounce function for auto-calculation
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Load preset configurations
function loadPreset(type) {
    switch(type) {
        case 'residential':
            document.getElementById('calcDPPercentage').value = 20;
            document.getElementById('calcDiscountPercent').value = 0;
            document.getElementById('calcPromoDiscount').value = 5;
            document.getElementById('calcNoOfYearsToPay').value = 20;
            break;
        case 'commercial':
            document.getElementById('calcDPPercentage').value = 30;
            document.getElementById('calcDiscountPercent').value = 2;
            document.getElementById('calcPromoDiscount').value = 3;
            document.getElementById('calcNoOfYearsToPay').value = 15;
            break;
    }
    autoCalculate();
}

// Reset calculator
function resetCalculator() {
    if (confirm('Are you sure you want to reset all fields?')) {
        // Reset all input fields to defaults
        document.getElementById('calcTotalSellingPrice').value = selectedProperty ? selectedProperty.price : '';
        document.getElementById('calcRF').value = selectedProperty ? selectedProperty.rfAmount : 20000;
        document.getElementById('calcPaymentTerm').value = 'split_dp';
        document.getElementById('calcDPPercentage').value = 30;
        document.getElementById('calcNoOfSplits').value = 3;
        document.getElementById('calcDiscountPercent').value = 0;
        document.getElementById('calcPromoDiscount').value = 5;
        document.getElementById('calcNoOfYearsToPay').value = 20;
        
        // Reset dates to defaults
        const today = new Date();
        const fullDPDate = new Date(today);
        fullDPDate.setMonth(fullDPDate.getMonth() + 1);
        const startSplitDP = new Date(fullDPDate);
        
        document.getElementById('calcFullDPDate').value = fullDPDate.toISOString().split('T')[0];
        document.getElementById('calcStartSplitDP').value = startSplitDP.toISOString().split('T')[0];
        
        // Update payment term fields
        updatePaymentTermFields();
        
        // Hide results
        document.getElementById('calculatorResults').style.display = 'none';
        
        // Clear current calculation
        currentCalculation = null;
    }
}

// Save calculation
function saveCalculation() {
    if (!currentCalculation) {
        alert('Please calculate first before saving.');
        return;
    }
    
    const name = prompt('Enter a name for this calculation:', `${selectedProperty.name} - ${new Date().toLocaleDateString()}`);
    if (name) {
        const savedCalculation = {
            ...currentCalculation,
            name: name,
            id: Date.now()
        };
        
        calculationHistory.push(savedCalculation);
        localStorage.setItem('paymentCalculatorHistory', JSON.stringify(calculationHistory));
        
        alert('Calculation saved successfully!');
    }
}

// Load saved calculations
function loadSavedCalculations() {
    const saved = localStorage.getItem('paymentCalculatorHistory');
    if (saved) {
        calculationHistory = JSON.parse(saved);
    }
}

// Print results
function printResults() {
    if (!currentCalculation) {
        alert('Please calculate first before printing.');
        return;
    }
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    const printContent = generatePrintContent(currentCalculation);
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}

// Generate print content
function generatePrintContent(calculation) {
    const { property, inputs, results } = calculation;
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Payment Calculator Results - ${property.name}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .property-info { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
                .results-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
                .result-item { display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid #eee; }
                .highlight { background: #e3f2fd; font-weight: bold; }
                .schedule { margin-top: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th, td { padding: 8px; text-align: left; border: 1px solid #ddd; }
                th { background: #f8f9fa; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Payment Calculator Results</h1>
                <p>Generated on: ${new Date(calculation.timestamp).toLocaleString()}</p>
            </div>
            
            <div class="property-info">
                <h3>Property Information</h3>
                <p><strong>Property:</strong> ${property.name}</p>
                <p><strong>Location:</strong> ${property.location}</p>
                <p><strong>Project:</strong> ${property.project}</p>
                <p><strong>Area:</strong> ${property.area} sqm</p>
                <p><strong>Total Price:</strong> ${formatCurrency(inputs.totalSellingPrice)}</p>
                <p><strong>RF Amount:</strong> ${formatCurrency(inputs.rf)}</p>
            </div>
            
            <div class="results">
                <h3>Financial Breakdown</h3>
                <div class="results-grid">
                    <div class="result-item">
                        <span>Discount Amount:</span>
                        <span>${formatCurrency(results.discountAmount)}</span>
                    </div>
                    <div class="result-item">
                        <span>Net Selling Price:</span>
                        <span>${formatCurrency(results.netSellingPrice)}</span>
                    </div>
                    <div class="result-item">
                        <span>Down Payment:</span>
                        <span>${formatCurrency(results.dp)}</span>
                    </div>
                    <div class="result-item">
                        <span>DP Less RF:</span>
                        <span>${formatCurrency(results.dpLessRF)}</span>
                    </div>
                    <div class="result-item highlight">
                        <span>Monthly DP Split:</span>
                        <span>${formatCurrency(results.moDPSplit)}</span>
                    </div>
                    <div class="result-item highlight">
                        <span>Monthly Amortization:</span>
                        <span>${formatCurrency(results.moAmortization)}</span>
                    </div>
                </div>
            </div>
            
            <div class="schedule">
                <h3>Payment Schedule</h3>
                <p><strong>Full DP Date:</strong> ${inputs.fullDPDate || '-'}</p>
                <p><strong>Start of Split DP:</strong> ${inputs.startSplitDP || '-'}</p>
                <p><strong>End of Split DP:</strong> ${results.endSplitDP || '-'}</p>
                <p><strong>Start of Amortization:</strong> ${results.startAmortization || '-'}</p>
                <p><strong>End of Amortization:</strong> ${results.endAmortization || '-'}</p>
            </div>
        </body>
        </html>
    `;
}

// Export amortization schedule
function exportAmortizationSchedule() {
    if (!currentCalculation) {
        alert('Please calculate first before exporting.');
        return;
    }
    
    // Create CSV content
    let csvContent = "Month,Payment,Principal,Interest,Balance\n";
    
    const tableRows = document.querySelectorAll('#amortizationTableBody tr');
    tableRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = Array.from(cells).map(cell => cell.textContent.replace(/,/g, '')).join(',');
        csvContent += rowData + "\n";
    });
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `amortization_schedule_${selectedProperty.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Toggle amortization view (show full schedule)
function toggleAmortizationView() {
    // This could be expanded to show the full amortization schedule
    // For now, it regenerates with more months
    if (!currentCalculation) return;
    
    const { results } = currentCalculation;
    const { balanceForAmortization, moAmortization } = results;
    const noOfYearsToPay = parseInt(document.getElementById('calcNoOfYearsToPay').value) || 20;
    
    // Calculate monthly interest rate
    const annualInterestRate = 0.06; // 6% default
    const monthlyInterestRate = annualInterestRate / 12;
    
    // Show full schedule (all months)
    const totalMonths = noOfYearsToPay * 12;
    generateAmortizationSchedule(balanceForAmortization, monthlyInterestRate, moAmortization, totalMonths);
    
    // Update button text
    const button = event.target.closest('button');
    if (button.innerHTML.includes('Full View')) {
        button.innerHTML = '<i class="fas fa-compress"></i> Preview View';
    } else {
        button.innerHTML = '<i class="fas fa-expand"></i> Full View';
        generateAmortizationSchedule(balanceForAmortization, monthlyInterestRate, moAmortization, 12);
    }
}

// Navigation functions
function goHome() {
    window.location.href = 'index.html';
}

function goToProperties() {
    window.location.href = 'properties.html';
}

// Initialize sidebar toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (navToggle && sidebar) {
        navToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
        });
    }
});