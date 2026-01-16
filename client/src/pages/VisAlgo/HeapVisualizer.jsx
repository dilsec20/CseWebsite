import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft, ChevronLeft, ChevronRight, Info, Plus, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import CodePanel from './CodePanel';
import { heapCode, getHeapSteps } from './algorithms/heap';

const HeapVisualizer = () => {
    const [arr, setArr] = useState([85, 70, 45, 30, 40, 20]);
    const [inputValue, setInputValue] = useState('');
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1000);
    const [description, setDescription] = useState("Max Heap ready.");
    const [activeLine, setActiveLine] = useState(0);
    const [highlights, setHighlights] = useState([]);
    const [colorType, setColorType] = useState('compare');

    const timerRef = useRef(null);

    const handleAction = (action) => {
        const val = parseInt(inputValue);
        if (isNaN(val) && action === 'insert') return;

        stopAnimation();
        const newSteps = getHeapSteps(arr, action, val);
        setSteps(newSteps);
        setCurrentStep(0);
        setIsPlaying(true);
        setInputValue('');
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
            setArr(step.array);
            setDescription(step.description);
            setActiveLine(step.line);
            setHighlights(step.highlight || []);
            setColorType(step.color || 'compare');
        }
    }, [currentStep, steps]);

    // Recursive helper to render nodes
    const renderHeapTree = (idx, x, y, level) => {
        if (idx >= arr.length) return null;

        const offset = 200 / (level + 1);
        const lIdx = 2 * idx + 1;
        const rIdx = 2 * idx + 2;

        let nodeColor = "bg-white border-blue-400";
        if (highlights.includes(idx)) {
            if (colorType === 'compare') nodeColor = "bg-yellow-100 border-yellow-500 scale-110 shadow-lg";
            if (colorType === 'swap') nodeColor = "bg-red-100 border-red-500 scale-110 shadow-lg";
            if (colorType === 'sorted') nodeColor = "bg-green-100 border-green-500";
        }

        return (
            <g key={idx}>
                {lIdx < arr.length && (
                    <line x1={x} y1={y} x2={x - offset} y2={y + 80} stroke="#9CA3AF" strokeWidth="2" />
                )}
                {rIdx < arr.length && (
                    <line x1={x} y1={y} x2={x + offset} y2={y + 80} stroke="#9CA3AF" strokeWidth="2" />
                )}
                <foreignObject x={x - 20} y={y - 20} width="40" height="40">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-300 ${nodeColor}`}>
                        {arr[idx]}
                    </div>
                </foreignObject>
                {renderHeapTree(lIdx, x - offset, y + 80, level + 1)}
                {renderHeapTree(rIdx, x + offset, y + 80, level + 1)}
            </g>
        );
    };

    return (
        <div className="min-h-screen bg-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link to="/visalgo" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-2 transition">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Algorithms
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Heap Visualization</h1>
                        <p className="text-gray-600 mt-2">Binary Heaps: Efficient priority queues and tree structure.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                        <input
                            type="number"
                            placeholder="Value"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <button onClick={() => handleAction('insert')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                            <Plus className="w-4 h-4" /> Insert
                        </button>
                        <button onClick={() => handleAction('build')} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
                            <Layers className="w-4 h-4" /> Build Heap
                        </button>

                        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                            <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={isPlaying || currentStep === 0} className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed transition"><ChevronLeft className="w-5 h-5" /></button>
                            <div className="w-px h-4 bg-gray-200 mx-1"></div>
                            <button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} disabled={isPlaying || (steps.length > 0 && currentStep === steps.length - 1)} className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed transition"><ChevronRight className="w-5 h-5" /></button>
                        </div>
                        <button onClick={() => { setArr([]); stopAnimation(); setSteps([]); }} className="p-2 text-gray-500 hover:bg-white rounded-lg transition"><RotateCcw className="w-5 h-5" /></button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
                    <div className="lg:col-span-2 bg-gray-50 rounded-2xl border border-gray-200 p-8 flex flex-col relative shadow-inner overflow-hidden">
                        <div className="absolute top-4 right-6 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 text-sm font-medium text-blue-700 shadow-sm">{description}</div>

                        <div className="flex-1 w-full flex items-center justify-center">
                            <svg className="w-full h-full min-h-[400px]">
                                {renderHeapTree(0, 350, 60, 0)}
                            </svg>
                        </div>

                        {/* Array View */}
                        <div className="w-full overflow-x-auto p-4 bg-white border-t border-gray-200 flex justify-center gap-2">
                            {arr.map((val, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <div className={`w-10 h-10 flex items-center justify-center border-2 rounded font-bold transition-all duration-300 ${highlights.includes(idx) ? 'bg-yellow-100 border-yellow-500 font-black' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                                        {val}
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-mono mt-1">{idx}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-1 h-full">
                        <CodePanel code={heapCode} activeLine={activeLine} />
                        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                                <Info className="w-4 h-4" />
                                <span className="text-sm">Things to Observe</span>
                            </div>
                            <p className="text-xs text-blue-600 leading-relaxed italic">
                                A Max Heap is a Complete Binary Tree where every parent is ≥ its children. In array form, for an index <code className="bg-blue-100 px-1 rounded">i</code>, its children are at <code className="bg-blue-100 px-1 rounded">2i+1</code> and <code className="bg-blue-100 px-1 rounded">2i+2</code>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeapVisualizer;
