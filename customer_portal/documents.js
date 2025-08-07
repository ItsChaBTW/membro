// Documents functionality for Customer Portal

// Document types and requirements based on customer type
const documentRequirements = {
    individual: [
        {
            id: 'valid-id',
            name: 'Valid ID',
            description: 'Government-issued photo ID',
            icon: 'fas fa-id-card',
            required: true,
            uploaded: true,
            status: 'approved'
        },
        {
            id: 'income-cert',
            name: 'Income Certificate',
            description: 'Certificate of Employment or Income Tax Return',
            icon: 'fas fa-file-invoice-dollar',
            required: true,
            uploaded: true,
            status: 'approved'
        },
        {
            id: 'bank-statement',
            name: 'Bank Statement',
            description: '3 months bank statement',
            icon: 'fas fa-university',
            required: true,
            uploaded: true,
            status: 'under_review'
        },
        {
            id: 'birth-cert',
            name: 'Birth Certificate',
            description: 'PSA Birth Certificate',
            icon: 'fas fa-certificate',
            required: true,
            uploaded: false,
            status: 'pending'
        },
        {
            id: 'marriage-cert',
            name: 'Marriage Certificate',
            description: 'PSA Marriage Certificate (if married)',
            icon: 'fas fa-ring',
            required: false,
            uploaded: false,
            status: 'pending'
        }
    ],
    company: [
        {
            id: 'sec-cert',
            name: 'SEC Certificate',
            description: 'Certificate of Registration',
            icon: 'fas fa-building',
            required: true,
            uploaded: false,
            status: 'pending'
        },
        {
            id: 'articles-incorporation',
            name: 'Articles of Incorporation',
            description: 'Company Articles of Incorporation',
            icon: 'fas fa-file-contract',
            required: true,
            uploaded: false,
            status: 'pending'
        },
        {
            id: 'financial-statement',
            name: 'Financial Statement',
            description: 'Audited Financial Statement',
            icon: 'fas fa-chart-bar',
            required: true,
            uploaded: false,
            status: 'pending'
        },
        {
            id: 'board-resolution',
            name: 'Board Resolution',
            description: 'Board Resolution authorizing the purchase',
            icon: 'fas fa-gavel',
            required: true,
            uploaded: false,
            status: 'pending'
        },
        {
            id: 'authorized-signatory',
            name: 'Authorized Signatory',
            description: 'Valid ID of Authorized Signatory',
            icon: 'fas fa-user-tie',
            required: true,
            uploaded: false,
            status: 'pending'
        }
    ]
};

// Current customer type (this would normally come from user profile)
let currentCustomerType = 'individual';

// Initialize documents page
document.addEventListener('DOMContentLoaded', function() {
    initializeDocuments();
    setupEventListeners();
});

function initializeDocuments() {
    loadRequiredDocuments();
    updateDocumentProgress();
    updateCustomerTypeNotice();
}

function loadRequiredDocuments() {
    const documentsGrid = document.getElementById('documentsGrid');
    const requirements = documentRequirements[currentCustomerType];
    
    if (!documentsGrid) return;
    
    documentsGrid.innerHTML = '';
    
    requirements.forEach(doc => {
        const docElement = createRequiredDocumentElement(doc);
        documentsGrid.appendChild(docElement);
    });
}

function createRequiredDocumentElement(doc) {
    const docDiv = document.createElement('div');
    docDiv.className = `document-requirement ${doc.uploaded ? 'completed' : 'pending'}`;
    
    const statusClass = doc.status === 'approved' ? 'success' : 
                       doc.status === 'under_review' ? 'warning' : 
                       doc.status === 'rejected' ? 'danger' : 'secondary';
    
    docDiv.innerHTML = `
        <div class="requirement-icon">
            <i class="${doc.icon}"></i>
        </div>
        <div class="requirement-info">
            <h4>${doc.name}</h4>
            <p>${doc.description}</p>
            ${doc.required ? '<span class="required-label">Required</span>' : '<span class="optional-label">Optional</span>'}
        </div>
        <div class="requirement-status">
            <span class="status-badge ${statusClass}">
                ${doc.status === 'approved' ? 'Approved' : 
                  doc.status === 'under_review' ? 'Under Review' : 
                  doc.status === 'rejected' ? 'Rejected' : 'Pending'}
            </span>
        </div>
        <div class="requirement-actions">
            ${doc.uploaded ? 
                `<button class="btn-icon" onclick="viewDocument('${doc.id}')" title="View Document">
                    View
                </button>
                <button class="btn-icon" onclick="downloadDocument('${doc.id}')" title="Download Document">
                    Download
                </button>
                <button class="btn-icon" onclick="replaceDocument('${doc.id}')" title="Replace Document">
                    Replace
                </button>` :
                `<button class="btn btn-sm btn-primary" onclick="uploadDocument('${doc.id}')" title="Upload Document">
                    Upload
                </button>`
            }
        </div>
    `;
    
    return docDiv;
}

