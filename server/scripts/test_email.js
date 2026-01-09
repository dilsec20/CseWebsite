const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
    console.log('📧 Testing Email Configuration...');
    console.log(`User: ${process.env.EMAIL_USER}`);
    // Don't log the password

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.error('❌ EMAIL_USER or EMAIL_PASSWORD missing in .env');
        return;
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    try {
        console.log('Attempting to verify transporter connection...');
        await transporter.verify();
        console.log('✅ Transporter connection successful!');

        console.log('Attempting to send test email...');
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to self
            subject: 'Test Email from PrepPortal Debugger',
            text: 'If you receive this, your email configuration handles are correct!'
        });

        console.log('✅ Email sent successfully!');
        console.log('Message ID:', info.messageId);

    } catch (error) {
        console.error('❌ Email Test Failed:', error);

        if (error.code === 'EAUTH') {
            console.log('\n💡 Hint: For Gmail, you probably need to use an "App Password" instead of your login password.');
            console.log('1. Go to Google Account > Security');
            console.log('2. Enable 2-Step Verification');
            console.log('3. Search for "App Passwords"');
            console.log('4. Create one and use it as EMAIL_PASSWORD');
        }
    }
}

testEmail();
