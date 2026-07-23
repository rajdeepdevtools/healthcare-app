import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiBookOpen, FiChevronDown, FiEdit3, FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import api from '../../services/api';

const field =
  'block w-full rounded-xl border border-primary-900/10 bg-white px-4 py-2.5 text-sm text-stone-800 shadow-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-white/10 dark:bg-primary-900/60 dark:text-white';
const labelC = 'mb-1 block text-sm font-semibold text-primary-950 dark:text-primary-100';
const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 80);
const emptyCourse = { title: '', slug: '', instructor: 'Wellness Learning', description: '', duration: '', level: 'Beginner', price: 0, isPublished: false };

export default function AdminCourses() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyCourse);
  const [expanded, setExpanded] = useState(null);

  const load = () => {
    setLoading(true);
    api.get('/courses').then((r) => setItems(r.data.data || [])).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const set = (k, v) => setForm((f) => {
    const next = { ...f, [k]: v };
    if (k === 'title' && editing === 'new') next.slug = slugify(v);
    return next;
  });

  const save = async (e) => {
    e.preventDefault();
    if (!form.title) { toast.error('Title is required'); return; }
    const payload = { ...form, slug: form.slug || slugify(form.title), price: Number(form.price) || 0 };
    try {
      if (editing === 'new') await api.post('/courses', payload);
      else await api.put(`/courses/${editing}`, payload);
      toast.success('Course saved');
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await api.delete(`/courses/${id}`);
      setItems((p) => p.filter((c) => c._id !== id));
      toast.success('Course deleted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Content</p>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Courses & lessons</h1>
        </div>
        <button onClick={() => { setForm(emptyCourse); setEditing('new'); }} className="inline-flex items-center gap-2 rounded-full bg-primary-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-800">
          <FiPlus /> New course
        </button>
      </div>

      {loading && <p className="text-stone-400">Loading…</p>}
      {!loading && !items.length && <p className="rounded-2xl border border-dashed border-primary-900/15 p-10 text-center text-stone-400 dark:border-white/10">No courses yet. Create your first one.</p>}

      <div className="space-y-3">
        {items.map((c) => (
          <div key={c._id} className="rounded-2xl border border-primary-900/10 bg-white dark:border-white/10 dark:bg-primary-900/40">
            <div className="flex items-center gap-4 p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-100 text-primary-700 dark:bg-white/10 dark:text-primary-200"><FiBookOpen /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-primary-950 dark:text-white">{c.title}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">{c.level} · {c.price ? `₹${c.price}` : 'Free'} · {c.isPublished ? 'Published' : 'Draft'}</p>
              </div>
              <button onClick={() => setExpanded(expanded === c._id ? null : c._id)} className="inline-flex items-center gap-1 rounded-lg border border-primary-900/10 px-3 py-1.5 text-xs font-semibold hover:bg-primary-50 dark:border-white/10 dark:hover:bg-white/5">
                Lessons <FiChevronDown className={`transition-transform ${expanded === c._id ? 'rotate-180' : ''}`} />
              </button>
              <button onClick={() => { setForm({ ...emptyCourse, ...c }); setEditing(c._id); }} className="grid size-8 place-items-center rounded-lg border border-primary-900/10 hover:bg-primary-50 dark:border-white/10 dark:hover:bg-white/5" aria-label="Edit"><FiEdit3 /></button>
              <button onClick={() => remove(c._id)} className="grid size-8 place-items-center rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-500/20 dark:hover:bg-rose-500/10" aria-label="Delete"><FiTrash2 /></button>
            </div>
            {expanded === c._id && <LessonManager courseId={c._id} />}
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[60] flex justify-end bg-primary-950/50 backdrop-blur-sm" onClick={() => setEditing(null)}>
          <div className="h-full w-full max-w-xl overflow-y-auto bg-stone-50 p-6 shadow-2xl dark:bg-primary-950 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">{editing === 'new' ? 'New course' : 'Edit course'}</h2>
              <button onClick={() => setEditing(null)} aria-label="Close" className="grid size-9 place-items-center rounded-full border border-primary-900/10 hover:bg-primary-50 dark:border-white/10 dark:hover:bg-white/5"><FiX /></button>
            </div>
            <form onSubmit={save} className="space-y-4">
              <div><label className={labelC} htmlFor="c-title">Title</label><input id="c-title" className={field} value={form.title} onChange={(e) => set('title', e.target.value)} /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className={labelC} htmlFor="c-slug">Slug</label><input id="c-slug" className={field} value={form.slug} onChange={(e) => set('slug', slugify(e.target.value))} /></div>
                <div><label className={labelC} htmlFor="c-instr">Instructor</label><input id="c-instr" className={field} value={form.instructor} onChange={(e) => set('instructor', e.target.value)} /></div>
              </div>
              <div><label className={labelC} htmlFor="c-desc">Description</label><textarea id="c-desc" rows={4} className={field} value={form.description} onChange={(e) => set('description', e.target.value)} /></div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div><label className={labelC} htmlFor="c-dur">Duration</label><input id="c-dur" className={field} placeholder="8 weeks" value={form.duration} onChange={(e) => set('duration', e.target.value)} /></div>
                <div>
                  <label className={labelC} htmlFor="c-level">Level</label>
                  <select id="c-level" className={field} value={form.level} onChange={(e) => set('level', e.target.value)}>
                    <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                  </select>
                </div>
                <div><label className={labelC} htmlFor="c-price">Price (₹)</label><input id="c-price" type="number" min="0" className={field} value={form.price} onChange={(e) => set('price', e.target.value)} /></div>
              </div>
              <label className="flex items-center gap-3 text-sm font-semibold">
                <input type="checkbox" checked={form.isPublished} onChange={(e) => set('isPublished', e.target.checked)} className="size-4 rounded" /> Published (visible to public)
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="rounded-full bg-primary-700 px-6 py-2.5 font-bold text-white hover:bg-primary-800">Save course</button>
                <button type="button" onClick={() => setEditing(null)} className="rounded-full border border-primary-900/15 px-6 py-2.5 font-semibold hover:bg-primary-50 dark:border-white/15 dark:hover:bg-white/5">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function LessonManager({ courseId }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState({ title: '', duration: '', videoUrl: '', isFreePreview: false });

  const load = () => {
    setLoading(true);
    api.get('/lessons', { params: { course: courseId } })
      .then((r) => setLessons((r.data.data || []).filter((l) => String(l.course) === String(courseId))))
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [courseId]);

  const add = async (e) => {
    e.preventDefault();
    if (!draft.title) { toast.error('Lesson title required'); return; }
    try {
      await api.post('/lessons', { ...draft, course: courseId, order: lessons.length });
      setDraft({ title: '', duration: '', videoUrl: '', isFreePreview: false });
      toast.success('Lesson added');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not add lesson');
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/lessons/${id}`);
      setLessons((p) => p.filter((l) => l._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const cell = 'rounded-lg border border-primary-900/10 bg-white px-3 py-2 text-sm outline-none focus:border-primary-500 dark:border-white/10 dark:bg-primary-900/60 dark:text-white';

  return (
    <div className="border-t border-primary-900/10 bg-stone-50/60 p-4 dark:border-white/10 dark:bg-primary-950/40">
      {loading ? <p className="text-xs text-stone-400">Loading lessons…</p> : (
        <ul className="mb-3 space-y-2">
          {!lessons.length && <li className="text-xs text-stone-400">No lessons yet.</li>}
          {lessons.map((l, i) => (
            <li key={l._id} className="flex items-center gap-3 rounded-lg bg-white px-3 py-2 text-sm dark:bg-primary-900/50">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-100 text-xs font-bold text-primary-800 dark:bg-white/10 dark:text-primary-200">{i + 1}</span>
              <span className="flex-1 truncate font-medium">{l.title}</span>
              {l.isFreePreview && <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-bold text-primary-700 dark:bg-white/10 dark:text-primary-200">Preview</span>}
              <span className="text-xs text-stone-400">{l.duration}</span>
              <button onClick={() => remove(l._id)} className="text-rose-500 hover:text-rose-700" aria-label="Remove lesson"><FiTrash2 /></button>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={add} className="grid gap-2 sm:grid-cols-[1fr_120px_auto]">
        <input className={cell} placeholder="Lesson title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
        <input className={cell} placeholder="Duration" value={draft.duration} onChange={(e) => setDraft({ ...draft, duration: e.target.value })} />
        <button type="submit" className="inline-flex items-center justify-center gap-1 rounded-lg bg-primary-700 px-4 py-2 text-sm font-bold text-white hover:bg-primary-800"><FiPlus /> Add</button>
        <label className="flex items-center gap-2 text-xs font-semibold sm:col-span-3">
          <input type="checkbox" checked={draft.isFreePreview} onChange={(e) => setDraft({ ...draft, isFreePreview: e.target.checked })} /> Free preview lesson
        </label>
      </form>
    </div>
  );
}
