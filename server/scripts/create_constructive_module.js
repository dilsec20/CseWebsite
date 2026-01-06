const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const pool = require('../db');

async function createConstructiveModule() {
    try {
        const filePath = 'd:\\CseWebsite\\construve algo.txt';
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // 1. Clean the content
        // Remove common header/footer lines from the PDF-to-text conversion
        const cleanContent = fileContent
            .split('\n')
            .filter(line => {
                let trimmed = line.trim();

                // 1. Remove Page Numbers (e.g., "28/127")
                if (/^\d+\/\d+$/.test(trimmed)) return false;

                // 2. Remove URLs
                if (trimmed.startsWith('https://chatgpt.com')) return false;

                // 3. Remove Timestamps (e.g., "06/01/2026, 15:22")
                if (/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}$/.test(trimmed)) return false;

                // 4. Remove Header/Footer Repeats
                if (trimmed === 'C++ constructive algorithm') return false;

                // 5. Remove UI Artifacts & Language Labels
                if (/^Copy code/.test(trimmed)) return false;
                if (/^makefile$/i.test(trimmed)) return false;
                if (/^nginx$/i.test(trimmed)) return false;
                if (/^yaml$/i.test(trimmed)) return false;
                if (/^scss$/i.test(trimmed)) return false;
                if (/^cpp$/i.test(trimmed)) return false;
                if (/^python$/i.test(trimmed)) return false;
                if (/^java$/i.test(trimmed)) return false;
                if (/^c$/i.test(trimmed)) return false;

                // 6. Remove Conversational Filler known garbage strings
                const garbage = ['yes', 'Perfect', 'Excellent', 'Got it!', 'Updated saved memory'];
                for (const g of garbage) {
                    if (trimmed.startsWith(g)) return false;
                }

                if (trimmed === '') return false; // Remove empty lines to compact it, or keep them? 
                // Let's keep empty lines if we want separation, but usually the split('\n') keeps them as empty strings. 
                // The original code kept them because ' ' matches nothing specific.
                // But the raw file has 5 empty lines in a row sometimes. 
                // Let's filter empty lines for now, or maybe just really excessive ones.
                // Just filtering empty lines might merge headers with content. 
                // Let's NOT filter empty lines generally, but filter lines that contain only garbage chars.
                // However, the previous implementation did `trim()` and check.
                // If I return true for '', it preserves empty lines.
                // I will preserve empty lines unless they follow each other (handling that is harder in filter).

                if (trimmed.startsWith('Would you like me to')) return false;

                return true;
            })
            .join('\n');

        // 2. Extract Phases
        // Regex to find "Phase X — Title"
        const phaseRegex = /Phase\s+(\d+)\s*[—–-]\s*([^\r\n]+)/g;
        let match;
        const phases = [];

        let lastIndex = 0;
        let lastPhase = null;

        while ((match = phaseRegex.exec(cleanContent)) !== null) {
            const currentIndex = match.index;

            // If we have a previous phase, capture its content up to this new phase
            if (lastPhase) {
                lastPhase.content = cleanContent.substring(lastIndex, currentIndex).trim();
                phases.push(lastPhase);
            }

            // Start new phase
            lastPhase = {
                number: parseInt(match[1]),
                title: `Phase ${match[1]}: ${match[2].trim()}`
            };

            // Update lastIndex to the end of the match (start of content)
            lastIndex = phaseRegex.lastIndex;
        }

        // Push the final phase
        if (lastPhase) {
            lastPhase.content = cleanContent.substring(lastIndex).trim();
            phases.push(lastPhase);
        }

        console.log(`Found ${phases.length} phases.`);

        // 3. Create Module
        const moduleTitle = 'Constructive Algorithm';
        const moduleId = 16;

        // Check if module exists
        const modCheck = await pool.query('SELECT * FROM cp_modules WHERE module_id = $1', [moduleId]);
        if (modCheck.rows.length === 0) {
            await pool.query(
                'INSERT INTO cp_modules (module_id, title, description, module_order) VALUES ($1, $2, $3, $4)',
                [moduleId, moduleTitle, 'Master constructive algorithms patterns and techniques for competitive programming.', moduleId]
            );
            console.log(`Created Module ${moduleId}: ${moduleTitle}`);
        } else {
            // Update module just in case
            await pool.query(
                'UPDATE cp_modules SET title = $1, description = $2, module_order = $3 WHERE module_id = $4',
                [moduleTitle, 'Master constructive algorithms patterns and techniques for competitive programming.', moduleId, moduleId]
            );
            console.log(`Module ${moduleId} already exists (Updated).`);
        }

        // 4. Insert Topics
        for (const phase of phases) {
            let finalContent = phase.content;

            // Simple enhancement: Ensure "Pattern X" lines are bold or headers
            finalContent = finalContent.replace(/^Pattern \d+/gm, (m) => `### ${m}`);

            const topicCheck = await pool.query(
                'SELECT topic_id FROM cp_topics WHERE module_id = $1 AND topic_order = $2',
                [moduleId, phase.number]
            );

            if (topicCheck.rows.length > 0) {
                // Update existing
                await pool.query(
                    'UPDATE cp_topics SET title = $1, content = $2 WHERE topic_id = $3',
                    [phase.title, finalContent, topicCheck.rows[0].topic_id]
                );
                console.log(`Updated Topic ${phase.number}: ${phase.title}`);
            } else {
                // Insert new
                await pool.query(
                    'INSERT INTO cp_topics (module_id, title, content, topic_order) VALUES ($1, $2, $3, $4)',
                    [moduleId, phase.title, finalContent, phase.number]
                );
                console.log(`Created Topic ${phase.number}: ${phase.title}`);
            }
        }

        console.log('✅ Successfully processed all phases.');
        process.exit(0);

    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

createConstructiveModule();
