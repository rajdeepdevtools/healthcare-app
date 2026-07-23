import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiMail } from 'react-icons/fi';
import api from '../services/api';

const field =
  'mt-1 block w-full rounded-xl border border-primary-900/10 bg-white px-4 py-2.5 text-sm text-stone-800 shadow-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-white/10 dark:bg-primary-900/60 dark:text-white';
const label = 'block text-sm font-semibold text-primary-950 dark:text-primary-100';
const errorText = 'mt-1 text-xs font-medium text-rose-600 dark:text-rose-400';

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [sent, setSent] = useState(false);

  const onSubmit = async (values) => {
    try {
      await api.post('/auth/forgot-password', values);
      setSent(true);
    } catch {
      // Backend intentionally responds success regardless; show the same state.
      setSent(true);
    }
  };

  return (
    <>
      <Helmet><title>Reset password — Health Care & Wellness Clinic</title></Helmet>
      <section className="section-shell flex min-h-[75vh] items-center justify-center py-16">
        <div className="glass-panel w-full max-w-md rounded-3xl p-8">
          {sent ? (
            <div className="text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary-100 text-2xl text-primary-700 dark:bg-white/10 dark:text-primary-300"><FiMail /></span>
              <h1 className="mt-5 text-2xl font-bold">Check your inbox</h1>
              <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">
                If an account exists for that email, we have sent a secure link to reset your password. The link is valid for one hour.
              </p>
              <Link to="/login" className="mt-7 inline-flex rounded-full bg-primary-700 px-6 py-3 font-bold text-white hover:bg-primary-800">Back to sign in</Link>
            </div>
          ) : (
            <>
              <p className="eyebrow text-center">Account recovery</p>
              <h1 className="mt-3 text-center text-3xl font-bold">Forgot your password?</h1>
              <p className="mt-3 text-center text-sm text-stone-600 dark:text-stone-300">Enter your email and we will send you a reset link.</p>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-7 space-y-4">
                <div>
                  <label className={label} htmlFor="email">Email</label>
                  <input id="email" type="email" className={field} placeholder="you@example.com"
                    {...register('email', { required: 'Email is required' })} />
                  {errors.email && <p className={errorText}>{errors.email.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full rounded-full bg-primary-700 px-6 py-3 font-bold text-white hover:bg-primary-800 disabled:opacity-60">
                  {isSubmitting ? 'Sending…' : 'Send reset link'}
                </button>
              </form>
              <p className="mt-6 text-center text-sm text-stone-600 dark:text-stone-300">
                Remembered it? <Link to="/login" className="font-semibold text-primary-700 hover:underline dark:text-primary-300">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
