const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres.xlqzqcqacpajpqwneqpa:05Supabase%40%40%3F%3F@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false }
});

// Mapping Striver problems to existing topics
const striverProblems = {
    // Binary Search -> Module 6: Searching
    "2. Binary Search on Answer": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Hamburgers](https://codeforces.com/contest/371/problem/C)
- [Magic Powder - 1](https://codeforces.com/contest/670/problem/D1)
- [Pipeline](https://codeforces.com/contest/287/problem/B)
- [Poisoned Dagger](https://codeforces.com/problemset/problem/1613/C)
- [Mike and Chocolate Thieves](https://codeforces.com/contest/689/problem/C)
- [Increasing by Modulo](https://codeforces.com/contest/1169/problem/C)
- [Vasya and Robot](https://codeforces.com/contest/1073/problem/C)
- [Multiplication Table](https://codeforces.com/contest/448/problem/D)
- [Stressful Training](https://codeforces.com/contest/1132/problem/D)
- [Water Taps](https://codeforces.com/contest/954/problem/E)
- [Minimax Problem](https://codeforces.com/contest/1288/problem/D)
- [Odd-Even Subsequence](https://codeforces.com/contest/1370/problem/D)`,

    // Prime, Sieve -> Module 1: Number Theory
    "2. Sieve of Eratosthenes": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Prime Generator](https://www.spoj.com/problems/PRIME1/)
- [Printing some primes](https://www.spoj.com/problems/TDPRIMES/)
- [Finding the Kth Prime](https://www.spoj.com/problems/TDKPRIME/)
- [Good Sequences](https://codeforces.com/contest/264/problem/B)
- [Taxes](https://codeforces.com/contest/735/problem/D)
- [Soldier and Number Game](https://codeforces.com/contest/546/problem/D)
- [Reducing Fractions](https://codeforces.com/contest/222/problem/C)
- [Petya and Divisors](https://codeforces.com/problemset/problem/111/B)
- [Primes and Multiplication](https://codeforces.com/contest/1228/problem/C)
- [GCD Counting](https://codeforces.com/contest/1101/problem/D)`,

    // Bit Manipulation -> Module 2
    "5. Bitmasking on Sets & Numbers": `
## 📚 Extra Problems (Striver's CP Sheet)
- [New Year's Eve](https://codeforces.com/problemset/problem/912/B)
- [Special Numbers](https://codeforces.com/problemset/problem/1594/B)
- [Petr and a Combination Lock](https://codeforces.com/problemset/problem/1097/B)
- [Array Elimination](https://codeforces.com/contest/1602/problem/C)
- [Powers Of Two](https://codeforces.com/problemset/problem/1095/C)
- [Berland Crossword](https://codeforces.com/problemset/problem/1494/B)
- [Dima and a Bad XOR](https://codeforces.com/problemset/problem/1151/B)
- [p-binary](https://codeforces.com/problemset/problem/1225/C)
- [Ehab and the Expected XOR Problem](https://codeforces.com/contest/1174/problem/D)
- [Zookeeper and The Infinite Zoo](https://codeforces.com/problemset/problem/1491/D)`,

    // Stack/Queues -> Module 7: Data Structures
    "1. Stack & Monotonic Stack": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Alternating Current](https://codeforces.com/contest/343/problem/B)
- [Cd and pwd commands](https://codeforces.com/contest/158/problem/C)
- [Longest Regular Bracket Sequence](https://codeforces.com/contest/5/problem/C)
- [Pair of Numbers](https://codeforces.com/contest/359/problem/D)
- [Great Vova Wall](https://codeforces.com/contest/1092/problem/D1)
- [Skyscrapers (hard version)](https://codeforces.com/contest/1313/problem/C2)
- [Phoenix and Towers](https://codeforces.com/contest/1515/problem/C)
- [Psychos in a Line](https://codeforces.com/contest/319/problem/B)
- [Strip](https://codeforces.com/contest/487/problem/B)
- [Special Segments of Permutation](https://codeforces.com/contest/1156/problem/E)
- [Stack Sorting](https://codeforces.com/contest/911/problem/E)
- [Breaking Good](https://codeforces.com/contest/507/problem/E)`,

    // String Algorithms -> Module 13
    "1. KMP Algorithm (Pattern Matching)": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Password](https://codeforces.com/problemset/problem/126/B)
- [MUH and Cube Walls](https://codeforces.com/contest/471/problem/D)
- [Camp Schedule](https://codeforces.com/contest/1138/problem/D)
- [Prefixes and Suffixes](https://codeforces.com/contest/432/problem/D)
- [Erase and Extend](https://codeforces.com/contest/1537/problem/E2)`,

    "3. Manacher's Algorithm": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Number of Palindromes](https://www.spoj.com/problems/NUMOFPAL/)
- [Longest Palindromic Substring](https://www.spoj.com/problems/LPS/)
- [Mirror Strings](https://www.spoj.com/problems/MSUBSTR/)
- [Extend to Palindrome](https://www.spoj.com/problems/EPALIN/)`,

    "3. String Hashing (Rolling Hash)": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Good Substrings](https://codeforces.com/problemset/problem/271/D)
- [Prefix-Suffix Palindrome](https://codeforces.com/contest/1326/problem/D2)
- [Watto and Mechanism](https://codeforces.com/contest/514/problem/C)
- [Palindrome Degree](https://codeforces.com/contest/7/problem/D)
- [Spy Syndrome 2](https://codeforces.com/contest/633/problem/C)
- [Segment Occurrences](https://codeforces.com/contest/1016/problem/B)
- [Sonya and Matrix Beauty](https://codeforces.com/contest/1080/problem/E)`,

    // Trees -> Module 10
    "1. Tree Basics & Traversal": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Circumference of a Tree](https://codeforces.com/gym/102694/problem/A)
- [Dynamic Diameter](https://codeforces.com/gym/102694/problem/B)
- [Military Problem](https://codeforces.com/contest/1006/problem/E)
- [Three Paths on a Tree](https://codeforces.com/contest/1294/problem/F)`,

    // LCA -> Module 10
    "2. Lowest Common Ancestor (LCA)": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Sloth Naptime](https://codeforces.com/gym/102694/problem/C)
- [Cycle Free Flow](https://codeforces.com/gym/102694/problem/D)
- [Tree Queries](https://codeforces.com/contest/1328/problem/E)
- [1-Trees and Queries](https://codeforces.com/contest/1304/problem/E)
- [Blood Cousins](https://codeforces.com/contest/208/problem/E)
- [Fools and Roads](https://codeforces.com/contest/191/problem/C)
- [A and B and Lecture Rooms](https://codeforces.com/contest/519/problem/E)
- [Duff-in-the-Army](https://codeforces.com/contest/587/problem/C)
- [Minimum spanning tree for each edge](https://codeforces.com/contest/609/problem/E)
- [Information Graph](https://codeforces.com/contest/466/problem/E)
- [Filthy Rich Trees](https://codeforces.com/gym/102694/problem/E)
- [The-Lorax](https://codeforces.com/gym/102694/problem/F)`,

    // Graph Algorithms -> Module 9
    "1. DFS & BFS Fundamentals": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Two Buttons](https://codeforces.com/problemset/problem/520/B)
- [Party](https://codeforces.com/problemset/problem/115/A)
- [Kefa and Park](https://codeforces.com/problemset/problem/580/C)
- [Cyclic Components](https://codeforces.com/problemset/problem/977/E)
- [King's Path](https://codeforces.com/contest/242/problem/C)
- [Monopole Magnets](https://codeforces.com/contest/1345/problem/D)
- [Xor-Paths](https://codeforces.com/problemset/problem/1006/F)`,

    "2. Shortest Path Algorithms": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Dijkstra?](https://codeforces.com/contest/20/problem/C)
- [Fair](https://codeforces.com/contest/986/problem/A)
- [Planets](https://codeforces.com/contest/229/problem/B)
- [Weights Distributing](https://codeforces.com/contest/1343/problem/E)
- [Dima and Bacteria](https://codeforces.com/contest/400/problem/D)`,

    "4. DAG & Topological Sort": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Graph Without Long Directed Paths](https://codeforces.com/contest/1144/problem/F)
- [Fox And Names](https://codeforces.com/contest/510/problem/C)
- [Directing Edges](https://codeforces.com/contest/1385/problem/E)
- [Unstable String Sort](https://codeforces.com/contest/1213/problem/F)
- [String Coloring](https://codeforces.com/contest/1296/problem/E1)
- [Book](https://codeforces.com/contest/1573/problem/C)
- [How Many Paths?](https://codeforces.com/contest/1547/problem/G)`,

    "5. Advanced Connectivity (Bridges, SCC)": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Strongly Connected City](https://codeforces.com/problemset/problem/475/B)
- [Greg and Graph](https://codeforces.com/contest/295/problem/B)
- [Greedy Merchants](https://codeforces.com/contest/178/problem/B3)`,

    // Matrix Exponentiation -> Module 4
    "1. Matrix Exponentiation": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Plant](https://codeforces.com/problemset/problem/185/A)
- [Magic Gems](https://codeforces.com/contest/1117/problem/D)
- [Once Again](https://codeforces.com/contest/582/problem/B)
- [Decoding Genome](https://codeforces.com/contest/222/problem/E)
- [Wet Shark and Blocks](https://codeforces.com/contest/621/problem/E)
- [Product Oriented Recurrence](https://codeforces.com/contest/1182/problem/E)`,

    // Trie -> Module 13
    "4. Trie (Prefix Tree)": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Vasiliy's Multiset](https://codeforces.com/contest/706/problem/D)
- [Perfect Security](https://codeforces.com/contest/948/problem/D)
- [Beautiful Subarrays](https://codeforces.com/contest/665/problem/E)
- [Dr. Evil Underscores](https://codeforces.com/contest/1285/problem/D)
- [Polycarp's phone book](https://codeforces.com/contest/858/problem/D)
- [A Lot of Games](https://codeforces.com/contest/455/problem/B)
- [Petr#](https://codeforces.com/contest/113/problem/B)
- [Sausage Maximization](https://codeforces.com/contest/282/problem/E)`,

    // Dynamic Programming -> Module 11
    "1. DP Fundamentals (1D & 2D)": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Classy Numbers](https://codeforces.com/contest/1036/problem/C)
- [QAQ](https://codeforces.com/problemset/problem/894/A)
- [Napoleon Cake](https://codeforces.com/problemset/problem/1501/B)
- [Red and Blue](https://codeforces.com/problemset/problem/1469/B)
- [Fence](https://codeforces.com/problemset/problem/363/B)
- [Ilya and Queries](https://codeforces.com/problemset/problem/313/B)
- [Flipping Game](https://codeforces.com/problemset/problem/327/A)
- [Lecture Sleep](https://codeforces.com/problemset/problem/961/B)
- [Reposts](https://codeforces.com/problemset/problem/522/A)
- [Vitamins](https://codeforces.com/problemset/problem/1042/B)
- [Cut Ribbon](https://codeforces.com/problemset/problem/189/A)
- [Pokémon Army](https://codeforces.com/problemset/problem/1420/C1)`,

    "2. Classic Problems (Knapsack, LIS, LCS)": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Mashmokh and ACM](https://codeforces.com/problemset/problem/414/B)
- [Basketball Exercise](https://codeforces.com/problemset/problem/1195/C)
- [Orac and Models](https://codeforces.com/problemset/problem/1350/B)
- [Mr. Kitayuta, the Treasure Hunter](https://codeforces.com/contest/505/problem/C)
- [Modulo Sum](https://codeforces.com/contest/577/problem/B)
- [Hanoi Factory](https://codeforces.com/contest/777/problem/E)`,

    "4. Digit DP & Bitmask DP": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Little Elephant and Interval](https://codeforces.com/contest/204/problem/A)
- [Roman and Numbers](https://codeforces.com/contest/401/problem/D)
- [Compatible Numbers](https://codeforces.com/contest/165/problem/E)
- [The Values You Can Make](https://codeforces.com/contest/687/problem/C)`,

    "3. Range DP (Intervals)": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Painting Fence](https://codeforces.com/contest/448/problem/C)
- [Clear the String](https://codeforces.com/contest/1132/problem/F)`,

    "4. Tree Dynamic Programming": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Choosing Capital for Treeland](https://codeforces.com/contest/219/problem/D)
- [Book of Evil](https://codeforces.com/contest/337/problem/D)
- [Appleman and Tree](https://codeforces.com/contest/461/problem/B)`,

    "5. DP Optimizations (CHT, SOS)": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Riding in a Lift](https://codeforces.com/contest/479/problem/E)
- [Antenna Coverage](https://codeforces.com/contest/1253/problem/E)
- [Wi-Fi](https://codeforces.com/contest/1216/problem/F)
- [Kalila and Dimna](https://codeforces.com/contest/319/problem/C)
- [The Fair Nut and Rectangles](https://codeforces.com/contest/1083/problem/E)
- [The Maths Lecture](https://codeforces.com/contest/507/problem/D)
- [Bad Luck Island](https://codeforces.com/contest/540/problem/D)`,

    // Disjoint Set -> Module 9
    "3. DSU & MST": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Little Alawn's Puzzle](https://codeforces.com/problemset/problem/1534/C)
- [Ice Skating](https://codeforces.com/problemset/problem/217/A)
- [Learning Languages](https://codeforces.com/contest/277/problem/A)
- [Bertown Subway](https://codeforces.com/contest/884/problem/C)
- [K-Complete Word](https://codeforces.com/contest/1332/problem/C)
- [Civilization](https://codeforces.com/contest/455/problem/C)
- [0-1-Tree](https://codeforces.com/contest/1156/problem/D)
- [Path Queries](https://codeforces.com/contest/1213/problem/G)
- [Dogeforces](https://codeforces.com/problemset/problem/1494/D)`,

    // Mo's Algorithm -> Module 12
    "4. Mo's Algorithm (Square Root Decomposition)": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Powerful array](https://codeforces.com/contest/86/problem/D)
- [XOR and Favorite Number](https://codeforces.com/contest/617/problem/E)
- [Little Elephant and Array](https://codeforces.com/contest/220/problem/B)
- [Cut and Stick](https://codeforces.com/contest/1514/problem/D)
- [Tree and Queries](https://codeforces.com/contest/375/problem/D)
- [XOR on Segment](https://codeforces.com/contest/242/problem/E)`,

    // Fenwick Tree -> Module 12
    "2. Fenwick Tree (Binary Indexed Tree)": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Enemy is weak](https://codeforces.com/contest/61/problem/E)
- [Moving Points](https://codeforces.com/contest/1311/problem/F)
- [Cows and Sequence](https://codeforces.com/contest/283/problem/A)
- [Pashmak and Parmida's problem](https://codeforces.com/contest/459/problem/D)
- [Bubble Sort Graph](https://codeforces.com/contest/340/problem/D)
- [Vasya and a Tree](https://codeforces.com/contest/1076/problem/E)
- [Multiset](https://codeforces.com/contest/1354/problem/D)
- [Fixed Point Removal](https://codeforces.com/contest/1405/problem/E)
- [Propagating tree](https://codeforces.com/contest/383/problem/C)
- [Kill Anton](https://codeforces.com/contest/1526/problem/D)
- [Little Girl and Problem on Trees](https://codeforces.com/contest/276/problem/E)`,

    // Segment Tree -> Module 12
    "3. Segment Tree (Lazy Propagation)": `
## 📚 Extra Problems (Striver's CP Sheet)
- [Xenia and Bit Operations](https://codeforces.com/contest/339/problem/D)
- [Bash and a Tough Math Puzzle](https://codeforces.com/contest/914/problem/D)
- [Sereja and Brackets](https://codeforces.com/contest/380/problem/C)
- [Ant colony](https://codeforces.com/contest/474/problem/F)
- [Balanced Playlist](https://codeforces.com/contest/1237/problem/D)
- [Copying Data](https://codeforces.com/contest/292/problem/E)
- [Interesting Array](https://codeforces.com/contest/482/problem/B)
- [Subarray Sorting](https://codeforces.com/contest/1187/problem/D)
- [SUM and REPLACE](https://codeforces.com/contest/920/problem/F)
- [Playoff Tournament](https://codeforces.com/contest/1535/problem/D)
- [The Child and Sequence](https://codeforces.com/contest/438/problem/D)
- [Equilibrium](https://codeforces.com/contest/1556/problem/E)
- [Non-Decreasing Dilemma](https://codeforces.com/contest/1567/problem/E)
- [Circular RMQ](https://codeforces.com/contest/52/problem/C)
- [Array Restoration](https://codeforces.com/contest/1023/problem/D)
- [Ezzat and Grid](https://codeforces.com/contest/1715/problem/E)`
};

async function appendStriverProblems() {
    try {
        console.log('📚 Adding Striver CP Sheet problems to topics...');

        for (const [topicTitle, extraProblems] of Object.entries(striverProblems)) {
            // Get current content
            const res = await pool.query('SELECT content FROM cp_topics WHERE title = $1', [topicTitle]);

            if (res.rowCount > 0) {
                const currentContent = res.rows[0].content;
                const newContent = currentContent + '\n\n' + extraProblems;

                await pool.query('UPDATE cp_topics SET content = $1 WHERE title = $2', [newContent, topicTitle]);
                console.log('✅ Updated: ' + topicTitle);
            } else {
                console.log('⚠️ Topic not found: ' + topicTitle);
            }
        }

        console.log('🎉 All Striver problems added!');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

appendStriverProblems();
