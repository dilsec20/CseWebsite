import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft, ChevronLeft, ChevronRight, Info, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import CodePanel from './CodePanel';
import { linkedListCode, generateLinkedListSteps } from './algorithms/linkedlist';

const LinkedListVisualizer = () => {
    const [nodes, setNodes] = useState([
        { id: 1, value: 10 },
        { id: 2, value: 20 },
        { id: 3, value: 30 }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1000);
    const [description, setDescription] = useState("Linked List ready.");
    const [activeLine, setActiveLine] = useState(0);
    const [highlightId, setHighlightId] = useState(null);
    const [checkingId, setCheckingId] = useState(null);

    const timerRef = useRef(null);

    const handleAction = (action) => {
        const val = parseInt(inputValue);
        if (isNaN(val) && action !== 'delete') return; // Delete can be by value

        stopAnimation();
        const newSteps = generateLinkedListSteps(nodes, action, { value: val });
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
            setNodes(step.nodes);
            setDescription(step.description);
            setActiveLine(step.line);
            setHighlightId(step.currentNode);
            setCheckingId(step.checkingNode);
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
                        <h1 className="text-3xl font-bold text-gray-900">Linked List Visualization</h1>
                        <p className="text-gray-600 mt-2">Dynamic data structures: Pointers and Nodes.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                        <input
                            type="number"
                            placeholder="Value"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <button onClick={() => handleAction('insertTail')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                            <Plus className="w-4 h-4" /> Insert
                        </button>
                        <button onClick={() => handleAction('delete')} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition">
                            <Trash2 className="w-4 h-4" /> Delete
                        </button>

                        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                            <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={isPlaying || currentStep === 0} className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed transition"><ChevronLeft className="w-5 h-5" /></button>
                            <div className="w-px h-4 bg-gray-200 mx-1"></div>
                            <button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} disabled={isPlaying || (steps.length > 0 && currentStep === steps.length - 1)} className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed transition"><ChevronRight className="w-5 h-5" /></button>
                        </div>

                        <button onClick={() => { setNodes([]); stopAnimation(); setSteps([]); }} className="p-2 text-gray-500 hover:bg-white rounded-lg transition"><RotateCcw className="w-5 h-5" /></button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[550px]">
                    <div className="lg:col-span-2 bg-gray-50 rounded-2xl border border-gray-200 p-8 flex flex-col items-center justify-center relative shadow-inner overflow-x-auto">
                        <div className="absolute top-4 right-6 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 text-sm font-medium text-blue-700 shadow-sm">{description}</div>

                        <div className="flex items-center gap-8 min-w-full justify-center">
                            {nodes.map((node, idx) => (
                                <React.Fragment key={node.id}>
                                    <div className={`relative flex flex-col items-center justify-center w-16 h-16 rounded-xl border-4 font-bold text-xl transition-all duration-300 ${node.id === highlightId ? 'bg-yellow-100 border-yellow-500 scale-110 shadow-lg' : node.id === checkingId ? 'bg-red-50 border-red-400' : 'bg-white border-blue-400 shadow-sm'}`}>
                                        {node.value}
                                        <div className="absolute -bottom-6 text-xs text-gray-400 font-mono">Next ➔</div>
                                        {idx === 0 && <div className="absolute -top-6 text-xs font-bold text-blue-600">HEAD</div>}
                                    </div>
                                    {idx < nodes.length - 1 && (
                                        <div className="w-12 h-1 bg-gray-300 relative">
                                            <div className="absolute -right-1 -top-1 border-t-4 border-r-4 border-gray-300 w-3 h-3 rotate-45"></div>
                                        </div>
                                    )}
                                    {idx === nodes.length - 1 && (
                                        <div className="flex flex-col items-center ml-2">
                                            <div className="w-8 h-1 bg-gray-300"></div>
                                            <span className="text-[10px] font-bold text-gray-400">NULL</span>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                            {nodes.length === 0 && <div className="text-gray-400 italic">List is empty. Add some nodes!</div>}
                        </div>
                    </div>

                    <div className="lg:col-span-1 h-full">
                        <CodePanel code={linkedListCode} activeLine={activeLine} />
                        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                                <Info className="w-4 h-4" />
                                <span className="text-sm">Things to Observe</span>
                            </div>
                            <p className="text-xs text-blue-600 leading-relaxed italic">
                                Elements in a Linked List are not stored in contiguous memory. Each node contains "Data" and a "Next" pointer. To access the 5th element, you must traverse from the Head!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkedListVisualizer;
