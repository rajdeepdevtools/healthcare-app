import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const field =
  'mt-1 block w-full rounded-xl border border-primary-900/10 bg-white px-4 py-2.5 text-sm text-stone-800 shadow-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-white/10 dark:bg-primary-900/60 dark:text-white';
const label = 'block text-sm font-semibold text-primary-950 dark:text-primary-100';
const errorText = 'mt-1 text-xs font-medium text-rose-600 dark:text-rose-400';

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const res = await api.post('/auth/register', values);
      login({ token: res.data.token, user: res.data.user });
      toast.success('Account created!');
      navigate('/portal', { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not create account');
    }
  };

  return (
    <>
      <Helmet><title>Create account — Health Care & Wellness Clinic</title></Helmet>
      <section className="section-shell flex min-h-[75vh] items-center justify-center py-16">
        <div className="glass-panel w-full max-w-md rounded-3xl p-8">
          <p className="eyebrow text-center">Patient portal</p>
          <h1 className="mt-3 text-center text-3xl font-bold">Create your account</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-7 space-y-4">
            <div>
              <label className={label} htmlFor="name">Full name</label>
              <input id="name" className={field} placeholder="Riya Sharma"
                {...register('name', { required: 'Name is required' })} />
              {errors.name && <p className={errorText}>{errors.name.message}</p>}
            </div>
            <div>
              <label className={label} htmlFor="email">Email</label>
              <input id="email" type="email" className={field} placeholder="you@example.com"
                {...register('email', { required: 'Email is required' })} />
              {errors.email && <p className={errorText}>{errors.email.message}</p>}
            </div>
            <div>
              <label className={label} htmlFor="phone">Phone</label>
              <input id="phone" className={field} placeholder="+91 62018 91533" {...register('phone')} />
            </div>
            <div>
              <label className={label} htmlFor="password">Password</label>
              <input id="password" type="password" className={field} placeholder="At least 6 characters"
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })} />
              {errors.password && <p className={errorText}>{errors.password.message}</p>}
            </div>
            <button type="submit" disabled={isSubmitting}
              className="w-full rounded-full bg-primary-700 px-6 py-3 font-bold text-white hover:bg-primary-800 disabled:opacity-60">
              {isSubmitting ? 'Creating…' : 'Create account'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-stone-600 dark:text-stone-300">
            Already have an account? <Link to="/login" className="font-semibold text-primary-700 hover:underline dark:text-primary-300">Sign in</Link>
          </p>
        </div>
      </section>
    </>
  );
}
