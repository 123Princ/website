import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [shouldReloadAndScroll, setShouldReloadAndScroll] = useState(false);

  useEffect(() => {
    if (shouldReloadAndScroll ) {
      window.location.reload();
      window.scrollTo(0, 0);
      setShouldReloadAndScroll(false); // Reset the flag after reload and scroll
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Set the flag to trigger reload and scroll when pathname changes
  }, [pathname]);

  return null;
};

export default ScrollToTop;
