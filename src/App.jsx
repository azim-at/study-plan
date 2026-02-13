import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import StudyPlan from './pages/StudyPlan';
import DayDetail from './pages/DayDetail';
import DSACheatSheet from './pages/DSACheatSheet';
import Resources from './pages/Resources';

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="plan" element={<StudyPlan />} />
            <Route path="plan/day/:dayNumber" element={<DayDetail />} />
            <Route path="dsa" element={<DSACheatSheet />} />
            <Route path="resources" element={<Resources />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  );
}
