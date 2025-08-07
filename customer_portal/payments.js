// Payments Page JavaScript

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Payments page loaded');
    initializePayments();
    setupEventListeners();
});

function initializePayments() {
    // Setup payment method switching
    setupPaymentMethods();
    
    // Setup form validation
    setupFormValidation();
    
    // Load payment data from URL parameters if any
    loadPaymentFromParams();
}

function setupEventListeners() {
    // Payment form submission
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentSubmission);
    }
    
    // Payment amount changes
    const paymentAmount = document.getElementById('paymentAmount');
    if (paymentAmount) {
        paymentAmount.addEventListener('input', updatePaymentSummary);
    }
    
    // Payment method changes
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', handlePaymentMethodChange);
    });
    
    // Card number formatting
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', formatCardNumber);
    }
    
    // Expiry date formatting
    const expiryDate = document.getElementById('expiryDate');
    if (expiryDate) {
        expiryDate.addEventListener('input', formatExpiryDate);
    }
    
    console.log('Payment event listeners setup complete');
}

function setupPaymentMethods() {
    // Show/hide payment method details based on selection
    const creditCardDetails = document.getElementById('cardDetails');
    const bankDetails = document.getElementById('bankDetails');
    const gcashDetails = document.getElementById('gcashDetails');
    
    // Initially show credit card details
    if (creditCardDetails) creditCardDetails.style.display = 'block';
    if (bankDetails) bankDetails.style.display = 'none';
    if (gcashDetails) gcashDetails.style.display = 'none';
}

function handlePaymentMethodChange(event) {
    const method = event.target.value;
    
    const creditCardDetails = document.getElementById('cardDetails');
    const bankDetails = document.getElementById('bankDetails');
    const gcashDetails = document.getElementById('gcashDetails');
    
    // Hide all method details
    if (creditCardDetails) creditCardDetails.style.display = 'none';
    if (bankDetails) bankDetails.style.display = 'none';
    if (gcashDetails) gcashDetails.style.display = 'none';
    
    // Show selected method details
    switch (method) {
        case 'credit_card':
            if (creditCardDetails) creditCardDetails.style.display = 'block';
            break;
        case 'bank_transfer':
            if (bankDetails) bankDetails.style.display = 'block';
            break;
        case 'gcash':
            if (gcashDetails) gcashDetails.style.display = 'block';
            break;
    }
    
    // Update processing fee based on method
    updateProcessingFee(method);
    
    console.log('Payment method changed to:', method);
}

