import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft, Info, Square, Flag, MapPin, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import CodePanel from './CodePanel';
import {
    bfs, dfs, dijkstra, astar, primsMSTGrid,
    bfsCode, dfsCode, dijkstraCode, astarCode, primsMSTCode
} from './algorithms/pathfinding';

const PathfindingVisualizer = () => {
    const GRID_SIZE = 20;
    const [grid, setGrid] = useState([]);
    const [startNode, setStartNode] = useState({ row: 5, col: 5 });
    const [endNode, setEndNode] = useState({ row: 15, col: 15 });
    const [mode, setMode] = useState('wall'); // wall, start, end
    const [algorithm, setAlgorithm] = useState('bfs');
    const [allowDiagonals, setAllowDiagonals] = useState(false);
    const [isMousePressed, setIsMousePressed] = useState(false);

    // Animation State
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(30);
    const [description, setDescription] = useState("Place walls and click Visualize.");
    const [visitedNodes, setVisitedNodes] = useState(new Set());
    const [pathNodes, setPathNodes] = useState(new Set());
    const [activeLine, setActiveLine] = useState(0);
    const [summary, setSummary] = useState(null);

    const timerRef = useRef(null);

    // Initialize Grid
    useEffect(() => {
        const initialGrid = [];
        for (let r = 0; r < GRID_SIZE; r++) {
            const row = [];
            for (let c = 0; c < GRID_SIZE; c++) {
                row.push({
                    row: r,
                    col: c,
                    isWall: false,
                    isStart: r === startNode.row && c === startNode.col,
                    isEnd: r === endNode.row && c === endNode.col,
                    weight: 1
                });
            }
            initialGrid.push(row);
        }
        setGrid(initialGrid);
    }, []);

    const handleMouseDown = (row, col) => {
        if (isPlaying) return;
        setIsMousePressed(true);
        updateNode(row, col);
    };

    const handleMouseEnter = (row, col) => {
        if (!isMousePressed || isPlaying) return;
        updateNode(row, col);
    };

    const handleMouseUp = () => {
        setIsMousePressed(false);
    };

    const updateNode = (row, col) => {
        if (mode === 'wall') {
            if ((row === startNode.row && col === startNode.col) || (row === endNode.row && col === endNode.col)) return;
            const newGrid = [...grid];
            newGrid[row][col].isWall = !newGrid[row][col].isWall;
            setGrid(newGrid);
        } else if (mode === 'start') {
            if (row === endNode.row && col === endNode.col) return;
            const newGrid = [...grid];
            newGrid[startNode.row][startNode.col].isStart = false;
            newGrid[row][col].isStart = true;
            newGrid[row][col].isWall = false;
            setStartNode({ row, col });
            setGrid(newGrid);
        } else if (mode === 'end') {
            if (row === startNode.row && col === startNode.col) return;
            const newGrid = [...grid];
            newGrid[endNode.row][endNode.col].isEnd = false;
            newGrid[row][col].isEnd = true;
            newGrid[row][col].isWall = false;
            setEndNode({ row, col });
            setGrid(newGrid);
        }
    };

    const runPathfinding = () => {
        stopAnimation();
        resetVisuals();

        let result;
        if (algorithm === 'bfs') result = bfs(grid, startNode, endNode, allowDiagonals);
        else if (algorithm === 'dfs') result = dfs(grid, startNode, endNode, allowDiagonals);
        else if (algorithm === 'dijkstra') result = dijkstra(grid, startNode, endNode, allowDiagonals);
        else if (algorithm === 'astar') result = astar(grid, startNode, endNode, allowDiagonals);
        else if (algorithm === 'mst') result = primsMSTGrid(grid, startNode, allowDiagonals);

        if (result && result.steps && result.steps.length > 0) {
            const algoSteps = [...result.steps];
            if (result.path && result.path.length > 0) {
                algoSteps.push({
                    type: 'path',
                    path: result.path,
                    description: `Path found! Length: ${result.path.length}`
                });
            }
            setSteps(algoSteps);
            setCurrentStep(0);
            setIsPlaying(true);

            // Calculate stats for summary
            // Count unique visited nodes from steps (excluding path update steps purely)
            const visitedSet = new Set();
            result.steps.forEach(s => {
                if (s.node) visitedSet.add(`${s.node.row}-${s.node.col}`);
                if (s.to) visitedSet.add(`${s.to.row}-${s.to.col}`);
            });
            const stats = {
                visitedCount: visitedSet.size,
                pathLength: result.path ? result.path.length : 0
            };
            setSummary(generateSummary(algorithm, stats));
        } else {
            setDescription("No path found!");
            setSummary("No path could be found. The target might be unreachable due to walls.");
        }
    };

    const stopAnimation = () => {
        setIsPlaying(false);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const resetVisuals = () => {
        setVisitedNodes(new Set());
        setPathNodes(new Set());
        setCurrentStep(0);
        setDescription("Ready.");
        setSummary(null);
    };

    const generateSummary = (algo, stats) => {
        const { visitedCount, pathLength } = stats;
        switch (algo) {
            case 'bfs':
                return `BFS explores neighbors layer by layer. It visited ${visitedCount} nodes and found the shortest path of length ${pathLength}. It guarantees the shortest path because it expands equally in all directions (unweighted).`;
            case 'dfs':
                return `DFS explores as deep as possible along each branch before backtracking. It visited ${visitedCount} nodes. Note that DFS does not guarantee the shortest path, as seen here (path length: ${pathLength}).`;
            case 'dijkstra':
                return `Dijkstra's algorithm finds the shortest path by always picking the closest unvisited node. It explored ${visitedCount} nodes to find the optimal path of length ${pathLength}.`;
            case 'astar':
                return `A* uses a heuristic to guide the search towards the target, prioritizing nodes closer to the end. It visited ${visitedCount} nodes (often fewer than Dijkstra) and found a path of length ${pathLength}.`;
            case 'mst':
                return `Prim's algorithm connects all nodes with minimum total weight to form a Minimum Spanning Tree. It explored ${visitedCount} nodes. It does not look for a shortest path between two points, but rather a tree connecting the graph.`;
            default:
                return "Algorithm complete.";
        }
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
        }
        return () => clearInterval(timerRef.current);
    }, [isPlaying, speed, steps]);

    useEffect(() => {
        if (steps && steps.length > 0 && currentStep < steps.length) {
            const step = steps[currentStep];
            setDescription(step.description);
            setActiveLine(step.line || 0);

            if (step.type === 'path') {
                setPathNodes(new Set(step.path.map(n => `${n.row}-${n.col}`)));
            } else {
                setPathNodes(new Set());
            }

            if (step.type === 'visit' || step.type === 'enqueue' || step.type === 'push' || step.type === 'update' || step.type === 'mst-edge') {
                setVisitedNodes(prev => new Set([...prev, `${step.node?.row || step.to?.row}-${step.node?.col || step.to?.col}`]));
            }
        }
    }, [currentStep, steps]);

    return (
        <div className="min-h-screen bg-white p-6 md:p-12" onMouseUp={handleMouseUp}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link to="/visalgo" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-2 transition">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Algorithms
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Pathfinding Visualizer</h1>
                        <p className="text-gray-600 mt-2">Find the shortest path or spanning tree on a grid.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
                            <button onClick={() => setMode('wall')} className={`p-2 rounded transition ${mode === 'wall' ? 'bg-blue-100 text-blue-600 shadow-inner' : 'text-gray-600 hover:bg-gray-50'}`} title="Draw Walls"><Square className="w-5 h-5" /></button>
                            <button onClick={() => setMode('start')} className={`p-2 rounded transition ${mode === 'start' ? 'bg-green-100 text-green-600 shadow-inner' : 'text-gray-600 hover:bg-gray-50'}`} title="Move Start"><MapPin className="w-5 h-5" /></button>
                            <button onClick={() => setMode('end')} className={`p-2 rounded transition ${mode === 'end' ? 'bg-red-100 text-red-600 shadow-inner' : 'text-gray-600 hover:bg-gray-50'}`} title="Move End"><Flag className="w-5 h-5" /></button>
                        </div>

                        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
                            <input
                                type="checkbox"
                                id="diagonals"
                                checked={allowDiagonals}
                                onChange={(e) => setAllowDiagonals(e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="diagonals" className="text-sm font-medium text-gray-700 cursor-pointer">Allow Diagonals</label>
                        </div>

                        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="bfs">Breadth-First Search</option>
                            <option value="dfs">Depth-First Search</option>
                            <option value="dijkstra">Dijkstra's Algorithm</option>
                            <option value="astar">A* Search</option>
                            <option value="mst">Prim's MST (Grid)</option>
                        </select>

                        <button onClick={runPathfinding} className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${isPlaying ? 'bg-amber-100 text-amber-700' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'}`}>
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                            {isPlaying ? "Pause" : "Visualize"}
                        </button>

                        <button onClick={() => { setGrid(grid.map(row => row.map(node => ({ ...node, isWall: false })))); resetVisuals(); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="Reset Grid"><RotateCcw className="w-5 h-5" /></button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-gray-50 rounded-2xl border border-gray-200 p-4 overflow-auto shadow-inner h-[600px] flex items-center justify-center relative">
                        <div
                            className="grid gap-[1px] bg-gray-200 border border-gray-300 rounded overflow-hidden shadow-2xl"
                            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
                        >
                            {grid.map((row, rIdx) =>
                                row.map((node, cIdx) => {
                                    const key = `${rIdx}-${cIdx}`;
                                    const isVisited = visitedNodes.has(key);
                                    const isPath = pathNodes.has(key);

                                    let bgColor = "bg-white";
                                    if (node.isStart) bgColor = "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)] z-20 scale-105";
                                    else if (node.isEnd) bgColor = "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)] z-20 scale-105";
                                    else if (isPath) bgColor = "bg-amber-400 shadow-md scale-100 z-10 transition-colors duration-300";
                                    else if (node.isWall) bgColor = "bg-slate-800 scale-95 shadow-inner rounded-sm";
                                    else if (isVisited) bgColor = "bg-blue-400 animate-visit";

                                    return (
                                        <div
                                            key={key}
                                            className={`w-6 h-6 sm:w-8 sm:h-8 ${bgColor} transition-all duration-300 cursor-pointer relative`}
                                            onMouseDown={() => handleMouseDown(rIdx, cIdx)}
                                            onMouseEnter={() => handleMouseEnter(rIdx, cIdx)}
                                        ></div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1 h-[600px] flex flex-col gap-4">
                        <CodePanel
                            code={
                                algorithm === 'bfs' ? bfsCode :
                                    algorithm === 'dfs' ? dfsCode :
                                        algorithm === 'dijkstra' ? dijkstraCode :
                                            algorithm === 'mst' ? primsMSTCode : astarCode
                            }
                            activeLine={activeLine}
                        />
                        <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-5 shadow-sm h-full overflow-y-auto">
                            <div className="flex items-center gap-2 text-blue-700 font-bold mb-3">
                                <Info className="w-5 h-5" />
                                <span className="text-sm tracking-wide uppercase">Details</span>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-white/80 p-3 rounded-lg border border-blue-50 text-[10px] text-blue-800 italic">
                                    {description}
                                </div>

                                {summary && !isPlaying && (
                                    <div className="bg-green-50 border border-green-100 rounded-lg p-3 animate-fade-in">
                                        <h4 className="font-bold text-green-800 text-xs mb-1 flex items-center gap-1">
                                            <Info className="w-3 h-3" /> Algorithm Summary
                                        </h4>
                                        <p className="text-[10px] text-green-700 leading-relaxed font-medium">
                                            {summary}
                                        </p>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-gray-700 flex items-center gap-1"><Settings className="w-3 h-3 text-gray-400" /> Settings:</h4>
                                    <p className="text-[10px] text-gray-500">
                                        Allowing diagonals enables 8-way movement. In this mode, algorithms prioritize diagonal steps where appropriate (weight ~1.4).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes visit {
                    0% { transform: scale(0.3); background-color: rgba(0, 0, 66, 0.75); border-radius: 100%; }
                    50% { background-color: rgba(17, 104, 217, 0.75); }
                    100% { transform: scale(1); background-color: rgba(0, 190, 218, 0.75); }
                }
                .animate-visit {
                    animation-name: visit;
                    animation-duration: 1.5s;
                    animation-timing-function: ease-out;
                    animation-fill-mode: forwards;
                }
            `}} />
        </div>
    );
};

export default PathfindingVisualizer;
