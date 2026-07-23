import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiClock } from 'react-icons/fi';
import PageHero from '../component/PageHero';
import { blogPosts } from '../data/content';
import { useCollection } from '../hooks/useCollection';

function toneFor(slug) {
  return blogPosts.find((p) => p.slug === slug)?.tone || 'from-primary-800 to-emerald-500';
}

export default function Blog() {
  const { data, loading } = useCollection('/blogs', blogPosts);
  const [active, setActive] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(data.map((p) => p.category).filter(Boolean))], [data]);
  const posts = active === 'All' ? data : data.filter((p) => p.category === active);
  const [featured, ...rest] = posts;

  return (
    <>
      <Helmet>
        <title>Health journal — Health Care & Wellness Clinic</title>
        <meta name="description" content="Practical, compassionate insights on holistic health, immunity, migraine care and everyday wellbeing." />
      </Helmet>

      <PageHero
        eyebrow="Health journal"
        title="Insights for a calmer, healthier everyday"
        description="Practical articles from our clinic on holistic care, immunity, and living well, written to be genuinely useful."
        action={false}
      />

      <section className="section-shell py-14 sm:py-16">
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active === c
                  ? 'bg-primary-700 text-white'
                  : 'border border-primary-900/10 text-stone-600 hover:bg-primary-50 dark:border-white/10 dark:text-stone-300 dark:hover:bg-white/5'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading && <p className="text-center text-stone-400">Loading articles…</p>}
        {!loading && !posts.length && <p className="text-center text-stone-500">No articles in this category yet.</p>}

        {featured && (
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Link to={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[2rem] border border-primary-900/8 bg-white shadow-soft dark:border-white/10 dark:bg-primary-900/50 lg:grid-cols-2">
              <div className={`relative min-h-56 bg-gradient-to-br ${toneFor(featured.slug)} p-8 overflow-hidden`}>
                <img src={`https://picsum.photos/seed/${featured.slug}/800/600`} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 transition-transform duration-700 group-hover:scale-105" />
                <span className="relative z-10 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur shadow-sm">{featured.category}</span>
              </div>
              <div className="p-8 sm:p-10">
                <div className="flex items-center gap-3 text-xs font-semibold text-stone-500 dark:text-stone-400">
                  <span>{featured.date || 'Recent'}</span><span>•</span>
                  <span className="inline-flex items-center gap-1"><FiClock /> {featured.readTime || '5 min read'}</span>
                </div>
                <h2 className="mt-4 text-balance text-2xl font-bold leading-tight sm:text-3xl">{featured.title}</h2>
                <p className="mt-4 leading-7 text-stone-600 dark:text-stone-300">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1 font-bold text-primary-700 group-hover:gap-2 dark:text-primary-300">Read article <FiArrowUpRight /></span>
              </div>
            </Link>
          </motion.div>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-primary-900/8 bg-white shadow-soft hover:-translate-y-1 dark:border-white/10 dark:bg-primary-900/50">
              <div className={`relative h-40 bg-gradient-to-br ${toneFor(post.slug)} p-5 overflow-hidden`}>
                <img src={`https://picsum.photos/seed/${post.slug}/600/400`} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 transition-transform duration-700 group-hover:scale-110" />
                <span className="relative z-10 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur shadow-sm">{post.category}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 dark:text-stone-400">
                  <span>{post.date || 'Recent'}</span><span>•</span><span>{post.readTime || '5 min read'}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug">{post.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-stone-600 dark:text-stone-300">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary-700 group-hover:gap-2 dark:text-primary-300">Read more <FiArrowUpRight /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
