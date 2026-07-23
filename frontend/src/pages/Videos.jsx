import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiPlay, FiX } from 'react-icons/fi';
import PageHero from '../component/PageHero';
import { videos as sampleVideos } from '../data/content';
import { useCollection } from '../hooks/useCollection';

// Accepts a full YouTube URL or a bare video id and returns the 11-char id.
function youTubeId(v) {
  if (v.id && v.id.length <= 15 && !v.id.includes('http')) return v.id;
  const src = v.videoUrl || v.url || v.id || '';
  const m = src.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m ? m[1] : src;
}

export default function Videos() {
  const { data, loading } = useCollection('/videos', sampleVideos);
  const [active, setActive] = useState(null);

  const list = useMemo(() => data.map((v) => ({ ...v, ytId: youTubeId(v) })), [data]);

  return (
    <>
      <Helmet>
        <title>Video library — Health Care & Wellness Clinic</title>
        <meta name="description" content="Helpful conversations, patient guidance and clinic videos on holistic homeopathic care." />
      </Helmet>

      <PageHero
        eyebrow="Video library"
        title="Watch, learn and feel more at ease"
        description="Short, friendly videos from our clinic, answering the questions patients ask us most."
        action={false}
      />

      <section className="section-shell py-16 sm:py-20">
        {loading && <p className="text-center text-stone-400">Loading videos…</p>}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((video) => (
            <button
              key={video.ytId}
              type="button"
              onClick={() => setActive(video)}
              className="group text-left"
            >
              <div className="relative overflow-hidden rounded-[1.5rem] shadow-soft">
                <img
                  src={`https://img.youtube.com/vi/${video.ytId}/hqdefault.jpg`}
                  alt={video.title}
                  loading="lazy"
                  className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 grid place-items-center bg-primary-950/25 transition-colors group-hover:bg-primary-950/40">
                  <span className="grid size-14 place-items-center rounded-full bg-white/90 text-2xl text-primary-800 shadow-lg transition-transform group-hover:scale-110">
                    <FiPlay className="ml-0.5" />
                  </span>
                </span>
                {video.category && (
                  <span className="absolute left-3 top-3 rounded-full bg-primary-900/70 px-3 py-1 text-xs font-bold text-white backdrop-blur">{video.category}</span>
                )}
              </div>
              <h3 className="mt-4 font-bold leading-snug">{video.title}</h3>
              {video.description && <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">{video.description}</p>}
            </button>
          ))}
        </div>
      </section>

      {active && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-primary-950/80 p-4 backdrop-blur"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between text-white">
              <h3 className="font-bold">{active.title}</h3>
              <button type="button" onClick={() => setActive(null)} aria-label="Close" className="grid size-9 place-items-center rounded-full bg-white/15 hover:bg-white/25">
                <FiX />
              </button>
            </div>
            <div className="aspect-video overflow-hidden rounded-2xl shadow-2xl">
              <iframe
                title={active.title}
                src={`https://www.youtube.com/embed/${active.ytId}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="size-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
