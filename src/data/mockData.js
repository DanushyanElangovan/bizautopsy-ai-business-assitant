// ---------------------------------------------------------------------------
// Mock data layer
// ---------------------------------------------------------------------------
// This file stands in for the real backend described in Chapter 2 of the
// project proposal (Python API + MySQL database + AI/ML analysis engine).
// Every page imports plain data objects/arrays from here instead of calling
// an API directly, so that:
//   1. The whole frontend can be built, demoed, and marked before the
//      backend and ML model are finished.
//   2. Swapping mock data for a real API later only means changing THIS
//      file (e.g. turning each export into the result of a `fetch()` call) -
//      no page component needs to change.
// ---------------------------------------------------------------------------

// The business currently being analysed, and the headline result of the
// most recent AI diagnostic run. Mirrors the "Silva Grocery Shop" example
// used in the UI design mockups (Chapter 5 of the proposal).
export const business = {
  name: 'Silva Grocery Shop',
  type: 'Retail / grocery',
  sector: 'Food & beverage',
  owner: 'Janaka Abeyrathne',
  analysisDate: '30 June 2025',
  healthScore: 54, // 0-100, consumed by HealthGauge.jsx
  riskLevel: 'Moderate risk',
  issuesIdentified: 4,
  recommendationsGenerated: 4,
  analysisConfidence: 87, // percent
};

// Top-level KPI tiles shown on the Dashboard page (StatCard grid).
export const summaryStats = [
  { label: 'Revenue (last 3 months)', value: 'LKR 1.24M', delta: '+3.1%', trend: 'up' },
  { label: 'Total expenses', value: 'LKR 968K', delta: '+9.4%', trend: 'down' },
  { label: 'Active risk flags', value: '4', delta: '2 high priority', trend: 'flat' },
  { label: 'Repeat customer rate', value: '51%', delta: '-6.2%', trend: 'down' },
];

// Output of the "Generate risk score" use case. Each entry becomes one
// RiskBar row on the Dashboard and Diagnostics pages. `value` (0-100)
// controls how full the bar is; `level` controls its colour and label.
export const riskAssessment = [
  { label: 'Financial risk', level: 'High', value: 82 },
  { label: 'Customer churn', level: 'Medium', value: 55 },
  { label: 'Inventory risk', level: 'High', value: 78 },
  { label: 'Operational risk', level: 'Low', value: 25 },
  { label: 'Market position', level: 'Medium', value: 48 },
];

// Output of the "Identify risk patterns" / business diagnosis module.
// Shown as a list on the Diagnostics page, each with an alert icon.
export const rootCauses = [
  {
    title: 'Overhead costs too high',
    description:
      'Rent and utilities account for 28% of total expenses, well above the 15% industry benchmark.',
  },
  {
    title: 'No customer retention strategy',
    description:
      'Zero loyalty or repeat-purchase incentives detected in transaction data.',
  },
  {
    title: 'Slow-moving inventory',
    description: '22 product lines have less than 10% turnover this quarter.',
  },
  {
    title: 'Peak-hour revenue gap',
    description:
      'Sales data shows consistently low revenue 2pm-5pm with no promotional activity.',
  },
];

// Output of the "Generate recommendations" use case. Each entry becomes one
// card in the "AI-generated recommendations" grid on the Diagnostics page.
export const recommendations = [
  {
    priority: 'High priority',
    title: 'Reduce overhead costs',
    description:
      'Renegotiate lease terms or explore shared commercial space. Target overhead below 18% of revenue to improve profit margin by an estimated LKR 28K/month.',
  },
  {
    priority: 'High priority',
    title: 'Launch a loyalty program',
    description:
      'A simple SMS-based stamp card system can lift repeat visit rate from 51% back toward 68%. Estimated customer lifetime value increase: 20-25%.',
  },
  {
    priority: 'Medium priority',
    title: 'Streamline stock ordering',
    description:
      'Use a 2-week rolling demand average to set automatic reorder points. Cut perishable spoilage losses by 40% and free up LKR 18K in working capital.',
  },
  {
    priority: 'Medium priority',
    title: 'Afternoon promotions',
    description:
      'Introduce daily 2pm-5pm deals on slow-moving items. Comparable SME cases show 15-25% improvement in daily transaction count.',
  },
];

// Monthly revenue vs. target, consumed by the Dashboard's mini chart and the
// full chart on the Sales Trends page.
export const salesTrend = [
  { month: 'Jan', revenue: 420000, target: 450000 },
  { month: 'Feb', revenue: 405000, target: 450000 },
  { month: 'Mar', revenue: 380000, target: 460000 },
  { month: 'Apr', revenue: 395000, target: 460000 },
  { month: 'May', revenue: 410000, target: 470000 },
  { month: 'Jun', revenue: 425000, target: 470000 },
];

// Expense breakdown by category, each compared against an industry
// benchmark percentage. Consumed by the Expenses page (bar chart + list).
export const expenseCategories = [
  { name: 'Staff wages', amount: 296000, share: 32, benchmark: 30 },
  { name: 'Rent & utilities', amount: 259000, share: 28, benchmark: 15 },
  { name: 'Inventory / COGS', amount: 231000, share: 25, benchmark: 40 },
  { name: 'Marketing', amount: 37000, share: 4, benchmark: 6 },
  { name: 'Other', amount: 102000, share: 11, benchmark: 9 },
];

// Monthly new vs. returning customer counts, consumed by the stacked bar
// chart on the Customers page.
export const customerTrend = [
  { month: 'Jan', new: 64, returning: 118 },
  { month: 'Feb', new: 58, returning: 109 },
  { month: 'Mar', new: 71, returning: 96 },
  { month: 'Apr', new: 66, returning: 91 },
  { month: 'May', new: 73, returning: 88 },
  { month: 'Jun', new: 69, returning: 84 },
];

// KPI tiles for the Customers page.
export const customerStats = [
  { label: 'Repeat customer rate', value: '51%', delta: '-6.2%', trend: 'down' },
  { label: 'Avg. basket value', value: 'LKR 1,840', delta: '+1.4%', trend: 'up' },
  { label: 'Churn risk (90 days)', value: '128 customers', delta: 'Medium', trend: 'flat' },
  { label: 'Loyalty enrollment', value: '0%', delta: 'Not active', trend: 'down' },
];

// Files listed on the Upload page and in the Dashboard's "Recent uploads"
// card, standing in for files the user has sent to the "Upload business
// data" use case.
export const uploadedFiles = [
  { name: 'sales_records_may_2025.xlsx', size: '2.2 MB', status: 'Uploaded' },
  { name: 'expense_report_may_2025.xlsx', size: '843 KB', status: 'Uploaded' },
  { name: 'customer_data_q2.csv', size: '320 KB', status: 'Uploaded' },
];
