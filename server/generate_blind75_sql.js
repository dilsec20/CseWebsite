const fs = require('fs');
const blind75 = require('./data/studyPlans');

const sqlStatements = [];
sqlStatements.push(`-- Seed Blind 75 Questions`);

blind75.forEach(category => {
    category.problems.forEach(title => {
        // Basic insert, ignore if title exists (case insensitive)
        // using Postgres specific ON CONFLICT or just INSERT WHERE NOT EXISTS
        const safeTitle = title.replace(/'/g, "''");

        sqlStatements.push(`
        INSERT INTO problems (title, description, difficulty, topic)
        SELECT '${safeTitle}', 'Solve the ${safeTitle} problem.', 'Medium', '${category.category}'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('${safeTitle}')
        );
        `);
    });
});

fs.writeFileSync('seed_blind75.sql', sqlStatements.join('\n'));
console.log("Generated seed_blind75.sql with " + sqlStatements.length + " statements.");
