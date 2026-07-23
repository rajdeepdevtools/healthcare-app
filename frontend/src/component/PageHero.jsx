import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PageHero({ eyebrow, title, description, action = true, children }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-primary-900/5 bg-[#f4f1e8] py-20 dark:border-white/10 dark:bg-primary-950 sm:py-28">
      <div className="absolute -left-28 top-0 -z-10 size-80 rounded-full bg-primary-300/25 blur-3xl" />
      <div className="absolute -right-20 bottom-0 -z-10 size-72 rounded-full bg-gold-300/20 blur-3xl" />
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="section-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.08] sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-300">{description}</p>
          {action && <Link to="/appointment" className="mt-8 inline-flex rounded-full bg-primary-700 px-6 py-3.5 font-bold text-white shadow-xl shadow-primary-900/20 hover:-translate-y-0.5 hover:bg-primary-800">Book a consultation</Link>}
        </div>
        {children}
      </motion.div>
    </section>
  );
}
