import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus } from 'lucide-react';
import CodePanel from './CodePanel';
import { insertBST, layoutTree, bstCode } from './algorithms/bst';

const BSTVisualizer = () => {
    const [root, setRoot] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1000);
    const [description, setDescription] = useState("Enter a value to insert into the BST.");
    const [highlightNode, setHighlightNode] = useState(null);
    const [activeLine, setActiveLine] = useState(0);

    // Visual tree state for rendering
    const [visualRoot, setVisualRoot] = useState(null); // The tree structure being displayed

    const timerRef = useRef(null);

    // Initial Tree
    useEffect(() => {
        // Create a small initial tree
        let r = null;
        [15, 10, 20, 8, 12, 25].forEach(v => {
            const res = insertBST(r, v);
            r = res.root;
        });
        layoutTree(r);
        setRoot(r);
        setVisualRoot(r);
    }, []);

    const handleInsert = () => {
        const val = parseInt(inputValue);
        if (isNaN(val)) return;

        // Reset animation states
        stopAnimation();

        // Calculate insertion steps based on CURRENT root state
        // We need to clone the current root to avoid mutation issues during step generation
        // But insertBST mutates the object structure (links). 
        // We should treat 'root' as the stable state.

        // Actually, insertBST returns { root: newRoot, steps }
        // We must perform the insertion specifically for visualization, then update the actual root at the end?
        // Or we visualize the steps which contain snapshots of the tree?
        // My insertBST returns snapshots in 'steps'. The 'tree' property of step is a full clone.

        const { root: newRoot, steps: newSteps } = insertBST(root, val);

        // Apply layout to all step snapshots
        newSteps.forEach(s => {
            if (s.tree) layoutTree(s.tree);
        });

        setTimeToUpdateRoot(newRoot); // Store to update later? No, we update root immediately for next op?
        // If we update root immediately, user can't perform multiple ops quickly without waiting?
        // Let's sets root to newRoot immediately so state is consistent, but visual steps play out.
        layoutTree(newRoot);
        setRoot(newRoot);

        setSteps(newSteps);
        setCurrentStep(0);
        setIsPlaying(true);
        setInputValue('');
    };

    // To handle true final state
    const setTimeToUpdateRoot = (r) => {
        // Effectively we just update the logical root.
        // The visual root will follow the steps.
    };

    const stopAnimation = () => {
        setIsPlaying(false);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(() => {
                setCurrentStep((prev) => {
                    if (prev >= steps.length - 1) {
                        stopAnimation();
                        return prev;
                    }
                    return prev + 1;
                });
            }, speed);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isPlaying, speed, steps.length]);

    useEffect(() => {
        if (steps.length > 0 && currentStep < steps.length) {
            const step = steps[currentStep];
            setDescription(step.description);
            setHighlightNode(step.highlight);
            setActiveLine(step.line);
            setVisualRoot(step.tree);
        } else if (steps.length > 0 && currentStep >= steps.length - 1) {
            // Animation done, ensure visual root matches actual root 
            // (The last step should be the final tree state usually)
            layoutTree(root);
            setVisualRoot(root);
            setHighlightNode(null);
            setDescription(`Inserted ${inputValue} (Complete)`);
        }
    }, [currentStep, steps]);

    // Recursive render helper
    const renderTree = (node) => {
        if (!node) return null;
        return (
            <g key={node.value}>
                {node.left && (
                    <line
                        x1={node.x} y1={node.y}
                        x2={node.left.x} y2={node.left.y}
                        stroke="#9CA3AF" strokeWidth="2"
                    />
                )}
                {node.right && (
                    <line
                        x1={node.x} y1={node.y}
                        x2={node.right.x} y2={node.right.y}
                        stroke="#9CA3AF" strokeWidth="2"
                    />
                )}
                {renderTree(node.left)}
                {renderTree(node.right)}

                <g transform={`translate(${node.x},${node.y})`}>
                    <circle
                        r="20"
                        fill={Number(node.value) === Number(highlightNode) ? "#FCD34D" : "white"}
                        stroke={Number(node.value) === Number(highlightNode) ? "#F59E0B" : "#3B82F6"}
                        strokeWidth="3"
                        className="transition-colors duration-300"
                    />
                    <text
                        dy=".3em"
                        textAnchor="middle"
                        className="font-bold text-sm pointer-events-none select-none text-gray-700"
                    >
                        {node.value}
                    </text>
                </g>
            </g>
        );
    };

    return (
        <div className="min-h-screen bg-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">BST Visualization</h1>
                        <p className="text-gray-600 mt-2">Binary Search Trees: Visualize Insertions and Structure.</p>
                    </div>

                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                        <input
                            type="number"
                            placeholder="Value"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <button
                            onClick={handleInsert}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            <Plus className="w-4 h-4" /> Insert
                        </button>

                        <button
                            onClick={() => {
                                setRoot(null);
                                setVisualRoot(null);
                                stopAnimation();
                                setSteps([]);
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                            title="Clear Tree"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
                    <div className="lg:col-span-2 bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden relative shadow-inner">
                        <div className="absolute top-4 right-6 z-10 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 text-sm font-medium text-blue-700 shadow-sm">
                            {description}
                        </div>
                        <svg className="w-full h-full">
                            {renderTree(visualRoot)}
                        </svg>
                    </div>

                    <div className="lg:col-span-1 h-full">
                        <CodePanel code={bstCode} activeLine={activeLine} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BSTVisualizer;
