import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { FiDownload, FiRefreshCw, FiSearch } from 'react-icons/fi';
import api from '../../services/api';

const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

const badge = {
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
  confirmed: 'bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300',
  completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
  cancelled: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
};

export default function AdminAppointments() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('');
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/appointments', { params: { status: status || undefined, q: q || undefined } });
      setItems(res.data.appointments || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load appointments');
    } finally {
      setLoading(false);
    }
  }, [status, q]);

  useEffect(() => { load(); }, [load]);

  const counts = useMemo(() => {
    const base = { pending: 0, confirmed: 0, completed: 0, cancelled: 0 };
    items.forEach((a) => { base[a.status] = (base[a.status] || 0) + 1; });
    return base;
  }, [items]);

  const changeStatus = async (id, next) => {
    try {
      await api.patch(`/appointments/${id}/status`, { status: next });
      setItems((prev) => prev.map((a) => (a._id === id ? { ...a, status: next } : a)));
      toast.success(`Marked ${next}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  const exportCsv = () => {
    if (!items.length) return toast.error('Nothing to export');
    const cols = ['appointmentId', 'name', 'email', 'phone', 'treatment', 'preferredDate', 'status', 'createdAt'];
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const rows = items.map((a) => cols.map((c) => esc(
      c.includes('Date') || c === 'createdAt' ? (a[c] ? new Date(a[c]).toLocaleString() : '') : a[c],
    )).join(','));
    const csv = [cols.join(','), ...rows].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `appointments-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    return undefined;
  };

  return (
    <>
      <div className="mb-6">
        <p className="eyebrow">Admin</p>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Appointments</h1>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => setStatus(status === s ? '' : s)}
            className={`rounded-2xl border p-4 text-left transition ${status === s ? 'border-primary-500 ring-2 ring-primary-200' : 'border-primary-900/10 dark:border-white/10'} bg-white dark:bg-primary-900/60`}>
            <p className="text-2xl font-bold">{counts[s]}</p>
            <p className="text-xs font-semibold capitalize text-stone-500 dark:text-stone-400">{s}</p>
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email or ID"
            className="w-full rounded-full border border-primary-900/10 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-white/10 dark:bg-primary-900/60 dark:text-white" />
        </div>
        <button onClick={load} className="inline-flex items-center gap-2 rounded-full border border-primary-900/15 px-4 py-2.5 text-sm font-semibold hover:bg-primary-50 dark:border-white/15 dark:hover:bg-white/5">
          <FiRefreshCw className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
        <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-full bg-primary-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-800">
          <FiDownload /> Export CSV
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-primary-900/10 bg-white dark:border-white/10 dark:bg-primary-900/40">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b border-primary-900/10 text-xs uppercase tracking-wide text-stone-500 dark:border-white/10 dark:text-stone-400">
            <tr>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Concern</th>
              <th className="px-4 py-3">Preferred</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-900/5 dark:divide-white/5">
            {loading && <tr><td colSpan="6" className="px-4 py-10 text-center text-stone-400">Loading…</td></tr>}
            {!loading && !items.length && <tr><td colSpan="6" className="px-4 py-10 text-center text-stone-400">No appointments found.</td></tr>}
            {!loading && items.map((a) => (
              <tr key={a._id} className="hover:bg-primary-50/50 dark:hover:bg-white/5">
                <td className="px-4 py-3 font-mono text-xs font-semibold text-primary-700 dark:text-primary-300">{a.appointmentId}</td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-primary-950 dark:text-white">{a.name}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">{a.email} · {a.phone}</p>
                </td>
                <td className="px-4 py-3">{a.treatment || '—'}</td>
                <td className="px-4 py-3">{a.preferredDate ? new Date(a.preferredDate).toLocaleDateString() : '—'}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${badge[a.status]}`}>{a.status}</span></td>
                <td className="px-4 py-3">
                  <select value={a.status} onChange={(e) => changeStatus(a._id, e.target.value)}
                    className="rounded-lg border border-primary-900/10 bg-white px-2 py-1 text-xs dark:border-white/10 dark:bg-primary-900/60 dark:text-white">
                    {STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
