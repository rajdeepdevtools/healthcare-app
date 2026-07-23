import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';

export default function SiteLayout() {
  const { pathname } = useLocation();

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet titleTemplate="%s | Health Care & Wellness Clinic" defaultTitle="Health Care & Wellness Clinic">
        <meta name="description" content="Personalised, holistic Bach Flower care from Health Care & Wellness Clinic." />
      </Helmet>
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}