function updateDocumentProgress() {
    const requirements = documentRequirements[currentCustomerType];
    const requiredDocs = requirements.filter(doc => doc.required);
    const uploadedRequired = requiredDocs.filter(doc => doc.uploaded);
    
    const progressPercentage = Math.round((uploadedRequired.length / requiredDocs.length) * 100);
    const progressFill = document.querySelector('.progress-fill');
    const progressCount = document.querySelector('.progress-count');
    const progressPercentageEl = document.querySelector('.progress-percentage');
    
    if (progressFill) progressFill.style.width = `${progressPercentage}%`;
    if (progressCount) progressCount.textContent = `${uploadedRequired.length} of ${requiredDocs.length} Complete`;
    if (progressPercentageEl) progressPercentageEl.textContent = `${progressPercentage}%`;
    
    // Update pending count
    const pendingCount = requiredDocs.length - uploadedRequired.length;
    const requirementsStatus = document.querySelector('.requirements-status');
    if (requirementsStatus) {
        requirementsStatus.innerHTML = `
            <i class="fas fa-clock"></i>
            ${pendingCount} Pending
        `;
    }
}

function updateCustomerTypeNotice() {
    const message = document.getElementById('customerTypeMessage');
    if (message) {
        const typeText = currentCustomerType === 'individual' ? 'individual customer' : 'company';
        message.textContent = `Based on your customer type (${typeText}), the following documents are required for your application.`;
    }
}

function setupEventListeners() {
    // File input change listener
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
    
    // Upload form submit listener
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleFileUpload);
    }
    
    // Drag and drop listeners
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleFileDrop);
        uploadArea.addEventListener('click', () => fileInput.click());
    }
}

// Document actions
function viewDocument(docId) {
    showNotification('Opening document viewer...', 'info');
    // Simulate document viewing
    setTimeout(() => {
        showNotification('Document opened successfully', 'success');
    }, 1000);
}

function downloadDocument(docId) {
    showNotification('Downloading document...', 'info');
    // Simulate download
    setTimeout(() => {
        showNotification('Document downloaded successfully', 'success');
    }, 1500);
}

function uploadDocument(docId) {
    const uploadModal = document.getElementById('uploadModal');
    const uploadModalTitle = document.getElementById('uploadModalTitle');
    
    if (uploadModal && uploadModalTitle) {
        const doc = findDocumentById(docId);
        uploadModalTitle.textContent = `Upload ${doc ? doc.name : 'Document'}`;
        uploadModal.style.display = 'flex';
        uploadModal.dataset.documentId = docId;
    }
}

function replaceDocument(docId) {
    const doc = findDocumentById(docId);
    if (confirm(`Are you sure you want to replace the ${doc ? doc.name : 'document'}?`)) {
        uploadDocument(docId);
    }
}

function findDocumentById(docId) {
    const requirements = documentRequirements[currentCustomerType];
    return requirements.find(doc => doc.id === docId);
}

function refreshDocuments() {
    showNotification('Refreshing documents...', 'info');
    setTimeout(() => {
        initializeDocuments();
        showNotification('Documents refreshed successfully', 'success');
    }, 1000);
}

// Modal functions
function closeUploadModal() {
    const uploadModal = document.getElementById('uploadModal');
    if (uploadModal) {
        uploadModal.style.display = 'none';
        resetUploadForm();
    }
}

function resetUploadForm() {
    const fileInput = document.getElementById('fileInput');
    const filePreview = document.getElementById('filePreview');
    const uploadArea = document.getElementById('uploadArea');
    const uploadBtn = document.getElementById('uploadBtn');
    
    if (fileInput) fileInput.value = '';
    if (filePreview) filePreview.style.display = 'none';
    if (uploadArea) uploadArea.style.display = 'block';
    if (uploadBtn) uploadBtn.disabled = true;
}

// File handling functions
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        displayFilePreview(file);
    }
}

function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('dragover');
}

function handleDragLeave(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
}

function handleFileDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        document.getElementById('fileInput').files = files;
        displayFilePreview(file);
    }
}

function displayFilePreview(file) {
    const filePreview = document.getElementById('filePreview');
    const uploadArea = document.getElementById('uploadArea');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const uploadBtn = document.getElementById('uploadBtn');
    
    if (filePreview && uploadArea && fileName && fileSize && uploadBtn) {
        fileName.textContent = file.name;
        fileSize.textContent = formatFileSize(file.size);
        
        uploadArea.style.display = 'none';
        filePreview.style.display = 'flex';
        uploadBtn.disabled = false;
    }
}

function removeFile() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.value = '';
        resetUploadForm();
    }
}

function handleFileUpload(event) {
    event.preventDefault();
    
    const uploadModal = document.getElementById('uploadModal');
    const docId = uploadModal ? uploadModal.dataset.documentId : null;
    const fileInput = document.getElementById('fileInput');
    
    if (!fileInput || !fileInput.files[0] || !docId) {
        showNotification('Please select a file to upload', 'error');
        return;
    }
    
    const file = fileInput.files[0];
    
    // Simulate file upload
    showNotification('Uploading document...', 'info');
    
    setTimeout(() => {
        // Update document status
        const requirements = documentRequirements[currentCustomerType];
        const doc = requirements.find(d => d.id === docId);
        if (doc) {
            doc.uploaded = true;
            doc.status = 'under_review';
        }
        
        closeUploadModal();
        initializeDocuments();
        showNotification('Document uploaded successfully', 'success');
    }, 2000);
}

// Utility functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                              type === 'error' ? 'exclamation-circle' : 
                              type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Click outside modal to close
window.addEventListener('click', function(event) {
    const uploadModal = document.getElementById('uploadModal');
    if (event.target === uploadModal) {
        closeUploadModal();
    }
});