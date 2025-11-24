const pool = require('../db');

// Fill remaining gaps identified by analysis
const finalGaps = [
    // Heap Easy - Need 1
    { t: 'Heap', d: 'Easy', n: 'Min K Pairs Smallest Sum', desc: 'Find k pairs with smallest sums.', inp: 'Line 1: nums1. Line 2: nums2. Line 3: k.', out: 'k pairs.', con: '1≤k≤1000', si: '1 7 11\n2 4 6\n3', so: '1 2\n1 4\n1 6', h: [{ i: '1 1 2\n1 2 3\n2', o: '1 1\n1 1' }, { i: '1 2\n3\n3', o: '1 3\n2 3' }, { i: '1\n1\n1', o: '1 1' }] },

    // Hashing Medium - Need 2
    { t: 'Hashing', d: 'Medium', n: 'Contiguous Array', desc: 'Longest subarray with equal 0s and 1s.', inp: 'Binary array.', out: 'Max length.', con: '1≤n≤10^5', si: '0 1', so: '2', h: [{ i: '0 1 0', o: '2' }, { i: '0 0 1 1 0', o: '4' }, { i: '1 1 1 1', o: '0' }] },
    { t: 'Hashing', d: 'Medium', n: '4Sum II', desc: 'Count 4-tuples summing to 0.', inp: '4 arrays.', out: 'Count.', con: '1≤n≤200', si: '1 2\n-2 -1\n-1 2\n0 2', so: '2', h: [{ i: '0\n0\n0\n0', o: '1' }, { i: '1 1\n-1 -1\n0 0\n0 0', o: '4' }, { i: '1\n1\n1\n1', o: '0' }] },

    // Tree - many medium/hard needed
    // Tree Easy gaps
    { t: 'Tree', d: 'Easy', n: 'Same Tree', desc: 'Check if two trees are identical.', inp: 'Tree1. Tree2 (level-order).', out: '"true"/"false".', con: '0≤n≤100', si: '1 2 3\n1 2 3', so: 'true', h: [{ i: '1 2\n1 null 2', o: 'false' }, { i: '1 2 1\n1 1 2', o: 'false' }, { i: '\n', o: 'true' }] },
    { t: 'Tree', d: 'Easy', n: 'Minimum Depth', desc: 'Find min depth to leaf.', inp: 'Level-order.', out: 'Min depth.', con: '0≤n≤10^5', si: '3 9 20 null null 15 7', so: '2', h: [{ i: '2 null 3 null 4 null 5 null 6', o: '5' }, { i: '', o: '0' }, { i: '1', o: '1' }] },

    // Tree Medium gaps  
    { t: 'Tree', d: 'Medium', n: 'Kth Smallest in BST', desc: 'Find kth smallest value.', inp: 'Line 1: tree. Line 2: k.', out: 'Kth smallest.', con: '1≤k≤n≤10^4', si: '3 1 4 null 2\n1', so: '1', h: [{ i: '5 3 6 2 4 null null 1\n3', o: '3' }, { i: '1\n1', o: '1' }, { i: '2 1 3\n2', o: '2' }] },
    { t: 'Tree', d: 'Medium', n: 'Flatten Tree to Linked List', desc: 'Flatten to linked list in-place.', inp: 'Level-order.', out: 'Flattened preorder.', con: '0≤n≤2000', si: '1 2 5 3 4 null 6', so: '1 null 2 null 3 null 4 null 5 null 6', h: [{ i: '', o: '' }, { i: '1 2', o: '1 null 2' }, { i: '1 null 2', o: '1 null 2' }] },
    { t: 'Tree', d: 'Medium', n: 'Populating Next Right Pointers', desc: 'Populate next right pointers.', inp: 'Perfect binary tree.', out: 'Tree with next pointers.', con: '0≤n≤4095', si: '1 2 3 4 5 6 7', so: '1#2 3#4 5 6 7#', h: [{ i: '', o: '' }, { i: '1', o: '1#' }, { i: '1 2 3', o: '1#2 3#' }] },
    { t: 'Tree', d: 'Medium', n: 'Binary Tree Right Side View', desc: 'Values visible from right.', inp: 'Level-order.', out: 'Right view values.', con: '0≤n≤100', si: '1 2 3 null 5 null 4', so: '1 3 4', h: [{ i: '1 null 3', o: '1 3' }, { i: '', o: '' }, { i: '1 2', o: '1 2' }] },

    // Tree Hard gaps
    { t: 'Tree', d: 'Hard', n: 'Binary Tree Cameras', desc: 'Min cameras to monitor all.', inp: 'Level-order.', out: 'Min cameras.', con: '1≤n≤1000', si: '0 0 null 0 0', so: '1', h: [{ i: '0 0 null 0 null 0 null null 0', o: '2' }, { i: '0', o: '1' }, { i: '0 0 0', o: '1' }] },
    { t: 'Tree', d: 'Hard', n: 'Vertical Order Traversal', desc: 'Vertical order traversal.', inp: 'Level-order.', out: 'Vertical columns.', con: '1≤n≤1000', si: '3 9 20 null null 15 7', so: '9\n3 15\n20\n7', h: [{ i: '1 2 3 4 5 6 7', o: '4\n2\n1 5 6\n3\n7' }, { i: '1', o: '1' }, { i: '1 2 3', o: '2\n1\n3' }] },

    // Graph Easy gaps
    { t: 'Graph', d: 'Easy', n: 'N-ary Tree Max Depth', desc: 'Max depth of n-ary tree.', inp: 'Tree levels.', out: 'Max depth.', con: '0≤n≤10^4', si: '1 3 2 4 5 6', so: '3', h: [{ i: '1 2 3 4 5', o: '3' }, { i: '', o: '0' }, { i: '1', o: '1' }] },
    { t: 'Graph', d: 'Easy', n: 'Minimum Depth Leaves', desc: 'Min depth to leaf.', inp: 'Level-order.', out: 'Min depth.', con: '1≤n≤10^5', si: '3 9 20 null null 15 7', so: '2', h: [{ i: '1', o: '1' }, { i: '2 null 3 null 4', o: '4' }, { i: '1 2 3', o: '2' }] },

    // Graph Medium gaps - need several
    { t: 'Graph', d: 'Medium', n: 'Word Ladder', desc: 'Shortest transformation sequence.', inp: 'Begin end. Dictionary.', out: 'Length or 0.', con: '1≤words≤5000', si: 'hit\ncog\nhot dot dog lot log cog', so: '5', h: [{ i: 'hit\ncog\nhot dot dog lot log', o: '0' }, { i: 'a\nc\na b c', o: '2' }, { i: 'abc\ncba\nabc bbc bcc cbc cba', o: '3' }] },
    { t: 'Graph', d: 'Medium', n: 'Surrounded Regions', desc: 'Flip surrounded regions.', inp: 'Board.', out: 'Modified board.', con: '1≤m,n≤200', si: 'X X X X\nX O O X\nX X O X\nX O X X', so: 'X X X X\nX X X X\nX X X X\nX O X X', h: [{ i: 'X', o: 'X' }, { i: 'O', o: 'O' }, { i: 'X O X\nX O X\nX O X', o: 'X O X\nX O X\nX O X' }] },
    { t: 'Graph', d: 'Medium', n: 'Shortest Path Binary Matrix', desc: 'Shortest clear path.', inp: 'Grid.', out: 'Path length or -1.', con: '1≤n≤100', si: '0 1\n1 0', so: '2', h: [{ i: '0 0 0\n1 1 0\n1 1 0', o: '4' }, { i: '1 0 0\n1 1 0\n1 1 0', o: '-1' }, { i: '0', o: '1' }] },
    { t: 'Graph', d: 'Medium', n: 'Minimum Cost Path', desc: 'Min cost to reach bottom-right.', inp: 'Grid with costs.', out: 'Min cost.', con: '1≤m,n≤200', si: '1 3 1\n1 5 1\n4 2 1', so: '7', h: [{ i: '1 2 3\n4 5 6', o: '12' }, { i: '5', o: '5' }, { i: '1 1\n1 1', o: '2' }] },

    // Graph Hard gaps
    { t: 'Graph', d: 'Hard', n: 'Alien Dictionary', desc: 'Find alien alphabet order.', inp: 'Words.', out: 'Alien order or "".', con: '1≤words≤100', si: 'wrt\nwrf\ner\nett\nrftt', so: 'wertf', h: [{ i: 'z\nx', o: 'zx' }, { i: 'z\nx\nz', o: '' }, { i: 'a\nb\nc', o: 'abc' }] },
    { t: 'Graph', d: 'Hard', n: 'Word Ladder II', desc: 'All shortest transformation paths.', inp: 'Begin end. Dictionary.', out: 'All shortest paths.', con: '1≤words≤5000', si: 'hit\ncog\nhot dot dog lot log cog', so: 'hit hot dot dog cog\nhit hot lot log cog', h: [{ i: 'red\ntax\nted tad tex red tax tad den rex pee', o: 'red ted tad tax\nred ted tex tax\nred rex tex tax' }, { i: 'a\nc\na b c', o: 'a c' }, { i: 'abc\ncba\nabc cba', o: '' }] },
    { t: 'Graph', d: 'Hard', n: 'Shortest Path Visiting All Nodes', desc: 'Shortest path visiting all.', inp: 'Graph adjacency.', out: 'Path length.', con: '1≤n≤12', si: '1 2 3\n0\n0\n0', so: '4', h: [{ i: '1\n0', o: '0' }, { i: '1 2 3 4\n0\n0\n0\n0', o: '4' }, { i: '1\n', o: '0' }] },

    // DP Easy gaps
    { t: 'Dynamic Programming', d: 'Easy', n: 'Fibonacci Number', desc: 'Compute nth Fibonacci.', inp: 'n', out: 'F(n).', con: '0≤n≤30', si: '4', so: '3', h: [{ i: '0', o: '0' }, { i: '1', o: '1' }, { i: '10', o: '55' }] },
    { t: 'Dynamic Programming', d: 'Easy', n: 'Pascal Triangle', desc: 'Generate first numRows.', inp: 'numRows', out: 'Pascal triangle.', con: '1≤numRows≤30', si: '5', so: '1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1', h: [{ i: '1', o: '1' }, { i: '2', o: '1\n1 1' }, { i: '3', o: '1\n1 1\n1 2 1' }] },

    // DP Medium gaps
    { t: 'Dynamic Programming', d: 'Medium', n: 'Decode Ways', desc: 'Ways to decode string.', inp: 'String of digits.', out: 'Decode count.', con: '1≤s≤100', si: '12', so: '2', h: [{ i: '226', o: '3' }, { i: '06', o: '0' }, { i: '1', o: '1' }] },
    { t: 'Dynamic Programming', d: 'Medium', n: 'Jump Game II', desc: 'Min jumps to last index.', inp: 'Array.', out: 'Min jumps.', con: '1≤n≤10^4', si: '2 3 1 1 4', so: '2', h: [{ i: '2 3 0 1 4', o: '2' }, { i: '1 1 1 1', o: '3' }, { i: '1 2 3', o: '2' }] },
    { t: 'Dynamic Programming', d: 'Medium', n: 'Triangle Minimum Path', desc: 'Min path sum top to bottom.', inp: 'Triangle rows.', out: 'Min sum.', con: '1≤rows≤200', si: '2\n3 4\n6 5 7\n4 1 8 3', so: '11', h: [{ i: '-10', o: '-10' }, { i: '2\n3 4', o: '5' }, { i: '1\n2 3', o: '3' }] },

    // DP Hard gaps  
    { t: 'Dynamic Programming', d: 'Hard', n: 'Longest Valid Parentheses', desc: 'Length of longest valid parentheses.', inp: 'String of parentheses.', out: 'Max length.', con: '0≤length≤3×10^4', si: '(()', so: '2', h: [{ i: ')()())', o: '4' }, { i: '', o: '0' }, { i: '()(())', o: '6' }] },

    // Greedy Easy gaps
    { t: 'Greedy', d: 'Easy', n: 'Min Cost Climbing Stairs', desc: 'Min cost to reach top.', inp: 'Cost array.', out: 'Min cost.', con: '2≤n≤1000', si: '10 15 20', so: '15', h: [{ i: '1 100 1 1 1 100 1 1 100 1', o: '6' }, { i: '1 2 3 4 5', o: '6' }, { i: '10 15', o: '10' }] },

    // Greedy Medium gaps
    { t: 'Greedy', d: 'Medium', n: 'Minimum Arrows Burst Balloons', desc: 'Min arrows to burst all.', inp: 'Balloon intervals.', out: 'Min arrows.', con: '1≤n≤10^5', si: '10 16\n2 8\n1 6\n7 12', so: '2', h: [{ i: '1 2\n3 4\n5 6\n7 8', o: '4' }, { i: '1 2\n2 3\n3 4\n4 5', o: '2' }, { i: '1 10\n2 9\n3 8', o: '1' }] },
    { t: 'Greedy', d: 'Medium', n: 'Task Scheduler', desc: 'Min time to finish tasks.', inp: 'Tasks. Cool down n.', out: 'Min time.', con: '1≤tasks≤10^4', si: 'A A A B B B\n2', so: '8', h: [{ i: 'A A A A A A B C D E F G\n2', o: '16' }, { i: 'A A A\n0', o: '3' }, { i: 'A B\n0', o: '2' }] },

    // Greedy Hard gaps  
    { t: 'Greedy', d: 'Hard', n: 'Merge Intervals', desc: 'Merge overlapping intervals.', inp: 'Intervals.', out: 'Merged intervals.', con: '1≤n≤10^4', si: '1 3\n2 6\n8 10\n15 18', so: '1 6\n8 10\n15 18', h: [{ i: '1 4\n4 5', o: '1 5' }, { i: '1 4\n5 6', o: '1 4\n5 6' }, { i: '1 10\n2 3', o: '1 10' }] },

    // Backtracking Easy gaps
    { t: 'Backtracking', d: 'Easy', n: 'Combination Sum III', desc: 'Find k numbers summing to n (1-9).', inp: 'k n', out: 'All combinations.', con: '2≤k≤9,1≤n≤60', si: '3 7', so: '1 2 4', h: [{ i: '3 9', o: '1 2 6\n1 3 5\n2 3 4' }, { i: '4 1', o: '' }, { i: '2 18', o: '9 9' }] },
    { t: 'Backtracking', d: 'Easy', n: 'Binary Watch', desc: 'Possible times with num LEDs on.', inp: 'num (turned on LEDs)', out: 'All times.', con: '0≤num≤10', si: '1', so: '0:01 0:02 0:04 0:08 0:16 0:32 1:00 2:00 4:00 8:00', h: [{ i: '0', o: '0:00' }, { i: '2', o: '0:03 0:05 0:06 0:09 0:10 0:12 0:17 0:18 0:20 0:24 0:33 0:34 0:36 0:40 0:48 1:01 1:02 1:04 1:08 1:16 1:32 2:01 2:02 2:04 2:08 2:16 2:32 3:00 4:01 4:02 4:04 4:08 4:16 4:32 5:00 6:00 8:01 8:02 8:04 8:08 8:16 8:32 9:00 10:00' }, { i: '9', o: '7:31 7:47 7:55 7:59 11:31 11:47 11:55 11:59' }] },

    // Backtracking Medium gaps
    { t: 'Backtracking', d: 'Medium', n: 'Combination Sum', desc: 'Find combos summing to target (numbers reusable).', inp: 'Candidates. Target.', out: 'All combinations.', con: '1≤candidates≤30', si: '2 3 6 7\n7', so: '2 2 3\n7', h: [{ i: '2 3 5\n8', o: '2 2 2 2\n2 3 3\n3 5' }, { i: '2\n1', o: '' }, { i: '1\n2', o: '1 1' }] },
    { t: 'Backtracking', d: 'Medium', n: 'Palindrome Partitioning', desc: 'All palindrome partitions.', inp: 'String.', out: 'All partitions.', con: '1≤s≤16', si: 'aab', so: 'a a b\na ab', h: [{ i: 'a', o: 'a' }, { i: 'bb', o: 'b b\nbb' }, { i: 'abc', o: 'a b c' }] },
    { t: 'Backtracking', d: 'Medium', n: 'Sudoku Solver', desc: 'Solve 9x9 Sudoku.', inp: '9 lines of 9 chars (. for empty).', out: 'Solved board.', con: 'Valid input', si: '53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79', so: '534678912\n672195348\n198342567\n859761423\n426853791\n713924856\n961537284\n287419635\n345286179', h: [{ i: '..9748...\n7........\n.2.1.9...\n..7...24.\n.64.1.59.\n.98...3..\n...8.3.2.\n........6\n...2759..', o: '519748632\n783652419\n426139875\n357986241\n264317598\n198524367\n975863124\n832491756\n641275983' }, { i: '1........\n.2.......\n..3......\n...4.....\n....5....\n.....6...\n......7..\n.......8.\n........9', o: '123456789\n456789123\n789123456\n234567891\n567891234\n891234567\n345678912\n678912345\n912345678' }, { i: '.........\n.........\n.........\n.........\n.........\n.........\n.........\n.........\n.........', o: '123456789\n456789123\n789123456\n234567891\n567891234\n891234567\n345678912\n678912345\n912345678' }] },

    // Backtracking Hard gaps
    { t: 'Backtracking', d: 'Hard', n: 'N-Queens II', desc: 'Count solutions to N-Queens.', inp: 'n', out: 'Solution count.', con: '1≤n≤9', si: '4', so: '2', h: [{ i: '1', o: '1' }, { i: '2', o: '0' }, { i: '8', o: '92' }] },
    { t: 'Backtracking', d: 'Hard', n: 'Sudoku Permutations', desc: 'Count valid Sudoku permutations.', inp: 'Partially filled board.', out: 'Count.', con: 'Valid input', si: '53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79', so: '1', h: [{ i: '.........\n.........\n.........\n.........\n.........\n.........\n.........\n.........\n.........', o: '6670903752021072936960' }, { i: '1........\n.2.......\n..3......\n...4.....\n....5....\n.....6...\n......7..\n.......8.\n........9', o: '1' }, { i: '12.......\n3........\n.........\n.........\n.........\n.........\n.........\n.........\n.........', o: '2612736' }] }
];

async function fillFinalGaps() {
    const c = await pool.connect();
    try {
        console.log('Filling final gaps...\\n');
        let a = 0;
        for (const p of finalGaps) {
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
        console.log(`\\n✨ Added ${a} final problems!`);
    } catch (err) { console.error(err); throw err; }
    finally { c.release(); await pool.end(); }
}
fillFinalGaps();
