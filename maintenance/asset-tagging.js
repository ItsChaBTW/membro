// Asset Tagging & Reporting JavaScript
var currentAsset = null;
var currentReportType = null;
var capturedMedia = [];
var cameraStream = null;
var mediaRecorder = null;
var recordedChunks = [];

// Asset Database
var assetDatabase = {
    'ELEV-A-001': {
        id: 'ELEV-A-001',
        name: 'Elevator A - Building Main',
        type: 'Elevator',
        location: 'Building A, Ground Floor',
        model: 'Otis Gen2',
        manufacturer: 'Otis Elevator Company',
        installDate: '2020-05-15',
        lastMaintenance: '2024-02-15',
        nextMaintenance: '2024-05-15',
        status: 'Operational',
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
        manufacturer: 'Carrier Corporation',
        installDate: '2021-03-10',
        lastMaintenance: '2024-03-01',
        nextMaintenance: '2024-06-01',
        status: 'Operational',
        maintenanceTasks: [
            'Replace air filters',
            'Clean evaporator coils',
            'Check refrigerant levels',
            'Inspect electrical connections'
        ]
    },
    'PUMP-C1-001': {
        id: 'PUMP-C1-001',
        name: 'Water Pump C1-001',
        type: 'Water Pump',
        location: 'Building C, Basement, Pump Room',
        model: 'Grundfos CR 10-4',
        manufacturer: 'Grundfos',
        installDate: '2019-08-20',
        lastMaintenance: '2024-01-15',
        nextMaintenance: '2024-04-15',
        status: 'Operational',
        maintenanceTasks: [
            'Check pump pressure',
            'Inspect seals and gaskets',
            'Test motor performance',
            'Check water flow rate'
        ]
    }
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Reset form state
    resetForm();
});

// Mobile Navigation Functions
function toggleMobileMenu() {
    var sidebar = document.querySelector('.sidebar');
    var overlay = document.querySelector('.mobile-overlay');
    var icon = document.getElementById('mobileMenuIcon');
    
    sidebar.classList.toggle('mobile-open');
    overlay.classList.toggle('active');
    
    // Change icon
    if (sidebar.classList.contains('mobile-open')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
}

function closeMobileMenu() {
    var sidebar = document.querySelector('.sidebar');
    var overlay = document.querySelector('.mobile-overlay');
    var icon = document.getElementById('mobileMenuIcon');
    
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
    
    // Reset icon
    icon.className = 'fas fa-bars';
}

// Scanner Functions
function openScanner() {
    document.getElementById('scannerModal').style.display = 'block';
    startScannerCamera();
}

function closeScanner() {
    document.getElementById('scannerModal').style.display = 'none';
    stopScannerCamera();
}

function startScannerCamera() {
    navigator.mediaDevices.getUserMedia({ 
        video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
        } 
    })
    .then(function(stream) {
        var video = document.getElementById('scannerVideo');
        video.srcObject = stream;
        video.play();
        cameraStream = stream;
    })
    .catch(function(err) {
        console.log('Camera access denied:', err);
        showNotification('Camera access is required for QR scanning', 'error');
    });
}

function stopScannerCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
}

function simulateScan(assetId) {
    var asset = assetDatabase[assetId];
    if (asset) {
        currentAsset = asset;
        displayAsset(asset);
        closeScanner();
        showNotification('Asset scanned successfully!', 'success');
    }
}

function displayAsset(asset) {
    // Show asset info section
    var assetInfo = document.getElementById('assetInfo');
    assetInfo.classList.add('show');
    
    // Update asset header
    document.getElementById('assetName').textContent = asset.name;
    document.getElementById('assetId').textContent = `ID: ${asset.id}`;
    
    // Update asset details
    var detailsContainer = document.getElementById('assetDetails');
    detailsContainer.innerHTML = `
        <div class="asset-detail">
            <i class="fas fa-cog"></i>
            <div>
                <strong>Type:</strong> ${asset.type}<br>
                <small>${asset.model}</small>
            </div>
        </div>
        <div class="asset-detail">
            <i class="fas fa-map-marker-alt"></i>
            <div>
                <strong>Location:</strong><br>
                <small>${asset.location}</small>
            </div>
        </div>
        <div class="asset-detail">
            <i class="fas fa-industry"></i>
            <div>
                <strong>Manufacturer:</strong><br>
                <small>${asset.manufacturer}</small>
            </div>
        </div>
        <div class="asset-detail">
            <i class="fas fa-calendar"></i>
            <div>
                <strong>Last Maintenance:</strong><br>
                <small>${formatDate(asset.lastMaintenance)}</small>
            </div>
        </div>
        <div class="asset-detail">
            <i class="fas fa-check-circle"></i>
            <div>
                <strong>Status:</strong><br>
                <small style="color: #10b981;">${asset.status}</small>
            </div>
        </div>
    `;
    
    // Show report section
    var reportSection = document.getElementById('reportSection');
    reportSection.classList.add('show');
    
    // Enable form
    enableReportForm();
}

// Report Type Selection
function selectReportType(type) {
    currentReportType = type;
    
    // Update button states
    var issueBtn = document.getElementById('issueBtn');
    var maintenanceBtn = document.getElementById('maintenanceBtn');
    
    issueBtn.classList.remove('active');
    maintenanceBtn.classList.remove('active');
    
    if (type === 'issue') {
        issueBtn.classList.add('active');
        document.getElementById('prioritySelect').value = 'high';
    } else {
        maintenanceBtn.classList.add('active');
        document.getElementById('prioritySelect').value = 'normal';
    }
    
    updateSubmitButton();
}

