import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import PageHero from '../component/PageHero';
import SectionHeading from '../component/SectionHeading';
import api from '../services/api';
import { testimonials as sampleTestimonials } from '../data/siteData';

const field =
  'mt-1 block w-full rounded-xl border border-primary-900/10 bg-white px-4 py-2.5 text-sm text-stone-800 shadow-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-white/10 dark:bg-primary-900/60 dark:text-white';
const label = 'block text-sm font-semibold text-primary-950 dark:text-primary-100';
const errorText = 'mt-1 text-xs font-medium text-rose-600 dark:text-rose-400';

function Stars({ value, onChange }) {
  return (
    <div className="mt-1 flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => onChange(n)} aria-label={`${n} star${n > 1 ? 's' : ''}`}
          className={`text-2xl transition-colors ${n <= value ? 'text-gold-400' : 'text-stone-300 dark:text-stone-600'}`}>
          <FiStar className={n <= value ? 'fill-current' : ''} />
        </button>
      ))}
    </div>
  );
}

export default function Feedback() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [rating, setRating] = useState(5);
  const [approved, setApproved] = useState([]);

  useEffect(() => {
    api.get('/feedback')
      .then((res) => setApproved(res.data?.data || []))
      .catch(() => setApproved([]));
  }, []);

  const onSubmit = async (values) => {
    try {
      await api.post('/feedback', { ...values, rating });
      toast.success('Thank you! Your feedback is awaiting review.');
      reset();
      setRating(5);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not submit feedback');
    }
  };

  const display = approved.length
    ? approved.map((f) => ({ name: f.name, text: f.message, rating: f.rating, initials: f.name.split(' ').map((s) => s[0]).slice(0, 2).join('') }))
    : sampleTestimonials.map((t) => ({ ...t, rating: 5 }));

  return (
    <>
      <Helmet>
        <title>Patient feedback — Health Care & Wellness Clinic</title>
        <meta name="description" content="Read what our patients say, and share your own experience of care at Health Care & Wellness Clinic." />
      </Helmet>

      <PageHero
        eyebrow="Your voice matters"
        title="Patient stories & feedback"
        description="Real experiences from the people we care for, and a place to share yours. Every submission is reviewed before it appears."
        action={false}
      />

      <section className="section-shell grid gap-12 py-16 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <SectionHeading align="left" eyebrow="Kind words" title="What our patients say" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {display.map((t, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[1.5rem] border border-primary-900/8 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-primary-900/50"
              >
                <div className="flex gap-0.5 text-gold-400">
                  {Array.from({ length: t.rating || 5 }).map((_, s) => <FiStar key={s} className="fill-current" />)}
                </div>
                <p className="mt-4 text-sm leading-6 text-stone-600 dark:text-stone-300">“{t.text}”</p>
                <footer className="mt-5 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-primary-100 text-sm font-bold text-primary-800 dark:bg-white/10 dark:text-primary-200">{t.initials}</span>
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    {t.location && <p className="text-xs text-stone-500 dark:text-stone-400">{t.location}</p>}
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-[1.75rem] border border-primary-900/8 bg-[#f4f1e8] p-7 shadow-soft dark:border-white/10 dark:bg-primary-900/50 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold">Share your experience</h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">We would love to hear how your care has been.</p>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-4">
              <div>
                <label className={label} htmlFor="fb-name">Your name</label>
                <input id="fb-name" className={field} placeholder="Full name" {...register('name', { required: 'Name is required' })} />
                {errors.name && <p className={errorText}>{errors.name.message}</p>}
              </div>
              <div>
                <label className={label} htmlFor="fb-email">Email <span className="font-normal text-stone-400">(optional)</span></label>
                <input id="fb-email" type="email" className={field} placeholder="you@example.com" {...register('email')} />
              </div>
              <div>
                <span className={label}>Your rating</span>
                <Stars value={rating} onChange={setRating} />
              </div>
              <div>
                <label className={label} htmlFor="fb-message">Your feedback</label>
                <textarea id="fb-message" rows={4} className={field} placeholder="Tell us about your experience…" {...register('message', { required: 'Please share a few words' })} />
                {errors.message && <p className={errorText}>{errors.message.message}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-primary-700 px-6 py-3 font-bold text-white hover:bg-primary-800 disabled:opacity-60">
                {isSubmitting ? 'Submitting…' : 'Submit feedback'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
