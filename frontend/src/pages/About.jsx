import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiHeart, FiShield } from 'react-icons/fi';
import PageHero from '../component/PageHero';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero 
        title="About Health Care & Wellness Clinic" 
        description="Dedicated to providing premium healthcare with a natural, holistic approach to healing using the Bach Flower Method."
      />

      <section className="py-20 sm:py-32">
        <div className="section-shell">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden rounded-3xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1576671081837-49000212a370?q=80&w=2000&auto=format&fit=crop" 
                alt="Clinic interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl"></div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 hidden md:block">
                <div className="glass-panel rounded-2xl p-6 shadow-xl max-w-[200px] text-center">
                  <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
                    <FiAward className="size-6" />
                  </div>
                  <div className="font-display text-2xl font-bold text-primary-950 dark:text-white">15+</div>
                  <div className="text-sm font-medium text-stone-600 dark:text-stone-400">Years of Excellence</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="eyebrow block mb-4">Our Story</span>
              <h2 className="text-3xl font-display font-bold sm:text-4xl mb-6">
                Healing naturally, <br className="hidden sm:block" />
                <span className="text-primary-600 dark:text-primary-400">living beautifully.</span>
              </h2>
              <div className="prose prose-lg prose-stone dark:prose-invert">
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-6 text-balance">
                  Health Care & Wellness Clinic was founded with a singular vision: to provide a safe, effective, and completely natural alternative to conventional medicine using the Bach Flower Method. We believe that true healing comes from within and starts with emotional balance.
                </p>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-8 text-balance">
                  Our treatments are carefully tailored to each individual, addressing not just physical symptoms, but emotional and mental well-being as well. We are committed to helping you achieve optimal health without harmful side effects.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 mt-8 border-t border-primary-900/10 pt-8 dark:border-white/10">
                <div className="flex gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                    <FiHeart className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold mb-1">Patient First</h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400">Compassionate care tailored to you.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                    <FiShield className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold mb-1">Safe & Trusted</h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400">100% natural, side-effect free.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Doctor */}
      <section className="bg-primary-50 py-20 dark:bg-primary-950 sm:py-32">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <span className="eyebrow block mb-3">Expertise</span>
            <h2 className="text-3xl font-display font-bold sm:text-4xl">Meet Your Practitioners</h2>
          </div>

          <div className="mx-auto max-w-4xl glass-panel rounded-3xl overflow-hidden shadow-xl mb-8">
            <div className="grid sm:grid-cols-5">
              <div className="sm:col-span-2 relative h-64 sm:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=1000&auto=format&fit=crop" 
                  alt="Dr. Pradeep Kumar" 
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
              <div className="sm:col-span-3 p-8 sm:p-12 flex flex-col justify-center">
                <h3 className="font-display text-2xl font-bold mb-2">Dr. Pradeep Kumar</h3>
                <p className="text-primary-600 dark:text-primary-400 font-semibold mb-6">B.H.M.S (B.U) & Bach Flower Consultant</p>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
                  With over 15 years of clinical experience, Dr. Pradeep has dedicated his life to the practice of holistic healing and the Bach Flower Method. He specializes in emotional wellbeing, stress management, and family wellness.
                </p>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  "My goal is not just to cure the disease, but to treat the patient as a whole, restoring harmony to the mind, body, and spirit."
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-4xl glass-panel rounded-3xl overflow-hidden shadow-xl">
            <div className="grid sm:grid-cols-5">
              <div className="sm:col-span-2 relative h-64 sm:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop" 
                  alt="Dr Jayant Kumar" 
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
              <div className="sm:col-span-3 p-8 sm:p-12 flex flex-col justify-center">
                <h3 className="font-display text-2xl font-bold mb-2">Dr Jayant Kumar</h3>
                <p className="text-primary-600 dark:text-primary-400 font-semibold mb-6">B.F.T (Bach Flower Therapist)</p>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  Dr. Jayant Kumar brings specialized expertise in the Bach Flower Method. He focuses on comprehensive emotional health assessments and integrating natural therapies for optimal patient outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;