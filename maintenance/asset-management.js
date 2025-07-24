// Asset Management JavaScript
var assets = [
    {
        id: 'ELEV-A-001',
        name: 'Elevator A - Building Main',
        type: 'Elevator',
        location: 'Building A, Ground Floor',
        model: 'Otis Gen2',
        manufacturer: 'Otis Elevator Company',
        installDate: '2020-05-15',
        description: 'Main passenger elevator for Building A',
        status: 'Operational',
        lastMaintenance: '2024-02-15',
        nextMaintenance: '2024-05-15'
    },
    {
        id: 'AC-B2-003',
        name: 'AC Unit B2-003',
        type: 'Air Conditioning',
        location: 'Building B, 2nd Floor, Unit 203',
        model: 'Carrier 5-Ton Split Type',
        manufacturer: 'Carrier Corporation',
        installDate: '2021-03-10',
        description: 'Split type AC unit for Unit 203',
        status: 'Operational',
        lastMaintenance: '2024-03-01',
        nextMaintenance: '2024-06-01'
    },
    {
        id: 'PUMP-C1-001',
        name: 'Water Pump C1-001',
        type: 'Water Pump',
        location: 'Building C, Basement, Pump Room',
        model: 'Grundfos CR 10-4',
        manufacturer: 'Grundfos',
        installDate: '2019-08-20',
        description: 'Main water circulation pump',
        status: 'Operational',
        lastMaintenance: '2024-01-15',
        nextMaintenance: '2024-04-15'
    },
    {
        id: 'GEN-A-001',
        name: 'Generator A-001',
        type: 'Generator',
        location: 'Building A, Basement, Generator Room',
        model: 'Caterpillar 500kW',
        manufacturer: 'Caterpillar Inc.',
        installDate: '2020-01-15',
        description: 'Emergency backup generator',
        status: 'Operational',
        lastMaintenance: '2024-02-01',
        nextMaintenance: '2024-05-01'
    },
    {
        id: 'FIRE-B-001',
        name: 'Fire Panel B-001',
        type: 'Fire System',
        location: 'Building B, Ground Floor, Security',
        model: 'Honeywell FACP',
        manufacturer: 'Honeywell',
        installDate: '2020-06-10',
        description: 'Main fire alarm control panel',
        status: 'Operational',
        lastMaintenance: '2024-01-20',
        nextMaintenance: '2024-07-20'
    },
    {
        id: 'CCTV-L-001',
        name: 'CCTV Camera L-001',
        type: 'CCTV',
        location: 'Lobby, Main Entrance',
        model: 'Hikvision DS-2CD2185FWD-I',
        manufacturer: 'Hikvision',
        installDate: '2021-02-15',
        description: 'Main entrance security camera',
        status: 'Operational',
        lastMaintenance: '2024-01-10',
        nextMaintenance: '2024-07-10'
    }
];

var currentQRAsset = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    displayAssets();
    updateAssetCount();
});

// Mobile menu functions
function toggleMobileMenu() {
    var sidebar = document.querySelector('.sidebar');
    var overlay = document.querySelector('.mobile-overlay');
    var toggle = document.querySelector('.mobile-menu-toggle');
    
    sidebar.classList.toggle('mobile-open');
    overlay.classList.toggle('active');
    
    var icon = toggle.querySelector('i');
    if (sidebar.classList.contains('mobile-open')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
}

function closeMobileMenu() {
    var sidebar = document.querySelector('.sidebar');
    var overlay = document.querySelector('.mobile-overlay');
    var toggle = document.querySelector('.mobile-menu-toggle');
    
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
    toggle.querySelector('i').className = 'fas fa-bars';
}

// Asset Form Functions
function toggleAssetForm() {
    var form = document.getElementById('assetForm');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth' });
    } else {
        form.style.display = 'none';
    }
}

function openAssetModal() {
    toggleAssetForm();
}

function cancelAssetForm() {
    document.getElementById('assetForm').style.display = 'none';
    clearAssetForm();
}

function clearAssetForm() {
    document.getElementById('assetName').value = '';
    document.getElementById('assetType').value = '';
    document.getElementById('assetLocation').value = '';
    document.getElementById('assetModel').value = '';
    document.getElementById('assetManufacturer').value = '';
    document.getElementById('assetInstallDate').value = '';
    document.getElementById('assetDescription').value = '';
}

function saveAsset() {
    var name = document.getElementById('assetName').value.trim();
    var type = document.getElementById('assetType').value;
    var location = document.getElementById('assetLocation').value.trim();
    var model = document.getElementById('assetModel').value.trim();
    var manufacturer = document.getElementById('assetManufacturer').value.trim();
    var installDate = document.getElementById('assetInstallDate').value;
    var description = document.getElementById('assetDescription').value.trim();

    if (!name || !type || !location) {
        alert('Please fill in required fields: Name, Type, and Location');
        return;
    }

    // Generate asset ID
    var typePrefix = type.substring(0, 4).toUpperCase();
    var assetId = typePrefix + '-' + generateRandomId();

    var newAsset = {
        id: assetId,
        name: name,
        type: type,
        location: location,
        model: model,
        manufacturer: manufacturer,
        installDate: installDate,
        description: description,
        status: 'Operational',
        lastMaintenance: null,
        nextMaintenance: null
    };

    assets.push(newAsset);
    displayAssets();
    updateAssetCount();
    cancelAssetForm();
    
    showNotification('Asset created successfully!', 'success');
}

