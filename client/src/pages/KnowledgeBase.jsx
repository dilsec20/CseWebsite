import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Code, ArrowRight } from 'lucide-react';
import { API_URL } from '../config';

const KnowledgeBase = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const getQuizzes = async () => {
            try {
                const response = await fetch(`${API_URL}/api/quizzes`);
                const jsonData = await response.json();
                setQuizzes(jsonData);
            } catch (err) {
                console.error(err.message);
            }
        };
        getQuizzes();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Knowledge Base</h1>
                        <p className="text-gray-600 text-lg">Master the fundamentals with our curated quizzes.</p>
                    </div>
                    <Link to="/dashboard" className="text-blue-600 hover:underline font-medium">Back to Dashboard</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Categories - Now clickable! */}
                    <Link to="/theory/aptitude" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-300 transition cursor-pointer">
                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <Brain className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Aptitude</h3>
                        <p className="text-gray-500 mb-2">Quantitative analysis and logical thinking problems.</p>
                        <p className="text-blue-600 text-sm font-medium">Click to view theory →</p>
                    </Link>
                    <Link to="/theory/cs-fundamentals" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-purple-300 transition cursor-pointer">
                        <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <Code className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">CS Fundamentals</h3>
                        <p className="text-gray-500 mb-2">OS, DBMS, CN, and OOPs concepts.</p>
                        <p className="text-purple-600 text-sm font-medium">Click to view theory →</p>
                    </Link>
                    <Link to="/theory/reasoning" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-300 transition cursor-pointer">
                        <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <BookOpen className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Reasoning</h3>
                        <p className="text-gray-500 mb-2">Verbal and non-verbal reasoning tests.</p>
                        <p className="text-green-600 text-sm font-medium">Click to view theory →</p>
                    </Link>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Quizzes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz) => (
                        <div key={quiz.quiz_id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:border-blue-300 transition group">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                                        {quiz.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">{quiz.title}</h3>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-2">{quiz.description}</p>

                                <Link
                                    to={`/quiz/${quiz.quiz_id}`}
                                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                                >
                                    Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KnowledgeBase;
