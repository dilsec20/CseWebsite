const pool = require('../db');

async function enhanceDescriptions() {
    const client = await pool.connect();
    try {
        console.log('✨ Enhancing Module Descriptions...\n');

        const updates = {
            'Introduction & C++ Basics': 'Start your journey here! Learn the fundamentals of programming with C++, including variables, loops, functions, and basic logic building. Perfect for absolute beginners.',
            'Time & Space Complexity': 'Understand how to measure code efficiency. Learn Big O notation to distinguish between good and bad algorithms—a critical skill for coding interviews.',
            'Arrays & Vectors': 'Master the most fundamental data structure. Learn how to store, access, and manipulate collections of data efficiently using arrays and dynamic vectors.',
            'Common Array Techniques': 'Level up your problem-solving! Learn essential patterns like Two Pointers and Sliding Window that are frequently asked in technical interviews.',
            'Strings': 'Dive into text processing. Learn how to manipulate strings, check for palindromes, and solve common pattern matching problems used in real-world apps.',
            'Searching & Sorting': 'Learn how to find and organize data. Master Binary Search for lightning-fast lookups and understand sorting algorithms like Merge Sort and Quick Sort.',
            'Recursion & Backtracking': 'Unlock the power of self-referential functions. Learn to solve complex problems like mazes and puzzles by breaking them down into smaller steps.',
            'Linked Lists': 'Understand dynamic data structures. Learn how to build chains of data nodes, a foundational concept for more complex structures like trees and graphs.',
            'Stacks & Queues': 'Master LIFO and FIFO data structures. Learn how to manage data flow, implement undo features, and process tasks in order.',
            'Binary Trees & BST': 'Enter the world of hierarchical data. Learn how to organize data in tree structures for efficient searching, insertion, and deletion.',
            'Heaps & Priority Queues': 'Learn to manage priorities. Master Heaps to efficiently find the largest or smallest elements, crucial for scheduling and graph algorithms.',
            'Graphs': 'Model real-world connections. Learn to represent networks like social media or maps, and traverse them using BFS and DFS algorithms.',
            'Dynamic Programming': 'Solve the hardest problems! Learn to optimize complex recursive solutions by storing results—the key to cracking top-tier interview questions.',
            'Bit Manipulation': 'Get closer to the hardware. Learn to manipulate individual bits for high-performance optimization and solving unique mathematical problems.',
            'Number Theory & Math': 'Sharpen your mathematical edge. Learn prime sieves, modular arithmetic, and other math concepts frequently tested in competitive programming.'
        };

        for (const [title, description] of Object.entries(updates)) {
            await client.query('UPDATE dsa_modules SET description = $1 WHERE title = $2', [description, title]);
            console.log(`✅ Updated: ${title}`);
        }

        console.log('\n🎉 All descriptions enhanced for beginners!');

    } catch (err) {
        console.error(err);
    } finally {
        client.release();
        await pool.end();
    }
}

enhanceDescriptions();
