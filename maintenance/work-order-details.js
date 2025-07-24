// Work Order Details JavaScript
var currentWorkOrder = null;
var capturedMedia = [];
var currentAsset = null;
var cameraStream = null;
var mediaRecorder = null;
var recordedChunks = [];

// Sample asset database
var assetDatabase = {
    'ELEV-A-001': {
        id: 'ELEV-A-001',
        name: 'Elevator A - Building Main',
        type: 'Elevator',
        location: 'Building A, Ground Floor',
        model: 'Otis Gen2',
        lastMaintenance: '2024-02-15',
        nextMaintenance: '2024-05-15',
        maintenanceTasks: [
            'Check cable tension',
            'Inspect door mechanisms',
            'Test emergency systems',
            'Lubricate guide rails'
        ]
    },
    'AC-B2-003': {
        id: 'AC-B2-003',
        name: 'AC Unit B2-003',
        type: 'Air Conditioning',
        location: 'Building B, 2nd Floor, Unit 203',
        model: 'Carrier 5-Ton Split Type',
        lastMaintenance: '2024-03-01',
        nextMaintenance: '2024-06-01',
        maintenanceTasks: [
            'Replace air filters',
            'Clean evaporator coils',
            'Check refrigerant levels',
            'Inspect electrical connections'
        ]
    }
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Get work order ID from URL parameters
    var urlParams = new URLSearchParams(window.location.search);
    var workOrderId = urlParams.get('id');
    
    if (workOrderId) {
        currentWorkOrder = workOrderId;
        loadWorkOrder(workOrderId);
    }
});

function loadWorkOrder(workOrderId) {
    // Get work order data (in real app, fetch from database)
    var workOrderData = getWorkOrderData(workOrderId);
    
    // Update page title and header
    document.getElementById('workOrderTitle').textContent = workOrderData.title;
    document.getElementById('workOrderId').textContent = `Work Order: ${workOrderId}`;
    
    // Populate form fields
    document.getElementById('workOrderStatus').value = workOrderData.status;
    document.getElementById('workOrderPriority').value = workOrderData.priority || 'normal';
    document.getElementById('workOrderDescription').value = workOrderData.description || workOrderData.title;
    document.getElementById('workNotes').value = workOrderData.notes || '';
    
    // Load existing media
    loadWorkOrderMedia(workOrderId);
}

function getWorkOrderData(workOrderId) {
    // Sample data - in real app, fetch from database
    var sampleData = {
        'CAS-01001-Q4R1': {
            title: 'Aircon not cooling properly',
            status: 'progress',
            priority: 'high',
            description: 'Air conditioning unit in Unit 203 is not cooling properly. Residents complaining about warm air.',
            notes: 'Initial inspection completed. Possible refrigerant leak detected. Need to check coils and refrigerant levels.'
        },
        'CAS-01000-B8X3B2': {
            title: 'Leak in Toilet',
            status: 'progress',
            priority: 'high',
            description: 'Water leak detected from toilet base in Unit 505. Causing water damage to floor.',
            notes: 'Water leak from toilet base. Need to check wax ring and bolts. Possible floor damage assessment required.'
        },
        'CAS-01002-Y8Z4Z2': {
            title: 'Light Bulb Replacement',
            status: 'progress',
            priority: 'normal',
            description: 'LED bulb replacement needed in lobby area. Multiple bulbs are flickering.',
            notes: 'LED bulb replacement in lobby area. Check electrical connections for flickering issue.'
        }
    };
    return sampleData[workOrderId] || { 
        title: 'Unknown Work Order', 
        status: 'open', 
        priority: 'normal',
        description: '',
        notes: '' 
    };
}

// Asset Scanner Functions
function openAssetScanner() {
    document.getElementById('assetScannerModal').style.display = 'block';
    startAssetCamera();
}

function closeAssetScanner() {
    document.getElementById('assetScannerModal').style.display = 'none';
    stopAssetCamera();
}

function startAssetCamera() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(function(stream) {
            var video = document.getElementById('assetCameraStream');
            video.srcObject = stream;
            video.play();
            cameraStream = stream;
        })
        .catch(function(err) {
            console.log('Camera access denied:', err);
            alert('Camera access is required for QR scanning');
        });
}

function stopAssetCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
}

function simulateAssetScan(assetId) {
    var asset = assetDatabase[assetId];
    if (asset) {
        currentAsset = asset;
        displayAssetInfo(asset);
        closeAssetScanner();
    }
}

function displayAssetInfo(asset) {
    document.getElementById('selectedAsset').style.display = 'block';
    document.getElementById('noAsset').style.display = 'none';
    
    document.getElementById('assetDetails').innerHTML = `
        <div><strong>${asset.name}</strong> (${asset.id})</div>
        <div><small><i class="fas fa-map-marker-alt"></i> ${asset.location}</small></div>
        <div><small><i class="fas fa-cog"></i> ${asset.model}</small></div>
        <div><small><i class="fas fa-calendar"></i> Last Maintenance: ${asset.lastMaintenance}</small></div>
    `;
    
    // Show preventive maintenance section
    document.getElementById('preventiveMaintenanceCard').style.display = 'block';
    
    // Pre-fill maintenance data
    document.getElementById('nextMaintenanceDate').value = asset.nextMaintenance;
    document.getElementById('maintenanceTasks').value = asset.maintenanceTasks.join('\n');
}

