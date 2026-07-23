import React from 'react';

function verifyUrl(cert) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}/verify/${cert.certificateId}`;
}

function qrSrc(data) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&color=16382b&data=${encodeURIComponent(data)}`;
}

export default function CertificateView({ cert }) {
  if (!cert) return null;

  const formattedDate = cert.issuedOn
    ? new Date(cert.issuedOn).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div
      id="cert-print"
      className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[1.25rem] bg-[#FAF8F3] p-3 text-center text-[#16382b] shadow-2xl transition-all sm:p-5 dark:bg-[#FAF8F3] dark:text-[#16382b]"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* Outer Thin Gold Border Frame with Corner Dots */}
      <div className="relative rounded-[1rem] border border-[#c6aa65] p-3 sm:p-5">
        {/* Corner dots */}
        <div className="absolute top-1.5 left-1.5 size-1.5 rounded-full bg-[#c6aa65]" />
        <div className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-[#c6aa65]" />
        <div className="absolute bottom-1.5 left-1.5 size-1.5 rounded-full bg-[#c6aa65]" />
        <div className="absolute bottom-1.5 right-1.5 size-1.5 rounded-full bg-[#c6aa65]" />

        {/* Inner Gold Border Frame */}
        <div className="relative overflow-hidden rounded-[0.75rem] border border-[#c6aa65] bg-[#FAF8F3] px-4 py-8 sm:px-10 sm:py-12">
          
          {/* Background Watermark (Clinic Logo & Medical Crest) */}
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none opacity-[0.06] sm:right-10">
            <img src="/logo-wellness.png" alt="Watermark" className="h-64 w-64 object-contain sm:h-96 sm:w-96" />
          </div>

          {/* Top Header */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#c6aa65] sm:w-24" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a3833b] sm:text-xs">
                Certified & Verified
              </span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#c6aa65] sm:w-24" />
            </div>

            <div className="mt-1 flex items-center gap-2">
              <img src="/logo-wellness.png" alt="Clinic Icon" className="size-4 object-contain sm:size-5" />
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a3833b] sm:text-[11px]">
                Health Care & Wellness Clinic
              </p>
            </div>
          </div>

          {/* Certificate Main Title */}
          <h1 className="relative z-10 mt-4 text-2xl font-normal tracking-tight text-[#16382b] sm:mt-6 sm:text-4xl lg:text-5xl">
            Certificate of Completion
          </h1>

          {/* Presenter Text */}
          <p className="relative z-10 mt-4 text-xs italic text-stone-500 sm:mt-6 sm:text-sm font-sans">
            This is to certify that
          </p>

          {/* Recipient Name */}
          <h2 className="relative z-10 mt-1 text-3xl font-bold italic text-[#16382b] sm:mt-2 sm:text-4xl lg:text-5xl">
            {cert.recipientName}
          </h2>

          {/* Decorative Divider Line */}
          <div className="relative z-10 my-3 flex items-center justify-center sm:my-4">
            <div className="relative h-[1px] w-44 bg-[#c6aa65] sm:w-64">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-[#c6aa65]" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-[#c6aa65]" />
            </div>
          </div>

          {/* Course Completion Details */}
          <p className="relative z-10 text-xs font-sans text-stone-500 sm:text-sm">
            has successfully completed the clinical requirements of
          </p>

          <h3 className="relative z-10 mt-1 text-lg font-bold text-[#16382b] sm:mt-2 sm:text-2xl">
            {cert.courseTitle}
          </h3>

          <p className="relative z-10 mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#a3833b] sm:text-[11px] font-sans">
            Residency & Practical Training Program
          </p>

          {/* Footer Grid */}
          <div className="relative z-10 mt-10 grid grid-cols-12 items-end gap-4 text-left sm:mt-16">
            
            {/* Left Metadata */}
            <div className="col-span-5 space-y-2 font-sans">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-stone-400">Certificate ID</p>
                <p className="font-mono text-xs font-bold text-[#16382b] sm:text-sm">{cert.certificateId}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-stone-400">Issued</p>
                <p className="text-xs font-semibold text-stone-700 sm:text-sm">{formattedDate}</p>
              </div>
            </div>

            {/* Center Signature */}
            <div className="col-span-4 text-center">
              <p className="font-serif text-base italic font-bold text-[#16382b] sm:text-xl">
                Dr. Pradeep Kumar
              </p>
              <div className="mx-auto my-1 h-[1px] w-28 bg-stone-300 sm:w-40" />
              <p className="font-sans text-[8px] font-bold uppercase tracking-widest text-stone-400 sm:text-[9px]">
                Program Director
              </p>
            </div>

            {/* Right QR Seal */}
            <div className="col-span-3 flex flex-col items-end text-right">
              <p className="mb-1 text-[8px] font-bold uppercase tracking-wider text-stone-400 font-sans leading-tight">
                Scan Seal to Verify<br />Authenticity
              </p>
              
              {/* Gold Circular Badge Frame for QR */}
              <div className="relative flex size-16 items-center justify-center rounded-full border-2 border-[#b89547] bg-gradient-to-tr from-[#b89547] via-[#f3e5b8] to-[#967732] p-1 shadow-md sm:size-20">
                <div className="flex size-full items-center justify-center rounded-full border border-dashed border-[#967732] bg-[#FAF8F3] p-1">
                  <img
                    src={qrSrc(verifyUrl(cert))}
                    alt="Verification QR Code"
                    className="size-11 rounded-sm sm:size-14 object-contain"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
