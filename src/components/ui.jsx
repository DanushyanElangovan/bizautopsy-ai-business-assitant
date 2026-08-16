import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

/**
 * SectionCard
 * "Exhibit sheet" — the generic paper panel used as the container for
 * every block of content on every page (charts, lists, forms). Styled
 * like a report page clipped to the case file: a heavier ink rule across
 * the top, an optional small monospace "exhibit" eyebrow tag, then the
 * usual title/subtitle/action header row.
 *
 * @param {string} eyebrow  - Optional small mono tag above the title
 *                             (e.g. "EXHIBIT A", "FIG. 02").
 * @param {string} title    - Optional card heading.
 * @param {string} subtitle - Optional line under the heading.
 * @param {ReactNode} action - Optional element shown top-right.
 * @param {ReactNode} children - Card body content.
 * @param {string} className - Extra Tailwind classes for layout.
 */
export function SectionCard({ eyebrow, title, subtitle, action, children, className = '', style }) {
  return (
    <div
      className={`bg-card border border-line border-t-[3px] border-t-vital/70 rounded-md shadow-exhibit p-5 ${className}`}
      style={style}
    >
      {(eyebrow || title || action) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {eyebrow && (
              <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-faint mb-1">
                {eyebrow}
              </p>
            )}
            {title && <h3 className="font-display font-semibold text-[16px] text-ink">{title}</h3>}
            {subtitle && <p className="text-[13px] text-ink-soft mt-0.5">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

// Maps a StatCard `trend` to the small corner-flag colour + arrow icon,
// so every metric tile is colour-coded like an index card tabbed by
// severity, without each caller computing it manually.
const trendStyles = {
  up: { flag: 'bg-vital', tone: 'text-vital', Icon: ArrowUpRight },
  down: { flag: 'bg-pulse', tone: 'text-pulse', Icon: ArrowDownRight },
  flat: { flag: 'bg-amber', tone: 'text-ink-soft', Icon: Minus },
};

/**
 * StatCard
 * Small metric tile styled as an index card pulled from the case file:
 * a colour-coded corner flag (severity), a tracked mono label, a serif
 * value, and an optional delta line with a direction arrow.
 *
 * @param {string} label - Metric name.
 * @param {string} value - Metric value, already formatted for display.
 * @param {string} delta - Optional short comparison text (e.g. "+3.1%").
 * @param {'up'|'down'|'flat'} trend - Direction used to pick flag/colour.
 */
export function StatCard({ label, value, delta, trend }) {
  const style = trendStyles[trend] ?? trendStyles.flat;
  const Icon = style.Icon;
  return (
    <div className="relative bg-card border border-line rounded-md shadow-card p-4 overflow-hidden">
      <span className={`absolute top-0 left-0 w-2 h-full ${style.flag}`} aria-hidden="true" />
      <div className="pl-2">
        <p className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-faint">{label}</p>
        <p className="font-display font-semibold text-2xl text-ink mt-1.5">{value}</p>
        {delta && (
          <p className={`flex items-center gap-1 text-[12px] mt-1.5 font-medium ${style.tone}`}>
            <Icon size={13} strokeWidth={2.4} />
            {delta}
          </p>
        )}
      </div>
    </div>
  );
}

// Lookup table used by RiskBar to turn a risk level string into the
// matching bar colour + text colour.
const levelStyles = {
  High: { bar: 'bg-pulse', text: 'text-pulse' },
  Medium: { bar: 'bg-amber', text: 'text-amber' },
  Low: { bar: 'bg-low', text: 'text-vital' },
};

/**
 * RiskBar
 * One row in the "Risk assessment" section, styled like a strip off a
 * vitals monitor: tick marks under the track, a rounded fill, and the
 * numeric read-out set in monospace at the end of the row.
 *
 * @param {string} label - Risk category name.
 * @param {'High'|'Medium'|'Low'} level - Severity tag text/colour.
 * @param {number} value - Fill percentage of the bar, 0-100.
 */
export function RiskBar({ label, level, value }) {
  const style = levelStyles[level] ?? levelStyles.Medium;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] text-ink">{label}</span>
        <span className={`flex items-baseline gap-1.5 text-[12px] font-medium ${style.text}`}>
          {level}
          <span className="font-mono text-ink-faint">{value}%</span>
        </span>
      </div>
      <div
        className="relative h-2 rounded-full bg-canvas overflow-hidden border border-line/70"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(28,23,18,0.09) 0, rgba(28,23,18,0.09) 1px, transparent 1px, transparent 10%)',
        }}
      >
        <div
          className={`h-full rounded-full ${style.bar} transition-[width] duration-700 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

// Colour lookup for the stamped priority verdict.
const priorityStyles = {
  high: { color: 'text-pulse', border: 'border-pulse/60' },
  medium: { color: 'text-amber', border: 'border-amber/60' },
};

/**
 * PriorityBadge
 * Recommendation tag rendered as an ink-stamp verdict rather than a
 * filled pill — an outlined, slightly rotated, uppercase mono stamp with
 * a double ring (see `shadow-stamp` in tailwind.config.js), the way a
 * case reviewer would mark a document "URGENT" or "REVIEW".
 *
 * @param {string} priority - e.g. "High priority" or "Medium priority".
 */
export function PriorityBadge({ priority }) {
  const isHigh = priority.toLowerCase().startsWith('high');
  const style = isHigh ? priorityStyles.high : priorityStyles.medium;
  return (
    <span
      className={`stamp-in inline-flex items-center gap-1.5 font-mono text-[10.5px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded-sm bg-card/60 border ${style.border} ${style.color}`}
      style={{ '--stamp-rotate': isHigh ? '-3deg' : '2deg', transform: `rotate(${isHigh ? '-3deg' : '2deg'})` }}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isHigh ? 'bg-pulse' : 'bg-amber'}`} />
      {priority}
    </span>
  );
}
