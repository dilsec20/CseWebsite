import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft, ChevronLeft, ChevronRight, Info, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import CodePanel from './CodePanel';
import { convexHullCode, getConvexHullSteps } from './algorithms/convexhull';

const ConvexHullVisualizer = () => {
    const [points, setPoints] = useState([
        { x: 100, y: 150 }, { x: 250, y: 100 }, { x: 400, y: 300 },
        { x: 150, y: 400 }, { x: 300, y: 200 }, { x: 500, y: 150 }
    ]);
    const [hull, setHull] = useState([]);
    const [checking, setChecking] = useState(null);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(800);
    const [description, setDescription] = useState("Click on the canvas to add points.");
    const [activeLine, setActiveLine] = useState(0);

    const timerRef = useRef(null);
    const svgRef = useRef(null);

    const runGrahamScan = () => {
        if (points.length < 3) return;
        stopAnimation();
        const newSteps = getConvexHullSteps(points);
        setSteps(newSteps);
        setCurrentStep(0);
        setIsPlaying(true);
    };

    const stopAnimation = () => {
        setIsPlaying(false);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const handleCanvasClick = (e) => {
        if (isPlaying) return;
        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPoints([...points, { x, y }]);
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
            setPoints(step.points);
            setHull(step.hull);
            setChecking(step.checking || null);
            setDescription(step.description);
            setActiveLine(step.line);
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
                        <h1 className="text-3xl font-bold text-gray-900">Convex Hull (Graham Scan)</h1>
                        <p className="text-gray-600 mt-2">Geometric algorithms: Finding the smallest convex boundary.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                        <button onClick={runGrahamScan} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isPlaying ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                            {isPlaying ? "Pause" : "Build Hull"}
                        </button>

                        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                            <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={isPlaying || currentStep === 0} className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed transition"><ChevronLeft className="w-5 h-5" /></button>
                            <div className="w-px h-4 bg-gray-200 mx-1"></div>
                            <button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} disabled={isPlaying || (steps.length > 0 && currentStep === steps.length - 1)} className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed transition"><ChevronRight className="w-5 h-5" /></button>
                        </div>

                        <button onClick={() => { setPoints([]); setHull([]); stopAnimation(); setSteps([]); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="Clear"><RotateCcw className="w-5 h-5" /></button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
                    <div className="lg:col-span-2 bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden relative shadow-inner cursor-crosshair">
                        <div className="absolute top-4 left-6 z-10 bg-white px-3 py-1 rounded-full border border-gray-200 text-xs font-bold text-gray-400">CLICK TO ADD POINTS</div>
                        <div className="absolute top-4 right-6 z-10 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 text-sm font-medium text-blue-700 shadow-sm">{description}</div>

                        <svg ref={svgRef} className="w-full h-full" onClick={handleCanvasClick}>
                            {/* Points */}
                            {points.map((p, i) => (
                                <circle key={i} cx={p.x} cy={p.y} r="5" fill={checking === p ? "red" : "blue"} className="transition-all duration-300" />
                            ))}

                            {/* Convex Hull Lines */}
                            {hull.length > 1 && hull.map((p, i) => {
                                if (i === hull.length - 1) {
                                    if (steps.length > 0 && currentStep === steps.length - 1) {
                                        return <line key={i} x1={p.x} y1={p.y} x2={hull[0].x} y2={hull[0].y} stroke="#2563EB" strokeWidth="3" strokeDasharray="5,5" />;
                                    }
                                    return null;
                                }
                                const next = hull[i + 1];
                                return <line key={i} x1={p.x} y1={p.y} x2={next.x} y2={next.y} stroke="#2563EB" strokeWidth="3" />;
                            })}
                        </svg>
                    </div>

                    <div className="lg:col-span-1 h-full">
                        <CodePanel code={convexHullCode} activeLine={activeLine} />
                        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                                <Info className="w-4 h-4" />
                                <span className="text-sm">Things to Observe</span>
                            </div>
                            <p className="text-xs text-blue-600 leading-relaxed italic">
                                Graham Scan sorts points by polar angle relative to the bottom-most point. It then processes them, ensuring every turn is counter-clockwise. If a turn is clockwise, the middle point cannot be part of the convex hull!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConvexHullVisualizer;
