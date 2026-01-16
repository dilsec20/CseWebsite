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
    const setCoords = (node, x, y, offset) => {
        if (!node) return;
        node.x = x;
        node.y = y;
        setCoords(node.left, x - offset, y + 65, offset / 2);
        setCoords(node.right, x + offset, y + 65, offset / 2);
    };
    setCoords(root, width / 2, 50, 160);
    return root;
};

// --- Tree Properties Algorithms ---

export const calculateTreeHeight = (node) => {
    if (!node) return 0;
    return 1 + Math.max(calculateTreeHeight(node.left), calculateTreeHeight(node.right));
};

export const getTreeAnalysis = (root) => {
    if (!root) return { height: 0, diameter: 0, leaves: [], diameterPath: [] };
    let maxDiameter = 0;
    let diameterNodes = [];

    const depthAndDiameter = (node) => {
        if (!node) return { depth: 0, path: [] };
        const left = depthAndDiameter(node.left);
        const right = depthAndDiameter(node.right);

        const currentDiameter = left.depth + right.depth + 1;
        if (currentDiameter > maxDiameter) {
            maxDiameter = currentDiameter;
            diameterNodes = [...left.path.slice().reverse(), node.value, ...right.path];
        }

        const currentDepth = 1 + Math.max(left.depth, right.depth);
        const currentPath = [node.value, ...(left.depth > right.depth ? left.path : right.path)];
        return { depth: currentDepth, path: currentPath };
    };

    depthAndDiameter(root);
    const leaves = [];
    const findLeaves = (node) => {
        if (!node) return;
        if (!node.left && !node.right) leaves.push(node.value);
        findLeaves(node.left); findLeaves(node.right);
    };
    findLeaves(root);

    return {
        height: calculateTreeHeight(root),
        diameter: maxDiameter,
        diameterPath: diameterNodes,
        leaves: leaves
    };
};

export const getDepthLevels = (root) => {
    if (!root) return {};
    const depths = {};
    const traverse = (node, d) => {
        if (!node) return;
        depths[node.value] = d;
        traverse(node.left, d + 1);
        traverse(node.right, d + 1);
    };
    traverse(root, 0);
    return depths;
};

export const bstCode = `void insert(Node*& root, int val) {
    if (root == NULL) {
        root = new Node(val);
        return;
    }
    if (val < root->val) {
        if (root->left == NULL) root->left = new Node(val);
        else insert(root->left, val);
    } else {
        if (root->right == NULL) root->right = new Node(val);
        else insert(root->right, val);
    }
}`;

export const heightCode = `int height(Node* node) {
    if (node == NULL) return 0;
    return 1 + max(height(node->left), height(node->right));
}`;

export const diameterCode = `int diameter(Node* root) {
    if (root == NULL) return 0;
    int lh = height(root->left), rh = height(root->right);
    int ld = diameter(root->left), rd = diameter(root->right);
    return max(lh + rh + 1, max(ld, rd));
}`;
