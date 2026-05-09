'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Template, FilterType, Frame } from '@/lib/config';
import { PlacedSticker } from '@/lib/stickers';
import { buildStripCanvas } from '@/lib/capture';
import StripPreview from './StripPreview';
import styles from './ResultPreview.module.css';

interface ResultPreviewProps {
  slots: string[];
  template: Template;
  frame: Frame;
  stripText: string;
  filter: FilterType;
  placedStickers: PlacedSticker[];
  onReset: () => void;
  onRemoveSticker: (uid: string) => void;
  onMoveSticker: (uid: string, x: number, y: number) => void;
}

export default function ResultPreview({
  slots,
  template,
  frame,
  stripText,
  filter,
  placedStickers,
  onReset,
  onRemoveSticker,
  onMoveSticker,
}: ResultPreviewProps) {
  const [isBuilding, setIsBuilding] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [qrModal, setQrModal] = useState<{ show: boolean; qrDataUrl: string; shareUrl: string; isGenerating: boolean }>({
    show: false, qrDataUrl: '', shareUrl: '', isGenerating: false,
  });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /** Build the strip canvas once and cache it */
  const getCanvas = useCallback(async () => {
    if (canvasRef.current) return canvasRef.current;
    const canvas = await buildStripCanvas({
      slots,
      cols: template.cols,
      templateId: template.id,
      frame,
      stripText,
      filter,
      placedStickers,
    });
    canvasRef.current = canvas;
    return canvas;
  }, [slots, template, frame, stripText, filter, placedStickers]);

  // Invalidate cache when dependencies change
  useEffect(() => { canvasRef.current = null; }, [slots, template, frame, stripText, filter, placedStickers]);

  /** Direct download */
  const handleDownload = useCallback(async () => {
    setIsBuilding(true);
    try {
      const canvas = await getCanvas();
      const link = document.createElement('a');
      link.download = `ruanggaya-${Date.now()}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
      setDownloaded(true);
    } catch (err) {
      console.error('Download gagal:', err);
    } finally {
      setIsBuilding(false);
    }
  }, [getCanvas]);

  /** Generate QR → upload → show modal */
  const handleGenerateQR = useCallback(async () => {
    setQrModal({ show: true, qrDataUrl: '', shareUrl: '', isGenerating: true });
    try {
      // Build canvas
      const canvas = await getCanvas();
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

      // Upload to server
      const res = await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl }),
      });
      if (!res.ok) throw new Error('Upload failed');
      const { shareUrl } = await res.json() as { id: string; shareUrl: string };

      // Generate QR code image
      const qrDataUrl = await QRCode.toDataURL(shareUrl, {
        width: 240,
        margin: 2,
        color: { dark: '#993556', light: '#FFFFFF' },
        errorCorrectionLevel: 'M',
      });

      setQrModal({ show: true, qrDataUrl, shareUrl, isGenerating: false });
    } catch (err) {
      console.error('QR generation gagal:', err);
      setQrModal({ show: false, qrDataUrl: '', shareUrl: '', isGenerating: false });
      alert('Gagal membuat QR. Coba lagi.');
    }
  }, [getCanvas]);

  const closeModal = () => setQrModal({ show: false, qrDataUrl: '', shareUrl: '', isGenerating: false });

  return (
    <div className={styles.wrap} id="result-preview">
      {/* Preview column */}
      <div className={styles.previewCol}>
        <div className={styles.sectionLabel}>Preview Strip</div>
        <StripPreview
          slots={slots}
          template={template}
          frame={frame}
          filter={filter}
          placedStickers={placedStickers}
          stripText={stripText}
          onRemoveSticker={onRemoveSticker}
          onMoveSicker={onMoveSticker}
        />
      </div>

      {/* Action column */}
      <div className={styles.actionCol}>
        <div className={styles.sectionLabel}>Unduh &amp; Bagikan</div>

        {/* Direct download */}
        <button
          id="btn-download"
          className={styles.downloadBtn}
          onClick={handleDownload}
          disabled={isBuilding}
        >
          {isBuilding ? (
            <span className={styles.spinner} />
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          )}
          {isBuilding ? 'Memproses...' : downloaded ? 'Unduh Lagi' : 'Unduh ke Perangkat'}
        </button>

        {/* QR Download */}
        <button
          id="btn-qr-download"
          className={styles.qrBtn}
          onClick={handleGenerateQR}
          disabled={qrModal.isGenerating}
        >
          {qrModal.isGenerating ? (
            <span className={styles.spinner} style={{ borderTopColor: 'var(--rg-accent)' }} />
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              <rect x="5" y="5" width="3" height="3" fill="currentColor"/>
              <rect x="16" y="5" width="3" height="3" fill="currentColor"/>
              <rect x="16" y="16" width="3" height="3" fill="currentColor"/>
              <rect x="5" y="16" width="3" height="3" fill="currentColor"/>
            </svg>
          )}
          {qrModal.isGenerating ? 'Membuat QR...' : 'Unduh via QR Code'}
        </button>

        {/* Retake */}
        <button id="btn-foto-lagi" className={styles.retakeBtn} onClick={onReset}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/>
          </svg>
          Foto Lagi
        </button>

        {downloaded && (
          <div className={styles.successMsg}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Foto berhasil diunduh!
          </div>
        )}
      </div>

      {/* ── QR Modal ── */}
      {qrModal.show && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal} aria-label="Tutup">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div className={styles.modalLogo}>RuangGaya</div>

            {qrModal.isGenerating ? (
              <div className={styles.modalLoading}>
                <div className={styles.spinnerLg} />
                <p>Mempersiapkan foto...</p>
              </div>
            ) : (
              <>
                <p className={styles.modalTitle}>Scan untuk unduh di HP</p>

                <div className={styles.qrWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrModal.qrDataUrl} alt="QR Code" className={styles.qrImg} />
                </div>

                <div className={styles.qrSteps}>
                  <div className={styles.step}>
                    <span className={styles.stepNum}>1</span>
                    <span>Buka kamera HP atau app QR scanner</span>
                  </div>
                  <div className={styles.step}>
                    <span className={styles.stepNum}>2</span>
                    <span>Arahkan ke QR code di atas</span>
                  </div>
                  <div className={styles.step}>
                    <span className={styles.stepNum}>3</span>
                    <span>Klik link → Unduh ke galeri HP</span>
                  </div>
                </div>

                <p className={styles.qrExpiry}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Link berlaku 30 menit
                </p>

                {/* Fallback: copy link */}
                <button
                  className={styles.copyLinkBtn}
                  onClick={() => {
                    navigator.clipboard.writeText(qrModal.shareUrl);
                    alert('Link disalin!');
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                  </svg>
                  Salin Link
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
