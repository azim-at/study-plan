import studyPlanData from '../../fullstack_study_plan.json';

export const studyPlan = studyPlanData.study_plan;
export const weeks = studyPlanData.weeks;
export const dsaCheatSheet = studyPlanData.dsa_cheat_sheet;
export const resources = studyPlanData.resources;

export const getAllDays = () => {
  return weeks.flatMap(week =>
    week.days.map(day => ({
      ...day,
      weekNumber: week.week,
      weekTitle: week.title,
    }))
  );
};

export const getDayByNumber = (dayNumber) => {
  const allDays = getAllDays();
  return allDays.find(d => d.day === dayNumber);
};

export const getWeekByNumber = (weekNumber) => {
  return weeks.find(w => w.week === weekNumber);
};

export const totalDays = weeks.reduce((sum, week) => sum + week.days.length, 0);
