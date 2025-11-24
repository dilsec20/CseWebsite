import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calculator } from 'lucide-react';

const AptitudeTheory = () => {
    const topics = [
        {
            title: "Percentage",
            sections: [
                {
                    name: "Basic Concepts",
                    theory: "Percentage means 'per hundred'. A percentage is a fraction or ratio expressed as a part of 100.\n\nKey Points:\n• To convert fraction to percentage: multiply by 100\n• To convert percentage to fraction: divide by 100\n• To find percentage of a number: (percentage/100) × number",
                    example: "Convert 3/4 to percentage:\n3/4 × 100 = 75%\n\n25% of 80:\n(25/100) × 80 = 20",
                    formula: "Percentage = (Part/Whole) × 100%\nValue = (Percentage/100) × Total\nWhole = (Part × 100)/Percentage"
                },
                {
                    name: "Percentage Change",
                    theory: "Percentage Increase/Decrease shows relative change in values.\n\nTrick: If price increases by X% and then decreases by X%, net effect is always a LOSS of X²/100%",
                    example: "Price ₹500 increased to ₹600:\nIncrease% = [(600-500)/500] × 100 = 20%\n\nIf price increases 10% then decreases 10%:\nNet change = -(10²/100) = -1% (1% loss)",
                    formula: "% Increase = [(New - Old)/Old] × 100\n% Decrease = [(Old - New)/Old] × 100\nNew Value = Old × (100 ± %)/100"
                },
                {
                    name: "Successive Percentages",
                    theory: "When two percentage changes occur one after another.\n\nTrick: For a% then b%, net change = a + b + (ab/100)",
                    example: "Population increases 10% then 20%:\nNet = 10 + 20 + (10×20/100) = 32% increase\n\nPrice decreases 20% then 10%:\nNet = -20 + (-10) + (-20×-10/100) = -28% (28% decrease)",
                    formula: "Net% = a + b + (ab/100)\nIf decrease, use negative values"
                }
            ]
        },
        {
            title: "Ratio & Proportion",
            sections: [
                {
                    name: "Ratio Basics",
                    theory: "Ratio compares quantities. a:b means a/b.\n\nImportant:\n• Ratio has no units\n• a:b = ka:kb (multiply by same number)\n• If a:b = c:d, then a/b = c/d",
                    example: "If A:B = 2:3 and B:C = 4:5\nFind A:B:C\n\nMake B same: A:B = 8:12 and B:C = 12:15\nTherefore A:B:C = 8:12:15",
                    formula: "a:b = a/b\nCompounded ratio: (a:b)(c:d) = ac:bd\nDuplicate ratio: a²:b²\nTriplicate ratio: a³:b³"
                },
                {
                    name: "Proportion",
                    theory: "When two ratios are equal: a:b = c:d\n\nTypes:\n• Direct Proportion: a∝b (a increases, b increases)\n• Inverse Proportion: a∝1/b (a increases, b decreases)",
                    example: "10 workers build wall in 6 days\n15 workers will take how many days?\n\nInverse proportion:\n10×6 = 15×x\nx = 4 days",
                    formula: "a:b = c:d → ad = bc (cross multiplication)\nDirect: a₁/b₁ = a₂/b₂\nInverse: a₁b₁ = a₂b₂"
                }
            ]
        },
        {
            title: "Time & Work",
            sections: [
                {
                    name: "Basic Formulas",
                    theory: "Work = Rate × Time\n\nKey Rules:\n• If A does work in n days, A's 1 day work = 1/n\n• If A and B's 1 day work = 1/a and 1/b, together = 1/a + 1/b\n• Time together = 1/(1/a + 1/b) = ab/(a+b)",
                    example: "A completes in 10 days, B in 15 days\nTogether:\n1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6\nTime = 6 days",
                    formula: "Work = Rate × Time\nRate = Work/Time\nTime = Work/Rate\nTogether: 1/T = 1/a + 1/b"
                },
                {
                    name: "Man-Days Concept",
                    theory: "Total work = Men × Days\n\nImportant:\n• M₁D₁ = M₂D₂ (same work)\n• M₁D₁H₁ = M₂D₂H₂ (with hours)\n• Efficiency matters: M₁D₁E₁ = M₂D₂E₂",
                    example: "10 men, 8 hours/day, 12 days\nHow many men for 6 hours/day, 16 days?\n\n10×8×12 = M×6×16\nM = 960/96 = 10 men",
                    formula: "M₁D₁H₁ = M₂D₂H₂\nWork ∝ Men × Days × Hours"
                },
                {
                    name: "Pipes & Cisterns",
                    theory: "Inlet pipe fills tank (positive work)\nOutlet pipe empties tank (negative work)\n\nTrick: Treat inlet as +ve, outlet as -ve",
                    example: "Pipe A fills in 10 hrs, B empties in 15 hrs\nTogether:\n1/10 - 1/15 = 3/30 - 2/30 = 1/30\nTime = 30 hours",
                    formula: "Net rate = Inlet rate - Outlet rate\nTime = 1/(1/inlet - 1/outlet)"
                }
            ]
        },
        {
            title: "Speed, Distance & Time",
            sections: [
                {
                    name: "Basic Formulas",
                    theory: "Speed = Distance/Time\n\nUnits:\n• km/hr to m/s: multiply by 5/18\n• m/s to km/hr: multiply by 18/5",
                    example: "Convert 72 km/hr to m/s:\n72 × 5/18 = 20 m/s\n\nConvert 15 m/s to km/hr:\n15 × 18/5 = 54 km/hr",
                    formula: "Speed = Distance/Time\nDistance = Speed × Time\nTime = Distance/Speed\nkm/hr = m/s × 18/5"
                },
                {
                    name: "Average Speed",
                    theory: "Average Speed = Total Distance / Total Time\n\nTrick for equal distances:\nIf speed s₁ first half, s₂ second half:\nAvg = 2s₁s₂/(s₁+s₂) [Harmonic Mean]",
                    example: "60 km at 30 km/hr, 60 km at 60 km/hr\nTotal distance = 120 km\nTotal time = 60/30 + 60/60 = 2+1 = 3 hrs\nAvg = 120/3 = 40 km/hr\n\nOR: 2×30×60/(30+60) = 40 km/hr",
                    formula: "Avg Speed = Total Dist/Total Time\nEqual distances: 2s₁s₂/(s₁+s₂)"
                },
                {
                    name: "Relative Speed",
                    theory: "Same direction: Relative speed = |s₁ - s₂|\nOpposite direction: Relative speed = s₁ + s₂\n\nTrick: Imagine standing on moving object",
                    example: "Train 120m, speed 45 km/hr, overtakes person walking 9 km/hr same direction:\nRelative = 45-9 = 36 km/hr = 10 m/s\nTime = 120/10 = 12 seconds",
                    formula: "Same dir: |v₁ - v₂|\nOpposite: v₁ + v₂\nTime to cross = Total length/Relative speed"
                },
                {
                    name: "Trains Problem",
                    theory: "When train crosses:\n• Pole/Person: Distance = Length of train\n• Platform/Bridge: Distance = Train + Platform length\n• Another train: Distance = Sum of both lengths",
                    example: "Train 200m crosses 400m platform at 60 km/hr:\nDistance = 200+400 = 600m\nSpeed = 60×5/18 = 50/3 m/s\nTime = 600÷(50/3) = 36 seconds",
                    formula: "Cross pole: time = L/v\nCross platform: time = (L+P)/v\nCross train: time = (L₁+L₂)/relative_speed"
                }
            ]
        },
        {
            title: "Profit & Loss",
            sections: [
                {
                    name: "Basic Concepts",
                    theory: "CP = Cost Price, SP = Selling Price, MP = Marked Price\n\nProfit when SP > CP\nLoss when CP > SP",
                    example: "CP = ₹500, SP = ₹600\nProfit = 600-500 = ₹100\nProfit% = (100/500)×100 = 20%\n\nCP = ₹800, SP = ₹700\nLoss = 800-700 = ₹100\nLoss% = (100/800)×100 = 12.5%",
                    formula: "Profit = SP - CP\nLoss = CP - SP\nProfit% = (Profit/CP)×100\nLoss% = (Loss/CP)×100"
                },
                {
                    name: "SP, CP, Profit%",
                    theory: "When profit% given:\nSP = CP × (100+Profit%)/100\n\nWhen loss% given:\nSP = CP × (100-Loss%)/100",
                    example: "CP = ₹1000, Profit 15%:\nSP = 1000 × 115/100 = ₹1150\n\nSP = ₹900, Loss 10%:\nCP = 900 × 100/90 = ₹1000",
                    formula: "SP = CP(100±P%)/100\nCP = SP×100/(100±P%)\n'+' for profit, '-' for loss"
                },
                {
                    name: "Discount",
                    theory: "Discount = Reduction on Marked Price\nSP = MP - Discount\n\nTrick: Discount% always on MP, Profit/Loss% always on CP",
                    example: "MP = ₹2000, Discount 20%:\nDiscount = 2000×20/100 =₹400\nSP = 2000-400 = ₹1600\n\nMP ₹1500, two discounts 10% & 5%:\n= 1500×90/100×95/100 = ₹1282.50",
                    formula: "Discount% = (Discount/MP)×100\nSP = MP(100-D%)/100\nSuccessive: MP×(100-d₁)/100×(100-d₂)/100"
                },
                {
                    name: "Dishonest Dealer",
                    theory: "Dealer claims to sell at CP but:\n• Uses false weights\n• Mixes inferior quality\n\nProfit% = [(Error/True) × 100]%",
                    example: "Dealer uses 900g weight instead of 1kg:\nProfit% = (100/900)×100 = 11.11%\n\nSells at 10% profit but uses 920g:\nTotal = 10 + (80/920)×100 = 18.7% profit",
                    formula: "Profit% = [(Error/True weight)×100]\nWith price difference: Multiply effects"
                }
            ]
        },
        {
            title: "Simple & Compound Interest",
            sections: [
                {
                    name: "Simple Interest",
                    theory: "Interest calculated only on principal.\n\nSI = (P×R×T)/100\n\nAmount = P + SI",
                    example: "Principal ₹5000, Rate 10% p.a., Time 2 years:\nSI = (5000×10×2)/100 = ₹1000\nAmount = 5000+1000 = ₹6000",
                    formula: "SI = (P×R×T)/100\nP = (SI×100)/(R×T)\nR = (SI×100)/(P×T)\nT = (SI×100)/(P×R)"
                },
                {
                    name: "Compound Interest",
                    theory: "Interest calculated on principal + previous interest.\n\nA = P(1 + R/100)ⁿ\nCI = A - P\n\nTrick: For 2 years, CI - SI = P(R/100)²",
                    example: "P = ₹10000, R = 10%, n = 2 years:\nA = 10000(1.1)² = ₹12100\nCI = 12100-10000 = ₹2100\n\nSI = (10000×10×2)/100 = ₹2000\nDifference = ₹100",
                    formula: "A = P(1+R/100)ⁿ\nCI = P[(1+R/100)ⁿ - 1]\nCI-SI for 2 yrs = P(R/100)²"
                }
            ]
        },
        {
            title: "Mixtures & Alligations",
            sections: [
                {
                    name: "Alligation Method",
                    theory: "To find ratio of two quantities mixed to get desired mean price/concentration.\n\nRule of Alligation:\nCheaper : Dearer = (D-M) : (M-C)\nwhere C=Cheaper, D=Dearer, M=Mean",
                    example: "Mix ₹20/kg rice with ₹30/kg to get ₹24/kg:\nC=20, D=30, M=24\nRatio = (30-24):(24-20) = 6:4 = 3:2\n\nMix 3 kg @₹20 with 2 kg @₹30",
                    formula: "Cheaper:Dearer = (D-M):(M-C)\nWhere M = Mean price"
                },
                {
                    name: "Replacement",
                    theory: "When part of mixture is replaced:\nAfter n operations:\nFinal = Initial × (1 - R/T)ⁿ\n\nR = Replaced quantity, T = Total quantity",
                    example: "40L milk, 4L replaced with water repeatedly 3 times:\nMilk left = 40×(1-4/40)³\n= 40×(9/10)³\n= 40×0.729 = 29.16 L",
                    formula: "After n replacements:\nQuantity = Initial×(1-R/T)ⁿ"
                }
            ]
        },
        {
            title: "Ages",
            sections: [
                {
                    name: "Age Problems",
                    theory: "Key Points:\n• If age ratio is a:b, actual ages = ax and bx\n• X years ago: current age - X\n• X years hence: current age + X\n• Age difference remains constant",
                    example: "A:B = 5:3, Sum = 80\nAges = 5x and 3x\n5x + 3x = 80\n8x = 80, x = 10\nA = 50, B = 30\n\n10 years ago: A=40, B=20\nRatio = 40:20 = 2:1",
                    formula: "Present ages from ratio: ax, bx\nX years ago: current - X\nX years later: current + X\nDifference = constant"
                }
            ]
        },
        {
            title: "Averages",
            sections: [
                {
                    name: "Basic Average",
                    theory: "Average = Sum of observations / Number of observations\n\nTrick: If all numbers increase/decrease by x, average also changes by x",
                    example: "Numbers: 10, 20, 30, 40, 50\nAverage = (10+20+30+40+50)/5 = 30\n\nIf each increased by 5:\nNew avg = 30+5 = 35",
                    formula: "Avg = Sum/n\nSum = Avg × n\nn = Sum/Avg"
                },
                {
                    name: "Weighted Average",
                    theory: "When quantities have different weights/frequencies.\n\nWeighted Avg = Σ(value × weight) / Σweight",
                    example: "60 kg avg weight of 30 students\n70 kg avg of 20 students\nCombined avg = (60×30 + 70×20)/(30+20)\n= (1800+1400)/50 = 64 kg",
                    formula: "Weighted Avg = Σ(xᵢwᵢ)/Σwᵢ"
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Aptitude - Complete Theory</h1>
                        <p className="text-gray-600">Comprehensive formulas, tricks, and concepts for placement preparation</p>
                    </div>
                    <Link to="/knowledge-base" className="flex items-center text-blue-600 hover:underline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Link>
                </div>

                <div className="space-y-8">
                    {topics.map((topic, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
                                <div className="flex items-center">
                                    <Calculator className="h-8 w-8 text-white mr-3" />
                                    <h2 className="text-2xl font-bold text-white">{topic.title}</h2>
                                </div>
                            </div>

                            <div className="p-6 space-y-6">
                                {topic.sections.map((section, sIdx) => (
                                    <div key={sIdx} className="border-l-4 border-cyan-500 pl-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{section.name}</h3>

                                        <div className="mb-4">
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">📖 Theory</h4>
                                            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{section.theory}</p>
                                        </div>

                                        <div className="mb-4 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                            <h4 className="text-sm font-semibold text-green-700 uppercase mb-2">💡 Examples</h4>
                                            <pre className="text-gray-800 whitespace-pre-wrap font-mono text-sm leading-relaxed">{section.example}</pre>
                                        </div>

                                        {section.formula && (
                                            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                                <h4 className="text-sm font-semibold text-blue-700 uppercase mb-2">📐 Formulas</h4>
                                                <pre className="text-blue-900 font-mono text-sm whitespace-pre-wrap font-semibold leading-relaxed">{section.formula}</pre>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
                    <h3 className="text-lg font-bold text-yellow-900 mb-2">⚡ Quick Tips</h3>
                    <ul className="list-disc list-inside text-yellow-900 space-y-1">
                        <li>Practice mental calculation for faster solving</li>
                        <li>Memorize squares up to 30, cubes up to 15</li>
                        <li>Learn percentage-decimal-fraction conversions</li>
                        <li>Use options to verify your answer quickly</li>
                        <li>Time management: Don't spend 2 min per question</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AptitudeTheory;
