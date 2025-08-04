// Reports Page JavaScript

// Sample report data
const reportData = {
    rfCustomers: [
        { customerName: "John Doe", propertyName: "Modern 2BR Condo", rfAmount: 125000, paymentDate: "2024-01-15", status: "paid" },
        { customerName: "Jane Smith", propertyName: "Family House", rfAmount: 225000, paymentDate: "2024-01-10", status: "paid" },
        { customerName: "Sarah Wilson", propertyName: "Luxury Penthouse", rfAmount: 425000, paymentDate: "2024-01-05", status: "paid" },
        { customerName: "Mike Johnson", propertyName: "Townhouse Unit", rfAmount: 160000, paymentDate: "2024-01-20", status: "pending" }
    ],
    cancelledOpportunities: [
        { customerName: "David Brown", propertyName: "Suburban House", reason: "Budget constraints", cancelledDate: "2024-01-18" },
        { customerName: "Lisa Garcia", propertyName: "Studio Condo", reason: "Found better option", cancelledDate: "2024-01-22" }
    ],
    raOpportunities: [
        { customerName: "John Doe", propertyName: "Modern 2BR Condo", raDate: "2024-01-15", totalAmount: 2500000 },
        { customerName: "Jane Smith", propertyName: "Family House", raDate: "2024-01-10", totalAmount: 4500000 },
        { customerName: "Sarah Wilson", propertyName: "Luxury Penthouse", raDate: "2024-01-05", totalAmount: 8500000 }
    ]
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadRecentReports();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Modal close buttons
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
}