function generateRandomId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Display Assets
function displayAssets() {
    var grid = document.getElementById('assetsGrid');
    grid.innerHTML = '';

    assets.forEach(function(asset) {
        var card = createAssetCard(asset);
        grid.appendChild(card);
    });
}

function createAssetCard(asset) {
    var card = document.createElement('div');
    card.className = 'asset-card';
    
    card.innerHTML = `
        <div class="asset-header">
            <div class="asset-info">
                <h4>${asset.name}</h4>
                <div class="asset-id">${asset.id}</div>
            </div>
            <span class="asset-type">${asset.type}</span>
        </div>
        
        <div class="asset-details">
            <div class="asset-detail">
                <i class="fas fa-map-marker-alt"></i>
                <span>${asset.location}</span>
            </div>
            <div class="asset-detail">
                <i class="fas fa-cog"></i>
                <span>${asset.model || 'Model not specified'}</span>
            </div>
            <div class="asset-detail">
                <i class="fas fa-industry"></i>
                <span>${asset.manufacturer || 'Manufacturer not specified'}</span>
            </div>
            <div class="asset-detail">
                <i class="fas fa-calendar"></i>
                <span>Installed: ${asset.installDate ? formatDate(asset.installDate) : 'Date not specified'}</span>
            </div>
            <div class="asset-detail">
                <i class="fas fa-check-circle" style="color: #10b981;"></i>
                <span>${asset.status}</span>
            </div>
        </div>
        
        <div class="asset-actions">
            <button class="btn btn-primary btn-sm" onclick="generateQR('${asset.id}')" style="white-space: nowrap;">
                <i class="fas fa-qrcode"></i> <span class="btn-text">QR Code</span>
            </button>
            <button class="btn btn-secondary btn-sm" onclick="editAsset('${asset.id}')" style="white-space: nowrap;">
                <i class="fas fa-edit"></i> <span class="btn-text">Edit</span>
            </button>
            <button class="btn btn-warning btn-sm" onclick="printAssetQR('${asset.id}')" style="white-space: nowrap;">
                <i class="fas fa-print"></i> <span class="btn-text">Print</span>
            </button>
        </div>
    `;
    
    return card;
}

// QR Code Functions
function generateQR(assetId) {
    console.log('generateQR called with assetId:', assetId);
    
    var asset = assets.find(a => a.id === assetId);
    if (!asset) {
        console.error('Asset not found:', assetId);
        return;
    }

    console.log('Asset found:', asset);
    currentQRAsset = asset;
    
    // Update modal content
    document.getElementById('qrAssetName').textContent = asset.name;
    document.getElementById('qrAssetId').textContent = asset.id;
    
    // Generate QR code
    var qrContainer = document.getElementById('qrCodeContainer');
    qrContainer.innerHTML = '';
    
    console.log('Generating QR code for:', asset.id);
    
    // Use QRCode constructor approach (same as working pages)
    try {
        new QRCode(qrContainer, {
            text: asset.id,
            width: 150,
            height: 150,
            colorDark: '#000000',
            colorLight: '#ffffff'
        });
        console.log('QR Code generated successfully');
    } catch (error) {
        console.error('QR Code generation failed:', error);
        qrContainer.innerHTML = '<p style="color: red;">Failed to generate QR code</p>';
    }
    
    // Show modal
    var modal = document.getElementById('qrModal');
    modal.style.display = 'block';
    console.log('Modal display set to block');
}

function closeQRModal() {
    document.getElementById('qrModal').style.display = 'none';
    currentQRAsset = null;
}

function printQR() {
    if (!currentQRAsset) return;
    
    var printWindow = window.open('', '_blank');
    var qrSticker = document.getElementById('qrSticker').cloneNode(true);
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>QR Code Sticker - ${currentQRAsset.id}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                .qr-sticker {
                    background: white;
                    border: 3px solid #000;
                    border-radius: 8px;
                    padding: 20px;
                    text-align: center;
                    width: 250px;
                }
                .qr-sticker h5 {
                    margin: 0 0 10px 0;
                    font-size: 14px;
                    font-weight: bold;
                }
                .qr-sticker canvas {
                    margin: 10px 0;
                }
                .asset-id {
                    color: #000;
                    font-weight: bold;
                    font-size: 16px;
                    margin-top: 10px;
                }
                @media print {
                    body { margin: 0; }
                    .qr-sticker { 
                        border: 2px solid #000; 
                        page-break-inside: avoid;
                    }
                }
            </style>
        </head>
        <body>
            ${qrSticker.outerHTML}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(function() {
        printWindow.print();
        printWindow.close();
    }, 500);
    
    showNotification('QR code sent to printer!', 'success');
}

