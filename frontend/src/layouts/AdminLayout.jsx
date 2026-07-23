import { Helmet } from 'react-helmet-async';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { FiAward, FiBookOpen, FiCalendar, FiEdit3, FiHome, FiMessageSquare, FiGrid } from 'react-icons/fi';
import Logo from '../component/Logo';
import { useAuth } from '../context/AuthContext';

const nav = [
  ['/admin', 'Overview', FiGrid, true],
  ['/admin/appointments', 'Appointments', FiCalendar],
  ['/admin/blogs', 'Blog CMS', FiEdit3],
  ['/admin/courses', 'Courses', FiBookOpen],
  ['/admin/feedback', 'Feedback', FiMessageSquare],
  ['/admin/certificates', 'Certificates', FiAward],
];

function itemClass({ isActive }) {
  return `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
    isActive
      ? 'bg-primary-700 text-white shadow-lg shadow-primary-900/20'
      : 'text-stone-600 hover:bg-primary-50 dark:text-stone-300 dark:hover:bg-white/5'
  }`;
}

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const current = nav.find(([to]) => to === pathname)?.[1] || 'Admin';

  return (
    <>
      <Helmet><title>{current} — Wellness Admin</title></Helmet>
      <div className="min-h-screen bg-stone-100 dark:bg-primary-950 lg:flex">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-primary-900/10 bg-white p-5 dark:border-white/10 dark:bg-primary-900/40 lg:flex">
          <NavLink to="/" className="mb-8 block"><Logo variant="horizontal" imgClassName="h-10 w-auto" /></NavLink>
          <nav className="flex-1 space-y-1.5">
            {nav.map(([to, label, Icon, end]) => (
              <NavLink key={to} to={to} end={end} className={itemClass}>
                <Icon className="text-lg" /> {label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-6 border-t border-primary-900/10 pt-4 dark:border-white/10">
            <p className="text-sm font-bold">{user?.name}</p>
            <p className="text-xs capitalize text-stone-500 dark:text-stone-400">{user?.role}</p>
            <button onClick={logout} className="mt-3 w-full rounded-full border border-primary-900/15 px-4 py-2 text-sm font-semibold text-primary-800 hover:bg-primary-50 dark:border-white/15 dark:text-primary-100 dark:hover:bg-white/5">Sign out</button>
          </div>
        </aside>

        {/* Mobile top bar with scrollable nav */}
        <div className="lg:hidden">
          <header className="flex items-center justify-between border-b border-primary-900/10 bg-white px-4 py-3 dark:border-white/10 dark:bg-primary-900/60">
            <Logo variant="horizontal" imgClassName="h-9 w-auto" />
            <button onClick={logout} className="rounded-full border border-primary-900/15 px-3 py-1.5 text-xs font-semibold dark:border-white/15">Sign out</button>
          </header>
          <nav className="flex gap-2 overflow-x-auto border-b border-primary-900/10 bg-white px-4 py-2 dark:border-white/10 dark:bg-primary-900/60">
            {nav.map(([to, label, Icon, end]) => (
              <NavLink key={to} to={to} end={end} className={({ isActive }) => `flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${isActive ? 'bg-primary-700 text-white' : 'text-stone-600 dark:text-stone-300'}`}>
                <Icon /> {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}
