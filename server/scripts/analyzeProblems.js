const pool = require('../db');

const analyzeProblems = async () => {
    try {
        console.log('--- Problem Counts by Topic ---');
        const countRes = await pool.query(`
            SELECT topic, COUNT(*) as count 
            FROM problems 
            GROUP BY topic 
            ORDER BY count DESC
        `);
        countRes.rows.forEach(r => console.log(`${r.topic}: ${r.count}`));

        console.log('\n--- Problems with Missing Data ---');
        const missingRes = await pool.query(`
            SELECT problem_id, title, topic 
            FROM problems 
            WHERE input_format IS NULL 
               OR output_format IS NULL 
               OR test_case_input IS NULL 
               OR test_case_output IS NULL
        `);
        if (missingRes.rows.length === 0) {
            console.log('All problems have complete metadata (formats and sample cases).');
        } else {
            missingRes.rows.forEach(r => console.log(`[MISSING] ${r.title} (${r.topic})`));
        }

        console.log('\n--- Test Case Counts per Problem (Top 10 lowest) ---');
        const testCaseCountRes = await pool.query(`
            SELECT p.title, COUNT(t.test_case_id) as test_cases
            FROM problems p
            LEFT JOIN test_cases t ON p.problem_id = t.problem_id
            GROUP BY p.problem_id
            ORDER BY test_cases ASC
            LIMIT 10
        `);
        testCaseCountRes.rows.forEach(r => console.log(`${r.title}: ${r.test_cases}`));

    } catch (err) {
        console.error(err.message);
    } finally {
        pool.end();
    }
};

analyzeProblems();
