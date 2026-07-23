import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

const field =
  'mt-1 block w-full rounded-xl border border-primary-900/10 bg-white px-4 py-2.5 text-sm text-stone-800 shadow-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-white/10 dark:bg-primary-900/60 dark:text-white';
const label = 'block text-sm font-semibold text-primary-950 dark:text-primary-100';
const errorText = 'mt-1 text-xs font-medium text-rose-600 dark:text-rose-400';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (values) => {
    try {
      await api.post(`/auth/reset-password/${token}`, { password: values.password });
      toast.success('Password updated. Please sign in.');
      navigate('/login', { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset link is invalid or has expired');
    }
  };

  return (
    <>
      <Helmet><title>Set a new password — Health Care & Wellness Clinic</title></Helmet>
      <section className="section-shell flex min-h-[75vh] items-center justify-center py-16">
        <div className="glass-panel w-full max-w-md rounded-3xl p-8">
          <p className="eyebrow text-center">Account recovery</p>
          <h1 className="mt-3 text-center text-3xl font-bold">Set a new password</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-7 space-y-4">
            <div>
              <label className={label} htmlFor="password">New password</label>
              <input id="password" type="password" className={field} placeholder="••••••••"
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'At least 6 characters' } })} />
              {errors.password && <p className={errorText}>{errors.password.message}</p>}
            </div>
            <div>
              <label className={label} htmlFor="confirm">Confirm password</label>
              <input id="confirm" type="password" className={field} placeholder="••••••••"
                {...register('confirm', { required: 'Please confirm', validate: (v) => v === watch('password') || 'Passwords do not match' })} />
              {errors.confirm && <p className={errorText}>{errors.confirm.message}</p>}
            </div>
            <button type="submit" disabled={isSubmitting}
              className="w-full rounded-full bg-primary-700 px-6 py-3 font-bold text-white hover:bg-primary-800 disabled:opacity-60">
              {isSubmitting ? 'Updating…' : 'Update password'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-stone-600 dark:text-stone-300">
            <Link to="/login" className="font-semibold text-primary-700 hover:underline dark:text-primary-300">Back to sign in</Link>
          </p>
        </div>
      </section>
    </>
  );
}
