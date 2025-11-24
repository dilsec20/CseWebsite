import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';

const CSFundamentalsTheory = () => {
    const topics = [
        {
            title: "Operating Systems",
            sections: [
                {
                    name: "Process vs Thread",
                    theory: "A process is a program in execution with its own memory space, while a thread is a lightweight process that shares memory with other threads of the same process.",
                    example: "Example: Chrome browser runs as a process, and each tab runs as a separate thread within that process.",
                    formula: "Context Switch Time = Time to save state + Time to restore state"
                },
                {
                    name: "CPU Scheduling",
                    theory: "CPU scheduling determines which process gets CPU time. Common algorithms: FCFS, SJF, Round Robin, Priority.",
                    example: "Round Robin: Each process gets a fixed time quantum (e.g., 10ms) before switching to the next.",
                    formula: "Turnaround Time = Completion Time - Arrival Time\nWaiting Time = Turnaround Time - Burst Time"
                }
            ]
        },
        {
            title: "Database Management Systems",
            sections: [
                {
                    name: "Normalization",
                    theory: "Normalization is organizing data to reduce redundancy. Forms: 1NF (atomic values), 2NF (no partial dependency), 3NF (no transitive dependency), BCNF.",
                    example: "1NF: Each cell contains only one value.\n2NF: Non-key attributes fully depend on primary key.\n3NF: No transitive dependencies.",
                    formula: "1NF → 2NF → 3NF → BCNF"
                },
                {
                    name: "ACID Properties",
                    theory: "Atomicity: All or nothing\nConsistency: Valid state transitions\nIsolation: Concurrent transactions don't interfere\nDurability: Committed data persists",
                    example: "Bank transfer: Debit from A and Credit to B must both succeed or both fail (Atomicity).",
                    formula: "ACID = Atomicity + Consistency + Isolation + Durability"
                }
            ]
        },
        {
            title: "Object-Oriented Programming",
            sections: [
                {
                    name: "Four Pillars of OOP",
                    theory: "1. Encapsulation: Bundling data and methods\n2. Inheritance: Reusing code from parent class\n3. Polymorphism: Same interface, different implementation\n4. Abstraction: Hiding complex details",
                    example: "class Animal { speak() } → class Dog extends Animal { speak() { bark } }",
                    formula: "OOP = Encapsulation + Inheritance + Polymorphism + Abstraction"
                },
                {
                    name: "Access Modifiers",
                    theory: "Public: Accessible everywhere\nPrivate: Only within the class\nProtected: Within class and subclasses",
                    example: "private int age; // Can only be accessed within the class",
                    formula: "Visibility: Public > Protected > Private"
                }
            ]
        },
        {
            title: "Data Structures",
            sections: [
                {
                    name: "Time Complexity",
                    theory: "Big-O notation describes worst-case time complexity.\nO(1) - Constant\nO(log n) - Logarithmic\nO(n) - Linear\nO(n log n) - Linearithmic\nO(n²) - Quadratic",
                    example: "Array access: O(1)\nBinary Search: O(log n)\nLinear Search: O(n)\nMerge Sort: O(n log n)\nBubble Sort: O(n²)",
                    formula: "O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)"
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">CS Fundamentals - Theory</h1>
                        <p className="text-gray-600">Comprehensive concepts with examples and formulas</p>
                    </div>
                    <Link to="/knowledge-base" className="flex items-center text-blue-600 hover:underline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Knowledge Base
                    </Link>
                </div>

                <div className="space-y-8">
                    {topics.map((topic, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
                                <div className="flex items-center">
                                    <BookOpen className="h-8 w-8 text-white mr-3" />
                                    <h2 className="text-2xl font-bold text-white">{topic.title}</h2>
                                </div>
                            </div>

                            <div className="p-6 space-y-6">
                                {topic.sections.map((section, sIdx) => (
                                    <div key={sIdx} className="border-l-4 border-blue-500 pl-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{section.name}</h3>

                                        <div className="mb-4">
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Theory</h4>
                                            <p className="text-gray-700 whitespace-pre-line">{section.theory}</p>
                                        </div>

                                        <div className="mb-4 bg-green-50 p-4 rounded-lg">
                                            <h4 className="text-sm font-semibold text-green-700 uppercase mb-2">Example</h4>
                                            <pre className="text-gray-800 whitespace-pre-wrap font-mono text-sm">{section.example}</pre>
                                        </div>

                                        {section.formula && (
                                            <div className="bg-blue-50 p-4 rounded-lg">
                                                <h4 className="text-sm font-semibold text-blue-700 uppercase mb-2">Formula / Key Points</h4>
                                                <pre className="text-blue-900 font-mono text-sm whitespace-pre-wrap">{section.formula}</pre>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CSFundamentalsTheory;
