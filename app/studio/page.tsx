'use client';

import { usePhotobooth } from '@/hooks/usePhotobooth';
import { useWebcam } from '@/hooks/useWebcam';
import { TEMPLATES, FRAMES, FILTERS, TIMER_OPTIONS } from '@/lib/config';
import Viewfinder from './components/Viewfinder';
import Sidebar from './components/Sidebar';
import SlotStrip from './components/SlotStrip';
import StudioControls from './components/StudioControls';
import ResultPreview from './components/ResultPreview';
import styles from './studio.module.css';

export default function StudioPage() {
  const webcam = useWebcam();
  const booth = usePhotobooth();

  const handleCapture = () => {
    if (!webcam.videoRef.current || !webcam.isReady) return;
    booth.capturePhoto(webcam.videoRef.current);
  };

  const handleTimedCapture = () => {
    if (!webcam.videoRef.current || !webcam.isReady) return;
    booth.startTimedCapture(webcam.videoRef.current);
  };

  const handleAutoShoot = () => {
    if (!webcam.videoRef.current || !webcam.isReady) return;
    booth.startAutoShoot(webcam.videoRef.current);
  };

  const allSlotsFilled = booth.slots.every((s) => s !== null);

  return (
    <div className={styles.studio}>
      {/* Decorative bubbles */}
      <div className={`rg-bubble ${styles.studioBubble1}`} />
      <div className={`rg-bubble ${styles.studioBubble2}`} />

      {/* ─── Header ─────────────────────────── */}
      <header className={styles.studioHeader}>
        <a href="/" className={styles.backBtn} title="Kembali ke beranda">
          ← <span>RuangGaya</span>
        </a>
        <h1 className={styles.studioTitle}>📷 Studio Foto</h1>
        <div className={styles.headerRight}>
          <span className={styles.statusBadge}>
            {webcam.isReady ? '🟢 Kamera aktif' : webcam.error ? '🔴 Kamera error' : '⏳ Memuat kamera…'}
          </span>
        </div>
      </header>

      {/* ─── Main Layout ─────────────────────── */}
      <div className={styles.studioBody}>
        {/* Main area */}
        <div className={styles.mainArea}>
          {/* Viewfinder */}
          <Viewfinder
            videoRef={webcam.videoRef}
            isReady={webcam.isReady}
            error={webcam.error}
            filter={booth.filter}
            framePath={booth.activeFrame.path}
            isCountingDown={booth.isCountingDown}
            countdown={booth.countdown}
          />

          {/* Slot Strip */}
          <SlotStrip
            slots={booth.slots}
            activeSlot={booth.activeSlot}
            cols={booth.activeTemplate.cols}
            onSlotClick={booth.setActiveSlot}
          />

          {/* Controls */}
          <StudioControls
            isReady={webcam.isReady}
            isCountingDown={booth.isCountingDown}
            autoShoot={booth.autoShoot}
            timer={booth.timer}
            timerOptions={[...TIMER_OPTIONS]}
            allSlotsFilled={allSlotsFilled}
            onCapture={handleCapture}
            onTimedCapture={handleTimedCapture}
            onAutoShoot={handleAutoShoot}
            onTimerChange={booth.setTimer}
            onAutoShootToggle={() => booth.setAutoShoot(!booth.autoShoot)}
            onReset={booth.resetAll}
            onCancelCountdown={booth.cancelCountdown}
          />

          {/* Result Preview (visible when all slots filled) */}
          {allSlotsFilled && (
            <ResultPreview
              slots={booth.slots as string[]}
              template={booth.activeTemplate}
              framePath={booth.activeFrame.path}
              stripText={booth.stripText}
              onReset={booth.resetAll}
            />
          )}
        </div>

        {/* Sidebar */}
        <Sidebar
          templates={[...TEMPLATES]}
          frames={[...FRAMES]}
          filters={[...FILTERS]}
          activeTemplate={booth.activeTemplate}
          activeFrame={booth.activeFrame}
          activeFilter={booth.filter}
          stripText={booth.stripText}
          timer={booth.timer}
          timerOptions={[...TIMER_OPTIONS]}
          autoShoot={booth.autoShoot}
          onTemplateChange={booth.setTemplate}
          onFrameChange={booth.setFrame}
          onFilterChange={booth.setFilter}
          onStripTextChange={booth.setStripText}
          onTimerChange={booth.setTimer}
          onAutoShootToggle={() => booth.setAutoShoot(!booth.autoShoot)}
        />
      </div>
    </div>
  );
}
