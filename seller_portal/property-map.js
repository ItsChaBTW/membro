// Property Map JavaScript
var propertyMap = {
    inventory: [],
    reservationTimers: {},
    leafletMap: null,
    mapMarkers: [],
    currentView: 'grid', // 'grid' or 'real'

    // Initialize the map
    init: function() {
        this.loadPropertyInventory();
        this.renderMap();
        this.initLeafletMap();
        this.updateStatistics();
        this.startReservationTimers();
        
        // Refresh every 30 seconds
        setInterval(() => {
            this.loadPropertyInventory();
            this.updateStatistics();
            this.updateReservationTimers();
            if (this.currentView === 'real') {
                this.updateMapMarkers();
            }
        }, 30000);
    },

    // Load property inventory from data
    loadPropertyInventory: function() {
        if (typeof MembroData !== 'undefined' && MembroData.getPropertyInventory) {
            this.inventory = MembroData.getPropertyInventory();
        } else {
            console.warn('MembroData not available, using sample data');
            this.inventory = this.getSampleData();
        }
    },

    // Sample data for testing
    getSampleData: function() {
        return [
            {
                id: 'inv_001',
                propertyId: 'TGR_B1_L1',
                unitNumber: '1',
                block: '1',
                phase: '4A',
                project: 'Tandatangan Golf Residences',
                lotType: 'Fairway',
                area: 625,
                price: 20000000,
                reservationFee: 200000,
                status: 'available',
                statusLastUpdated: new Date().toISOString(),
                reservation: null,
                coordinates: { x: 50, y: 100 },
                geoCoordinates: { lat: 14.2145, lng: 121.0405 },
                address: 'Block 1, Lot 1, Tandatangan Golf Residences, Rizal',
                features: ['Corner Lot', 'Golf Course View', 'Premium Location'],
                description: 'Premium corner lot with excellent golf course views'
            },
            {
                id: 'inv_002',
                propertyId: 'TGR_B1_L22',
                unitNumber: '22',
                block: '1',
                phase: '4A',
                project: 'Tandatangan Golf Residences',
                lotType: 'Fairway',
                area: 500,
                price: 15000000,
                reservationFee: 150000,
                status: 'available',
                statusLastUpdated: new Date().toISOString(),
                reservation: null,
                coordinates: { x: 150, y: 120 },
                geoCoordinates: { lat: 14.2148, lng: 121.0410 },
                address: 'Block 1, Lot 22, Tandatangan Golf Residences, Rizal',
                features: ['Regular Lot', 'Golf Course View', 'Good Location'],
                description: 'Well-positioned lot with golf course access'
            },
            {
                id: 'inv_003',
                propertyId: 'TGR_B1_L23',
                unitNumber: '23',
                block: '1',
                phase: '4A',
                project: 'Tandatangan Golf Residences',
                lotType: 'Fairway',
                area: 550,
                price: 16500000,
                reservationFee: 165000,
                status: 'reserved',
                statusLastUpdated: new Date().toISOString(),
                reservation: {
                    reservationId: 'RES-2024-001',
                    buyerName: 'Maria Santos',
                    buyerEmail: 'maria.santos@email.com',
                    buyerPhone: '+63 912 345 6789',
                    reservationDate: new Date().toISOString(),
                    expiryDate: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString(),
                    paymentMethod: 'reservation_fee',
                    amountPaid: 165000,
                    transactionId: 'TXN-2024-001',
                    status: 'active',
                    reservationDays: 3
                },
                coordinates: { x: 200, y: 140 },
                geoCoordinates: { lat: 14.2146, lng: 121.0412 },
                address: 'Block 1, Lot 23, Tandatangan Golf Residences, Rizal',
                features: ['Regular Lot', 'Golf Course View', 'Good Location'],
                description: 'Well-positioned lot with golf course access'
            },
            {
                id: 'inv_004',
                propertyId: 'TGR_B2_L12',
                unitNumber: '12',
                block: '2',
                phase: '4A',
                project: 'Tandatangan Golf Residences',
                lotType: 'Garden',
                area: 480,
                price: 14000000,
                reservationFee: 140000,
                status: 'sold',
                statusLastUpdated: new Date().toISOString(),
                reservation: null,
                coordinates: { x: 80, y: 220 },
                geoCoordinates: { lat: 14.2150, lng: 121.0408 },
                address: 'Block 2, Lot 12, Tandatangan Golf Residences, Rizal',
                features: ['Garden View', 'Quiet Location', 'Family-Friendly'],
                description: 'Peaceful lot with garden surroundings'
            },
            {
                id: 'inv_005',
                propertyId: 'TGR_B2_L16',
                unitNumber: '16',
                block: '2',
                phase: '4A',
                project: 'Tandatangan Golf Residences',
                lotType: 'Garden',
                area: 520,
                price: 15500000,
                reservationFee: 155000,
                status: 'not_available',
                statusLastUpdated: new Date().toISOString(),
                reservation: null,
                coordinates: { x: 160, y: 240 },
                geoCoordinates: { lat: 14.2144, lng: 121.0415 },
                address: 'Block 2, Lot 16, Tandatangan Golf Residences, Rizal',
                features: ['Garden View', 'Premium Location', 'Corner Lot'],
                description: 'Premium corner lot with excellent garden views'
            }
        ];
    },

    // Render the property map
    renderMap: function() {
        const mapContainer = document.getElementById('propertyMap');
        if (!mapContainer) return;

        mapContainer.innerHTML = '';

        // Group properties by block
        const blocks = this.groupPropertiesByBlock();

        Object.keys(blocks).forEach(blockNumber => {
            const blockElement = this.createBlockElement(blockNumber, blocks[blockNumber]);
            mapContainer.appendChild(blockElement);
        });
    },

    // Group properties by block
    groupPropertiesByBlock: function() {
        const blocks = {};
        
        this.inventory.forEach(property => {
            const blockKey = `Block ${property.block}`;
            if (!blocks[blockKey]) {
                blocks[blockKey] = [];
            }
            blocks[blockKey].push(property);
        });

        return blocks;
    },

    // Create block element
    createBlockElement: function(blockNumber, properties) {
        const blockDiv = document.createElement('div');
        blockDiv.className = 'block-section';
        
        // Position blocks based on block number
        const blockNum = parseInt(blockNumber.replace('Block ', ''));
        const positions = {
            1: { top: '50px', left: '50px' },
            2: { top: '250px', left: '50px' },
            3: { top: '50px', right: '50px' }
        };
        
        const position = positions[blockNum] || { top: '50px', left: '200px' };
        Object.assign(blockDiv.style, position);

        // Block title
        const titleDiv = document.createElement('div');
        titleDiv.className = 'block-title';
        titleDiv.textContent = blockNumber;
        blockDiv.appendChild(titleDiv);

        // Property grid
        const gridDiv = document.createElement('div');
        gridDiv.className = 'property-grid';
        
        // Sort properties by unit number
        properties.sort((a, b) => parseInt(a.unitNumber) - parseInt(b.unitNumber));
        
        properties.forEach(property => {
            const unitElement = this.createUnitElement(property);
            gridDiv.appendChild(unitElement);
        });

        blockDiv.appendChild(gridDiv);
        return blockDiv;
    },

    // Create unit element
    createUnitElement: function(property) {
        const unitDiv = document.createElement('div');
        unitDiv.className = `property-unit ${property.status}`;
        unitDiv.textContent = property.unitNumber;
        unitDiv.title = `Unit ${property.unitNumber} - ${this.getStatusText(property.status)}`;
        
        // Add expiry indicator for reserved properties that expire soon
        if (property.status === 'reserved' && property.reservation) {
            const expiryDate = new Date(property.reservation.expiryDate);
            const now = new Date();
            const hoursRemaining = (expiryDate - now) / (1000 * 60 * 60);
            
            if (hoursRemaining <= 24 && hoursRemaining > 0) {
                const indicator = document.createElement('div');
                indicator.className = 'expiry-indicator';
                indicator.title = 'Expires within 24 hours';
                unitDiv.appendChild(indicator);
            }
        }

        // Add click event
        unitDiv.addEventListener('click', () => {
            this.showPropertyModal(property);
        });

        return unitDiv;
    },

    // Get status text
    getStatusText: function(status) {
        const statusTexts = {
            'available': 'Available',
            'reserved': 'Reserved',
            'sold': 'Sold',
            'not_available': 'Not Available'
        };
        return statusTexts[status] || status;
    },

    // Show property modal
    showPropertyModal: function(property) {
        const modal = document.getElementById('propertyModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');

        modalTitle.textContent = `Unit ${property.unitNumber} - Block ${property.block}`;
        modalContent.innerHTML = this.generateModalContent(property);

        modal.classList.add('active');

        // Start countdown timer if reserved
        if (property.status === 'reserved' && property.reservation) {
            this.startModalCountdown(property.reservation.expiryDate);
        }
    },

    // Generate modal content
    generateModalContent: function(property) {
        const statusText = this.getStatusText(property.status);
        const statusClass = property.status.replace('_', '-');

        let content = `
            <div class="property-image-section" style="margin-bottom: 2rem;">
                <img src="${property.images[0]}" alt="Property ${property.unitNumber}" 
                     style="width: 100%; height: 200px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            </div>
            
            <div class="property-status-banner" style="background: linear-gradient(135deg, ${this.getStatusColor(property.status)} 0%, ${this.getStatusColorDark(property.status)} 100%); color: white; padding: 1rem; border-radius: 12px; margin-bottom: 2rem; text-align: center;">
                <h3 style="margin: 0; font-size: 1.25rem;">Status: ${statusText}</h3>
                ${property.status === 'reserved' && property.reservation ? 
                    `<p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Reserved by ${property.reservation.buyerName}</p>` : ''}
            </div>

            <div class="property-details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                <div class="detail-card" style="background: var(--gray-50); padding: 1rem; border-radius: 12px; border-left: 4px solid var(--primary);">
                    <div class="detail-row">
                        <span class="detail-label"><i class="fas fa-tag"></i> Property ID</span>
                        <span class="detail-value">${property.propertyId}</span>
                    </div>
                </div>
                <div class="detail-card" style="background: var(--gray-50); padding: 1rem; border-radius: 12px; border-left: 4px solid var(--secondary);">
                    <div class="detail-row">
                        <span class="detail-label"><i class="fas fa-map"></i> Lot Type</span>
                        <span class="detail-value">${property.lotType}</span>
                    </div>
                </div>
                <div class="detail-card" style="background: var(--gray-50); padding: 1rem; border-radius: 12px; border-left: 4px solid var(--warning);">
                    <div class="detail-row">
                        <span class="detail-label"><i class="fas fa-ruler-combined"></i> Area</span>
                        <span class="detail-value">${property.area} sqm</span>
                    </div>
                </div>
                <div class="detail-card" style="background: var(--gray-50); padding: 1rem; border-radius: 12px; border-left: 4px solid var(--info);">
                    <div class="detail-row">
                        <span class="detail-label"><i class="fas fa-home"></i> Phase</span>
                        <span class="detail-value">Phase ${property.phase}</span>
                    </div>
                </div>
            </div>

            <div class="property-pricing" style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem; border: 2px solid var(--gray-200);">
                <h4 style="margin: 0 0 1rem 0; color: var(--gray-800); display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-peso-sign"></i> Pricing Information
                </h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="price-detail">
                        <span class="detail-label">Total Price</span>
                        <span class="detail-value" style="font-size: 1.25rem; font-weight: 700; color: var(--primary);">₱${property.price.toLocaleString()}</span>
                    </div>
                    <div class="price-detail">
                        <span class="detail-label">Reservation Fee</span>
                        <span class="detail-value" style="font-size: 1.1rem; font-weight: 600; color: var(--warning);">₱${property.reservationFee.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div class="property-location" style="background: var(--white); padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem; border: 2px solid var(--gray-200);">
                <h4 style="margin: 0 0 1rem 0; color: var(--gray-800); display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-map-marker-alt"></i> Location Details
                </h4>
                <p style="margin: 0; color: var(--gray-700); line-height: 1.6;">
                    <strong>Address:</strong> ${property.address}<br>
                    <strong>Coordinates:</strong> ${property.geoCoordinates.lat}, ${property.geoCoordinates.lng}
                </p>
            </div>

            <div class="property-features" style="margin-bottom: 2rem;">
                <h4 style="margin: 0 0 1rem 0; color: var(--gray-800); display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-star"></i> Property Features
                </h4>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${property.features.map(feature => 
                        `<span style="background: var(--primary); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 500;">${feature}</span>`
                    ).join('')}
                </div>
                <p style="margin: 1rem 0 0 0; color: var(--gray-600); font-style: italic;">${property.description}</p>
            </div>
        `;

        // Add reservation details if reserved
        if (property.status === 'reserved' && property.reservation) {
            content += this.generateReservationDetails(property.reservation);
        }

        // Add action buttons
        content += this.generateActionButtons(property);

        return content;
    },

    // Get status color for styling
    getStatusColor: function(status) {
        const colors = {
            'available': '#22c55e',
            'reserved': '#f59e0b',
            'sold': '#ef4444',
            'not_available': '#6b7280'
        };
        return colors[status] || '#6b7280';
    },

    // Get darker status color
    getStatusColorDark: function(status) {
        const colors = {
            'available': '#16a34a',
            'reserved': '#d97706',
            'sold': '#dc2626',
            'not_available': '#4b5563'
        };
        return colors[status] || '#4b5563';
    },

    // Generate reservation details
    generateReservationDetails: function(reservation) {
        const expiryDate = new Date(reservation.expiryDate);
        const reservationDate = new Date(reservation.reservationDate);
        const formattedExpiry = expiryDate.toLocaleString();
        const formattedReservation = reservationDate.toLocaleString();
        
        const timeRemaining = expiryDate - new Date();
        const hoursRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60));
        const isExpiring = hoursRemaining <= 24;
        const isExpired = hoursRemaining <= 0;
        
        return `
            <div class="reservation-info-detailed" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 3px solid #f59e0b; border-radius: 16px; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 8px 20px rgba(245, 158, 11, 0.2);">
                <h4 style="margin: 0 0 1.5rem 0; color: #92400e; font-size: 1.25rem; font-weight: 700; display: flex; align-items: center; gap: 0.75rem;">
                    <i class="fas fa-clock" style="font-size: 1.5rem;"></i> Active Reservation
                    ${isExpiring && !isExpired ? '<span style="background: #dc2626; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; animation: pulse 2s infinite;">EXPIRING SOON</span>' : ''}
                    ${isExpired ? '<span style="background: #7f1d1d; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem;">EXPIRED</span>' : ''}
                </h4>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                    <div class="reservation-detail" style="background: rgba(255, 255, 255, 0.8); padding: 1rem; border-radius: 12px;">
                        <div class="detail-row" style="border: none; margin: 0;">
                            <span class="detail-label"><i class="fas fa-user"></i> Buyer Name</span>
                            <span class="detail-value" style="font-weight: 700;">${reservation.buyerName}</span>
                        </div>
                    </div>
                    <div class="reservation-detail" style="background: rgba(255, 255, 255, 0.8); padding: 1rem; border-radius: 12px;">
                        <div class="detail-row" style="border: none; margin: 0;">
                            <span class="detail-label"><i class="fas fa-phone"></i> Contact</span>
                            <span class="detail-value">${reservation.buyerPhone}</span>
                        </div>
                    </div>
                    <div class="reservation-detail" style="background: rgba(255, 255, 255, 0.8); padding: 1rem; border-radius: 12px;">
                        <div class="detail-row" style="border: none; margin: 0;">
                            <span class="detail-label"><i class="fas fa-credit-card"></i> Amount Paid</span>
                            <span class="detail-value" style="color: #059669; font-weight: 700;">₱${reservation.amountPaid.toLocaleString()}</span>
                        </div>
                    </div>
                    <div class="reservation-detail" style="background: rgba(255, 255, 255, 0.8); padding: 1rem; border-radius: 12px;">
                        <div class="detail-row" style="border: none; margin: 0;">
                            <span class="detail-label"><i class="fas fa-calendar"></i> Reserved On</span>
                            <span class="detail-value">${formattedReservation}</span>
                        </div>
                    </div>
                </div>

                <div class="expiry-info" style="background: rgba(255, 255, 255, 0.9); padding: 1.5rem; border-radius: 12px; text-align: center;">
                    <div style="margin-bottom: 1rem;">
                        <span class="detail-label" style="font-size: 1rem;"><i class="fas fa-hourglass-half"></i> Expires On</span>
                        <div style="font-size: 1.1rem; font-weight: 600; color: #374151; margin-top: 0.5rem;">${formattedExpiry}</div>
                    </div>
                    <div class="countdown-timer" id="countdownTimer" style="font-size: 1.5rem; font-weight: 700; color: ${isExpired ? '#dc2626' : isExpiring ? '#f59e0b' : '#059669'}; background: rgba(255, 255, 255, 0.8); padding: 1rem; border-radius: 12px; ${isExpiring ? 'animation: pulse 2s infinite;' : ''}">
                        Calculating time remaining...
                    </div>
                </div>

                <div class="reservation-actions" style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center;">
                    <button class="btn btn-success" onclick="propertyMap.extendReservation('${reservation.reservationId}')" style="padding: 0.75rem 1.5rem; background: #059669; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                        <i class="fas fa-clock"></i> Extend Reservation
                    </button>
                    <button class="btn btn-info" onclick="propertyMap.contactBuyer('${reservation.buyerPhone}')" style="padding: 0.75rem 1.5rem; background: #0ea5e9; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                        <i class="fas fa-phone"></i> Contact Buyer
                    </button>
                </div>
            </div>
        `;
    },

    // Extend reservation function
    extendReservation: function(reservationId) {
        const days = prompt('Extend reservation by how many days?', '3');
        if (days && !isNaN(days) && days > 0) {
            alert(`Reservation ${reservationId} extended by ${days} days.`);
            this.refreshMapView();
        }
    },

    // Contact buyer function
    contactBuyer: function(phone) {
        if (confirm(`Call ${phone}?`)) {
            window.open(`tel:${phone}`);
        }
    },

    // Generate action buttons
    generateActionButtons: function(property) {
        let buttons = '';

        if (property.status === 'available') {
            buttons = `
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="propertyMap.showReservationForm('${property.id}')">
                        <i class="fas fa-calendar-plus"></i> Reserve Unit
                    </button>
                    <button class="btn btn-secondary" onclick="propertyMap.markAsUnavailable('${property.id}')">
                        <i class="fas fa-ban"></i> Mark Unavailable
                    </button>
                </div>
            `;
        } else if (property.status === 'reserved') {
            buttons = `
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="propertyMap.convertToSale('${property.id}')">
                        <i class="fas fa-handshake"></i> Convert to Sale
                    </button>
                    <button class="btn btn-danger" onclick="propertyMap.cancelReservation('${property.id}')">
                        <i class="fas fa-times"></i> Cancel Reservation
                    </button>
                </div>
            `;
        } else if (property.status === 'not_available') {
            buttons = `
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="propertyMap.markAsAvailable('${property.id}')">
                        <i class="fas fa-check"></i> Mark Available
                    </button>
                </div>
            `;
        }

        return buttons;
    },

    // Start modal countdown
    startModalCountdown: function(expiryDate) {
        const countdownElement = document.getElementById('countdownTimer');
        if (!countdownElement) return;

        const updateCountdown = () => {
            const now = new Date();
            const expiry = new Date(expiryDate);
            const timeRemaining = expiry - now;

            if (timeRemaining <= 0) {
                countdownElement.innerHTML = '<span style="color: #ef4444;">EXPIRED</span>';
                return;
            }

            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

            let display = '';
            if (days > 0) display += `${days}d `;
            display += `${hours}h ${minutes}m remaining`;

            countdownElement.textContent = display;
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 60000); // Update every minute

        // Store interval for cleanup
        this.reservationTimers.modal = interval;
    },

    // Update statistics
    updateStatistics: function() {
        const stats = {
            available: 0,
            reserved: 0,
            sold: 0,
            not_available: 0
        };

        this.inventory.forEach(property => {
            if (stats.hasOwnProperty(property.status)) {
                stats[property.status]++;
            }
        });

        // Update DOM elements
        const elements = {
            availableCount: document.getElementById('availableCount'),
            reservedCount: document.getElementById('reservedCount'),
            soldCount: document.getElementById('soldCount'),
            notAvailableCount: document.getElementById('notAvailableCount')
        };

        if (elements.availableCount) elements.availableCount.textContent = stats.available;
        if (elements.reservedCount) elements.reservedCount.textContent = stats.reserved;
        if (elements.soldCount) elements.soldCount.textContent = stats.sold;
        if (elements.notAvailableCount) elements.notAvailableCount.textContent = stats.not_available;
    },

    // Start reservation timers
    startReservationTimers: function() {
        // Clear existing timers
        Object.values(this.reservationTimers).forEach(timer => clearInterval(timer));
        this.reservationTimers = {};
    },

    // Update reservation timers
    updateReservationTimers: function() {
        // This will be called periodically to refresh the view
        this.renderMap();
    },

    // Show reservation form
    showReservationForm: function(propertyId) {
        const property = this.inventory.find(p => p.id === propertyId);
        if (!property) return;

        const modalContent = document.getElementById('modalContent');
        modalContent.innerHTML = `
            <div class="reservation-form">
                <h4>Reserve Unit ${property.unitNumber}</h4>
                <div class="form-group">
                    <label for="buyerName">Buyer Name</label>
                    <input type="text" id="buyerName" required>
                </div>
                <div class="form-group">
                    <label for="buyerEmail">Email Address</label>
                    <input type="email" id="buyerEmail" required>
                </div>
                <div class="form-group">
                    <label for="buyerPhone">Phone Number</label>
                    <input type="tel" id="buyerPhone" required>
                </div>
                <div class="form-group">
                    <label for="reservationDays">Reservation Period</label>
                    <select id="reservationDays">
                        <option value="1">1 Day</option>
                        <option value="3" selected>3 Days</option>
                        <option value="7">7 Days</option>
                        <option value="14">14 Days</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="paymentMethod">Payment Method</label>
                    <select id="paymentMethod">
                        <option value="cash">Cash</option>
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="check">Check</option>
                        <option value="gcash">GCash</option>
                    </select>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="propertyMap.processReservation('${propertyId}')">
                        <i class="fas fa-credit-card"></i> Process Reservation
                    </button>
                    <button class="btn btn-secondary" onclick="propertyMap.showPropertyModal(propertyMap.inventory.find(p => p.id === '${propertyId}'))">
                        <i class="fas fa-arrow-left"></i> Back
                    </button>
                </div>
            </div>
        `;
    },

    // Process reservation
    processReservation: function(propertyId) {
        const buyerName = document.getElementById('buyerName').value;
        const buyerEmail = document.getElementById('buyerEmail').value;
        const buyerPhone = document.getElementById('buyerPhone').value;
        const reservationDays = parseInt(document.getElementById('reservationDays').value);
        const paymentMethod = document.getElementById('paymentMethod').value;

        if (!buyerName || !buyerEmail || !buyerPhone) {
            alert('Please fill in all required fields');
            return;
        }

        const property = this.inventory.find(p => p.id === propertyId);
        if (!property) {
            alert('Property not found');
            return;
        }

        const reservationData = {
            buyerName: buyerName,
            buyerEmail: buyerEmail,
            buyerPhone: buyerPhone,
            reservationDays: reservationDays,
            paymentMethod: paymentMethod,
            amountPaid: property.reservationFee,
            transactionId: 'TXN-' + Date.now()
        };

        try {
            let result;
            if (typeof MembroData !== 'undefined' && MembroData.reserveProperty) {
                result = MembroData.reserveProperty(propertyId, reservationData);
            } else {
                // Simulate reservation for demo
                result = this.simulateReservation(propertyId, reservationData);
            }

            if (result.success) {
                alert(`Reservation successful!\nReservation ID: ${result.reservationId}\nExpires: ${new Date(result.expiryDate).toLocaleString()}`);
                this.closePropertyModal();
                this.loadPropertyInventory();
                this.renderMap();
                this.updateStatistics();
            }
        } catch (error) {
            alert('Reservation failed: ' + error.message);
        }
    },

    // Simulate reservation (for demo purposes)
    simulateReservation: function(propertyId, reservationData) {
        const property = this.inventory.find(p => p.id === propertyId);
        if (!property) throw new Error('Property not found');

        const reservationId = 'RES-' + new Date().getFullYear() + '-' + Date.now().toString().slice(-6);
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + reservationData.reservationDays);

        property.reservation = {
            reservationId: reservationId,
            buyerName: reservationData.buyerName,
            buyerEmail: reservationData.buyerEmail,
            buyerPhone: reservationData.buyerPhone,
            reservationDate: new Date().toISOString(),
            expiryDate: expiryDate.toISOString(),
            paymentMethod: reservationData.paymentMethod,
            amountPaid: reservationData.amountPaid,
            transactionId: reservationData.transactionId,
            status: 'active',
            reservationDays: reservationData.reservationDays
        };

        property.status = 'reserved';
        property.statusLastUpdated = new Date().toISOString();

        return {
            success: true,
            reservationId: reservationId,
            property: property,
            expiryDate: expiryDate.toISOString()
        };
    },

    // Cancel reservation
    cancelReservation: function(propertyId) {
        const reason = prompt('Please enter the reason for cancellation:');
        if (!reason) return;

        try {
            let result;
            if (typeof MembroData !== 'undefined' && MembroData.cancelReservation) {
                result = MembroData.cancelReservation(propertyId, reason);
            } else {
                // Simulate cancellation for demo
                result = this.simulateCancellation(propertyId, reason);
            }

            if (result.success) {
                alert('Reservation cancelled successfully');
                this.closePropertyModal();
                this.loadPropertyInventory();
                this.renderMap();
                this.updateStatistics();
            }
        } catch (error) {
            alert('Cancellation failed: ' + error.message);
        }
    },

    // Simulate cancellation
    simulateCancellation: function(propertyId, reason) {
        const property = this.inventory.find(p => p.id === propertyId);
        if (!property || !property.reservation) {
            throw new Error('Property or reservation not found');
        }

        const reservationId = property.reservation.reservationId;
        property.reservation.status = 'cancelled';
        property.reservation.cancellationReason = reason;
        property.reservation.cancellationDate = new Date().toISOString();
        property.status = 'available';
        property.statusLastUpdated = new Date().toISOString();

        return {
            success: true,
            reservationId: reservationId,
            property: property
        };
    },

    // Convert to sale
    convertToSale: function(propertyId) {
        if (!confirm('Convert this reservation to a sale?')) return;

        try {
            let result;
            if (typeof MembroData !== 'undefined' && MembroData.convertReservationToSale) {
                result = MembroData.convertReservationToSale(propertyId, {
                    saleDate: new Date().toISOString(),
                    salePrice: this.inventory.find(p => p.id === propertyId)?.price || 0
                });
            } else {
                // Simulate conversion for demo
                result = this.simulateConversion(propertyId);
            }

            if (result.success) {
                alert('Reservation converted to sale successfully!');
                this.closePropertyModal();
                this.loadPropertyInventory();
                this.renderMap();
                this.updateStatistics();
            }
        } catch (error) {
            alert('Conversion failed: ' + error.message);
        }
    },

    // Simulate conversion
    simulateConversion: function(propertyId) {
        const property = this.inventory.find(p => p.id === propertyId);
        if (!property || !property.reservation) {
            throw new Error('Property or reservation not found');
        }

        const reservationId = property.reservation.reservationId;
        property.reservation.status = 'converted_to_sale';
        property.reservation.conversionDate = new Date().toISOString();
        property.status = 'sold';
        property.statusLastUpdated = new Date().toISOString();

        return {
            success: true,
            reservationId: reservationId,
            property: property
        };
    },

    // Mark as unavailable
    markAsUnavailable: function(propertyId) {
        const property = this.inventory.find(p => p.id === propertyId);
        if (!property) return;

        property.status = 'not_available';
        property.statusLastUpdated = new Date().toISOString();

        this.closePropertyModal();
        this.renderMap();
        this.updateStatistics();
    },

    // Mark as available
    markAsAvailable: function(propertyId) {
        const property = this.inventory.find(p => p.id === propertyId);
        if (!property) return;

        property.status = 'available';
        property.statusLastUpdated = new Date().toISOString();

        this.closePropertyModal();
        this.renderMap();
        this.updateStatistics();
    },

    // Close property modal
    closePropertyModal: function() {
        const modal = document.getElementById('propertyModal');
        modal.classList.remove('active');

        // Clear any running timers
        if (this.reservationTimers.modal) {
            clearInterval(this.reservationTimers.modal);
            delete this.reservationTimers.modal;
        }
    },

    // Initialize Leaflet Map
    initLeafletMap: function() {
        console.log('Initializing Leaflet map...');
        
        // Center coordinates for Tandatangan Golf Residences, Rizal
        const centerLat = 14.2146;
        const centerLng = 121.0410;
        
        // Initialize the map
        this.leafletMap = L.map('realMap', {
            center: [centerLat, centerLng],
            zoom: 17,
            zoomControl: false // We'll add custom controls
        });

        // Add tile layer (OpenStreetMap with satellite-like appearance)
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; <a href="https://www.esri.com/">Esri</a>, <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
            maxZoom: 19
        }).addTo(this.leafletMap);

        // Add custom zoom control
        L.control.zoom({
            position: 'bottomright'
        }).addTo(this.leafletMap);

        // Initialize markers
        this.updateMapMarkers();

        console.log('Leaflet map initialized successfully');
    },

    // Update map markers
    updateMapMarkers: function() {
        if (!this.leafletMap) return;

        // Clear existing markers
        this.mapMarkers.forEach(marker => {
            this.leafletMap.removeLayer(marker);
        });
        this.mapMarkers = [];

        // Add markers for each property
        this.inventory.forEach(property => {
            if (property.geoCoordinates) {
                const marker = this.createLeafletMarker(property);
                marker.addTo(this.leafletMap);
                this.mapMarkers.push(marker);
            }
        });
    },

    // Create Leaflet marker for property
    createLeafletMarker: function(property) {
        const lat = property.geoCoordinates.lat;
        const lng = property.geoCoordinates.lng;

        // Create custom icon HTML
        const iconHtml = `
            <div class="property-marker ${property.status}">
                ${property.unitNumber}
            </div>
        `;

        // Create custom divIcon
        const customIcon = L.divIcon({
            html: iconHtml,
            className: 'custom-marker',
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });

        // Create marker
        const marker = L.marker([lat, lng], { icon: customIcon });

        // Create popup content
        const popupContent = this.createLeafletPopupContent(property);
        marker.bindPopup(popupContent, {
            className: 'custom-popup',
            maxWidth: 300,
            closeButton: true
        });

        // Add click event with enhanced feedback
        marker.on('click', (e) => {
            // Add visual feedback on click
            this.showPinClickFeedback();
            
            // Add slight bounce animation to clicked marker
            const markerElement = e.target.getElement();
            if (markerElement) {
                markerElement.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    markerElement.style.transform = 'scale(1)';
                }, 200);
            }
        });

        // Add hover effects
        marker.on('mouseover', (e) => {
            const markerElement = e.target.getElement();
            if (markerElement) {
                markerElement.style.transform = 'scale(1.1)';
            }
        });

        marker.on('mouseout', (e) => {
            const markerElement = e.target.getElement();
            if (markerElement) {
                markerElement.style.transform = 'scale(1)';
            }
        });

        return marker;
    },

    // Create popup content for Leaflet
    createLeafletPopupContent: function(property) {
        const statusText = this.getStatusText(property.status);
        const statusClass = property.status.replace('_', '-');

        let popupHtml = `
            <div class="popup-header">
                <div>
                    <div style="font-size: 1.1rem; font-weight: 700;">Unit ${property.unitNumber} - Block ${property.block}</div>
                    <div style="font-size: 0.85rem; opacity: 0.9; margin-top: 0.25rem;">${property.lotType} Lot</div>
                </div>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="popup-content">
                <div class="popup-detail">
                    <strong><i class="fas fa-map-marker-alt"></i> Address:</strong>
                    <span>${property.address}</span>
                </div>
                <div class="popup-detail">
                    <strong><i class="fas fa-ruler-combined"></i> Area:</strong>
                    <span>${property.area} sqm</span>
                </div>
                <div class="popup-detail">
                    <strong><i class="fas fa-peso-sign"></i> Price:</strong>
                    <span>₱${property.price.toLocaleString()}</span>
                </div>
                <div class="popup-detail">
                    <strong><i class="fas fa-credit-card"></i> Reservation Fee:</strong>
                    <span>₱${property.reservationFee.toLocaleString()}</span>
                </div>
        `;

        // Add reservation details if reserved
        if (property.status === 'reserved' && property.reservation) {
            const expiryDate = new Date(property.reservation.expiryDate);
            const timeRemaining = expiryDate - new Date();
            const hoursRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60));
            const daysRemaining = Math.floor(hoursRemaining / 24);

            let timeDisplay;
            if (hoursRemaining <= 0) {
                timeDisplay = '<span style="color: #dc2626; font-weight: bold;">EXPIRED</span>';
            } else if (daysRemaining > 0) {
                timeDisplay = `${daysRemaining}d ${hoursRemaining % 24}h remaining`;
            } else {
                timeDisplay = `${hoursRemaining}h remaining`;
            }

            popupHtml += `
                <div class="popup-reservation-info">
                    <h4><i class="fas fa-clock"></i> Reservation Details</h4>
                    <div class="popup-detail" style="border: none; margin: 0;">
                        <strong><i class="fas fa-user"></i> Reserved by:</strong>
                        <span>${property.reservation.buyerName}</span>
                    </div>
                    <div class="popup-detail" style="border: none; margin: 0;">
                        <strong><i class="fas fa-phone"></i> Contact:</strong>
                        <span>${property.reservation.buyerPhone}</span>
                    </div>
                    <div class="popup-countdown">
                        <i class="fas fa-hourglass-half"></i> ${timeDisplay}
                    </div>
                </div>
            `;
        }

        popupHtml += `
            </div>
            <div class="popup-actions">
                <button class="popup-btn popup-btn-primary" onclick="propertyMap.showDetailedModal('${property.id}')">
                    <i class="fas fa-search-plus"></i> Full Details
                </button>
        `;

        // Add action buttons based on status
        if (property.status === 'available') {
            popupHtml += `
                <button class="popup-btn popup-btn-success" onclick="propertyMap.quickReserve('${property.id}')">
                    <i class="fas fa-calendar-plus"></i> Reserve Now
                </button>
            `;
        } else if (property.status === 'reserved') {
            popupHtml += `
                <button class="popup-btn popup-btn-warning" onclick="propertyMap.quickConvert('${property.id}')">
                    <i class="fas fa-handshake"></i> Convert Sale
                </button>
            `;
        } else if (property.status === 'sold') {
            popupHtml += `
                <button class="popup-btn popup-btn-secondary" onclick="propertyMap.viewSaleDetails('${property.id}')">
                    <i class="fas fa-check-circle"></i> Sale Info
                </button>
            `;
        }

        popupHtml += `
            </div>
        `;

        return popupHtml;
    },

    // Show detailed modal with enhanced presentation
    showDetailedModal: function(propertyId) {
        const property = this.inventory.find(p => p.id === propertyId);
        if (!property) return;

        // Close any open popups first
        if (this.leafletMap) {
            this.leafletMap.closePopup();
        }

        // Show the modal with enhanced content
        this.showPropertyModal(property);
        
        // Add visual feedback
        this.highlightPropertyOnMap(propertyId);
    },

    // Quick reserve function for map popups
    quickReserve: function(propertyId) {
        const property = this.inventory.find(p => p.id === propertyId);
        if (!property) return;

        // Close popup
        if (this.leafletMap) {
            this.leafletMap.closePopup();
        }

        // Show reservation form in modal
        this.showReservationForm(propertyId);
    },

    // Quick convert function for reserved properties
    quickConvert: function(propertyId) {
        if (confirm('Convert this reservation to a sale?')) {
            this.convertToSale(propertyId);
            
            // Close popup and refresh
            if (this.leafletMap) {
                this.leafletMap.closePopup();
            }
        }
    },

    // View sale details for sold properties
    viewSaleDetails: function(propertyId) {
        const property = this.inventory.find(p => p.id === propertyId);
        if (!property) return;

        // Close popup and show modal
        if (this.leafletMap) {
            this.leafletMap.closePopup();
        }

        this.showPropertyModal(property);
    },

    // Highlight property on map
    highlightPropertyOnMap: function(propertyId) {
        // Find the marker for this property
        const property = this.inventory.find(p => p.id === propertyId);
        if (!property || !this.leafletMap) return;

        // Create a temporary highlight circle
        const highlight = L.circle([property.geoCoordinates.lat, property.geoCoordinates.lng], {
            color: '#3b82f6',
            fillColor: '#3b82f6',
            fillOpacity: 0.3,
            radius: 50,
            weight: 3
        }).addTo(this.leafletMap);

        // Remove highlight after 3 seconds
        setTimeout(() => {
            this.leafletMap.removeLayer(highlight);
        }, 3000);
    },

    // Show pin click feedback
    showPinClickFeedback: function() {
        const indicator = document.getElementById('mapPinIndicator');
        if (indicator) {
            indicator.style.display = 'block';
            setTimeout(() => {
                indicator.style.display = 'none';
            }, 1500);
        }
    },

    // Center map on all properties
    centerMap: function() {
        if (!this.leafletMap || this.mapMarkers.length === 0) return;

        const group = new L.featureGroup(this.mapMarkers);
        this.leafletMap.fitBounds(group.getBounds().pad(0.1));
    },

    // Toggle fullscreen
    toggleFullscreen: function() {
        const mapContainer = document.getElementById('realMapContainer');
        
        if (!document.fullscreenElement) {
            mapContainer.requestFullscreen().then(() => {
                // Resize map after entering fullscreen
                setTimeout(() => {
                    this.leafletMap.invalidateSize();
                }, 100);
            });
        } else {
            document.exitFullscreen().then(() => {
                // Resize map after exiting fullscreen
                setTimeout(() => {
                    this.leafletMap.invalidateSize();
                }, 100);
            });
        }
    },

    // Refresh map view
    refreshMapView: function() {
        console.log('Refreshing map view...');
        this.loadPropertyInventory();
        this.updateMapMarkers();
        this.updateStatistics();
        
        // Show loading indicator
        const mapContainer = document.getElementById('realMap');
        const originalHtml = mapContainer.innerHTML;
        mapContainer.style.opacity = '0.7';
        
        setTimeout(() => {
            mapContainer.style.opacity = '1';
        }, 500);
    }
};

