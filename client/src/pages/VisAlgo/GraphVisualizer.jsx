import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, PlusCircle, Move, MousePointer2 } from 'lucide-react';
import CodePanel from './CodePanel';
import { bfs, dfs, dijkstra, prim, bfsCode, dfsCode, dijkstraCode, primsCode } from './algorithms/graph';

const GraphVisualizer = () => {
    // Mode: 'move', 'node', 'edge'
    const [mode, setMode] = useState('move');
    const [nodes, setNodes] = useState([
        { id: 0, x: 100, y: 100 },
        { id: 1, x: 300, y: 100 },
        { id: 2, x: 200, y: 250 },
        { id: 3, x: 100, y: 400 },
        { id: 4, x: 300, y: 400 },
    ]);
    const [edges, setEdges] = useState([
        { source: 0, target: 1, weight: 4 },
        { source: 0, target: 2, weight: 2 },
        { source: 1, target: 2, weight: 1 },
        { source: 2, target: 3, weight: 5 },
        { source: 2, target: 4, weight: 8 },
        { source: 3, target: 4, weight: 3 }
    ]);

    const [algorithm, setAlgorithm] = useState('bfs'); // bfs, dfs, dijkstra, prim
    const [startNode, setStartNode] = useState(0);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1000);
    const [description, setDescription] = useState("Build your graph or click Play");

    // Visualization State
    const [visited, setVisited] = useState(new Set());
    const [queueStack, setQueueStack] = useState([]); // Visually show queue or stack
    const [currentNode, setCurrentNode] = useState(null);
    const [checkingNode, setCheckingNode] = useState(null);
    const [activeLine, setActiveLine] = useState(0);

    // Interaction State
    const [selectedNode, setSelectedNode] = useState(null);
    const [draggingNode, setDraggingNode] = useState(null);

    const timerRef = useRef(null);
    const svgRef = useRef(null);

    const generateAdjacencyList = () => {
        const adj = {};
        nodes.forEach(n => adj[n.id] = []);
        edges.forEach(e => {
            // Check for duplicate edges if undirected visual, but here we treat as directed or undirected base on algo?
            // For Dijkstra/Prim, typically undirected or directed works.
            // Let's assume Undirected for Prim (MST). Dijkstra can be Directed.

            // To be safe, for Prim/MST we definitely need undirected. 
            // Let's add reverse edge logic if Algorithm is Prim or if we want generic Undirected.

            adj[e.source].push({ to: e.target, w: e.weight || 1 });

            // Add reverse edge for undirected behavior (common in MST)
            if (algorithm === 'prim') {
                adj[e.target] = adj[e.target] || [];
                adj[e.target].push({ to: e.source, w: e.weight || 1 });
            }
        });

        // Convert to simple list for BFS/DFS compatibility [neigh1, neigh2] if needed
        // but our BFS/DFS implementation now needs to handle the object structure {to, w}
        // or we allow BFS/DFS to ignore weights.

        // Wait, I didn't update BFS/DFS to handle {to, w} in the logic update?
        // I must ensure BFS/DFS logic handles `neighbors` array of objects if I change structure here.
        // Actually, let's keep separate generator for Weighted?
        // Or better: Update BFS/DFS logic lightly to handle .to property if present.

        // Quick Fix: Let's pass the structure expected.
        // My BFS/DFS logic in step 158 WAS NOT updated to handle {to, w}.
        // It expects `const neighbor = neighbors[i]` to be an ID.
        // So I need to normalize.

        // Let's keep simple `adj` for BFS/DFS and `weightedAdj` for others?
        // Or update BFS/DFS.

        return adj;
    };

    const runAlgorithm = () => {
        const adj = {};
        const weightedAdj = {};

        nodes.forEach(n => {
            adj[n.id] = [];
            weightedAdj[n.id] = [];
        });

        edges.forEach(e => {
            // BFS/DFS standard
            adj[e.source].push(e.target);

            // Weighted
            weightedAdj[e.source].push({ to: e.target, w: e.weight || 1 });

            // Undirected support for Prim
            if (algorithm === 'prim') {
                weightedAdj[e.target].push({ to: e.source, w: e.weight || 1 });
                // Also for simple BFS/DFS if we wanted? No, keep directed as default.
            }
        });

        // Sort for deterministic
        Object.keys(adj).forEach(k => adj[k].sort((a, b) => a - b));

        stopAnimation();

        let algoSteps = [];
        if (algorithm === 'bfs') {
            algoSteps = bfs(adj, startNode);
        } else if (algorithm === 'dfs') {
            algoSteps = dfs(adj, startNode);
        } else if (algorithm === 'dijkstra') {
            algoSteps = dijkstra(weightedAdj, startNode, nodes);
        } else if (algorithm === 'prim') {
            algoSteps = prim(weightedAdj, startNode, nodes);
        }

        if (algoSteps.length === 0) {
            setDescription("Invalid start node or empty graph");
            return;
        }

        setSteps(algoSteps);
        setCurrentStep(0);
        setIsPlaying(true);
    };

    const stopAnimation = () => {
        setIsPlaying(false);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const resetVisuals = () => {
        setVisited(new Set());
        setQueueStack([]);
        setCurrentNode(null);
        setCheckingNode(null);
        setActiveLine(0);
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
            setActiveLine(step.line);
            setCurrentNode(step.current);
            setCheckingNode(step.checking || null);
            setQueueStack(step.queue || step.stack || []);
            setVisited(new Set(step.visited));
        } else if (currentStep === 0) {
            resetVisuals();
        }
    }, [currentStep, steps]);

    // Graph Interaction Handlers
    const handleSvgClick = (e) => {
        if (mode === 'node') {
            const rect = svgRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const newId = nodes.length > 0 ? Math.max(...nodes.map(n => n.id)) + 1 : 0;
            setNodes([...nodes, { id: newId, x, y }]);
        }
    };

    const handleNodeMouseDown = (e, id) => {
        e.stopPropagation(); // Prevent svg click
        if (mode === 'move') {
            setDraggingNode(id);
        } else if (mode === 'edge') {
            if (selectedNode === null) {
                setSelectedNode(id);
            } else {
                if (selectedNode !== id) {
                    // Check if edge exists
                    const exists = edges.some(edge =>
                        (edge.source === selectedNode && edge.target === id)
                    );
                    if (!exists) {
                        setEdges([...edges, { source: selectedNode, target: id, weight: 1 }]);
                    }
                }
                setSelectedNode(null);
            }
        }
    };

    const handleMouseMove = (e) => {
        if (draggingNode !== null) {
            const rect = svgRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setNodes(nodes.map(n => n.id === draggingNode ? { ...n, x, y } : n));
        }
    };

    const handleMouseUp = () => {
        setDraggingNode(null);
    };

    return (
        <div className="min-h-screen bg-white p-6 md:p-12" onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Graph Traversal Visualizer</h1>
                        <p className="text-gray-600 mt-2">Build your own graph and watch BFS and DFS in action.</p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">

                        {/* Mode Select */}
                        <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                            <button
                                onClick={() => setMode('move')}
                                className={`p-2 rounded ${mode === 'move' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                                title="Move Nodes"
                            >
                                <Move className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setMode('node')}
                                className={`p-2 rounded ${mode === 'node' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                                title="Add Node"
                            >
                                <PlusCircle className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setMode('edge')}
                                className={`p-2 rounded ${mode === 'edge' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                                title="Add Edge (Click Source then Target)"
                            >
                                <MousePointer2 className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="w-px h-8 bg-gray-300 mx-2"></div>

                        <select
                            value={algorithm}
                            onChange={(e) => setAlgorithm(e.target.value)}
                            className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="bfs">BFS</option>
                        </select>

                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600">Start Node:</span>
                            <input
                                type="number"
                                value={startNode}
                                onChange={(e) => setStartNode(parseInt(e.target.value))}
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                            />
                        </div>

                        <button
                            onClick={runAlgorithm}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isPlaying
                                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                            {isPlaying ? "Pause" : "Play"}
                        </button>

                        <button
                            onClick={() => {
                                setNodes([]);
                                setEdges([]);
                                stopAnimation();
                                setSteps([]);
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                            title="Clear Graph"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
                    {/* Visual Panel - SVG Canvas */}
                    <div className="lg:col-span-2 bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden relative shadow-inner">
                        <div className="absolute top-4 left-6 z-10 bg-white px-3 py-1 rounded-full border border-gray-200 text-sm font-medium text-gray-600 shadow-sm">
                            Mode: {mode.toUpperCase()}
                        </div>
                        <div className="absolute top-4 right-6 z-10 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 text-sm font-medium text-blue-700 shadow-sm max-w-md truncate">
                            {description}
                        </div>

                        {/* Queue/Stack Visualization */}
                        <div className="absolute bottom-4 left-6 z-10 flex flex-col gap-1">
                            <span className="text-xs font-bold text-gray-500 uppercase">{algorithm === 'bfs' ? 'Queue' : 'Stack'}</span>
                            <div className="flex gap-1">
                                {queueStack.map((val, idx) => (
                                    <div key={idx} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded shadow-sm text-sm font-bold text-gray-700">
                                        {val}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <svg
                            ref={svgRef}
                            className="w-full h-full cursor-crosshair"
                            onClick={handleSvgClick}
                        >
                            <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF" />
                                </marker>
                            </defs>

                            {/* Edges */}
                            {edges.map((edge, idx) => {
                                const source = nodes.find(n => n.id === edge.source);
                                const target = nodes.find(n => n.id === edge.target);
                                if (!source || !target) return null;

                                return (
                                    <g key={idx}>
                                        <line
                                            x1={source.x} y1={source.y}
                                            x2={target.x} y2={target.y}
                                            stroke="#9CA3AF"
                                            strokeWidth="2"
                                            markerEnd={algorithm === 'prim' ? '' : "url(#arrowhead)"} // No arrow for MST usually
                                        />
                                        {/* Weight Label */}
                                        <rect
                                            x={(source.x + target.x) / 2 - 10}
                                            y={(source.y + target.y) / 2 - 10}
                                            width="20" height="20"
                                            fill="white"
                                            rx="4"
                                            className="shadow-sm"
                                        />
                                        <text
                                            x={(source.x + target.x) / 2}
                                            y={(source.y + target.y) / 2}
                                            dy=".3em"
                                            textAnchor="middle"
                                            className="text-xs font-bold text-gray-500 select-none pointer-events-none"
                                        >
                                            {edge.weight || 1}
                                        </text>
                                    </g>
                                );
                            })}

                            {/* Nodes */}
                            {nodes.map((node) => {
                                let fill = "white";
                                let stroke = "#3B82F6"; // blue-500

                                if (visited.has(node.id)) {
                                    fill = "#BFDBFE"; // blue-200
                                    stroke = "#2563EB"; // blue-600
                                }
                                if (node.id === currentNode) {
                                    fill = "#FDE047"; // yellow-300
                                    stroke = "#EAB308"; // yellow-500
                                }
                                if (node.id === checkingNode) {
                                    stroke = "#EF4444"; // red-500
                                    fill = "#FECACA"; // red-200
                                }
                                if (node.id === selectedNode) {
                                    stroke = "#10B981"; // green-500 -- selection for edge creation
                                }

                                return (
                                    <g
                                        key={node.id}
                                        transform={`translate(${node.x},${node.y})`}
                                        onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                                        className="cursor-pointer"
                                    >
                                        <circle
                                            r="20"
                                            fill={fill}
                                            stroke={stroke}
                                            strokeWidth="3"
                                            className="transition-colors duration-300"
                                        />
                                        <text
                                            dy=".3em"
                                            textAnchor="middle"
                                            className="font-bold text-sm pointer-events-none select-none text-gray-700"
                                        >
                                            {node.id}
                                        </text>
                                    </g>
                                );
                            })}
                        </svg>
                    </div>

                    {/* Code Panel */}
                    <div className="lg:col-span-1 h-full">
                        <CodePanel
                            code={
                                algorithm === 'bfs' ? bfsCode :
                                    algorithm === 'dfs' ? dfsCode :
                                        algorithm === 'dijkstra' ? dijkstraCode : primsCode
                            }
                            activeLine={activeLine}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraphVisualizer;
