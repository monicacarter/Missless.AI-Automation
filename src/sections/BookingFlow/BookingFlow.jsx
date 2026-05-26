import { useState, useEffect, useMemo, useRef } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Globe,
  Mail,
  User,
  Building2,
  Phone as PhoneIcon,
  MessageSquare,
  PartyPopper,
} from 'lucide-react';
import Button from '../../components/Button/index.js';
import { cn } from '../../utils/helpers.js';
import styles from './BookingFlow.module.css';

/* =========================================================================
   TIME ZONES — labels + IANA names. The IANA name is what Intl.DateTimeFormat
   needs; the label is what we show to users.
   ========================================================================= */
const TIME_ZONES = [
  { iana: 'America/Los_Angeles', label: 'Pacific Time', region: 'US & Canada' },
  { iana: 'America/Denver', label: 'Mountain Time', region: 'US & Canada' },
  { iana: 'America/Chicago', label: 'Central Time', region: 'US & Canada' },
  { iana: 'America/New_York', label: 'Eastern Time', region: 'US & Canada' },
  { iana: 'Europe/London', label: 'Greenwich Mean Time', region: 'Europe' },
  { iana: 'Europe/Paris', label: 'Central European Time', region: 'Europe' },
  { iana: 'Europe/Athens', label: 'Eastern European Time', region: 'Europe' },
  { iana: 'Asia/Dubai', label: 'Gulf Standard Time', region: 'Middle East & Asia' },
  { iana: 'Asia/Kolkata', label: 'India Standard Time', region: 'Middle East & Asia' },
  { iana: 'Asia/Shanghai', label: 'China Standard Time', region: 'Middle East & Asia' },
  { iana: 'Asia/Tokyo', label: 'Japan Standard Time', region: 'Middle East & Asia' },
  { iana: 'Australia/Sydney', label: 'Australian Eastern Time', region: 'Oceania' },
];

/**
 * Base time slots — defined in the demo team's home time zone (Eastern).
 * Each entry is "HH:MM" in 24-hour format. We render these times converted
 * into whichever zone the user picks.
 */
const BASE_TIMEZONE = 'America/New_York';
const BASE_TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

/* =========================================================================
   Helpers
   ========================================================================= */

/** Detect the browser's IANA time zone. Fallback to Eastern if unsupported. */
function detectBrowserTimeZone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz || BASE_TIMEZONE;
  } catch {
    return BASE_TIMEZONE;
  }
}

/**
 * If the detected browser zone is not in our predefined list, find the
 * closest match by GMT offset and use that. Falls back to Eastern if no
 * match. This keeps the dropdown short while still defaulting sensibly
 * for users in zones we don't list explicitly.
 */
function resolveDisplayTimeZone(browserTz) {
  const match = TIME_ZONES.find((tz) => tz.iana === browserTz);
  if (match) return match.iana;

  // Find the zone in our list with the closest UTC offset right now.
  const now = new Date();
  const browserOffset = getOffsetMinutes(browserTz, now);
  let best = TIME_ZONES[3]; // Eastern as fallback
  let bestDelta = Number.POSITIVE_INFINITY;
  for (const tz of TIME_ZONES) {
    const delta = Math.abs(getOffsetMinutes(tz.iana, now) - browserOffset);
    if (delta < bestDelta) {
      bestDelta = delta;
      best = tz;
    }
  }
  return best.iana;
}

/** Get UTC-offset in minutes for a given IANA zone at a given date. */
function getOffsetMinutes(iana, date) {
  try {
    // Build an ISO-like string in the target zone, then compare to UTC.
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: iana,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const parts = dtf.formatToParts(date).reduce((acc, p) => {
      acc[p.type] = p.value;
      return acc;
    }, {});
    const asUtc = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour === '24' ? '00' : parts.hour),
      Number(parts.minute),
      Number(parts.second)
    );
    return (asUtc - date.getTime()) / 60000;
  } catch {
    return 0;
  }
}

/**
 * Convert a base slot ("10:00" in the base zone, on a given calendar date)
 * into the equivalent wall-clock time in the target zone.
 *
 * @param {Date} date — the user's selected calendar day
 * @param {string} baseSlot — "HH:MM" in the base zone
 * @param {string} targetIana — destination IANA time zone
 * @returns {{ value: string, label: string, dayOffset: number }}
 *   value is the raw "HH:MM" in target zone (for state),
 *   label is the formatted "10:00 AM" string for display,
 *   dayOffset is -1, 0, or +1 if conversion crosses midnight.
 */
