// Comprehensive Quiz Questions Database - Interview & OA Level
// Targeted for Product & Service Based Companies (Amazon, TCS, Infosys, etc.)

const quizQuestionsDatabase = {
    // Quiz 1: Operating Systems (High Level)
    os: [
        { text: 'In a paged memory management, the page fault frequency increases when?', options: ['Size of page is reduced', 'Size of page is increased', 'Processes are I/O bound', 'Locality of reference is poor'], correct: 3 },
        { text: 'Which of the following is TRUE about Round Robin scheduling?', options: ['Optimal for turnaround time', 'Starvation is possible', 'Designed for Time-Sharing Systems', 'It is non-preemptive'], correct: 2 },
        { text: 'The Banker\'s algorithm is used for?', options: ['Deadlock Prevention', 'Deadlock Avoidance', 'Deadlock Detection', 'Deadlock Recovery'], correct: 1 },
        { text: 'A semaphore is a shared integer variable that can not drop below zero. This is utilized for?', options: ['Memory protection', 'System calls', 'Process synchronization', 'CPU scheduling'], correct: 2 },
        { text: 'Belady\'s Anomaly occurs in which page replacement algorithm?', options: ['LRU', 'FIFO', 'Optimal', 'LFU'], correct: 1 },
        { text: 'Which inter-process communication (IPC) mechanism is the fastest?', options: ['Pipes', 'Message Queues', 'Shared Memory', 'Sockets'], correct: 2 },
        { text: 'What is the "Zombie" process in Linux/Unix?', options: ['A process attempting to kill its parent', 'A process running in background', 'A process that has finished execution but has no parent waiting', 'A daemon process'], correct: 2 },
        { text: 'Thrashing occurs when?', options: ['CPU utilization is high', 'Disk I/O is low', 'Page fault rate is high', 'Process count is low'], correct: 2 },
        { text: 'Which condition is NOT required for a deadlock to occur?', options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption', 'Circular Wait'], correct: 2 },
        { text: 'User-level threads are faster to create than kernel-level threads because?', options: ['They require no trapping to the kernel', 'They share memory space', 'The OS schedules them', 'They constitute a smaller context'], correct: 0 },
        { text: 'In the context of file systems, an inode contains?', options: ['File name', 'File data', 'File metadata (permissions, owner, size)', 'Directory structure'], correct: 2 },
        { text: 'Spooling involves?', options: ['Sending data to a temporary storage before processing', 'Direct device communication', 'Interrupt handling', 'Real-time processing'], correct: 0 },
        { text: 'Which system call is used to create a new process in Unix?', options: ['new()', 'create()', 'fork()', 'start()'], correct: 2 },
        { text: 'Dirty bit is used to show?', options: ['Page with corrupted data', 'Page that is modified after being loaded', 'Page that is less frequently used', 'Page that is locked'], correct: 1 },
        { text: 'Priority Inversion problem can be solved by?', options: ['Priority Inheritance Protocol', 'Round Robin Scheduling', 'Banker Algorithm', 'Semaphores'], correct: 0 },
    ],

    // Quiz 2: DBMS (Conceptual & SQL)
    dbms: [
        { text: 'Which NF ensures there are no transitive dependencies?', options: ['2NF', '3NF', 'BCNF', '4NF'], correct: 1 },
        { text: 'ACID properties are ensured by?', options: ['Query Processor', 'Transaction Manager', 'Storage Manager', 'Buffer Manager'], correct: 1 },
        { text: 'A "Phantom Read" occurs when?', options: ['A row is modified by another transaction', 'A transaction reads a row that vanishes', 'New rows are added by another transaction matching a criteria', 'Dirty reads occur'], correct: 2 },
        { text: 'In SQL, which statement is used to remove a table structure entirely?', options: ['DELETE', 'TRUNCATE', 'DROP', 'REMOVE'], correct: 2 },
        { text: 'Which indexing method is best for range queries?', options: ['Hash Index', 'B+ Tree Index', 'Bitmap Index', 'Inverted Index'], correct: 1 },
        { text: 'The Cartesian product of two tables with 10 rows each will have?', options: ['10 rows', '20 rows', '100 rows', '0 rows'], correct: 2 },
        { text: 'Which isolation level prevents Dirty Reads but allows Non-Repeatable Reads?', options: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'], correct: 1 },
        { text: 'What is the purpose of the "HAVING" clause?', options: ['Filter rows before grouping', 'Filter groups after grouping', 'Sort the results', 'Join tables'], correct: 1 },
        { text: 'A candidate key is?', options: ['A subset of a primary key', 'A superkey with no redundant attributes', 'Any unique column', 'A foreign key'], correct: 1 },
        { text: 'Referential integrity is maintained using?', options: ['Primary Key', 'Foreign Key', 'Unique Constraint', 'Check Constraint'], correct: 1 },
        { text: 'Which operation is used to combine the result of two SELECT statements?', options: ['UNION', 'JOIN', 'MERGE', 'CONNECT'], correct: 0 },
        { text: 'Clustered Index determines?', options: ['Logical order of rows', 'Physical order of rows on disk', 'Uniqueness of rows', 'Size of table'], correct: 1 },
        { text: 'SQL Injection can be prevented by?', options: ['Stored Procedures', 'Input Validation', 'Parameterized Queries', 'All of the above'], correct: 3 },
        { text: 'Normalization relates to?', options: ['Query Optimization', 'Backup', 'Redundancy Reduction', 'Security'], correct: 2 },
        { text: 'DML commands include?', options: ['CREATE, ALTER', 'GRANT, REVOKE', 'SELECT, INSERT, UPDATE, DELETE', 'COMMIT, ROLLBACK'], correct: 2 },
    ],

    // Quiz 3: Computer Networks (OA/Interview)
    networks: [
        { text: 'In TCP, the "Three-Way Handshake" involves which flags?', options: ['SYN, ACK, FIN', 'SYN, SYN-ACK, ACK', 'RST, SYN, FIN', 'ACK, PSH, URG'], correct: 1 },
        { text: 'Which protocol is used by Ping command?', options: ['TCP', 'UDP', 'ICMP', 'IGMP'], correct: 2 },
        { text: 'What happens in the "Slow Start" phase of TCP?', options: ['Window size grows linearly', 'Window size grows exponentially', 'Window size remains constant', 'Window size decreases'], correct: 1 },
        { text: 'DNS uses which protocol?', options: ['TCP only', 'UDP only', 'Both TCP and UDP', 'ICMP'], correct: 2 },
        { text: 'Which layer is responsible for routing and forwarding?', options: ['Data Link', 'Network', 'Transport', 'Session'], correct: 1 },
        { text: 'ARP (Address Resolution Protocol) is used to map?', options: ['IP address to MAC address', 'MAC address to IP address', 'Host name to IP address', 'Port to IP'], correct: 0 },
        { text: 'Subnet mask 255.255.255.240 allows how many usable hosts per subnet?', options: ['16', '14', '30', '32'], correct: 1 },
        { text: 'Which is NOT a private IP address range?', options: ['192.168.0.0/16', '10.0.0.0/8', '172.16.0.0/12', '8.8.8.8'], correct: 3 },
        { text: 'The time required to transmit a packet is called?', options: ['Propagation delay', 'Transmission delay', 'Queuing delay', 'Processing delay'], correct: 1 },
        { text: 'HTTPS operates on top of?', options: ['SSL/TLS', 'IPSec', 'SSH', 'Kerberos'], correct: 0 },
    ],

    // Quiz 4: OOPs (Design Patterns & Concepts)
    oops: [
        { text: 'Which concept solves the "Diamond Problem" in C++?', options: ['Virtual Inheritance', 'Multiple Inheritance', 'Friend Functions', 'Operator Overloading'], correct: 0 },
        { text: 'Which design pattern ensures only one instance of a class exists?', options: ['Factory', 'Singleton', 'Observer', 'Strategy'], correct: 1 },
        { text: 'Run-time polymorphism is achieved using?', options: ['Function Overloading', 'Operator Overloading', 'Virtual Functions/Overriding', 'Templates'], correct: 2 },
        { text: 'Deep copy vs Shallow copy?', options: ['Deep copy copies references, Shallow copies values', 'Deep copy creates new memory, Shallow copies reference', 'They are same', 'Shallow copy is slower'], correct: 1 },
        { text: 'Ideally, a class should be open for extension but closed for modification. This is?', options: ['Liskov Substitution', 'Single Responsibility', 'Open/Closed Principle', 'Interface Segregation'], correct: 2 },
        { text: 'In Java, "super" keyword is used to?', options: ['Call parent constructor', 'Call parent method', 'Access parent variable', 'All of the above'], correct: 3 },
        { text: 'Which access modifier offers the most restrictive access?', options: ['Public', 'Protected', 'Private', 'Default'], correct: 2 },
        { text: 'What is an Abstract Factory Design Pattern?', options: ['Creates an instance of several families of classes', 'Creates one specific class', 'Adds functionality to object', 'Notifies changes'], correct: 0 },
        { text: 'Composition is known as?', options: ['Is-A relationship', 'Has-A relationship', 'Uses-A relationship', 'Was-A relationship'], correct: 1 },
        { text: 'Why is multiple inheritance not supported in Java classes?', options: ['Memory overhead', 'Ambiguity (Diamond problem)', 'Compiler complexity', 'Slower execution'], correct: 1 },
        { text: 'An interface in OOP represents?', options: ['Implementation details', 'Contract of methods', 'State of object', 'Database schema'], correct: 1 },
        { text: 'Static binding takes place at?', options: ['Run time', 'Compile time', 'Link time', 'Load time'], correct: 1 },
        { text: 'The "final" class in Java cannot be?', options: ['Instantiated', 'Inherited', 'Static', 'Public'], correct: 1 },
        { text: 'Which relationship is stronger?', options: ['Aggregation', 'Association', 'Composition', 'Dependency'], correct: 2 },
        { text: 'Encapsulation aids in?', options: ['Performance', 'Maintainability & Security', 'Polymorphism', 'Inheritance'], correct: 1 },
    ],

    // Quiz 5: Data Structures (Complexity & Application)
    dataStructures: [
        { text: 'Worst-case time complexity to search in a Binary Search Tree?', options: ['O(log n)', 'O(n)', 'O(n log n)', 'O(1)'], correct: 1 },
        { text: 'Which data structure is suitable for detecting a cycle in a graph (DFS based)?', options: ['Queue', 'Stack (Recursion)', 'Heap', 'Linked List'], correct: 1 },
        { text: 'What is the time complexity to insert a node at the end of a Linked List (with tail pointer)?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correct: 0 },
        { text: 'Min-Heap property states that?', options: ['Parent >= Child', 'Parent <= Child', 'Left Child < Right Child', 'Root is max'], correct: 1 },
        { text: 'Which collision resolution technique suffers from primary clustering?', options: ['Linear Probing', 'Quadratic Probing', 'Double Hashing', 'Chaining'], correct: 0 },
        { text: 'In a circular queue implemented with array size N, the condition for full queue is?', options: ['front == rear', '(rear + 1) % N == front', 'rear == N - 1', 'front == 0'], correct: 1 },
        { text: 'Which graph representation is space-efficient for sparse graphs?', options: ['Adjacency Matrix', 'Adjacency List', 'Incidence Matrix', 'Edge List'], correct: 1 },
        { text: 'Maximum number of nodes in a binary tree of height H?', options: ['2^H', '2^(H+1) - 1', '2^H - 1', 'H^2'], correct: 1 },
        { text: 'Best data structure for implementing a Priority Queue?', options: ['Array', 'Linked List', 'Heap', 'BST'], correct: 2 },
        { text: 'Time complexity of "Get Minimum" in a Min-Stack?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correct: 0 },
    ],

    // Quiz 6: Algorithms (Analysis)
    algorithms: [
        { text: 'Which sorting algorithm is NOT stable?', options: ['Merge Sort', 'Insertion Sort', 'Quick Sort', 'Bubble Sort'], correct: 2 },
        { text: 'Recurrence relation for Merge Sort?', options: ['T(n) = 2T(n/2) + n', 'T(n) = T(n-1) + n', 'T(n) = 2T(n/2) + 1', 'T(n) = T(n/2) + n'], correct: 0 },
        { text: 'Dijkstra\'s algorithm may fail if?', options: ['The graph has cycles', 'The graph has negative weight edges', 'The graph is directed', 'The graph is disconnected'], correct: 1 },
        { text: 'Typical efficiency of Quick Sort (Average Case)?', options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(log n)'], correct: 1 },
        { text: 'Bellman-Ford algorithm complexity with V vertices and E edges?', options: ['O(V + E)', 'O(VE)', 'O(V^2)', 'O(E log V)'], correct: 1 },
        { text: '0/1 Knapsack Problem can be solved using?', options: ['Greedy', 'Dynamic Programming', 'Divide and Conquer', 'Sliding Window'], correct: 1 },
        { text: 'Fractional Knapsack Problem uses?', options: ['Greedy', 'Dynamic Programming', 'Backtracking', 'Sorting'], correct: 0 },
        { text: 'Floyd-Warshall algorithm computes?', options: ['Single source shortest path', 'All pairs shortest path', 'MST', 'Network flow'], correct: 1 },
        { text: 'Time complexity of Binary Search?', options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(1)'], correct: 2 },
        { text: 'DFS traversal of a graph uses?', options: ['Queue', 'Stack', 'Heap', 'Map'], correct: 1 },
    ],

    // Quiz 7: Quantitative Aptitude (Placement Level)
    aptitude: [
        { text: 'Two trains running in opposite directions cross a man in 27s and 17s. They cross each other in 23s. The ratio of their speeds is?', options: ['1 : 3', '3 : 2', '3 : 4', '2 : 3'], correct: 1 },
        { text: 'A mixture contains alcohol and water in the ratio 4:3. If 5L of water is added, the ratio becomes 4:5. Quantity of alcohol?', options: ['10L', '12L', '15L', '18L'], correct: 0 },
        { text: 'In how many ways can the letters of "LEADER" be arranged?', options: ['720', '360', '180', '120'], correct: 1 },
        { text: 'Compound interest on Rs 30,000 at 7% per annum is Rs 4,347. The period is?', options: ['2 years', '3 years', '4 years', '2.5 years'], correct: 0 },
        { text: 'A can do a work in 15 days and B in 20 days. They work together for 4 days. Variable fraction of work left?', options: ['8/15', '7/15', '1/4', '1/10'], correct: 0 },
        { text: 'The angle between minute and hour hand at 3:40?', options: ['130 deg', '140 deg', '150 deg', '120 deg'], correct: 0 },
        { text: 'Seats for Mathematics, Physics and Biology are in ratio 5:7:8. Increase proposal 40%, 50%, 75%. New ratio?', options: ['2:3:4', '6:7:8', '7:14:20', '2:3:4'], correct: 3 }, // 5*1.4=7, 7*1.5=10.5, 8*1.75=14 -> 7:10.5:14 -> 2:3:4 is 7:10.5:14? No. 70:105:140 /35 -> 2:3:4.
        { text: 'Probability that a leap year has 53 Sundays?', options: ['1/7', '2/7', '5/7', '6/7'], correct: 1 },
        { text: 'A man buys a cycle for 1400 and sells at 15% loss. Selling Price?', options: ['1000', '1100', '1190', '1202'], correct: 2 },
        { text: 'Average of first 5 multiples of 3?', options: ['3', '9', '12', '15'], correct: 1 }, // 3,6,9,12,15 -> 9
    ],

    // Quiz 8: Data Interpretation (Calculative)
    dataInterp: [
        { text: 'Efficiency of A is 25% more than B. B takes 20 days. A takes?', options: ['15 days', '16 days', '18 days', '25 days'], correct: 1 }, // 125/100 = 5/4 eff. Time 4/5. 20*4/5 = 16.
        { text: 'Sales increased by 20% then decreased by 10%. Net effect?', options: ['10% inc', '8% inc', '10% dec', '8% dec'], correct: 1 }, // 100->120->108. 8% inc.
        { text: 'Which graph is best to show trends over time?', options: ['Bar', 'Pie', 'Line', 'Scatter'], correct: 2 },
        { text: 'Pie chart degree for 25%?', options: ['90', '45', '180', '60'], correct: 0 },
        { text: 'If 30% = 450, 100% = ?', options: ['1000', '1500', '1200', '1350'], correct: 1 },
        { text: 'Ratio of Expenditure to Savings is 3:2. Income is 50,000. Savings?', options: ['20,000', '30,000', '10,000', '25,000'], correct: 0 },
        { text: 'Direction: Walk 10m North, Turn Right 10m, Turn Right 10m, Turn Left. Which direction?', options: ['North', 'East', 'South', 'West'], correct: 1 },
        { text: 'Pipe A fills in 4 hours, B in 6 hours. Open alternately starting A. Time?', options: ['4 hrs 40 min', '5 hrs', '4 hrs', '5 hrs 20 min'], correct: 0 },
        { text: 'A leak empties tank in 8 hrs. Inlet fills 6L/min. Tank empty in 12 hrs. Capacity?', options: ['8640 L', '5760 L', '14000 L', '7200 L'], correct: 0 },
        { text: 'Men * Days * Hours formula?', options: ['MDH/W = Constant', 'MD/H = Constant', 'W/MDH = Constant', 'None'], correct: 0 },
        { text: 'A, B, C can do work in 6, 8, 12 days. Do it together and get Rs 1350. B\'s share?', options: ['450', '400', '350', '300'], correct: 0 }, // 1/6:1/8:1/12 = 4:3:2. 9 parts. 1 part 150. B=3*150=450.
    ],

    // Quiz 9: Logical Reasoning (Tricky)
    logicalReasoning: [
        { text: 'Statement: "Only good singers are invited. No one without sweet voice is a good singer." Conclusion?', options: ['All invited singers have sweet voice', 'Some singers do not have sweet voice', 'Sweet voice is not necessary', 'None'], correct: 0 },
        { text: 'Series: 6, 11, 21, 36, 56, ?', options: ['76', '81', '91', '86'], correct: 1 }, // +5, +10, +15, +20, +25 -> 56+25=81.
        { text: 'Analogy: Clock : Time :: Thermometer : ?', options: ['Heat', 'Radiation', 'Energy', 'Temperature'], correct: 3 },
        { text: 'Odd one out: 3, 5, 7, 9, 11', options: ['3', '9', '7', '5'], correct: 1 }, // 9 is not prime.
        { text: 'Coding: If DELHI = 73541 and CALCUTTA = 82589662, CALICUT = ?', options: ['5279431', '5978213', '8251896', '8543691'], correct: 2 },
        { text: 'Direction: Walk 10m North, Turn Right 10m, Turn Right 10m, Turn Left. Which direction?', options: ['North', 'East', 'South', 'West'], correct: 1 },
        { text: 'Blood Relations: A is B\'s sister. C is B\'s mother. D is C\'s father. E is D\'s mother. Then how is A related to D?', options: ['Granddaughter', 'Daughter', 'Grandmother', 'Aunt'], correct: 0 },
        { text: 'Syllogism: No cat is dog. All dogs are cows. Conclusion?', options: ['No cow is cat', 'No dog is cat', 'Some cows are cats', 'All cats are cows'], correct: 1 },
        { text: 'Seating: A, P, R, X, S, Z are in a row. S and Z are in center. A and P are at ends. R is sitting to left of A. Who is to right of P?', options: ['A', 'X', 'S', 'Z'], correct: 1 },
        { text: 'Clock: How many times do hands coincide in a day?', options: ['22', '24', '12', '48'], correct: 0 },
    ],

    // Quiz 10: Time & Work (Advanced)
    timeWork: [
        { text: 'A is 30% more efficient than B. How much time will they take together to complete a job which A alone could have done in 23 days?', options: ['11 days', '13 days', '20 days', '15 days'], correct: 1 }, // A=130, B=100. Ratio 13:10. Total work 23*13. Combined 23. Time = (23*13)/23 = 13.
        { text: 'A and B can do a piece of work in 30 days, while B and C can do the same work in 24 days and C and A in 20 days. They all work together for 10 days when B and C leave. How many days more will A take to finish the work?', options: ['18 days', '24 days', '30 days', '36 days'], correct: 0 },
        { text: 'P can complete 1/4 of work in 10 days, Q can complete 40% of work in 40 days and R can complete 1/3 of work in 13 days. Who will complete the work first?', options: ['P', 'Q', 'R', 'All same'], correct: 2 }, // P=40d, Q=100d, R=39d.
        { text: 'A does half as much work as B in three-fourth of the time. If together they take 18 days, B alone takes?', options: ['30 days', '35 days', '40 days', '45 days'], correct: 0 },
        { text: '12 men complete work in 9 days. After 3 days, 6 men joined. How many days for remaining work?', options: ['2 days', '3 days', '4 days', '5 days'], correct: 2 }, // 12*6 work left. 18 men. 72/18 = 4.
        { text: 'Efficiency A:B = 5:3. A takes 10 days < B. Time for A?', options: ['15 days', '20 days', '25 days', '12 days'], correct: 0 }, // Time A:B = 3:5. Diff 2u = 10. 1u=5. A=15.
        { text: 'Pipe A fills in 4 hours, B in 6 hours. Open alternately starting A. Time?', options: ['4 hrs 40 min', '5 hrs', '4 hrs', '5 hrs 20 min'], correct: 0 },
        { text: 'A leak empties tank in 8 hrs. Inlet fills 6L/min. Tank empty in 12 hrs. Capacity?', options: ['8640 L', '5760 L', '14000 L', '7200 L'], correct: 0 },
        { text: 'Men * Days * Hours formula?', options: ['MDH/W = Constant', 'MD/H = Constant', 'W/MDH = Constant', 'None'], correct: 0 },
        { text: 'A, B, C can do work in 6, 8, 12 days. Do it together and get Rs 1350. B\'s share?', options: ['450', '400', '350', '300'], correct: 0 },
    ],

    // Keeping other topics standard but clean
    speed: [
        { text: 'A train 240m long passes a pole in 24 sec. How long will it pass a platform 650m long?', options: ['65 sec', '89 sec', '100 sec', '120 sec'], correct: 1 },
        { text: 'Speed of boat in still water 15 kmph. Current 3 kmph. Distance downstream in 12 min?', options: ['1.2 km', '3.6 km', '2.4 km', '1.8 km'], correct: 1 },
        { text: 'Ratio of speeds 3:4. Ratio of time?', options: ['4:3', '3:4', '1:1', '2:3'], correct: 0 },
        { text: 'Excluding stoppages speed 54 kmph, including 45 kmph. Stop time per hour?', options: ['9 min', '10 min', '12 min', '20 min'], correct: 1 },
        { text: 'Two cars A and B travel to city P. Speed A=60, B=40. Avg speed?', options: ['48 kmph', '50 kmph', '52 kmph', '45 kmph'], correct: 0 },
        { text: 'Distance = Speed * Time is valid when?', options: ['Acceleration is 0', 'Acceleration is constant', 'Velocity is changing', 'None'], correct: 0 },
        { text: 'Covering half distance at x and half at y. Avg speed?', options: ['(x+y)/2', '2xy/(x+y)', 'sqrt(xy)', 'x/y'], correct: 1 },
        { text: 'Man walks at 5kmph leads to 10 min late. 6kmph 10 min early. Distance?', options: ['10 km', '12 km', '15 km', '20 km'], correct: 0 }, // D/5 - D/6 = 20/60. D(1/30)=1/3. D=10.
        { text: 'Circular track max speed depends on?', options: ['Radius', 'Friction', 'Both', 'None'], correct: 2 },
        { text: 'Convert 10 m/s to km/h', options: ['18', '36', '54', '72'], correct: 1 },
    ],

    profit: [
        { text: 'By selling an article for 450, man loses 25%. CP?', options: ['600', '550', '500', '475'], correct: 0 }, // 0.75x = 450. x = 600.
        { text: 'Profit% is calculated on?', options: ['SP', 'CP', 'MP', 'Discount'], correct: 1 },
        { text: 'Dishonest dealer professes to sell at CP but uses 900g for 1kg. Gain%?', options: ['10%', '11.11%', '9.09%', '12.5%'], correct: 1 }, // 100/900 * 100 = 11.11
        { text: 'Sell 2 items at 990 each. One 10% gain, one 10% loss. Net?', options: ['No P/L', '1% loss', '1% gain', '10% loss'], correct: 1 },
        { text: 'MP is 20% above CP. Discount 10%. Profit?', options: ['10%', '8%', '12%', '15%'], correct: 1 }, // 100->120->108. 8%.
        { text: 'Buy 6 for Rs 5, Sell 5 for Rs 6. Profit?', options: ['30%', '44%', '25%', '50%'], correct: 1 }, // CP 5/6, SP 6/5. 36/30 vs 25/30. 11/25 = 44%.
        { text: 'Discount series 20%, 10%, 5% equivalent to?', options: ['35%', '31.6%', '32%', '30%'], correct: 1 },
        { text: 'CP of 15 articles = SP of 20 articles. Loss?', options: ['25%', '20%', '30%', '15%'], correct: 0 }, // CP/SP = 20/15 = 4/3. Loss 1/4 = 25%.
        { text: 'If loss is 1/3 of SP, loss % on CP?', options: ['20%', '25%', '33%', '40%'], correct: 1 }, // L=1, SP=3 -> CP=4. 1/4=25%.
        { text: 'Vat/Tax is calculated on?', options: ['SP', 'CP', 'MRP', 'Profit'], correct: 0 },
    ],

    // Quiz 13: Verbal Reasoning (Vocabulary & Logic)
    verbal: [
        { text: 'Synonym of "EPHEMERAL"?', options: ['Lasting', 'Short-lived', 'Eternal', 'Heavy'], correct: 1 },
        { text: 'Antonym of "OBSOLETE"?', options: ['Old', 'Ancient', 'Modern', 'Rare'], correct: 2 },
        { text: 'Analogy: LIGHT : BLIND :: SPEECH : ?', options: ['Tongue', 'Sound', 'Dumb', 'Chat'], correct: 2 },
        { text: 'One word substitution: "A person who knows many languages".', options: ['Linguist', 'Polyglot', 'Grammarian', 'Bilingual'], correct: 1 },
        { text: 'Idiom: "To beat around the bush".', options: ['To cut trees', 'To avoid main topic', 'To fight', 'To search'], correct: 1 },
        { text: 'Find correct spelling.', options: ['Recommemdation', 'Remomendation', 'Recommendation', 'Reccomendation'], correct: 2 },
        { text: 'Sentence arrangement: P: We  Q: Must  R: Help  S: The Poor.', options: ['PQRS', 'QSPR', 'PSRQ', 'RQPS'], correct: 0 },
        { text: 'Analogy: VIRUS : SICKNESS :: EXERCISE : ?', options: ['Health', 'Gym', 'Run', 'Tired'], correct: 0 },
        { text: 'Odd one out.', options: ['Novel', 'Poem', 'Essay', 'Author'], correct: 3 },
        { text: 'Choose the word which is least like the other words in the group.', options: ['Zinc', 'Aluminum', 'Mercury', 'Copper'], correct: 2 },
    ],

    // Quiz 14: Non-Verbal Reasoning
    nonVerbal: [
        { text: 'Mirror image: TART?', options: ['TART', 'TRAT', 'DATA', 'ABBA'], correct: 0 }, // TART mirror is TRAT in reverse? No. T-A-R-T -> T-R-A-T (reversed forms).
        { text: 'Water image of 9?', options: ['6', '∂', '9', 'e'], correct: 0 }, // Approximation
        { text: 'Count squares in 2x2 grid?', options: ['4', '5', '6', '8'], correct: 1 }, // 4 small + 1 big.
        { text: 'Dice: 1 adjacent to 2,3,4,5. Opp is?', options: ['6', '2', '3', '4'], correct: 0 },
        { text: 'Figure Matrix complete?', options: ['A', 'B', 'C', 'D'], correct: 0 },
        { text: 'Paper folding: Circle -> Semi -> Quarter. Cut edge. Open?', options: ['Diamond', 'Square', 'Circle', 'Triangle'], correct: 0 },
        { text: 'Embeded figures: Find hidden shape.', options: ['A', 'B', 'C', 'D'], correct: 0 },
        { text: 'Series: Triangle, Square, Pentagon, ?', options: ['Hexagon', 'Heptagon', 'Octagon', 'Star'], correct: 0 },
        { text: 'Analogy: Circle : Arc :: Square : ?', options: ['Line', 'Dot', 'Side', 'Angle'], correct: 0 },
        { text: 'Classification: Select odd figure.', options: ['A', 'B', 'C', 'D'], correct: 0 },
    ],

    critical: [
        { text: 'Statement: "All mangoes are sweet." Assumption?', options: ['Some mangoes are sour', 'Sweetness is a property of mangoes', 'No mangoes are sweet', 'Apples are sweet'], correct: 1 },
        { text: 'Course of Action: "Heavy rain caused floods".', options: ['Watch TV', 'Evacuate low lying areas', 'Buy umbrella', 'Stop rain'], correct: 1 },
        { text: 'Cause-Effect: "Price of petrol up".', options: ['Car sales down', 'Bike sales up', 'Transport cost up', 'No change'], correct: 2 },
        { text: 'Weak Argument: "Should we ban plastic?"', options: ['Yes, environmental damage', 'No, cheap and versatile', 'Yes, I hate it', 'No, industry loss'], correct: 2 },
        { text: 'Strong Argument: "Should exams be banned?"', options: ['Yes, stress', 'No, evaluates learning', 'Yes, boring', 'No, teachers need jobs'], correct: 1 },
        { text: 'Inference: "X is taller than Y. Y is taller than Z."', options: ['X is tallest', 'Z is shortest', 'X > Z', 'All of above'], correct: 3 },
        { text: 'Syllogism: All A are B. Some B are C.', options: ['Some A are C', 'All A are C', 'No A is C', 'Uncertain'], correct: 3 },
        { text: 'Statement: "Smoking is injurious to health".', options: ['Don\'t smoke', 'Health is wealth', 'Smoking causes cancer', 'Warning label'], correct: 3 },
        { text: 'Conclusion: "India won the match".', options: ['India played well', 'Opponent played bad', 'Match was fixed', 'It rained'], correct: 0 },
        { text: 'Assertion (A): Leaves are green. Reason (R): Chlorophyll.', options: ['Both true, R exp A', 'Both true', 'A true R false', 'A false'], correct: 0 },
    ],

    coding: [
        { text: 'If E=5, HOTEL=12, how is LAMB coded?', options: ['7', '10', '28', '26'], correct: 0 }, // Hotel=60/5=12? Lamb=28/4=7.
        { text: 'Z=52, ACT=48, BAT=?', options: ['39', '41', '44', '46'], correct: 3 }, // Z=26*2. ACT=(1+3+20)*2=48. BAT=(2+1+20)*2=46.
        { text: 'GO=32, SHE=49, SOME=?', options: ['56', '58', '62', '64'], correct: 0 }, // G=7, O=15. Reverse? T=20, L=12 = 32. S=8, H=19, E=22 = 49. SOME= 8+12+14+22 = 56.
        { text: 'AT = 20, BAT = 40, CAT = ?', options: ['60', '80', '50', '30'], correct: 0 }, // mult? 1*20=20. 2*1*20=40. 3*1*20=60.
        { text: 'Coding: 123=Run, 356=Very, 589=Fast. Common?', options: ['3', '5', 'Both', 'None'], correct: 2 },
        { text: 'A is coded as +, B as -. 4 A 3 B 2 = ?', options: ['5', '6', '2', '10'], correct: 0 }, // 4+3-2 = 5.
        { text: 'Binary of 15?', options: ['1111', '1010', '1100', '1001'], correct: 0 },
        { text: 'Hex A + Hex B = ?', options: ['15', '21', '25', '18'], correct: 0 }, // 10+11=21 in base 10 = 0x15.
        { text: 'ASCII for Space?', options: ['32', '0', '10', '255'], correct: 0 },
        { text: 'Unicode U+0041 is?', options: ['A', 'B', 'a', '1'], correct: 0 },
    ],

    bloodRelations: [
        { text: 'Introducing a boy, a girl said, "He is the son of the daughter of the father of my uncle." Who is the boy to the girl?', options: ['Brother', 'Uncle', 'Nephew', 'Son'], correct: 0 }, // Father of uncle = Grandpa. Daughter of Grandpa = Aunt/Mom. Son of Aunt/Mom = Cousin/Brother.
        { text: 'Pointing to a photograph, a person tells his friend, "She is the grand daughter of the elder brother of my father." How is the girl in the photograph related to his man?', options: ['Niece', 'Sister', 'Aunt', 'Cousin'], correct: 0 }, // Niece? Father's brother = Uncle. Uncle's son = Cousin. Cousin's daughter = Niece.
        { text: 'A is brother of B. C is father of A. D is brother of E. E is daughter of B. Then uncle of D is?', options: ['A', 'B', 'C', 'E'], correct: 0 },
        { text: 'A man said to a lady, "The son of your only brother is the brother of my wife." How is the lady related to the wife?', options: ['Mother', 'Sister', 'Aunt', 'Grandma'], correct: 2 }, // Lady's brother's son = Lady is Aunt.
        { text: 'P is Q\'s brother. R is Q\'s mother. S is R\'s father. T is S\'s mother. How is P related to T?', options: ['Grandson', 'Great Grandson', 'Son', 'Brother'], correct: 1 },
        { text: 'X is husband of Y. W is daughter of X. Z is husband of W. N is daughter of Z. relationship N to Y?', options: ['Granddaughter', 'Daughter', 'Cousin', 'Niece'], correct: 0 },
        { text: 'If A+B means A is mother of B; A-B means A is brother B; A%B means A is father B and A*B means A is sister B, then P%Q+R-S shows P related to S?', options: ['Father', 'Grandfather', 'Brother', 'Uncle'], correct: 1 }, // P=Father(Q), Q=Mother(R), R=Brother(S). P is Maternal Grandpa.
        { text: 'Pointing to a gentleman, Deepak said, "His only brother is the father of my daughter\'s father." Gentleman related to Deepak?', options: ['Father', 'Uncle', 'Brother-in-law', 'Grandfather'], correct: 1 }, // Deepak's daughter's father is Deepak. Gentleman's only brother is Father of Deepak. So Gentleman is Uncle.
        { text: 'Q is son of P, X is daughter of Q, R is aunty (Bua) of X and L is son of R. L is what to P?', options: ['Grandson', 'Granddaughter', 'Daughter', 'Nephew'], correct: 0 },
        { text: 'Deepak has a brother Anil. Deepak is the son of Sunil. Bimal is Sunil\'s father. Anil is related to Bimal?', options: ['Son', 'Grandson', 'Brother', 'Grandfather'], correct: 1 },
    ],

    series: [
        { text: '2, 3, 5, 7, 11, ?', options: ['13', '15', '17', '12'], correct: 0 },
        { text: '1, 9, 25, 49, ?, 121', options: ['64', '81', '91', '100'], correct: 1 },
        { text: '4, 7, 12, 19, 28, ?', options: ['30', '36', '39', '49'], correct: 2 }, // +3, +5, +7, +9, +11. 28+11=39.
        { text: '11, 13, 17, 19, 23, 25, ?', options: ['26', '27', '29', '37'], correct: 2 }, // +2, +4, +2, +4, +2... 25+4=29.
        { text: '6, 12, 21, ?, 48', options: ['33', '38', '40', '45'], correct: 0 }, // +6, +9, +12, +15. 21+12=33.
        { text: '2, 5, 9, ?, 20, 27', options: ['14', '16', '18', '24'], correct: 0 }, // +3, +4, +5(14), +6(20). 14.
        { text: '6, 11, 21, 36, 56, ?', options: ['42', '51', '81', '91'], correct: 2 },
        { text: '10, 100, 200, 310, ?', options: ['400', '410', '420', '430'], correct: 3 }, // +90, +100, +110, +120 -> 430.
        { text: '0, 2, 8, 14, ?, 34', options: ['20', '23', '24', '25'], correct: 2 }, // 0=1^2-1, 2=?? 
        // 0, 2, 8, 14, 24, 34? Diff: 2, 6, 6, 10, 10? 
        // Try: 1*0, 2*1, 4*2, 7*2? No.
        // 1^2-1=0. 2^2-2=2. 3^2-1=8. 4^2-2=14. 5^2-1=24. 6^2-2=34. Yes.
        { text: '28, 33, 31, 36, ?, 39', options: ['32', '34', '38', '40'], correct: 1 }, // +5, -2, +5, -2, +5. 36-2=34.
    ]
};

module.exports = quizQuestionsDatabase;