// Camera Functions
function capturePhoto() {
    document.getElementById('cameraTitle').textContent = 'Capture Photo';
    document.getElementById('captureBtn').style.display = 'flex';
    document.getElementById('recordBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'none';
    
    openCamera('photo');
}

function captureVideo() {
    document.getElementById('cameraTitle').textContent = 'Record Video';
    document.getElementById('captureBtn').style.display = 'none';
    document.getElementById('recordBtn').style.display = 'flex';
    document.getElementById('stopBtn').style.display = 'none';
    
    openCamera('video');
}

function openCamera(mode) {
    document.getElementById('cameraModal').style.display = 'block';
    
    navigator.mediaDevices.getUserMedia({ 
        video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
        }, 
        audio: mode === 'video' 
    })
    .then(function(stream) {
        var video = document.getElementById('cameraVideo');
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
        showNotification('Camera access is required for photo/video capture', 'error');
    });
}

function closeCamera() {
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
    var video = document.getElementById('cameraVideo');
    var canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    canvas.toBlob(function(blob) {
        saveMedia(blob, 'photo');
    }, 'image/jpeg', 0.8);
    
    closeCamera();
}

function startRecording() {
    if (mediaRecorder && mediaRecorder.state === 'inactive') {
        recordedChunks = [];
        mediaRecorder.start();
        
        document.getElementById('recordBtn').style.display = 'none';
        document.getElementById('stopBtn').style.display = 'flex';
        
        showNotification('Recording started...', 'success');
    }
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        
        document.getElementById('recordBtn').style.display = 'flex';
        document.getElementById('stopBtn').style.display = 'none';
        
        showNotification('Recording stopped', 'success');
    }
}

function saveMedia(blob, type) {
    var timestamp = new Date().toISOString();
    var mediaItem = {
        id: 'media_' + Date.now(),
        type: type,
        blob: blob,
        timestamp: timestamp,
        assetId: currentAsset ? currentAsset.id : null
    };
    
    capturedMedia.push(mediaItem);
    displayMediaItem(mediaItem);
    
    var message = type === 'photo' ? 'Photo captured!' : 'Video recorded!';
    showNotification(message, 'success');
    
    updateSubmitButton();
}

function displayMediaItem(mediaItem) {
    var gallery = document.getElementById('mediaGallery');
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
    
    gallery.appendChild(mediaElement);
}

// Form Management
function enableReportForm() {
    // Enable all form elements
    document.getElementById('prioritySelect').disabled = false;
    document.getElementById('reportDescription').disabled = false;
    
    updateSubmitButton();
}

function updateSubmitButton() {
    var submitBtn = document.getElementById('submitBtn');
    var description = document.getElementById('reportDescription').value.trim();
    
    var canSubmit = currentAsset && 
                   currentReportType && 
                   description.length > 0;
    
    submitBtn.disabled = !canSubmit;
}

// Add event listeners for form validation
document.getElementById('reportDescription').addEventListener('input', updateSubmitButton);

// Submit Report
function submitReport() {
    if (!currentAsset || !currentReportType) {
        showNotification('Please scan an asset and select report type first', 'error');
        return;
    }
    
    var description = document.getElementById('reportDescription').value.trim();
    if (!description) {
        showNotification('Please enter a description', 'error');
        return;
    }
    
    var reportData = {
        id: 'RPT-' + Date.now(),
        assetId: currentAsset.id,
        assetName: currentAsset.name,
        reportType: currentReportType,
        priority: document.getElementById('prioritySelect').value,
        description: description,
        media: capturedMedia,
        timestamp: new Date().toISOString(),
        reporter: 'Current User', // In real app, get from session
        status: 'submitted'
    };
    
    // In real app, send to server
    console.log('Report submitted:', reportData);
    
    // Show success and reset
    showNotification('Report submitted successfully!', 'success');
    
    setTimeout(function() {
        resetForm();
        // Optionally redirect to reports list
        // window.location.href = 'reports.html';
    }, 2000);
}

// Utility Functions
function resetForm() {
    currentAsset = null;
    currentReportType = null;
    capturedMedia = [];
    
    // Hide sections
    document.getElementById('assetInfo').classList.remove('show');
    document.getElementById('reportSection').classList.remove('show');
    
    // Reset form
    document.getElementById('prioritySelect').value = 'normal';
    document.getElementById('reportDescription').value = '';
    document.getElementById('mediaGallery').innerHTML = '';
    
    // Reset buttons
    document.getElementById('issueBtn').classList.remove('active');
    document.getElementById('maintenanceBtn').classList.remove('active');
    document.getElementById('submitBtn').disabled = true;
}

function formatDate(dateString) {
    var date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showNotification(message, type) {
    // Remove existing notification
    var existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    var notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(function() {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(function() {
        notification.classList.remove('show');
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 3000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    var scannerModal = document.getElementById('scannerModal');
    var cameraModal = document.getElementById('cameraModal');
    
    if (event.target === scannerModal) {
        closeScanner();
    }
    if (event.target === cameraModal) {
        closeCamera();
    }
};

// Handle back button
window.addEventListener('beforeunload', function() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
    }
}); 