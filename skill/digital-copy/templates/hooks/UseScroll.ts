import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// ready : true after the first load , so the page height is final
export default function useScroll(ready:boolean = true) {
  const { pathname, hash, key } = useLocation();

  const exploreRef = useRef<HTMLElement>(null);
  const trendingRef = useRef<HTMLElement>(null);
  const homeRef = useRef<HTMLElement>(null);

  // no hash : go to the top
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash, key]);

  // hash : wait for the first load , then scroll to the section
  useEffect(() => {
    if (!ready) return;
    if (hash === '#product-listing') exploreRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (hash === '#special-category') trendingRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [hash, key, ready]);

  return {homeRef , exploreRef , trendingRef};
}
