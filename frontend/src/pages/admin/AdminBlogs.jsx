import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FiBold, FiEdit3, FiItalic, FiList, FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import api from '../../services/api';

const field =
  'block w-full rounded-xl border border-primary-900/10 bg-white px-4 py-2.5 text-sm text-stone-800 shadow-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-white/10 dark:bg-primary-900/60 dark:text-white';
const labelC = 'mb-1 block text-sm font-semibold text-primary-950 dark:text-primary-100';

const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 80);
const empty = { title: '', slug: '', category: 'Wellness', excerpt: '', content: '', readTime: '5 min read', status: 'draft' };

export default function AdminBlogs() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = closed, {} = form state
  const [form, setForm] = useState(empty);
  const [slugTouched, setSlugTouched] = useState(false);
  const bodyRef = useRef(null);

  const load = () => {
    setLoading(true);
    // Admin token lets the list return drafts too.
    api.get('/blogs').then((r) => setItems(r.data.data || [])).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(empty); setSlugTouched(false); setEditing('new'); };
  const openEdit = (b) => {
    setForm({ ...empty, ...b, content: Array.isArray(b.content) ? b.content.join('\n\n') : (b.content || '') });
    setSlugTouched(true);
    setEditing(b._id);
  };
  const close = () => setEditing(null);

  const set = (k, v) => setForm((f) => {
    const next = { ...f, [k]: v };
    if (k === 'title' && !slugTouched) next.slug = slugify(v);
    return next;
  });

  const wrap = (before, after = before) => {
    const el = bodyRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const sel = value.slice(s, e) || 'text';
    const next = value.slice(0, s) + before + sel + after + value.slice(e);
    set('content', next);
    requestAnimationFrame(() => { el.focus(); el.selectionStart = s + before.length; el.selectionEnd = s + before.length + sel.length; });
  };

  const save = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) { toast.error('Title and content are required'); return; }
    const payload = { ...form, slug: form.slug || slugify(form.title) };
    if (payload.status === 'published' && !payload.publishedAt) payload.publishedAt = new Date().toISOString();
    try {
      if (editing === 'new') await api.post('/blogs', payload);
      else await api.put(`/blogs/${editing}`, payload);
      toast.success(editing === 'new' ? 'Post created' : 'Post updated');
      close();
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this post permanently?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      setItems((p) => p.filter((b) => b._id !== id));
      toast.success('Post deleted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Content</p>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Blog CMS</h1>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 rounded-full bg-primary-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-800">
          <FiPlus /> New post
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-primary-900/10 bg-white dark:border-white/10 dark:bg-primary-900/40">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-primary-900/10 text-xs uppercase tracking-wide text-stone-500 dark:border-white/10 dark:text-stone-400">
            <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-primary-900/5 dark:divide-white/5">
            {loading && <tr><td colSpan="4" className="px-4 py-10 text-center text-stone-400">Loading…</td></tr>}
            {!loading && !items.length && <tr><td colSpan="4" className="px-4 py-10 text-center text-stone-400">No posts yet. Create your first one.</td></tr>}
            {items.map((b) => (
              <tr key={b._id} className="hover:bg-primary-50/50 dark:hover:bg-white/5">
                <td className="px-4 py-3 font-semibold text-primary-950 dark:text-white">{b.title}</td>
                <td className="px-4 py-3">{b.category}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${b.status === 'published' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300' : 'bg-stone-200 text-stone-600 dark:bg-white/10 dark:text-stone-300'}`}>{b.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEdit(b)} className="grid size-8 place-items-center rounded-lg border border-primary-900/10 hover:bg-primary-50 dark:border-white/10 dark:hover:bg-white/5" aria-label="Edit"><FiEdit3 /></button>
                    <button onClick={() => remove(b._id)} className="grid size-8 place-items-center rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-500/20 dark:hover:bg-rose-500/10" aria-label="Delete"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-[60] flex justify-end bg-primary-950/50 backdrop-blur-sm" onClick={close}>
          <div className="h-full w-full max-w-2xl overflow-y-auto bg-stone-50 p-6 shadow-2xl dark:bg-primary-950 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">{editing === 'new' ? 'New post' : 'Edit post'}</h2>
              <button onClick={close} aria-label="Close" className="grid size-9 place-items-center rounded-full border border-primary-900/10 hover:bg-primary-50 dark:border-white/10 dark:hover:bg-white/5"><FiX /></button>
            </div>
            <form onSubmit={save} className="space-y-4">
              <div>
                <label className={labelC} htmlFor="b-title">Title</label>
                <input id="b-title" className={field} value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="An engaging headline" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelC} htmlFor="b-slug">Slug</label>
                  <input id="b-slug" className={field} value={form.slug} onChange={(e) => { setSlugTouched(true); set('slug', slugify(e.target.value)); }} placeholder="url-friendly-slug" />
                </div>
                <div>
                  <label className={labelC} htmlFor="b-cat">Category</label>
                  <input id="b-cat" className={field} value={form.category} onChange={(e) => set('category', e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelC} htmlFor="b-excerpt">Excerpt</label>
                <textarea id="b-excerpt" rows={2} className={field} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} placeholder="A short summary shown in listings" />
              </div>
              <div>
                <label className={labelC} htmlFor="b-body">Content</label>
                <div className="mb-2 flex gap-1.5">
                  <button type="button" onClick={() => wrap('**')} className="grid size-8 place-items-center rounded-lg border border-primary-900/10 hover:bg-primary-50 dark:border-white/10 dark:hover:bg-white/5" aria-label="Bold"><FiBold /></button>
                  <button type="button" onClick={() => wrap('_')} className="grid size-8 place-items-center rounded-lg border border-primary-900/10 hover:bg-primary-50 dark:border-white/10 dark:hover:bg-white/5" aria-label="Italic"><FiItalic /></button>
                  <button type="button" onClick={() => wrap('\n- ', '')} className="grid size-8 place-items-center rounded-lg border border-primary-900/10 hover:bg-primary-50 dark:border-white/10 dark:hover:bg-white/5" aria-label="List"><FiList /></button>
                </div>
                <textarea id="b-body" ref={bodyRef} rows={12} className={`${field} font-mono`} value={form.content} onChange={(e) => set('content', e.target.value)} placeholder="Write your article. Separate paragraphs with a blank line." />
                <p className="mt-1 text-xs text-stone-400">Tip: separate paragraphs with a blank line. Basic markdown supported.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelC} htmlFor="b-read">Read time</label>
                  <input id="b-read" className={field} value={form.readTime} onChange={(e) => set('readTime', e.target.value)} />
                </div>
                <div>
                  <label className={labelC} htmlFor="b-status">Status</label>
                  <select id="b-status" className={field} value={form.status} onChange={(e) => set('status', e.target.value)}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="rounded-full bg-primary-700 px-6 py-2.5 font-bold text-white hover:bg-primary-800">Save post</button>
                <button type="button" onClick={close} className="rounded-full border border-primary-900/15 px-6 py-2.5 font-semibold hover:bg-primary-50 dark:border-white/15 dark:hover:bg-white/5">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
