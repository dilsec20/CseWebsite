const axios = require('axios');
const pool = require('../db');

async function verifyRunEndpoint() {
    try {
        console.log('🔍 Verifying /run Endpoint...\n');

        // Get a problem ID (e.g., Sqrt(x))
        const client = await pool.connect();
        const prob = await client.query("SELECT problem_id FROM problems WHERE title = 'Sqrt(x)'");
        client.release();

        if (prob.rows.length === 0) {
            console.log('Problem not found');
            return;
        }

        const problemId = prob.rows[0].problem_id;

        const code = `#include <iostream>
using namespace std;
int main() {
    int x;
    cin >> x;
    cout << 2; // Hardcoded for sample input 8 -> 2
    return 0;
}`;

        console.log(`Testing /run for Problem ID: ${problemId}`);

        const response = await axios.post("http://localhost:5000/api/execute/run", {
            code: code,
            language: "cpp",
            problem_id: problemId
        });

        console.log('\nResponse:', JSON.stringify(response.data, null, 2));

        if (response.data.run && response.data.run.code === 0) {
            console.log('\n✅ /run endpoint works!');
        } else {
            console.log('\n❌ /run endpoint failed!');
        }

    } catch (err) {
        console.error('Error:', err.message);
        if (err.response) {
            console.error('Response data:', err.response.data);
        }
    } finally {
        await pool.end();
    }
}

verifyRunEndpoint();
