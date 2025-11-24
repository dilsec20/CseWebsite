import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain } from 'lucide-react';

const ReasoningTheory = () => {
    const topics = [
        {
            title: "Verbal Reasoning",
            sections: [
                {
                    name: "Analogies",
                    theory: "Finding relationships between pairs of words. Common types: Synonym, Antonym, Part-Whole, Category, Function.",
                    example: "Book : Author :: Painting : Artist\n(Relationship: Created by)\n\nWheel : Car :: Wing : Airplane\n(Relationship: Part of)",
                    formula: "A : B :: C : D\nFind the relationship between A and B, then apply to C to find D"
                },
                {
                    name: "Syllogism",
                    theory: "Drawing conclusions from given statements using logical deduction. Use Venn diagrams for clarity.",
                    example: "All cats are animals.\nSome animals are pets.\nConclusion: Some cats MAY be pets (not definite).\n\nAll students are hardworking.\nRam is a student.\nConclusion: Ram is hardworking (definite).",
                    formula: "All A are B + All B are C → All A are C\nSome A are B + All B are C → Some A are C"
                }
            ]
        },
        {
            title: "Series & Sequences",
            sections: [
                {
                    name: "Number Series",
                    theory: "Find the pattern in numbers. Common patterns: +n, ×n, squares, cubes, alternating operations.",
                    example: "2, 4, 8, 16, 32, __?\nPattern: ×2 (each term doubles)\nAnswer: 64\n\n1, 4, 9, 16, 25, __?\nPattern: n² (perfect squares)\nAnswer: 36",
                    formula: "Arithmetic: a, a+d, a+2d, ...\nGeometric: a, ar, ar², ...\nSquares: 1², 2², 3², 4², ..."
                },
                {
                    name: "Letter Series",
                    theory: "Find alphabet patterns. Common: +n positions, alternating, skipping letters.",
                    example: "A, C, E, G, I, __?\nPattern: +2 positions\nAnswer: K\n\nABC, DEF, GHI, __?\nPattern: Groups of 3\nAnswer: JKL",
                    formula: "Track: Position changes, gaps, alternating patterns"
                }
            ]
        },
        {
            title: "Coding-Decoding",
            sections: [
                {
                    name: "Letter Shifting",
                    theory: "Letters are shifted forward/backward in alphabet by fixed positions.",
                    example: "If CAT = DBU, what is DOG?\nPattern: Each letter +1 position\nD→E, O→P, G→H\nAnswer: EPH",
                    formula: "Find shift value (forward/backward)\nApply same shift to decode"
                },
                {
                    name: "Number Coding",
                    theory: "Each letter assigned a number based on position or pattern.",
                    example: "If A=1, B=2, C=3...\nCAT = 3 + 1 + 20 = 24\nDOG = 4 + 15 + 7 = 26",
                    formula: "A=1, B=2, C=3, ..., Z=26\nOr reverse: A=26, B=25, ..."
                }
            ]
        },
        {
            title: "Blood Relations",
            sections: [
                {
                    name: "Basic Relations",
                    theory: "Mother/Father: Parents\nSon/Daughter: Children\nBrother/Sister: Siblings\nUncle/Aunt: Parents' siblings\nNephew/Niece: Siblings' children",
                    example: "A is B's father. B is C's sister.\nWhat is A to C?\nAnswer: Father (B and C are siblings, A is their father)",
                    formula: "Draw family tree\nMark generations\nTrace relationships"
                },
                {
                    name: "Complex Relations",
                    theory: "Mother's/Father's side: Maternal/Paternal\nIn-laws: Spouse's family",
                    example: "A's mother's brother's son = A's maternal cousin\nA's father's sister = A's paternal aunt",
                    formula: "Maternal = Mother's side\nPaternal = Father's side\nIn-law = Through marriage"
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Reasoning - Theory & Concepts</h1>
                        <p className="text-gray-600">Master logical and verbal reasoning with clear examples</p>
                    </div>
                    <Link to="/knowledge-base" className="flex items-center text-blue-600 hover:underline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Knowledge Base
                    </Link>
                </div>

                <div className="space-y-8">
                    {topics.map((topic, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6">
                                <div className="flex items-center">
                                    <Brain className="h-8 w-8 text-white mr-3" />
                                    <h2 className="text-2xl font-bold text-white">{topic.title}</h2>
                                </div>
                            </div>

                            <div className="p-6 space-y-6">
                                {topic.sections.map((section, sIdx) => (
                                    <div key={sIdx} className="border-l-4 border-teal-500 pl-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{section.name}</h3>

                                        <div className="mb-4">
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Theory</h4>
                                            <p className="text-gray-700 whitespace-pre-line">{section.theory}</p>
                                        </div>

                                        <div className="mb-4 bg-green-50 p-4 rounded-lg">
                                            <h4 className="text-sm font-semibold text-green-700 uppercase mb-2">Examples</h4>
                                            <pre className="text-gray-800 whitespace-pre-wrap font-mono text-sm">{section.example}</pre>
                                        </div>

                                        {section.formula && (
                                            <div className="bg-blue-50 p-4 rounded-lg">
                                                <h4 className="text-sm font-semibold text-blue-700 uppercase mb-2">Key Points / Approach</h4>
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

export default ReasoningTheory;
