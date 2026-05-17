import { useEffect, useState } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener('change', onChange);
    const timer = setTimeout(() => setIsMobile(mql.matches), 0);
    return () => {
      mql.removeEventListener('change', onChange);
      clearTimeout(timer);
    };
  }, []);

  return !!isMobile;
}
