import { useEffect } from 'react';
import BookingFlow from '../sections/BookingFlow/index.js';

/**
 * BookDemo — /book-a-demo route.
 *
 * Renders just the BookingFlow section. MainLayout already provides the
 * Navbar + Footer. The Navbar's CTA flips from "Book a demo" → "Contact us"
 * automatically on this route (handled in MainLayout.jsx).
 *
 * Updates document.title and meta description at runtime for SEO since we
 * don't use react-helmet on a single-page React shell.
 */
export default function BookDemo() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Book a Demo — Missless';

    // Update the meta description tag so search/social previews are accurate.
    const metaDesc = document.querySelector('meta[name="description"]');
    const previousDesc = metaDesc?.getAttribute('content');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Book a 15-minute walkthrough of Missless, the AI front office that never misses a lead. Pick a time that works for you — no slides, no pressure.'
      );
    }

    return () => {
      document.title = previousTitle;
      if (metaDesc && previousDesc != null) {
        metaDesc.setAttribute('content', previousDesc);
      }
    };
  }, []);

  return <BookingFlow />;
}
