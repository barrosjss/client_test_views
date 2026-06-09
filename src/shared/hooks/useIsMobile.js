import { useState, useEffect } from 'react';

export function useIsMobile(bp = 920) {
  const q = `(max-width:${bp}px)`;
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const fn = (e) => setM(e.matches);
    mq.addEventListener('change', fn);
    setM(mq.matches);
    return () => mq.removeEventListener('change', fn);
  }, [q]);
  return m;
}