// Load recent reports
function loadRecentReports() {
    const reportsList = document.getElementById('reportsList');
    if (!reportsList) return;
    
    const recentReports = [
        { name: "Customers with Paid RF", date: "2024-01-25", type: "RF Report" },
        { name: "Cancelled Opportunities", date: "2024-01-24", type: "Cancellation Report" },
        { name: "Opportunities with RAs", date: "2024-01-23", type: "RA Report" },
        { name: "Sales Performance", date: "2024-01-22", type: "Performance Report" }
    ];
    
    reportsList.innerHTML = recentReports.map(report => `
        <div class="recent-report-item">
            <div class="report-info">
                <h4>${report.name}</h4>
                <p>${report.type}</p>
                <span class="report-date">${formatDate(report.date)}</span>
            </div>
            <div class="report-actions">
                <button class="btn-icon" onclick="downloadReport('${report.name}')" title="Download">
                    <i class="fas fa-download"></i>
                </button>
                <button class="btn-icon" onclick="viewReport('${report.name}')" title="View">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Generate RF Report
function generateRfReport() {
    const dateRange = getDateRange('rfStartDate', 'rfEndDate');
    if (!dateRange) return;
    
    if (!validateDateRange(dateRange.startDate, dateRange.endDate)) return;
    
    const filteredData = reportData.rfCustomers.filter(customer => {
        const paymentDate = new Date(customer.paymentDate);
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);
        return paymentDate >= startDate && paymentDate <= endDate;
    });
    
    if (filteredData.length === 0) {
        showNotification('No data found for the selected date range', 'info');
        return;
    }
    
    const reportName = `RF_Customers_${dateRange.startDate}_to_${dateRange.endDate}`;
    generateCSV(filteredData, `${reportName}.csv`);
    
    // Store report in recent reports
    storeRecentReport('Customers with Paid RF', 'RF Report');
}

// Generate Cancelled Opportunities Report
function generateCancelledReport() {
    const dateRange = getDateRange('cancelledStartDate', 'cancelledEndDate');
    if (!dateRange) return;
    
    if (!validateDateRange(dateRange.startDate, dateRange.endDate)) return;
    
    const filteredData = reportData.cancelledOpportunities.filter(opportunity => {
        const cancelledDate = new Date(opportunity.cancelledDate);
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);
        return cancelledDate >= startDate && cancelledDate <= endDate;
    });
    
    if (filteredData.length === 0) {
        showNotification('No data found for the selected date range', 'info');
        return;
    }
    
    const reportName = `Cancelled_Opportunities_${dateRange.startDate}_to_${dateRange.endDate}`;
    generateCSV(filteredData, `${reportName}.csv`);
    
    // Store report in recent reports
    storeRecentReport('Cancelled Opportunities', 'Cancellation Report');
}

// Generate RA Report
function generateRaReport() {
    const dateRange = getDateRange('raStartDate', 'raEndDate');
    if (!dateRange) return;
    
    if (!validateDateRange(dateRange.startDate, dateRange.endDate)) return;
    
    const filteredData = reportData.raOpportunities.filter(opportunity => {
        const raDate = new Date(opportunity.raDate);
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);
        return raDate >= startDate && raDate <= endDate;
    });
    
    if (filteredData.length === 0) {
        showNotification('No data found for the selected date range', 'info');
        return;
    }
    
    const reportName = `RA_Opportunities_${dateRange.startDate}_to_${dateRange.endDate}`;
    generateCSV(filteredData, `${reportName}.csv`);
    
    // Store report in recent reports
    storeRecentReport('Opportunities with RAs', 'RA Report');
}

// Generate Performance Report
function generatePerformanceReport() {
    const dateRange = getDateRange('performanceStartDate', 'performanceEndDate');
    if (!dateRange) return;
    
    if (!validateDateRange(dateRange.startDate, dateRange.endDate)) return;
    
    // Create performance summary
    const performanceData = {
        totalOpportunities: 15,
        totalReservations: 12,
        totalRAs: 8,
        totalRevenue: 25000000,
        conversionRate: "80%",
        averageDealSize: 3125000
    };
    
    const reportName = `Performance_Report_${dateRange.startDate}_to_${dateRange.endDate}`;
    
    // Create CSV content
    let csvContent = "Metric,Value\n";
    csvContent += `Total Opportunities,${performanceData.totalOpportunities}\n`;
    csvContent += `Total Reservations,${performanceData.totalReservations}\n`;
    csvContent += `Total RAs,${performanceData.totalRAs}\n`;
    csvContent += `Total Revenue,${formatCurrency(performanceData.totalRevenue)}\n`;
    csvContent += `Conversion Rate,${performanceData.conversionRate}\n`;
    csvContent += `Average Deal Size,${formatCurrency(performanceData.averageDealSize)}\n`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportName}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    // Store report in recent reports
    storeRecentReport('Sales Performance', 'Performance Report');
    
    showNotification('Performance report generated successfully!', 'success');
}

// Generate Property Performance Report
function generatePropertyReport() {
    const dateRange = getDateRange('propertyStartDate', 'propertyEndDate');
    if (!dateRange) return;
    
    if (!validateDateRange(dateRange.startDate, dateRange.endDate)) return;
    
    // Sample property performance data
    const propertyData = [
        { propertyName: "Modern 2BR Condo", reservations: 5, sales: 3, revenue: 7500000, conversionRate: "60%" },
        { propertyName: "Family House", reservations: 3, sales: 2, revenue: 9000000, conversionRate: "67%" },
        { propertyName: "Luxury Penthouse", reservations: 2, sales: 1, revenue: 8500000, conversionRate: "50%" },
        { propertyName: "Townhouse Unit", reservations: 4, sales: 2, revenue: 6400000, conversionRate: "50%" }
    ];
    
    const reportName = `Property_Performance_${dateRange.startDate}_to_${dateRange.endDate}`;
    generateCSV(propertyData, `${reportName}.csv`);
    
    // Store report in recent reports
    storeRecentReport('Property Performance', 'Property Report');
}

// Generate Change Requests Report
function generateChangeReport() {
    const dateRange = getDateRange('changeStartDate', 'changeEndDate');
    if (!dateRange) return;
    
    if (!validateDateRange(dateRange.startDate, dateRange.endDate)) return;
    
    // Sample change request data
    const changeData = [
        { requestType: "Deadline Extension", total: 8, approved: 6, rejected: 2, approvalRate: "75%" },
        { requestType: "Payment Details", total: 5, approved: 4, rejected: 1, approvalRate: "80%" },
        { requestType: "Property Change", total: 3, approved: 1, rejected: 2, approvalRate: "33%" }
    ];
    
    const reportName = `Change_Requests_${dateRange.startDate}_to_${dateRange.endDate}`;
    generateCSV(changeData, `${reportName}.csv`);
    
    // Store report in recent reports
    storeRecentReport('Change Requests', 'Change Report');
}

// Store recent report
function storeRecentReport(name, type) {
    const recentReports = JSON.parse(localStorage.getItem('recentReports') || '[]');
    const newReport = {
        name: name,
        type: type,
        date: new Date().toISOString().split('T')[0]
    };
    
    recentReports.unshift(newReport);
    
    // Keep only last 10 reports
    if (recentReports.length > 10) {
        recentReports.pop();
    }
    
    localStorage.setItem('recentReports', JSON.stringify(recentReports));
}

// View report preview
function viewReport(reportName) {
    const reportPreview = document.getElementById('reportPreview');
    const reportPreviewModal = document.getElementById('reportPreviewModal');
    
    // Sample report preview content
    const previewContent = `
        <div class="report-preview-content">
            <h4>${reportName}</h4>
            <p>Generated on ${formatDate(new Date().toISOString())}</p>
            
            <div class="report-summary">
                <div class="summary-item">
                    <label>Total Records:</label>
                    <span>25</span>
                </div>
                <div class="summary-item">
                    <label>Date Range:</label>
                    <span>Jan 1, 2024 - Jan 31, 2024</span>
                </div>
                <div class="summary-item">
                    <label>Generated By:</label>
                    <span>John Seller</span>
                </div>
            </div>
            
            <div class="report-preview-table">
                <table>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Property</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John Doe</td>
                            <td>Modern 2BR Condo</td>
                            <td>₱2,500,000</td>
                            <td>Active</td>
                        </tr>
                        <tr>
                            <td>Jane Smith</td>
                            <td>Family House</td>
                            <td>₱4,500,000</td>
                            <td>Active</td>
                        </tr>
                        <tr>
                            <td>Sarah Wilson</td>
                            <td>Luxury Penthouse</td>
                            <td>₱8,500,000</td>
                            <td>Active</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    reportPreview.innerHTML = previewContent;
    reportPreviewModal.style.display = 'block';
}

// Download report
function downloadReport(reportName) {
    // In a real app, this would download the actual report file
    showNotification(`Downloading ${reportName}...`, 'info');
}

// Close report preview
function closeReportPreview() {
    const reportPreviewModal = document.getElementById('reportPreviewModal');
    if (reportPreviewModal) {
        reportPreviewModal.style.display = 'none';
    }
}

// Add CSS for reports page
const additionalStyles = `
    .reports-page {
        padding: 0;
    }
    
    .page-header {
        margin-bottom: 2rem;
    }
    
    .reports-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 1.5rem;
        margin-bottom: 3rem;
    }
    
    .report-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .report-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(0,0,0,0.12);
    }
    
    .report-icon {
        width: 60px;
        height: 60px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: white;
        margin-bottom: 1rem;
    }
    
    .report-card:nth-child(1) .report-icon {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .report-card:nth-child(2) .report-icon {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }
    
    .report-card:nth-child(3) .report-icon {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }
    
    .report-card:nth-child(4) .report-icon {
        background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    }
    
    .report-card:nth-child(5) .report-icon {
        background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    }
    
    .report-card:nth-child(6) .report-icon {
        background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
    }
    
    .report-content h3 {
        margin: 0 0 0.5rem 0;
        color: #333;
        font-size: 1.2rem;
    }
    
    .report-content p {
        color: #666;
        font-size: 0.9rem;
        margin: 0 0 1rem 0;
        line-height: 1.4;
    }
    
    .report-filters {
        margin-bottom: 1rem;
    }
    
    .date-range {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .date-range label {
        font-weight: 500;
        color: #333;
        font-size: 0.9rem;
    }
    
    .date-inputs {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .date-input {
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 0.9rem;
    }
    
    .btn-primary {
        width: 100%;
        padding: 0.75rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-weight: 500;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    
    .recent-reports {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
    
    .recent-reports h3 {
        margin: 0 0 1.5rem 0;
        color: #333;
        font-size: 1.2rem;
        font-weight: 600;
    }
    
    .reports-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .recent-report-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-radius: 8px;
        background: #f8f9fa;
        transition: background-color 0.3s ease;
    }
    
    .recent-report-item:hover {
        background: #e9ecef;
    }
    
    .report-info h4 {
        margin: 0 0 0.25rem 0;
        color: #333;
        font-size: 1rem;
    }
    
    .report-info p {
        margin: 0 0 0.25rem 0;
        color: #666;
        font-size: 0.9rem;
    }
    
    .report-date {
        color: #999;
        font-size: 0.8rem;
    }
    
    .report-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .btn-icon {
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        background: #f8f9fa;
        color: #666;
    }
    
    .btn-icon:hover {
        background: #667eea;
        color: white;
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
        max-width: 800px;
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
    
    .report-preview-content h4 {
        margin: 0 0 0.5rem 0;
        color: #333;
        font-size: 1.2rem;
    }
    
    .report-preview-content p {
        color: #666;
        margin: 0 0 1.5rem 0;
    }
    
    .report-summary {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
    }
    
    .summary-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .summary-item label {
        font-weight: 500;
        color: #666;
        font-size: 0.9rem;
    }
    
    .summary-item span {
        color: #333;
        font-weight: 500;
    }
    
    .report-preview-table {
        overflow-x: auto;
    }
    
    .report-preview-table table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .report-preview-table th,
    .report-preview-table td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid #eee;
    }
    
    .report-preview-table th {
        background: #f8f9fa;
        font-weight: 600;
        color: #333;
    }
    
    .report-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid #eee;
    }
    
    .btn-primary,
    .btn-secondary {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
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
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .reports-grid {
            grid-template-columns: 1fr;
        }
        
        .date-inputs {
            flex-direction: column;
            align-items: stretch;
        }
        
        .report-summary {
            grid-template-columns: 1fr;
        }
        
        .modal-content {
            width: 95%;
            margin: 10% auto;
        }
        
        .report-preview-table {
            font-size: 0.9rem;
        }
        
        .report-preview-table th,
        .report-preview-table td {
            padding: 0.5rem;
        }
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 