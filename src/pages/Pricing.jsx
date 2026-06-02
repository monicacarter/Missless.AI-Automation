import { useEffect } from 'react';
import PricingPage from '../sections/PricingPage/index.js';

/**
 * Pricing — /pricing route.
 *
 * Renders the full PricingPage section. MainLayout already provides
 * Navbar + Footer. Updates document.title and meta description at runtime
 * for SEO (same pattern as BookDemo).
 */
export default function Pricing() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Pricing — Missless';

    const metaDesc = document.querySelector('meta[name="description"]');
    const previousDesc = metaDesc?.getAttribute('content');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Custom pricing built around your front office. Missless delivers a fully customized AI automation system shaped to your call volume, workflows, integrations, and custom AI training needs. Simple. Flexible. Scalable.'
      );
    }

    return () => {
      document.title = previousTitle;
      if (metaDesc && previousDesc != null) {
        metaDesc.setAttribute('content', previousDesc);
      }
    };
  }, []);

  return <PricingPage />;
}
