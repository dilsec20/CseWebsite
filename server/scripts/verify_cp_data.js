const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../../client/src/data/little_sheep_yawn_problems.json');

try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    let totalProblems = 0;
    let unratedCount = 0;
    let structureValid = true;

    console.log("Verifying Data Integrity...");

    for (const [moduleName, subTopics] of Object.entries(data)) {
        if (typeof subTopics !== 'object' || Array.isArray(subTopics)) {
            console.error(`Invalid structure for module ${moduleName}. Expected object of subtopics.`);
            structureValid = false;
            continue;
        }

        for (const [subTopic, problems] of Object.entries(subTopics)) {
            if (!Array.isArray(problems)) {
                console.error(`Invalid structure for ${moduleName} -> ${subTopic}. Expected array of problems.`);
                structureValid = false;
                continue;
            }

            for (const p of problems) {
                totalProblems++;
                if (!p.rating || p.rating <= 0) {
                    unratedCount++;
                    console.warn(`Found unrated problem: ${p.id} (${p.name})`);
                }
            }
        }
    }

    console.log("------------------------------------------------");
    console.log(`Total Problems: ${totalProblems}`);
    console.log(`Unrated Problems: ${unratedCount}`);
    console.log(`Structure Valid: ${structureValid}`);

    if (unratedCount === 0 && structureValid) {
        console.log("SUCCESS: Data verification passed.");
    } else {
        console.log("FAILURE: Data verification failed.");
    }

} catch (e) {
    console.error("Error reading or parsing data file:", e);
}
