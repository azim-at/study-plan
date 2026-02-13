import { useNavigate } from 'react-router-dom';
import { Target, CheckCircle2, Clock, Flame, BookOpen, ArrowRight, RotateCcw, Calendar, Code2, Link } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { studyPlan, weeks, getAllDays } from '../data/studyPlan';

export default function Dashboard() {
  const navigate = useNavigate();
  const { getOverallProgress, getWeekProgress, getDayProgress, isDayCompleted, resetProgress } = useProgress();
  const overall = getOverallProgress();
  const allDays = getAllDays();

  const nextDay = allDays.find(d => !isDayCompleted(d.day));

  let streak = 0;
  for (const day of allDays) {
    if (isDayCompleted(day.day)) streak++;
    else break;
  }

  const weekColors = ['bg-blue-600', 'bg-violet-600', 'bg-amber-600', 'bg-emerald-600'];
  const weekBarColors = ['bg-blue-500', 'bg-violet-500', 'bg-amber-500', 'bg-emerald-500'];
  const weekTextColors = ['text-blue-400', 'text-violet-400', 'text-amber-400', 'text-emerald-400'];

  return (
    <div className="space-y-8 sm:space-y-10">

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-800/80 rounded-2xl border border-slate-700 shadow-xl p-6 sm:p-8">
        <p className="text-blue-400 text-sm font-semibold mb-1">Welcome back, {studyPlan.prepared_for}!</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">{studyPlan.title}</h1>

        {/* Key info row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400 mb-6">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-slate-500" />
            {studyPlan.duration}
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-slate-500" />
            {studyPlan.daily_commitment}/day
          </span>
          <span className="text-slate-600">|</span>
          <span>{studyPlan.schedule}</span>
        </div>

        {/* Overall progress bar - big and prominent */}
        <div className="mb-3">
          <div className="flex items-end justify-between mb-2">
            <span className="text-sm font-medium text-slate-300">Overall Progress</span>
            <span className="text-2xl font-extrabold text-white">{overall.percentage}%</span>
          </div>
          <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-700"
              style={{ width: `${overall.percentage}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {overall.completed} of {overall.total} topics completed · {overall.daysCompleted} of {overall.totalDays} days done
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-slate-700">
          <span className="text-xs text-slate-500 mr-1 self-center">Tech:</span>
          {studyPlan.tech_stack.map(tech => (
            <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-700/60 text-slate-300">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 text-center">
          <CheckCircle2 size={20} className="text-emerald-400 mx-auto mb-2" />
          <p className="text-xl sm:text-2xl font-extrabold text-white">{overall.daysCompleted}/{overall.totalDays}</p>
          <p className="text-xs text-slate-500 mt-0.5">Days Done</p>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 text-center">
          <Flame size={20} className="text-amber-400 mx-auto mb-2" />
          <p className="text-xl sm:text-2xl font-extrabold text-white">{streak}</p>
          <p className="text-xs text-slate-500 mt-0.5">Day Streak</p>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 text-center">
          <Clock size={20} className="text-violet-400 mx-auto mb-2" />
          <p className="text-xl sm:text-2xl font-extrabold text-white">{Math.max(0, 96 - Math.round(96 * overall.percentage / 100))}h</p>
          <p className="text-xs text-slate-500 mt-0.5">Remaining</p>
        </div>
      </div>

      {/* Continue Button - most important action */}
      {nextDay && (
        <button
          onClick={() => navigate(`/plan/day/${nextDay.day}`)}
          className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-2xl p-5 sm:p-6 flex items-center justify-between shadow-lg transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-700 flex items-center justify-center shrink-0">
              <BookOpen size={24} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-blue-200 text-xs font-medium mb-0.5">Continue where you left off</p>
              <p className="text-white text-lg sm:text-xl font-bold">Day {nextDay.day}: {nextDay.title}</p>
              <p className="text-blue-200 text-sm mt-1">
                Week {nextDay.weekNumber} · {getDayProgress(nextDay.day).completed}/{getDayProgress(nextDay.day).total} topics done
              </p>
            </div>
          </div>
          <ArrowRight size={24} className="text-blue-200 group-hover:translate-x-1 transition-transform shrink-0" />
        </button>
      )}

      {/* Weekly Roadmap */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-white">Weekly Roadmap</h2>
          <button
            onClick={() => navigate('/plan')}
            className="text-sm text-blue-400 hover:text-blue-300 font-medium cursor-pointer flex items-center gap-1"
          >
            View full plan <ArrowRight size={14} />
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {weeks.map((week, i) => {
            const wp = getWeekProgress(week.week);
            const isActive = nextDay && nextDay.weekNumber === week.week;
            return (
              <button
                key={week.week}
                onClick={() => navigate('/plan')}
                className={`w-full bg-slate-800 rounded-xl border text-left p-4 sm:p-5 transition-all hover:border-slate-500 cursor-pointer ${
                  isActive ? 'border-blue-500/50 ring-1 ring-blue-500/20' : 'border-slate-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Week badge */}
                  <div className={`w-12 h-12 ${weekColors[i]} rounded-xl flex items-center justify-center shrink-0`}>
                    <span className="text-white font-bold text-sm">W{week.week}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-bold text-white truncate">{week.title}</h3>
                      {isActive && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-900 text-blue-300 shrink-0">CURRENT</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{wp.daysCompleted}/{wp.totalDays} days · {wp.completed}/{wp.total} topics</p>
                  </div>

                  {/* Progress */}
                  <div className="text-right shrink-0 w-16">
                    <p className={`text-lg font-bold ${wp.percentage === 100 ? 'text-emerald-400' : weekTextColors[i]}`}>{wp.percentage}%</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${wp.percentage === 100 ? 'bg-emerald-500' : weekBarColors[i]} rounded-full transition-all duration-500`}
                    style={{ width: `${wp.percentage}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/plan')}
            className="bg-slate-800 rounded-xl border border-slate-700 p-4 text-left hover:border-slate-500 transition-colors cursor-pointer group"
          >
            <Calendar size={20} className="text-blue-400 mb-2" />
            <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">Study Plan</p>
            <p className="text-xs text-slate-500 mt-0.5">View all 28 days</p>
          </button>
          <button
            onClick={() => navigate('/dsa')}
            className="bg-slate-800 rounded-xl border border-slate-700 p-4 text-left hover:border-slate-500 transition-colors cursor-pointer group"
          >
            <Code2 size={20} className="text-violet-400 mb-2" />
            <p className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">DSA Cheat Sheet</p>
            <p className="text-xs text-slate-500 mt-0.5">Patterns & problems</p>
          </button>
        </div>
      </div>

      {/* Day Grid - compact overview */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-1">All Days at a Glance</h2>
        <p className="text-xs text-slate-500 mb-4">Click any day to jump in. Green = done, Blue = in progress, Gray = not started.</p>
        <div className="grid grid-cols-7 md:grid-cols-14 gap-2">
          {allDays.map(day => {
            const dp = getDayProgress(day.day);
            const done = dp.percentage === 100;
            const started = dp.percentage > 0 && dp.percentage < 100;
            return (
              <button
                key={day.day}
                onClick={() => navigate(`/plan/day/${day.day}`)}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-bold transition-all cursor-pointer border hover:scale-105 ${
                  done ? 'bg-emerald-900/60 border-emerald-500 text-emerald-300'
                  : started ? 'bg-blue-900/60 border-blue-500 text-blue-300'
                  : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-500'
                }`}
                title={`Day ${day.day}: ${day.title}`}
              >
                {day.day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      <div className="flex justify-center pt-2 pb-8">
        <button
          onClick={() => { if (window.confirm('Reset all progress? This cannot be undone.')) resetProgress(); }}
          className="text-xs text-slate-600 hover:text-red-400 transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <RotateCcw size={12} /> Reset all progress
        </button>
      </div>
    </div>
  );
}
