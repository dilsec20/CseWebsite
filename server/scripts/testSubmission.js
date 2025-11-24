const axios = require('axios');
require('dotenv').config();

const testSubmission = async () => {
    try {
        // 1. Register a new user to get token
        console.log('Registering new user...');
        const email = `testuser_${Date.now()}@example.com`;
        const password = 'password123';
        const name = 'Test User';

        const registerRes = await axios.post('http://localhost:5000/auth/register', {
            email, password, name, user_name: `test_user_${Date.now()}`
        });
        const token = registerRes.data.token;
        console.log('Registered and got token:', token);

        // 2. Get Missing Number problem ID
        console.log('Fetching Missing Number problem...');
        const problemsRes = await axios.get('http://localhost:5000/api/problems');
        const problem = problemsRes.data.find(p => p.title === 'Missing Number');

        if (!problem) {
            console.error('Missing Number problem not found');
            return;
        }
        console.log('Problem ID:', problem.problem_id);

        // 3. Submit code
        console.log('Submitting code...');
        const code = `
        #include <bits/stdc++.h>
        using namespace std;
        int main() {
            int n;
            if (!(cin >> n)) return 0;
            vector<int> nums(n);
            int sum = 0;
            for (int i = 0; i < n; i++) {
                cin >> nums[i];
                sum += nums[i];
            }
            int expectedSum = n * (n + 1) / 2;
            cout << expectedSum - sum << endl;
            return 0;
        }
        `;

        const submitRes = await axios.post('http://localhost:5000/api/execute/submit', {
            problem_id: problem.problem_id,
            code: code,
            language: 'cpp'
        }, {
            headers: { token: token }
        });
        console.log('Submission result:', JSON.stringify(submitRes.data, null, 2));

        // 4. Fetch submissions
        console.log('Fetching submissions...');
        const historyRes = await axios.get(`http://localhost:5000/api/problems/${problem.problem_id}/submissions`, {
            headers: { token: token }
        });
        console.log('Submissions history:', JSON.stringify(historyRes.data, null, 2));

        if (Array.isArray(historyRes.data) && historyRes.data.length > 0) {
            console.log('SUCCESS: Submission found in history!');
        } else {
            console.log('FAILURE: History is empty or invalid.');
        }

    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
    }
};

testSubmission();
