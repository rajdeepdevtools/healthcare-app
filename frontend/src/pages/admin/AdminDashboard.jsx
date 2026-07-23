import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiAward, FiBookOpen, FiCalendar, FiEdit3, FiMessageSquare } from 'react-icons/fi';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const cards = [
  { key: 'appointments', label: 'Appointments', to: '/admin/appointments', icon: FiCalendar, accent: 'text-sky-600' },
  { key: 'blogs', label: 'Blog posts', to: '/admin/blogs', icon: FiEdit3, accent: 'text-violet-600' },
  { key: 'courses', label: 'Courses', to: '/admin/courses', icon: FiBookOpen, accent: 'text-amber-600' },
  { key: 'feedback', label: 'Pending feedback', to: '/admin/feedback', icon: FiMessageSquare, accent: 'text-emerald-600' },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({});

  useEffect(() => {
    let alive = true;
    async function load() {
      const safe = (p) => p.then((r) => r).catch(() => ({ data: {} }));
      const [appts, blogs, courses, feedback] = await Promise.all([
        safe(api.get('/appointments')),
        safe(api.get('/blogs')),
        safe(api.get('/courses')),
        safe(api.get('/feedback/all', { params: { status: 'pending' } })),
      ]);
      if (!alive) return;
      setStats({
        appointments: (appts.data.appointments || appts.data.data || []).length,
        blogs: (blogs.data.data || []).length,
        courses: (courses.data.data || []).length,
        feedback: (feedback.data.data || []).length,
      });
    }
    load();
    return () => { alive = false; };
  }, []);

  const quick = [
    ['Write a new post', '/admin/blogs', FiEdit3],
    ['Add a course', '/admin/courses', FiBookOpen],
    ['Review feedback', '/admin/feedback', FiMessageSquare],
    ['Issue certificate', '/admin/certificates', FiAward],
  ];

  return (
    <>
      <div className="mb-8">
        <p className="eyebrow">Dashboard</p>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Welcome back, {user?.name?.split(' ')[0]}</h1>
        <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">Here is a snapshot of your clinic today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ key, label, to, icon: Icon, accent }) => (
          <Link key={key} to={to} className="group rounded-2xl border border-primary-900/10 bg-white p-6 shadow-soft hover:-translate-y-0.5 dark:border-white/10 dark:bg-primary-900/50">
            <div className="flex items-start justify-between">
              <Icon className={`text-2xl ${accent}`} />
              <FiArrowUpRight className="text-stone-300 group-hover:text-primary-600" />
            </div>
            <p className="mt-5 text-3xl font-bold">{stats[key] ?? '—'}</p>
            <p className="text-sm font-semibold text-stone-500 dark:text-stone-400">{label}</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-bold">Quick actions</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quick.map(([label, to, Icon]) => (
          <Link key={to + label} to={to} className="flex items-center gap-3 rounded-2xl border border-primary-900/10 bg-white p-4 text-sm font-semibold hover:border-primary-300 dark:border-white/10 dark:bg-primary-900/50">
            <span className="grid size-9 place-items-center rounded-xl bg-primary-100 text-primary-700 dark:bg-white/10 dark:text-primary-200"><Icon /></span>
            {label}
          </Link>
        ))}
      </div>
    </>
  );
}
