/**
 * Script to extract and organize Codeforces accepted submissions by topic and rating
 * For user: Little_Sheep_Yawn
 */

const fs = require('fs');
const path = require('path');

const CF_HANDLE = 'Little_Sheep_Yawn';
const API_URL = `https://codeforces.com/api/user.status?handle=${CF_HANDLE}`;

async function fetchSubmissions() {
    console.log(`Fetching submissions for ${CF_HANDLE}...`);

    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.status !== 'OK') {
        throw new Error(`API Error: ${data.comment}`);
    }

    return data.result;
}

function processSubmissions(submissions) {
    // Filter only accepted submissions
    const acceptedSubmissions = submissions.filter(s => s.verdict === 'OK');

    // Create a map to track unique problems (avoid duplicates)
    const uniqueProblems = new Map();

    for (const submission of acceptedSubmissions) {
        const problem = submission.problem;
        const problemKey = `${problem.contestId}-${problem.index}`;

        // Only keep the first accepted submission for each problem
        if (!uniqueProblems.has(problemKey)) {
            uniqueProblems.set(problemKey, {
                contestId: problem.contestId,
                index: problem.index,
                name: problem.name,
                rating: problem.rating || null,
                tags: problem.tags || [],
                points: problem.points || null,
                url: `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`
            });
        }
    }

    return Array.from(uniqueProblems.values());
}

function organizeByTopic(problems) {
    const topicMap = new Map();

    // Also track problems with no tags
    const untaggedProblems = [];

    for (const problem of problems) {
        if (problem.tags.length === 0) {
            untaggedProblems.push(problem);
        } else {
            for (const tag of problem.tags) {
                if (!topicMap.has(tag)) {
                    topicMap.set(tag, []);
                }
                topicMap.get(tag).push(problem);
            }
        }
    }

    // Sort problems within each topic by rating (ascending)
    for (const [tag, tagProblems] of topicMap) {
        tagProblems.sort((a, b) => {
            // Problems without rating go to the end
            if (a.rating === null && b.rating === null) return 0;
            if (a.rating === null) return 1;
            if (b.rating === null) return -1;
            return a.rating - b.rating;
        });
    }

    // Sort untagged problems by rating
    untaggedProblems.sort((a, b) => {
        if (a.rating === null && b.rating === null) return 0;
        if (a.rating === null) return 1;
        if (b.rating === null) return -1;
        return a.rating - b.rating;
    });

    return { topicMap, untaggedProblems };
}

function generateMarkdown(handle, problems, topicMap, untaggedProblems) {
    let md = `# Codeforces Accepted Solutions for ${handle}\n\n`;
    md += `*Generated on: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}*\n\n`;

    // Summary stats
    const totalProblems = problems.length;
    const ratedProblems = problems.filter(p => p.rating !== null);
    const avgRating = ratedProblems.length > 0
        ? Math.round(ratedProblems.reduce((sum, p) => sum + p.rating, 0) / ratedProblems.length)
        : 0;

    md += `## 📊 Summary\n\n`;
    md += `| Metric | Value |\n`;
    md += `|--------|-------|\n`;
    md += `| Total Unique Problems Solved | **${totalProblems}** |\n`;
    md += `| Problems with Rating | ${ratedProblems.length} |\n`;
    md += `| Average Problem Rating | ${avgRating} |\n`;
    md += `| Total Topics Covered | ${topicMap.size} |\n\n`;

    // Rating Distribution
    const ratingBuckets = {};
    for (const p of ratedProblems) {
        const bucket = Math.floor(p.rating / 100) * 100;
        ratingBuckets[bucket] = (ratingBuckets[bucket] || 0) + 1;
    }

    md += `## 📈 Rating Distribution\n\n`;
    md += `| Rating Range | Count |\n`;
    md += `|-------------|-------|\n`;
    for (const [bucket, count] of Object.entries(ratingBuckets).sort((a, b) => parseInt(a[0]) - parseInt(b[0]))) {
        md += `| ${bucket} - ${parseInt(bucket) + 99} | ${count} |\n`;
    }
    md += `\n`;

    // Topics Table of Contents
    md += `## 📑 Topics\n\n`;
    const sortedTopics = Array.from(topicMap.entries()).sort((a, b) => b[1].length - a[1].length);
    for (const [topic, topicProblems] of sortedTopics) {
        const topicAnchor = topic.replace(/\s+/g, '-').toLowerCase();
        md += `- [${topic}](#${topicAnchor}) (${topicProblems.length} problems)\n`;
    }
    if (untaggedProblems.length > 0) {
        md += `- [Untagged Problems](#untagged-problems) (${untaggedProblems.length} problems)\n`;
    }
    md += `\n---\n\n`;

    // Detail sections for each topic
    for (const [topic, topicProblems] of sortedTopics) {
        md += `## ${topic}\n\n`;
        md += `*${topicProblems.length} problems*\n\n`;
        md += `| # | Problem | Rating | Contest |\n`;
        md += `|---|---------|--------|----------|\n`;

        let i = 1;
        for (const p of topicProblems) {
            const ratingStr = p.rating ? `**${p.rating}**` : 'Unrated';
            const ratingColor = getRatingColor(p.rating);
            md += `| ${i} | [${p.name}](${p.url}) | ${ratingStr} | ${p.contestId}${p.index} |\n`;
            i++;
        }
        md += `\n`;
    }

    // Untagged problems section
    if (untaggedProblems.length > 0) {
        md += `## Untagged Problems\n\n`;
        md += `*${untaggedProblems.length} problems (from Gym contests or untagged problems)*\n\n`;
        md += `| # | Problem | Rating | Contest |\n`;
        md += `|---|---------|--------|----------|\n`;

        let i = 1;
        for (const p of untaggedProblems) {
            const ratingStr = p.rating ? `**${p.rating}**` : 'Unrated';
            md += `| ${i} | [${p.name}](${p.url}) | ${ratingStr} | ${p.contestId}${p.index} |\n`;
            i++;
        }
        md += `\n`;
    }

    return md;
}

function getRatingColor(rating) {
    if (!rating) return 'gray';
    if (rating < 1200) return 'gray';
    if (rating < 1400) return 'green';
    if (rating < 1600) return 'cyan';
    if (rating < 1900) return 'blue';
    if (rating < 2100) return 'violet';
    if (rating < 2400) return 'orange';
    return 'red';
}

async function main() {
    try {
        const submissions = await fetchSubmissions();
        console.log(`Total submissions fetched: ${submissions.length}`);

        const problems = processSubmissions(submissions);
        console.log(`Unique accepted problems: ${problems.length}`);

        const { topicMap, untaggedProblems } = organizeByTopic(problems);
        console.log(`Topics found: ${topicMap.size}`);
        console.log(`Untagged problems: ${untaggedProblems.length}`);

        const markdown = generateMarkdown(CF_HANDLE, problems, topicMap, untaggedProblems);

        const outputPath = path.join(__dirname, '..', '..', `cf_solutions_${CF_HANDLE}.md`);
        fs.writeFileSync(outputPath, markdown, 'utf8');
        console.log(`\n✅ Report saved to: ${outputPath}`);

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();
