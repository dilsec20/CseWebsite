const pool = require('../db');
const fs = require('fs');

async function categorizeIssues() {
    const client = await pool.connect();
    try {
        console.log('📋 Categorizing Problem Issues...\n');

        // Read audit report
        const auditData = JSON.parse(fs.readFileSync(__dirname + '/audit_report.json', 'utf8'));

        const categories = {
            inputFormatMismatch: [],
            missingInputFormat: [],
            missingOutputFormat: [],
            missingConstraints: [],
            shortDescription: [],
            nullOutput: []
        };

        auditData.forEach(problem => {
            problem.issues.forEach(issue => {
                if (issue.includes('lines but sample has')) {
                    categories.inputFormatMismatch.push({
                        id: problem.id,
                        title: problem.title,
                        issue
                    });
                } else if (issue.includes('Missing Input Format')) {
                    categories.missingInputFormat.push(problem);
                } else if (issue.includes('Missing Output Format')) {
                    categories.missingOutputFormat.push(problem);
                } else if (issue.includes('Missing Constraints')) {
                    categories.missingConstraints.push(problem);
                } else if (issue.includes('too short')) {
                    categories.shortDescription.push(problem);
                } else if (issue.includes('null/undefined')) {
                    categories.nullOutput.push(problem);
                }
            });
        });

        console.log('📊 ISSUE BREAKDOWN:\n');
        console.log(`1. Input Format Mismatch: ${categories.inputFormatMismatch.length} problems`);
        console.log(`   (Description mentions n lines but sample has fewer)`);
        console.log(`\n2. Missing Input Format Section: ${categories.missingInputFormat.length} problems`);
        console.log(`3. Missing Output Format Section: ${categories.missingOutputFormat.length} problems`);
        console.log(`4. Missing Constraints Section: ${categories.missingConstraints.length} problems`);
        console.log(`5. Too Short Description: ${categories.shortDescription.length} problems`);
        console.log(`6. Null/Undefined Output: ${categories.nullOutput.length} problems`);

        console.log(`\n\n🔍 TOP 20 INPUT FORMAT MISMATCHES:\n`);
        categories.inputFormatMismatch.slice(0, 20).forEach((p, idx) => {
            console.log(`${idx + 1}. [${p.id}] ${p.title}`);
            console.log(`   ${p.issue}\n`);
        });

        // Save categorized report
        fs.writeFileSync(
            __dirname + '/categorized_issues.json',
            JSON.stringify(categories, null, 2)
        );

        console.log(`\n📄 Saved to: ${__dirname}/categorized_issues.json`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

categorizeIssues();
