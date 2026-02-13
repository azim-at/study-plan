import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, BookOpen, Code2, Link, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useProgress } from '../context/ProgressContext';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Home' },
  { to: '/plan', icon: Calendar, label: 'Plan' },
  { to: '/dsa', icon: Code2, label: 'DSA' },
  { to: '/resources', icon: Link, label: 'Resources' },
];

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getOverallProgress } = useProgress();
  const overall = getOverallProgress();
  const location = useLocation();

  // Get page title for breadcrumb
  const getPageTitle = () => {
    if (location.pathname === '/') return null;
    if (location.pathname === '/plan') return 'Study Plan';
    if (location.pathname.startsWith('/plan/day/')) return 'Study Plan';
    if (location.pathname === '/dsa') return 'DSA Sheet';
    if (location.pathname === '/resources') return 'Resources';
    return null;
  };
  const pageTitle = getPageTitle();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">

      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <BookOpen size={15} className="text-white" />
              </div>
              <span className="text-sm font-bold text-white hidden sm:block">StudyPlan</span>
            </NavLink>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`
                  }
                >
                  <Icon size={15} />
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Progress indicator */}
            <div className="hidden md:flex items-center gap-2.5">
              <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${overall.percentage}%` }}
                />
              </div>
              <span className="text-xs font-medium text-slate-400 w-8">{overall.percentage}%</span>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-2">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-slate-800 text-white' : 'text-slate-400'
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
            {/* Mobile progress */}
            <div className="flex items-center gap-2.5 px-3 py-2.5 mt-1 border-t border-slate-800">
              <span className="text-xs text-slate-500">Progress</span>
              <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${overall.percentage}%` }}
                />
              </div>
              <span className="text-xs font-medium text-slate-400">{overall.percentage}%</span>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 z-50">
        <div className="flex items-center justify-around py-1.5">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                  isActive ? 'text-blue-400' : 'text-slate-500'
                }`
              }
            >
              <Icon size={18} />
              <span className="text-[10px] font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="md:hidden h-14" />
    </div>
  );
}
