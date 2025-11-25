const https = require('https');

const baseUrl = 'csewebsiteplacement-prep-backend.onrender.com';

const checks = [
    { endpoint: '/api/problems', name: 'Problems', expected: 254 },
    { endpoint: '/api/quizzes', name: 'Quizzes', expected: 18 },
    { endpoint: '/api/dsa/modules', name: 'DSA Modules', expected: 15 }
];

console.log('🔍 Verifying Production Data Migration...\n');

checks.forEach(check => {
    const url = `https://${baseUrl}${check.endpoint}`;

    https.get(url, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                const count = Array.isArray(json) ? json.length : (json.count || 0);

                if (count === check.expected) {
                    console.log(`✅ ${check.name}: Found ${count} items (Matches Local)`);
                } else {
                    console.log(`⚠️  ${check.name}: Found ${count} items (Expected ${check.expected})`);
                }
            } catch (e) {
                console.log(`❌ ${check.name}: Failed to parse response`);
            }
        });

    }).on('error', (err) => {
        console.error(`❌ ${check.name}: Request failed - ${err.message}`);
    });
});
