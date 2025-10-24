// src/context/DataContext.tsx
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ApiData } from '../lib/sheets';
import { fetchKpi } from '../lib/sheets';

type Ctx = {
  data: ApiData | null;
  loading: boolean;       // only true if we have nothing to show yet
  error: string | null;
  lastUpdated: Date | null;
  isRefreshing: boolean;  // background refresh in progress
  refresh: () => Promise<void>;
};

const DataCtx = createContext<Ctx>({
  data: null, loading: true, error: null, lastUpdated: null, isRefreshing: false, refresh: async () => {}
});

const CACHE_KEY = 'kpi-cache:v1';
const TS_KEY = 'kpi-cache-ts:v1';

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const minutes = Number(import.meta.env.VITE_REFRESH_MINUTES || 5);
  const REFRESH_MS = Math.max(1, minutes) * 60_000;

  // Show cached immediately (no flicker), then refresh in background
  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const ts = localStorage.getItem(TS_KEY);
      if (cached) {
        setData(JSON.parse(cached));
        if (ts) setLastUpdated(new Date(Number(ts)));
        setLoading(false);
      }
    } catch (_) {}

    // initial refresh
    refresh();

    // interval refresh
    intervalRef.current = window.setInterval(() => refresh(), REFRESH_MS) as unknown as number;

    // refetch when tab returns to foreground
    const onVis = () => { if (document.visibilityState === 'visible') refresh(); };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      document.removeEventListener('visibilitychange', onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refresh() {
    try {
      setIsRefreshing(true);
      const fresh = await fetchKpi();
      setData(prev => {
        // only update state if data actually changed to avoid re-render flicker
        const prevStr = prev ? JSON.stringify(prev) : '';
        const nextStr = JSON.stringify(fresh);
        if (prevStr !== nextStr) return fresh;
        return prev;
      });
      setError(null);
      setLoading(false);
      const now = new Date();
      setLastUpdated(now);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(fresh));
        localStorage.setItem(TS_KEY, String(now.getTime()));
      } catch (_) {}
    } catch (e:any) {
      // don’t blank the UI; keep showing cached data
      setError(e?.message || 'Failed to refresh');
      setLoading(prev => (data ? false : prev)); // if we had cache, stay not loading
    } finally {
      setIsRefreshing(false);
    }
  }

  return (
    <DataCtx.Provider value={{ data, loading, error, lastUpdated, isRefreshing, refresh }}>
      {children}
    </DataCtx.Provider>
  );
}

export const useKpiData = () => useContext(DataCtx);
