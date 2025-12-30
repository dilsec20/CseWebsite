const fs = require('fs');
const path = require('path');

const CF_HANDLE = 'Little_Sheep_Yawn';
const API_URL = `https://codeforces.com/api/user.status?handle=${CF_HANDLE}`;

const MODULES = {
    "Number Theory": ["number theory", "math"], // 'math' is broad, but often NT. We'll handle 'math' carefully.
    "Bit Manipulation": ["bitmasks"],
    "Combinatorics": ["combinatorics"],
    "Advance Mathematics": ["probabilities", "fft", "matrices", "chinese remainder theorem", "geometry", "ternary search"],
    "Greedy Algorithms": ["greedy", "constructive algorithms"],
    "Searching Techniques": ["binary search", "two pointers", "divide and conquer", "meet-in-the-middle"],
    "Must know Data Structures": ["data structures", "dsu", "hashing", "stack", "sortings"],
    "Pre-Computation": [], // Hard to map tags
    "Graph Algorithms": ["graphs", "shortest paths", "flows", "graph matchings", "2-sat", "dfs and similar"],
    "Tree Algorithms": ["trees"],
    "Dynamic Programming": ["dp"],
    "Range Queries": [], // heuristic: data structures + rating > 1500?
    "String Algorithms": ["strings", "string suffix structures", "expression parsing"],
    "Game Theory": ["games"],
    "Advanced Topics": ["interactive", "*special", "schedules"]
};

// Priority order for mapping (specific to general)
const TAG_PRIORITY = [
    "trees", "graphs", "dp", "strings", "geometry", "flows", "fft", "game theory",
    "bitmasks", "number theory", "combinatorics", "probabilities", "dsu",
    "binary search", "two pointers", "greedy", "data structures", "implementation", "math"
];

async function fetchSubmissions() {
    console.log(`Fetching submissions for ${CF_HANDLE}...`);
    const response = await fetch(API_URL);
    const data = await response.json();
    if (data.status !== 'OK') throw new Error(`API Error: ${data.comment}`);
    return data.result;
}

function getModuleForProblem(tags) {
    // Try to find the most specific tag match
    for (const tag of tags) {
        // Check exact specialized mappings first
        if (MODULES["Tree Algorithms"].includes(tag)) return "Tree Algorithms";
        if (MODULES["Graph Algorithms"].includes(tag)) return "Graph Algorithms";
        if (MODULES["Dynamic Programming"].includes(tag)) return "Dynamic Programming";
        if (MODULES["String Algorithms"].includes(tag)) return "String Algorithms";
        if (MODULES["Bit Manipulation"].includes(tag)) return "Bit Manipulation";
        if (MODULES["Game Theory"].includes(tag)) return "Game Theory";
        if (MODULES["Advance Mathematics"].includes(tag)) return "Advance Mathematics";
        if (MODULES["Combinatorics"].includes(tag)) return "Combinatorics";
        if (MODULES["Number Theory"].includes(tag)) return "Number Theory";
        if (MODULES["Searching Techniques"].includes(tag)) return "Searching Techniques";
    }

    // Broader categories if no specific match
    for (const tag of tags) {
        if (MODULES["Must know Data Structures"].includes(tag)) return "Must know Data Structures";
        if (MODULES["Greedy Algorithms"].includes(tag)) return "Greedy Algorithms";
        if (MODULES["Advanced Topics"].includes(tag)) return "Advanced Topics";
    }

    // Fallbacks
    if (tags.includes("math")) return "Number Theory"; // Assign generic math to NT or Advance? Let's putting it in NT for now as it's module 1.
    if (tags.includes("implementation")) return "Greedy Algorithms"; // Often greedy/implementation overlap
    if (tags.includes("brute force")) return "Searching Techniques";

    return "Uncategorized";
}

async function main() {
    try {
        const submissions = await fetchSubmissions();
        const accepted = submissions.filter(s => s.verdict === 'OK');

        const problemMap = new Map();

        // Deduplicate
        for (const sub of accepted) {
            const id = `${sub.problem.contestId}-${sub.problem.index}`;
            if (!problemMap.has(id)) {
                problemMap.set(id, {
                    id: id,
                    name: sub.problem.name,
                    rating: sub.problem.rating || 0,
                    tags: sub.problem.tags,
                    contestId: sub.problem.contestId,
                    index: sub.problem.index,
                    link: `https://codeforces.com/contest/${sub.problem.contestId}/problem/${sub.problem.index}`
                });
            }
        }

        const organized = {};
        Object.keys(MODULES).forEach(m => organized[m] = []);
        organized["Uncategorized"] = [];

        for (const problem of problemMap.values()) {
            const moduleName = getModuleForProblem(problem.tags);
            if (organized[moduleName]) {
                organized[moduleName].push(problem);
            } else {
                organized["Uncategorized"].push(problem);
            }
        }

        // Sort by rating
        for (const mod in organized) {
            organized[mod].sort((a, b) => a.rating - b.rating);
        }

        const outputPath = path.join(__dirname, '../../client/src/data/little_sheep_yawn_problems.json');

        // Ensure directory exists
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(outputPath, JSON.stringify(organized, null, 2));
        console.log(`Saved ${problemMap.size} problems to ${outputPath}`);

    } catch (e) {
        console.error(e);
    }
}

main();
