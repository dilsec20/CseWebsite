import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import CodePanel from './CodePanel';
import { fibTable, dpCode } from './algorithms/dp';

const DPVisualizer = () => {
    const [n, setN] = useState(6);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1000);
    const [description, setDescription] = useState("Enter N to calculate Fibonacci(N)");
    const [activeLine, setActiveLine] = useState(0);

    // Visual State
    const [dpTable, setDpTable] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(null);
    const [highlights, setHighlights] = useState([]);

    const timerRef = useRef(null);

    useEffect(() => {
        reset();
    }, []);

    const reset = () => {
        stopAnimation();
        setSteps([]);
        setCurrentStep(0);
        setDpTable(new Array(parseInt(n) + 1).fill(null));
        setCurrentIdx(null);
        setHighlights([]);
        setDescription("Enter N to calculate Fibonacci(N)");
    };

    const handleCalculate = () => {
        const val = parseInt(n);
        if (isNaN(val) || val < 0 || val > 20) return; // Limit N for UI
        reset();

        const algoSteps = fibTable(val);
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
            setDescription(step.description);
            setActiveLine(step.line);
            setDpTable(step.dp);
            setCurrentIdx(step.current);
            setHighlights(step.highlight || []);
        }
    }, [currentStep, steps]);

    return (
        <div className="min-h-screen bg-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">DP Visualization</h1>
                        <p className="text-gray-600 mt-2">Fibonacci Sequence (Bottom-Up)</p>
                    </div>

                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600">N:</span>
                            <input
                                type="number"
                                min="0" max="20"
                                value={n}
                                onChange={(e) => setN(e.target.value)}
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                            />
                        </div>

                        <button
                            onClick={handleCalculate}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isPlaying
                                    ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                            {isPlaying ? "Pause" : "Play"}
                        </button>

                        <button
                            onClick={reset}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition"
                            title="Reset"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[500px]">
                    <div className="lg:col-span-2 bg-gray-50 rounded-2xl border border-gray-200 p-8 flex flex-col items-center justify-center relative shadow-inner">
                        <div className="absolute top-4 right-6 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 text-sm font-medium text-blue-700 shadow-sm">
                            {description}
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
                            {dpTable.map((val, idx) => {
                                let bgColor = 'bg-white border-gray-300';
                                if (idx === currentIdx) bgColor = 'bg-green-100 border-green-500 scale-110 shadow-md';
                                if (highlights.includes(idx)) bgColor = 'bg-yellow-100 border-yellow-400';

                                return (
                                    <div key={idx} className="flex flex-col items-center">
                                        <div className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 font-bold text-gray-700 transition-all duration-300 ${bgColor}`}>
                                            {val !== null ? val : '-'}
                                        </div>
                                        <span className="text-xs text-gray-400 mt-1">{idx}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="lg:col-span-1 h-full">
                        <CodePanel code={dpCode} activeLine={activeLine} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DPVisualizer;
