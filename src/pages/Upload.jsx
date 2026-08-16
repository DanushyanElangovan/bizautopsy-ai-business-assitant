import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileSpreadsheet, CheckCircle2, PlayCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { SectionCard } from '../components/ui';
import { business, uploadedFiles } from '../data/mockData';

// Dropdown option lists for the "Analysis settings" form.
const businessTypes = ['Retail / grocery', 'Restaurant / cafe', 'Services', 'Manufacturing', 'Other'];
const sectors = ['Food & beverage', 'Fashion & apparel', 'Electronics', 'Healthcare', 'Other'];
const periods = ['Last month', 'Last 3 months', 'Last 6 months', 'Last 12 months'];

/**
 * Upload (route: "/upload")
 * Implements the "Upload business data" and "Enter data manually" use
 * cases from the UML diagram. Lets the owner:
 *   1. Drag-and-drop (or browse for) source files.
 *   2. See the files that have already been imported.
 *   3. Fill in analysis settings (business name/type, period, sector).
 *   4. Trigger the AI analysis, which navigates to the Diagnostics page.
 *
 * File upload here is a UI mock (no real upload request is sent yet) - the
 * drag-over highlight and progress bars are for demonstrating the intended
 * UX; wiring this to a real endpoint means replacing the onDrop handler
 * and the static `uploadedFiles` list with real upload/progress state.
 */
export default function Upload() {
  const navigate = useNavigate();

  // Tracks whether a file is currently being dragged over the dropzone, so
  // we can highlight it (border/background colour change) while dragging.
  const [isDragging, setIsDragging] = useState(false);

  // Controlled form state for the "Analysis settings" fields, pre-filled
  // from the current business record in mock data.
  const [businessName, setBusinessName] = useState(business.name);
  const [businessType, setBusinessType] = useState(business.type);
  const [period, setPeriod] = useState('Last 3 months');
  const [sector, setSector] = useState(business.sector);

  return (
    <>
      <PageHeader
        caseRef="Intake"
        title="Upload business data"
        subtitle="Import records to run a new AI analysis"
      />

      <SectionCard eyebrow="Step 1" title="Import records" className="rise-in mb-4">
        {/* Dropzone: highlights on drag-over, accepts a drop (no-op for now
            since there is no backend yet - see class-level comment above). */}
        <div
          onDragOver={(e) => {
            e.preventDefault(); // required so the browser allows a drop
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            // TODO (backend integration): read e.dataTransfer.files here
            // and POST them to the upload API instead of just resetting
            // the drag state.
          }}
          className={`border-2 border-dashed rounded-md py-10 flex flex-col items-center justify-center text-center transition-all ${
            isDragging ? 'border-vital bg-vital-light/40 scale-[0.99]' : 'border-line'
          }`}
        >
          <div className="w-11 h-11 rounded-full bg-vital-light flex items-center justify-center mb-3 border border-vital/30">
            <UploadCloud size={20} className="text-vital-deep" />
          </div>
          <p className="text-[14px] text-ink font-medium">Drop your files here or click to browse</p>
          <p className="text-[12px] text-ink-soft mt-1">Sales records, expense reports, customer data</p>
          <p className="text-[11px] text-ink-faint mt-3 font-mono">CSV · XLSX · PDF · Max 10 MB</p>
          {/* Hidden native file input, triggered by the styled label below
              so we can use our own button styling instead of the browser
              default "Choose file" button. */}
          <input type="file" multiple className="hidden" id="file-input" />
          <label
            htmlFor="file-input"
            className="mt-4 text-[12px] font-medium bg-void text-white px-3.5 py-1.5 rounded-md cursor-pointer hover:bg-void-hover active:scale-[0.97] transition-all"
          >
            Browse files
          </label>
        </div>

        {/* List of already-imported files (mock data), each with a full
            green progress bar and a checkmark to represent "upload complete". */}
        <div className="flex flex-col gap-3 mt-5">
          {uploadedFiles.map((f) => (
            <div key={f.name} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-canvas flex items-center justify-center shrink-0 border border-line">
                <FileSpreadsheet size={16} className="text-ink-soft" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] text-ink truncate">{f.name}</p>
                  <span className="text-[11px] text-ink-faint shrink-0 ml-2">{f.size}</span>
                </div>
                <div className="h-1 rounded-full bg-canvas mt-1.5 overflow-hidden">
                  <div className="h-full w-full bg-vital rounded-full" />
                </div>
              </div>
              <CheckCircle2 size={16} className="text-vital shrink-0" />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Analysis settings form. Each field is a standard controlled input:
          value comes from state, onChange updates that state, so React is
          always the single source of truth for what's on screen. */}
      <SectionCard eyebrow="Step 2" title="Analysis settings" className="rise-in mb-4" style={{ '--delay': '80ms' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Business name">
            <input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Business type">
            <select value={businessType} onChange={(e) => setBusinessType(e.target.value)} className="input">
              {businessTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Analysis period">
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="input">
              {periods.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </Field>
          <Field label="Industry sector">
            <select value={sector} onChange={(e) => setSector(e.target.value)} className="input">
              {sectors.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
        </div>
      </SectionCard>

      {/* "Run AI analysis" button: in this mock version it simply routes to
          the Diagnostics page. In the real system this would POST the
          uploaded files + settings to the AI Analysis Engine and redirect
          once the backend responds with a result. */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigate('/diagnostics')}
          className="inline-flex items-center gap-2 bg-vital text-white text-[14px] font-medium px-5 py-2.5 rounded-md hover:bg-vital-deep active:scale-[0.97] transition-all shadow-stamp"
        >
          <PlayCircle size={17} />
          Run AI analysis
        </button>
      </div>
    </>
  );
}

/**
 * Field
 * Small layout helper: wraps a form control with a consistent label above
 * it, so every field in the Analysis settings form looks the same without
 * repeating the label markup each time.
 *
 * @param {string} label - Text shown above the form control.
 * @param {ReactNode} children - The actual <input>/<select> element.
 */
function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-[12px] text-ink-soft mb-1.5">{label}</span>
      {children}
    </label>
  );
}
