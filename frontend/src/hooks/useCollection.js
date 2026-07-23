import { useEffect, useState } from 'react';
import api from '../services/api';

/**
 * Hybrid data hook: fetches a collection from the API and gracefully falls back
 * to bundled sample content when the API is empty, unreachable or errors.
 * Returns { data, loading, source } where source is 'api' | 'sample'.
 */
export function useCollection(endpoint, fallback = [], mapFn) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('sample');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    api.get(endpoint)
      .then((res) => {
        if (!alive) return;
        const rows = res.data?.data ?? res.data ?? [];
        if (Array.isArray(rows) && rows.length) {
          setData(mapFn ? rows.map(mapFn) : rows);
          setSource('api');
        } else {
          setData(fallback);
          setSource('sample');
        }
      })
      .catch(() => {
        if (!alive) return;
        setData(fallback);
        setSource('sample');
      })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return { data, loading, source };
}

/**
 * Hybrid single-item hook. Looks the item up from the API by slug/id, falling
 * back to a matching entry in the bundled sample list.
 */
export function useItem(endpoint, slug, fallbackList = [], matchKey = 'slug') {
  const fallback = fallbackList.find((i) => i[matchKey] === slug) || null;
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState(fallback ? 'sample' : 'none');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    api.get(`${endpoint}/${slug}`)
      .then((res) => {
        if (!alive) return;
        const row = res.data?.data ?? res.data;
        if (row && (row._id || row.slug)) { setData(row); setSource('api'); }
        else { setData(fallback); setSource(fallback ? 'sample' : 'none'); }
      })
      .catch(() => {
        if (!alive) return;
        setData(fallback);
        setSource(fallback ? 'sample' : 'none');
      })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, slug]);

  return { data, loading, source };
}
