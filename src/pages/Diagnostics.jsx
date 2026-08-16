import React from 'react';
import { Download, Share2, AlertTriangle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import HealthGauge from '../components/HealthGauge';
import { SectionCard, RiskBar, PriorityBadge } from '../components/ui';
import { business, riskAssessment, rootCauses, recommendations } from '../data/mockData';

/**
 * Diagnostics (route: "/diagnostics")
 * Implements the "View diagnostic report" use case - the core output of
 * the AI Business Autopsy Tool. Structured in three sections, top to
 * bottom, following the same order the AI pipeline produces them in
 * (score -> causes -> recommendations):
 *
 *   1. Overall score card   - HealthGauge + headline risk level + summary line.
 *   2. Risk assessment / Root causes - two columns, side by side.
 *   3. AI-generated recommendations - card grid, one card per suggestion.
 *
 * "Export PDF" and "Share report" buttons are shown for completeness (they
 * match the UI mockup) but are not wired to real functionality yet.
 */
export default function Diagnostics() {
  return (
    <>
      <PageHeader
        caseRef={`Case no. ${business.analysisDate.split(' ').reverse().join('-').toUpperCase()}`}
        title="Diagnostic report"
        subtitle={`${business.name} · Analysis date: ${business.analysisDate}`}
        actions={
          <>
            <button className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft border border-line px-3 py-2 rounded-md hover:bg-white/5 hover:text-ink transition-colors">
              <Download size={14} />
              Export PDF
            </button>
            <button className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft border border-line px-3 py-2 rounded-md hover:bg-white/5 hover:text-ink transition-colors">
              <Share2 size={14} />
              Share report
            </button>
          </>
        }
      />

      {/* Section 1: headline score, risk level badge, and a one-line summary
          of how many issues/recommendations came out of the AI run. */}
      <SectionCard eyebrow="Verdict" className="rise-in mb-4">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <HealthGauge score={business.healthScore} size={104} />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1.5 flex-wrap">
              <h2 className="font-display font-semibold text-lg text-ink">Overall business health: {business.riskLevel}</h2>
              <span
                className="stamp-in font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-amber border border-amber/60 px-2 py-0.5 rounded-sm"
                style={{ '--stamp-rotate': '-2deg', transform: 'rotate(-2deg)' }}
              >
                {business.riskLevel}
              </span>
            </div>
            <p className="text-[13px] text-ink-soft">
              {business.issuesIdentified} issues identified · {business.recommendationsGenerated} recommendations
              generated · Analysis confidence: {business.analysisConfidence}%
            </p>
          </div>
        </div>
      </SectionCard>

      {/* Section 2: risk assessment bars (left) and root causes (right),
          shown side by side on wide screens and stacked on mobile. */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <SectionCard eyebrow="Exhibit A" title="Risk assessment" className="rise-in" style={{ '--delay': '80ms' }}>
          <div className="flex flex-col gap-4">
            {riskAssessment.map((r) => (
              <RiskBar key={r.label} {...r} />
            ))}
          </div>
        </SectionCard>

        <SectionCard eyebrow="Exhibit B" title="Root causes identified" className="rise-in" style={{ '--delay': '140ms' }}>
          <div className="flex flex-col gap-4">
            {rootCauses.map((c) => (
              <div key={c.title} className="flex gap-2.5">
                <AlertTriangle size={15} className="text-pulse shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13px] font-medium text-ink">{c.title}</p>
                  <p className="text-[12px] text-ink-soft mt-0.5">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Section 3: one card per AI-generated recommendation, each tagged
          with a priority badge (High/Medium) - see PriorityBadge in ui.jsx. */}
      <SectionCard eyebrow="Exhibit C" title="AI-generated recommendations" className="rise-in" style={{ '--delay': '200ms' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.title} className="border border-line rounded-md p-4 bg-canvas/40">
              <PriorityBadge priority={rec.priority} />
              <p className="text-[14px] font-medium text-ink mt-3">{rec.title}</p>
              <p className="text-[13px] text-ink-soft mt-1 leading-relaxed">{rec.description}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
