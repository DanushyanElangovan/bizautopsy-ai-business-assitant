import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PageHeader from '../components/PageHeader';
import { SectionCard, StatCard } from '../components/ui';
import { expenseCategories } from '../data/mockData';

// Total of every category's LKR amount, used for the "Total expenses" card.
const totalExpenses = expenseCategories.reduce((sum, c) => sum + c.amount, 0);

// Categories where the business's actual share of spend is higher than the
// industry benchmark - i.e. areas that are overspending relative to peers.
const overBenchmark = expenseCategories.filter((c) => c.share > c.benchmark);

/**
 * Expenses (route: "/expenses")
 * Implements the "View expense breakdown" use case. Compares the
 * business's spending, category by category, against an industry
 * benchmark percentage to highlight where costs are out of line.
 *
 * Layout:
 *   1. Four KPI stat cards (computed above from expenseCategories).
 *   2. Grouped bar chart: business share % vs benchmark % per category.
 *   3. A detail list repeating the same numbers in a scannable table-like
 *      list, with the LKR amount and the +/- gap vs benchmark spelled out.
 */
export default function Expenses() {
  return (
    <>
      <PageHeader caseRef="Exhibit · Expenses" title="Expenses" subtitle="Category breakdown vs. industry benchmark" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="rise-in"><StatCard label="Total expenses" value={`LKR ${(totalExpenses / 1000).toFixed(0)}K`} delta="+9.4% vs last period" trend="down" /></div>
        <div className="rise-in" style={{ '--delay': '60ms' }}><StatCard label="Categories over benchmark" value={overBenchmark.length} delta="Needs attention" trend="down" /></div>
        <div className="rise-in" style={{ '--delay': '120ms' }}><StatCard label="Largest category" value="Staff wages" delta="32% of total" trend="flat" /></div>
        <div className="rise-in" style={{ '--delay': '180ms' }}><StatCard label="Furthest over benchmark" value="Rent & utilities" delta="+13pts vs benchmark" trend="down" /></div>
      </div>

      <SectionCard eyebrow="Exhibit A" title="Spend by category" subtitle="Your share vs. industry benchmark (%)" className="rise-in mb-4" style={{ '--delay': '220ms' }}>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expenseCategories} margin={{ top: 8, right: 16, left: 0, bottom: 0 }} barGap={6}>
              <CartesianGrid stroke="#233047" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#8493AD' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#8493AD' }} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid #233047', background: '#131C2E', color: '#E9EEF9', fontFamily: 'IBM Plex Mono, monospace' }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {/* Two bars per category, side by side: this business's actual
                  share (green) next to the industry benchmark (grey). */}
              <Bar dataKey="share" name="Your share" fill="#3E7BFA" radius={[3, 3, 0, 0]} />
              <Bar dataKey="benchmark" name="Benchmark" fill="#3A4A66" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard eyebrow="Exhibit B" title="Category detail" className="rise-in" style={{ '--delay': '280ms' }}>
        <div className="flex flex-col divide-y divide-line">
          {expenseCategories.map((c) => {
            // Recomputed per row: is THIS category over its benchmark?
            // Used to colour the +/- gap text red (over) or green (under).
            const over = c.share > c.benchmark;
            return (
              <div key={c.name} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-[13px] font-medium text-ink">{c.name}</p>
                  <p className="text-[12px] text-ink-faint font-mono mt-0.5">LKR {c.amount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-mono text-ink">{c.share}%</p>
                  <p className={`text-[11px] font-medium ${over ? 'text-pulse' : 'text-vital'}`}>
                    {over ? '+' : ''}
                    {c.share - c.benchmark}pts vs {c.benchmark}% benchmark
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </>
  );
}
