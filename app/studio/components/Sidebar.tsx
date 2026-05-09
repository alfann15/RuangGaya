'use client';
import { useState } from 'react';

import { Template, Frame, FilterType, TimerOption, getOverlayPath } from '@/lib/config';
import { STICKERS } from '@/lib/stickers';
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
  isReviewMode: boolean;
  onTemplateChange: (t: Template) => void;
  onFrameChange: (f: Frame) => void;
  onFilterChange: (f: FilterType) => void;
  onStripTextChange: (s: string) => void;
  onTimerChange: (t: TimerOption) => void;
  onAutoShootToggle: () => void;
  onAddSticker: (id: string, hueRotate: number) => void;
}

// Tab definition
const TABS = [
  { id: 'frame',    label: 'Frame',   icon: <FrameTabIcon /> },
  { id: 'filter',  label: 'Filter',  icon: <FilterTabIcon /> },
  { id: 'sticker', label: 'Stiker',  icon: <StickerTabIcon /> },
  { id: 'text',    label: 'Teks',    icon: <TextTabIcon /> },
  { id: 'tmpl',    label: 'Layout',  icon: <LayoutTabIcon /> },
] as const;
type TabId = (typeof TABS)[number]['id'];

export default function Sidebar({
  templates, frames, filters,
  activeTemplate, activeFrame, activeFilter,
  stripText, timer, timerOptions, isReviewMode,
  onTemplateChange, onFrameChange, onFilterChange,
  onStripTextChange, onTimerChange, onAddSticker,
}: SidebarProps) {
  const [stickerHue, setStickerHue] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>('frame');

  const visibleTabs = isReviewMode
    ? TABS
    : TABS;

  return (
    <aside className={styles.sidebar} aria-label="Panel kontrol">
      {/* ── Tab bar (mobile + desktop) ── */}
      <div className={styles.tabBar}>
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
            aria-label={tab.label}
            title={tab.label}
          >
            {tab.icon}
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div className={styles.inner}>

        {/* FRAME */}
        {activeTab === 'frame' && (
          <Section title="Frame Latar">
            <div className={styles.frameGrid}>
              {frames.map((f) => (
                <button
                  key={f.id}
                  id={`frame-${f.id}`}
                  className={`${styles.frameBtn} ${activeFrame.id === f.id ? styles.active : ''}`}
                  onClick={() => onFrameChange(f)}
                  title={f.name}
                >
                  {/* Priority: bgImage > overlayPath thumbnail > color swatch */}
                  {f.bgImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={f.bgImage} alt={f.name} className={styles.frameBgThumb} />
                  ) : f.overlayPath ? (
                    <div className={styles.frameOverlayThumb} style={{ background: f.bgColor }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={getOverlayPath(f.overlayPath, activeTemplate.id) || ''} alt={f.name} className={styles.frameOverlayImg} />
                    </div>
                  ) : (
                    <div
                      className={styles.frameSwatch}
                      style={{ background: f.bgColor, border: `3px solid ${f.borderColor}` }}
                    >
                      <div className={styles.frameSwatchSlot} style={{ background: f.borderColor, opacity: 0.6 }} />
                    </div>
                  )}
                  <span className={styles.frameLabel}>{f.name}</span>
                </button>
              ))}
            </div>
            {/* Custom Background Color Picker */}
            <div className={styles.bgColorPickerWrap}>
              <label htmlFor="custom-bg" className={styles.bgColorLabel}>
                Warna Latar Kustom:
              </label>
              <div className={styles.bgColorInputBox}>
                <input
                  type="color"
                  id="custom-bg"
                  value={activeFrame.bgColor}
                  onChange={(e) => onFrameChange({ ...activeFrame, bgColor: e.target.value })}
                  className={styles.bgColorInput}
                  title="Ganti warna latar belakang"
                />
                <span className={styles.bgColorHex}>{activeFrame.bgColor.toUpperCase()}</span>
              </div>
            </div>
            {/* Guide for adding custom frames */}
            <div className={styles.frameGuide}>
              <div className={styles.frameGuideTitle}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Cara tambah frame sendiri
              </div>
              <div className={styles.frameGuideBody}>
                <p>① Taruh gambar/PNG ke <code>/public/frames/</code></p>
                <p>② Tambah entri di <code>lib/config.ts</code></p>
                <p>③ Simpan → frame langsung muncul</p>
              </div>
            </div>
          </Section>
        )}


        {/* FILTER */}
        {activeTab === 'filter' && (
          <Section title="Filter Foto">
            <div className={styles.filterGrid}>
              {filters.map((f) => (
                <button
                  key={f}
                  id={`filter-${f.toLowerCase().replace(/[^a-z]/g, '')}`}
                  className={`${styles.filterBtn} ${activeFilter === f ? styles.active : ''}`}
                  onClick={() => onFilterChange(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </Section>
        )}

        {/* STICKER */}
        {activeTab === 'sticker' && (
          <Section title="Stiker">
            <div className={styles.hueControl}>
              <div className={styles.hueRow}>
                <span className={styles.hint}>Warna:</span>
                <div
                  className={styles.huePreview}
                  style={{
                    background: stickerHue === 0 ? 'transparent' : `hsl(${stickerHue}, 80%, 50%)`,
                    border: stickerHue === 0 ? '2px dashed var(--rg-card)' : 'none'
                  }}
                />
              </div>
              <input
                type="range"
                min="0" max="360"
                value={stickerHue}
                onChange={(e) => setStickerHue(Number(e.target.value))}
                className={styles.hueSlider}
              />
            </div>
            <div className={styles.stickerGrid}>
              {STICKERS.map((s) => (
                <button
                  key={s.id}
                  id={`sticker-${s.id}`}
                  className={styles.stickerBtn}
                  onClick={() => onAddSticker(s.id, stickerHue)}
                  title={`Tambah ${s.label}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.path}
                    alt={s.label}
                    className={styles.stickerThumb}
                    style={{
                      filter: stickerHue > 0
                        ? `brightness(0) saturate(100%) invert(50%) sepia(100%) saturate(500%) hue-rotate(${stickerHue}deg)`
                        : 'none'
                    }}
                  />
                </button>
              ))}
            </div>
            <p className={styles.hint}>Atur warna lalu klik stiker. Seret untuk memindah.</p>
          </Section>
        )}

        {/* TEXT */}
        {activeTab === 'text' && (
          <Section title="Teks Strip">
            <input
              id="input-strip-text"
              type="text"
              className="rg-input"
              placeholder="Nama / tanggal acara..."
              value={stripText}
              onChange={(e) => onStripTextChange(e.target.value)}
              maxLength={60}
            />
            <p className={styles.hint}>Muncul di bagian bawah strip foto</p>
          </Section>
        )}

        {/* TEMPLATE */}
        {activeTab === 'tmpl' && (
          <>
            <Section title="Layout Template">
              <div className={styles.templateGrid}>
                {templates.map((t) => (
                  <button
                    key={t.id}
                    id={`tmpl-${t.id}`}
                    className={`${styles.templateBtn} ${activeTemplate.id === t.id ? styles.active : ''}`}
                    onClick={() => onTemplateChange(t)}
                    title={t.label}
                  >
                    <TemplateIcon cols={t.cols as number} rows={Math.ceil(t.slots / (t.cols as number))} />
                    <span className={styles.templateLabel}>{t.label}</span>
                  </button>
                ))}
              </div>
            </Section>

            {!isReviewMode && (
              <Section title="Timer Foto">
                <div className={styles.timerRow}>
                  {timerOptions.map((t) => (
                    <button
                      key={t}
                      id={`timer-${t}`}
                      className={`${styles.timerBtn} ${timer === t ? styles.active : ''}`}
                      onClick={() => onTimerChange(t as TimerOption)}
                    >
                      {t}s
                    </button>
                  ))}
                </div>
              </Section>
            )}
          </>
        )}

      </div>
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>{title}</div>
      {children}
    </div>
  );
}

function TemplateIcon({ cols, rows }: { cols: number; rows: number }) {
  const slotW = cols === 1 ? 40 : 17;
  const slotH = rows <= 2 ? Math.floor(28 / rows) - 2 : Math.floor(28 / rows) - 1;
  const gapX = cols === 1 ? 0 : 4;
  const gapY = rows === 1 ? 0 : 3;
  return (
    <svg width="46" height="34" viewBox="0 0 46 34" aria-hidden style={{ display: 'block' }}>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <rect
            key={`${r}-${c}`}
            x={2 + c * (slotW + gapX)}
            y={3 + r * (slotH + gapY)}
            width={slotW}
            height={slotH}
            rx="2"
            fill="currentColor"
          />
        ))
      )}
    </svg>
  );
}

// ─── Tab Icons (SVG) ──────────────────────────────────────────
function FrameTabIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <rect x="7" y="7" width="10" height="10" rx="1"/>
    </svg>
  );
}
function FilterTabIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M1.05 12H3m18 0h1.95M12 1.05V3m0 18v1.95M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  );
}
function StickerTabIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10A10 10 0 0 1 2 12C2 6.48 6.48 2 12 2z"/>
      <path d="M12 8v4m0 4h.01"/>
    </svg>
  );
}
function TextTabIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="4 7 4 4 20 4 20 7"/>
      <line x1="9" y1="20" x2="15" y2="20"/>
      <line x1="12" y1="4" x2="12" y2="20"/>
    </svg>
  );
}
function LayoutTabIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  );
}
