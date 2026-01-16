class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
    }
}

export const insertBST = (root, value) => {
    const steps = [];
    if (!root) {
        const newRoot = new TreeNode(value);
        steps.push({
            tree: cloneTree(newRoot),
            highlight: value,
            description: `Tree is empty. Created root node ${value}.`,
            line: 1
        });
        return { root: newRoot, steps };
    }

    let current = root;
    steps.push({
        tree: cloneTree(root),
        highlight: current.value,
        description: `Start inserting ${value} at root ${current.value}.`,
        line: 2
    });

    while (true) {
        if (value < current.value) {
            steps.push({
                tree: cloneTree(root),
                highlight: current.value,
                description: `${value} < ${current.value}, go Left.`,
                line: 3
            });
            if (current.left === null) {
                current.left = new TreeNode(value);
                steps.push({
                    tree: cloneTree(root),
                    highlight: value,
                    description: `Found empty spot. Inserted ${value} to left of ${current.value}.`,
                    line: 4
                });
                break;
            }
            current = current.left;
        } else {
            steps.push({
                tree: cloneTree(root),
                highlight: current.value,
                description: `${value} >= ${current.value}, go Right.`,
                line: 5
            });
            if (current.right === null) {
                current.right = new TreeNode(value);
                steps.push({
                    tree: cloneTree(root),
                    highlight: value,
                    description: `Found empty spot. Inserted ${value} to right of ${current.value}.`,
                    line: 6
                });
                break;
            }
            current = current.right;
        }
    }
    return { root, steps };
};

// Helper to clone tree structure for steps snapshot
const cloneTree = (node) => {
    if (!node) return null;
    const newNode = new TreeNode(node.value);
    newNode.left = cloneTree(node.left);
    newNode.right = cloneTree(node.right);
    return newNode;
};

// Layout algorithm to assign x,y coordinates
export const layoutTree = (root, width = 800, startX = 400, startY = 50, level = 1) => {
    if (!root) return;

    // Simple recursive layout
    // The horizontal gap decreases as level increases
    const gap = width / (Math.pow(2, level) + 1);

    // Basic idea: Root is at center.
    // Children are offset by width / 2^(level+1)

    // Better simple approach: 
    // Just simple recursive width splitting

    const setCoords = (node, x, y, offset) => {
        if (!node) return;
        node.x = x;
        node.y = y;
        setCoords(node.left, x - offset, y + 60, offset / 2);
        setCoords(node.right, x + offset, y + 60, offset / 2);
    };

    setCoords(root, 400, 50, 150);
    return root;
};

export const bstCode = `void insert(Node*& root, int val) {
    if (root == NULL) {
        root = new Node(val);
        return;
    }
    
    if (val < root->val) {
        if (root->left == NULL)
            root->left = new Node(val);
        else
            insert(root->left, val);
    } else {
        if (root->right == NULL)
            root->right = new Node(val);
        else
            insert(root->right, val);
    }
}`;
