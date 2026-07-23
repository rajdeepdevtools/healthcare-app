import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { treatments } from '../data/siteData';
import { treatmentDetails } from '../data/content';
import { useItem } from '../hooks/useCollection';

const genericApproach = [
  ['Detailed assessment', 'A thorough first consultation covering your history, lifestyle, triggers and prior treatment.'],
  ['Personalised plan', 'A remedy and lifestyle plan matched to your individual constitution.'],
  ['Monitored recovery', 'Structured follow-up reviews to track progress and prevent recurrence.'],
];

export default function TreatmentDetail() {
  const { slug } = useParams();
  const { data, loading } = useItem('/treatments', slug, treatments);
  const base = treatments.find((t) => t.slug === slug);
  const extra = treatmentDetails[slug] || {};
  const Icon = base?.icon || treatments[0].icon;

  if (loading && !data) {
    return <section className="section-shell py-24 text-center text-stone-400">Loading…</section>;
  }

  if (!data && !base) {
    return (
      <section className="section-shell py-24 text-center">
        <h1 className="text-3xl font-bold">Treatment not found</h1>
        <Link to="/treatments" className="mt-6 inline-flex text-primary-700 hover:underline dark:text-primary-300">Back to treatments</Link>
      </section>
    );
  }

  const title = data?.title || base?.title;
  const summary = data?.summary || base?.summary;
  const description = data?.description || extra.description || summary;
  const highlights = extra.highlights || ['Root-cause case taking', 'Personalised remedies', 'Lifestyle guidance', 'Structured follow-up'];
  const approach = extra.approach || genericApproach;

  return (
    <>
      <Helmet>
        <title>{title} — Health Care & Wellness Clinic</title>
        <meta name="description" content={summary} />
      </Helmet>

      <section className="relative isolate overflow-hidden border-b border-primary-900/5 bg-[#f4f1e8] py-16 dark:border-white/10 dark:bg-primary-950 sm:py-20">
        <div className="absolute -right-20 top-0 -z-10 size-72 rounded-full bg-primary-300/25 blur-3xl" />
        <div className="section-shell">
          <Link to="/treatments" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:underline dark:text-primary-300">
            <FiArrowLeft /> All treatments
          </Link>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex items-start gap-5">
            <span className={`hidden size-16 shrink-0 place-items-center rounded-2xl text-3xl sm:grid ${base?.accent || 'bg-primary-50 text-primary-700'}`}><Icon /></span>
            <div>
              <h1 className="text-balance text-4xl font-bold sm:text-5xl">{title}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-300">{summary}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-shell grid gap-10 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold">Our approach</h2>
          <p className="mt-4 leading-8 text-stone-600 dark:text-stone-300">{description}</p>

          <div className="mt-10 grid gap-4">
            {approach.map(([step, text], i) => (
              <div key={step} className="flex gap-4 rounded-2xl border border-primary-900/8 bg-white p-5 dark:border-white/10 dark:bg-primary-900/50">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-100 font-bold text-primary-800 dark:bg-white/10 dark:text-primary-200">{i + 1}</span>
                <div>
                  <h3 className="font-bold">{step}</h3>
                  <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-300">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-[1.75rem] border border-primary-900/8 bg-white p-7 shadow-soft dark:border-white/10 dark:bg-primary-900/50">
          <h3 className="text-lg font-bold">What this care includes</h3>
          <ul className="mt-5 space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm text-stone-600 dark:text-stone-300">
                <FiCheck className="mt-0.5 shrink-0 text-primary-600 dark:text-primary-400" /> {h}
              </li>
            ))}
          </ul>
          <Link to="/appointment" className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-primary-700 px-6 py-3 font-bold text-white hover:bg-primary-800">
            Book a consultation
          </Link>
        </aside>
      </section>
    </>
  );
}
