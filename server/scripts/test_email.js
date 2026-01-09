const { Resend } = require('resend');
require('dotenv').config();

async function testEmail() {
    console.log('📧 Testing Resend Email Configuration...');

    if (!process.env.RESEND_API_KEY) {
        console.error('❌ RESEND_API_KEY is missing in .env');
        console.log('Please add RESEND_API_KEY=re_... to your .env file.');
        return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        console.log('Attempting to send test email via Resend...');

        const { data, error } = await resend.emails.send({
            from: 'PrepPortal Debugger <onboarding@resend.dev>',
            to: 'delivered@resend.dev', // Resend's test address that always succeeds
            subject: 'Resend Integation Test',
            html: '<p><strong>It works!</strong> Resend is configured correctly.</p>'
        });

        if (error) {
            console.error('❌ Resend Test Failed:', error);
            return;
        }

        console.log('✅ Email sent successfully!');
        console.log('ID:', data.id);
        console.log('\nNote: "onboarding@resend.dev" can only send to yourself or "delivered@resend.dev" until you verify your domain.');

    } catch (error) {
        console.error('❌ Unexpected Error:', error);
    }
}

testEmail();
