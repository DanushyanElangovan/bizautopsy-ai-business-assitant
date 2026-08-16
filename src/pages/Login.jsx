import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock } from 'lucide-react';

/**
 * Login (route: "/login")
 * Frontend-only mock auth: any non-empty email/password is accepted.
 * On submit we set a flag in localStorage and redirect - see RequireAuth.jsx,
 * which every other route is gated behind.
 */
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // If RequireAuth redirected here from a specific page, send the user back
  // to that page after signing in instead of always landing on "/".
  const redirectTo = location.state?.from?.pathname || '/';

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Enter both an email and password to continue.');
      return;
    }
    setError('');
    localStorage.setItem('bizautopsy_auth', 'true');
    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-sm bg-vital/15 border border-vital/40 flex items-center justify-center mb-3">
            <Activity size={22} className="text-vital" strokeWidth={2.2} />
          </div>
          <p className="font-display font-semibold text-xl text-ink">BizAutopsy AI</p>
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-faint mt-1">
            SME Diagnostics
          </p>
        </div>

        <div className="rise-in bg-card border border-line border-t-[3px] border-t-vital/70 rounded-md shadow-exhibit p-6">
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-faint mb-1">
            Case file access
          </p>
          <h1 className="font-display font-semibold text-[20px] text-ink mb-5">Sign in to continue</h1>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <label className="block">
              <span className="block text-[12px] text-ink-soft mb-1.5">Email</span>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" />
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  className="input pl-9"
                />
              </div>
            </label>

            <label className="block">
              <span className="block text-[12px] text-ink-soft mb-1.5">Password</span>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" />
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pl-9"
                />
              </div>
            </label>

            {error && <p className="text-[12px] text-pulse">{error}</p>}

            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center gap-2 bg-vital text-white text-[14px] font-medium px-4 py-2.5 rounded-md hover:bg-vital-deep active:scale-[0.97] transition-all shadow-stamp"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-[12px] text-ink-soft mt-5">
            Don't have an account?{' '}
            <Link to="/register" className="text-vital font-medium hover:underline">
              Create one
            </Link>
          </p>
        </div>

        <p className="text-center text-[11px] text-ink-faint mt-5 font-mono">
          Demo build — any email &amp; password will work
        </p>
      </div>
    </div>
  );
}