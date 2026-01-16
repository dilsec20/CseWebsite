import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, FastForward, Sliders, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CodePanel from './CodePanel';
import { bubbleSort, bubbleSortCode, selectionSort, selectionSortCode, mergeSort, mergeSortCode } from './algorithms/sorting';

const SortingVisualizer = () => {
    // State
    const [array, setArray] = useState([]);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(100); // ms delay
    const [activeLine, setActiveLine] = useState(0);
    const [description, setDescription] = useState("Ready to sort!");
    const [highlights, setHighlights] = useState([]);
    const [colorType, setColorType] = useState(null); // 'compare', 'swap', 'sorted'
    const [algorithm, setAlgorithm] = useState('bubble');

    const timerRef = useRef(null);

    // Init Array
    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = (algo = algorithm) => {
        stopAnimation();
        const newArr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 90) + 10);
        setArray(newArr);
        setSteps([]);
        setCurrentStep(0);
        setActiveLine(0);
        setDescription("Ready to sort!");
        setHighlights([]);
        setColorType(null);

        // Pre-calculate steps
        let algoSteps = [];
        if (algo === 'bubble') algoSteps = bubbleSort(newArr);
        else if (algo === 'selection') algoSteps = selectionSort(newArr);
        else if (algo === 'merge') algoSteps = mergeSort(newArr);

        setSteps(algoSteps);
    };

    const stopAnimation = () => {
        setIsPlaying(false);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const runAnimation = () => {
        setIsPlaying((prev) => !prev);
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

    // Update View based on Current Step
    useEffect(() => {
        if (steps.length > 0 && currentStep < steps.length) {
            const step = steps[currentStep];
            setArray(step.array);
            setHighlights(step.highlight || []);
            setColorType(step.color);
            setActiveLine(step.line);
            setDescription(step.description);
        }
    }, [currentStep, steps]);

    // Handle Speed
    const handleSpeedChange = (e) => {
        setSpeed(1050 - e.target.value); // Invert scale: higher val = lower delay
    };

    return (
        <div className="min-h-screen bg-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link to="/visalgo" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-2 transition">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Algorithms
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Sorting Visualization</h1>
                        <p className="text-gray-600 mt-2">Visually trace the algorithm as it sorts the array.</p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                        <button
                            onClick={resetArray}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition"
                            title="Reset Array"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </button>

                        <select
                            value={algorithm}
                            onChange={(e) => {
                                setAlgorithm(e.target.value);
                                resetArray(e.target.value);
                            }}
                            className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                        >
                            <option value="bubble">Bubble Sort</option>
                            <option value="selection">Selection Sort</option>
                            <option value="merge">Merge Sort</option>
                        </select>

                        <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
                            <input
                                type="text"
                                placeholder="Custom Array (e.g. 10,2,5)"
                                className="w-48 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const values = e.target.value.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
                                        if (values.length > 0) {
                                            stopAnimation();
                                            const validValues = values.slice(0, 20); // Limit size
                                            setArray(validValues);

                                            // Recalculate steps with current algo
                                            let algoSteps = [];
                                            if (algorithm === 'bubble') algoSteps = bubbleSort(validValues);
                                            else if (algorithm === 'selection') algoSteps = selectionSort(validValues);
                                            else if (algorithm === 'merge') algoSteps = mergeSort(validValues);

                                            setSteps(algoSteps);
                                            setCurrentStep(0);
                                            setHighlights([]);
                                            setDescription(`Ready to ${algorithm} sort custom array!`);
                                        }
                                    }
                                }}
                            />
                            <span className="text-xs text-gray-400 hidden sm:block">Press Enter</span>
                        </div>

                        <button
                            onClick={runAnimation}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isPlaying
                                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                            {isPlaying ? "Pause" : "Play"}
                        </button>

                        <div className="w-px h-8 bg-gray-300 mx-2"></div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Speed</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">Slow</span>
                                <input
                                    type="range"
                                    min="50"
                                    max="1000"
                                    defaultValue="950"
                                    onChange={handleSpeedChange}
                                    className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <span className="text-xs text-gray-400">Fast</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
                    {/* Visual Panel */}
                    <div className="lg:col-span-2 bg-gray-50 rounded-2xl border border-gray-200 p-8 flex flex-col items-center justify-center relative shadow-inner">
                        <div className="absolute top-4 left-6 bg-white px-3 py-1 rounded-full border border-gray-200 text-sm font-medium text-gray-600 shadow-sm">
                            Step: {currentStep} / {steps.length > 0 ? steps.length - 1 : 0}
                        </div>
                        <div className="absolute top-4 right-6 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 text-sm font-medium text-blue-700 shadow-sm">
                            {description}
                        </div>

                        {/* Bars */}
                        <div className="flex items-end justify-center gap-2 w-full h-[400px]">
                            {array.map((value, idx) => {
                                let bgColor = 'bg-blue-500'; // Default
                                if (highlights.includes(idx)) {
                                    if (colorType === 'compare') bgColor = 'bg-yellow-400';
                                    if (colorType === 'swap') bgColor = 'bg-red-500';
                                    if (colorType === 'sorted') bgColor = 'bg-green-500';
                                }
                                // Keep sorted elements green even after pass
                                // Simplified approach: If logic ensures 'sorted' state persists in step array, this is fine.
                                // But our simple logic rebuilds array from step. Correct.

                                return (
                                    <div
                                        key={idx}
                                        style={{ height: `${value * 3.5}px` }}
                                        className={`w-12 md:w-16 rounded-t-lg transition-all duration-200 ease-in-out shadow-sm ${bgColor} flex items-end justify-center pb-2 text-white font-bold text-sm`}
                                    >
                                        {value}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 flex gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                                <span>Unsorted</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>
                                <span>Compare</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                                <span>Swap</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                                <span>Sorted</span>
                            </div>
                        </div>
                    </div>

                    {/* Code Panel */}
                    <div className="lg:col-span-1 h-full">
                        <CodePanel
                            code={
                                algorithm === 'bubble' ? bubbleSortCode :
                                    algorithm === 'selection' ? selectionSortCode : mergeSortCode
                            }
                            activeLine={activeLine}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortingVisualizer;
