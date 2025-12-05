const fs = require('fs');
const path = require('path');

const SEED_FILE = path.join(__dirname, '../production_seed.sql');

function parseSqlFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const problems = {};
    const testCases = [];

    const statements = content.split('INSERT INTO ');

    statements.forEach(stmt => {
        if (stmt.startsWith('problems')) {
            const match = stmt.match(/VALUES\s*\((\d+),\s*'([^']*)'/);
            if (match) {
                const id = parseInt(match[1]);
                const title = match[2];
                problems[id] = { id, title, raw: stmt };
            }
        } else if (stmt.startsWith('test_cases')) {
            const match = stmt.match(/VALUES\s*\((\d+),\s*(\d+),\s*'((?:[^']|'')*)',\s*'((?:[^']|'')*)'/);
            if (match) {
                testCases.push({
                    id: parseInt(match[1]),
                    problemId: parseInt(match[2]),
                    input: match[3],
                    output: match[4]
                });
            }
        }
    });

    return { problems, testCases };
}

function analyze(data) {
    const { problems, testCases } = data;
    const suspicious = [];

    const problemTests = {};
    testCases.forEach(tc => {
        if (!problemTests[tc.problemId]) problemTests[tc.problemId] = [];
        problemTests[tc.problemId].push(tc);
    });

    Object.keys(problemTests).forEach(pId => {
        const tests = problemTests[pId];
        const problem = problems[pId];

        if (!problem) return;

        tests.forEach(tc => {
            if (tc.input.trim() === tc.output.trim() && tc.input.length > 1) {
                suspicious.push({
                    type: 'Input equals Output',
                    problemId: pId,
                    title: problem.title,
                    testCaseId: tc.id,
                    input: tc.input,
                    output: tc.output
                });
            }
        });
    });

    return suspicious;
}

try {
    console.log('Parsing SQL file...');
    const data = parseSqlFile(SEED_FILE);
    console.log(`Parsed ${Object.keys(data.problems).length} problems and ${data.testCases.length} test cases.`);

    console.log('Analyzing...');
    const issues = analyze(data);

    let report = '--- Suspicious Findings ---\n';
    issues.forEach(issue => {
        report += `[${issue.type}] Problem ${issue.problemId} (${issue.title}): TC ${issue.testCaseId}\n`;
        report += `  Input: ${issue.input.replace(/\n/g, '\\n').substring(0, 50)}...\n`;
        report += `  Output: ${issue.output.replace(/\n/g, '\\n').substring(0, 50)}...\n`;
    });

    fs.writeFileSync(path.join(__dirname, '../audit_report.txt'), report, 'utf8');
    console.log('Report written to server/audit_report.txt');

} catch (err) {
    console.error('Error:', err);
}
