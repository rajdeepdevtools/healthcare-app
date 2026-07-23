import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const field =
  'mt-1 block w-full rounded-xl border border-primary-900/10 bg-white px-4 py-2.5 text-sm text-stone-800 shadow-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-white/10 dark:bg-primary-900/60 dark:text-white';
const label = 'block text-sm font-semibold text-primary-950 dark:text-primary-100';
const errorText = 'mt-1 text-xs font-medium text-rose-600 dark:text-rose-400';

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (values) => {
    try {
      const res = await api.post('/auth/login', values);
      login({ token: res.data.token, user: res.data.user });
      toast.success(`Welcome back, ${res.data.user.name.split(' ')[0]}!`);
      const dest = location.state?.from
        || (['admin', 'doctor'].includes(res.data.user.role) ? '/admin/appointments' : '/portal');
      navigate(dest, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <>
      <Helmet><title>Sign in — Health Care & Wellness Clinic</title></Helmet>
      <section className="section-shell flex min-h-[75vh] items-center justify-center py-16">
        <div className="glass-panel w-full max-w-md rounded-3xl p-8">
          <p className="eyebrow text-center">Patient portal</p>
          <h1 className="mt-3 text-center text-3xl font-bold">Welcome back</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-7 space-y-4">
            <div>
              <label className={label} htmlFor="email">Email</label>
              <input id="email" type="email" className={field} placeholder="you@example.com"
                {...register('email', { required: 'Email is required' })} />
              {errors.email && <p className={errorText}>{errors.email.message}</p>}
            </div>
            <div>
              <label className={label} htmlFor="password">Password</label>
              <input id="password" type="password" className={field} placeholder="••••••••"
                {...register('password', { required: 'Password is required' })} />
              {errors.password && <p className={errorText}>{errors.password.message}</p>}
            </div>
            <div className="text-right">
              <Link to="/forgot-password" className="text-xs font-semibold text-primary-700 hover:underline dark:text-primary-300">Forgot password?</Link>
            </div>
            <button type="submit" disabled={isSubmitting}
              className="w-full rounded-full bg-primary-700 px-6 py-3 font-bold text-white hover:bg-primary-800 disabled:opacity-60">
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-stone-600 dark:text-stone-300">
            New here? <Link to="/register" className="font-semibold text-primary-700 hover:underline dark:text-primary-300">Create an account</Link>
          </p>
        </div>
      </section>
    </>
  );
}
