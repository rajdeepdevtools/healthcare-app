import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiPlayCircle, FiStar } from 'react-icons/fi';
import PageHero from '../component/PageHero';
import { courses as sampleCourses } from '../data/siteData';
import { courseDetails } from '../data/content';
import { useCollection } from '../hooks/useCollection';

function priceLabel(course) {
  if (course.price === 0 || course.price === 'Free') return 'Free';
  if (typeof course.price === 'number') return `₹${course.price.toLocaleString('en-IN')}`;
  return course.price || 'Free';
}

const toneBySlug = Object.fromEntries(sampleCourses.map((c) => [c.slug, c.tone]));

export default function Courses() {
  const { data, loading } = useCollection('/courses', sampleCourses);

  return (
    <>
      <Helmet>
        <title>Learning centre — Health Care & Wellness Clinic</title>
        <meta name="description" content="Patient and practitioner courses on classical homeopathy, family wellness and clinical case-taking." />
      </Helmet>

      <PageHero
        eyebrow="Learning centre"
        title="Courses for patients and practitioners"
        description="Learn at your own pace with structured, trustworthy programmes, from everyday family wellness to advanced clinical case-taking."
        action={false}
      />

      <section className="section-shell py-16 sm:py-20">
        {loading && <p className="text-center text-stone-400">Loading courses…</p>}
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {data.map((course) => {
            const lessonCount = course.lessons ?? courseDetails[course.slug]?.lessons?.length;
            const tone = course.tone || toneBySlug[course.slug] || 'from-primary-900 via-primary-700 to-emerald-500';
            return (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link to={`/courses/${course.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-primary-900/8 bg-white shadow-soft hover:-translate-y-1 dark:border-white/10 dark:bg-primary-900/50">
                  <div className={`relative flex h-40 items-end bg-gradient-to-br ${tone} p-5`}>
                    {(course.label || course.level) && (
                      <span className="absolute right-4 top-4 rounded-full bg-white/25 px-3 py-1 text-xs font-bold text-white backdrop-blur">{course.label || course.level}</span>
                    )}
                    <FiPlayCircle className="text-4xl text-white/90 transition-transform group-hover:scale-110" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold leading-snug">{course.title}</h3>
                    <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">by {course.instructor}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-stone-500 dark:text-stone-400">
                      {course.duration && <span className="inline-flex items-center gap-1"><FiClock /> {course.duration}</span>}
                      {lessonCount != null && <span className="inline-flex items-center gap-1"><FiPlayCircle /> {lessonCount} lessons</span>}
                      {course.rating && <span className="inline-flex items-center gap-1 text-gold-500"><FiStar /> {course.rating}</span>}
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-primary-900/8 pt-4 dark:border-white/10">
                      <span className="text-lg font-bold text-primary-800 dark:text-primary-200">{priceLabel(course)}</span>
                      <span className="text-sm font-bold text-primary-700 group-hover:underline dark:text-primary-300">View course</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
