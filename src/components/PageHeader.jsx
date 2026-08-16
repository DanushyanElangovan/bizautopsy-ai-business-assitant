import React from 'react';

/**
 * PageHeader
 * Consistent title block used at the top of every page, styled as the
 * header strip of a case file page: a small monospace case reference on
 * its own line, the page title in the display serif, an optional subtitle,
 * and a double rule closing the strip off from the content below.
 *
 * @param {string} title    - Large page heading (e.g. "Diagnostic report").
 * @param {string} subtitle - Optional smaller line under the title.
 * @param {string} caseRef  - Optional case-file reference shown above the
 *                             title (e.g. "CASE NO. 2026-0417"). Falls back
 *                             to a generic "CASE FILE" label if omitted.
 * @param {ReactNode} actions - Optional buttons rendered on the right side.
 */
export default function PageHeader({ title, subtitle, caseRef, actions }) {
  return (
    <div className="mb-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-vital mb-1.5">
            {caseRef || 'Case file'}
          </p>
          <h1 className="font-display font-semibold text-[28px] leading-tight text-ink">{title}</h1>
          {subtitle && <p className="text-[14px] text-ink-soft mt-1.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
      <div className="mt-5 h-[3px] bg-vital/80 relative">
        <div className="absolute top-1 left-0 right-0 h-px bg-vital/25" />
      </div>
    </div>
  );
}