function convertSlot(date, baseSlot, targetIana) {
  const [bh, bm] = baseSlot.split(':').map(Number);

  // Build a Date that represents "selected calendar day at baseSlot in BASE_TIMEZONE".
  // Strategy: assume the wall-clock time in the base zone, then figure out the
  // equivalent UTC instant by adjusting for the base zone's offset on that day.
  const tentativeUtc = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    bh,
    bm
  );
  const baseOffset = getOffsetMinutes(BASE_TIMEZONE, new Date(tentativeUtc));
  // tentativeUtc was treated as UTC, but really it's the base-zone wall clock.
  // Real UTC = tentative - baseOffset.
  const realUtcMs = tentativeUtc - baseOffset * 60000;
  const realDate = new Date(realUtcMs);

  // Format that instant in the target zone.
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: targetIana,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const label = formatter.format(realDate);

  // Get the day in the target zone so we know if conversion crossed midnight.
  const dayFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: targetIana,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const targetDay = dayFormatter.format(realDate);
  const sourceDay = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  let dayOffset = 0;
  if (targetDay < sourceDay) dayOffset = -1;
  else if (targetDay > sourceDay) dayOffset = 1;

  return {
    value: baseSlot,
    label,
    dayOffset,
    realDate, // Useful for the confirmation summary
  };
}

/** Format a Date as "Friday, November 14" for the confirmation summary. */
function formatLongDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

/** Look up a zone's label by IANA name; fall back to the IANA string. */
function findZoneLabel(iana) {
  const match = TIME_ZONES.find((tz) => tz.iana === iana);
  return match ? match.label : iana;
}

/* =========================================================================
   STEP INDICATOR
   ========================================================================= */

