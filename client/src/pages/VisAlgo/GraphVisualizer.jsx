import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, PlusCircle, Move, MousePointer2, ArrowLeft, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import CodePanel from './CodePanel';
import {
    bfs, dfs, dijkstra, prim, kruskal, topologicalSort, boruvka, hamiltonianCycle,
    bfsCode, dfsCode, dijkstraCode, primsCode, kruskalCode, boruvkaCode, topoCode, hamiltonianCode
} from './algorithms/graph';

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

    const [algorithm, setAlgorithm] = useState('bfs');
    const [startNode, setStartNode] = useState(0);
    const [targetNode, setTargetNode] = useState(null);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1000);
    const [isDirected, setIsDirected] = useState(true);
    const [description, setDescription] = useState("Build your graph or click Play");

    // Visualization State
    const [visited, setVisited] = useState(new Set());
    const [queueStack, setQueueStack] = useState([]);
    const [currentNode, setCurrentNode] = useState(null);
    const [checkingNode, setCheckingNode] = useState(null);
    const [pathNodes, setPathNodes] = useState(new Set());
    const [mstEdges, setMstEdges] = useState([]); // Array of {u, v}
    const [distances, setDistances] = useState({});
    const [activeLine, setActiveLine] = useState(0);
    const [currentPath, setCurrentPath] = useState([]); // Array of node IDs in order
    const [summary, setSummary] = useState(null);

    // Interaction State
    const [selectedNode, setSelectedNode] = useState(null);
    const [draggingNode, setDraggingNode] = useState(null);

    const timerRef = useRef(null);
    const svgRef = useRef(null);

    // Context-Aware Presets
    useEffect(() => {
        stopAnimation();
        resetVisuals();
        setSteps([]);

        if (algorithm === 'bfs' || algorithm === 'dfs') {
            setNodes([
                { id: 0, x: 300, y: 50 },
                { id: 1, x: 150, y: 150 },
                { id: 2, x: 450, y: 150 },
                { id: 3, x: 75, y: 300 },
                { id: 4, x: 225, y: 300 },
            ]);
            setEdges([
                { source: 0, target: 1, weight: 1 },
                { source: 0, target: 2, weight: 1 },
                { source: 1, target: 3, weight: 1 },
                { source: 1, target: 4, weight: 1 },
            ]);
            setIsDirected(true);
            setIsDirected(true);
            setTargetNode(4); // Default target for demo
            setDescription("Tree structure: Ideal for level-wise (BFS) or depth-wise (DFS) traversal.");
        } else if (algorithm === 'dijkstra' || algorithm === 'prim' || algorithm === 'kruskal' || algorithm === 'boruvka') {
            setNodes([
                { id: 0, x: 100, y: 250 },
                { id: 1, x: 250, y: 100 },
                { id: 2, x: 250, y: 400 },
                { id: 3, x: 450, y: 100 },
                { id: 4, x: 450, y: 400 },
                { id: 5, x: 600, y: 250 },
            ]);
            setEdges([
                { source: 0, target: 1, weight: 4 },
                { source: 0, target: 2, weight: 2 },
                { source: 1, target: 2, weight: 1 },
                { source: 1, target: 3, weight: 5 },
                { source: 2, target: 3, weight: 8 },
                { source: 2, target: 4, weight: 10 },
                { source: 3, target: 4, weight: 2 },
                { source: 3, target: 5, weight: 6 },
                { source: 4, target: 5, weight: 3 },
            ]);
            setIsDirected(algorithm === 'dijkstra');
            setTargetNode(algorithm === 'dijkstra' ? 5 : null);
            setDescription(algorithm === 'dijkstra' ? "Weighted Graph: Find shortest paths from Node 0." : "Weighted Graph: Connect all nodes with minimum total weight.");
        } else if (algorithm === 'topological') {
            setNodes([
                { id: 0, x: 100, y: 100 },
                { id: 1, x: 300, y: 100 },
                { id: 2, x: 100, y: 300 },
                { id: 3, x: 300, y: 300 },
                { id: 4, x: 500, y: 200 },
            ]);
            setEdges([
                { source: 0, target: 1, weight: 1 },
                { source: 0, target: 2, weight: 1 },
                { source: 1, target: 3, weight: 1 },
                { source: 2, target: 3, weight: 1 },
                { source: 3, target: 4, weight: 1 },
            ]);
            setIsDirected(true);
            setTargetNode(null);
            setDescription("Directed Acyclic Graph (DAG): Nodes must be visited after their dependencies.");
        } else if (algorithm === 'hamiltonian') {
            setNodes([
                { id: 0, x: 300, y: 100 },
                { id: 1, x: 500, y: 250 },
                { id: 2, x: 400, y: 450 },
                { id: 3, x: 200, y: 450 },
                { id: 4, x: 100, y: 250 },
                { id: 5, x: 300, y: 300 }
            ]);
            setEdges([
                { source: 0, target: 1, weight: 1 },
                { source: 1, target: 2, weight: 1 },
                { source: 2, target: 3, weight: 1 },
                { source: 3, target: 4, weight: 1 },
                { source: 4, target: 0, weight: 1 },
                { source: 0, target: 5, weight: 1 },
                { source: 5, target: 2, weight: 1 }
            ]);
            setIsDirected(false);
            setTargetNode(null);
            setDescription("Hamiltonian Cycle: Can you visit every node exactly once and return to start?");
        }
    }, [algorithm]);

    const stopAnimation = () => {
        setIsPlaying(false);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const resetVisuals = () => {
        setVisited(new Set());
        setQueueStack([]);
        setCurrentNode(null);
        setCheckingNode(null);
        setPathNodes(new Set());
        setMstEdges([]);
        setDistances({});
        setActiveLine(0);
        setCurrentPath([]);
    };

    const generateSummary = (algo, stats) => {
        const { visitedCount, pathLength, pathSequence } = stats;
        const pathStr = pathSequence && pathSequence.length > 0 ? pathSequence.join(" → ") : "No path found";

        switch (algo) {
            case 'bfs':
                return (
                    <div className="flex flex-col gap-2">
                        <p>BFS explored {visitedCount} nodes level-by-level.</p>
                        <div className="bg-white/50 p-2 rounded border border-green-200 font-mono text-xs break-all">
                            <strong>Path/Order:</strong> {pathStr}
                        </div>
                    </div>
                );
            case 'dfs':
                return (
                    <div className="flex flex-col gap-2">
                        <p>DFS explored {visitedCount} nodes depth-first.</p>
                        <div className="bg-white/50 p-2 rounded border border-green-200 font-mono text-xs break-all">
                            <strong>Path/Order:</strong> {pathStr}
                        </div>
                    </div>
                );
            case 'dijkstra':
                return (
                    <div className="flex flex-col gap-2">
                        <p>Dijkstra visited {visitedCount} nodes finding shortest paths.</p>
                        <div className="bg-white/50 p-2 rounded border border-green-200 font-mono text-xs break-all">
                            <strong>Shortest Path:</strong> {pathStr}
                        </div>
                    </div>
                );
            case 'bellmanFord':
                return (
                    <div className="flex flex-col gap-2">
                        <p>Bellman-Ford relaxed edges {stats.nodeCount - 1} times.</p>
                        <div className="bg-white/50 p-2 rounded border border-green-200 font-mono text-xs break-all">
                            <strong>Shortest Path:</strong> {pathStr}
                        </div>
                    </div>
                );
            case 'floydWarshall':
                return (
                    <div className="flex flex-col gap-2">
                        <p>Floyd-Warshall computed all-pairs shortest paths.</p>
                        <p className="text-[10px] opacity-75">Check console or hover nodes for details (dense output).</p>
                    </div>
                );
            case 'topological':
                return (
                    <div className="flex flex-col gap-2">
                        <p>Topological Sort completed.</p>
                        <div className="bg-white/50 p-2 rounded border border-green-200 font-mono text-xs break-all">
                            <strong>Order:</strong> {pathStr}
                        </div>
                    </div>
                );
            case 'hamiltonian':
                return (
                    <div className="flex flex-col gap-2">
                        <p>{pathSequence && pathSequence.length > 0 ? "Hamiltonian Cycle Found!" : "No Hamiltonian Cycle found."}</p>
                        {pathSequence && pathSequence.length > 0 && (
                            <div className="bg-white/50 p-2 rounded border border-green-200 font-mono text-xs break-all">
                                <strong>Cycle:</strong> {pathStr}
                            </div>
                        )}
                    </div>
                );
            default:
                return (
                    <div className="flex flex-col gap-2">
                        <p>Algorithm completed.</p>
                        {pathSequence && pathSequence.length > 0 && (
                            <div className="bg-white/50 p-2 rounded border border-green-200 font-mono text-xs break-all">
                                <strong>Result:</strong> {pathStr}
                            </div>
                        )}
                    </div>
                );
        }
    };

    const runAlgorithm = () => {
        const adj = {};
        const weightedAdj = {};

        nodes.forEach(n => {
            adj[n.id] = [];
            weightedAdj[n.id] = [];
        });

        edges.forEach(e => {
            adj[e.source].push(e.target);
            weightedAdj[e.source].push({ to: e.target, w: e.weight || 1 });
            if (!isDirected || algorithm === 'prim') {
                adj[e.target] = adj[e.target] || [];
                adj[e.target].push(e.source);
                weightedAdj[e.target] = weightedAdj[e.target] || [];
                weightedAdj[e.target].push({ to: e.source, w: e.weight || 1 });
            }
        });

        Object.keys(adj).forEach(k => adj[k].sort((a, b) => a - b));

        stopAnimation();
        resetVisuals();
        setSummary(null); // Clear summary before running

        let algoSteps = [];
        if (algorithm === 'bfs') algoSteps = bfs(adj, startNode, targetNode);
        else if (algorithm === 'dfs') algoSteps = dfs(adj, startNode, targetNode);
        else if (algorithm === 'dijkstra') algoSteps = dijkstra(weightedAdj, startNode, targetNode, nodes);
        else if (algorithm === 'prim') algoSteps = prim(weightedAdj, startNode, nodes);
        else if (algorithm === 'kruskal') {
            const edgeList = edges.map(e => ({ u: e.source, v: e.target, w: e.weight || 1 }));
            algoSteps = kruskal(edgeList, nodes);
        } else if (algorithm === 'topological') algoSteps = topologicalSort(weightedAdj, nodes);
        else if (algorithm === 'boruvka') {
            const edgeList = edges.map(e => ({ u: e.source, v: e.target, w: e.weight || 1 }));
            algoSteps = boruvka(edgeList, nodes);
        } else if (algorithm === 'hamiltonian') algoSteps = hamiltonianCycle(weightedAdj, nodes);
        else if (algorithm === 'bellmanFord') {
            const edgeList = edges.map(e => ({ source: e.source, target: e.target, weight: e.weight || 1 }));
            algoSteps = bellmanFord(edgeList, startNode, targetNode, nodes);
        } else if (algorithm === 'floydWarshall') algoSteps = floydWarshall(weightedAdj, nodes, isDirected);

        if (algoSteps.length === 0) {
            setDescription("Invalid start node or empty graph");
            return;
        }

        setSteps(algoSteps);
        setCurrentStep(0);
        setIsPlaying(true);

        // Generate Summary
        const visitedSet = new Set();
        algoSteps.forEach(s => {
            if (s.current !== null && s.current !== undefined) visitedSet.add(s.current);
        });
        const lastStep = algoSteps[algoSteps.length - 1];
        const pathLen = (lastStep && lastStep.path) ? lastStep.path.length : 0;
        const pathSeq = (lastStep && (lastStep.path || lastStep.result)) ? (lastStep.path || lastStep.result) : [];

        setSummary(generateSummary(algorithm, {
            visitedCount: visitedSet.size,
            pathLength: pathLen,
            pathSequence: pathSeq,
            nodeCount: nodes.length
        }));
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
            if (step.dist) setDistances(step.dist);
            if (step.dist) setDistances(step.dist);
            if (step.path) {
                setPathNodes(new Set(step.path));
                setCurrentPath(step.path);
            } else {
                setCurrentPath([]);
                setPathNodes(new Set());
            }
            if (step.mstEdges) setMstEdges(step.mstEdges);
            else if (step.mst) setMstEdges(step.mst.map(e => ({ u: e.u, v: e.v })));
        } else if (currentStep === 0) {
            resetVisuals();
        }
    }, [currentStep, steps]);

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
        e.stopPropagation();
        if (mode === 'move') setDraggingNode(id);
        else if (mode === 'edge') {
            if (selectedNode === null) setSelectedNode(id);
            else {
                if (selectedNode !== id) {
                    const exists = edges.some(edge => (edge.source === selectedNode && edge.target === id));
                    if (!exists) setEdges([...edges, { source: selectedNode, target: id, weight: 1 }]);
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

    const handleMouseUp = () => setDraggingNode(null);

    return (
        <div className="min-h-screen bg-white p-6 md:p-12" onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link to="/visalgo" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-2 transition">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Algorithms
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Graph Traversal Visualizer</h1>
                        <p className="text-gray-600 mt-2">Build your own graph and watch BFS and DFS in action.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                            <button onClick={() => setMode('move')} className={`p-2 rounded ${mode === 'move' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`} title="Move Nodes"><Move className="w-5 h-5" /></button>
                            <button onClick={() => setMode('node')} className={`p-2 rounded ${mode === 'node' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`} title="Add Node"><PlusCircle className="w-5 h-5" /></button>
                            <button onClick={() => setMode('edge')} className={`p-2 rounded ${mode === 'edge' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`} title="Add Edge"><MousePointer2 className="w-5 h-5" /></button>
                        </div>

                        <div className="w-px h-8 bg-gray-300 mx-2"></div>

                        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="bfs">BFS</option>
                            <option value="dfs">DFS</option>
                            <option value="dijkstra">Dijkstra</option>
                            <option value="topological">Topological Sort</option>
                            <option value="prim">Prim's MST</option>
                            <option value="kruskal">Kruskal's MST</option>
                            <option value="boruvka">Borůvkas MST</option>
                            <option value="hamiltonian">Hamiltonian Cycle</option>
                        </select>

                        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                            <span className="text-sm font-medium text-gray-600">Directed:</span>
                            <button onClick={() => setIsDirected(!isDirected)} className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${isDirected ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isDirected ? 'translate-x-4' : ''}`}></div>
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600">Start:</span>
                            <input type="number" value={startNode} onChange={(e) => setStartNode(parseInt(e.target.value))} className="w-12 px-2 py-1 border border-gray-300 rounded text-center" />
                        </div>

                        {(algorithm === 'dijkstra' || algorithm === 'bfs' || algorithm === 'dfs') && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600">End:</span>
                                <input type="number" value={targetNode !== null ? targetNode : ''} onChange={(e) => setTargetNode(e.target.value ? parseInt(e.target.value) : null)} className="w-12 px-2 py-1 border border-gray-300 rounded text-center" placeholder="None" />
                            </div>
                        )}

                        <button onClick={runAlgorithm} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isPlaying ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                            {isPlaying ? "Pause" : "Play"}
                        </button>

                        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                            <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={isPlaying || currentStep === 0} className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed transition"><ChevronLeft className="w-5 h-5" /></button>
                            <div className="w-px h-4 bg-gray-200 mx-1"></div>
                            <button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} disabled={isPlaying || (steps.length > 0 && currentStep === steps.length - 1)} className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed transition"><ChevronRight className="w-5 h-5" /></button>
                        </div>

                        <button onClick={() => { setNodes([]); setEdges([]); stopAnimation(); setSteps([]); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="Clear"><RotateCcw className="w-5 h-5" /></button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
                    <div className="lg:col-span-2 bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden relative shadow-inner">
                        <div className="absolute top-4 left-6 z-10 bg-white px-3 py-1 rounded-full border border-gray-200 text-sm font-medium text-gray-600 shadow-sm">Mode: {mode.toUpperCase()}</div>
                        <div className="absolute top-4 right-6 z-10 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 text-sm font-medium text-blue-700 shadow-sm max-w-md truncate">{description}</div>

                        <div className="absolute bottom-4 left-6 z-10 flex flex-col gap-1">
                            <span className="text-xs font-bold text-gray-500 uppercase">{algorithm === 'bfs' ? 'Queue' : (algorithm === 'dfs' ? 'Stack' : '')}</span>
                            <div className="flex gap-1">
                                {queueStack.map((val, idx) => (<div key={idx} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded shadow-sm text-sm font-bold text-gray-700">{val}</div>))}
                            </div>
                        </div>

                        <svg ref={svgRef} className="w-full h-full cursor-crosshair" onClick={handleSvgClick}>
                            <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF" />
                                </marker>
                            </defs>
                            {edges.map((edge, idx) => {
                                const source = nodes.find(n => n.id === edge.source);
                                const target = nodes.find(n => n.id === edge.target);
                                if (!source || !target) return null;
                                const isMstEdge = mstEdges.some(mst => (mst.u === edge.source && mst.v === edge.target) || (mst.u === edge.target && mst.v === edge.source));

                                // Check if this edge is part of the current path
                                let isPathEdge = false;
                                if (currentPath.length > 0) {
                                    for (let i = 0; i < currentPath.length - 1; i++) {
                                        const u = currentPath[i];
                                        const v = currentPath[i + 1];
                                        if ((u === edge.source && v === edge.target) || (!isDirected && u === edge.target && v === edge.source)) {
                                            isPathEdge = true;
                                            break;
                                        }
                                    }
                                }

                                return (
                                    <g key={idx}>
                                        <line
                                            x1={source.x} y1={source.y} x2={target.x} y2={target.y}
                                            stroke={isPathEdge ? "#EAB308" : (isMstEdge ? "#10B981" : "#9CA3AF")}
                                            strokeWidth={isPathEdge || isMstEdge ? "4" : "2"}
                                            markerEnd={(algorithm === 'prim' || !isDirected || isMstEdge || isPathEdge) ? '' : "url(#arrowhead)"}
                                            className="transition-all duration-300"
                                        />
                                        <rect x={(source.x + target.x) / 2 - 10} y={(source.y + target.y) / 2 - 10} width="20" height="20" fill="white" rx="4" className="shadow-sm" />
                                        <text x={(source.x + target.x) / 2} y={(source.y + target.y) / 2} dy=".3em" textAnchor="middle" className="text-xs font-bold text-gray-500 select-none pointer-events-none">{edge.weight || 1}</text>
                                    </g>
                                );
                            })}
                            {nodes.map((node) => {
                                let fill = "white", stroke = "#3B82F6", strokeWidth = "3";
                                const isStart = node.id === startNode;
                                const isEnd = node.id === targetNode;
                                const isInPath = pathNodes.has(node.id);

                                if (visited.has(node.id)) { fill = "#BFDBFE"; stroke = "#2563EB"; }
                                if (node.id === currentNode) { fill = "#FDE047"; stroke = "#EAB308"; }
                                if (node.id === checkingNode) { stroke = "#EF4444"; fill = "#FECACA"; }
                                if (node.id === selectedNode) { stroke = "#10B981"; }

                                if (isInPath) { fill = "#FDE047"; stroke = "#EAB308"; }
                                if (isStart) { stroke = "#10B981"; strokeWidth = "5"; } // Green Start
                                if (isEnd) { stroke = "#EF4444"; strokeWidth = "5"; }   // Red End

                                return (
                                    <g key={node.id} transform={`translate(${node.x},${node.y})`} onMouseDown={(e) => handleNodeMouseDown(e, node.id)} className="cursor-pointer">
                                        <circle r="20" fill={fill} stroke={stroke} strokeWidth={strokeWidth} className="transition-colors duration-300 shadow-sm" />
                                        <text dy=".3em" textAnchor="middle" className="font-bold text-sm pointer-events-none select-none text-gray-700">{node.id}</text>
                                        {distances[node.id] !== undefined && distances[node.id] !== Infinity && (
                                            <text y="-25" textAnchor="middle" className="text-[10px] font-black text-blue-600 fill-blue-600 bg-white px-1">dist: {distances[node.id]}</text>
                                        )}
                                        {isStart && <text y="35" textAnchor="middle" className="text-[10px] font-bold text-green-600">START</text>}
                                        {isEnd && <text y="35" textAnchor="middle" className="text-[10px] font-bold text-red-600">END</text>}
                                    </g>
                                );
                            })}
                        </svg>
                    </div>

                    <div className="lg:col-span-1 h-full overflow-y-auto">
                        <CodePanel
                            code={
                                algorithm === 'bfs' ? bfsCode :
                                    algorithm === 'dfs' ? dfsCode :
                                        algorithm === 'dijkstra' ? dijkstraCode :
                                            algorithm === 'prim' ? primsCode :
                                                algorithm === 'kruskal' ? kruskalCode :
                                                    algorithm === 'boruvka' ? boruvkaCode :
                                                        algorithm === 'topological' ? topoCode :
                                                            hamiltonianCode
                            }
                            activeLine={activeLine}
                        />

                        {summary && !isPlaying && (
                            <div className="mt-4 bg-green-50 border border-green-100 rounded-xl p-4 shadow-sm animate-fade-in">
                                <div className="flex items-center gap-2 text-green-700 font-bold mb-2">
                                    <Info className="w-4 h-4" />
                                    <span className="text-sm">Summary</span>
                                </div>
                                <div className="text-xs text-green-700 leading-relaxed font-medium">
                                    {summary}
                                </div>
                            </div>
                        )}

                        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                                <Info className="w-4 h-4" />
                                <span className="text-sm">Things to Observe</span>
                            </div>
                            <p className="text-xs text-blue-600 leading-relaxed italic">
                                {algorithm === 'bfs' && "Notice how BFS visits all neighbors at the current depth before moving to the next level. This forms a tree-like traversal."}
                                {algorithm === 'dfs' && "DFS goes as deep as possible along each branch before backtracking."}
                                {algorithm === 'dijkstra' && "Dijkstra's always picks the unvisited node with the smallest distance value."}
                                {algorithm === 'prim' && "Prim's grows a MST by always adding the lowest weight edge that connects to the tree."}
                                {algorithm === 'kruskal' && "Kruskal's sorts all edges and adds them one by one if they don't form a cycle. Uses Disjoint Set (Union-Find)."}
                                {algorithm === 'boruvka' && "Borůvka's works by adding the cheapest edge from each component to another component in iterations."}
                                {algorithm === 'topological' && "Topological Sort ordering only exists for DAGs. It's used for scheduling tasks with dependencies."}
                                {algorithm === 'hamiltonian' && "A Hamiltonian cycle visits every node exactly once. It is an NP-complete problem!"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraphVisualizer;
