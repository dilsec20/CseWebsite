const { Resend } = require('resend');

// Initialize Resend lazily or check for key
let resend;
const initResend = () => {
    if (!resend && process.env.RESEND_API_KEY) {
        resend = new Resend(process.env.RESEND_API_KEY);
    }
    return resend;
};

// Generate 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP email
async function sendOTPEmail(email, otp, userName = 'User') {
    // Only send if API key is present
    const client = initResend();
    if (!client) {
        console.error('❌ RESEND_API_KEY is missing');
        return { success: false, error: 'Internal Server Error: Missing Email Configuration' };
    }

    try {
        const { data, error } = await client.emails.send({
            from: 'AceCoder <no-reply@acecoder.site>', // Updated to verified domain
            to: email,
            subject: 'Password Reset OTP - PrepPortal',
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                    .otp-box { background: white; border: 2px solid #667eea; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0; }
                    .otp-code { font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 5px; }
                    .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
                    .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px; margin: 20px 0; color: #991b1b; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🔐 Password Reset Request</h1>
                    </div>
                    <div class="content">
                        <p>Hello ${userName},</p>
                        <p>We received a request to reset your password. Use the OTP below to proceed:</p>
                        
                        <div class="otp-box">
                            <p style="margin: 0; font-size: 14px; color: #6b7280;">Your OTP Code</p>
                            <div class="otp-code">${otp}</div>
                            <p style="margin: 10px 0 0 0; font-size: 12px; color: #6b7280;">Valid for 10 minutes</p>
                        </div>
                        
                        <div class="warning">
                            <strong>⚠️ Security Notice:</strong> If you didn't request this password reset, please ignore this email or contact support if you're concerned about your account security.
                        </div>
                        
                        <p style="margin-top: 20px;">Best regards,<br><strong>PrepPortal Team</strong></p>
                    </div>
                    <div class="footer">
                        <p>This is an automated email. Please do not reply to this message.</p>
                        <p>&copy; 2024 PrepPortal. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            `
        });

        if (error) {
            console.error('❌ Resend Email Error:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Email sent successfully:', data.id);
        return { success: true, messageId: data.id };

    } catch (error) {
        console.error('❌ Unexpected Email Error:', error);
        return { success: false, error: error.message };
    }
}

module.exports = {
    generateOTP,
    sendOTPEmail
};
