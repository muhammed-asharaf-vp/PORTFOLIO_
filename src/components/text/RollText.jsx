/**
 * Hover letter-roll: each letter slides up and an identical copy rolls in from below,
 * one after another. The copy is a `text-shadow`, so there's one span per letter.
 * CSS only (see `.roll` in globals.css), so it also works inside server components.
 * Triggers on hover of the nearest `.group` or the text itself.
 */
export default function RollText({ children, className = "" }) {
  const text = String(children);

  return (
    <span className={`roll ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {Array.from(text).map((char, i) => (
          <span
            key={i}
            className="roll-char"
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    </span>
  );
}
