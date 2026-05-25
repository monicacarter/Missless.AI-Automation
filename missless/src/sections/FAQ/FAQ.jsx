import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../../components/Button/index.js';
import { faqs, siteMeta } from '../../data/siteData.js';
import { cn } from '../../utils/helpers.js';
import styles from './FAQ.module.css';

/**
 * Single accordion item — defined inline rather than as a shared component
 * because it is only used here.
 *
 * Accessibility:
 *  - The question is a <button> with aria-expanded + aria-controls.
 *  - The answer is a <region> with a matching id.
 */
function FaqItem({ id, question, answer, isOpen, onToggle }) {
  const questionId = `faq-question-${id}`;
  const answerId = `faq-answer-${id}`;

  return (
    <div className={cn(styles.item, isOpen && styles.itemOpen)}>
      <h3 className={styles.questionHeading}>
        <button
          type="button"
          id={questionId}
          className={styles.questionButton}
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={onToggle}
        >
          <span className={styles.questionText}>{question}</span>
          <span className={styles.icon} aria-hidden="true">
            <Plus
              size={20}
              strokeWidth={2.25}
              className={cn(styles.iconSvg, isOpen && styles.iconSvgOpen)}
            />
          </span>
        </button>
      </h3>
      <div
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        className={styles.answerWrap}
        data-open={isOpen}
      >
        <div className={styles.answer}>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * FAQ — Section 10.
 *
 * Centered header with a minimal blue uppercase "FAQ" badge.
 * Single-expand accordion (only one item open at a time). Two CTAs below.
 */
export default function FAQ() {
  const [openId, setOpenId] = useState(faqs[0].id);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="faq"
      className={styles.section}
      aria-labelledby="faq-heading"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>FAQ</span>
          <h2 id="faq-heading" className={styles.headline}>
            Frequently asked <em className={styles.headlineAccent}>questions</em>
          </h2>
          <p className={styles.subcopy}>
            Everything you need to know before talking to us.
          </p>
        </div>

        <div className={styles.list}>
          {faqs.map((faq) => (
            <FaqItem
              key={faq.id}
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>

        <div className={styles.ctas}>
          <Button href={siteMeta.bookDemoHref} variant="primary" size="lg" showArrow>
            Book a demo
          </Button>
          <Button href={siteMeta.contactHref} variant="secondary" size="lg">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
