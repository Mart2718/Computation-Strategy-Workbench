/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  RotateCcw, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight,
  School,
  Brain,
  Info,
  ChevronLeft
} from 'lucide-react';
import { InlineMath } from 'react-katex';

// --- Types ---

type StrategyType = 'left-to-right' | 'compensation' | 'bridging' | 'compatible';

interface Problem {
  id: number;
  a: number;
  b: number;
  operator: '+' | '-';
  targetResult: number;
  suggestedStrategies: StrategyType[];
}

interface Step {
  label: string;
  description: React.ReactNode;
  action: () => void;
  isCompleted: boolean;
  visualization?: React.ReactNode;
}

// --- Data ---

const STRATEGIES: Record<StrategyType, { name: string; description: string; pedagogicalGoal: string }> = {
  'left-to-right': {
    name: 'Left-to-Right',
    description: 'Add or subtract the largest place values first (hundreds, then tens, then ones).',
    pedagogicalGoal: 'Builds understanding of place value and magnitude before fine-tuning with smaller units.'
  },
  'compensation': {
    name: 'Compensation',
    description: 'Adjust one number to a "friendly" multiple of 10, calculate, then adjust the result.',
    pedagogicalGoal: 'Develops number sense and flexibility by seeing numbers as adjustable units.'
  },
  'bridging': {
    name: 'Breaking Up & Bridging',
    description: 'Keep the first number whole and add/subtract the second number in chunks (jumps).',
    pedagogicalGoal: 'Visualizes the number line and strengthens mental "jumps" between numbers.'
  },
  'compatible': {
    name: 'Compatible Numbers',
    description: 'Look for pairs of numbers that are easy to combine (sum to 10 or 100).',
    pedagogicalGoal: 'Trains the eye to see patterns and decomposition within complex problems.'
  }
};

const PROBLEMS: Problem[] = [
  { id: 1, a: 67, b: 36, operator: '+', targetResult: 103, suggestedStrategies: ['bridging', 'compatible', 'left-to-right'] },
  { id: 2, a: 93, b: 38, operator: '-', targetResult: 55, suggestedStrategies: ['compensation', 'bridging'] },
  { id: 3, a: 197, b: 248, operator: '+', targetResult: 445, suggestedStrategies: ['compensation'] },
  { id: 4, a: 67, b: 29, operator: '+', targetResult: 96, suggestedStrategies: ['compensation', 'bridging'] },
  { id: 5, a: 47, b: 39, operator: '+', targetResult: 86, suggestedStrategies: ['left-to-right', 'bridging'] },
  { id: 6, a: 124, b: 45, operator: '-', targetResult: 79, suggestedStrategies: ['bridging', 'compensation'] },
  { id: 7, a: 82, b: 37, operator: '-', targetResult: 45, suggestedStrategies: ['compensation', 'left-to-right'] },
];

// --- Components ---

const InstructorGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const videoId = "0U1VS61uKyA"; 
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&rel=0`;
  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIframeSrc(embedUrl);
    } else {
      setIframeSrc("");
    }
  }, [isOpen, embedUrl]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[90vw] max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            aria-expanded={isOpen}
          >
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-indigo-600 text-white shadow-md">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                <span className="font-bold">Instructor Guide</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close Guide"
              >
                <ChevronRight className="w-5 h-5 rotate-90" />
              </button>
            </div>
            
            <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-inner ring-1 ring-slate-200">
                {iframeSrc && (
                  <iframe
                    src={iframeSrc}
                    title="Instructor Video: Mental Math Strategies"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
              
              <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100 shadow-sm">
                <div className="flex items-center gap-2 text-indigo-700 font-bold mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span className="text-sm">Check Your Thinking</span>
                </div>
                <div className="text-sm text-slate-700 leading-relaxed italic">
                  "How does Howie's approach to the <InlineMath math={"38 + 97"} /> problem compare to the 'Compensation' strategy we have here? Which one feels more intuitive for a 2nd grader?"
                </div>
              </div>

              <div className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
                <div className="h-px w-8 bg-slate-200"></div>
                Pedagogical Reflection
                <div className="h-px w-8 bg-slate-200"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
          isOpen ? 'bg-slate-800 text-white' : 'bg-indigo-600 text-white ring-4 ring-indigo-100'
        }`}
        aria-label={isOpen ? "Close Instructor Guide" : "Open Instructor Guide"}
        id="instructor-guide-toggle"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <ChevronRight className="w-6 h-6 rotate-90" />
            </motion.div>
          ) : (
            <motion.div
              key="video"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative"
            >
              <Lightbulb className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

const NumberLine = ({ start, jumps, targetResult, operator }: { start: number, jumps: { value: number, label: string }[], targetResult: number, operator: '+' | '-' }) => {
  const minVal = Math.min(start, targetResult) - 10;
  const maxVal = Math.max(start, targetResult) + 10;
  const range = maxVal - minVal;
  
  const getPos = (val: number) => ((val - minVal) / range) * 100;

  return (
    <div className="relative h-32 w-full mt-8 px-4 bg-slate-50/50 rounded-xl border border-slate-100 flex items-center">
      {/* Base Line */}
      <div className="absolute left-4 right-4 h-0.5 bg-slate-300"></div>
      
      {/* Ticks & Numbers */}
      {[minVal, start, targetResult, maxVal].map((val, i) => (
        <div key={i} className="absolute flex flex-col items-center" style={{ left: `${getPos(val)}%` }}>
          <div className="h-4 w-0.5 bg-slate-400"></div>
          <span className="text-xs font-mono text-slate-500 mt-1">{val}</span>
        </div>
      ))}

      {/* Jumps */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <AnimatePresence>
          {jumps.map((jump, i) => {
            const prevVal = i === 0 ? start : start + jumps.slice(0, i).reduce((sum, j) => sum + (operator === '+' ? j.value : -j.value), 0);
            const nextVal = prevVal + (operator === '+' ? jump.value : -jump.value);
            
            const x1 = `${getPos(prevVal)}%`;
            const x2 = `${getPos(nextVal)}%`;
            
            return (
              <motion.g 
                key={i}
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 0.5, delay: i * 0.3 }}
              >
                <path
                  d={`M ${prevVal} 60 Q ${(prevVal + nextVal) / 2} 20 ${nextVal} 60`}
                  fill="none"
                  stroke={operator === '+' ? "#10b981" : "#ef4444"}
                  strokeWidth="2"
                  className="transition-all duration-500"
                  style={{ transform: `scaleX(${1/range * 100})`, transformOrigin: 'left' }}
                />
                {/* Simplified Path for React SVG coordinate mapping */}
                <motion.path
                   d={`M ${getPos(prevVal)}% 64 Q ${(getPos(prevVal) + getPos(nextVal)) / 2}% 20 ${getPos(nextVal)}% 64`}
                   fill="none"
                   stroke={operator === '+' ? "#10b981" : "#ef4444"}
                   strokeWidth="3"
                   strokeDasharray="5,5"
                />
                <text 
                  x={`${(getPos(prevVal) + getPos(nextVal)) / 2}%`} 
                  y="20" 
                  className="text-[10px] font-bold fill-slate-600"
                  textAnchor="middle"
                >
                  {operator}{jump.value}
                </text>
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>
    </div>
  );
};

export default function App() {
  const [currentProblemIdx, setCurrentProblemIdx] = useState(0);
  const [selectedStrategy, setSelectedStrategy] = useState<StrategyType | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);
  const [showPedagogicalNote, setShowPedagogicalNote] = useState(false);

  const problem = PROBLEMS[currentProblemIdx];

  const resetStrategy = () => {
    setSelectedStrategy(null);
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  const nextProblem = () => {
    setCurrentProblemIdx((prev) => (prev + 1) % PROBLEMS.length);
    resetStrategy();
  };

  const prevProblem = () => {
    setCurrentProblemIdx((prev) => (prev - 1 + PROBLEMS.length) % PROBLEMS.length);
    resetStrategy();
  };

  // --- Strategy Logic ---

  const stepsForStrategy = useMemo((): Step[] => {
    if (!selectedStrategy) return [];

    switch (selectedStrategy) {
      case 'left-to-right':
        if (problem.operator === '+') {
          const aTens = Math.floor(problem.a / 10) * 10;
          const aOnes = problem.a % 10;
          const bTens = Math.floor(problem.b / 10) * 10;
          const bOnes = problem.b % 10;
          
          return [
            {
              label: 'Add the tens',
              description: (
                <span>
                  Focus on the tens place: <InlineMath math={`${aTens} + ${bTens} = ${aTens + bTens}`} />
                </span>
              ),
              action: () => {},
              isCompleted: completedSteps[0] || false
            },
            {
              label: 'Add the ones',
              description: (
                <span>
                  Now the ones place: <InlineMath math={`${aOnes} + ${bOnes} = ${aOnes + bOnes}`} />
                </span>
              ),
              action: () => {},
              isCompleted: completedSteps[1] || false
            },
            {
              label: 'Combine',
              description: (
                <span>
                  Add the partial sums: <InlineMath math={`${aTens + bTens} + ${aOnes + bOnes} = ${problem.targetResult}`} />
                </span>
              ),
              action: () => {},
              isCompleted: completedSteps[2] || false
            }
          ];
        } else {
          const aTens = Math.floor(problem.a / 10) * 10;
          const aOnes = problem.a % 10;
          const bTens = Math.floor(problem.b / 10) * 10;
          const bOnes = problem.b % 10;
          return [
            {
              label: 'Subtract the tens',
              description: (
                <span>
                  Focus on the tens: <InlineMath math={`${aTens} - ${bTens} = ${aTens - bTens}`} />
                </span>
              ),
              action: () => {},
              isCompleted: completedSteps[0] || false
            },
            {
              label: 'Subtract the ones',
              description: (
                <span>
                  Now the ones: <InlineMath math={`${aOnes} - ${bOnes} = ${aOnes - bOnes}`} />
                </span>
              ),
              action: () => {},
              isCompleted: completedSteps[1] || false
            },
            {
              label: 'Adjust Result',
              description: (
                <span>
                  Combine the parts: <InlineMath math={`${aTens - bTens} + (${aOnes - bOnes}) = ${problem.targetResult}`} />
                </span>
              ),
              action: () => {},
              isCompleted: completedSteps[2] || false
            }
          ];
        }

      case 'bridging': {
        const bTens = Math.floor(problem.b / 10) * 10;
        const bOnes = problem.b % 10;
        
        return [
          {
            label: 'Break apart the second number',
            description: (
              <span>
                Break <InlineMath math={problem.b.toString()} /> into <InlineMath math={bTens.toString()} /> and <InlineMath math={bOnes.toString()} />. We'll bridge the 3 gaps.
              </span>
            ),
            action: () => {},
            isCompleted: completedSteps[0] || false
          },
          {
            label: 'Bridge the Tens',
            description: (
              <span>
                Start at <InlineMath math={problem.a.toString()} /> and jump <InlineMath math={`${problem.operator}${bTens}`} />.
              </span>
            ),
            action: () => {},
            isCompleted: completedSteps[1] || false,
            visualization: (
              <NumberLine 
                start={problem.a} 
                operator={problem.operator}
                jumps={[{ value: bTens, label: `+${bTens}` }]} 
                targetResult={problem.operator === '+' ? problem.a + bTens : problem.a - bTens} 
              />
            )
          },
          {
            label: 'Bridge the Ones',
            description: (
              <span>
                From there, jump the remaining <InlineMath math={`${problem.operator}${bOnes}`} />.
              </span>
            ),
            action: () => {},
            isCompleted: completedSteps[2] || false,
             visualization: (
              <NumberLine 
                start={problem.a} 
                operator={problem.operator}
                jumps={[
                    { value: bTens, label: `${problem.operator}${bTens}` },
                    { value: bOnes, label: `${problem.operator}${bOnes}` }
                ]} 
                targetResult={problem.targetResult} 
              />
            )
          }
        ];
      }

      case 'compensation': {
        const nextTen = Math.ceil(problem.b / 10) * 10;
        const diff = nextTen - problem.b;
        
        if (problem.operator === '+') {
          return [
            {
              label: 'Round to Friendly Number',
              description: (
                <span>
                  <InlineMath math={problem.b.toString()} /> is very close to <InlineMath math={nextTen.toString()} />. Let's add <InlineMath math={nextTen.toString()} /> instead.
                </span>
              ),
              action: () => {},
              isCompleted: completedSteps[0] || false
            },
            {
              label: 'Calculate with Friendly Number',
              description: (
                <span>
                  <InlineMath math={`${problem.a} + ${nextTen} = ${problem.a + nextTen}`} />
                </span>
              ),
              action: () => {},
              isCompleted: completedSteps[1] || false
            },
            {
              label: 'Compensate',
              description: (
                <span>
                  We added <InlineMath math={diff.toString()} /> too many. Subtract <InlineMath math={diff.toString()} /> to find the final answer: <InlineMath math={`${problem.a + nextTen} - ${diff} = ${problem.targetResult}`} />
                </span>
              ),
              action: () => {},
              isCompleted: completedSteps[2] || false
            }
          ];
        } else {
          // Equal Addition compensation for subtraction: 47-29 = 48-30
          return [
            {
              label: 'Round up to Friendly Number',
              description: (
                <span>
                  <InlineMath math={problem.b.toString()} /> is close to <InlineMath math={nextTen.toString()} />. Let's add <InlineMath math={diff.toString()} /> to it to get <InlineMath math={nextTen.toString()} />.
                </span>
              ),
              action: () => {},
              isCompleted: completedSteps[0] || false
            },
            {
              label: 'Equal Addition',
              description: (
                <span>
                  To keep the difference the same, we must also add <InlineMath math={diff.toString()} /> to <InlineMath math={problem.a.toString()} />. <InlineMath math={`${problem.a} + ${diff} = ${problem.a + diff}`} />
                </span>
              ),
              action: () => {},
              isCompleted: completedSteps[1] || false
            },
            {
              label: 'New Problem',
              description: (
                <span>
                  Now solve the easier problem: <InlineMath math={`${problem.a + diff} - ${nextTen} = ${problem.targetResult}`} />
                </span>
              ),
              action: () => {},
              isCompleted: completedSteps[2] || false
            }
          ];
        }
      }

      case 'compatible': {
        const nextTenVal = Math.ceil(problem.a / 10) * 10;
        const prevTenVal = Math.floor(problem.a / 10) * 10;
        
        if (problem.operator === '+') {
          const needs = nextTenVal - problem.a;
          const rest = problem.b - needs;
          return [
            {
              label: 'Identify Friendly Number',
              description: (
                <span>
                  <InlineMath math={problem.a.toString()} /> is close to <InlineMath math={nextTenVal.toString()} />. It needs <InlineMath math={needs.toString()} /> to get there.
                </span>
              ),
              action: () => {},
              isCompleted: completedSteps[0] || false
            },
            {
              label: 'Decompose',
              description: (
                <span>
                  Break <InlineMath math={problem.b.toString()} /> into <InlineMath math={needs.toString()} /> and <InlineMath math={rest.toString()} />.
                </span>
              ),
              action: () => {},
              isCompleted: completedSteps[1] || false
            },
            {
              label: 'Friendly Sum',
              description: (
                <span>
                  <InlineMath math={`${problem.a} + ${needs} = ${nextTenVal}`} />. Now add the rest: <InlineMath math={`${nextTenVal} + ${rest} = ${problem.targetResult}`} />
                </span>
              ),
              action: () => {},
              isCompleted: completedSteps[2] || false,
              visualization: (
                <NumberLine 
                  start={problem.a} 
                  operator={'+'}
                  jumps={[
                      { value: needs, label: `+${needs}` },
                      { value: rest, label: `+${rest}` }
                  ]} 
                  targetResult={problem.targetResult} 
                />
              )
            }
          ];
        } else {
          const takes = problem.a - prevTenVal;
          const rest = problem.b - takes;
          return [
            {
              label: 'Identify Friendly Number',
              description: (
                <span>
                  Let's get <InlineMath math={problem.a.toString()} /> down to <InlineMath math={prevTenVal.toString()} />. We need to take away <InlineMath math={takes.toString()} />.
                </span>
              ),
              action: () => {},
              isCompleted: completedSteps[0] || false
            },
            {
              label: 'Decompose',
              description: (
                <span>
                  Break the total subtrahend <InlineMath math={problem.b.toString()} /> into <InlineMath math={takes.toString()} /> and <InlineMath math={rest.toString()} />.
                </span>
              ),
              action: () => {},
              isCompleted: completedSteps[1] || false
            },
            {
              label: 'Friendly Difference',
              description: (
                <span>
                  <InlineMath math={`${problem.a} - ${takes} = ${prevTenVal}`} />. Now subtract the rest: <InlineMath math={`${prevTenVal} - ${rest} = ${problem.targetResult}`} />
                </span>
              ),
              action: () => {},
              isCompleted: completedSteps[2] || false,
              visualization: (
                <NumberLine 
                  start={problem.a} 
                  operator={'-'}
                  jumps={[
                      { value: takes, label: `-${takes}` },
                      { value: rest, label: `-${rest}` }
                  ]} 
                  targetResult={problem.targetResult} 
                />
              )
            }
          ];
        }
      }

      default:
        return [];
    }
  }, [selectedStrategy, problem, completedSteps]);

  const handleNextStep = () => {
    if (currentStep < stepsForStrategy.length) {
      const newCompleted = [...completedSteps];
      newCompleted[currentStep] = true;
      setCompletedSteps(newCompleted);
      setCurrentStep(prev => prev + 1);
    }
  };

  const isStrategySolved = currentStep >= stepsForStrategy.length && selectedStrategy !== null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <School className="w-8 h-8 text-indigo-600" />
              Strategy Workbench
            </h1>
            <p className="text-slate-500 mt-1">Deepening pedagogical confidence at Santa Ana College.</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-full border border-slate-200 shadow-sm">
            <button 
              onClick={prevProblem}
              className="p-1.5 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-indigo-600"
              title="Previous Challenge"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 px-2 border-x border-slate-100">
              <Brain className="w-4 h-4 text-indigo-500" />
              <span className="font-semibold text-sm whitespace-nowrap">Challenge {currentProblemIdx + 1}/{PROBLEMS.length}</span>
            </div>
            <button 
              onClick={nextProblem}
              className="p-1.5 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-indigo-600"
              title="Next Challenge"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Problem Card */}
        <section className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center">
          <span className="bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
            Current Problem
          </span>
          <div className="text-7xl md:text-8xl font-black text-slate-800 tracking-tight flex items-center gap-4">
            <InlineMath math={`${problem.a} ${problem.operator} ${problem.b}`} />
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {!selectedStrategy ? (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-slate-500 italic"
              >
                Choose a strategy to begin...
              </motion.p>
            ) : (
              <div className="flex flex-col items-center gap-4">
                 <button 
                  onClick={resetStrategy}
                  className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:underline underline-offset-4"
                >
                  <RotateCcw className="w-4 h-4" /> Change Strategy
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Strategy Workbench */}
        <AnimatePresence mode="wait">
          {!selectedStrategy ? (
            <motion.div 
              key="selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {(Object.keys(STRATEGIES) as StrategyType[]).map((type) => {
                const isSuggested = problem.suggestedStrategies.includes(type);
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedStrategy(type)}
                    className={`group relative text-left p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                      isSuggested 
                        ? 'border-indigo-100 bg-white hover:border-indigo-500 hover:bg-indigo-50/30' 
                        : 'border-slate-100 bg-white hover:border-slate-300'
                    }`}
                  >
                    {isSuggested && (
                      <span className="absolute -top-3 left-4 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" /> SUGGESTED
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-slate-800 flex items-center justify-between">
                      {STRATEGIES[type].name}
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                      {STRATEGIES[type].description}
                    </p>
                  </button>
                );
              })}
            </motion.div>
          ) : (
            <motion.div 
              key="workbench"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Strategy Focus Area */}
              <div className="bg-white rounded-3xl p-6 border border-indigo-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{STRATEGIES[selectedStrategy].name}</h2>
                    <p className="text-slate-500 text-sm">Follow the interactive steps to solve the problem.</p>
                  </div>
                  <button 
                    onClick={() => setShowPedagogicalNote(!showPedagogicalNote)}
                    className={`p-2 rounded-full transition-colors ${showPedagogicalNote ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600' }`}
                    title="Pedagogical Insights"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </div>

                <AnimatePresence>
                  {showPedagogicalNote && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mb-8 overflow-hidden"
                    >
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start">
                        <School className="w-5 h-5 text-amber-600 mt-1 shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-amber-800">Teacher's Note:</p>
                          <p className="text-sm text-amber-700 leading-relaxed italic">
                            "{STRATEGIES[selectedStrategy].pedagogicalGoal}"
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Steps List */}
                <div className="space-y-4">
                  {stepsForStrategy.map((step, idx) => {
                    const isCurrent = idx === currentStep;
                    const isDone = idx < currentStep;
                    const isLocked = idx > currentStep;

                    return (
                      <motion.div 
                        key={idx}
                        className={`relative p-5 rounded-2xl transition-all border ${
                          isCurrent 
                            ? 'bg-indigo-50/50 border-indigo-200 ring-2 ring-indigo-500/10' 
                            : isDone 
                              ? 'bg-slate-50/50 border-slate-200' 
                              : 'bg-white border-slate-100 opacity-60 grayscale'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${
                            isDone 
                              ? 'bg-emerald-500 border-emerald-500 text-white' 
                              : isCurrent 
                                ? 'bg-indigo-600 border-indigo-600 text-white animate-pulse' 
                                : 'bg-white border-slate-200 text-slate-400'
                          }`}>
                            {isDone ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-bold">{idx + 1}</span>}
                          </div>
                          
                          <div className="flex-1">
                            <h4 className={`font-bold ${isDone ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                              {step.label}
                            </h4>
                            {isCurrent && (
                              <motion.p 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }}
                                className="text-slate-600 text-sm mt-1"
                              >
                                {step.description}
                              </motion.p>
                            )}
                          </div>

                          {isCurrent && (
                            <button
                              onClick={handleNextStep}
                              className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors flex items-center gap-2 group"
                            >
                              Action <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          )}
                        </div>

                        {/* Step Visualization Area */}
                        {(isCurrent || (isDone && idx === 2)) && step.visualization && (
                          <motion.div 
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: 'auto' }}
                             className="overflow-hidden"
                          >
                            {step.visualization}
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Completion Modal/State */}
                {isStrategySolved && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 p-8 bg-emerald-50 border-2 border-emerald-200 rounded-3xl text-center space-y-4"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-2">
                       <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-emerald-900">Solved!</h3>
                    <p className="text-emerald-700 max-w-md mx-auto">
                      Great work! You used the <strong>{STRATEGIES[selectedStrategy].name}</strong> strategy to reach <strong>{problem.targetResult}</strong>.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                      <button 
                        onClick={nextProblem}
                        className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                      >
                        Try Next Challenge <ArrowRight className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={resetStrategy}
                        className="w-full sm:w-auto bg-white text-emerald-700 border-2 border-emerald-200 px-8 py-3 rounded-2xl font-bold hover:bg-emerald-100 transition-all"
                      >
                        Review Steps
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer / Info */}
        <footer className="text-center pt-8 border-t border-slate-200">
           <p className="text-slate-400 text-xs flex items-center justify-center gap-1">
             Designed for Future Educators <Info className="w-3 h-3" /> Mental Math Mastery Series
           </p>
        </footer>
      </div>
      <InstructorGuide />
    </div>
  );
}
