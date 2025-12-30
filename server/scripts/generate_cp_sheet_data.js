const fs = require('fs');
const path = require('path');

const CF_HANDLE = 'Little_Sheep_Yawn';
const API_URL = `https://codeforces.com/api/user.status?handle=${CF_HANDLE}`;

// Module Definitions with Priority Sub-topics
const MODULE_CONFIG = {
    "Number Theory": {
        tags: ["chinese remainder theorem", "number theory", "math"],
        defaultSub: "General Number Theory"
    },
    "Bit Manipulation": {
        tags: ["bitmasks"],
        defaultSub: "Bitwise Operations"
    },
    "Combinatorics": {
        tags: ["combinatorics"],
        defaultSub: "General Combinatorics"
    },
    "Advance Mathematics": {
        tags: ["fft", "matrices", "probabilities", "geometry", "ternary search"],
        defaultSub: "Advanced Math"
    },
    "Greedy Algorithms": {
        tags: ["constructive algorithms", "greedy"],
        defaultSub: "Greedy Strategies"
    },
    "Searching Techniques": {
        tags: ["binary search", "ternary search", "divide and conquer", "two pointers", "meet-in-the-middle"],
        defaultSub: "Search Methods"
    },
    "Must know Data Structures": {
        tags: ["dsu", "data structures", "hashing", "stack", "sortings"],
        defaultSub: "Standard Data Structures"
    },
    "Pre-Computation": {
        tags: [], // Hard to automatically classify
        defaultSub: "Pre-Computation Techniques"
    },
    "Graph Algorithms": {
        tags: ["shortest paths", "dfs and similar", "flows", "graph matchings", "2-sat", "graphs"],
        defaultSub: "Graph Theory"
    },
    "Tree Algorithms": {
        tags: ["trees"],
        defaultSub: "Tree Algorithms"
    },
    "Dynamic Programming": {
        tags: ["dp"],
        defaultSub: "Dynamic Programming"
    },
    "Range Queries": {
        tags: [], // often data structures
        defaultSub: "Range Queries"
    },
    "String Algorithms": {
        tags: ["string suffix structures", "expression parsing", "strings"],
        defaultSub: "String Processing"
    },
    "Game Theory": {
        tags: ["games"],
        defaultSub: "Game Theory"
    },
    "Advanced Topics": {
        tags: ["interactive", "schedules", "*special"],
        defaultSub: "Miscellaneous"
    }
};

// Helper: Capitalize
const capitalize = s => s.replace(/\b\w/g, l => l.toUpperCase());

async function fetchSubmissions() {
    console.log(`Fetching submissions for ${CF_HANDLE}...`);
    const response = await fetch(API_URL);
    const data = await response.json();
    if (data.status !== 'OK') throw new Error(`API Error: ${data.comment}`);
    return data.result;
}

function classifyProblem(problem) {
    // 1. Filter Unrated
    if (!problem.rating || problem.rating <= 0) return null;

    const probTags = problem.tags || [];

    // 2. Find Module
    let assignedModule = "Uncategorized";
    let assignedSubTopic = "General";

    // Priority Check: specific modules first
    // We iterate through our config keys. 
    // Optimization: The order of MODULE_CONFIG keys in iteration matters if specific vs general.
    // Let's rely on specific tags.

    // Check specific topics first
    const specificOrder = [
        "Tree Algorithms", "Graph Algorithms", "Dynamic Programming", "String Algorithms",
        "Bit Manipulation", "Game Theory", "Advance Mathematics", "Combinatorics",
        "Number Theory", "Searching Techniques", "Must know Data Structures", "Greedy Algorithms"
    ];

    let found = false;
    for (const moduleName of specificOrder) {
        const config = MODULE_CONFIG[moduleName];
        // Check if any of the problem's tags match the module's tags
        const matchedTag = probTags.find(t => config.tags.includes(t));
        if (matchedTag) {
            assignedModule = moduleName;
            // Use the tag as subtopic (capitalized), or default if generic
            assignedSubTopic = capitalize(matchedTag);
            found = true;
            break;
        }
    }

    if (!found) {
        // Fallbacks for generic tags
        if (probTags.includes("math")) {
            assignedModule = "Number Theory";
            assignedSubTopic = "Math";
        } else if (probTags.includes("implementation")) {
            assignedModule = "Greedy Algorithms";
            assignedSubTopic = "Implementation";
        } else if (probTags.includes("brute force")) {
            assignedModule = "Searching Techniques";
            assignedSubTopic = "Brute Force";
        } else {
            // Check remaining modules (Advanced Topics etc)
            for (const [name, config] of Object.entries(MODULE_CONFIG)) {
                const matchedTag = probTags.find(t => config.tags.includes(t));
                if (matchedTag) {
                    assignedModule = name;
                    assignedSubTopic = capitalize(matchedTag);
                    found = true;
                    break;
                }
            }
        }
    }

    return { module: assignedModule, subTopic: assignedSubTopic };
}

async function main() {
    try {
        const submissions = await fetchSubmissions();
        const accepted = submissions.filter(s => s.verdict === 'OK');

        const uniqueProblems = new Map();

        // Deduplicate
        for (const sub of accepted) {
            const id = `${sub.problem.contestId}-${sub.problem.index}`;
            // IMPORTANT: FILTER UNRATED HERE
            if (!sub.problem.rating) continue;

            if (!uniqueProblems.has(id)) {
                uniqueProblems.set(id, {
                    id: id,
                    name: sub.problem.name,
                    rating: sub.problem.rating,
                    tags: sub.problem.tags,
                    contestId: sub.problem.contestId,
                    index: sub.problem.index,
                    link: `https://codeforces.com/contest/${sub.problem.contestId}/problem/${sub.problem.index}`
                });
            }
        }

        // Initialize Structure
        // { "Module": { "SubTopic": [problems...] } }
        const organized = {};
        Object.keys(MODULE_CONFIG).forEach(m => organized[m] = {});
        organized["Uncategorized"] = {};

        // Sort into structure
        for (const problem of uniqueProblems.values()) {
            const classification = classifyProblem(problem);
            if (!classification) continue; // Should be caught by rating filter, but safe guard

            const { module, subTopic } = classification;

            if (!organized[module][subTopic]) {
                organized[module][subTopic] = [];
            }
            organized[module][subTopic].push(problem);
        }

        // Sort problems by rating
        let totalCount = 0;
        for (const mod in organized) {
            for (const sub in organized[mod]) {
                organized[mod][sub].sort((a, b) => a.rating - b.rating);
                totalCount += organized[mod][sub].length;
            }
        }

        const outputPath = path.join(__dirname, '../../client/src/data/little_sheep_yawn_problems.json');

        fs.writeFileSync(outputPath, JSON.stringify(organized, null, 2));
        console.log(`Saved ${totalCount} rated problems to ${outputPath}`);
        console.log("Structure: Module -> SubTopic -> Problems");

    } catch (e) {
        console.error(e);
    }
}

main();