// Global functions
function closePropertyModal() {
    propertyMap.closePropertyModal();
}

function refreshMap() {
    propertyMap.loadPropertyInventory();
    propertyMap.renderMap();
    propertyMap.updateStatistics();
    
    if (propertyMap.currentView === 'real') {
        propertyMap.updateMapMarkers();
    }
}

// View switching functions
function switchToGridView() {
    propertyMap.currentView = 'grid';
    
    // Update toggle buttons
    document.getElementById('gridViewBtn').classList.add('active');
    document.getElementById('mapViewBtn').classList.remove('active');
    
    // Show/hide containers
    document.getElementById('gridMapContainer').style.display = 'block';
    document.getElementById('realMapContainer').classList.remove('active');
    
    console.log('Switched to grid view');
}

function switchToMapView() {
    propertyMap.currentView = 'real';
    
    // Update toggle buttons
    document.getElementById('gridViewBtn').classList.remove('active');
    document.getElementById('mapViewBtn').classList.add('active');
    
    // Show/hide containers
    document.getElementById('gridMapContainer').style.display = 'none';
    document.getElementById('realMapContainer').classList.add('active');
    
    // Refresh the Leaflet map after it becomes visible
    setTimeout(() => {
        if (propertyMap.leafletMap) {
            propertyMap.leafletMap.invalidateSize();
            propertyMap.updateMapMarkers();
        }
    }, 100);
    
    console.log('Switched to real map view');
}

// Map control functions
function centerMap() {
    propertyMap.centerMap();
}

function toggleFullscreen() {
    propertyMap.toggleFullscreen();
}

function refreshMapView() {
    propertyMap.refreshMapView();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    propertyMap.init();
});

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('propertyModal');
    if (event.target === modal) {
        closePropertyModal();
    }
});