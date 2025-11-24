const pool = require('../db');

const findAndFixMissingTestCases = async () => {
    try {
        console.log('Finding problems with missing sample test cases...\n');

        // Find problems with NULL or empty test_case_input/output
        const result = await pool.query(`
            SELECT problem_id, title, topic, difficulty, 
                   input_format, output_format,
                   test_case_input, test_case_output
            FROM problems
            WHERE test_case_input IS NULL 
               OR test_case_input = '' 
               OR test_case_output IS NULL 
               OR test_case_output = ''
            ORDER BY problem_id
        `);

        console.log(`Found ${result.rows.length} problems with missing sample test cases:\n`);

        if (result.rows.length === 0) {
            console.log('✅ All problems have sample test cases!');
            return;
        }

        // Display the problems
        result.rows.forEach((problem, index) => {
            console.log(`${index + 1}. [${problem.topic}] ${problem.title} (${problem.difficulty})`);
            console.log(`   Input: ${problem.test_case_input ? 'Present' : 'MISSING'}`);
            console.log(`   Output: ${problem.test_case_output ? 'Present' : 'MISSING'}`);
            console.log();
        });

        console.log('\n⚠️  These problems need sample test cases to be added manually.');
        console.log('Please update the seeding scripts or add them directly to the database.');

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        pool.end();
    }
};

findAndFixMissingTestCases();
