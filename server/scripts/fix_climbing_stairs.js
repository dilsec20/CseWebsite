const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const pid = 1270;
const badIds = [1206, 1207];

const newCases = [
    { i: "2", o: "2" },
    { i: "3", o: "3" },
    { i: "10", o: "89" },
    { i: "45", o: "1836311903" } // 45th Fibonacci number (1 indexed or 0? 1=>1, 2=>2, 3=>3, 4=>5, 5=>8. F(n+1))
];
// F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5, F(6)=8.
// Stairs(1)=1. Stairs(2)=2. Stairs(3)=3. Stairs(4)=5. Stairs(5)=8.
// Stairs(n) = F(n+1) in standard 1,1 sequence.
// Stairs(45) = F(46).
// Wait, case #3: Input 5 -> Expected 8. Correct.
// Case #6: Input 6 -> Expected 13.
// So Stairs(n) follows 1, 2, 3, 5, 8, 13...
// Let's verify n=45.
// F(0)=0, F(1)=1, F(2)=1, F(3)=2...
// Stairs(1)=1 (F(2)), Stairs(2)=2 (F(3)), ... Stairs(n)=F(n+1).
// F(46) = 1836311903. This fits in signed 32-bit int (max 2.14B).

(async () => {
    try {
        // 1. Delete bad cases
        for (const id of badIds) {
            await pool.query("DELETE FROM test_cases WHERE test_case_id = $1", [id]);
            console.log(`Deleted bad test case ${id}`);
        }

        // 2. Add new
        console.log("Adding new Climbing Stairs cases...");
        for (const c of newCases) {
            await pool.query(
                "INSERT INTO test_cases (problem_id, input, expected_output, is_hidden, is_sample) VALUES ($1, $2, $3, true, false)",
                [pid, c.i, c.o]
            );
            console.log(`+ Added: ${c.i}`);
        }

    } catch (e) { console.error(e); } finally { pool.end(); }
})();
