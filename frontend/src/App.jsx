import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import ProtectedRoute from './component/ProtectedRoute';
import RouteFallback from './component/RouteFallback';
import Home from './pages/Home';

// Public secondary pages — lazy-loaded so first paint stays fast.
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Treatments = lazy(() => import('./pages/Treatments'));
const TreatmentDetail = lazy(() => import('./pages/TreatmentDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Videos = lazy(() => import('./pages/Videos'));
const Feedback = lazy(() => import('./pages/Feedback'));
const Appointment = lazy(() => import('./pages/Appointment'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Portal = lazy(() => import('./pages/Portal'));
const VerifyCertificate = lazy(() => import('./pages/VerifyCertificate'));

// Admin bundle — split off entirely so patients never load it.
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminAppointments = lazy(() => import('./pages/admin/AdminAppointments'));
const AdminBlogs = lazy(() => import('./pages/admin/AdminBlogs'));
const AdminCourses = lazy(() => import('./pages/admin/AdminCourses'));
const AdminFeedback = lazy(() => import('./pages/admin/AdminFeedback'));
const AdminCertificates = lazy(() => import('./pages/admin/AdminCertificates'));

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="treatments" element={<Treatments />} />
          <Route path="treatments/:slug" element={<TreatmentDetail />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:slug" element={<CourseDetail />} />
          <Route path="videos" element={<Videos />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="verify" element={<VerifyCertificate />} />
          <Route path="verify/:code" element={<VerifyCertificate />} />
          <Route path="portal" element={<ProtectedRoute><Portal /></ProtectedRoute>} />
        </Route>

        <Route
          path="/admin"
          element={(
            <ProtectedRoute roles={['admin', 'doctor']}>
              <AdminLayout />
            </ProtectedRoute>
          )}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="feedback" element={<AdminFeedback />} />
          <Route path="certificates" element={<AdminCertificates />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
