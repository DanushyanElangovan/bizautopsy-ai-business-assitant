import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PageHeader from '../components/PageHeader';
import { SectionCard, StatCard } from '../components/ui';
import { salesTrend } from '../data/mockData';

// -----------------------------------------------------------------------
// Derived statistics, computed once from `salesTrend` when this module is
// first loaded (not recalculated on every render, since salesTrend is a
// static mock array in this version of the app).
// -----------------------------------------------------------------------

// Sum of all monthly revenue / target figures, used for the "Total
// revenue" stat card and the "Gap to target" percentage below.
const totalRevenue = salesTrend.reduce((sum, m) => sum + m.revenue, 0);
const totalTarget = salesTrend.reduce((sum, m) => sum + m.target, 0);

// How far below (negative would mean above) target total revenue is,
// expressed as a percentage of the target.
const gapPct = Math.round(((totalTarget - totalRevenue) / totalTarget) * 100);

// The single month with the highest revenue, found by comparing each
// month's revenue and keeping whichever is larger ("reduce" here is just
// picking the max, not summing).
const bestMonth = salesTrend.reduce((a, b) => (b.revenue > a.revenue ? b : a));

// Percentage change from the first month in the dataset to the last,
// used as a simple "6-month growth" indicator.
const growth = Math.round(
  ((salesTrend[salesTrend.length - 1].revenue - salesTrend[0].revenue) / salesTrend[0].revenue) * 100
);

/**
 * SalesTrends (route: "/sales")
 * Implements the "View sales trend" use case. Shows:
 *   - four derived KPI stat cards (computed above)
 *   - a line chart comparing actual revenue against target, month by month
 *   - a short written insight tying the chart back to the diagnostic report
 */
export default function SalesTrends() {
  return (
    <>
      <PageHeader caseRef="Exhibit · Revenue" title="Sales trends" subtitle="Revenue performance against target, last 6 months" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="rise-in"><StatCard label="Total revenue" value={`LKR ${(totalRevenue / 1000).toFixed(0)}K`} /></div>
        <div className="rise-in" style={{ '--delay': '60ms' }}><StatCard label="Gap to target" value={`${gapPct}%`} delta="Below plan" trend="down" /></div>
        <div className="rise-in" style={{ '--delay': '120ms' }}><StatCard label="Best month" value={bestMonth.month} delta={`LKR ${(bestMonth.revenue / 1000).toFixed(0)}K`} trend="up" /></div>
        <div className="rise-in" style={{ '--delay': '180ms' }}><StatCard label="6-month growth" value={`${growth}%`} delta={growth >= 0 ? 'Trending up' : 'Trending down'} trend={growth >= 0 ? 'up' : 'down'} /></div>
      </div>

      <SectionCard eyebrow="Exhibit A" title="Revenue vs target" subtitle="Monthly, LKR" className="rise-in mb-4" style={{ '--delay': '220ms' }}>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesTrend} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#233047" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#8493AD' }} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: '#8493AD' }}
                tickFormatter={(v) => `${v / 1000}K`}
              />
              <Tooltip
                formatter={(v) => `LKR ${v.toLocaleString()}`}
                contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid #233047', background: '#131C2E', color: '#E9EEF9', fontFamily: 'IBM Plex Mono, monospace' }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {/* Dashed grey line = target revenue (the plan/goal) */}
              <Line type="monotone" dataKey="target" name="Target" stroke="#3A4A66" strokeDasharray="4 4" strokeWidth={2} dot={false} />
              {/* Solid green line = actual revenue achieved, with dots on
                  each data point so individual months are easy to read */}
              <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#3E7BFA" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard eyebrow="Analyst note" title="Insight" className="rise-in" style={{ '--delay': '280ms' }}>
        <p className="text-[13px] text-ink-soft leading-relaxed">
          Revenue has stayed below target every month, with the gap widening in March and April. The afternoon
          promotion recommendation in the diagnostic report targets the 2pm-5pm slow window identified in this
          period, which is the largest single contributor to the shortfall.
        </p>
      </SectionCard>
    </>
  );
}
