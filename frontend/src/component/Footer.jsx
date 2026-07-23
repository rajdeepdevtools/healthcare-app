import { Link } from 'react-router-dom';
import { FiMail, FiMapPin, FiPhone, FiClock } from 'react-icons/fi';
import Logo from './Logo';
import { clinic } from '../data/siteData';

const care = [
  ['/treatments', 'Treatments'],
  ['/appointment', 'Book a visit'],
  ['/portal', 'Patient portal'],
  ['/feedback', 'Patient feedback'],
];
const learn = [
  ['/blog', 'Health journal'],
  ['/courses', 'Courses'],
  ['/videos', 'Video library'],
  ['/verify', 'Verify a certificate'],
];
const about = [
  ['/about', 'About the clinic'],
  ['/contact', 'Contact'],
  ['/login', 'Sign in'],
  ['/register', 'Create account'],
];

function LinkColumn({ heading, links }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-200/80">{heading}</p>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map(([to, label]) => (
          <li key={to}><Link to={to} className="text-primary-100/80 hover:text-white">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-primary-900/10 bg-primary-950 text-primary-100">
      <div className="section-shell grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <span className="inline-flex shrink-0 rounded-2xl bg-white p-2 shadow-lg shadow-black/20 w-full max-w-[280px] overflow-hidden sm:max-w-none sm:w-auto">
              <Logo variant="stacked" imgClassName="h-10 w-10 sm:h-12 sm:w-12 object-contain" className="scale-90 origin-left sm:scale-100" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-white"></p>
              <p className="text-primary-200/70"></p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-6 text-primary-100/75">
            A modern wellness clinic committed to root-cause care, using the Bach Flower Method for gentle, unhurried consultations and holistic healing for the whole family.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li className="flex items-start gap-3"><FiMapPin className="mt-0.5 shrink-0 text-primary-200" /> <span>{clinic.address}</span></li>
            <li className="flex items-center gap-3"><FiPhone className="shrink-0 text-primary-200" /> <a href={clinic.phoneLink} className="hover:text-white">{clinic.phone}</a></li>
            <li className="flex items-center gap-3"><FiMail className="shrink-0 text-primary-200" /> <a href={`mailto:${clinic.email}`} className="hover:text-white">{clinic.email}</a></li>
            <li className="flex items-start gap-3"><FiClock className="mt-0.5 shrink-0 text-primary-200" /> <span>{clinic.timing}</span></li>
          </ul>
        </div>
        <LinkColumn heading="Care" links={care} />
        <LinkColumn heading="Learn" links={learn} />
        <LinkColumn heading="Clinic" links={about} />
      </div>
      <div className="border-t border-white/10">
        <div className="section-shell flex flex-col gap-2 py-5 text-xs text-primary-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Health Care & Wellness Clinic. All rights reserved.</p>
          <p>Care is personal. Please do not stop prescribed treatment without speaking to your doctor.</p>
        </div>
      </div>
    </footer>
  );
}
