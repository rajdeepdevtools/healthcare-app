import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/treatments', 'Treatments'],
  ['/blog', 'Journal'],
  ['/courses', 'Courses'],
  ['/videos', 'Videos'],
  ['/contact', 'Contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 py-2.5 sm:py-3 border-b border-stone-300 bg-white relative transition-all dark:border-white/10 dark:bg-primary-950">
        <NavLink to="/" className="flex items-center">
          <Logo className="transition-transform hover:scale-[1.02]" />
        </NavLink>

        <button 
          aria-label="Menu" 
          onClick={() => setOpen(!open)} 
          className="sm:hidden text-stone-600 dark:text-stone-300"
        >
          <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="21" height="1.5" rx=".75" fill="currentColor"/>
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="currentColor"/>
            <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="currentColor"/>
          </svg>
        </button>

        {open && (
          <div className="absolute top-[85px] left-0 w-full bg-white dark:bg-primary-950 shadow-md py-4 flex flex-col items-start gap-4 px-6 text-sm sm:hidden border-b border-stone-200 dark:border-white/10">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} className="block text-stone-600 dark:text-stone-300 font-medium w-full">
                {label}
              </NavLink>
            ))}
            <div className="w-full h-px bg-stone-200 dark:bg-white/10 my-2"></div>
            <button onClick={toggleTheme} className="flex items-center gap-2 text-stone-600 dark:text-stone-300 font-medium">
              {theme === 'dark' ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            <NavLink to="/appointment" className="cursor-pointer px-6 py-2.5 mt-2 bg-primary-700 hover:bg-primary-800 transition text-white rounded-full text-sm font-medium text-center w-full">
              Book a visit
            </NavLink>
          </div>
        )}

        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} className="text-sm font-medium text-stone-600 hover:text-primary-800 transition-colors dark:text-stone-300 dark:hover:text-white">
              {label}
            </NavLink>
          ))}

          <div className="hidden xl:flex items-center text-sm gap-2 border border-stone-300 dark:border-white/20 px-3 rounded-full">
            <input className="py-1.5 w-full bg-transparent outline-none placeholder-stone-500 dark:text-stone-400 dark:text-white" type="text" placeholder="Search products" />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path clipRule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="flex items-center gap-5">
            <button onClick={toggleTheme} aria-label="Toggle Theme" className="text-stone-600 hover:text-primary-800 transition-colors dark:text-stone-300 dark:hover:text-white">
              {theme === 'dark' ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
            </button>
            
            <div className="relative cursor-pointer group">
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-primary-700 dark:stroke-primary-400 group-hover:stroke-primary-800 transition-colors">
                <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="absolute -top-2 -right-3 text-[10px] font-bold text-white bg-primary-600 w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </div>
          </div>

          <NavLink to="/appointment" className="cursor-pointer px-8 py-2.5 bg-primary-700 hover:bg-primary-800 transition text-white font-medium rounded-full text-sm">
            Book a visit
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
