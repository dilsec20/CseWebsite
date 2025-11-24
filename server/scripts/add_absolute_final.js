const pool = require('../db');

const absoluteFinal = [
    // Stack Hard - Need 1
    { t: 'Stack', d: 'Hard', n: 'Count of Atoms', desc: 'Parse chemical formula and count atoms.', inp: 'Chemical formula.', out: 'Sorted atom counts.', con: '1≤formula≤1000', si: 'H2O', so: 'H2O', h: [{ i: 'Mg(OH)2', o: 'H2MgO2' }, { i: 'K4(ON(SO3)2)2', o: 'K4N2O14S4' }, { i: 'Be32', o: 'Be32' }] },

    // String Hard - Need 3
    { t: 'String', d: 'Hard', n: 'Distinct Subsequences', desc: 'Count distinct subsequences.', inp: 'String s. String t.', out: 'Count.', con: '1≤s,t≤1000', si: 'rabbbit\nrabbit', so: '3', h: [{ i: 'babgbag\nbag', o: '5' }, { i: 'abc\nabc', o: '1' }, { i: 'a\na', o: '1' }] },
    { t: 'String', d: 'Hard', n: 'Word Break II', desc: 'All possible word breaks.', inp: 'String. Dictionary.', out: 'All sentences.', con: '1≤s≤20', si: 'catsanddog\ncat cats and sand dog', so: 'cat sand dog\ncats and dog', h: [{ i: 'pineapplepenapple\napple pen applepen pine pineapple', o: 'pine apple pen apple\npine applepen apple\npineapple pen apple' }, { i: 'catsandog\ncats dog sand and cat', o: '' }, { i: 'a\na', o: 'a' }] },
    { t: 'String', d: 'Hard', n: 'Text Justification', desc: 'Justify text to max width.', inp: 'Words. Max width.', out: 'Justified lines.', con: '1≤words≤300', si: 'This is an example of text justification.\n16', so: 'This    is    an\nexample  of text\njustification.  ', h: [{ i: 'What must be acknowledgment shall be\n16', o: 'What   must   be\nacknowledgment  \nshall be        ' }, { i: 'Science  is  what we understand well enough to explain to a computer.  Art is everything else we do\n20', o: 'Science  is  what we\nunderstand      well\nenough to explain to\na  computer.  Art is\neverything  else  we\ndo                  ' }, { i: 'a\n1', o: 'a' }] },

    // Array Medium - Need 1 (to balance)
    { t: 'Array', d: 'Medium', n: 'Container With Most Water', desc: 'Find container with most water.', inp: 'Heights.', out: 'Max area.', con: '2≤n≤10^5', si: '1 8 6 2 5 4 8 3 7', so: '49', h: [{ i: '1 1', o: '1' }, { i: '4 3 2 1 4', o: '16' }, { i: '1 2 1', o: '2' }] },

    // String Medium - Need 1 (to balance)
    { t: 'String', d: 'Medium', n: 'Longest Palindromic Substring', desc: 'Find longest palindromic substring.', inp: 'String.', out: 'Longest palindrome.', con: '1≤s≤1000', si: 'babad', so: 'bab', h: [{ i: 'cbbd', o: 'bb' }, { i: 'a', o: 'a' }, { i: 'ac', o: 'a' }] },

    // Linked List Medium - Need 1 (to balance)
    { t: 'Linked List', d: 'Medium', n: 'Partition List', desc: 'Partition list around value x.', inp: 'Line 1: list. Line 2: x.', out: 'Partitioned list.', con: '0≤n≤200', si: '1 4 3 2 5 2\n3', so: '1 2 2 4 3 5', h: [{ i: '2 1\n2', o: '1 2' }, { i: '1\n0', o: '1' }, { i: '1 4 3 0 2 5 2\n3', o: '1 0 2 2 4 3 5' }] },

    // Queue Medium - Need 1 (to balance)
    { t: 'Queue', d: 'Medium', n: 'Design Snake Game', desc: 'Design a snake game.', inp: 'Width height. Food positions. Moves.', out: 'Scores after each move or -1.', con: '1≤width,height≤10^4', si: '3 2\n1 2\n2 0\nR\nD\nR\nU\nL\nU', so: '0\n1\n1\n1\n1\n-1', h: [{ i: '3 3\n2 0\n0 1\nR\nD\nD\nL\nU', o: '0\n0\n1\n1\n1' }, { i: '2 2\n0 1\nR\nD', o: '0\n1' }, { i: '1 1\n\nL', o: '-1' }] },

    // Greedy Medium - Need 1 (to balance)
    { t: 'Greedy', d: 'Medium', n: 'Wiggle Subsequence', desc: 'Max length wiggle subsequence.', inp: 'Array.', out: 'Max length.', con: '1≤n≤1000', si: '1 7 4 9 2 5', so: '6', h: [{ i: '1 17 5 10 13 15 10 5 16 8', o: '7' }, { i: '1 2 3 4 5 6 7 8 9', o: '2' }, { i: '1', o: '1' }] }
];

async function addAbsoluteFinal() {
    const c = await pool.connect();
    try {
        console.log('Adding absolute final 8 problems...\\n');
        let a = 0;
        for (const p of absoluteFinal) {
            const e = await c.query('SELECT 1 FROM problems WHERE title=$1', [p.n]);
            if (e.rows.length) { console.log(`⏭️  ${p.n}`); continue; }
            const i = await c.query(
                'INSERT INTO problems(title,description,difficulty,topic,input_format,output_format,constraints) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING problem_id',
                [p.n, p.desc, p.d, p.t, p.inp, p.out, p.con]
            );
            const pid = i.rows[0].problem_id;
            await c.query('INSERT INTO test_cases(problem_id,input,expected_output,is_sample) VALUES($1,$2,$3,true)', [pid, p.si, p.so]);
            for (const t of p.h) {
                await c.query('INSERT INTO test_cases(problem_id,input,expected_output,is_sample) VALUES ($1,$2,$3,false)', [pid, t.i, t.o]);
            }
            a++;
            console.log(`✅ ${p.t} ${p.d}: ${p.n}`);
        }
        console.log(`\\n🎉 Complete! Added ${a} problems!`);
        console.log('All requirements should now be met!');
    } catch (err) { console.error(err); throw err; }
    finally { c.release(); await pool.end(); }
}
addAbsoluteFinal();
