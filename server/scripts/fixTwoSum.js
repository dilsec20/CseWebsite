const pool = require('../db');

const fixTwoSum = async () => {
    try {
        // Update Two Sum problem
        // Ensure test_case_input has proper newlines

        const updateQuery = `
            UPDATE problems 
            SET 
                test_case_input = '4\n2 7 11 15\n9'
            WHERE title = 'Two Sum'
            RETURNING *;
        `;

        const result = await pool.query(updateQuery);

        if (result.rows.length > 0) {
            console.log('Successfully updated Two Sum problem:', result.rows[0].title);

            // Also update the test_cases table for this problem
            const problemId = result.rows[0].problem_id;

            // Update sample test case
            await pool.query(`
                UPDATE test_cases 
                SET input = '4\n2 7 11 15\n9'
                WHERE problem_id = $1 AND is_sample = true
            `, [problemId]);

            console.log('Updated sample test case input');
        } else {
            console.log('Problem "Two Sum" not found');
        }

    } catch (err) {
        console.error('Error updating problem:', err.message);
    } finally {
        pool.end();
    }
};

fixTwoSum();
