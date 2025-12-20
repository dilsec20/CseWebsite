-- Seed Blind 75 Questions

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Two Sum', 'Solve the Two Sum problem.', 'Medium', 'Arrays & Hashing'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Two Sum')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Contains Duplicate', 'Solve the Contains Duplicate problem.', 'Medium', 'Arrays & Hashing'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Contains Duplicate')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Valid Anagram', 'Solve the Valid Anagram problem.', 'Medium', 'Arrays & Hashing'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Valid Anagram')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Group Anagrams', 'Solve the Group Anagrams problem.', 'Medium', 'Arrays & Hashing'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Group Anagrams')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Top K Frequent Elements', 'Solve the Top K Frequent Elements problem.', 'Medium', 'Arrays & Hashing'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Top K Frequent Elements')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Product of Array Except Self', 'Solve the Product of Array Except Self problem.', 'Medium', 'Arrays & Hashing'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Product of Array Except Self')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Longest Consecutive Sequence', 'Solve the Longest Consecutive Sequence problem.', 'Medium', 'Arrays & Hashing'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Longest Consecutive Sequence')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Valid Palindrome', 'Solve the Valid Palindrome problem.', 'Medium', 'Two Pointers'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Valid Palindrome')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT '3Sum', 'Solve the 3Sum problem.', 'Medium', 'Two Pointers'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('3Sum')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Container With Most Water', 'Solve the Container With Most Water problem.', 'Medium', 'Two Pointers'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Container With Most Water')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Best Time to Buy and Sell Stock', 'Solve the Best Time to Buy and Sell Stock problem.', 'Medium', 'Sliding Window'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Best Time to Buy and Sell Stock')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Longest Substring Without Repeating Characters', 'Solve the Longest Substring Without Repeating Characters problem.', 'Medium', 'Sliding Window'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Longest Substring Without Repeating Characters')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Longest Repeating Character Replacement', 'Solve the Longest Repeating Character Replacement problem.', 'Medium', 'Sliding Window'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Longest Repeating Character Replacement')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Minimum Window Substring', 'Solve the Minimum Window Substring problem.', 'Medium', 'Sliding Window'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Minimum Window Substring')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Valid Parentheses', 'Solve the Valid Parentheses problem.', 'Medium', 'Stack'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Valid Parentheses')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Min Stack', 'Solve the Min Stack problem.', 'Medium', 'Stack'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Min Stack')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Evaluate Reverse Polish Notation', 'Solve the Evaluate Reverse Polish Notation problem.', 'Medium', 'Stack'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Evaluate Reverse Polish Notation')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Generate Parentheses', 'Solve the Generate Parentheses problem.', 'Medium', 'Stack'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Generate Parentheses')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Daily Temperatures', 'Solve the Daily Temperatures problem.', 'Medium', 'Stack'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Daily Temperatures')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Car Fleet', 'Solve the Car Fleet problem.', 'Medium', 'Stack'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Car Fleet')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Largest Rectangle in Histogram', 'Solve the Largest Rectangle in Histogram problem.', 'Medium', 'Stack'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Largest Rectangle in Histogram')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Binary Search', 'Solve the Binary Search problem.', 'Medium', 'Binary Search'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Binary Search')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Search a 2D Matrix', 'Solve the Search a 2D Matrix problem.', 'Medium', 'Binary Search'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Search a 2D Matrix')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Koko Eating Bananas', 'Solve the Koko Eating Bananas problem.', 'Medium', 'Binary Search'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Koko Eating Bananas')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Find Minimum in Rotated Sorted Array', 'Solve the Find Minimum in Rotated Sorted Array problem.', 'Medium', 'Binary Search'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Find Minimum in Rotated Sorted Array')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Search in Rotated Sorted Array', 'Solve the Search in Rotated Sorted Array problem.', 'Medium', 'Binary Search'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Search in Rotated Sorted Array')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Median of Two Sorted Arrays', 'Solve the Median of Two Sorted Arrays problem.', 'Medium', 'Binary Search'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Median of Two Sorted Arrays')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Reverse Linked List', 'Solve the Reverse Linked List problem.', 'Medium', 'Linked List'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Reverse Linked List')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Merge Two Sorted Lists', 'Solve the Merge Two Sorted Lists problem.', 'Medium', 'Linked List'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Merge Two Sorted Lists')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Reorder List', 'Solve the Reorder List problem.', 'Medium', 'Linked List'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Reorder List')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Remove Nth Node From End of List', 'Solve the Remove Nth Node From End of List problem.', 'Medium', 'Linked List'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Remove Nth Node From End of List')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Copy List with Random Pointer', 'Solve the Copy List with Random Pointer problem.', 'Medium', 'Linked List'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Copy List with Random Pointer')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Add Two Numbers', 'Solve the Add Two Numbers problem.', 'Medium', 'Linked List'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Add Two Numbers')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Linked List Cycle', 'Solve the Linked List Cycle problem.', 'Medium', 'Linked List'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Linked List Cycle')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Find the Duplicate Number', 'Solve the Find the Duplicate Number problem.', 'Medium', 'Linked List'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Find the Duplicate Number')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'LRU Cache', 'Solve the LRU Cache problem.', 'Medium', 'Linked List'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('LRU Cache')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Merge k Sorted Lists', 'Solve the Merge k Sorted Lists problem.', 'Medium', 'Linked List'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Merge k Sorted Lists')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Reverse Nodes in k-Group', 'Solve the Reverse Nodes in k-Group problem.', 'Medium', 'Linked List'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Reverse Nodes in k-Group')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Invert Binary Tree', 'Solve the Invert Binary Tree problem.', 'Medium', 'Trees'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Invert Binary Tree')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Maximum Depth of Binary Tree', 'Solve the Maximum Depth of Binary Tree problem.', 'Medium', 'Trees'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Maximum Depth of Binary Tree')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Diameter of Binary Tree', 'Solve the Diameter of Binary Tree problem.', 'Medium', 'Trees'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Diameter of Binary Tree')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Balanced Binary Tree', 'Solve the Balanced Binary Tree problem.', 'Medium', 'Trees'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Balanced Binary Tree')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Same Tree', 'Solve the Same Tree problem.', 'Medium', 'Trees'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Same Tree')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Subtree of Another Tree', 'Solve the Subtree of Another Tree problem.', 'Medium', 'Trees'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Subtree of Another Tree')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Lowest Common Ancestor of a Binary Search Tree', 'Solve the Lowest Common Ancestor of a Binary Search Tree problem.', 'Medium', 'Trees'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Lowest Common Ancestor of a Binary Search Tree')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Binary Tree Level Order Traversal', 'Solve the Binary Tree Level Order Traversal problem.', 'Medium', 'Trees'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Binary Tree Level Order Traversal')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Validate Binary Search Tree', 'Solve the Validate Binary Search Tree problem.', 'Medium', 'Trees'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Validate Binary Search Tree')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Kth Smallest Element in a BST', 'Solve the Kth Smallest Element in a BST problem.', 'Medium', 'Trees'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Kth Smallest Element in a BST')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Construct Binary Tree from Preorder and Inorder Traversal', 'Solve the Construct Binary Tree from Preorder and Inorder Traversal problem.', 'Medium', 'Trees'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Construct Binary Tree from Preorder and Inorder Traversal')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Binary Tree Maximum Path Sum', 'Solve the Binary Tree Maximum Path Sum problem.', 'Medium', 'Trees'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Binary Tree Maximum Path Sum')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Serialize and Deserialize Binary Tree', 'Solve the Serialize and Deserialize Binary Tree problem.', 'Medium', 'Trees'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Serialize and Deserialize Binary Tree')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Number of Islands', 'Solve the Number of Islands problem.', 'Medium', 'Graphs'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Number of Islands')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Clone Graph', 'Solve the Clone Graph problem.', 'Medium', 'Graphs'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Clone Graph')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Max Area of Island', 'Solve the Max Area of Island problem.', 'Medium', 'Graphs'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Max Area of Island')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Pacific Atlantic Water Flow', 'Solve the Pacific Atlantic Water Flow problem.', 'Medium', 'Graphs'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Pacific Atlantic Water Flow')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Surrounded Regions', 'Solve the Surrounded Regions problem.', 'Medium', 'Graphs'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Surrounded Regions')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Rotting Oranges', 'Solve the Rotting Oranges problem.', 'Medium', 'Graphs'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Rotting Oranges')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Walls and Gates', 'Solve the Walls and Gates problem.', 'Medium', 'Graphs'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Walls and Gates')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Course Schedule', 'Solve the Course Schedule problem.', 'Medium', 'Graphs'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Course Schedule')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Course Schedule II', 'Solve the Course Schedule II problem.', 'Medium', 'Graphs'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Course Schedule II')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Redundant Connection', 'Solve the Redundant Connection problem.', 'Medium', 'Graphs'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Redundant Connection')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Number of Connected Components in an Undirected Graph', 'Solve the Number of Connected Components in an Undirected Graph problem.', 'Medium', 'Graphs'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Number of Connected Components in an Undirected Graph')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Graph Valid Tree', 'Solve the Graph Valid Tree problem.', 'Medium', 'Graphs'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Graph Valid Tree')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Word Ladder', 'Solve the Word Ladder problem.', 'Medium', 'Graphs'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Word Ladder')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Climbing Stairs', 'Solve the Climbing Stairs problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Climbing Stairs')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Min Cost Climbing Stairs', 'Solve the Min Cost Climbing Stairs problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Min Cost Climbing Stairs')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'House Robber', 'Solve the House Robber problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('House Robber')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'House Robber II', 'Solve the House Robber II problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('House Robber II')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Longest Palindromic Substring', 'Solve the Longest Palindromic Substring problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Longest Palindromic Substring')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Palindromic Substrings', 'Solve the Palindromic Substrings problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Palindromic Substrings')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Decode Ways', 'Solve the Decode Ways problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Decode Ways')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Coin Change', 'Solve the Coin Change problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Coin Change')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Maximum Product Subarray', 'Solve the Maximum Product Subarray problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Maximum Product Subarray')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Word Break', 'Solve the Word Break problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Word Break')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Longest Increasing Subsequence', 'Solve the Longest Increasing Subsequence problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Longest Increasing Subsequence')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Partition Equal Subset Sum', 'Solve the Partition Equal Subset Sum problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Partition Equal Subset Sum')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Unique Paths', 'Solve the Unique Paths problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Unique Paths')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Longest Common Subsequence', 'Solve the Longest Common Subsequence problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Longest Common Subsequence')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Best Time to Buy and Sell Stock with Cooldown', 'Solve the Best Time to Buy and Sell Stock with Cooldown problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Best Time to Buy and Sell Stock with Cooldown')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Coin Change II', 'Solve the Coin Change II problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Coin Change II')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Target Sum', 'Solve the Target Sum problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Target Sum')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Interleaving String', 'Solve the Interleaving String problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Interleaving String')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Longest Increasing Path in a Matrix', 'Solve the Longest Increasing Path in a Matrix problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Longest Increasing Path in a Matrix')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Distinct Subsequences', 'Solve the Distinct Subsequences problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Distinct Subsequences')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Edit Distance', 'Solve the Edit Distance problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Edit Distance')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Burst Balloons', 'Solve the Burst Balloons problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Burst Balloons')
        );
        

        INSERT INTO problems (title, description, difficulty, topic)
        SELECT 'Regular Expression Matching', 'Solve the Regular Expression Matching problem.', 'Medium', 'Dynamic Programming'
        WHERE NOT EXISTS (
            SELECT 1 FROM problems WHERE LOWER(title) = LOWER('Regular Expression Matching')
        );
        