const pool = require('../db');

const fixMissingNumber = async () => {
    try {
        // Update Missing Number problem
        // 1. Fix input format to match user expectation (n then array)
        // 2. Update sample test case to match this format

        const updateQuery = `
            UPDATE problems 
            SET 
                input_format = 'First line: n (size of array)\nSecond line: n space-separated integers',
                test_case_input = '3\n3 0 1'
            WHERE title = 'Missing Number'
            RETURNING *;
        `;

        const result = await pool.query(updateQuery);

        if (result.rows.length > 0) {
            console.log('Successfully updated Missing Number problem:', result.rows[0].title);

            // Also update the test_cases table for this problem
            const problemId = result.rows[0].problem_id;

            // Update sample test case
            await pool.query(`
                UPDATE test_cases 
                SET input = '3\n3 0 1'
                WHERE problem_id = $1 AND is_sample = true
            `, [problemId]);

            console.log('Updated sample test case input');
        } else {
            console.log('Problem "Missing Number" not found');
        }

    } catch (err) {
        console.error('Error updating problem:', err.message);
    } finally {
        pool.end();
    }
};

fixMissingNumber();
