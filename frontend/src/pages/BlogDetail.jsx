import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock } from 'react-icons/fi';
import { blogPosts } from '../data/content';
import { useItem } from '../hooks/useCollection';

// Content may arrive as an array of paragraphs (sample) or an HTML/string blob (API).
function renderBody(content) {
  if (Array.isArray(content)) {
    return content.map((para, i) => (
      <p key={i} className="mt-6 leading-8 text-stone-600 dark:text-stone-300">{para}</p>
    ));
  }
  if (typeof content === 'string' && /<[a-z][\s\S]*>/i.test(content)) {
    // eslint-disable-next-line react/no-danger
    return <div className="mt-6 space-y-4 leading-8 text-stone-600 dark:text-stone-300" dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return String(content || '')
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((para, i) => <p key={i} className="mt-6 leading-8 text-stone-600 dark:text-stone-300">{para}</p>);
}

export default function BlogDetail() {
  const { slug } = useParams();
  const { data: post, loading } = useItem('/blogs', slug, blogPosts);
  const tone = blogPosts.find((p) => p.slug === slug)?.tone || 'from-primary-800 to-emerald-500';

  if (loading && !post) return <section className="section-shell py-24 text-center text-stone-400">Loading…</section>;

  if (!post) {
    return (
      <section className="section-shell py-24 text-center">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <Link to="/blog" className="mt-6 inline-flex text-primary-700 hover:underline dark:text-primary-300">Back to the journal</Link>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} — Health Care & Wellness Clinic</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article className="pb-20">
        <div className={`bg-gradient-to-br ${tone} py-16 sm:py-20`}>
          <div className="section-shell max-w-3xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white">
              <FiArrowLeft /> Health journal
            </Link>
            <span className="mt-6 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">{post.category}</span>
            <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-balance font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
              {post.title}
            </motion.h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-medium text-white/90">
              <span>{post.author || 'Wellness Clinic'}</span><span>•</span>
              <span>{post.date || (post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Recent')}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1"><FiClock /> {post.readTime || '5 min read'}</span>
            </div>
          </div>
        </div>

        <div className="section-shell mt-12 max-w-3xl">
          {post.excerpt && <p className="text-xl font-medium leading-8 text-stone-700 dark:text-stone-200">{post.excerpt}</p>}
          {renderBody(post.content)}

          <div className="mt-14 rounded-[1.75rem] border border-primary-900/8 bg-[#f4f1e8] p-8 text-center dark:border-white/10 dark:bg-primary-900/50">
            <h3 className="text-xl font-bold">Have a question about your health?</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-600 dark:text-stone-300">Book a consultation and get personalised, honest guidance from our team.</p>
            <Link to="/appointment" className="mt-6 inline-flex rounded-full bg-primary-700 px-6 py-3 font-bold text-white hover:bg-primary-800">Book a consultation</Link>
          </div>
        </div>
      </article>
    </>
  );
}
