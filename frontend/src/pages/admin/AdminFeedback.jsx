import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiCheck, FiStar, FiX } from 'react-icons/fi';
import api from '../../services/api';

const TABS = ['pending', 'approved', 'rejected'];
const badge = {
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
  approved: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
  rejected: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
};

export default function AdminFeedback() {
  const [tab, setTab] = useState('pending');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    api.get('/feedback/all', { params: { status: tab } })
      .then((r) => setItems(r.data.data || []))
      .catch((err) => toast.error(err.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, [tab]);
  useEffect(() => { load(); }, [load]);

  const setStatus = async (id, status) => {
    try {
      await api.patch(`/feedback/${id}/status`, { status });
      setItems((p) => p.filter((f) => f._id !== id));
      toast.success(`Marked ${status}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <>
      <div className="mb-6">
        <p className="eyebrow">Moderation</p>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Patient feedback</h1>
      </div>

      <div className="mb-6 flex gap-2">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition-colors ${tab === t ? 'bg-primary-700 text-white' : 'border border-primary-900/10 text-stone-600 hover:bg-primary-50 dark:border-white/10 dark:text-stone-300 dark:hover:bg-white/5'}`}>
            {t}
          </button>
        ))}
      </div>

      {loading && <p className="text-stone-400">Loading…</p>}
      {!loading && !items.length && <p className="rounded-2xl border border-dashed border-primary-900/15 p-10 text-center text-stone-400 dark:border-white/10">Nothing {tab} right now.</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((f) => (
          <div key={f._id} className="rounded-2xl border border-primary-900/10 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-primary-900/50">
            <div className="flex items-center justify-between">
              <div className="flex gap-0.5 text-gold-400">
                {Array.from({ length: f.rating || 0 }).map((_, i) => <FiStar key={i} className="fill-current" />)}
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${badge[f.status]}`}>{f.status}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">“{f.message}”</p>
            <div className="mt-4 flex items-center justify-between border-t border-primary-900/8 pt-3 dark:border-white/10">
              <div>
                <p className="text-sm font-bold">{f.name}</p>
                {f.email && <p className="text-xs text-stone-500 dark:text-stone-400">{f.email}</p>}
              </div>
              <div className="flex gap-2">
                {f.status !== 'approved' && (
                  <button onClick={() => setStatus(f._id, 'approved')} className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"><FiCheck /> Approve</button>
                )}
                {f.status !== 'rejected' && (
                  <button onClick={() => setStatus(f._id, 'rejected')} className="inline-flex items-center gap-1 rounded-full border border-rose-200 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:border-rose-500/20 dark:hover:bg-rose-500/10"><FiX /> Reject</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
