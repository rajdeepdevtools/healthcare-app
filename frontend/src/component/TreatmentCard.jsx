import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function TreatmentCard({ treatment }) {
  const Icon = treatment.icon;
  return (
    <Link to={`/treatments/${treatment.slug}`} className="group rounded-[1.75rem] border border-primary-900/8 bg-white p-6 shadow-soft hover:-translate-y-1 hover:border-primary-300 dark:border-white/10 dark:bg-primary-900/50">
      <div className="flex items-start justify-between gap-4">
        <span className={`grid size-12 place-items-center rounded-2xl text-xl ${treatment.accent}`}><Icon /></span>
        <FiArrowUpRight className="text-xl text-stone-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-700" />
      </div>
      <h3 className="mt-6 text-xl font-bold">{treatment.title}</h3>
      <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">{treatment.summary}</p>
    </Link>
  );
}
