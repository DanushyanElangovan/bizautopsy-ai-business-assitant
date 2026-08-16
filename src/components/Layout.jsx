import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

/**
 * Layout
 * Shared page shell rendered once and reused by every route (see App.jsx,
 * where all routes are nested inside this element).
 *
 * It renders:
 *   1. <Sidebar /> - fixed navigation on the left, present on every page.
 *   2. <Outlet />  - a React Router placeholder. Whichever page matches the
 *                    current URL (Dashboard, Upload, Diagnostics, etc.) gets
 *                    injected here automatically by the router.
 *
 * Keeping this in one place means the sidebar and page padding only have to
 * be written and styled once, instead of copy-pasted into every page file.
 */
export default function Layout() {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <main className="flex-1 min-w-0 px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