// Camera Functions
function capturePhoto() {
    document.getElementById('cameraModalTitle').innerHTML = '<i class="fas fa-camera"></i> Capture Photo';
    document.getElementById('captureBtn').style.display = 'inline-block';
    document.getElementById('recordBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'none';
    
    openCameraModal('photo');
}

function captureVideo() {
    document.getElementById('cameraModalTitle').innerHTML = '<i class="fas fa-video"></i> Record Video';
    document.getElementById('captureBtn').style.display = 'none';
    document.getElementById('recordBtn').style.display = 'inline-block';
    document.getElementById('stopBtn').style.display = 'none';
    
    openCameraModal('video');
}

function openCameraModal(mode) {
    document.getElementById('cameraModal').style.display = 'block';
    
    navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: mode === 'video' 
    })
    .then(function(stream) {
        var video = document.getElementById('cameraStream');
        video.srcObject = stream;
        video.play();
        cameraStream = stream;
        
        if (mode === 'video') {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = function(event) {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };
            mediaRecorder.onstop = function() {
                var blob = new Blob(recordedChunks, { type: 'video/webm' });
                saveMedia(blob, 'video');
                recordedChunks = [];
            };
        }
    })
    .catch(function(err) {
        console.log('Camera access denied:', err);
        alert('Camera access is required for photo/video capture');
    });
}

function closeCameraModal() {
    document.getElementById('cameraModal').style.display = 'none';
    
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }
}

function takePicture() {
    var video = document.getElementById('cameraStream');
    var canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    canvas.toBlob(function(blob) {
        saveMedia(blob, 'photo');
    }, 'image/jpeg', 0.8);
    
    closeCameraModal();
}

function startRecording() {
    if (mediaRecorder && mediaRecorder.state === 'inactive') {
        recordedChunks = [];
        mediaRecorder.start();
        
        document.getElementById('recordBtn').style.display = 'none';
        document.getElementById('stopBtn').style.display = 'inline-block';
    }
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        
        document.getElementById('recordBtn').style.display = 'inline-block';
        document.getElementById('stopBtn').style.display = 'none';
    }
}

function saveMedia(blob, type) {
    var timestamp = new Date().toISOString();
    var mediaItem = {
        id: 'media_' + Date.now(),
        type: type,
        blob: blob,
        timestamp: timestamp,
        workOrderId: currentWorkOrder
    };
    
    capturedMedia.push(mediaItem);
    displayMediaItem(mediaItem);
    
    // In real app, upload to server
    console.log('Media captured:', mediaItem);
    
    // Show success message
    var message = type === 'photo' ? 'Photo captured successfully!' : 'Video recorded successfully!';
    showNotification(message, 'success');
}

function displayMediaItem(mediaItem) {
    var mediaContainer = document.getElementById('mediaItems');
    var mediaElement = document.createElement('div');
    mediaElement.className = 'media-item';
    
    if (mediaItem.type === 'photo') {
        var img = document.createElement('img');
        img.src = URL.createObjectURL(mediaItem.blob);
        img.alt = 'Captured photo';
        mediaElement.appendChild(img);
    } else {
        var video = document.createElement('video');
        video.src = URL.createObjectURL(mediaItem.blob);
        video.controls = true;
        video.muted = true;
        mediaElement.appendChild(video);
    }
    
    var timestamp = document.createElement('div');
    timestamp.className = 'media-timestamp';
    timestamp.textContent = new Date(mediaItem.timestamp).toLocaleTimeString();
    mediaElement.appendChild(timestamp);
    
    mediaContainer.appendChild(mediaElement);
}

function loadWorkOrderMedia(workOrderId) {
    // Clear existing media display
    document.getElementById('mediaItems').innerHTML = '';
    
    // In real app, load from database
    // For demo, show existing media if any
    capturedMedia.filter(item => item.workOrderId === workOrderId)
        .forEach(item => displayMediaItem(item));
}

// Preventive Maintenance Functions
function scheduleMaintenance() {
    if (!currentAsset) {
        alert('Please scan an asset first');
        return;
    }
    
    var nextDate = document.getElementById('nextMaintenanceDate').value;
    var frequency = document.getElementById('maintenanceFrequency').value;
    var tasks = document.getElementById('maintenanceTasks').value;
    
    if (!nextDate || !tasks) {
        alert('Please fill in all maintenance details');
        return;
    }
    
    // In real app, save to database
    var maintenanceSchedule = {
        assetId: currentAsset.id,
        nextDate: nextDate,
        frequency: frequency,
        tasks: tasks,
        workOrderId: currentWorkOrder
    };
    
    console.log('Maintenance scheduled:', maintenanceSchedule);
    showNotification('Preventive maintenance scheduled successfully!', 'success');
}

function saveWorkOrder() {
    var workOrderData = {
        id: currentWorkOrder,
        title: document.getElementById('workOrderDescription').value,
        status: document.getElementById('workOrderStatus').value,
        priority: document.getElementById('workOrderPriority').value,
        description: document.getElementById('workOrderDescription').value,
        notes: document.getElementById('workNotes').value,
        assetId: currentAsset ? currentAsset.id : null,
        media: capturedMedia.filter(item => item.workOrderId === currentWorkOrder)
    };
    
    // In real app, save to database
    console.log('Work order saved:', workOrderData);
    showNotification('Work order updated successfully!', 'success');
    
    // Redirect back to work orders list after a delay
    setTimeout(function() {
        window.location.href = 'work-orders.html';
    }, 1500);
}

// Utility Functions
function showNotification(message, type) {
    // Create notification element
    var notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
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
    } else {
        notification.style.background = '#6b7280';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(function() {
        notification.remove();
    }, 3000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    var assetModal = document.getElementById('assetScannerModal');
    var cameraModal = document.getElementById('cameraModal');
    
    if (event.target === assetModal) {
        closeAssetScanner();
    }
    if (event.target === cameraModal) {
        closeCameraModal();
    }
}; 