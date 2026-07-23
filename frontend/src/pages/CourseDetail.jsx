import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiCheck, FiClock, FiLock, FiPlayCircle, FiStar } from 'react-icons/fi';
import { courses as sampleCourses } from '../data/siteData';
import { courseDetails } from '../data/content';
import { useItem } from '../hooks/useCollection';
import { useAuth } from '../context/AuthContext';

function priceLabel(price) {
  if (price === 0 || price === 'Free') return 'Free';
  if (typeof price === 'number') return `₹${price.toLocaleString('en-IN')}`;
  return price || 'Free';
}

export default function CourseDetail() {
  const { slug } = useParams();
  const { data: course, loading } = useItem('/courses', slug, sampleCourses);
  const { isAuthenticated } = useAuth();
  const [enrolled, setEnrolled] = useState(false);
  const extra = courseDetails[slug] || {};
  const tone = sampleCourses.find((c) => c.slug === slug)?.tone || 'from-primary-900 via-primary-700 to-emerald-500';

  if (loading && !course) return <section className="section-shell py-24 text-center text-stone-400">Loading…</section>;

  if (!course) {
    return (
      <section className="section-shell py-24 text-center">
        <h1 className="text-3xl font-bold">Course not found</h1>
        <Link to="/courses" className="mt-6 inline-flex text-primary-700 hover:underline dark:text-primary-300">Back to courses</Link>
      </section>
    );
  }

  const lessons = extra.lessons || [];
  const outcomes = extra.outcomes || [];
  const description = course.description || extra.description || '';

  const enroll = () => {
    if (!isAuthenticated) { toast.error('Please sign in to enrol'); return; }
    setEnrolled(true);
    toast.success('You are enrolled! Enjoy the course.');
  };

  return (
    <>
      <Helmet>
        <title>{course.title} — Wellness Learning</title>
        <meta name="description" content={description.slice(0, 150)} />
      </Helmet>

      <div className={`bg-gradient-to-br ${tone} py-16 sm:py-20`}>
        <div className="section-shell">
          <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white">
            <FiArrowLeft /> Learning centre
          </Link>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-6 max-w-3xl">
            {(course.label || course.level) && (
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">{course.label || course.level}</span>
            )}
            <h1 className="mt-4 text-balance font-display text-3xl font-bold text-white sm:text-5xl">{course.title}</h1>
            <p className="mt-4 text-lg text-white/90">by {course.instructor}</p>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm font-semibold text-white/90">
              {course.duration && <span className="inline-flex items-center gap-1"><FiClock /> {course.duration}</span>}
              {lessons.length > 0 && <span className="inline-flex items-center gap-1"><FiPlayCircle /> {lessons.length} lessons</span>}
              {course.rating && <span className="inline-flex items-center gap-1"><FiStar /> {course.rating} rating</span>}
            </div>
          </motion.div>
        </div>
      </div>

      <section className="section-shell grid gap-10 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold">About this course</h2>
          <p className="mt-4 leading-8 text-stone-600 dark:text-stone-300">{description}</p>

          {outcomes.length > 0 && (
            <>
              <h3 className="mt-10 text-xl font-bold">What you will learn</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-sm text-stone-600 dark:text-stone-300">
                    <FiCheck className="mt-0.5 shrink-0 text-primary-600 dark:text-primary-400" /> {o}
                  </li>
                ))}
              </ul>
            </>
          )}

          {lessons.length > 0 && (
            <>
              <h3 className="mt-10 text-xl font-bold">Course content</h3>
              <div className="mt-5 divide-y divide-primary-900/8 overflow-hidden rounded-2xl border border-primary-900/8 dark:divide-white/10 dark:border-white/10">
                {lessons.map((lesson, i) => {
                  const open = enrolled || lesson.isFreePreview;
                  return (
                    <div key={i} className="flex items-center gap-4 bg-white p-4 dark:bg-primary-900/50">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary-100 text-sm font-bold text-primary-800 dark:bg-white/10 dark:text-primary-200">{i + 1}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{lesson.title}</p>
                        {lesson.isFreePreview && !enrolled && <span className="text-xs font-bold text-primary-600 dark:text-primary-400">Free preview</span>}
                      </div>
                      <span className="text-xs text-stone-500 dark:text-stone-400">{lesson.duration}</span>
                      {open ? <FiPlayCircle className="text-primary-600 dark:text-primary-400" /> : <FiLock className="text-stone-400" />}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <aside className="h-fit rounded-[1.75rem] border border-primary-900/8 bg-white p-7 shadow-soft dark:border-white/10 dark:bg-primary-900/50 lg:sticky lg:top-24">
          <p className="text-3xl font-bold text-primary-800 dark:text-primary-200">{priceLabel(course.price)}</p>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">Lifetime access • Learn at your pace</p>
          {enrolled ? (
            <div className="mt-6 flex items-center justify-center gap-2 rounded-full bg-primary-100 px-6 py-3 font-bold text-primary-800 dark:bg-white/10 dark:text-primary-200">
              <FiCheck /> Enrolled
            </div>
          ) : (
            <button type="button" onClick={enroll} className="mt-6 w-full rounded-full bg-primary-700 px-6 py-3 font-bold text-white hover:bg-primary-800">
              {priceLabel(course.price) === 'Free' ? 'Enrol for free' : 'Enrol now'}
            </button>
          )}
          {!isAuthenticated && (
            <p className="mt-4 text-center text-xs text-stone-500 dark:text-stone-400">
              <Link to="/login" className="font-semibold text-primary-700 hover:underline dark:text-primary-300">Sign in</Link> to track your progress.
            </p>
          )}
        </aside>
      </section>
    </>
  );
}
