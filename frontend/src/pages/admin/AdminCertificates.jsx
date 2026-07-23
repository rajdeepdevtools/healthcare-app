import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiAward, FiEye, FiPlus, FiSlash, FiX } from 'react-icons/fi';
import api from '../../services/api';
import CertificateView from '../../component/CertificateView';

const field =
  'block w-full rounded-xl border border-primary-900/10 bg-white px-4 py-2.5 text-sm text-stone-800 shadow-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-white/10 dark:bg-primary-900/60 dark:text-white';
const labelC = 'mb-1 block text-sm font-semibold text-primary-950 dark:text-primary-100';

export default function AdminCertificates() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ recipientName: '', recipientEmail: '', courseTitle: '' });
  const [creating, setCreating] = useState(false);
  const [preview, setPreview] = useState(null);

  const load = () => {
    setLoading(true);
    api.get('/certificates').then((r) => setItems(r.data.data || [])).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const issue = async (e) => {
    e.preventDefault();
    if (!form.recipientName || !form.courseTitle) { toast.error('Recipient and course are required'); return; }
    setCreating(true);
    try {
      const res = await api.post('/certificates', form);
      toast.success(`Issued ${res.data.data.certificateId}`);
      setForm({ recipientName: '', recipientEmail: '', courseTitle: '' });
      setItems((p) => [res.data.data, ...p]);
      setPreview(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not issue certificate');
    } finally {
      setCreating(false);
    }
  };

  const revoke = async (id) => {
    if (!window.confirm('Revoke this certificate? It will fail verification.')) return;
    try {
      await api.patch(`/certificates/${id}/revoke`);
      setItems((p) => p.map((c) => (c._id === id ? { ...c, status: 'revoked' } : c)));
      toast.success('Certificate revoked');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Revoke failed');
    }
  };

  return (
    <>
      <div className="mb-6">
        <p className="eyebrow">Recognition</p>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Certificates</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={issue} className="h-fit rounded-2xl border border-primary-900/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-primary-900/50">
          <h2 className="flex items-center gap-2 text-lg font-bold"><FiPlus /> Issue new</h2>
          <div className="mt-4 space-y-3">
            <div><label className={labelC} htmlFor="ct-name">Recipient name</label><input id="ct-name" className={field} value={form.recipientName} onChange={(e) => setForm({ ...form, recipientName: e.target.value })} /></div>
            <div><label className={labelC} htmlFor="ct-email">Recipient email</label><input id="ct-email" type="email" className={field} value={form.recipientEmail} onChange={(e) => setForm({ ...form, recipientEmail: e.target.value })} /></div>
            <div><label className={labelC} htmlFor="ct-course">Course title</label><input id="ct-course" className={field} value={form.courseTitle} onChange={(e) => setForm({ ...form, courseTitle: e.target.value })} /></div>
          </div>
          <button type="submit" disabled={creating} className="mt-5 w-full rounded-full bg-primary-700 px-6 py-2.5 font-bold text-white hover:bg-primary-800 disabled:opacity-60">{creating ? 'Issuing…' : 'Issue certificate'}</button>
        </form>

        <div className="lg:col-span-2">
          {loading && <p className="text-stone-400">Loading…</p>}
          {!loading && !items.length && <p className="rounded-2xl border border-dashed border-primary-900/15 p-10 text-center text-stone-400 dark:border-white/10">No certificates issued yet.</p>}
          <div className="space-y-3">
            {items.map((c) => (
              <div key={c._id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-primary-900/10 bg-white p-4 dark:border-white/10 dark:bg-primary-900/50">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold-400/15 text-gold-500"><FiAward /></span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-primary-950 dark:text-white">{c.recipientName}</p>
                  <p className="truncate text-xs text-stone-500 dark:text-stone-400">{c.courseTitle}</p>
                  <p className="font-mono text-xs text-primary-700 dark:text-primary-300">{c.certificateId}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${c.status === 'valid' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'}`}>{c.status}</span>
                <button onClick={() => setPreview(c)} className="grid size-8 place-items-center rounded-lg border border-primary-900/10 hover:bg-primary-50 dark:border-white/10 dark:hover:bg-white/5" aria-label="Preview"><FiEye /></button>
                {c.status === 'valid' && <button onClick={() => revoke(c._id)} className="grid size-8 place-items-center rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-500/20 dark:hover:bg-rose-500/10" aria-label="Revoke"><FiSlash /></button>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {preview && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-primary-950/70 p-4 backdrop-blur overflow-y-auto" onClick={() => setPreview(null)}>
          <div className="w-full max-w-4xl my-auto" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex justify-end">
              <button onClick={() => setPreview(null)} aria-label="Close" className="grid size-9 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"><FiX /></button>
            </div>

            <CertificateView cert={preview} />

            <div className="mt-4 flex justify-center gap-3">
              <button onClick={() => window.print()} className="rounded-full bg-primary-700 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-primary-800 transition-all">
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
