import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CodePanel from './CodePanel';
import { binarySearch, binarySearchCode } from './algorithms/search';

const BinarySearchVisualizer = () => {
    const [array, setArray] = useState([]);
    const [target, setTarget] = useState(null);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1000);

    // Step State
    const [low, setLow] = useState(null);
    const [high, setHigh] = useState(null);
    const [mid, setMid] = useState(null);
    const [description, setDescription] = useState("Enter a target and click Search");
    const [foundIndex, setFoundIndex] = useState(null);
    const [activeLine, setActiveLine] = useState(0);

    const timerRef = useRef(null);

    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        stopAnimation();
        // Generate sorted array
        const newArr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 90) + 10).sort((a, b) => a - b);
        setArray(newArr);
        setSteps([]);
        setCurrentStep(0);
        setLow(null);
        setHigh(null);
        setMid(null);
        setFoundIndex(null);
        setActiveLine(0);
        setTarget(null);
        setDescription("Enter a target and click Search");
    };

    const startSearch = () => {
        if (target === null || target === "") return;
        stopAnimation();

        const algoSteps = binarySearch(array, parseInt(target));
        setSteps(algoSteps);
        setCurrentStep(0);
        setIsPlaying(true);
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
            setLow(step.low);
            setHigh(step.high);
            setMid(step.mid);
            setDescription(step.description);
            setActiveLine(step.line);

            if (step.found !== null && step.found !== -1) {
                setFoundIndex(step.found);
            } else if (step.found === -1) {
                // Not found
            }
        }
    }, [currentStep, steps]);

    return (
        <div className="min-h-screen bg-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link to="/visalgo" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-2 transition">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Algorithms
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Binary Search Visualization</h1>
                        <p className="text-gray-600 mt-2">Divide and conquer! See how O(log n) search works on a sorted array.</p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                        <button
                            onClick={resetArray}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition"
                            title="New Array"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 border-l border-gray-300 pl-4 border-r pr-4 mr-4">
                            <input
                                type="text"
                                placeholder="Custom: 1,3,5"
                                className="w-32 px-2 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const values = e.target.value.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
                                        if (values.length > 0) {
                                            stopAnimation();
                                            const validValues = values.slice(0, 20).sort((a, b) => a - b);
                                            setArray(validValues);
                                            setSteps([]);
                                            setCurrentStep(0);
                                            setLow(null); setHigh(null); setMid(null); setFoundIndex(null); setTarget(null);
                                            setDescription("Array updated. Enter target.");
                                        }
                                    }
                                }}
                            />
                        </div>

                        <input
                            type="number"
                            placeholder="Target"
                            value={target || ''}
                            onChange={(e) => setTarget(e.target.value)}
                            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        <button
                            onClick={startSearch}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            Search
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[500px]">
                    {/* Visual Panel */}
                    <div className="lg:col-span-2 bg-gray-50 rounded-2xl border border-gray-200 p-8 flex flex-col items-center justify-center relative shadow-inner">
                        <div className="absolute top-4 right-6 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 text-sm font-medium text-blue-700 shadow-sm">
                            {description}
                        </div>

                        <div className="flex items-center justify-center gap-2 w-full flex-wrap">
                            {array.map((value, idx) => {
                                let bgColor = 'bg-white border-2 border-gray-300';

                                // Range Highlight
                                if (low !== null && high !== null && idx >= low && idx <= high) {
                                    bgColor = 'bg-blue-50 border-2 border-blue-200';
                                }

                                // Pointers
                                if (idx === mid) bgColor = 'bg-yellow-100 border-2 border-yellow-400';
                                if (idx === foundIndex) bgColor = 'bg-green-100 border-2 border-green-500';

                                return (
                                    <div key={idx} className="flex flex-col items-center gap-2">
                                        <div
                                            className={`w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center font-bold text-gray-700 shadow-sm transition-all duration-300 ${bgColor}`}
                                        >
                                            {value}
                                        </div>
                                        <div className="text-xs font-mono text-gray-400">
                                            {idx}
                                        </div>

                                        {/* Pointer Labels */}
                                        <div className="h-4 text-[10px] font-bold uppercase tracking-wider">
                                            {idx === low && <span className="text-blue-600">Low</span>}
                                            {idx === high && <span className="text-blue-600">High</span>}
                                            {idx === mid && <span className="text-yellow-600">Mid</span>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Code Panel */}
                    <div className="lg:col-span-1 h-full">
                        <CodePanel code={binarySearchCode} activeLine={activeLine} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BinarySearchVisualizer;
