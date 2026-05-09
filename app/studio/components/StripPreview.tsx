'use client';

import { useRef, useCallback } from 'react';
import { Template, FilterType, FILTER_CSS, Frame, getOverlayPath } from '@/lib/config';
import { PlacedSticker, STICKERS } from '@/lib/stickers';
import styles from './StripPreview.module.css';

interface StripPreviewProps {
  slots: (string | null)[];
  template: Template;
  frame: Frame;
  filter: FilterType;
  placedStickers: PlacedSticker[];
  stripText?: string;
  onRemoveSticker: (uid: string) => void;
  onMoveSicker: (uid: string, x: number, y: number) => void;
}

export default function StripPreview({
  slots,
  template,
  frame,
  filter,
  placedStickers,
  stripText,
  onRemoveSticker,
  onMoveSicker,
}: StripPreviewProps) {
  // Resolve the overlay PNG path for the current template
  const resolvedOverlay = getOverlayPath(frame.overlayPath, template.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<{ uid: string } | null>(null);

  const cssFilter = FILTER_CSS[filter];

  const handleStickerPointerDown = useCallback(
    (e: React.PointerEvent, uid: string) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      draggingRef.current = { uid };
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      onMoveSicker(draggingRef.current.uid, x, y);
    },
    [onMoveSicker]
  );

  const handlePointerUp = useCallback(() => {
    draggingRef.current = null;
  }, []);

  // Auto-detect text color for labels based on bg brightness
  const isDark = isColorDark(frame.bgColor);
  const emptyCellColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)';
  const stripTextColor = isDark ? '#ffffff' : frame.borderColor;

  return (
    <div
      ref={containerRef}
      className={styles.previewContainer}
      style={
        frame.bgImage
          ? {
              backgroundImage: `url(${frame.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : { background: frame.bgColor }
      }
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      id="strip-preview-area"
    >
      {/* 1. Photo grid */}
      <div
        className={styles.photoGrid}
        style={{ gridTemplateColumns: `repeat(${template.cols}, 1fr)` }}
      >
        {slots.map((src, i) =>
          src ? (
            <div
              key={i}
              className={styles.photoCell}
              style={{ borderColor: frame.borderColor }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Foto ${i + 1}`}
                className={styles.photoImg}
                style={{ filter: cssFilter !== 'none' ? cssFilter : undefined }}
              />
            </div>
          ) : (
            <div
              key={i}
              className={styles.emptyCell}
              style={{ borderColor: frame.borderColor, color: emptyCellColor }}
            >
              <span className={styles.emptyCellNum}>{i + 1}</span>
            </div>
          )
        )}
      </div>

      {/* 2. Frame overlay PNG — rendered ON TOP of photos, different per template */}
      {resolvedOverlay && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolvedOverlay}
          alt=""
          className={styles.frameOverlay}
          draggable={false}
          aria-hidden
        />
      )}

      {/* 3. Stickers — draggable */}
      {placedStickers.map((ps) => {
        const def = STICKERS.find((s) => s.id === ps.stickerId);
        if (!def) return null;
        return (
          <div
            key={ps.uid}
            className={styles.stickerEl}
            style={{
              left: `${ps.x}%`,
              top: `${ps.y}%`,
              transform: `translate(-50%, -50%) rotate(${ps.rotation}deg) scale(${ps.scale})`,
            }}
            onPointerDown={(e) => handleStickerPointerDown(e, ps.uid)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={def.path}
              alt={def.label}
              className={styles.stickerImg}
              draggable={false}
              style={{
                filter: ps.hueRotate && ps.hueRotate > 0
                  ? `brightness(0) saturate(100%) invert(50%) sepia(100%) saturate(500%) hue-rotate(${ps.hueRotate}deg)`
                  : 'none',
              }}
            />
            <button
              className={styles.stickerRemove}
              onClick={(e) => { e.stopPropagation(); onRemoveSticker(ps.uid); }}
              aria-label="Hapus stiker"
            >
              ×
            </button>
          </div>
        );
      })}

      {/* 4. Strip Text Footer */}
      {stripText && stripText.trim() && (
        <div 
          className={styles.stripTextFooter}
          style={{ color: stripTextColor }}
        >
          {stripText}
        </div>
      )}
    </div>
  );
}

function isColorDark(hex: string): boolean {
  const c = hex.replace('#', '');
  if (c.length < 6) return false;
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}
