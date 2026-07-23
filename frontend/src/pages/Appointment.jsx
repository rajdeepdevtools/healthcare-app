import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiUploadCloud } from 'react-icons/fi';
import PageHero from '../component/PageHero';
import api from '../services/api';
import { treatments, clinic } from '../data/siteData';

const field =
  'mt-1 block w-full rounded-xl border border-primary-900/10 bg-white px-4 py-2.5 text-sm text-stone-800 shadow-sm outline-none placeholder:text-stone-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-white/10 dark:bg-primary-900/60 dark:text-white';
const label = 'block text-sm font-semibold text-primary-950 dark:text-primary-100';
const errorText = 'mt-1 text-xs font-medium text-rose-600 dark:text-rose-400';

export default function Appointment() {
  const [confirmed, setConfirmed] = useState(null);
  const {
    register, handleSubmit, reset, formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { gender: '' } });

  const onSubmit = async (values) => {
    try {
      const data = new FormData();
      Object.entries(values).forEach(([key, val]) => {
        if (key === 'report') return;
        if (val !== undefined && val !== null && val !== '') data.append(key, val);
      });
      if (values.report?.[0]) data.append('report', values.report[0]);

      const res = await api.post('/appointments', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setConfirmed(res.data.appointment);
      reset();
      toast.success('Appointment request received!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not submit. Please try again.');
    }
  };

  if (confirmed) {
    return (
      <>
        <Helmet><title>Appointment confirmed — Health Care & Wellness Clinic</title></Helmet>
        <section className="section-shell flex min-h-[70vh] items-center justify-center py-20">
          <div className="glass-panel w-full max-w-lg rounded-3xl p-8 text-center sm:p-10">
            <FiCheckCircle className="mx-auto size-16 text-primary-500" />
            <h1 className="mt-5 text-3xl font-bold">Request received</h1>
            <p className="mt-3 text-stone-600 dark:text-stone-300">
              Thank you, {confirmed.name}. Our team will confirm your slot shortly.
            </p>
            <div className="mt-6 rounded-2xl bg-primary-50 p-5 dark:bg-primary-900/60">
              <p className="eyebrow">Your reference ID</p>
              <p className="mt-1 font-display text-2xl font-bold text-primary-800 dark:text-primary-200">
                {confirmed.appointmentId}
              </p>
              <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                Please keep this ID for follow-ups. A confirmation email is on its way.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={() => setConfirmed(null)}
                className="rounded-full border border-primary-900/15 px-5 py-2.5 text-sm font-bold text-primary-800 hover:bg-primary-50 dark:border-white/15 dark:text-primary-100 dark:hover:bg-white/5">
                Book another
              </button>
              <Link to="/" className="rounded-full bg-primary-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-800">
                Return home
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Book an appointment — Health Care & Wellness Clinic</title>
        <meta name="description" content="Book a consultation at Health Care & Wellness Clinic. Share your concern, preferred date and reports securely." />
      </Helmet>
      <PageHero
        eyebrow="Appointments"
        title="Book your consultation"
        description="Share a few details and your preferred date. Our team will confirm your slot and guide you through the next steps."
        action={false}
      />
      <section className="section-shell grid gap-10 py-16 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={handleSubmit(onSubmit)} noValidate
          className="glass-panel rounded-3xl p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={label} htmlFor="name">Full name *</label>
              <input id="name" className={field} placeholder="e.g. Riya Sharma"
                {...register('name', { required: 'Name is required' })} />
              {errors.name && <p className={errorText}>{errors.name.message}</p>}
            </div>
            <div>
              <label className={label} htmlFor="email">Email *</label>
              <input id="email" type="email" className={field} placeholder="you@example.com"
                {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })} />
              {errors.email && <p className={errorText}>{errors.email.message}</p>}
            </div>
            <div>
              <label className={label} htmlFor="phone">Phone *</label>
              <input id="phone" className={field} placeholder="+91 62018 91533"
                {...register('phone', { required: 'Phone is required', minLength: { value: 7, message: 'Enter a valid phone' } })} />
              {errors.phone && <p className={errorText}>{errors.phone.message}</p>}
            </div>
            <div>
              <label className={label} htmlFor="age">Age</label>
              <input id="age" type="number" min="0" className={field} placeholder="Optional"
                {...register('age')} />
            </div>
            <div>
              <label className={label} htmlFor="gender">Gender</label>
              <select id="gender" className={field} {...register('gender')}>
                <option value="">Prefer not to say</option>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
            <div>
              <label className={label} htmlFor="treatment">Concern / treatment</label>
              <select id="treatment" className={field} {...register('treatment')}>
                <option value="">Select a concern</option>
                {treatments.map((t) => <option key={t.slug} value={t.title}>{t.title}</option>)}
              </select>
            </div>
            <div>
              <label className={label} htmlFor="preferredDate">Preferred date *</label>
              <input id="preferredDate" type="date" className={field}
                {...register('preferredDate', { required: 'Preferred date is required' })} />
              {errors.preferredDate && <p className={errorText}>{errors.preferredDate.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className={label} htmlFor="message">Describe your concern</label>
              <textarea id="message" rows="4" className={field} placeholder="Symptoms, duration, medications…"
                {...register('message')} />
            </div>
            <div className="sm:col-span-2">
              <label className={label} htmlFor="report">Upload report (optional)</label>
              <label htmlFor="report"
                className="mt-1 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-primary-900/20 bg-white px-4 py-3 text-sm text-stone-500 hover:border-primary-400 dark:border-white/15 dark:bg-primary-900/60">
                <FiUploadCloud className="size-5 text-primary-600" />
                <span>PNG, JPG or PDF up to 5MB</span>
              </label>
              <input id="report" type="file" accept="image/png,image/jpeg,image/webp,application/pdf"
                className="mt-2 block w-full text-xs text-stone-500 file:mr-3 file:rounded-full file:border-0 file:bg-primary-100 file:px-4 file:py-1.5 file:text-primary-800"
                {...register('report')} />
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-start gap-3 text-sm text-stone-600 dark:text-stone-300">
                <input type="checkbox" className="mt-1 size-4 rounded border-primary-900/30 text-primary-600 focus:ring-primary-500"
                  {...register('consent', { required: 'Consent is required to proceed' })} />
                <span>I consent to Health Care & Wellness Clinic storing my details to process this appointment.</span>
              </label>
              {errors.consent && <p className={errorText}>{errors.consent.message}</p>}
            </div>
          </div>
          <button type="submit" disabled={isSubmitting}
            className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-primary-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-primary-900/20 hover:bg-primary-800 disabled:opacity-60 sm:w-auto">
            {isSubmitting ? 'Submitting…' : 'Request appointment'}
          </button>
        </form>

        <aside className="space-y-6">
          <div className="glass-panel rounded-3xl p-6">
            <h3 className="font-display text-xl font-bold">What happens next</h3>
            <ol className="mt-4 space-y-3 text-sm text-stone-600 dark:text-stone-300">
              <li>1. You receive a reference ID instantly.</li>
              <li>2. Our team calls or emails to confirm your slot.</li>
              <li>3. Attend your gentle, personalised consultation.</li>
            </ol>
          </div>
          <div className="glass-panel rounded-3xl p-6 text-sm">
            <h3 className="font-display text-xl font-bold">Prefer to talk?</h3>
            <p className="mt-3 text-stone-600 dark:text-stone-300">Call us at <a className="font-semibold text-primary-700 dark:text-primary-300" href={clinic.phoneLink}>{clinic.phone}</a></p>
            <p className="mt-1 text-stone-600 dark:text-stone-300">{clinic.address}</p>
          </div>
        </aside>
      </section>
    </>
  );
}
