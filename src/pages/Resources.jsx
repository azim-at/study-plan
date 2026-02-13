import { ExternalLink, BookOpen, Code2, Server, Cloud, Users } from 'lucide-react';
import { resources } from '../data/studyPlan';

const categoryConfig = {
  dsa_practice: {
    title: 'DSA Practice',
    description: 'Platforms to practice coding problems',
    icon: Code2,
    color: 'text-blue-400',
    iconBg: 'bg-blue-900/50',
    border: 'border-blue-500/30',
  },
  javascript_react: {
    title: 'JavaScript & React',
    description: 'Tutorials, docs, and video courses',
    icon: BookOpen,
    color: 'text-amber-400',
    iconBg: 'bg-amber-900/50',
    border: 'border-amber-500/30',
  },
  backend_system_design: {
    title: 'Backend & System Design',
    description: 'Backend frameworks, architecture, and design patterns',
    icon: Server,
    color: 'text-violet-400',
    iconBg: 'bg-violet-900/50',
    border: 'border-violet-500/30',
  },
  devops: {
    title: 'DevOps',
    description: 'Docker, CI/CD, and cloud services',
    icon: Cloud,
    color: 'text-emerald-400',
    iconBg: 'bg-emerald-900/50',
    border: 'border-emerald-500/30',
  },
  mock_interviews: {
    title: 'Mock Interviews',
    description: 'Practice with real interview simulations',
    icon: Users,
    color: 'text-pink-400',
    iconBg: 'bg-pink-900/50',
    border: 'border-pink-500/30',
  },
};

const typeColors = {
  Practice: 'bg-blue-900/40 text-blue-300',
  Tutorial: 'bg-amber-900/40 text-amber-300',
  Documentation: 'bg-emerald-900/40 text-emerald-300',
  Video: 'bg-red-900/40 text-red-300',
  Guide: 'bg-violet-900/40 text-violet-300',
  Book: 'bg-teal-900/40 text-teal-300',
  Platform: 'bg-pink-900/40 text-pink-300',
};

export default function Resources() {
  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Resources</h1>
        <p className="text-sm sm:text-base text-slate-400">
          Curated learning materials organized by topic. Click any link to open in a new tab.
        </p>
      </div>

      {/* Resource Categories */}
      <div className="space-y-4 sm:space-y-5">
        {Object.entries(resources).map(([key, items]) => {
          const config = categoryConfig[key];
          if (!config) return null;
          const Icon = config.icon;

          return (
            <div
              key={key}
              className={`bg-slate-800 rounded-xl border ${config.border} overflow-hidden`}
            >
              {/* Category Header */}
              <div className="px-5 py-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg ${config.iconBg} flex items-center justify-center`}>
                  <Icon size={16} className={config.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-bold text-white">{config.title}</h2>
                  <p className="text-xs text-slate-500">{config.description}</p>
                </div>
                <span className="text-xs font-medium text-slate-500">{items.length} links</span>
              </div>

              {/* Links */}
              <div className="border-t border-slate-700/50">
                {items.map((item, i) => (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-5 py-3.5 hover:bg-slate-700/30 transition-colors group ${
                      i < items.length - 1 ? 'border-b border-slate-700/30' : ''
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                        {item.name}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 ${typeColors[item.type] || 'bg-slate-700 text-slate-300'}`}>
                      {item.type}
                    </span>
                    <ExternalLink size={13} className="text-slate-600 group-hover:text-blue-400 transition-colors shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