function updateProcessingFee(method) {
    const processingFeeElement = document.getElementById('processingFee');
    const totalAmountElement = document.getElementById('totalAmount');
    const paymentAmount = parseFloat(document.getElementById('paymentAmount').value) || 0;
    
    let processingFee = 0;
    
    switch (method) {
        case 'credit_card':
            processingFee = 50; // Fixed fee for credit card
            break;
        case 'bank_transfer':
            processingFee = 15; // Lower fee for bank transfer
            break;
        case 'gcash':
            processingFee = 25; // Medium fee for GCash
            break;
    }
    
    const totalAmount = paymentAmount + processingFee;
    
    if (processingFeeElement) {
        processingFeeElement.textContent = `₱${processingFee.toFixed(2)}`;
    }
    
    if (totalAmountElement) {
        totalAmountElement.textContent = `₱${totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
    }
}

function updatePaymentSummary() {
    const paymentAmount = parseFloat(document.getElementById('paymentAmount').value) || 0;
    const summaryAmountElement = document.getElementById('summaryAmount');
    
    if (summaryAmountElement) {
        summaryAmountElement.textContent = `₱${paymentAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
    }
    
    // Update processing fee based on current method
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (selectedMethod) {
        updateProcessingFee(selectedMethod.value);
    }
}

function setupFormValidation() {
    // Real-time validation for required fields
    const requiredFields = document.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    
    if (!value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Specific validation based on field type
    switch (field.id) {
        case 'cardNumber':
            return validateCardNumber(field);
        case 'expiryDate':
            return validateExpiryDate(field);
        case 'cvv':
            return validateCVV(field);
        case 'paymentAmount':
            return validatePaymentAmount(field);
    }
    
    clearFieldError(field);
    return true;
}

function validateCardNumber(field) {
    const cardNumber = field.value.replace(/\s/g, '');
    
    if (cardNumber.length < 13 || cardNumber.length > 19) {
        showFieldError(field, 'Please enter a valid card number');
        return false;
    }
    
    if (!/^\d+$/.test(cardNumber)) {
        showFieldError(field, 'Card number should contain only digits');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

function validateExpiryDate(field) {
    const expiry = field.value;
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    
    if (!regex.test(expiry)) {
        showFieldError(field, 'Please enter a valid expiry date (MM/YY)');
        return false;
    }
    
    // Check if date is in the future
    const [month, year] = expiry.split('/');
    const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    const currentDate = new Date();
    
    if (expiryDate < currentDate) {
        showFieldError(field, 'Card has expired');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

function validateCVV(field) {
    const cvv = field.value;
    
    if (!/^\d{3,4}$/.test(cvv)) {
        showFieldError(field, 'Please enter a valid CVV');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

function validatePaymentAmount(field) {
    const amount = parseFloat(field.value);
    const minAmount = 125000; // Minimum payment amount
    
    if (amount < minAmount) {
        showFieldError(field, `Minimum payment amount is ₱${minAmount.toLocaleString()}`);
        return false;
    }
    
    clearFieldError(field);
    return true;
}

function formatCardNumber(event) {
    let value = event.target.value.replace(/\s/g, '');
    let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    
    if (formattedValue.length > 19) {
        formattedValue = formattedValue.substring(0, 19);
    }
    
    event.target.value = formattedValue;
}

function formatExpiryDate(event) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    event.target.value = value;
}

function handlePaymentSubmission(event) {
    event.preventDefault();
    
    console.log('Processing payment submission...');
    
    // Validate all fields
    const form = event.target;
    const isValid = validatePaymentForm(form);
    
    if (!isValid) {
        console.log('Form validation failed');
        if (typeof showNotification === 'function') {
            showNotification('Please correct the errors in the form', 'error');
        }
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitButton.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success modal
        showPaymentSuccess();
        
        console.log('Payment processed successfully');
    }, 3000);
}

function validatePaymentForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Check terms agreement
    const agreeTerms = document.getElementById('agreeTerms');
    if (agreeTerms && !agreeTerms.checked) {
        if (typeof showNotification === 'function') {
            showNotification('Please agree to the terms and conditions', 'error');
        }
        isValid = false;
    }
    
    return isValid;
}

function showPaymentSuccess() {
    const modal = document.getElementById('paymentSuccessModal');
    
    // Update receipt details
    const receiptReference = document.getElementById('receiptReference');
    const receiptAmount = document.getElementById('receiptAmount');
    const receiptDate = document.getElementById('receiptDate');
    
    if (receiptReference) {
        receiptReference.textContent = 'PAY-2024-' + Date.now().toString().slice(-6);
    }
    
    if (receiptAmount) {
        const totalAmount = document.getElementById('totalAmount').textContent;
        receiptAmount.textContent = totalAmount;
    }
    
    if (receiptDate) {
        receiptDate.textContent = new Date().toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('paymentSuccessModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Redirect to agreements page
    setTimeout(() => {
        window.location.href = 'reservation-agreements.html';
    }, 500);
}

function downloadReceipt() {
    console.log('Downloading payment receipt');
    
    if (typeof showNotification === 'function') {
        showNotification('Receipt downloaded successfully!', 'success');
    }
}

function clearForm() {
    const form = document.getElementById('paymentForm');
    if (form) {
        form.reset();
        
        // Clear any error messages
        const errorMessages = form.querySelectorAll('.field-error');
        errorMessages.forEach(error => error.remove());
        
        // Reset payment summary
        updatePaymentSummary();
        
        // Reset to credit card method
        const creditCardRadio = document.getElementById('creditCard');
        if (creditCardRadio) {
            creditCardRadio.checked = true;
            handlePaymentMethodChange({ target: creditCardRadio });
        }
    }
    
    console.log('Payment form cleared');
}

function loadPaymentFromParams() {
    // Check URL parameters for payment number
    const urlParams = new URLSearchParams(window.location.search);
    const paymentNumber = urlParams.get('payment');
    
    if (paymentNumber) {
        console.log('Loading payment for payment number:', paymentNumber);
        // Pre-fill form with payment details if needed
    }
}

function downloadPaymentHistory() {
    console.log('Downloading payment history');
    
    if (typeof showNotification === 'function') {
        showNotification('Preparing payment history...', 'info');
    }
    
    // Simulate download
    setTimeout(() => {
        if (typeof showNotification === 'function') {
            showNotification('Payment history downloaded successfully!', 'success');
        }
    }, 1500);
}

function showTerms() {
    // Show terms and conditions modal
    alert('Terms and Conditions:\n\n1. All payments are final and non-refundable.\n2. Processing fees apply based on payment method.\n3. Payment confirmation will be sent via email.\n4. Contact customer service for payment issues.');
}

// Utility functions
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    const errorElement = document.createElement('small');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--danger-color)';
    errorElement.style.fontSize = '0.75rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.style.display = 'block';
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Inject additional styles for payments page
function injectPaymentsStyles() {
    const styles = `
        <style>
        .field-error {
            color: var(--danger-color);
            font-size: 0.75rem;
            margin-top: 0.25rem;
            display: block;
        }
        
        .form-control.error,
        input.error,
        select.error {
            border-color: var(--danger-color);
            box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
        }
        
        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        .btn .fa-spinner {
            margin-right: 0.5rem;
        }
        
        .payment-section {
            opacity: 1;
            transition: opacity 0.3s ease;
        }
        
        .payment-section[style*="display: none"] {
            opacity: 0;
        }
        
        @media (max-width: 768px) {
            .method-label {
                flex-direction: column;
                text-align: center;
                gap: 0.5rem;
            }
            
            .method-icon {
                width: 40px;
                height: 40px;
                font-size: 1rem;
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Call the function to inject styles
injectPaymentsStyles(); 