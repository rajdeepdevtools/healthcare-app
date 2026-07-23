import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import PageHero from '../component/PageHero';
import api from '../services/api';
import { clinic } from '../data/siteData';

const fieldClass = 'mt-1 block w-full rounded-xl border border-primary-900/10 bg-white px-4 py-3 text-sm text-stone-800 shadow-sm outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-white/10 dark:bg-primary-900/60 dark:text-white';
const labelClass = 'block text-sm font-semibold text-primary-950 dark:text-primary-100 mb-1';

const contactDetails = [
  {
    icon: <FiMapPin className="size-5" />,
    title: 'Visit Us',
    details: [clinic.address],
  },
  {
    icon: <FiPhone className="size-5" />,
    title: 'Call Us',
    details: [clinic.phone],
  },
  {
    icon: <FiMail className="size-5" />,
    title: 'Email Us',
    details: [clinic.email],
  },
  {
    icon: <FiClock className="size-5" />,
    title: 'Opening Hours',
    details: [clinic.timing],
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await api.post('/contact', formData);
      toast.success('Thank you for contacting us! We will get back to you shortly.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us — Health Care & Wellness Clinic</title>
        <meta name="description" content="Get in touch with Health Care & Wellness Clinic. Book an appointment, ask questions, or visit our clinic." />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <PageHero
          title="Get in touch"
          description="We're here to help you on your journey to natural wellness. Reach out to us with any questions or to schedule an appointment."
        />

        <section className="py-20 sm:py-32">
          <div className="section-shell">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              
              {/* Contact Information */}
              <div>
                <span className="eyebrow block mb-4">Contact Details</span>
                <h2 className="text-3xl font-display font-bold sm:text-4xl mb-8">
                  We'd love to hear from you.
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {contactDetails.map((item, idx) => (
                    <div key={idx} className="glass-panel p-6 rounded-2xl shadow-soft">
                      <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
                        {item.icon}
                      </div>
                      <h3 className="font-display font-bold mb-2 text-lg text-primary-950 dark:text-white">{item.title}</h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-sm text-stone-600 dark:text-stone-300">{detail}</p>
                      ))}
                    </div>
                  ))}
                </div>
                
                {/* Map Placeholder */}
                <div className="mt-8 rounded-3xl overflow-hidden aspect-video relative glass-panel p-1">
                  <div className="absolute inset-1 rounded-[1.4rem] overflow-hidden bg-primary-100/50 dark:bg-primary-900/30 flex items-center justify-center">
                    <span className="text-primary-800/50 dark:text-primary-200/50 font-medium flex items-center gap-2">
                      <FiMapPin /> Interactive Map Loading...
                    </span>
                    {/* In a real scenario, you would embed an iframe map here */}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="glass-panel rounded-3xl p-8 sm:p-10 shadow-xl border-t border-white/40 dark:border-white/10 lg:sticky lg:top-24">
                <h3 className="font-display text-2xl font-bold mb-2">Send us a message</h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className={labelClass}>Full Name</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={fieldClass}
                      placeholder="e.g. John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={fieldClass}
                      placeholder="e.g. john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>Your Message</label>
                    <textarea
                      id="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={`${fieldClass} resize-none`}
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-primary-700 px-6 py-4 text-base font-bold text-white shadow-lg shadow-primary-900/20 transition-all hover:bg-primary-800 hover:shadow-primary-900/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
