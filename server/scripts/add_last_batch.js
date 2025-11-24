const pool = require('../db');

const lastBatch = [
    // Greedy Hard - Need 3
    { t: 'Greedy', d: 'Hard', n: 'Minimum Window Substring', desc: 'Min window containing all chars of t.', inp: 'String s. String t.', out: 'Min window substring.', con: '1≤m,n≤10^5', si: 'ADOBECODEBANC\nABC', so: 'BANC', h: [{ i: 'a\na', o: 'a' }, { i: 'a\naa', o: '' }, { i: 'ab\nb', o: 'b' }] },
    { t: 'Greedy', d: 'Hard', n: 'IPO', desc: 'Max capital with k projects.', inp: 'k w. Profits. Capital.', out: 'Max capital.', con: '1≤k≤10^5', si: '2 0\n1 2 3\n0 1 1', so: '4', h: [{ i: '1 0\n1\n0', o: '1' }, { i: '3 0\n1 2 3\n0 1 2', o: '6' }, { i: '1 1\n1 2 3\n1 1 2', o: '2' }] },
    { t: 'Greedy', d: 'Hard', n: 'Employee Free Time', desc: 'Common free time intervals.', inp: 'Employee schedules.', out: 'Free intervals.', con: '1≤employees≤500', si: '1 3 5 6\n2 4\n2 3 9 12', so: '6 9', h: [{ i: '1 2 3 4', o: '' }, { i: '1 3\n4 6', o: '3 4' }, { i: '1 5\n2 3', o: '' }] },

    // Backtracking Easy - Need 1
    { t: 'Backtracking', d: 'Easy', n: 'Letter Combinations Length', desc: 'Count letter combinations.', inp: 'Digits.', out: 'Count.', con: '0≤digits≤4', si: '23', so: '9', h: [{ i: '', o: '0' }, { i: '2', o: '3' }, { i: '999', o: '27' }] },

    // Binary Search Hard - Need 3
    { t: 'Binary Search', d: 'Hard', n: 'Kth Smallest Pair Distance', desc: 'Find kth smallest pair distance.', inp: 'Array. k.', out: 'kth distance.', con: '2≤n≤10^4', si: '1 3 1\n1', so: '0', h: [{ i: '1 1 1\n2', o: '0' }, { i: '1 6 1\n3', o: '5' }, { i: '1 2 3\n2', o: '1' }] },
    { t: 'Binary Search', d: 'Hard', n: 'Find K-th Smallest Sum', desc: 'Kth smallest sum of pairs.', inp: 'Line 1: nums1. Line 2: nums2. Line 3: k.', out: 'kth sum.', con: '1≤n≤2000', si: '1 7 11\n2 4 6\n3', so: '7', h: [{ i: '1 2\n3\n2', o: '4' }, { i: '1\n1\n1', o: '2' }, { i: '1 2 3\n4 5 6\n5', o: '7' }] },
    { t: 'Binary Search', d: 'Hard', n: 'Maximum Average Subarray II', desc: 'Max average of subarray length ≥ k.', inp: 'Array. k.', out: 'Max average (3 decimals).', con: '1≤k≤n≤10^4', si: '1 12 -5 -6 50 3\n4', so: '12.750', h: [{ i: '5\n1', o: '5.000' }, { i: '-1 -2 -3 -4 -5\n2', o: '-1.500' }, { i: '1 2 3 4 5\n3', o: '4.000' }] },

    // Heap Hard - Need 1
    { t: 'Heap', d: 'Hard', n: 'Trapping Rain Water II', desc: 'Water trapped in 2D elevation map.', inp: 'rows cols. Matrix.', out: 'Total water.', con: '1≤m,n≤200', si: '3 6\n1 4 3 1 3 2\n3 2 1 3 2 4\n2 3 3 2 3 1', so: '4', h: [{ i: '3 3\n3 3 3\n3 2 3\n3 3 3', o: '1' }, { i: '2 2\n1 2\n2 1', o: '0' }, { i: '1 1\n5', o: '0' }] },

    // Stack Hard - Need 3
    { t: 'Stack', d: 'Hard', n: 'Basic Calculator', desc: 'Evaluate expression with +, -, (, ).', inp: 'Expression string.', out: 'Result.', con: '1≤s≤3×10^5', si: '(1+(4+5+2)-3)+(6+8)', so: '23', h: [{ i: '1 + 1', o: '2' }, { i: ' 2-1 + 2 ', o: '3' }, { i: '(1)', o: '1' }] },
    { t: 'Stack', d: 'Hard', n: 'Longest Valid Parentheses', desc: 'Length of longest valid parentheses substring.', inp: 'String of parentheses.', out: 'Max length.', con: '0≤s≤3×10^4', si: '(()', so: '2', h: [{ i: ')()())', o: '4' }, { i: '', o: '0' }, { i: '()(())', o: '6' }] },
    { t: 'Stack', d: 'Hard', n: 'Remove Invalid Parentheses', desc: 'Remove min parentheses to make valid.', inp: 'String.', out: 'All valid strings.', con: '1≤s≤25', si: '()())()', so: '(())()\n()()()', h: [{ i: '(a)())()', o: '(a())()\n(a)()()' }, { i: ')(', o: '' }, { i: 'n', o: 'n' }] },

    // Dynamic Programming Hard - Need 3
    { t: 'Dynamic Programming', d: 'Hard', n: 'Distinct Subsequences', desc: 'Count distinct subsequences of t in s.', inp: 'String s. String t.', out: 'Count.', con: '1≤s,t≤1000', si: 'rabbbit\nrabbit', so: '3', h: [{ i: 'babgbag\nbag', o: '5' }, { i: 'abc\nabc', o: '1' }, { i: 'a\na', o: '1' }] },
    { t: 'Dynamic Programming', d: 'Hard', n: 'Interleaving String', desc: 'Check if s3 is interleaving of s1 and s2.', inp: 'String s1. String s2. String s3.', out: '"true"/"false".', con: '0≤len≤100', si: 'aabcc\ndbbca\naadbbcbcac', so: 'true', h: [{ i: 'aabcc\ndbbca\naadbbbaccc', o: 'false' }, { i: 'a\nb\nab', o: 'true' }, { i: 'a\nb\nba', o: 'true' }] },
    { t: 'Dynamic Programming', d: 'Hard', n: 'Burst Balloons', desc: 'Max coins from bursting balloons.', inp: 'Array of balloon values.', out: 'Max coins.', con: '1≤n≤500', si: '3 1 5 8', so: '167', h: [{ i: '1 5', o: '10' }, { i: '1', o: '1' }, { i: '9 76 64', o: '14824' }] },

    // Graph Hard - Need 3 more
    { t: 'Graph', d: 'Hard', n: 'Critical Connections', desc: 'Find all critical connections (bridges).', inp: 'n. Edges.', out: 'Critical connections.', con: '1≤n≤10^5', si: '4\n0 1\n1 2\n2 0\n1 3', so: '1 3', h: [{ i: '2\n0 1', o: '0 1' }, { i: '6\n0 1\n1 2\n2 0\n1 3\n3 4\n4 5\n5 3', o: '0 1\n1 3' }, { i: '3\n0 1\n1 2\n2 0', o: '' }] },
    { t: 'Graph', d: 'Hard', n: 'Reconstruct Itinerary', desc: 'Reconstruct travel itinerary (lexicographically smallest).', inp: 'Tickets (from to).', out: 'Itinerary.', con: '1≤tickets≤300', si: 'MUC LHR\nJFK MUC\nSFO SJC\nLHR SFO', so: 'JFK MUC LHR SFO SJC', h: [{ i: 'JFK SFO\nJFK ATL\nSFO ATL\nATL JFK\nATL SFO', o: 'JFK ATL JFK SFO ATL SFO' }, { i: 'JFK KUL\nJFK NRT', o: 'JFK KUL' }, { i: 'A B\nB A', o: 'A B A' }] },
    { t: 'Graph', d: 'Hard', n: 'Swim in Rising Water', desc: 'Min time to swim from top-left to bottom-right.', inp: 'n×n grid with elevations.', out: 'Min time.', con: '1≤n≤50', si: '0 2\n1 3', so: '3', h: [{ i: '0 1 2 3 4\n24 23 22 21 5\n12 13 14 15 16\n11 17 18 19 20\n10 9 8 7 6', o: '16' }, { i: '0', o: '0' }, { i: '3 2\n0 1', o: '3' }] },

    // Linked List Hard - Need 1 more
    { t: 'Linked List', d: 'Hard', n: 'Reverse Nodes Between', desc: 'Reverse nodes from position left to right.', inp: 'Line 1: list. Line 2: left right.', out: 'Modified list.', con: '1≤left≤right≤n', si: '1 2 3 4 5\n2 4', so: '1 4 3 2 5', h: [{ i: '5\n1 1', o: '5' }, { i: '1 2 3\n1 3', o: '3 2 1' }, { i: '1 2 3 4 5\n1 5', o: '5 4 3 2 1' }] },

    // Hashing Hard - Need 1
    { t: 'Hashing', d: 'Hard', n: 'Max Points on Line', desc: 'Max points on same line.', inp: 'Points (x y per line).', out: 'Max points.', con: '1≤points≤300', si: '1 1\n2 2\n3 3', so: '3', h: [{ i: '1 1\n3 2\n5 3\n4 1\n2 3\n1 4', o: '4' }, { i: '0 0', o: '1' }, { i: '0 0\n1 1\n0 0', o: '3' }] },

    // Queue Hard - Need 1
    { t: 'Queue', d: 'Hard', n: 'Sliding Puzzle', desc: 'Min moves to solve 2×3 sliding puzzle.', inp: '2×3 board.', out: 'Min moves or -1.', con: 'Valid board', si: '1 2 3\n4 0 5', so: '1', h: [{ i: '1 2 3\n5 4 0', o: '-1' }, { i: '4 1 2\n5 0 3', o: '5' }, { i: '1 2 3\n4 5 0', o: '0' }] },

    // Tree Hard - Need 1 more
    { t: 'Tree', d: 'Hard', n: 'Count Unique BSTs', desc: 'Count unique BSTs with n nodes.', inp: 'n', out: 'Count.', con: '1≤n≤19', si: '3', so: '5', h: [{ i: '1', o: '1' }, { i: '2', o: '2' }, { i: '4', o: '14' }] },

    // Array Hard - Need 1
    { t: 'Array', d: 'Hard', n: 'First Missing Positive', desc: 'Find smallest missing positive integer.', inp: 'Array.', out: 'Smallest missing positive.', con: '1≤n≤10^5', si: '1 2 0', so: '3', h: [{ i: '3 4 -1 1', o: '2' }, { i: '7 8 9 11 12', o: '1' }, { i: '1', o: '2' }] },

    // String Hard - Need 1
    { t: 'String', d: 'Hard', n: 'Minimum Window Contains All', desc: 'Min substring containing all characters.', inp: 'String s. String t.', out: 'Min window.', con: '1≤m,n≤10^5', si: 'ADOBECODEBANC\nABC', so: 'BANC', h: [{ i: 'a\na', o: 'a' }, { i: 'a\naa', o: '' }, { i: 'aaaaaaaaaaaabbbbbcdd\nabcdd', o: 'abbbbbcdd' }] }
];

async function addLastBatch() {
    const c = await pool.connect();
    try {
        console.log('Adding final 27 problems...\\n');
        let a = 0;
        for (const p of lastBatch) {
            const e = await c.query('SELECT 1 FROM problems WHERE title=$1', [p.n]);
            if (e.rows.length) { console.log(`⏭️  ${p.n}`); continue; }
            const i = await c.query(
                'INSERT INTO problems(title,description,difficulty,topic,input_format,output_format,constraints) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING problem_id',
                [p.n, p.desc, p.d, p.t, p.inp, p.out, p.con]
            );
            const pid = i.rows[0].problem_id;
            await c.query('INSERT INTO test_cases(problem_id,input,expected_output,is_sample) VALUES ($1,$2,$3,true)', [pid, p.si, p.so]);
            for (const t of p.h) {
                await c.query('INSERT INTO test_cases(problem_id,input,expected_output,is_sample) VALUES ($1,$2,$3,false)', [pid, t.i, t.o]);
            }
            a++;
            console.log(`✅ ${p.t} ${p.d}: ${p.n}`);
        }
        console.log(`\\n✨ Successfully added ${a} problems!`);
    } catch (err) { console.error(err); throw err; }
    finally { c.release(); await pool.end(); }
}
addLastBatch();
