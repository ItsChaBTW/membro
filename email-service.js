/**
 * MEMBRO Email Service - Professional Email Integration
 * This service handles all email notifications and integrations
 * Supports Outlook, Gmail, and SMTP configurations
 */

var MembroEmailService = {
    // Email configuration
    config: {
        provider: 'gmail',
        smtpSettings: {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'capstonepeg@gmail.com',
                pass: 'euwh opqw vsvx ngqh'
            }
        }
    },

    // Email templates
    templates: {
        service_booking: {
            subject: '🏠 Service Booking Confirmation - MEMBRO',
            html: function(data) {
                return `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
                        <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #3b82f6; margin: 0; font-size: 24px;">MEMBRO</h1>
                                <p style="color: #6b7280; margin: 5px 0 0 0;">Your Home Portal</p>
                            </div>
                            
                            <div style="background: #10b981; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
                                <h2 style="margin: 0; font-size: 20px;">✅ Service Booking Confirmed</h2>
                            </div>
                            
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
                                Hello <strong>${data.bookedBy}</strong>,
                            </p>
                            
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 25px;">
                                Your service booking has been confirmed! Here are the details:
                            </p>
                            
                            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Service:</strong></td><td style="padding: 8px 0; color: #111827;">${data.serviceName}</td></tr>
                                    <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Provider:</strong></td><td style="padding: 8px 0; color: #111827;">${data.provider}</td></tr>
                                    <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Date:</strong></td><td style="padding: 8px 0; color: #111827;">${data.date}</td></tr>
                                    <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Time:</strong></td><td style="padding: 8px 0; color: #111827;">${data.time}</td></tr>
                                    <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Unit:</strong></td><td style="padding: 8px 0; color: #111827;">${data.unit}</td></tr>
                                    <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Booking ID:</strong></td><td style="padding: 8px 0; color: #111827;">${data.bookingId}</td></tr>
                                </table>
                            </div>
                            
                            ${data.notes ? `<div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 25px;"><strong>Notes:</strong> ${data.notes}</div>` : ''}
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="https://membro.com/dashboard" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">View in Dashboard</a>
                            </div>
                            
                            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
                                <p>Need help? Contact us at support@membro.com</p>
                                <p>© 2024 MEMBRO. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        },

        password_reset: {
            subject: '🔐 Password Reset Request - MEMBRO',
            html: function(data) {
                return `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
                        <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #3b82f6; margin: 0; font-size: 24px;">MEMBRO</h1>
                                <p style="color: #6b7280; margin: 5px 0 0 0;">Your Home Portal</p>
                            </div>
                            
                            <div style="background: #f59e0b; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
                                <h2 style="margin: 0; font-size: 20px;">🔐 Password Reset Request</h2>
                            </div>
                            
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
                                Hello,
                            </p>
                            
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 25px;">
                                We received a request to reset your password. Use the verification code below:
                            </p>
                            
                            <div style="background: #f3f4f6; padding: 30px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
                                <div style="font-size: 32px; font-weight: bold; color: #111827; letter-spacing: 8px; font-family: monospace;">${data.otp}</div>
                                <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 14px;">This code expires in 10 minutes</p>
                            </div>
                            
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 25px;">
                                If you didn't request this password reset, please ignore this email or contact support if you have concerns.
                            </p>
                            
                            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
                                <p>Need help? Contact us at support@membro.com</p>
                                <p>© 2024 MEMBRO. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        },

        email_verification: {
            subject: '📧 Verify Your Email - MEMBRO',
            html: function(data) {
                return `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
                        <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #3b82f6; margin: 0; font-size: 24px;">MEMBRO</h1>
                                <p style="color: #6b7280; margin: 5px 0 0 0;">Your Home Portal</p>
                            </div>
                            
                            <div style="background: #10b981; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
                                <h2 style="margin: 0; font-size: 20px;">📧 Welcome to MEMBRO!</h2>
                            </div>
                            
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
                                Hello <strong>${data.firstName}</strong>,
                            </p>
                            
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 25px;">
                                Thank you for signing up! Please verify your email address using the code below:
                            </p>
                            
                            <div style="background: #f3f4f6; padding: 30px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
                                <div style="font-size: 32px; font-weight: bold; color: #111827; letter-spacing: 8px; font-family: monospace;">${data.verificationCode}</div>
                                <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 14px;">This code expires in 15 minutes</p>
                            </div>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="https://membro.com/verify-otp.html?email=${encodeURIComponent(data.email)}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">Verify Email</a>
                            </div>
                            
                            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
                                <p>Need help? Contact us at support@membro.com</p>
                                <p>© 2024 MEMBRO. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        },

        unsubscribe_notification: {
            subject: '📬 Member Unsubscribed from Notifications - MEMBRO',
            html: function(data) {
                return `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
                        <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #3b82f6; margin: 0; font-size: 24px;">MEMBRO</h1>
                                <p style="color: #6b7280; margin: 5px 0 0 0;">Administration Portal</p>
                            </div>
                            
                            <div style="background: #f59e0b; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
                                <h2 style="margin: 0; font-size: 20px;">📬 Unsubscribe Notification</h2>
                            </div>
                            
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
                                Hello Admin,
                            </p>
                            
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 25px;">
                                A member has unsubscribed from email notifications:
                            </p>
                            
                            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Member:</strong></td><td style="padding: 8px 0; color: #111827;">${data.memberName}</td></tr>
                                    <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Email:</strong></td><td style="padding: 8px 0; color: #111827;">${data.email}</td></tr>
                                    <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Unit:</strong></td><td style="padding: 8px 0; color: #111827;">${data.unit}</td></tr>
                                    <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Date:</strong></td><td style="padding: 8px 0; color: #111827;">${data.unsubscribeDate}</td></tr>
                                    <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Reason:</strong></td><td style="padding: 8px 0; color: #111827;">${data.reason || 'Not specified'}</td></tr>
                                </table>
                            </div>
                            
                            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
                                <p style="margin: 0; color: #92400e;"><strong>Action Required:</strong> Please update the member's notification preferences in the admin panel.</p>
                            </div>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="https://admin.membro.com/members" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">View Member Profile</a>
                            </div>
                            
                            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
                                <p>MEMBRO Administration System</p>
                                <p>© 2024 MEMBRO. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    },

    // Send email function
    sendEmail: function(emailData) {
        return new Promise(function(resolve, reject) {
            // Get template
            var template = MembroEmailService.templates[emailData.type];
            if (!template) {
                reject(new Error('Email template not found: ' + emailData.type));
                return;
            }

            // Prepare email content
            var emailContent = {
                to: emailData.to,
                subject: template.subject,
                html: template.html(emailData.data),
                timestamp: new Date().toISOString()
            };

            // Log email for demonstration (in production, this would actually send)
            console.log('📧 EMAIL SENDING:', {
                provider: MembroEmailService.config.provider,
                to: emailContent.to,
                subject: emailContent.subject,
                type: emailData.type,
                timestamp: emailContent.timestamp
            });

            // Show verification code prominently for testing
            if (emailData.type === 'email_verification' && emailData.data.verificationCode) {
                console.log('🔐 VERIFICATION CODE FOR TESTING:', emailData.data.verificationCode);
                console.log('📧 Email would be sent to:', emailData.to);
                console.log('📝 Email subject:', emailContent.subject);
                
                // Show a prominent notification in the browser
                MembroEmailService.showEmailNotification(emailContent, emailData.data.verificationCode);
            }

            // Simulate email sending with different providers
            MembroEmailService.simulateEmailSending(emailContent)
                .then(function(result) {
                    resolve(result);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },

    // Show email notification in browser (for demo purposes)
    showEmailNotification: function(emailContent, verificationCode) {
        // Create a notification div
        var notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            max-width: 400px;
            font-family: Arial, sans-serif;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="font-size: 24px; margin-right: 10px;">📧</div>
                <div>
                    <h3 style="margin: 0; font-size: 16px;">Email Sent (Demo)</h3>
                    <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">${emailContent.subject}</p>
                </div>
            </div>
            <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <p style="margin: 0 0 10px 0; font-size: 14px;"><strong>To:</strong> ${emailContent.to}</p>
                <p style="margin: 0; font-size: 14px;"><strong>Verification Code:</strong> <span style="font-family: monospace; font-weight: bold; background: rgba(255,255,255,0.3); padding: 4px 8px; border-radius: 4px;">${verificationCode}</span></p>
            </div>
            <div style="font-size: 12px; opacity: 0.8;">
                <p style="margin: 0;">This is a demo. In production, emails would be sent via SMTP.</p>
            </div>
            <button onclick="this.parentElement.remove()" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: white; font-size: 18px; cursor: pointer;">×</button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 10 seconds
        setTimeout(function() {
            if (document.body.contains(notification)) {
                notification.remove();
            }
        }, 10000);
    },

    // Simulate email sending (for demo purposes)
    simulateEmailSending: function(emailContent) {
        return new Promise(function(resolve, reject) {
            // Simulate network delay
            setTimeout(function() {
                // Simulate 95% success rate
                if (Math.random() > 0.05) {
                    var result = {
                        success: true,
                        messageId: 'msg_' + Date.now(),
                        provider: MembroEmailService.config.provider,
                        to: emailContent.to,
                        subject: emailContent.subject,
                        sentAt: new Date().toISOString()
                    };
                    
                    console.log('✅ EMAIL SENT SUCCESSFULLY:', result);
                    resolve(result);
                } else {
                    var error = {
                        success: false,
                        error: 'SMTP connection failed',
                        provider: MembroEmailService.config.provider,
                        to: emailContent.to,
                        failedAt: new Date().toISOString()
                    };
                    
                    console.log('❌ EMAIL FAILED:', error);
                    reject(error);
                }
            }, Math.random() * 2000 + 500); // 500ms to 2.5s delay
        });
    },

    // Outlook Graph API integration (requires authentication)
    sendViaOutlook: function(emailContent) {
        // This would require Microsoft Graph API authentication
        // For demo purposes, we'll simulate the API call
        
        var graphApiPayload = {
            message: {
                subject: emailContent.subject,
                body: {
                    contentType: 'HTML',
                    content: emailContent.html
                },
                toRecipients: [
                    {
                        emailAddress: {
                            address: emailContent.to
                        }
                    }
                ]
            }
        };

        console.log('📧 OUTLOOK GRAPH API PAYLOAD:', graphApiPayload);
        
        // In production, this would be:
        // return fetch(MembroEmailService.config.apiEndpoint, {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': 'Bearer ' + accessToken,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(graphApiPayload)
        // });
        
        return MembroEmailService.simulateEmailSending(emailContent);
    },

    // SMTP integration (would require server-side implementation)
    sendViaSMTP: function(emailContent) {
        console.log('📧 SMTP CONFIG:', MembroEmailService.config.smtpSettings);
        console.log('📧 SMTP EMAIL:', emailContent);
        
        // In production with Node.js backend, this would use nodemailer:
        // const nodemailer = require('nodemailer');
        // const transporter = nodemailer.createTransporter(MembroEmailService.config.smtpSettings);
        // return transporter.sendMail(emailContent);
        
        return MembroEmailService.simulateEmailSending(emailContent);
    },

    // Batch email sending
    sendBulkEmails: function(emailList) {
        console.log('📧 SENDING BULK EMAILS:', emailList.length + ' recipients');
        
        var promises = emailList.map(function(emailData) {
            return MembroEmailService.sendEmail(emailData);
        });
        
        return Promise.all(promises);
    },

    // Email analytics
    getEmailStats: function() {
        // In production, this would fetch from analytics service
        return {
            totalSent: 1247,
            deliveryRate: 98.5,
            openRate: 76.2,
            clickRate: 23.8,
            bounceRate: 1.5,
            unsubscribeRate: 0.3,
            lastUpdated: new Date().toISOString()
        };
    }
};

// Integration with MEMBRO notification system
if (typeof MembroData !== 'undefined') {
    // Extend MembroData with email notifications
    MembroData.sendEmailNotification = function(type, data) {
        return MembroEmailService.sendEmail({
            type: type,
            to: data.email || MembroData.getCurrentUser().email,
            data: data
        });
    };

    // Auto-send emails for certain actions
    var originalAddNotification = MembroData.addNotification;
    MembroData.addNotification = function(notification) {
        // Call original function
        originalAddNotification.call(this, notification);
        
        // Send email notification if enabled
        if (notification.sendEmail !== false) {
            var user = MembroData.getCurrentUser();
            
            // Determine email type based on notification type
            var emailType = 'service_booking'; // default
            if (notification.type === 'unsubscribe') {
                emailType = 'unsubscribe_notification';
            }
            
            MembroEmailService.sendEmail({
                type: emailType,
                to: user.email,
                data: {
                    firstName: user.firstName,
                    email: user.email,
                    ...notification
                }
            }).catch(function(error) {
                console.error('Failed to send email notification:', error);
            });
        }
    };
}

// Make available globally
if (typeof window !== 'undefined') {
    window.MembroEmailService = MembroEmailService;
}

// Export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MembroEmailService;
} 