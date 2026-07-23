import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiArrowRight, FiStar } from 'react-icons/fi';
import PageHero from '../component/PageHero';
import TreatmentCard from '../component/TreatmentCard';
import { treatments } from '../data/siteData';
import { useCollection } from '../hooks/useCollection';

const whyHomeopathy = [
  {
    title: 'No Side Effects',
    desc: 'Highly diluted natural remedies are completely safe for all age groups including infants and pregnant women.',
    img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Treats Root Cause',
    desc: 'We go beyond symptoms to identify and heal the underlying cause, giving you lasting relief instead of temporary fixes.',
    img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Personalised Medicine',
    desc: 'No two patients get the same prescription. Each remedy is chosen based on your unique body, lifestyle and symptoms.',
    img: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800&auto=format&fit=crop',
  },
];

const process = [
  { step: '01', title: 'Initial Consultation', desc: 'A thorough 45-minute session to understand your symptoms, lifestyle, emotional state, and complete health history.' },
  { step: '02', title: 'Personalised Diagnosis', desc: 'Our doctor studies your case deeply to identify the root cause and selects the most suitable homeopathic remedy.' },
  { step: '03', title: 'Natural Remedy', desc: 'You receive safe, natural homeopathic medicines prepared from plants, minerals, and other natural substances.' },
  { step: '04', title: 'Monitored Recovery', desc: 'Regular follow-up consultations to track progress, adjust remedies, and ensure complete and permanent healing.' },
];

const stats = [
  { value: '15+', label: 'Years of Experience' },
  { value: '2000+', label: 'Happy Patients' },
  { value: '12+', label: 'Conditions Treated' },
  { value: '100%', label: 'Natural Medicines' },
];