function StepIndicator({ step }) {
  const items = [
    { num: 1, label: 'Your details' },
    { num: 2, label: 'Pick a date' },
    { num: 3, label: 'Choose a time' },
  ];
  // Numeric steps are 1, 2, 3. "confirm" hides the indicator entirely.
  if (step === 'confirm') return null;

  return (
    <ol className={styles.stepIndicator}>
      {items.map((item, idx) => {
        const isDone = step > item.num;
        const isActive = step === item.num;
        return (
          <li
            key={item.num}
            className={cn(
              styles.stepItem,
              isActive && styles.stepItemActive,
              isDone && styles.stepItemDone
            )}
          >
            <span className={styles.stepBubble}>
              {isDone ? <Check size={14} strokeWidth={2.5} /> : item.num}
            </span>
            <span className={styles.stepLabel}>{item.label}</span>
            {idx < items.length - 1 && (
              <span className={styles.stepDivider} aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* =========================================================================
   STEP 1 — Contact form
   ========================================================================= */

function ContactForm({ data, onChange, onNext }) {
  const validEmail = /\S+@\S+\.\S+/.test(data.workEmail);
  const isValid =
    data.fullName.trim().length > 0 &&
    data.businessName.trim().length > 0 &&
    validEmail;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) onNext();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.stepHeading}>Tell us about you</h2>
      <p className={styles.stepSubheading}>
        We will tailor the walkthrough to your business. Takes about 30 seconds.
      </p>

      <div className={styles.formGrid}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>
            Full name <span className={styles.required}>*</span>
          </span>
          <span className={styles.inputWrap}>
            <User size={16} strokeWidth={2} className={styles.inputIcon} aria-hidden="true" />
            <input
              type="text"
              required
              autoComplete="name"
              value={data.fullName}
              onChange={(e) => onChange({ ...data, fullName: e.target.value })}
              placeholder="Alex Rivera"
            />
          </span>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>
            Business name <span className={styles.required}>*</span>
          </span>
          <span className={styles.inputWrap}>
            <Building2 size={16} strokeWidth={2} className={styles.inputIcon} aria-hidden="true" />
            <input
              type="text"
              required
              autoComplete="organization"
              value={data.businessName}
              onChange={(e) => onChange({ ...data, businessName: e.target.value })}
              placeholder="Rivera HVAC"
            />
          </span>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>
            Work email <span className={styles.required}>*</span>
          </span>
          <span className={styles.inputWrap}>
            <Mail size={16} strokeWidth={2} className={styles.inputIcon} aria-hidden="true" />
            <input
              type="email"
              required
              autoComplete="email"
              value={data.workEmail}
              onChange={(e) => onChange({ ...data, workEmail: e.target.value })}
              placeholder="alex@riverahvac.com"
            />
          </span>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Phone number</span>
          <span className={styles.inputWrap}>
            <PhoneIcon size={16} strokeWidth={2} className={styles.inputIcon} aria-hidden="true" />
            <input
              type="tel"
              autoComplete="tel"
              value={data.phone}
              onChange={(e) => onChange({ ...data, phone: e.target.value })}
              placeholder="+1 415 555 0188"
            />
          </span>
        </label>

        <label className={cn(styles.field, styles.fieldFull)}>
          <span className={styles.fieldLabel}>Anything specific you want to see?</span>
          <span className={cn(styles.inputWrap, styles.inputWrapTextarea)}>
            <MessageSquare size={16} strokeWidth={2} className={styles.inputIcon} aria-hidden="true" />
            <textarea
              rows={3}
              value={data.message}
              onChange={(e) => onChange({ ...data, message: e.target.value })}
              placeholder="We get 80+ calls a day, mostly HVAC service requests."
            />
          </span>
        </label>
      </div>

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={data.marketingOptIn}
          onChange={(e) => onChange({ ...data, marketingOptIn: e.target.checked })}
        />
        <span>
          It is OK to send me occasional product news and tips. I can unsubscribe at any time.
        </span>
      </label>

      <p className={styles.legalLine}>
        By submitting, you agree to our Privacy Policy and Terms of Service.
      </p>

      <div className={styles.stepActions}>
        <Button variant="primary" size="lg" type="submit" showArrow>
          Choose a time
        </Button>
      </div>
    </form>
  );
}

/* =========================================================================
   STEP 2 — Calendar
   ========================================================================= */

function buildCalendarCells(viewMonth) {
  const firstOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const startWeekday = firstOfMonth.getDay();
  const start = new Date(firstOfMonth);
  start.setDate(start.getDate() - startWeekday);
  const cells = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    cells.push(d);
  }
  return cells;
}

function CalendarStep({ selectedDate, viewMonth, onSelectDate, onChangeMonth, onNext, onBack }) {
  const cells = useMemo(() => buildCalendarCells(viewMonth), [viewMonth]);
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const monthLabel = viewMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={styles.calendarStep}>
      <h2 className={styles.stepHeading}>Pick a date that works</h2>
      <p className={styles.stepSubheading}>
        Pick any day in the current or future month. Weekends and past days are unavailable.
      </p>

      <div className={styles.calendarCard}>
        <div className={styles.calendarHeader}>
          <button
            type="button"
            className={styles.monthNavBtn}
            onClick={() => onChangeMonth(-1)}
            aria-label="Previous month"
          >
            <ChevronLeft size={18} strokeWidth={2.25} />
          </button>
          <div className={styles.monthLabel}>{monthLabel}</div>
          <button
            type="button"
            className={styles.monthNavBtn}
            onClick={() => onChangeMonth(1)}
            aria-label="Next month"
          >
            <ChevronRight size={18} strokeWidth={2.25} />
          </button>
        </div>

        <div className={styles.calendarWeekdays}>
          {weekdays.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        <div className={styles.calendarGrid} role="grid">
          {cells.map((cellDate) => {
            const isCurrentMonth = cellDate.getMonth() === viewMonth.getMonth();
            const isPast = cellDate < today;
            const isWeekend = cellDate.getDay() === 0 || cellDate.getDay() === 6;
            const disabled = !isCurrentMonth || isPast || isWeekend;
            const isSelected =
              selectedDate &&
              cellDate.toDateString() === selectedDate.toDateString();
            const isToday = cellDate.toDateString() === today.toDateString();

            return (
              <button
                key={cellDate.toISOString()}
                type="button"
                role="gridcell"
                disabled={disabled}
                className={cn(
                  styles.calendarDay,
                  !isCurrentMonth && styles.calendarDayOtherMonth,
                  isSelected && styles.calendarDaySelected,
                  isToday && !isSelected && styles.calendarDayToday
                )}
                aria-label={cellDate.toDateString()}
                aria-selected={isSelected || undefined}
                onClick={() => onSelectDate(cellDate)}
              >
                {cellDate.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      <div className={cn(styles.stepActions, styles.stepActionsBetween)}>
        <Button variant="secondary" size="lg" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          showArrow
          disabled={!selectedDate}
        >
          Choose a time
        </Button>
      </div>
    </div>
  );
}

/* =========================================================================
   STEP 3 — Time slots + time zone selector (mega-menu style)
   ========================================================================= */

function TimeZoneSelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const currentLabel = findZoneLabel(value);

  // Close on click outside
  useEffect(() => {
    function onClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Group zones by region for the panel
  const grouped = useMemo(() => {
    const map = new Map();
    for (const tz of TIME_ZONES) {
      if (!map.has(tz.region)) map.set(tz.region, []);
      map.get(tz.region).push(tz);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <div className={styles.tzWrap} ref={wrapRef}>
      <button
        type="button"
        className={cn(styles.tzTrigger, open && styles.tzTriggerOpen)}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Globe size={16} strokeWidth={2.25} className={styles.tzGlobe} aria-hidden="true" />
        <span className={styles.tzTriggerLabel}>
          <span className={styles.tzTriggerEyebrow}>Time zone</span>
          <span className={styles.tzTriggerValue}>{currentLabel}</span>
        </span>
        <ChevronDown
          size={16}
          strokeWidth={2.25}
          className={cn(styles.tzChevron, open && styles.tzChevronOpen)}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className={styles.tzMenu} role="listbox" aria-label="Choose a time zone">
          {grouped.map(([region, zones]) => (
            <div key={region} className={styles.tzGroup}>
              <div className={styles.tzGroupHeading}>{region}</div>
              <ul className={styles.tzList}>
                {zones.map((tz) => {
                  const isActive = tz.iana === value;
                  return (
                    <li key={tz.iana}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        className={cn(
                          styles.tzOption,
                          isActive && styles.tzOptionActive
                        )}
                        onClick={() => {
                          onChange(tz.iana);
                          setOpen(false);
                        }}
                      >
                        <span>{tz.label}</span>
                        {isActive && (
                          <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TimeStep({
  selectedDate,
  selectedTimeSlot,
  timeZone,
  onSelectSlot,
  onChangeTimeZone,
  onConfirm,
  onBack,
  submitting,
}) {
  // Convert all base slots to the target zone
  const convertedSlots = useMemo(() => {
    if (!selectedDate) return [];
    return BASE_TIME_SLOTS.map((slot) => ({
      base: slot,
      ...convertSlot(selectedDate, slot, timeZone),
    }));
  }, [selectedDate, timeZone]);

  const dateLabel = selectedDate ? formatLongDate(selectedDate) : '';

  return (
    <div className={styles.timeStep}>
      <h2 className={styles.stepHeading}>Choose a time</h2>
      <p className={styles.stepSubheading}>
        Times shown for{' '}
        <strong className={styles.timeStepDate}>{dateLabel}</strong>.
      </p>

      <TimeZoneSelector value={timeZone} onChange={onChangeTimeZone} />

      <div className={styles.timeGrid} role="radiogroup" aria-label="Available times">
        {convertedSlots.map((slot) => {
          const isSelected = selectedTimeSlot === slot.base;
          return (
            <button
              key={slot.base}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={cn(styles.timeSlot, isSelected && styles.timeSlotSelected)}
              onClick={() => onSelectSlot(slot.base)}
            >
              <Clock size={14} strokeWidth={2.25} className={styles.timeSlotIcon} aria-hidden="true" />
              <span className={styles.timeSlotLabel}>{slot.label}</span>
              {slot.dayOffset !== 0 && (
                <span className={styles.timeSlotDayHint}>
                  {slot.dayOffset > 0 ? 'next day' : 'previous day'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className={cn(styles.stepActions, styles.stepActionsBetween)}>
        <Button variant="secondary" size="lg" onClick={onBack} disabled={submitting}>
          Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={onConfirm}
          showArrow={!submitting}
          disabled={!selectedTimeSlot || submitting}
        >
          {submitting ? 'Confirming…' : 'Confirm demo'}
        </Button>
      </div>
    </div>
  );
}

/* =========================================================================
   CONFIRMATION
   ========================================================================= */

function ConfirmationScreen({ email, date, timeSlot, timeZone }) {
  const tzLabel = findZoneLabel(timeZone);
  const formatted = date && timeSlot
    ? convertSlot(date, timeSlot, timeZone)
    : null;
  const whenLine = formatted
    ? `${formatLongDate(date)} at ${formatted.label}`
    : '';

  return (
    <div className={styles.confirm}>
      <span className={styles.confirmIcon} aria-hidden="true">
        <PartyPopper size={28} strokeWidth={2} />
      </span>
      <h2 className={styles.confirmHeading}>You are booked in.</h2>
      <p className={styles.confirmSub}>
        We sent the calendar invite and a quick prep email to{' '}
        <strong>{email}</strong>.
      </p>

      <div className={styles.confirmCard}>
        <div className={styles.confirmRow}>
          <CalendarIcon size={18} strokeWidth={2} aria-hidden="true" />
          <span>{whenLine}</span>
        </div>
        <div className={styles.confirmRow}>
          <Globe size={18} strokeWidth={2} aria-hidden="true" />
          <span>{tzLabel}</span>
        </div>
      </div>

      <p className={styles.confirmFootnote}>
        If something changes, the invite has a reschedule link. See you soon.
      </p>
    </div>
  );
}

/* =========================================================================
   MAIN: BookingFlow
   ========================================================================= */

export default function BookingFlow() {
  const [step, setStep] = useState(1); // 1 | 2 | 3 | "confirm"
  const [data, setData] = useState({
    fullName: '',
    businessName: '',
    workEmail: '',
    phone: '',
    message: '',
    marketingOptIn: false,
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [viewMonth, setViewMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [timeZone, setTimeZone] = useState(() =>
    resolveDisplayTimeZone(detectBrowserTimeZone())
  );
  const [submitting, setSubmitting] = useState(false);

  const handleChangeMonth = (delta) => {
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1));
  };

const handleConfirm = async () => {
  if (submitting) return;

  setSubmitting(true);

  try {
 const response = await fetch(
  "https://iuktcirypushcamuakki.supabase.co/functions/v1/book-demo",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer_name: data.fullName,
      customer_email: data.workEmail,
      customer_phone: data.phone,
      company_name: data.businessName,
      company_website: "",
      selected_date: selectedDate?.toISOString(),
      selected_time: selectedTimeSlot,
      selected_timezone: timeZone,
    }),
  }
);

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      throw new Error(result?.error || "Booking request failed.");
    }

    setStep("confirm");
  } catch (error) {
    console.error("Booking error:", error);
    alert(error.message || "Sorry, something went wrong. Please try again.");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <section
      id="book-a-demo"
      className={styles.section}
      aria-labelledby="book-a-demo-heading"
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>
            <CalendarIcon size={14} strokeWidth={2.25} aria-hidden="true" />
            Book a demo
          </span>
          <h1 id="book-a-demo-heading" className={styles.headline}>
            Schedule a <em className="text-gradient">demo</em>
          </h1>
          <p className={styles.subcopy}>
            Pick a time that works for you. A 15-minute walkthrough, tailored to
            your business — no slides, no pressure, no commitment.
          </p>
          <ul className={styles.featurePills}>
            <li className={styles.pill}>
              <Clock size={14} strokeWidth={2.25} aria-hidden="true" />
              15-minute walkthrough
            </li>
            <li className={styles.pill}>
              <User size={14} strokeWidth={2.25} aria-hidden="true" />
              Personalized to your business
            </li>
            <li className={styles.pill}>
              <PhoneIcon size={14} strokeWidth={2.25} aria-hidden="true" />
              Works with your current number
            </li>
          </ul>
        </div>

        {/* Step indicator */}
        <StepIndicator step={step} />

        {/* Step panels */}
        <div className={styles.panel}>
          {step === 1 && (
            <ContactForm
              data={data}
              onChange={setData}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <CalendarStep
              selectedDate={selectedDate}
              viewMonth={viewMonth}
              onSelectDate={setSelectedDate}
              onChangeMonth={handleChangeMonth}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <TimeStep
              selectedDate={selectedDate}
              selectedTimeSlot={selectedTimeSlot}
              timeZone={timeZone}
              onSelectSlot={setSelectedTimeSlot}
              onChangeTimeZone={setTimeZone}
              onConfirm={handleConfirm}
              onBack={() => setStep(2)}
              submitting={submitting}
            />
          )}
          {step === 'confirm' && (
            <ConfirmationScreen
              email={data.workEmail}
              date={selectedDate}
              timeSlot={selectedTimeSlot}
              timeZone={timeZone}
            />
          )}
        </div>
      </div>
    </section>
  );
}
