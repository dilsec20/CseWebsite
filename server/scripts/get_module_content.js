const pool = require('../db');

async function getModuleTopics(moduleId) {
    try {
        const topics = await pool.query(`
            SELECT topic_id, title, content, topic_order
            FROM cp_topics
            WHERE module_id = $1
            ORDER BY topic_order
        `, [moduleId]);

        topics.rows.forEach(t => {
            console.log(`\n\n========== Topic ${t.topic_order}: ${t.title} (ID: ${t.topic_id}) ==========\n`);
            console.log(t.content);
        });

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

// Get Module 11 (Dynamic Programming)
getModuleTopics(11);
