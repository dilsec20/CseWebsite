import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft, ChevronLeft, ChevronRight, Info, Plus, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import CodePanel from './CodePanel';
import { stackCode, queueCode, generateStackSteps, generateQueueSteps } from './algorithms/stackqueue';

const StackQueueVisualizer = () => {
    const [type, setType] = useState('stack'); // 'stack' or 'queue'
    const [items, setItems] = useState([10, 20, 30]);
    const [inputValue, setInputValue] = useState('');
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(800);
    const [description, setDescription] = useState("Ready.");
    const [activeLine, setActiveLine] = useState(0);
    const [highlightIdx, setHighlightIdx] = useState(null);

    const timerRef = useRef(null);

    const handleAction = (action) => {
        const val = parseInt(inputValue);
        if (isNaN(val) && (action === 'push' || action === 'enqueue')) return;

        stopAnimation();
        const newSteps = type === 'stack'
            ? generateStackSteps(items, action, val)
            : generateQueueSteps(items, action, val);

        setSteps(newSteps);
        setCurrentStep(0);
        setIsPlaying(true);
        if (action !== 'pop' && action !== 'dequeue') setInputValue('');
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
            setItems(step.items);
            setDescription(step.description);
            setActiveLine(step.line);
            setHighlightIdx(step.highlight);
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
                        <h1 className="text-3xl font-bold text-gray-900">Stack & Queue Visualization</h1>
                        <p className="text-gray-600 mt-2">Explore LIFO and FIFO ordering in fundamental data structures.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                        <select
                            value={type}
                            onChange={(e) => { setType(e.target.value); setItems([]); stopAnimation(); setSteps([]); }}
                            className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="stack">Stack (LIFO)</option>
                            <option value="queue">Queue (FIFO)</option>
                        </select>

                        <input
                            type="number"
                            placeholder="Value"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        <button onClick={() => handleAction(type === 'stack' ? 'push' : 'enqueue')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                            <ArrowDownToLine className="w-4 h-4" /> {type === 'stack' ? 'Push' : 'Enqueue'}
                        </button>
                        <button onClick={() => handleAction(type === 'stack' ? 'pop' : 'dequeue')} className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition">
                            <ArrowUpFromLine className="w-4 h-4" /> {type === 'stack' ? 'Pop' : 'Dequeue'}
                        </button>

                        <div className="w-px h-8 bg-gray-300 mx-1"></div>

                        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                            <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={isPlaying || currentStep === 0} className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed transition"><ChevronLeft className="w-5 h-5" /></button>
                            <div className="w-px h-4 bg-gray-200 mx-1"></div>
                            <button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} disabled={isPlaying || (steps.length > 0 && currentStep === steps.length - 1)} className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed transition"><ChevronRight className="w-5 h-5" /></button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[550px]">
                    <div className="lg:col-span-2 bg-gray-50 rounded-2xl border border-gray-200 p-8 flex flex-col items-center justify-center relative shadow-inner overflow-hidden">
                        <div className="absolute top-4 right-6 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 text-sm font-medium text-blue-700 shadow-sm">{description}</div>

                        {type === 'stack' ? (
                            <div className="flex flex-col-reverse items-center gap-2 w-48 border-x-4 border-b-4 border-gray-300 p-4 min-h-[300px] rounded-b-2xl bg-white shadow-sm">
                                {items.map((item, idx) => (
                                    <div key={idx} className={`w-full h-12 flex items-center justify-center rounded-lg border-2 font-bold text-xl transition-all duration-300 ${idx === highlightIdx ? 'bg-yellow-100 border-yellow-500 scale-105' : 'bg-blue-50 border-blue-200'}`}>
                                        {item}
                                    </div>
                                ))}
                                {items.length === 0 && <div className="text-gray-300 italic absolute top-1/2">Empty Stack</div>}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 p-4 h-24 border-y-4 border-gray-300 min-w-[400px] bg-white shadow-sm relative">
                                <div className="absolute -left-12 font-bold text-gray-400">FRONT (Out)</div>
                                {items.map((item, idx) => (
                                    <div key={idx} className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 font-bold text-xl transition-all duration-300 ${idx === highlightIdx ? 'bg-yellow-100 border-yellow-500 scale-105' : 'bg-green-50 border-green-200'}`}>
                                        {item}
                                    </div>
                                ))}
                                {items.length === 0 && <div className="text-gray-300 italic mx-auto">Empty Queue</div>}
                                <div className="absolute -right-12 font-bold text-gray-400">BACK (In)</div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1 h-full">
                        <CodePanel code={type === 'stack' ? stackCode : queueCode} activeLine={activeLine} />
                        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                                <Info className="w-4 h-4" />
                                <span className="text-sm">Things to Observe</span>
                            </div>
                            <p className="text-xs text-blue-600 leading-relaxed italic">
                                {type === 'stack'
                                    ? "Stack is LIFO (Last-In, First-Out). Like a pile of plates, you can only add or remove from the very top."
                                    : "Queue is FIFO (First-In, First-Out). Like a line at a store, the first person to arrive is the first to be served."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StackQueueVisualizer;
