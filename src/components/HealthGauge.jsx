import React from 'react';
import EKGStrip from './EKGStrip';

/**
 * bandFor
 * Maps a numeric health score (0-100) to a risk band: colour, background/
 * text Tailwind classes, and a human-readable label. Thresholds match the
 * risk levels used in the diagnostic report.
 *
 *   score < 40         -> High risk    (red / pulse)
 *   40 <= score < 70    -> Moderate risk (amber)
 *   score >= 70         -> Low risk     (teal / vital)
 *
 * @param {number} score
 */
function bandFor(score) {
  if (score < 40) return { color: '#EF5A4C', glow: 'rgba(239,90,76,0.55)', bg: 'bg-pulse-light', text: 'text-pulse', label: 'High risk' };
  if (score < 70) return { color: '#E0A83E', glow: 'rgba(224,168,62,0.5)', bg: 'bg-amber-light', text: 'text-amber', label: 'Moderate risk' };
  return { color: '#3E7BFA', glow: 'rgba(62,123,250,0.55)', bg: 'bg-vital-light', text: 'text-vital', label: 'Low risk' };
}

/**
 * HealthGauge
 * The app's signature visual: a circular "X-ray lightbox" dial showing the
 * AI-generated business health score, paired with the animated EKGStrip
 * underneath. Styled like a backlit diagnostic-imaging panel rather than a
 * flat progress ring:
 *  - A dark bezel sits behind the ring, with a soft radial glow in the
 *    band colour, like a lit viewing panel.
 *  - The whole gauge flickers on once when it mounts (like a monitor
 *    powering on) - see .gauge-flicker in index.css.
 *  - The ring itself still uses the strokeDasharray/strokeDashoffset trick
 *    to show `score`% of the circle, but now draws in on mount.
 *
 * @param {number} score - Business health score out of 100.
 * @param {number} size  - Diameter of the gauge in pixels.
 */
export default function HealthGauge({ score, size = 132 }) {
  const band = bandFor(score);
  const stroke = 9;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="gauge-flicker relative" style={{ width: size, height: size }}>
        {/* Dark backlit bezel with a glow tinted to the current risk band */}
        <div
          className="absolute inset-[-10px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${band.glow} 0%, rgba(6,9,16,0.92) 62%, rgba(4,6,11,0.98) 100%)`,
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07), 0 6px 18px -8px rgba(0,0,0,0.7)',
          }}
        />
        <svg width={size} height={size} className="relative -rotate-90">
          <circle cx={cx} cy={cy} r={r} stroke="rgba(255,255,255,0.14)" strokeWidth={stroke} fill="none" />
          <circle
            cx={cx}
            cy={cy}
            r={r}
            stroke={band.color}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="ring-draw"
            style={{ '--ring-circumference': circumference, filter: `drop-shadow(0 0 5px ${band.glow})` }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl font-medium text-white leading-none" style={{ textShadow: `0 0 12px ${band.glow}` }}>
            {score}
          </span>
          <span className="text-[10px] uppercase tracking-wide text-white/45 mt-1">/ 100</span>
        </div>

        <span
          className="absolute -bottom-0.5 right-1 w-3 h-3 rounded-full pulse-dot border-2 border-void"
          style={{ backgroundColor: band.color }}
        />
      </div>
      <EKGStrip color={band.color} width={size} height={22} />
    </div>
  );
}

export { bandFor };
