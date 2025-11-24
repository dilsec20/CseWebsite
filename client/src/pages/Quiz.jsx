import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowLeft, Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

const Quiz = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState(null);
    const [answers, setAnswers] = useState({}); // { question_id: option_id }
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getQuiz = async () => {
            try {
                const response = await fetch(`${API_URL}/api/quizzes/${id}`);
                if (!response.ok) throw new Error("Failed to fetch quiz");
                const jsonData = await response.json();
                setQuizData(jsonData);
            } catch (err) {
                console.error(err.message);
                toast.error("Could not load quiz");
            } finally {
                setLoading(false);
            }
        };
        getQuiz();
    }, [id]);

    const handleOptionSelect = (questionId, optionId) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionId
        }));
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Please login to submit");
                return;
            }

            const response = await fetch(`${API_URL}/api/quizzes/${id}/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                body: JSON.stringify({ answers })
            });

            const parseRes = await response.json();
            setResult(parseRes);
            window.scrollTo(0, 0);
        } catch (err) {
            console.error(err.message);
            toast.error("Submission failed");
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader className="animate-spin h-8 w-8 text-blue-600" /></div>;
    if (!quizData) return <div className="p-8">Quiz not found</div>;

    const { quiz, questions } = quizData;

    if (result) {
        const percentage = Math.round((result.score / result.total) * 100);

        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Score Summary */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 text-center">
                        <div className="mb-6 flex justify-center">
                            {percentage >= 70 ? (
                                <CheckCircle className="h-20 w-20 text-green-500" />
                            ) : percentage >= 40 ? (
                                <CheckCircle className="h-20 w-20 text-yellow-500" />
                            ) : (
                                <XCircle className="h-20 w-20 text-red-500" />
                            )}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
                        <p className="text-gray-500 mb-6">Your Score</p>
                        <div className="text-6xl font-black text-blue-600 mb-2">
                            {result.score} <span className="text-3xl text-gray-400 font-medium">/ {result.total}</span>
                        </div>
                        <div className="text-2xl font-semibold text-gray-700 mb-8">
                            {percentage}%
                        </div>
                        <div className="flex gap-4 justify-center mb-6">
                            <div className="bg-green-50 px-6 py-3 rounded-lg">
                                <div className="text-sm text-green-600 font-medium">Correct</div>
                                <div className="text-2xl font-bold text-green-700">{result.score}</div>
                            </div>
                            <div className="bg-red-50 px-6 py-3 rounded-lg">
                                <div className="text-sm text-red-600 font-medium">Wrong</div>
                                <div className="text-2xl font-bold text-red-700">{result.total - result.score}</div>
                            </div>
                        </div>
                    </div>

                    {/* Answer Review */}
                    <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Answer Review</h3>
                        <div className="space-y-6">
                            {questions.map((q, index) => {
                                const userAnswer = answers[q.question_id];
                                const correctOption = q.options.find(opt => opt.is_correct);
                                const userOption = q.options.find(opt => opt.option_id === userAnswer);
                                const isCorrect = userOption?.is_correct;

                                return (
                                    <div key={q.question_id} className={`p-6 rounded-lg border-2 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                                        {/* Question Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <h4 className="text-lg font-medium text-gray-900 flex-1">
                                                <span className="text-gray-500 mr-2">{index + 1}.</span>
                                                {q.question_text}
                                            </h4>
                                            {isCorrect ? (
                                                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 ml-4" />
                                            ) : (
                                                <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 ml-4" />
                                            )}
                                        </div>

                                        {/* User's Answer */}
                                        <div className="mb-3">
                                            <span className="text-sm font-semibold text-gray-700">Your Answer: </span>
                                            <span className={`text-sm font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                                {userOption ? userOption.option_text : 'Not answered'}
                                            </span>
                                        </div>

                                        {/* Correct Answer (if wrong) */}
                                        {!isCorrect && (
                                            <div className="bg-white p-3 rounded border-l-4 border-green-500">
                                                <span className="text-sm font-semibold text-green-700">Correct Answer: </span>
                                                <span className="text-sm font-medium text-green-800">{correctOption.option_text}</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => {
                                setResult(null);
                                setAnswers({});
                            }}
                            className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            Retake Quiz
                        </button>
                        <button
                            onClick={() => navigate('/knowledge-base')}
                            className="flex-1 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
                        >
                            Back to Knowledge Base
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <button onClick={() => navigate('/knowledge-base')} className="text-gray-500 hover:text-gray-900 flex items-center mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">{quiz.title}</h1>
                    <p className="text-gray-500 mt-2">{quiz.description}</p>
                </div>

                <div className="space-y-6">
                    {questions.map((q, index) => (
                        <div key={q.question_id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                <span className="text-gray-400 mr-2">{index + 1}.</span>
                                {q.question_text}
                            </h3>
                            <div className="space-y-3">
                                {q.options.map((opt) => (
                                    <label
                                        key={opt.option_id}
                                        className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${answers[q.question_id] === opt.option_id
                                            ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                                            : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${q.question_id}`}
                                            value={opt.option_id}
                                            checked={answers[q.question_id] === opt.option_id}
                                            onChange={() => handleOptionSelect(q.question_id, opt.option_id)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-3 text-gray-700">{opt.option_text}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
                    >
                        Submit Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
