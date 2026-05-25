import { useEffect } from 'react';
import Hero from '../sections/Hero/index.js';
import HearItInAction from '../sections/HearItInAction/index.js';
import HiddenTax from '../sections/HiddenTax/index.js';
import Solution from '../sections/Solution/index.js';
import HowItWorks from '../sections/HowItWorks/index.js';
import Platform from '../sections/Platform/index.js';
import Industries from '../sections/Industries/index.js';
import WhyMissless from '../sections/WhyMissless/index.js';
import PricingOnboarding from '../sections/PricingOnboarding/index.js';
import FAQ from '../sections/FAQ/index.js';
import FinalCTA from '../sections/FinalCTA/index.js';
import { faqs, siteMeta } from '../data/siteData.js';

/**
 * Home — the marketing homepage.
 *
 * Composes all 11 sections in order. Also injects a FAQPage JSON-LD
 * structured-data script tag at runtime, which makes the FAQ eligible
 * for Google rich snippets.
 *
 * SEO meta tags (<title>, <meta description>, OpenGraph) are set in
 * index.html since this is a single-page site.
 */
export default function Home() {
  useEffect(() => {
    // FAQ rich snippet — write a JSON-LD script tag into <head>.
    // The same data used to render the FAQ section is reused here so the
    // structured data and visible content never drift apart.
    const faqJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    };
    const organizationJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteMeta.name,
      url: siteMeta.url,
      description: siteMeta.tagline,
    };

    const scripts = [faqJsonLd, organizationJsonLd].map((data) => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.text = JSON.stringify(data);
      document.head.appendChild(el);
      return el;
    });

    return () => {
      scripts.forEach((el) => el.remove());
    };
  }, []);

  return (
    <>
      <Hero />
      <HearItInAction />
      <HiddenTax />
      <Solution />
      <HowItWorks />
      <Platform />
      <Industries />
      <WhyMissless />
      <PricingOnboarding />
      <FAQ />
      <FinalCTA />
    </>
  );
}
