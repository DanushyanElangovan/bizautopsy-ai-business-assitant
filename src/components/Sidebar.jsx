import React from 'react';

import {
  Activity,
  LayoutDashboard,
  UploadCloud,
  Stethoscope,
  TrendingUp,
  Receipt,
  Users,
  LogOut,
} from 'lucide-react';
import { business } from '../data/mockData';
import { NavLink, useNavigate } from 'react-router-dom';

// Navigation link definitions for the "Main" group in the sidebar.
const mainLinks = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/upload', label: 'Upload data', icon: UploadCloud },
  { to: '/diagnostics', label: 'Diagnostics', icon: Stethoscope },
];

// Navigation link definitions for the "Analysis" group in the sidebar.
const analysisLinks = [
  { to: '/sales', label: 'Sales trends', icon: TrendingUp },
  { to: '/expenses', label: 'Expenses', icon: Receipt },
  { to: '/customers', label: 'Customers', icon: Users },
];

function NavGroup({ title, links }) {
  return (
    <div className="mb-6">
      <p className="px-4 mb-2 font-mono text-[10px] tracking-[0.16em] uppercase text-white/35">
        {title}
      </p>
      <div className="flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `relative flex items-center gap-3 mx-2 px-3 py-2 rounded-sm text-sm transition-colors ${
                isActive
                  ? 'bg-vital/15 text-vital-light border border-vital/40'
                  : 'text-white/55 hover:text-white hover:bg-white/[0.06] border border-transparent'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={17} strokeWidth={1.8} />
                {label}
                {isActive && (
                  <span
                    className="absolute top-1/2 -translate-y-1/2 -right-2 w-4 h-6 bg-vital"
                    style={{ clipPath: 'polygon(0 0, 60% 0, 100% 50%, 60% 100%, 0 100%)' }}
                    aria-hidden="true"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('bizautopsy_auth');
    navigate('/login', { replace: true });
  }

  return (
    <aside
      className="w-60 shrink-0 h-screen sticky top-0 flex flex-col py-5 overflow-visible relative"
      style={{
        background:
          'linear-gradient(180deg, #0F1626 0%, #0A0F1A 55%, #060910 100%)',
        boxShadow: 'inset -1px 0 0 rgba(62,123,250,0.08), 4px 0 24px -12px rgba(0,0,0,0.7)',
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)',
        }}
      />

      <div className="relative px-4 mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-sm bg-vital/15 border border-vital/40 flex items-center justify-center shrink-0">
            <Activity size={17} className="text-vital" strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <p className="font-display font-semibold text-[15px] text-white leading-none">
              BizAutopsy AI
            </p>
            <p className="font-mono text-[10px] text-white/35 mt-1.5 tracking-wide">SME DIAGNOSTICS</p>
          </div>
        </div>
      </div>

      <nav className="relative flex-1 overflow-y-auto overflow-x-visible">
        <NavGroup title="Main" links={mainLinks} />
        <NavGroup title="Analysis" links={analysisLinks} />
      </nav>

      <div className="relative px-4 pt-4 mt-2 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-vital/20 text-vital font-display font-semibold text-xs flex items-center justify-center border border-vital/30">
            JA
          </div>
          <div className="min-w-0">
            <p className="text-sm text-white truncate">{business.owner}</p>
            <p className="text-[11px] text-white/40 truncate">Business owner</p>
          </div>
          <button
            type="button"
            aria-label="Log out"
            onClick={handleLogout}
            className="ml-auto text-white/30 hover:text-white/70 transition-colors"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}