function printAssetQR(assetId) {
    generateQR(assetId);
    setTimeout(function() {
        printQR();
        closeQRModal();
    }, 500);
}

function printAllQR() {
    if (assets.length === 0) {
        alert('No assets to print');
        return;
    }
    
    var printWindow = window.open('', '_blank');
    var content = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>All QR Code Stickers</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px;
                }
                .qr-sticker {
                    background: white;
                    border: 3px solid #000;
                    border-radius: 8px;
                    padding: 20px;
                    text-align: center;
                    page-break-inside: avoid;
                }
                .qr-sticker h5 {
                    margin: 0 0 10px 0;
                    font-size: 14px;
                    font-weight: bold;
                }
                .asset-id {
                    color: #000;
                    font-weight: bold;
                    font-size: 16px;
                    margin-top: 10px;
                }
                @media print {
                    body { 
                        margin: 10px;
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            </style>
            <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
        </head>
        <body>
    `;
    
    assets.forEach(function(asset) {
        content += `
            <div class="qr-sticker">
                <h5>${asset.name}</h5>
                <canvas id="qr-${asset.id}"></canvas>
                <div class="asset-id">${asset.id}</div>
            </div>
        `;
    });
    
    content += `
            <script>
                window.onload = function() {
                    var assets = ${JSON.stringify(assets)};
                    var promises = assets.map(function(asset) {
                        return new Promise(function(resolve) {
                            var canvas = document.getElementById('qr-' + asset.id);
                            QRCode.toCanvas(canvas, asset.id, {
                                width: 150,
                                height: 150,
                                margin: 1
                            }, function() {
                                resolve();
                            });
                        });
                    });
                    
                    Promise.all(promises).then(function() {
                        setTimeout(function() {
                            window.print();
                        }, 1000);
                    });
                };
            </script>
        </body>
        </html>
    `;
    
    printWindow.document.write(content);
    printWindow.document.close();
    
    showNotification('All QR codes sent to printer!', 'success');
}

// Asset Management Functions
function editAsset(assetId) {
    var asset = assets.find(a => a.id === assetId);
    if (!asset) return;
    
    // Populate form with asset data
    document.getElementById('assetName').value = asset.name;
    document.getElementById('assetType').value = asset.type;
    document.getElementById('assetLocation').value = asset.location;
    document.getElementById('assetModel').value = asset.model || '';
    document.getElementById('assetManufacturer').value = asset.manufacturer || '';
    document.getElementById('assetInstallDate').value = asset.installDate || '';
    document.getElementById('assetDescription').value = asset.description || '';
    
    // Show form
    document.getElementById('assetForm').style.display = 'block';
    document.getElementById('assetForm').scrollIntoView({ behavior: 'smooth' });
    
    // Change save button to update
    var saveBtn = document.querySelector('#assetForm .btn-primary');
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Update Asset';
    saveBtn.onclick = function() { updateAsset(assetId); };
}

function updateAsset(assetId) {
    var assetIndex = assets.findIndex(a => a.id === assetId);
    if (assetIndex === -1) return;
    
    var name = document.getElementById('assetName').value.trim();
    var type = document.getElementById('assetType').value;
    var location = document.getElementById('assetLocation').value.trim();
    var model = document.getElementById('assetModel').value.trim();
    var manufacturer = document.getElementById('assetManufacturer').value.trim();
    var installDate = document.getElementById('assetInstallDate').value;
    var description = document.getElementById('assetDescription').value.trim();

    if (!name || !type || !location) {
        alert('Please fill in required fields: Name, Type, and Location');
        return;
    }

    // Update asset
    assets[assetIndex] = {
        ...assets[assetIndex],
        name: name,
        type: type,
        location: location,
        model: model,
        manufacturer: manufacturer,
        installDate: installDate,
        description: description
    };

    displayAssets();
    cancelAssetForm();
    
    // Reset save button
    var saveBtn = document.querySelector('#assetForm .btn-primary');
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Create Asset';
    saveBtn.onclick = saveAsset;
    
    showNotification('Asset updated successfully!', 'success');
}

// Utility Functions
function updateAssetCount() {
    document.getElementById('assetCount').textContent = `(${assets.length} total)`;
}

function formatDate(dateString) {
    if (!dateString) return 'Not specified';
    var date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showNotification(message, type) {
    var notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.background = '#10b981';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.remove();
    }, 3000);
}

// Close modal when clicking outside
window.onclick = function(event) {
    var modal = document.getElementById('qrModal');
    if (event.target === modal) {
        closeQRModal();
    }
};

// Close mobile menu when clicking nav links
document.addEventListener('click', function(event) {
    if (event.target.closest('.nav-link')) {
        closeMobileMenu();
    }
}); 