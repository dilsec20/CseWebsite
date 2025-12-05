const { Client } = require('pg');

const connectionString = 'postgresql://placement_prep_user:5BzUiBiTbPL8WEwQJdzEgcBIiGbqmxs7@dpg-d4ib377diees73aag370-a.singapore-postgres.render.com/placement_prep';

const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

const PROBLEM_ID = 1314;

const VALID_TEST_CASES = [
    { input: 'sadbutsad sad', expected_output: '0', is_sample: true },
    { input: 'leetcode leeto', expected_output: '-1', is_sample: false },
    { input: 'hello ll', expected_output: '2', is_sample: false },
    { input: 'aaaaa bba', expected_output: '-1', is_sample: false },
    { input: 'a a', expected_output: '0', is_sample: false }
];

async function updateTestCases() {
    try {
        await client.connect();
        console.log('Connected to Render database.');

        // 1. Fetch existing test cases
        const fetchQuery = `SELECT test_case_id, input, expected_output FROM test_cases WHERE problem_id = $1 ORDER BY test_case_id;`;
        const res = await client.query(fetchQuery, [PROBLEM_ID]);
        console.log(`Found ${res.rowCount} existing test cases for problem ${PROBLEM_ID}:`);
        res.rows.forEach(row => console.log(`ID: ${row.test_case_id}, Input: ${row.input}, Output: ${row.expected_output}`));

        // 2. Update or Insert
        const existingIds = res.rows.map(r => r.test_case_id);

        for (let i = 0; i < VALID_TEST_CASES.length; i++) {
            const tc = VALID_TEST_CASES[i];
            if (i < existingIds.length) {
                // Update existing
                const id = existingIds[i];
                console.log(`Updating test case ${id}...`);
                await client.query(
                    `UPDATE test_cases SET input = $1, expected_output = $2, is_sample = $3 WHERE test_case_id = $4`,
                    [tc.input, tc.expected_output, tc.is_sample, id]
                );
            } else {
                // Insert new
                console.log(`Inserting new test case...`);
                await client.query(
                    `INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES ($1, $2, $3, $4)`,
                    [PROBLEM_ID, tc.input, tc.expected_output, tc.is_sample]
                );
            }
        }

        // 3. Delete extra test cases if any
        if (existingIds.length > VALID_TEST_CASES.length) {
            const idsToDelete = existingIds.slice(VALID_TEST_CASES.length);
            console.log(`Deleting extra test cases: ${idsToDelete.join(', ')}`);
            await client.query(`DELETE FROM test_cases WHERE test_case_id = ANY($1)`, [idsToDelete]);
        }

        console.log('Update complete.');

    } catch (err) {
        console.error('Error executing update:', err);
    } finally {
        await client.end();
        console.log('Connection closed.');
    }
}

updateTestCases();
