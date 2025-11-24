const axios = require('axios');
const pool = require('../db');

async function verifyProblemDetails() {
    try {
        console.log('🔍 Verifying Problem Details API...\n');

        // Get Sqrt(x) ID
        const client = await pool.connect();
        const prob = await client.query("SELECT problem_id FROM problems WHERE title = 'Sqrt(x)'");
        client.release();

        if (prob.rows.length === 0) {
            console.log('Problem not found');
            return;
        }

        const problemId = prob.rows[0].problem_id;
        console.log(`Testing API for Problem ID: ${problemId}`);

        // Make API request
        const response = await axios.get(`http://localhost:5000/api/problems/${problemId}`);

        console.log('\nAPI Response Keys:', Object.keys(response.data));
        console.log('test_case_input:', response.data.test_case_input);
        console.log('test_case_output:', response.data.test_case_output);

        if (response.data.test_case_input) {
            console.log('\n✅ SUCCESS: Sample test case data is present!');
        } else {
            console.log('\n❌ FAILURE: Sample test case data is MISSING!');
        }

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await pool.end();
    }
}

verifyProblemDetails();
