import {
  FaAllergies, FaBaby, FaBone, FaBrain, FaFemale, FaHeartbeat,
} from 'react-icons/fa';
import { GiKidneys, GiMedicines, GiStomach } from 'react-icons/gi';
import { MdBloodtype, MdOutlineFaceRetouchingNatural, MdSpa } from 'react-icons/md';

export const clinic = {
  phone: '+91 62018 91533',
  phoneLink: 'tel:+916201891533',
  whatsapp: 'https://wa.me/916201891533',
  email: 'care@healthcarewellness.com',
  address: 'Kukra Devi Asthan, Manpur, Gaya, Bihar (823003)',
  timing: 'Morning 10 AM to Evening 5 PM (Sunday Holiday). Online appointments also accepted on Sundays.',
};

export const treatments = [
  { slug: 'stress-anxiety', title: 'Stress & Anxiety', icon: FaBrain, summary: 'Gentle emotional balancing with Bach Flower remedies for stress and anxiety.', accent: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300' },
  { slug: 'skin-disease', title: 'Skin & Hair Care', icon: MdOutlineFaceRetouchingNatural, summary: 'Classical homeopathy for eczema, psoriasis, acne, and hair fall.', accent: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300' },
  { slug: 'migraine', title: 'Migraine', icon: FaBrain, summary: 'A detailed physical and emotional approach to triggers using holistic methods.', accent: 'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300' },
  { slug: 'emotional-imbalance', title: 'Emotional Imbalance', icon: FaHeartbeat, summary: 'Supportive Bach flower care for grief, sadness, and emotional distress.', accent: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300' },
  { slug: 'thyroid-disorders', title: 'Thyroid Disorders', icon: MdBloodtype, summary: 'Homeopathic support to manage hormonal imbalance and metabolic issues.', accent: 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300' },
  { slug: 'child-behavior', title: 'Child Health & Behavior', icon: FaBaby, summary: 'Gentle homeopathy and Bach flower support for childhood immunity and tantrums.', accent: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300' },
  { slug: 'digestive-disorders', title: 'Digestive Health', icon: GiStomach, summary: 'Holistic care for gut-brain axis, tackling IBS and acidity with natural remedies.', accent: 'bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300' },
  { slug: 'women-health', title: "Women's Health", icon: FaFemale, summary: 'Homeopathic support through hormonal changes, PCOD, and menstrual issues.', accent: 'bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300' },
  { slug: 'chronic-care', title: 'Chronic Fatigue', icon: GiMedicines, summary: 'Restoring vitality and mental energy with specialized natural remedies.', accent: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300' },
  { slug: 'allergy', title: 'Allergies & Asthma', icon: FaAllergies, summary: 'Individual support for allergies triggered by environmental or emotional stress.', accent: 'bg-lime-50 text-lime-700 dark:bg-lime-950/40 dark:text-lime-300' },
  { slug: 'joint-pain', title: 'Joint Pain', icon: FaBone, summary: 'Long-term homeopathic care for arthritis, stiffness, and mobility.', accent: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' },
  { slug: 'holistic-care', title: 'Holistic Wellness', icon: MdSpa, summary: 'Complete mind-body balancing combining Classical Homeopathy and Bach Flowers.', accent: 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-200' },
];

export const blogs = [
  { slug: 'understanding-holistic-healing', category: 'Wellness', title: 'Understanding holistic healing: beyond symptom relief', excerpt: 'Why a complete health history, habits and emotional wellbeing all matter in personalised care.', date: '12 Jun 2026', read: '6 min read', tone: 'from-primary-800 to-emerald-500' },
  { slug: 'building-stronger-immunity', category: 'Immunity', title: 'Everyday habits that support stronger immunity', excerpt: 'Simple, sustainable practices for sleep, food, movement and stress that benefit the whole family.', date: '04 Jun 2026', read: '5 min read', tone: 'from-amber-700 to-orange-400' },
  { slug: 'migraine-triggers', category: 'Migraine', title: 'How to recognise and track your migraine triggers', excerpt: 'A practical symptom diary can reveal useful patterns and make consultations far more productive.', date: '27 May 2026', read: '7 min read', tone: 'from-violet-800 to-fuchsia-500' },
];

export const courses = [
  { slug: 'homeopathy-foundations', label: 'Bestseller', title: 'Foundations of Bach Flower Therapy', instructor: 'Dr. Pradeep Kumar', duration: '8 weeks', lessons: 24, rating: '4.9', price: '₹2,499', tone: 'from-primary-900 via-primary-700 to-emerald-500' },
  { slug: 'family-wellness', label: 'Free', title: 'Everyday Family Wellness', instructor: 'Wellness Learning', duration: '3 weeks', lessons: 12, rating: '4.8', price: 'Free', tone: 'from-amber-800 via-orange-600 to-amber-300' },
  { slug: 'case-taking-mastery', label: 'Advanced', title: 'Clinical Case-Taking Mastery', instructor: 'Dr. Pradeep Kumar', duration: '10 weeks', lessons: 32, rating: '4.9', price: '₹4,999', tone: 'from-slate-900 via-teal-800 to-cyan-500' },
];

export const testimonials = [
  { name: 'Neha Srivastava', location: 'Prayagraj', text: 'The consultation felt unhurried and deeply personal. For the first time, someone connected all my symptoms instead of looking at them separately.', initials: 'NS' },
  { name: 'Amit Mishra', location: 'Lucknow', text: 'The follow-up system is excellent and the team is always approachable. My recurring migraine episodes have become much easier to manage.', initials: 'AM' },
  { name: 'Farah Khan', location: 'Varanasi', text: 'My daughter is now comfortable with doctor visits. The care is gentle, clear and never rushed. That reassurance matters enormously.', initials: 'FK' },
];

export const faqs = [
  ['What happens during the first consultation?', 'We discuss your current symptoms, health history, lifestyle, sleep, stress and previous treatment in detail. A first consultation typically takes 35–45 minutes.'],
  ['Can I take homeopathy with my current medicines?', 'Do not stop prescribed medication without speaking to your treating doctor. Please bring your prescriptions so the doctor can guide you responsibly.'],
  ['Do you provide online consultations?', 'Yes. Follow-ups and suitable first consultations can be conducted securely over video or phone, depending on the condition.'],
  ['How long will treatment take?', 'Duration varies with the condition, its history and individual response. Your doctor will explain realistic milestones after the initial assessment.'],
];
