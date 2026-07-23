import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiHeart, FiStar, FiUsers, FiArrowRight, FiShield } from 'react-icons/fi';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

const features = [
  {
    icon: <FiHeart className="size-6 text-primary-500" />,
    title: 'Holistic Healing',
    description: 'We treat the root cause, not just the symptoms, ensuring long-lasting health.',
  },
  {
    icon: <FiShield className="size-6 text-primary-500" />,
    title: 'Safe & Natural',
    description: '100% natural homeopathic remedies with zero side effects for all ages.',
  },
  {
    icon: <FiUsers className="size-6 text-primary-500" />,
    title: 'Expert Care',
    description: 'Experienced practitioners dedicated to personalized patient care.',
  },
  {
    icon: <FiClock className="size-6 text-primary-500" />,
    title: 'Fast Recovery',
    description: 'Effective treatments designed to accelerate your body\'s natural healing process.',
  }
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet titleTemplate="%s">
        <title>Health Care & Wellness Clinic</title>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-10 pb-20 dark:bg-primary-950 sm:pt-12 sm:pb-32">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpeg')] bg-cover bg-center bg-no-repeat opacity-15 dark:opacity-20"></div>
        <div className="absolute -top-24 -left-24 size-96 rounded-full bg-primary-200/50 blur-3xl dark:bg-primary-900/30"></div>
        <div className="absolute bottom-0 right-0 size-96 rounded-full bg-gold-300/20 blur-3xl dark:bg-gold-500/10"></div>
        
        <div className="section-shell relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold text-primary-800 dark:bg-white/10 dark:text-primary-200 mb-6">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-500 opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-primary-600"></span>
              </span>
              Accepting New Patients
            </div>
            <h1 className="text-4xl font-display font-bold text-primary-950 dark:text-white sm:text-5xl lg:text-6xl sm:leading-tight">
              Natural Healing with the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">Bach Flower Method</span>
            </h1>
            <p className="mt-6 text-lg text-stone-600 dark:text-stone-300 text-balance leading-relaxed">
              Experience the gentle power of Classical Homeopathy and the Bach Flower Method. We provide personalized, safe, and effective treatments to restore your body's natural balance and emotional vitality.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link 
                to="/appointment" 
                className="rounded-full bg-primary-700 px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary-900/20 transition-all hover:bg-primary-800 hover:shadow-primary-900/30 hover:-translate-y-0.5"
              >
                Book Appointment
              </Link>
              <Link 
                to="/about" 
                className="group flex items-center gap-2 rounded-full px-6 py-4 text-base font-semibold text-primary-900 transition-colors hover:bg-primary-100 dark:text-white dark:hover:bg-white/10"
              >
                Learn More
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-4 border-t border-primary-900/10 pt-8 dark:border-white/10">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="size-10 rounded-full border-2 border-primary-50 bg-primary-200 dark:border-primary-950 dark:bg-primary-800 flex items-center justify-center overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Patient" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium">
                <div className="flex items-center text-gold-500 gap-1">
                  <FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" />
                </div>
                <span className="text-stone-600 dark:text-stone-400">Over 2,000+ happy patients</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-md aspect-[4/5] sm:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl shadow-primary-900/20"
          >
            <img 
              src="/doctor-consultation-new.png" 
              alt="Doctor consulting patient" 
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-950/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 bg-white/95 dark:bg-primary-950/90 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-4 shadow-xl">
              <div className="flex flex-col gap-2.5">
                <div>
                  <h3 className="font-display text-sm sm:text-base font-bold text-primary-950 dark:text-white mb-0.5">Dr. Pradeep Kumar <span className="text-[10px] sm:text-xs font-normal text-stone-500 dark:text-primary-300">(B.H.M.S)</span></h3>
                  <p className="text-stone-600 dark:text-primary-200 text-xs flex items-center gap-1.5">
                    <FiCheckCircle className="text-gold-500 dark:text-gold-400 shrink-0" />
                    Senior Homeopathic Physician
                  </p>
                </div>
                <div className="h-px w-full bg-primary-900/10 dark:bg-white/10"></div>
                <div>
                  <h3 className="font-display text-sm sm:text-base font-bold text-primary-950 dark:text-white mb-0.5">Dr Jayant Kumar <span className="text-[10px] sm:text-xs font-normal text-stone-500 dark:text-primary-300">(B.F.T)</span></h3>
                  <p className="text-stone-600 dark:text-primary-200 text-xs flex items-center gap-1.5">
                    <FiCheckCircle className="text-gold-500 dark:text-gold-400 shrink-0" />
                    Bach Flower Specialist
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow block mb-3">Why Choose Us</span>
            <h2 className="text-3xl font-display font-bold sm:text-4xl">Excellence in Homeopathic & Bach Flower Care</h2>
            <p className="mt-4 text-stone-600 dark:text-stone-300 text-balance">
              We combine traditional classical homeopathy with emotional balancing to provide you with the most effective and gentle treatment possible.
            </p>
          </div>
          
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel group relative rounded-3xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-900/50 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="mb-3 font-display text-xl font-bold">{feature.title}</h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Understanding Homeopathy Section */}
      <section className="py-20 sm:py-32 bg-stone-50 dark:bg-primary-950/50">
        <div className="section-shell">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src="/bach-flower.png"
                alt="Bach Flower remedies and fresh flowers" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary-900/10 mix-blend-multiply"></div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="eyebrow block mb-3 text-primary-600 dark:text-primary-400">Natural Science</span>
              <h2 className="text-3xl font-display font-bold sm:text-4xl mb-6 text-primary-950 dark:text-white">
                Classical Homeopathy & Bach Flowers
              </h2>
              <p className="text-lg text-stone-600 dark:text-stone-300 mb-8 leading-relaxed">
                Our approach combines the physical healing power of Classical Homeopathy with the emotional balancing of the Bach Flower Method. Together, they offer a complete, safe, and natural system of healing.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400">
                    <span className="font-display font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">Like Cures Like</h3>
                    <p className="text-stone-600 dark:text-stone-400">
                      We use natural substances that stimulate your body's own healing powers instead of just hiding the symptoms.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400">
                    <span className="font-display font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">Gentle & Safe</h3>
                    <p className="text-stone-600 dark:text-stone-400">
                      Our medicines are highly diluted from natural sources, making them completely safe for everyone, including babies and pregnant women.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400">
                    <span className="font-display font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">Treating the Root Cause</h3>
                    <p className="text-stone-600 dark:text-stone-400">
                      Homeopathy treats the person as a whole to find and heal the underlying cause of your illness, ensuring long-lasting relief.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conditions We Treat & Guarantee Section */}
      <section className="py-20 sm:py-32">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="eyebrow block mb-3 text-gold-500">What We Treat</span>
            <h2 className="text-3xl font-display font-bold sm:text-4xl text-primary-950 dark:text-white">
              Conditions We Support
            </h2>
            <p className="mt-4 text-stone-600 dark:text-stone-300">
              By blending Classical Homeopathy and the Bach Flower Method, we offer highly effective natural support for a wide range of emotional and physical conditions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-16">
            {[
              'Chronic Asthma & Bronchitis',
              'Skin Allergies & Eczema',
              'Arthritis & Joint Pain',
              'Diabetes (Permanent Cure)',
              'Migraine & Headaches',
              'Gastric & Digestive Issues',
              'Kidney Stones & Renal Issues',
              'Hair Fall & Scalp Infections'
            ].map((disease, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-primary-900 border border-primary-900/5 dark:border-white/5 shadow-soft hover:shadow-lg transition-shadow"
              >
                <div className="flex shrink-0 size-8 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400">
                  <FiCheckCircle className="size-4" />
                </div>
                <span className="font-semibold text-primary-950 dark:text-primary-100 text-sm">{disease}</span>
              </motion.div>
            ))}
          </div>

          {/* Guarantee Statement Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold-400 to-gold-600 p-1"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative h-full w-full rounded-[22px] bg-white dark:bg-primary-950 p-8 sm:p-12 text-center shadow-inner">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-gold-50 dark:bg-gold-500/10 text-gold-500">
                <FiShield className="size-8" />
              </div>
              <h3 className="mb-4 font-display text-2xl font-bold text-primary-950 dark:text-white sm:text-3xl">
                Our 100% Natural Healing Guarantee
              </h3>
              <p className="mx-auto max-w-2xl text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
                We are committed to providing you with the most effective homeopathic care. Our treatments are guaranteed to target the <strong>root cause</strong> of your disease, offering you <strong>permanent relief</strong> safely, naturally, and completely without side effects.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-primary-900 py-20 sm:py-28">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-primary-700/50 blur-3xl"></div>
        
        <div className="section-shell relative z-10 text-center">
          <h2 className="text-3xl font-display font-bold text-white sm:text-5xl max-w-3xl mx-auto leading-tight">
            Ready to start your journey to natural wellness?
          </h2>
          <p className="mt-6 text-lg text-primary-100 max-w-2xl mx-auto">
            Book an appointment today and discover how our integrated approach to Homeopathy and the Bach Flower Method can transform your health. Online and in-clinic consultations available.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link 
              to="/appointment" 
              className="rounded-full bg-white px-8 py-4 text-base font-bold text-primary-900 shadow-xl transition-all hover:bg-primary-50 hover:scale-105"
            >
              Book Your Visit
            </Link>
            <Link 
              to="/contact" 
              className="rounded-full border-2 border-primary-400 px-8 py-4 text-base font-bold text-white transition-all hover:bg-primary-800"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      {/* Floating Action Buttons */}
      
      {/* Call Button - Bottom Left */}
      <div className="fixed bottom-6 left-6 z-50">
        <a 
          href="tel:+916201891533" 
          className="group relative flex size-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg shadow-primary-900/30 transition-all hover:-translate-y-1 hover:bg-primary-700 hover:shadow-xl dark:shadow-black/50"
          aria-label="Call Doctor"
        >
          <span className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-20"></span>
          <FaPhoneAlt className="text-2xl relative z-10" />
          
          {/* Tooltip (Appears on the right) */}
          <span className="absolute left-full ml-4 whitespace-nowrap rounded-xl bg-white px-4 py-2 text-sm font-bold text-primary-950 shadow-soft opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 dark:bg-primary-900 dark:text-white dark:border dark:border-white/10 pointer-events-none">
            Call Clinic
            <span className="absolute top-1/2 -left-1.5 -mt-1.5 border-y-[6px] border-r-[6px] border-y-transparent border-r-white dark:border-r-primary-900"></span>
          </span>
        </a>
      </div>

      {/* WhatsApp Button - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://wa.me/916201891533" 
          target="_blank" 
          rel="noreferrer"
          className="group relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all hover:-translate-y-1 hover:bg-[#128C7E] hover:shadow-xl dark:shadow-black/50"
          aria-label="WhatsApp Support"
        >
          <FaWhatsapp className="text-3xl" />
          
          {/* Tooltip (Appears on the left) */}
          <span className="absolute right-full mr-4 whitespace-nowrap rounded-xl bg-white px-4 py-2 text-sm font-bold text-primary-950 shadow-soft opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1 dark:bg-primary-900 dark:text-white dark:border dark:border-white/10 pointer-events-none">
            WhatsApp Support
            <span className="absolute top-1/2 -right-1.5 -mt-1.5 border-y-[6px] border-l-[6px] border-y-transparent border-l-white dark:border-l-primary-900"></span>
          </span>
        </a>
      </div>
    </div>
  );
};

export default Home;
