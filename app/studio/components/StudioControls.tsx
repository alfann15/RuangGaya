'use client';

import { TimerOption } from '@/lib/config';
import styles from './StudioControls.module.css';

interface StudioControlsProps {
  isReady: boolean;
  isCountingDown: boolean;
  autoShoot: boolean;
  timer: TimerOption;
  timerOptions: number[];
  allSlotsFilled: boolean;
  onCapture: () => void;
  onTimedCapture: () => void;
  onAutoShoot: () => void;
  onTimerChange: (t: TimerOption) => void;
  onAutoShootToggle: () => void;
  onReset: () => void;
  onCancelCountdown: () => void;
}

export default function StudioControls({
  isReady,
  isCountingDown,
  autoShoot,
  timer,
  timerOptions,
  allSlotsFilled,
  onCapture,
  onTimedCapture,
  onAutoShoot,
  onTimerChange,
  onAutoShootToggle,
  onReset,
  onCancelCountdown,
}: StudioControlsProps) {
  return (
    <div className={styles.controls}>
      {/* Main capture button */}
      <div className={styles.captureRow}>
        {isCountingDown ? (
          <button
            id="btn-cancel-countdown"
            className={`btn-secondary ${styles.cancelBtn}`}
            onClick={onCancelCountdown}
          >
            ✕ Batal
          </button>
        ) : (
          <>
            <button
              id="btn-capture"
              className={`btn-primary ${styles.captureBtn}`}
              onClick={onCapture}
              disabled={!isReady || allSlotsFilled}
            >
              📸 Ambil Foto
            </button>

            <button
              id="btn-timer-capture"
              className={`btn-secondary ${styles.timerBtn}`}
              onClick={onTimedCapture}
              disabled={!isReady || allSlotsFilled}
              title={`Timer ${timer} detik`}
            >
              ⏱️ Timer ({timer}s)
            </button>
          </>
        )}
      </div>

      {/* Timer selector + Auto Shoot row */}
      <div className={styles.optionRow}>
        {/* Timer options */}
        <div className={styles.timerGroup}>
          <span className={styles.optionLabel}>Timer:</span>
          {timerOptions.map((t) => (
            <button
              key={t}
              id={`btn-timer-${t}`}
              className={`pill ${timer === t ? 'active' : ''}`}
              onClick={() => onTimerChange(t as TimerOption)}
            >
              {t}s
            </button>
          ))}
        </div>

        {/* Auto shoot */}
        <button
          id="btn-auto-shoot"
          className={`${styles.autoBtn} ${autoShoot ? styles.autoBtnActive : ''}`}
          onClick={autoShoot ? onCancelCountdown : onAutoShoot}
          disabled={!isReady}
          title="Auto Shoot semua slot"
        >
          {autoShoot && isCountingDown ? '⏸ Stop Auto' : '⚡ Auto Shoot'}
        </button>

        {/* Reset */}
        {allSlotsFilled && (
          <button
            id="btn-reset"
            className="btn-ghost"
            onClick={onReset}
            style={{ fontSize: '0.85rem', fontWeight: 700 }}
          >
            🔄 Foto Lagi
          </button>
        )}
      </div>

      {/* Status text */}
      <p className={styles.statusText}>
        {!isReady
          ? 'Menunggu kamera…'
          : isCountingDown
          ? 'Bersiap…'
          : allSlotsFilled
          ? '✅ Semua slot terisi! Download strip di bawah.'
          : 'Klik "Ambil Foto" atau gunakan timer 📷'}
      </p>
    </div>
  );
}
