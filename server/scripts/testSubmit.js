const axios = require('axios');

async function testSubmit() {
    try {
        // First login to get token
        console.log('1. Logging in...');
        const loginRes = await axios.post('http://localhost:5000/auth/register', {
            user_name: 'Test User',
            user_email: `test${Date.now()}@example.com`,
            user_password: 'test123'
        });

        const token = loginRes.data.token;
        console.log('✅ Logged in, token:', token.substring(0, 20) + '...');

        // Test submit
        console.log('\n2. Submitting code...');
        const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    int xorAll = 0;
    for (int i = 0; i <= n; i++) {
        xorAll ^= i;
    }
    for (int num : nums) {
        xorAll ^= num;
    }
    cout << xorAll;
    return 0;
}`;

        const submitRes = await axios.post('http://localhost:5000/api/execute/submit', {
            problem_id: 4, // Missing Number problem
            code: code,
            language: 'cpp'
        }, {
            headers: { token: token }
        });

        console.log('✅ Submit response:', submitRes.data);

    } catch (err) {
        console.error('❌ Error:', err.response?.data || err.message);
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Headers:', err.response.headers);
        }
    }
}

testSubmit();
