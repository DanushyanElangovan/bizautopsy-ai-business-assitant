import React from 'react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';
import { FileSpreadsheet, ArrowRight, Stethoscope } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import HealthGauge from '../components/HealthGauge';
import { SectionCard, StatCard, RiskBar } from '../components/ui';
import { business, summaryStats, riskAssessment, salesTrend, uploadedFiles } from '../data/mockData';

/**
 * Dashboard (route: "/")
 * Landing page after login. Gives the business owner a one-glance overview:
 *   - current health score (HealthGauge)
 *   - a small revenue-vs-target preview chart
 *   - four headline KPI stat cards
 *   - a risk snapshot (reuses the same RiskBar rows as the Diagnostics page)
 *   - recently uploaded files, with a shortcut into the full report
 *
 * This page does not fetch or compute anything itself - it only arranges
 * data that already lives in src/data/mockData.js into layout components.
 */
export default function Dashboard() {
  return (
    <>
      <PageHeader
        caseRef={`Case no. ${business.analysisDate.split(' ').reverse().join('-').toUpperCase()}`}
        title={`Welcome back, ${business.owner.split(' ')[0]}`}
        subtitle={`${business.name} · ${business.type} · last analysed ${business.analysisDate}`}
        actions={
          <Link
            to="/diagnostics"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium bg-void text-white px-3.5 py-2 rounded-md hover:bg-void-hover transition-colors active:scale-[0.97]"
          >
            <Stethoscope size={15} />
            View full diagnosis
          </Link>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Health score gauge, takes 1 of 3 grid columns on large screens */}
        <SectionCard eyebrow="Exhibit A" title="Business health" className="rise-in lg:col-span-1 flex flex-col items-center justify-center">
          <HealthGauge score={business.healthScore} />
          <p
            className="stamp-in text-[12px] font-mono font-semibold uppercase tracking-[0.08em] text-amber mt-4 border border-amber/60 px-2.5 py-1 rounded-sm"
            style={{ '--stamp-rotate': '-2deg', transform: 'rotate(-2deg)' }}
          >
            {business.riskLevel}
          </p>
        </SectionCard>

        {/* Revenue preview chart, takes the remaining 2 of 3 columns */}
        <SectionCard eyebrow="Exhibit B" title="Revenue vs target" subtitle="Last 6 months" className="rise-in lg:col-span-2" style={{ '--delay': '80ms' }}>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTrend} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
                {/* Gradient fill under the revenue line, fading to transparent */}
                <defs>
                  <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3E7BFA" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3E7BFA" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#8493AD' }} />
                <Tooltip
                  formatter={(v) => `LKR ${v.toLocaleString()}`}
                  contentStyle={{ fontSize: 12, borderRadius: 3, border: '1px solid #233047', background: '#131C2E', color: '#E9EEF9', fontFamily: 'IBM Plex Mono, monospace' }}
                />
                {/* Dashed line = target revenue (goal) */}
                <Area type="monotone" dataKey="target" stroke="#3A4A66" fill="none" strokeDasharray="4 4" strokeWidth={1.5} />
                {/* Solid filled line = actual revenue achieved */}
                <Area type="monotone" dataKey="revenue" stroke="#3E7BFA" fill="url(#revFill)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* KPI stat cards: revenue, expenses, risk flags, repeat customer rate */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {summaryStats.map((s, i) => (
          <div key={s.label} className="rise-in" style={{ '--delay': `${140 + i * 60}ms` }}>
            <StatCard {...s} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Risk snapshot: same data/format as the Diagnostics page, so the
            owner sees a consistent picture wherever they look. */}
        <SectionCard eyebrow="Exhibit C" title="Risk snapshot" subtitle="From latest diagnostic" className="rise-in lg:col-span-2" style={{ '--delay': '260ms' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {riskAssessment.map((r) => (
              <RiskBar key={r.label} {...r} />
            ))}
          </div>
        </SectionCard>

        {/* Recently uploaded source files, with a shortcut to the full report */}
        <SectionCard
          eyebrow="Exhibit D"
          title="Recent uploads"
          action={<Link to="/upload" className="text-[12px] text-vital font-medium hover:underline">Upload more</Link>}
          className="rise-in"
          style={{ '--delay': '320ms' }}
        >
          <div className="flex flex-col gap-3">
            {uploadedFiles.map((f) => (
              <div key={f.name} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-sm bg-canvas flex items-center justify-center shrink-0 border border-line">
                  <FileSpreadsheet size={15} className="text-ink-soft" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] text-ink truncate">{f.name}</p>
                  <p className="text-[11px] text-ink-faint font-mono">{f.size}</p>
                </div>
              </div>
            ))}
            <Link
              to="/diagnostics"
              className="flex items-center justify-center gap-1.5 text-[12px] font-medium text-ink-soft hover:text-ink mt-1 py-2 border border-dashed border-line rounded-sm transition-colors"
            >
              Read the diagnostic report <ArrowRight size={13} />
            </Link>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
