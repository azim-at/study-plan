import { Code2, Zap } from 'lucide-react';
import { dsaCheatSheet } from '../data/studyPlan';

const patternIcons = {
  'Two Pointers': '👉👈',
  'Sliding Window': '🪟',
  'HashMap': '🗺️',
  'Binary Search': '🔍',
  'BFS/DFS': '🌳',
  'Dynamic Programming': '📊',
  'Stack': '📚',
  'Recursion/Backtracking': '🔄',
};

const patternColors = [
  { border: 'border-blue-500/40', tag: 'bg-blue-900/50 text-blue-300 border-blue-600/40' },
  { border: 'border-cyan-500/40', tag: 'bg-cyan-900/50 text-cyan-300 border-cyan-600/40' },
  { border: 'border-violet-500/40', tag: 'bg-violet-900/50 text-violet-300 border-violet-600/40' },
  { border: 'border-amber-500/40', tag: 'bg-amber-900/50 text-amber-300 border-amber-600/40' },
  { border: 'border-emerald-500/40', tag: 'bg-emerald-900/50 text-emerald-300 border-emerald-600/40' },
  { border: 'border-pink-500/40', tag: 'bg-pink-900/50 text-pink-300 border-pink-600/40' },
  { border: 'border-orange-500/40', tag: 'bg-orange-900/50 text-orange-300 border-orange-600/40' },
  { border: 'border-teal-500/40', tag: 'bg-teal-900/50 text-teal-300 border-teal-600/40' },
];

export default function DSACheatSheet() {
  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Code2 size={24} className="text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">DSA Cheat Sheet</h1>
        </div>
        <p className="text-sm text-slate-400">
          Key patterns and must-solve problems for coding interviews. Learn when to use each pattern.
        </p>
      </div>

      {/* Pattern Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dsaCheatSheet.map((pattern, index) => {
          const theme = patternColors[index % patternColors.length];
          return (
            <div
              key={pattern.pattern}
              className={`bg-slate-800 rounded-xl border ${theme.border} p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg`}
            >
              {/* Pattern name */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{patternIcons[pattern.pattern] || '💡'}</span>
                <div>
                  <h3 className="text-base font-bold text-white">{pattern.pattern}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Use when: {pattern.when_to_use}</p>
                </div>
              </div>

              {/* Problems */}
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Must-solve problems</p>
                <div className="flex flex-wrap gap-1.5">
                  {pattern.key_problems.map(problem => (
                    <span
                      key={problem}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border ${theme.tag}`}
                    >
                      {problem}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interview Tips */}
      <div className="bg-slate-800 rounded-xl border border-amber-500/30 p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-5">
          <Zap size={18} className="text-amber-400" />
          <h2 className="text-base font-bold text-white">Interview Tips</h2>
        </div>
        <ol className="space-y-3">
          {[
            'Always clarify the problem before coding — ask about edge cases, constraints, and expected output.',
            'Start with brute force, then optimize. Communicate your thought process out loud.',
            'Use pattern recognition: identify which pattern fits the problem type.',
            'Time management: 5 min understanding, 5 min planning, 15 min coding, 5 min testing.',
            'Know the time and space complexity of your solution.',
            'Write clean code with meaningful variable names — interviewers care about code quality.',
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded bg-amber-900/50 text-amber-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">{tip}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
