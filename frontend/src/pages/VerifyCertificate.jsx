import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { FiAlertTriangle, FiCheckCircle, FiSearch, FiXCircle } from 'react-icons/fi';
import api from '../services/api';
import CertificateView from '../component/CertificateView';

export default function VerifyCertificate() {
  const { code: codeParam } = useParams();
  const [code, setCode] = useState(codeParam || '');
  const [state, setState] = useState('idle'); // idle | loading | valid | invalid | notfound
  const [cert, setCert] = useState(null);

  const verify = async (value) => {
    const c = (value || '').trim();
    if (!c) return;
    setState('loading');
    try {
      const res = await api.get(`/certificates/verify/${encodeURIComponent(c)}`);
      setCert(res.data.data);
      setState(res.data.valid ? 'valid' : 'invalid');
    } catch {
      setCert(null);
      setState('notfound');
    }
  };

  useEffect(() => { if (codeParam) verify(codeParam); }, [codeParam]);

  return (
    <>
      <Helmet><title>Verify a certificate — Health Care & Wellness Clinic</title></Helmet>
      <section className="section-shell flex min-h-[80vh] flex-col items-center py-16">
        <div className="w-full max-w-xl text-center">
          <p className="eyebrow">Certificate verification</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Verify a Wellness Clinic certificate</h1>
          <p className="mt-3 text-stone-600 dark:text-stone-300">Enter the certificate ID or scan the QR code on the certificate to confirm it is genuine.</p>

          <form onSubmit={(e) => { e.preventDefault(); verify(code); }} className="mt-8 flex gap-2">
            <div className="relative flex-1">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. DEVI-2026-A1B2C3"
                className="w-full rounded-full border border-primary-900/10 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-white/10 dark:bg-primary-900/60 dark:text-white"
              />
            </div>
            <button type="submit" className="rounded-full bg-primary-700 px-6 py-3 font-bold text-white hover:bg-primary-800">Verify</button>
          </form>
        </div>

        <div className="mt-10 w-full max-w-4xl">
          {state === 'loading' && <p className="text-center text-stone-400">Checking…</p>}

          {state === 'valid' && cert && (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 py-3 px-6 text-center text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                <FiCheckCircle className="text-2xl text-emerald-600" />
                <h2 className="text-lg font-bold">Certificate is Valid & Authentic</h2>
              </div>

              <CertificateView cert={cert} />

              <div className="flex justify-center">
                <button onClick={() => window.print()} className="rounded-full bg-primary-700 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-primary-800 transition-all">
                  Print / Save PDF
                </button>
              </div>
            </div>
          )}

          {state === 'invalid' && cert && (
            <div className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-8 text-center dark:border-amber-500/20 dark:bg-amber-500/10">
              <FiAlertTriangle className="mx-auto text-5xl text-amber-600" />
              <h2 className="mt-4 text-xl font-bold text-amber-800 dark:text-amber-300">This certificate has been revoked</h2>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">Certificate {cert.certificateId} for {cert.recipientName} is no longer valid.</p>
            </div>
          )}

          {state === 'notfound' && (
            <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-500/20 dark:bg-rose-500/10">
              <FiXCircle className="mx-auto text-5xl text-rose-600" />
              <h2 className="mt-4 text-xl font-bold text-rose-800 dark:text-rose-300">No matching certificate</h2>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">We could not find a certificate with that code. Please check and try again.</p>
            </div>
          )}
        </div>

        <Link to="/" className="mt-10 text-sm font-semibold text-primary-700 hover:underline dark:text-primary-300">Return home</Link>
      </section>
    </>
  );
}
