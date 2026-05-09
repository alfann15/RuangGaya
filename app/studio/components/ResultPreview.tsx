'use client';

import { useState, useCallback } from 'react';
import { Template } from '@/lib/config';
import { buildStripCanvas } from '@/lib/capture';
import styles from './ResultPreview.module.css';

interface ResultPreviewProps {
  slots: string[];
  template: Template;
  framePath: string | null;
  stripText: string;
  onReset: () => void;
}

export default function ResultPreview({
  slots,
  template,
  framePath,
  stripText,
  onReset,
}: ResultPreviewProps) {
  const [isBuilding, setIsBuilding] = useState(false);

  const handleDownload = useCallback(async () => {
    setIsBuilding(true);
    try {
      const canvas = await buildStripCanvas({
        slots,
        cols: template.cols,
        framePath,
        stripText,
      });
      const link = document.createElement('a');
      link.download = `ruanggaya-strip-${Date.now()}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
    } catch (err) {
      console.error('Download gagal:', err);
    } finally {
      setIsBuilding(false);
    }
  }, [slots, template, framePath, stripText]);

  return (
    <div className={styles.resultWrap} id="result-preview">
      <div className={styles.resultHeader}>
        <span className={styles.resultIcon}>✨</span>
        <div>
          <h2 className={styles.resultTitle}>Strip foto siap!</h2>
          <p className={styles.resultSub}>Download atau mulai sesi foto baru</p>
        </div>
      </div>

      {/* Mini preview grid */}
      <div
        className={styles.previewGrid}
        style={{ gridTemplateColumns: `repeat(${template.cols}, 1fr)` }}
      >
        {slots.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt={`Foto ${i + 1}`}
            className={styles.previewImg}
          />
        ))}
      </div>

      {/* Actions */}
      <div className={styles.resultActions}>
        <button
          id="btn-download-strip"
          className="btn-primary"
          onClick={handleDownload}
          disabled={isBuilding}
        >
          {isBuilding ? '⏳ Memproses…' : '💾 Download Strip'}
        </button>
        <button
          id="btn-foto-lagi"
          className="btn-secondary"
          onClick={onReset}
        >
          📷 Foto Lagi
        </button>
      </div>

      {stripText && (
        <p className={styles.stripTextPreview}>"{stripText}"</p>
      )}
    </div>
  );
}
