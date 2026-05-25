/**
 * Conditionally join class names.
 * Accepts strings, undefined, false, or objects of { className: condition }.
 *
 * @example
 *   cn('btn', isPrimary && 'btn--primary', { 'btn--loading': loading })
 */
export function cn(...args) {
  const classes = [];
  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'object') {
      for (const [key, value] of Object.entries(arg)) {
        if (value) classes.push(key);
      }
    }
  }
  return classes.join(' ');
}
