import React from 'react';

// SVG path for one "heartbeat" - a flat line with a single spike, drawn
// across a 0-200 wide box, designed to tile seamlessly (see below).
const PATTERN = 'M0,20 L58,20 L70,6 L82,34 L94,14 L106,20 L200,20';

/**
 * EKGStrip
 * Decorative vitals waveform shown under the HealthGauge, styled as a
 * small oscilloscope screen recessed into the dashboard rather than a
 * bare line on the page background: a dark bezel, a faint scanline
 * texture, and the waveform glowing in the current risk-band colour.
 *
 * Animation: two copies of PATTERN sit side by side inside a clipped
 * container; a CSS animation (.ekg-track) slides the SVG left by exactly
 * one pattern-width and loops, so the trace scrolls endlessly with no
 * visible seam.
 *
 * @param {string} color  - Stroke colour, matched to the current risk band.
 * @param {number} width  - Visible width in pixels.
 * @param {number} height - Visible height in pixels.
 */
export default function EKGStrip({ color = '#3E7BFA', width = 200, height = 28 }) {
  return (
    <div
      className="overflow-hidden rounded-sm relative"
      style={{ width, height, background: 'linear-gradient(180deg, #10182A 0%, #05080F 100%)' }}
      role="img"
      aria-label="Live business vitals waveform"
    >
      {/* Faint horizontal scanline texture over the monitor screen */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, transparent 1px, transparent 2px)' }}
      />
      <svg
        className="ekg-track relative"
        width={width * 2}
        height={height}
        viewBox={`0 0 ${width * 2} 40`}
        fill="none"
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      >
        <path d={PATTERN} stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <g transform={`translate(${width},0)`}>
          <path d={PATTERN} stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
