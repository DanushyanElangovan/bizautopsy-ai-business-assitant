import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PageHeader from '../components/PageHeader';
import { SectionCard, StatCard } from '../components/ui';
import { customerTrend, customerStats } from '../data/mockData';

/**
 * Customers (route: "/customers")
 * Implements the "Analyse customer behaviour" use case. Shows how many
 * customers are new vs. returning each month, plus supporting KPIs
 * (repeat rate, average basket value, churn risk, loyalty enrollment).
 *
 * Layout:
 *   1. Four KPI stat cards, straight from `customerStats` mock data.
 *   2. Stacked bar chart of new vs. returning customers per month.
 *   3. A short written insight linking the trend back to the root cause
 *      identified on the Diagnostics page ("no retention strategy").
 */
export default function Customers() {
  return (
    <>
      <PageHeader caseRef="Exhibit · Customers" title="Customers" subtitle="Behaviour patterns and retention analysis" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {customerStats.map((s, i) => (
          <div key={s.label} className="rise-in" style={{ '--delay': `${i * 60}ms` }}>
            <StatCard {...s} />
          </div>
        ))}
      </div>

      <SectionCard eyebrow="Exhibit A" title="New vs returning customers" subtitle="Monthly transaction count" className="rise-in mb-4" style={{ '--delay': '220ms' }}>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            {/* stackId="a" on both <Bar> elements makes them stack on top
                of each other (one bar per month, split into two colours)
                instead of being drawn side by side. */}
            <BarChart data={customerTrend} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#233047" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#8493AD' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#8493AD' }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid #233047', background: '#131C2E', color: '#E9EEF9', fontFamily: 'IBM Plex Mono, monospace' }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="returning" name="Returning" stackId="a" fill="#3E7BFA" radius={[0, 0, 0, 0]} />
              <Bar dataKey="new" name="New" stackId="a" fill="#E0A83E" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard eyebrow="Analyst note" title="Insight" className="rise-in" style={{ '--delay': '280ms' }}>
        <p className="text-[13px] text-ink-soft leading-relaxed">
          Returning customers have declined steadily since January while new customer acquisition has stayed flat.
          With no loyalty program active, first-time buyers have no incentive to return, which lines up with the
          "no customer retention strategy" root cause in the latest diagnostic report.
        </p>
      </SectionCard>
    </>
  );
}
