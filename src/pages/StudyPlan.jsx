import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, ArrowRight, Clock } from 'lucide-react';
import { weeks } from '../data/studyPlan';
import { useProgress } from '../context/ProgressContext';

const weekColors = ['bg-blue-600', 'bg-violet-600', 'bg-amber-600', 'bg-emerald-600'];
const weekBarColors = ['bg-blue-500', 'bg-violet-500', 'bg-amber-500', 'bg-emerald-500'];
const weekFilters = ['All', 'Week 1', 'Week 2', 'Week 3', 'Week 4'];

export default function StudyPlan() {
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();
  const { getWeekProgress, getDayProgress, isDayCompleted } = useProgress();

  const filteredWeeks = activeFilter === 'All'
    ? weeks
    : weeks.filter(w => `Week ${w.week}` === activeFilter);

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Study Plan</h1>
        <p className="text-slate-400 text-sm sm:text-base">
          28 days to become interview-ready. Click any day to start learning.
        </p>
      </div>

      {/* Week Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {weekFilters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === f
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200 hover:bg-slate-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Week Sections */}
      {filteredWeeks.map((week) => {
        const idx = weeks.indexOf(week);
        const wp = getWeekProgress(week.week);

        return (
          <section key={week.week} className="space-y-4">

            {/* Week Header */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5 sm:p-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 ${weekColors[idx]} rounded-xl flex items-center justify-center shrink-0`}>
                  <span className="text-white font-black text-base sm:text-lg">W{week.week}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-white">{week.title}</h2>
                  <p className="text-slate-400 text-sm mt-1 leading-relaxed">{week.goal}</p>
                </div>
              </div>

              {/* Week progress */}
              <div className="mt-4 flex items-center gap-4">
                <div className="flex-1 h-2.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${wp.percentage === 100 ? 'bg-emerald-500' : weekBarColors[idx]} rounded-full transition-all duration-500`}
                    style={{ width: `${wp.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-white shrink-0 w-12 text-right">{wp.percentage}%</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">{wp.daysCompleted} of {wp.totalDays} days completed · {wp.completed}/{wp.total} topics</p>
            </div>

            {/* Day Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {week.days.map(day => {
                const dp = getDayProgress(day.day);
                const done = isDayCompleted(day.day);
                const started = dp.percentage > 0 && !done;
                const isReview = day.day % 7 === 0;

                return (
                  <button
                    key={day.day}
                    onClick={() => navigate(`/plan/day/${day.day}`)}
                    className={`relative group text-left rounded-xl transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg overflow-hidden ${
                      done
                        ? 'bg-emerald-950/40 border border-emerald-500/60'
                        : started
                        ? 'bg-blue-950/30 border border-blue-500/60'
                        : 'bg-slate-800 border border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="p-4 space-y-3">
                      {/* Day number + status row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-500">DAY {day.day}</span>
                          {isReview && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-900/60 text-amber-300">
                              Review
                            </span>
                          )}
                        </div>
                        {done ? (
                          <CheckCircle2 size={18} className="text-emerald-400" />
                        ) : started ? (
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            <span className="text-[10px] font-medium text-blue-400">In progress</span>
                          </div>
                        ) : (
                          <Circle size={18} className="text-slate-600" />
                        )}
                      </div>

                      {/* Title */}
                      <h3 className={`text-sm font-semibold leading-snug ${
                        done ? 'text-slate-400 line-through' : 'text-white'
                      }`}>
                        {day.title}
                      </h3>

                      {/* Topics count + time */}
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>{day.topics.length} topics</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          ~3-4h
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              done ? 'bg-emerald-500' : started ? weekBarColors[idx] : 'bg-slate-600'
                            }`}
                            style={{ width: `${dp.percentage}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium w-8 text-right ${
                          done ? 'text-emerald-400' : started ? 'text-blue-400' : 'text-slate-600'
                        }`}>
                          {dp.percentage}%
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
