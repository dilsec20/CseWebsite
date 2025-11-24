const pool = require('../db');

const topics = [
    'Array', 'String', 'Linked List', 'Stack', 'Queue', 'Tree', 'Graph',
    'Dynamic Programming', 'Greedy', 'Backtracking', 'Binary Search', 'Heap', 'Hashing'
];

const difficulties = ['Easy', 'Medium', 'Hard'];

async function analyzeDistribution() {
    try {
        console.log('Analyzing problem distribution...');

        const res = await pool.query(`
            SELECT topic, difficulty, COUNT(*) as count 
            FROM problems 
            GROUP BY topic, difficulty
            ORDER BY topic, difficulty
        `);

        const distribution = {};

        // Initialize with 0
        topics.forEach(topic => {
            distribution[topic] = {};
            difficulties.forEach(diff => {
                distribution[topic][diff] = 0;
            });
        });

        // Fill with actual data
        res.rows.forEach(row => {
            if (distribution[row.topic] && distribution[row.topic][row.difficulty] !== undefined) {
                distribution[row.topic][row.difficulty] = parseInt(row.count);
            }
        });

        console.log('\nCurrent Distribution:');
        console.table(distribution);

        console.log('\nMissing Problems (Target: 5 per category):');
        let totalMissing = 0;

        topics.forEach(topic => {
            difficulties.forEach(diff => {
                const count = distribution[topic][diff];
                if (count < 5) {
                    const missing = 5 - count;
                    console.log(`${topic} - ${diff}: ${count} (Need ${missing} more)`);
                    totalMissing += missing;
                }
            });
        });

        console.log(`\nTotal new problems needed: ${totalMissing}`);

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

analyzeDistribution();
