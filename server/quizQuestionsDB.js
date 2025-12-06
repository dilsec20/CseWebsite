// Comprehensive Quiz Questions Database
// Core topics: 50 questions each
// Other topics: 10-20 high quality questions each

const quizQuestionsDatabase = {
    // Quiz 1: Operating Systems (Existing)
    os: [
        { text: 'Which of the following is NOT an Operating System?', options: ['Linux', 'Windows', 'Oracle', 'MacOS'], correct: 2 },
        { text: 'What is a process?', options: ['Program in execution', 'Compiled code', 'Data structure', 'System call'], correct: 0 },
        { text: 'Which scheduling algorithm is non-preemptive?', options: ['Round Robin', 'FCFS', 'Shortest Remaining Time', 'Priority'], correct: 1 },
        { text: 'What is thrashing in OS?', options: ['Process execution', 'Excessive paging', 'Memory allocation', 'CPU scheduling'], correct: 1 },
        { text: 'Semaphore is used for?', options: ['Synchronization', 'Scheduling', 'Memory management', 'File management'], correct: 0 },
        { text: 'What is deadlock?', options: ['Process waiting indefinitely', 'Process termination', 'CPU idle', 'Memory full'], correct: 0 },
        { text: 'Which is the fastest memory?', options: ['Cache', 'RAM', 'ROM', 'Hard Disk'], correct: 0 },
        { text: 'Page fault occurs when?', options: ['Page not in memory', 'Page corrupted', 'Page deleted', 'Page locked'], correct: 0 },
        { text: 'What is virtual memory?', options: ['Hard disk as RAM', 'Extra RAM', 'Cache memory', 'ROM'], correct: 0 },
        { text: 'Context switching is?', options: ['Switching between processes', 'Switching memory', 'Switching disk', 'Switching cache'], correct: 0 },
        { text: 'Mutex vs Semaphore?', options: ['Mutex: 1, Semaphore: many', 'Same thing', 'Mutex: many, Semaphore: 1', 'Different OS'], correct: 0 },
        { text: 'Banker algorithm is for?', options: ['Deadlock avoidance', 'Scheduling', 'Memory', 'I/O'], correct: 0 },
        { text: 'Fork() system call creates?', options: ['Child process', 'Thread', 'File', 'Pipe'], correct: 0 },
        { text: 'What is spooling?', options: ['Simultaneous Peripheral Operations Online', 'Memory technique', 'CPU technique', 'Disk technique'], correct: 0 },
        { text: 'LRU stands for?', options: ['Least Recently Used', 'Last Recently Used', 'Least Required Unit', 'Last Required Unit'], correct: 0 },
    ],

    // Quiz 2: DBMS (Existing)
    dbms: [
        { text: 'What does ACID stand for?', options: ['Atomicity, Consistency, Isolation, Durability', 'Association, Consistency, Integrity, Durability', 'Atomicity, Concurrency, Isolation, Data', 'None'], correct: 0 },
        { text: 'Which normal form eliminates transitive dependency?', options: ['1NF', '2NF', '3NF', 'BCNF'], correct: 2 },
        { text: 'Primary key can be NULL?', options: ['Yes', 'No', 'Sometimes', 'Depends on DBMS'], correct: 1 },
        { text: 'What is a foreign key?', options: ['References primary key of another table', 'Unique key', 'Candidate key', 'Alternate key'], correct: 0 },
        { text: 'SQL is a __ language', options: ['Procedural', 'Non-procedural', 'Object-oriented', 'Functional'], correct: 1 },
        { text: 'Which join returns all rows from both tables?', options: ['Inner join', 'Left join', 'Right join', 'Full outer join'], correct: 3 },
        { text: 'Index improves?', options: ['Search speed', 'Insert speed', 'Update speed', 'Delete speed'], correct: 0 },
        { text: 'What is normalization?', options: ['Reducing redundancy', 'Adding redundancy', 'Deleting data', 'Backing up'], correct: 0 },
        { text: 'UNIQUE constraint allows how many NULLs?', options: ['0', '1', 'Multiple', 'Unlimited'], correct: 2 },
        { text: 'Which is DDL command?', options: ['SELECT', 'INSERT', 'CREATE', 'UPDATE'], correct: 2 },
        { text: 'Clustered index per table?', options: ['0', '1', 'Multiple', 'Unlimited'], correct: 1 },
        { text: 'Transaction commit makes changes?', options: ['Permanent', 'Temporary', 'Pending', 'Lost'], correct: 0 },
        { text: 'View is?', options: ['Virtual table', 'Physical table', 'Index', 'Constraint'], correct: 0 },
        { text: 'CASCADE in foreign key?', options: ['Delete child when parent deleted', 'Prevent deletion', 'Update only', 'Nothing'], correct: 0 },
        { text: 'GROUP BY is used with?', options: ['Aggregate functions', 'Normal functions', 'All functions', 'No functions'], correct: 0 },
    ],

    // Quiz 3: Computer Networks Basics
    networks: [
        { text: 'OSI Model has how many layers?', options: ['5', '6', '7', '8'], correct: 2 },
        { text: 'Which layer provides end-to-end delivery?', options: ['Transport', 'Network', 'Data Link', 'Physical'], correct: 0 },
        { text: 'HTTP uses which port?', options: ['21', '25', '80', '443'], correct: 2 },
        { text: 'Which protocol is connectionless?', options: ['TCP', 'UDP', 'HTTP', 'FTP'], correct: 1 },
        { text: 'IP address is how many bits (IPv4)?', options: ['16', '32', '64', '128'], correct: 1 },
        { text: 'What is the full form of DNS?', options: ['Domain Name System', 'Data Network Service', 'Digital Network System', 'Domain Network Store'], correct: 0 },
        { text: 'Which device operates at Network Layer?', options: ['Hub', 'Switch', 'Router', 'Repeater'], correct: 2 },
        { text: 'MAC address is unique for?', options: ['Software', 'Network Interface Card', 'Processor', 'User'], correct: 1 },
        { text: 'HTTPS uses which port?', options: ['80', '443', '8080', '21'], correct: 1 },
        { text: 'Which command checks connectivity?', options: ['ping', 'check', 'connect', 'reach'], correct: 0 },
        { text: 'DHCP stands for?', options: ['Dynamic Host Configuration Protocol', 'Data Host Control Protocol', 'Dynamic Host Control Protocol', 'Data Host Configuration Protocol'], correct: 0 },
        { text: 'SMTP is used for?', options: ['File Transfer', 'Web Browsing', 'Email', 'Chat'], correct: 2 },
    ],

    // Quiz 4: OOPs (Existing)
    oops: [
        { text: 'Which is NOT a pillar of OOP?', options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Compilation'], correct: 3 },
        { text: 'Inheritance allows?', options: ['Code reuse', 'Code deletion', 'Code hiding', 'Code encryption'], correct: 0 },
        { text: 'Polymorphism means?', options: ['Many forms', 'One form', 'No form', 'Two forms'], correct: 0 },
        { text: 'Encapsulation is?', options: ['Data hiding', 'Data showing', 'Data deletion', 'Data creation'], correct: 0 },
        { text: 'Abstract class can be instantiated?', options: ['Yes', 'No', 'Sometimes', 'With keyword'], correct: 1 },
        { text: 'Interface can have?', options: ['Only method declarations', 'Method implementations', 'Variables only', 'Nothing'], correct: 0 },
        { text: 'Method overloading is?', options: ['Same name, different parameters', 'Different name, same parameters', 'Same everything', 'Different everything'], correct: 0 },
        { text: 'Method overriding requires?', options: ['Inheritance', 'Interface', 'Abstract class', 'Nothing'], correct: 0 },
        { text: 'Constructor has?', options: ['No return type', 'void return type', 'int return type', 'string return type'], correct: 0 },
        { text: 'Destructor is called when?', options: ['Object destroyed', 'Object created', 'Method called', 'Class loaded'], correct: 0 },
        { text: 'Static method can access?', options: ['Static members only', 'All members', 'Instance members', 'Nothing'], correct: 0 },
        { text: 'this keyword refers to?', options: ['Current object', 'Parent object', 'Child object', 'Static object'], correct: 0 },
        { text: 'super keyword refers to?', options: ['Parent class', 'Child class', 'Current class', 'Interface'], correct: 0 },
        { text: 'Multiple inheritance in Java?', options: ['Not supported for classes', 'Supported', 'Partially supported', 'Only for interfaces'], correct: 0 },
        { text: 'final keyword prevents?', options: ['Modification', 'Creation', 'Deletion', 'Nothing'], correct: 0 },
    ],

    // Quiz 5: Data Structures
    dataStructures: [
        { text: 'Which data structure follows LIFO?', options: ['Queue', 'Stack', 'Tree', 'Graph'], correct: 1 },
        { text: 'Which data structure follows FIFO?', options: ['Stack', 'Queue', 'Heap', 'Tree'], correct: 1 },
        { text: 'Access time in Array?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correct: 0 },
        { text: 'Search time in Binary Search Tree (average)?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correct: 2 },
        { text: 'Which data structure uses pointers?', options: ['Array', 'Linked List', 'Stack (Array based)', 'Queue (Array based)'], correct: 1 },
        { text: 'Max number of children in Binary Tree?', options: ['1', '2', '3', 'Unlimited'], correct: 1 },
        { text: 'Height of a balanced tree with n nodes?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'], correct: 1 },
        { text: 'Graph traversal algorithm?', options: ['BS', 'BFS', 'QS', 'MS'], correct: 1 },
        { text: 'Dictionary is implemented using?', options: ['Queue', 'Hash Table', 'Stack', 'List'], correct: 1 },
        { text: 'Stack overflow occurs when?', options: ['Stack is empty', 'Stack is full', 'Stack value is null', 'Stack is deleted'], correct: 1 },
    ],

    // Quiz 6: Algorithms
    algorithms: [
        { text: 'Worst case complexity of Bubble Sort?', options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(1)'], correct: 2 },
        { text: 'Best case complexity of Merge Sort?', options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(1)'], correct: 1 },
        { text: 'Binary search requires array to be?', options: ['Sorted', 'Unsorted', 'Large', 'Small'], correct: 0 },
        { text: 'Dijkstra algorithm is for?', options: ['Sorting', 'Searching', 'Shortest Path', 'MST'], correct: 2 },
        { text: 'Quick sort uses which technique?', options: ['Divine and Conquer', 'Divide and Conquer', 'Greedy', 'Dynamic Programming'], correct: 1 },
        { text: 'BFS uses which data structure?', options: ['Stack', 'Queue', 'Heap', 'Tree'], correct: 1 },
        { text: 'DFS uses which data structure?', options: ['Stack', 'Queue', 'Heap', 'Tree'], correct: 0 },
        { text: 'Example of Dynamic Programming?', options: ['Binary Search', 'Merge Sort', 'Fibonacci Series', 'Quick Sort'], correct: 2 },
        { text: 'What is Big O notation?', options: ['Best case', 'Average case', 'Worst case', 'Space only'], correct: 2 },
        { text: 'Kruskal algorithm is for?', options: ['Shortest Path', 'MST', 'Sorting', 'Searching'], correct: 1 },
    ],

    // Quiz 7: Quantitative Aptitude (Existing)
    aptitude: [
        { text: 'What is 25% of 200?', options: ['25', '50', '75', '100'], correct: 1 },
        { text: 'If 20% of x = 40, find x', options: ['100', '150', '200', '250'], correct: 2 },
        { text: '15% of 60 + 25% of 80 = ?', options: ['29', '31', '33', '35'], correct: 0 },
        { text: 'Price increased from 500 to 600. Increase%?', options: ['10%', '15%', '20%', '25%'], correct: 2 },
        { text: 'A number decreased by 20% becomes 80. Find number', options: ['96', '100', '104', '108'], correct: 1 },
        { text: 'If a:b = 2:3, find value when a=10', options: ['b=12', 'b=15', 'b=18', 'b=20'], correct: 1 },
        { text: 'Speed = 60 km/hr, Time = 3 hours. Distance?', options: ['160 km', '170 km', '180 km', '190 km'], correct: 2 },
        { text: 'Distance = 240 km, Speed = 80 km/hr. Time?', options: ['2 hrs', '2.5 hrs', '3 hrs', '3.5 hrs'], correct: 2 },
        { text: 'Convert 90 km/hr to m/s', options: ['20', '25', '30', '35'], correct: 1 },
        { text: 'SI on 1000 at 10% for 2 years?', options: ['100', '150', '200', '250'], correct: 2 },
        { text: 'CP = 500, Profit 20%. Find SP', options: ['550', '580', '600', '620'], correct: 2 },
        { text: 'SP = 900, Loss 10%. Find CP', options: ['950', '1000', '1050', '1100'], correct: 1 },
        { text: 'MP = 2000, Discount 15%. Find SP', options: ['1600', '1650', '1700', '1750'], correct: 2 },
        { text: 'Work done by A in 10 days, B in 15 days. Together?', options: ['5 days', '6 days', '7 days', '8 days'], correct: 1 },
        { text: '10 men complete work in 12 days. 15 men will take?', options: ['6 days', '7 days', '8 days', '9 days'], correct: 2 },
    ],

    // Quiz 8: Data Interpretation
    dataInterp: [
        { text: 'Pie chart shows 40% students passed. If total 200, how many passed?', options: ['40', '60', '80', '100'], correct: 2 },
        { text: 'Bar graph A=10, B=20, C=30. Average?', options: ['10', '20', '30', '40'], correct: 1 },
        { text: 'Line graph increased 100 to 150. percent increase?', options: ['25%', '33%', '50%', '100%'], correct: 2 },
        { text: 'Table: Sales 2020=50k, 2021=60k. Growth?', options: ['10k', '20k', '5k', '15k'], correct: 0 },
        { text: 'Ratio of A(40) to B(60)?', options: ['1:2', '2:3', '3:4', '4:5'], correct: 1 },
        { text: 'Pie chart total angle?', options: ['180', '270', '360', '90'], correct: 2 },
        { text: 'If 25% represents 90 degrees, 50% represents?', options: ['90', '120', '180', '270'], correct: 2 },
        { text: 'Mean of 2, 4, 6, 8, 10?', options: ['4', '5', '6', '7'], correct: 2 },
        { text: 'Median of 1, 3, 5, 7, 9?', options: ['3', '5', '7', '9'], correct: 1 },
        { text: 'Mode of 1, 2, 2, 3, 4?', options: ['1', '2', '3', '4'], correct: 1 },
    ],

    // Quiz 9: Logical Reasoning
    logicalReasoning: [
        { text: 'Find next: 2, 4, 8, 16, ?', options: ['24', '32', '30', '36'], correct: 1 },
        { text: 'Find next: A, C, E, G, ?', options: ['H', 'I', 'J', 'K'], correct: 1 },
        { text: 'PEN is to WRITE as KNIFE is to?', options: ['SHARP', 'CUT', 'METAL', 'CHEF'], correct: 1 },
        { text: 'Botany : Plants :: Entomology : ?', options: ['Birds', 'Insects', 'Snakes', 'Fish'], correct: 1 },
        { text: 'Odd one out: Square, Circle, Triangle, Cube', options: ['Square', 'Circle', 'Triangle', 'Cube'], correct: 3 },
        { text: 'If CAT = 24 (3+1+20), DOG = ?', options: ['24', '25', '26', '27'], correct: 2 },
        { text: 'Syllogism: All A are B. All B are C. Therefore?', options: ['All A are C', 'Some A are C', 'No A are C', 'None'], correct: 0 },
        { text: 'Pointing to a photo, "He is my father\'s son". Who is he?', options: ['Brother', 'Father', 'Self', 'Uncle'], correct: 2 },
        { text: 'Coding: APPLE -> BQQMF. GRAPE -> ?', options: ['HSBQF', 'HSBQG', 'HRBQF', 'HSCQF'], correct: 0 },
        { text: 'Direction: North turned 90 deg right is?', options: ['South', 'East', 'West', 'North'], correct: 1 },
    ],

    // Quiz 10: Time & Work (Existing)
    timeWork: [
        { text: 'A completes work in 10 days. 1 day work?', options: ['1/5', '1/10', '1/15', '1/20'], correct: 1 },
        { text: 'A: 8 days, B: 12 days. Together?', options: ['4.5 days', '4.8 days', '5 days', '5.2 days'], correct: 1 },
        { text: '10 men, 6 days. 15 men will take?', options: ['3 days', '4 days', '5 days', '6 days'], correct: 1 },
        { text: 'Pipe fills tank in 10 hrs. 1 hour fills?', options: ['1/5', '1/10', '1/15', '1/20'], correct: 1 },
        { text: 'A fills in 10 hrs, B empties in 15 hrs. Together?', options: ['25 hrs', '30 hrs', '35 hrs', '40 hrs'], correct: 1 },
        { text: '20 women = 30 men (work). 10 women + x men = 20 women. x?', options: ['10', '15', '20', '25'], correct: 1 },
        { text: 'A does in 5 days, B in 10 days, C in 15 days. All together?', options: ['2.5 days', '2.7 days', '3 days', '3.3 days'], correct: 1 },
        { text: 'M men finish in D days. M/2 men will take?', options: ['D days', '2D days', 'D/2 days', '3D days'], correct: 1 },
        { text: 'Work completed by A and B in 12 days. A alone in 20 days. B alone?', options: ['25 days', '30 days', '35 days', '40 days'], correct: 1 },
        { text: 'A is twice as efficient as B. A finishes in 10 days. B will take?', options: ['15 days', '18 days', '20 days', '25 days'], correct: 2 },
    ],

    // Quiz 11: Speed, Distance & Time
    speed: [
        { text: 'Speed = Distance / ?', options: ['Mass', 'Time', 'Acceleration', 'Velocity'], correct: 1 },
        { text: 'Convert 36 km/hr to m/s', options: ['5', '10', '15', '20'], correct: 1 },
        { text: 'Train 100m long crosses pole in 10s. Speed?', options: ['10 m/s', '20 m/s', '30 m/s', '40 m/s'], correct: 0 },
        { text: 'Relative speed in opposite direction?', options: ['Add', 'Subtract', 'Multiply', 'Divide'], correct: 0 },
        { text: 'Relative speed in same direction?', options: ['Add', 'Subtract', 'Multiply', 'Divide'], correct: 1 },
        { text: 'Time = 2hrs, Distance = 100km. Speed?', options: ['40', '50', '60', '70'], correct: 1 },
        { text: 'Average speed formula?', options: ['Total Dist / Total Time', 'Total Time / Total Dist', 'Speed1 + Speed2', 'None'], correct: 0 },
        { text: 'Boat downstream speed = B + S. Upstream?', options: ['B + S', 'B - S', 'S - B', 'B * S'], correct: 1 },
        { text: 'Speed doubles, Time becomes?', options: ['Double', 'Half', 'Same', 'Triple'], correct: 1 },
        { text: '1 km = ? meters', options: ['100', '1000', '10000', '10'], correct: 1 },
    ],

    // Quiz 12: Profit & Loss
    profit: [
        { text: 'Profit = ?', options: ['SP - CP', 'CP - SP', 'SP + CP', 'None'], correct: 0 },
        { text: 'Loss = ?', options: ['SP - CP', 'CP - SP', 'SP + CP', 'None'], correct: 1 },
        { text: 'Profit % formula?', options: ['(P/CP)*100', '(P/SP)*100', '(CP/P)*100', 'None'], correct: 0 },
        { text: 'CP=100, SP=120. Profit?', options: ['10', '20', '30', '40'], correct: 1 },
        { text: 'CP=100, SP=80. Loss?', options: ['10', '20', '30', '40'], correct: 1 },
        { text: 'Discount is calculated on?', options: ['CP', 'SP', 'MP', 'Profit'], correct: 2 },
        { text: 'CP=100, Profit=20%. SP?', options: ['110', '120', '130', '140'], correct: 1 },
        { text: 'SP=120, Profit=20. CP?', options: ['90', '100', '110', '140'], correct: 1 },
        { text: 'Successive discount 10% and 10% is?', options: ['20%', '19%', '18%', '21%'], correct: 1 },
        { text: 'Marked Price - Discount = ?', options: ['CP', 'SP', 'Profit', 'Loss'], correct: 1 },
    ],

    // Quiz 13: Verbal Reasoning (Existing)
    verbal: [
        { text: 'Book : Author :: Painting : ?', options: ['Gallery', 'Artist', 'Canvas', 'Museum'], correct: 1 },
        { text: 'King : Palace :: ? : Den', options: ['Lion', 'Tiger', 'Bear', 'Fox'], correct: 0 },
        { text: 'Ornithology is study of?', options: ['Birds', 'Insects', 'Rocks', 'Plants'], correct: 0 },
        { text: 'Antonym of LOQUACIOUS?', options: ['Talkative', 'Silent', 'Noisy', 'Loud'], correct: 1 },
        { text: 'Synonym of JUBILANT?', options: ['Sad', 'Happy', 'Angry', 'Afraid'], correct: 1 },
        { text: 'Which word is correctly spelled?', options: ['Occassion', 'Occasion', 'Ocasion', 'Ocassion'], correct: 1 },
        { text: 'Complete: As brave as a __', options: ['Fox', 'Lion', 'Rabbit', 'Deer'], correct: 1 },
        { text: 'Odd one out: Dog, Cat, Cow, Rose', options: ['Dog', 'Cat', 'Cow', 'Rose'], correct: 3 },
        { text: 'All roses are flowers. Some flowers are red. Therefore?', options: ['All roses are red', 'Some roses may be red', 'No roses are red', 'All flowers are red'], correct: 1 },
        { text: 'If LATE = 12, GATE = ?', options: ['10', '11', '12', '13'], correct: 0 },
    ],

    // Quiz 14: Non-Verbal Reasoning
    nonVerbal: [
        { text: 'Mirror image of "B"?', options: ['B', 'ᗺ', 'q', 'd'], correct: 1 },
        { text: 'Water image of "A"?', options: ['∀', 'V', 'A', 'D'], correct: 0 },
        { text: 'Pattern: Circle, Square, Triangle, ?', options: ['Circle', 'Line', 'Pentagon', 'Dot'], correct: 2 },
        { text: 'Dice: Opposite of 1 is 6. Opposite of 2?', options: ['3', '4', '5', '6'], correct: 2 },
        { text: 'Clock angle at 3:00?', options: ['45', '90', '180', '360'], correct: 1 },
        { text: 'Number of triangles in a square with diagonals?', options: ['4', '6', '8', '10'], correct: 2 },
        { text: 'Paper fold: Left to Right. Hole in center. Open?', options: ['1 Hole', '2 Holes', '3 Holes', '4 Holes'], correct: 1 },
        { text: 'Rotation: 90 deg clockwise. Up becomes?', options: ['Down', 'Left', 'Right', 'Up'], correct: 2 },
        { text: 'Odd figure out: [All lines] vs [One Curve]', options: ['Lines', 'Curve', 'Both', 'None'], correct: 1 },
        { text: 'Series: 1 line, 2 lines, 3 lines, ?', options: ['Square', '4 lines', 'Triangle', 'Circle'], correct: 1 },
    ],

    // Quiz 15: Critical Thinking
    critical: [
        { text: 'Statement: "It is raining". Assumption?', options: ['Ground is wet', 'It is summer', 'It is night', 'Sky is blue'], correct: 0 },
        { text: 'Cause: "No rain". Effect?', options: ['Flood', 'Drought', 'Snow', 'Wind'], correct: 1 },
        { text: 'Argument: "We should save trees". Strong argument?', options: ['Yes, for oxygen', 'No, need wood', 'Yes, they look good', 'No, too many trees'], correct: 0 },
        { text: 'Inference: "John smiles only when happy". John is smiling.', options: ['John is happy', 'John is sad', 'John is angry', 'Unknown'], correct: 0 },
        { text: 'Premise: All men are mortal. Socrates is a man.', options: ['Socrates is mortal', 'Socrates is immortal', 'Socrates is a god', 'Unknown'], correct: 0 },
        { text: 'Fact vs Opinion: "It is 20 degrees".', options: ['Fact', 'Opinion', 'Belief', 'Rumor'], correct: 0 },
        { text: 'Fact vs Opinion: "It is cold".', options: ['Fact', 'Opinion', 'Truth', 'Lie'], correct: 1 },
        { text: 'Fallacy: "Everyone does it, so it is right".', options: ['Ad Hominem', 'Bandwagon', 'Strawman', 'Slippery Slope'], correct: 1 },
        { text: 'Decision: High risk, High reward. Do it?', options: ['Always', 'Never', 'Analyze first', 'Flip coin'], correct: 2 },
        { text: 'Problem: Car wont start. First check?', options: ['Engine', 'Fuel/Battery', 'Tires', 'Paint'], correct: 1 },
    ],

    // Quiz 16: Coding-Decoding
    coding: [
        { text: 'A=1, B=2. C=?', options: ['2', '3', '4', '5'], correct: 1 },
        { text: 'APPLE = 5. BANANA = ?', options: ['5', '6', '7', '8'], correct: 1 },
        { text: 'A -> Z, B -> Y. C -> ?', options: ['W', 'X', 'Y', 'Z'], correct: 1 },
        { text: 'HELLO = IFMMP (Next char). WORLD = ?', options: ['XPSME', 'XPSMF', 'YPTME', 'XPTME'], correct: 0 },
        { text: 'Reverse: ABC -> CBA. XYZ -> ?', options: ['YZX', 'ZYX', 'ZXY', 'YXZ'], correct: 1 },
        { text: 'BAT = 2-1-20. CAT = ?', options: ['3-1-20', '2-1-20', '3-1-19', '3-2-20'], correct: 0 },
        { text: 'Binary 101 = ?', options: ['4', '5', '6', '7'], correct: 1 },
        { text: 'Hex F = ?', options: ['14', '15', '16', '10'], correct: 1 },
        { text: 'ASCII of A?', options: ['64', '65', '66', '97'], correct: 1 },
        { text: 'ASCII of a?', options: ['96', '97', '98', '65'], correct: 1 },
    ],

    // Quiz 17: Blood Relations
    bloodRelations: [
        { text: 'Father\'s wife is?', options: ['Aunt', 'Mother', 'Sister', 'Grandma'], correct: 1 },
        { text: 'Brother\'s father is?', options: ['Uncle', 'Grandpa', 'Father', 'Brother'], correct: 2 },
        { text: 'Mother\'s brother is?', options: ['Uncle', 'Father', 'Grandpa', 'Cousin'], correct: 0 },
        { text: 'Sister\'s husband is?', options: ['Brother', 'Brother-in-law', 'Uncle', 'Cousin'], correct: 1 },
        { text: 'Son\'s daughter is?', options: ['Niece', 'Granddaughter', 'Sister', 'Aunt'], correct: 1 },
        { text: 'P is brother of Q. Q is sister of R. P related to R?', options: ['Brother', 'Sister', 'Father', 'Uncle'], correct: 0 },
        { text: 'Pointing to man, woman said "He is the son of my father".', options: ['Brother', 'Husband', 'Father', 'Uncle'], correct: 0 },
        { text: 'Father\'s father\'s son (only one) is?', options: ['Uncle', 'Father', 'Grandpa', 'Brother'], correct: 1 },
        { text: 'Wife\'s mother is?', options: ['Mother', 'Mother-in-law', 'Aunt', 'Grandma'], correct: 1 },
        { text: 'Uncle\'s daughter is?', options: ['Sister', 'Cousin', 'Niece', 'Aunt'], correct: 1 },
    ],

    // Quiz 18: Series
    series: [
        { text: '1, 2, 3, 4, ?', options: ['5', '6', '7', '8'], correct: 0 },
        { text: '2, 4, 6, 8, ?', options: ['9', '10', '11', '12'], correct: 1 },
        { text: '1, 3, 5, 7, ?', options: ['8', '9', '10', '11'], correct: 1 },
        { text: '1, 4, 9, 16, ?', options: ['20', '24', '25', '36'], correct: 2 },
        { text: '10, 20, 30, ?', options: ['40', '50', '35', '45'], correct: 0 },
        { text: '5, 10, 20, 40, ?', options: ['60', '70', '80', '100'], correct: 2 },
        { text: '100, 90, 80, ?', options: ['70', '60', '50', '40'], correct: 0 },
        { text: 'A, B, C, ?', options: ['D', 'E', 'F', 'G'], correct: 0 },
        { text: 'Z, Y, X, ?', options: ['W', 'V', 'U', 'T'], correct: 0 },
        { text: '1, 1, 2, 3, 5, ?', options: ['7', '8', '9', '6'], correct: 1 },
    ]
};

module.exports = quizQuestionsDatabase;
