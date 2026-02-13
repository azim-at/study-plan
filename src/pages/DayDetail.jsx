import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, CheckCircle2, Circle,
  Lightbulb, ChevronLeft, ChevronRight, Pencil, Save, Clock
} from 'lucide-react';
import { useState } from 'react';
import { getDayByNumber, getAllDays } from '../data/studyPlan';
import { useProgress } from '../context/ProgressContext';

const weekColors = ['bg-blue-600', 'bg-violet-600', 'bg-amber-600', 'bg-emerald-600'];
const weekBarColors = ['bg-blue-500', 'bg-violet-500', 'bg-amber-500', 'bg-emerald-500'];

export default function DayDetail() {
  const { dayNumber } = useParams();
  const navigate = useNavigate();
  const dayNum = parseInt(dayNumber);
  const day = getDayByNumber(dayNum);
  const allDays = getAllDays();
  const { toggleTopic, isTopicCompleted, getDayProgress, getNote, setNote } = useProgress();
  const [editingNote, setEditingNote] = useState(false);
  const [noteText, setNoteText] = useState('');

  if (!day) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-slate-400 text-lg mb-4">Day not found</p>
        <button onClick={() => navigate('/plan')} className="text-blue-400 hover:text-blue-300 text-sm font-semibold cursor-pointer">
          Back to Study Plan
        </button>
      </div>
    );
  }

  const dp = getDayProgress(dayNum);
  const prevDay = allDays.find(d => d.day === dayNum - 1);
  const nextDay = allDays.find(d => d.day === dayNum + 1);
  const currentNote = getNote(dayNum);
  const weekIdx = (day.weekNumber || 1) - 1;
  const allDone = dp.percentage === 100;

  const startEditNote = () => {
    setNoteText(currentNote);
    setEditingNote(true);
  };

  const saveNote = () => {
    setNote(dayNum, noteText);
    setEditingNote(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/plan')}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          Study Plan
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => prevDay && navigate(`/plan/day/${prevDay.day}`)}
            disabled={!prevDay}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs text-slate-500 w-20 text-center">
            Day {dayNum} / {allDays.length}
          </span>
          <button
            onClick={() => nextDay && navigate(`/plan/day/${nextDay.day}`)}
            disabled={!nextDay}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Day Header */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className={`h-1.5 ${allDone ? 'bg-emerald-500' : weekBarColors[weekIdx]}`} />

        <div className="p-5 sm:p-7">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${weekColors[weekIdx]} text-white`}>
              Week {day.weekNumber}
            </span>
            <span className="text-xs text-slate-500">Day {day.day}</span>
            {day.day % 7 === 0 && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-900/60 text-amber-300">
                Review Day
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-slate-500 ml-auto">
              <Clock size={12} /> ~3-4 hours
            </span>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-4">{day.title}</h1>

          {/* Progress */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${allDone ? 'bg-emerald-500' : weekBarColors[weekIdx]} transition-all duration-500`}
                style={{ width: `${dp.percentage}%` }}
              />
            </div>
            <span className={`text-sm font-bold shrink-0 ${allDone ? 'text-emerald-400' : 'text-white'}`}>
              {dp.completed}/{dp.total}
            </span>
          </div>
          {allDone && (
            <p className="text-sm text-emerald-400 font-medium mt-2">All topics completed!</p>
          )}
        </div>

        {/* Topics Checklist */}
        <div className="border-t border-slate-700">
          <div className="px-5 sm:px-7 py-3 bg-slate-800/50">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Topics — click to mark as done</p>
          </div>

          {day.topics.map((topic, index) => {
            const completed = isTopicCompleted(dayNum, index);
            return (
              <button
                key={index}
                onClick={() => toggleTopic(dayNum, index)}
                className={`w-full flex items-start gap-4 px-5 sm:px-7 py-4 transition-colors cursor-pointer group border-b border-slate-700/50 last:border-b-0 ${
                  completed ? 'bg-emerald-950/20' : 'hover:bg-slate-700/20'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {completed ? (
                    <CheckCircle2 size={22} className="text-emerald-400" />
                  ) : (
                    <Circle size={22} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className={`text-sm font-semibold transition-colors ${
                    completed ? 'text-slate-500 line-through' : 'text-white'
                  }`}>
                    {topic.name}
                  </p>
                  <p className={`text-sm mt-1 leading-relaxed ${
                    completed ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    {topic.details}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Practice Task */}
      {day.practice && (
        <div className="bg-slate-800 rounded-xl border border-amber-600/40 p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <Lightbulb size={18} className="text-amber-400" />
            <h3 className="text-sm font-bold text-white">Practice Task</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{day.practice}</p>
        </div>
      )}

      {/* Notes */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Pencil size={16} className="text-blue-400" />
            <h3 className="text-sm font-bold text-white">My Notes</h3>
          </div>
          {!editingNote && (
            <button
              onClick={startEditNote}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
            >
              {currentNote ? 'Edit' : '+ Add note'}
            </button>
          )}
        </div>

        {editingNote ? (
          <div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write your notes, key takeaways, or reminders..."
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500 min-h-[120px] resize-y"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => setEditingNote(false)}
                className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white border border-slate-600 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={saveNote}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
              >
                <Save size={14} />
                Save
              </button>
            </div>
          </div>
        ) : currentNote ? (
          <p className="text-sm text-slate-400 whitespace-pre-wrap leading-relaxed">{currentNote}</p>
        ) : (
          <p className="text-sm text-slate-600">No notes yet.</p>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-2 pb-6">
        <button
          onClick={() => prevDay && navigate(`/plan/day/${prevDay.day}`)}
          disabled={!prevDay}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white bg-slate-800 border border-slate-700 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          Day {prevDay?.day || ''}
        </button>
        <button
          onClick={() => nextDay && navigate(`/plan/day/${nextDay.day}`)}
          disabled={!nextDay}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white bg-slate-800 border border-slate-700 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          Day {nextDay?.day || ''}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
