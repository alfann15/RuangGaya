'use client';

import Image from 'next/image';
import { Template, Frame, FilterType, TimerOption } from '@/lib/config';
import styles from './Sidebar.module.css';

interface SidebarProps {
  templates: readonly Template[];
  frames: readonly Frame[];
  filters: readonly FilterType[];
  activeTemplate: Template;
  activeFrame: Frame;
  activeFilter: FilterType;
  stripText: string;
  timer: TimerOption;
  timerOptions: readonly number[];
  autoShoot: boolean;
  onTemplateChange: (t: Template) => void;
  onFrameChange: (f: Frame) => void;
  onFilterChange: (f: FilterType) => void;
  onStripTextChange: (s: string) => void;
  onTimerChange: (t: TimerOption) => void;
  onAutoShootToggle: () => void;
}

export default function Sidebar({
  templates,
  frames,
  filters,
  activeTemplate,
  activeFrame,
  activeFilter,
  stripText,
  onTemplateChange,
  onFrameChange,
  onFilterChange,
  onStripTextChange,
}: SidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label="Panel kontrol studio">
      <div className={styles.sidebarInner}>

        {/* ─── Section: Template ─────────────────── */}
        <SidebarSection title="🖼️ Template" id="section-template">
          <div className={styles.templateGrid}>
            {templates.map((t) => (
              <button
                key={t.id}
                id={`tmpl-${t.id}`}
                className={`${styles.templateBtn} ${activeTemplate.id === t.id ? styles.active : ''}`}
                onClick={() => onTemplateChange(t)}
                title={t.label}
              >
                <div className={styles.templatePreview}>
                  <TemplateLayoutIcon cols={t.cols} rows={Math.ceil(t.slots / t.cols)} />
                </div>
                <span className={styles.templateLabel}>{t.label}</span>
              </button>
            ))}
          </div>
        </SidebarSection>

        {/* ─── Section: Frame ────────────────────── */}
        <SidebarSection title="✨ Frame" id="section-frame">
          <div className={styles.frameGrid}>
            {frames.map((f) => (
              <button
                key={f.id}
                id={`frame-${f.id}`}
                className={`${styles.frameBtn} ${activeFrame.id === f.id ? styles.active : ''}`}
                onClick={() => onFrameChange(f)}
                title={f.name}
              >
                {f.path ? (
                  <div className={styles.frameThumb}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.path} alt={f.name} className={styles.frameImg} />
                  </div>
                ) : (
                  <div className={styles.frameThumb}>
                    <span className={styles.noFrameIcon}>🚫</span>
                  </div>
                )}
                <span className={styles.frameLabel}>{f.name}</span>
              </button>
            ))}
          </div>
        </SidebarSection>

        {/* ─── Section: Filter ───────────────────── */}
        <SidebarSection title="🎨 Filter Foto" id="section-filter">
          <div className="pill-group">
            {filters.map((f) => (
              <button
                key={f}
                id={`filter-${f.toLowerCase().replace('&', '')}`}
                className={`pill ${activeFilter === f ? 'active' : ''}`}
                onClick={() => onFilterChange(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </SidebarSection>

        {/* ─── Section: Strip Text ───────────────── */}
        <SidebarSection title="✏️ Teks Strip" id="section-strip-text">
          <input
            id="input-strip-text"
            type="text"
            className="rg-input"
            placeholder="Nama / tanggal acara… 🎀"
            value={stripText}
            onChange={(e) => onStripTextChange(e.target.value)}
            maxLength={60}
          />
          <p className={styles.inputHint}>Muncul di bagian bawah strip foto</p>
        </SidebarSection>

      </div>
    </aside>
  );
}

// ─── Helper: Sidebar Section ──────────────────────────────────
function SidebarSection({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <div className={styles.section} id={id}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      {children}
    </div>
  );
}

// ─── Helper: Template Layout Preview ─────────────────────────
function TemplateLayoutIcon({ cols, rows }: { cols: number; rows: number }) {
  return (
    <svg
      width="48"
      height="36"
      viewBox="0 0 48 36"
      aria-hidden
      style={{ display: 'block' }}
    >
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const w = cols === 1 ? 44 : 20;
          const h = rows === 1 ? 32 : rows === 2 ? 14 : 9;
          const gx = cols === 1 ? 2 : 2;
          const gy = 2;
          const gapX = cols === 1 ? 0 : 4;
          const gapY = rows === 1 ? 0 : rows === 2 ? 4 : 3;
          return (
            <rect
              key={`${r}-${c}`}
              x={gx + c * (w + gapX)}
              y={gy + r * (h + gapY)}
              width={w}
              height={h}
              rx="2"
              fill="currentColor"
            />
          );
        })
      )}
    </svg>
  );
}