export default function Treatments() {
  const { data, loading } = useCollection('/treatments', treatments);
  const iconBySlug = Object.fromEntries(treatments.map((t) => [t.slug, t]));
  const list = data.map((t) => ({
    ...iconBySlug[t.slug],
    ...t,
    icon: iconBySlug[t.slug]?.icon || treatments[0].icon,
    accent: iconBySlug[t.slug]?.accent || treatments[0].accent,
  }));

  return (
    <>
      <Helmet>
        <title>Treatments & Conditions — Health Care & Wellness Clinic</title>
        <meta name="description" content="Explore holistic, root-cause homeopathic care for skin, migraine, diabetes, thyroid, kidney stone, joint pain and more." />
      </Helmet>

      <PageHero
        eyebrow="Areas of care"
        title="Holistic care, designed around the whole person"
        description="We treat conditions by understanding the person living with them. Explore the areas we support most often, each with a personalised, root-cause plan."
      />

      {/* Stats Banner */}
      <section className="bg-primary-800 dark:bg-primary-900 py-10">
        <div className="section-shell">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-4xl font-bold text-white sm:text-5xl">{s.value}</div>
                <div className="mt-1 text-sm font-medium text-primary-200">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Cards */}
      <section className="section-shell py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="eyebrow block mb-3">What We Treat</span>
          <h2 className="text-3xl font-display font-bold sm:text-4xl">Conditions We Specialise In</h2>
          <p className="mt-4 text-stone-600 dark:text-stone-300">
            From common to complex, our clinic offers effective homeopathic care for a wide range of health conditions.
          </p>
        </div>
        {loading && <p className="text-center text-stone-400">Loading treatments…</p>}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {list.map((treatment) => <TreatmentCard key={treatment.slug} treatment={treatment} />)}
        </motion.div>
      </section>

      {/* Why Homeopathy Section */}
      <section className="py-20 sm:py-28 bg-stone-50 dark:bg-primary-950/50">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <span className="eyebrow block mb-3 text-primary-600 dark:text-primary-400">The Homeopathy Advantage</span>
            <h2 className="text-3xl font-display font-bold sm:text-4xl text-primary-950 dark:text-white">
              Why Choose Homeopathy?
            </h2>
            <p className="mt-4 text-stone-600 dark:text-stone-300">
              A 200-year-old science proven to heal naturally, safely and permanently.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {whyHomeopathy.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group overflow-hidden rounded-3xl bg-white dark:bg-primary-900 shadow-soft hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <h3 className="absolute bottom-4 left-5 font-display text-xl font-bold text-white">{item.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Treat — Process Section */}
      <section className="py-20 sm:py-28">
        <div className="section-shell">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=1200&auto=format&fit=crop"
                alt="Homeopathy consultation process"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-primary-950/90 backdrop-blur-md rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/60?img=${i+20}`} alt="Patient" className="size-9 rounded-full border-2 border-white object-cover" />
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5 text-gold-500">
                      {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-current size-3" />)}
                    </div>
                    <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">Trusted by 2,000+ patients</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="eyebrow block mb-3 text-primary-600 dark:text-primary-400">Our Process</span>
              <h2 className="text-3xl font-display font-bold sm:text-4xl mb-4 text-primary-950 dark:text-white">
                How We Heal You
              </h2>
              <p className="text-stone-600 dark:text-stone-300 mb-10 leading-relaxed">
                Our 4-step healing process ensures you receive the most precise and effective homeopathic care from day one.
              </p>
              <div className="space-y-6">
                {process.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-5 items-start"
                  >
                    <div className="flex shrink-0 size-12 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/60 text-primary-700 dark:text-primary-300 font-display font-bold text-lg">
                      {p.step}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold mb-1 text-primary-950 dark:text-white">{p.title}</h3>
                      <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Homeopathy Medicine Banner */}
      <section className="py-20 sm:py-28 bg-stone-50 dark:bg-primary-950/50">
        <div className="section-shell">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="eyebrow block mb-3 text-gold-500">Natural Medicines</span>
              <h2 className="text-3xl font-display font-bold sm:text-4xl mb-6 text-primary-950 dark:text-white">
                Pure, Natural & Scientifically Proven
              </h2>
              <p className="text-lg text-stone-600 dark:text-stone-300 mb-8 leading-relaxed">
                Homeopathic medicines are prepared from natural plants, minerals, and animal products using a scientific process of dilution and potentization. This makes them extraordinarily safe and effective.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Sourced from pure natural ingredients',
                  'Zero chemical additives or preservatives',
                  'Validated by 200+ years of clinical practice',
                  'Safe for children, elderly, and pregnant women',
                  'No dependency or withdrawal effects',
                ].map((point, i) => (
                  <li key={i} className="flex items-center gap-3 text-stone-700 dark:text-stone-300">
                    <FiCheckCircle className="text-primary-600 dark:text-primary-400 shrink-0 size-5" />
                    <span className="font-medium">{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/appointment"
                className="inline-flex items-center gap-2 rounded-full bg-primary-700 px-8 py-4 font-bold text-white shadow-lg hover:bg-primary-800 hover:-translate-y-0.5 transition-all"
              >
                Book Your Consultation <FiArrowRight />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1200&auto=format&fit=crop"
                alt="Natural homeopathic medicines"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary-900/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell pb-20">
        <div className="glass-panel flex flex-col items-center gap-6 rounded-[2rem] p-10 text-center sm:p-14">
          <span className="eyebrow">Not sure where to begin?</span>
          <h2 className="text-3xl font-display font-bold sm:text-4xl max-w-2xl">
            Every plan starts with a conversation
          </h2>
          <p className="text-stone-600 dark:text-stone-300 max-w-xl">
            If your concern is not listed, it does not mean we cannot help. Book a consultation and we will guide you honestly on whether homeopathic care is right for you.
          </p>
          <Link to="/appointment" className="inline-flex rounded-full bg-primary-700 px-7 py-3.5 font-bold text-white shadow-xl shadow-primary-900/20 hover:-translate-y-0.5 hover:bg-primary-800">
            Book a consultation
          </Link>
        </div>
      </section>
    </>
  );
}
