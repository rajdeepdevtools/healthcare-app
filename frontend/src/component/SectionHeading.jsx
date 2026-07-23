export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const centered = align === 'center';
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-5xl">{title}</h2>
      {description && <p className="mt-5 text-base leading-7 text-stone-600 dark:text-stone-300 sm:text-lg">{description}</p>}
    </div>
  );
}
