import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const badge = {
  pending: 'bg-amber-100 text-amber-800', confirmed: 'bg-sky-100 text-sky-800',
  completed: 'bg-emerald-100 text-emerald-800', cancelled: 'bg-rose-100 text-rose-700',
};

export default function Portal() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/appointments/mine')
      .then((res) => setItems(res.data.appointments || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet><title>My portal — Health Care & Wellness Clinic</title></Helmet>
      <section className="section-shell py-16">
        <p className="eyebrow">Patient portal</p>
        <h1 className="mt-3 text-4xl font-bold">Hello, {user?.name?.split(' ')[0]}</h1>
        <div className="mt-8 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold">Your appointments</h2>
          <Link to="/appointment" className="rounded-full bg-primary-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-800">Book new</Link>
        </div>
        <div className="mt-6 grid gap-4">
          {loading && <p className="text-stone-400">Loading…</p>}
          {!loading && !items.length && <p className="text-stone-500 dark:text-stone-400">No appointments yet.</p>}
          {items.map((a) => (
            <div key={a._id} className="glass-panel flex flex-wrap items-center justify-between gap-3 rounded-2xl p-5">
              <div>
                <p className="font-mono text-xs font-semibold text-primary-700 dark:text-primary-300">{a.appointmentId}</p>
                <p className="mt-1 font-semibold">{a.treatment || 'Consultation'}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">Preferred: {a.preferredDate ? new Date(a.preferredDate).toLocaleDateString() : '—'}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${badge[a.status]}`}>{a.status}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
