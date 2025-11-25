const https = require('https');

const endpoints = [
    '/api/problems',
    '/api/dsa/modules',
    '/api/quizzes'
];

const baseUrl = 'csewebsiteplacement-prep-backend.onrender.com';

console.log('Testing production endpoints...\n');

endpoints.forEach((endpoint, index) => {
    setTimeout(() => {
        const url = `https://${baseUrl}${endpoint}`;
        console.log(`Testing: ${url}`);

        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (Array.isArray(json)) {
                        console.log(`✅ ${endpoint}: ${json.length} items found`);
                    } else {
                        console.log(`✅ ${endpoint}: Response received`);
                    }
                } catch (e) {
                    console.log(`⚠️  ${endpoint}: ${data.substring(0, 100)}`);
                }
            });

        }).on('error', (err) => {
            console.error(`❌ ${endpoint}: ${err.message}`);
        });
    }, index * 1000);
});
