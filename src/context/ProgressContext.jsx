import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { totalDays, getAllDays } from '../data/studyPlan';

const ProgressContext = createContext();

const STORAGE_KEY = 'study-plan-progress';
const NOTES_KEY = 'study-plan-notes';

const loadProgress = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const loadNotes = () => {
  try {
    const stored = localStorage.getItem(NOTES_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

export function ProgressProvider({ children }) {
  const [completedTopics, setCompletedTopics] = useState(loadProgress);
  const [notes, setNotes] = useState(loadNotes);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedTopics));
  }, [completedTopics]);

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  const toggleTopic = useCallback((dayNumber, topicIndex) => {
    setCompletedTopics(prev => {
      const key = `${dayNumber}-${topicIndex}`;
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = true;
      }
      return next;
    });
  }, []);

  const isTopicCompleted = useCallback((dayNumber, topicIndex) => {
    return !!completedTopics[`${dayNumber}-${topicIndex}`];
  }, [completedTopics]);

  const isDayCompleted = useCallback((dayNumber) => {
    const allDays = getAllDays();
    const day = allDays.find(d => d.day === dayNumber);
    if (!day) return false;
    return day.topics.every((_, i) => completedTopics[`${dayNumber}-${i}`]);
  }, [completedTopics]);

  const getDayProgress = useCallback((dayNumber) => {
    const allDays = getAllDays();
    const day = allDays.find(d => d.day === dayNumber);
    if (!day) return { completed: 0, total: 0, percentage: 0 };
    const total = day.topics.length;
    const completed = day.topics.filter((_, i) => completedTopics[`${dayNumber}-${i}`]).length;
    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  }, [completedTopics]);

  const getWeekProgress = useCallback((weekNumber) => {
    const allDays = getAllDays();
    const weekDays = allDays.filter(d => d.weekNumber === weekNumber);
    let totalTopics = 0;
    let completedCount = 0;
    weekDays.forEach(day => {
      day.topics.forEach((_, i) => {
        totalTopics++;
        if (completedTopics[`${day.day}-${i}`]) completedCount++;
      });
    });
    return {
      completed: completedCount,
      total: totalTopics,
      percentage: totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0,
      daysCompleted: weekDays.filter(d => isDayCompleted(d.day)).length,
      totalDays: weekDays.length,
    };
  }, [completedTopics, isDayCompleted]);

  const getOverallProgress = useCallback(() => {
    const allDays = getAllDays();
    let totalTopics = 0;
    let completedCount = 0;
    allDays.forEach(day => {
      day.topics.forEach((_, i) => {
        totalTopics++;
        if (completedTopics[`${day.day}-${i}`]) completedCount++;
      });
    });
    return {
      completed: completedCount,
      total: totalTopics,
      percentage: totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0,
      daysCompleted: allDays.filter(d => isDayCompleted(d.day)).length,
      totalDays: totalDays,
    };
  }, [completedTopics, isDayCompleted]);

  const setNote = useCallback((dayNumber, text) => {
    setNotes(prev => ({ ...prev, [dayNumber]: text }));
  }, []);

  const getNote = useCallback((dayNumber) => {
    return notes[dayNumber] || '';
  }, [notes]);

  const resetProgress = useCallback(() => {
    setCompletedTopics({});
    setNotes({});
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(NOTES_KEY);
  }, []);

  return (
    <ProgressContext.Provider value={{
      toggleTopic,
      isTopicCompleted,
      isDayCompleted,
      getDayProgress,
      getWeekProgress,
      getOverallProgress,
      setNote,
      getNote,
      resetProgress,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
};
