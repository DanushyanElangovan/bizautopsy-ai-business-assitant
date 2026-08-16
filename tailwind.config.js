/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // "Binder" — the near-black rail and solid dark UI elements
        void: {
          DEFAULT: '#05070C',
          soft: '#0B0F18',
          hover: '#121A2C',
        },
        // Report surface — deep navy-black instrument-panel background
        canvas: '#0A0F1A',
        // Exhibit sheet — lighter navy panel that pops off the canvas
        card: '#131C2E',
        ink: {
          DEFAULT: '#E9EEF9',
          soft: '#98A6BE',
          faint: '#5E6C86',
        },
        line: '#233047',
        // "Vital" — stable / healthy diagnostic-blue (was teal)
        vital: {
          DEFAULT: '#3E7BFA',
          light: '#DCE7FF',
          deep: '#1E4FC2',
        },
        // "Pulse" — critical / high-risk red
        pulse: {
          DEFAULT: '#EF5A4C',
          light: '#FBDAD5',
          deep: '#B23A2E',
        },
        // Ochre case-stamp amber for moderate risk
        amber: {
          DEFAULT: '#E0A83E',
          light: '#F7E7C4',
          deep: '#A87A1F',
        },
        low: {
          DEFAULT: '#4C8CFF',
          light: '#DCE7FF',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '3px',
        md: '4px',
        lg: '6px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.35), 0 1px 0 rgba(0,0,0,0.2)',
        exhibit: '0 1px 0 rgba(255,255,255,0.03), 0 10px 26px -14px rgba(0,0,0,0.65)',
        stamp: '0 0 0 1px rgba(62,123,250,0.5), 0 0 0 3px rgba(62,123,250,0.12)',
      },
    },
  },
  plugins: [],
};
