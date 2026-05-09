'use client';

import { useEffect, useRef } from 'react';
import { FilterType, FILTER_CSS } from '@/lib/config';
import styles from './Viewfinder.module.css';

interface ViewfinderProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isReady: boolean;
  error: string | null;
  filter: FilterType;
  framePath: string | null;
  isCountingDown: boolean;
  countdown: number;
}

export default function Viewfinder({
  videoRef,
  isReady,
  error,
  filter,
  framePath,
  isCountingDown,
  countdown,
}: ViewfinderProps) {
  const cssFilter = FILTER_CSS[filter];

  return (
    <div className={styles.viewfinderWrap}>
      {/* Error state */}
      {error && (
        <div className={styles.errorState}>
          <span className={styles.errorIcon}>🚫</span>
          <p className={styles.errorTitle}>Kamera tidak bisa diakses</p>
          <p className={styles.errorMsg}>{error}</p>
          <p className={styles.errorHint}>
            Pastikan browser sudah diberi izin kamera, lalu refresh halaman ini.
          </p>
        </div>
      )}

      {/* Loading state */}
      {!error && !isReady && (
        <div className={styles.loadingState}>
          <span className={styles.loadingIcon}>📷</span>
          <p>Memuat kamera…</p>
        </div>
      )}

      {/* Live video */}
      <video
        ref={videoRef}
        id="rg-viewfinder-video"
        className={styles.video}
        style={{
          filter: cssFilter,
          display: isReady ? 'block' : 'none',
        }}
        autoPlay
        playsInline
        muted
      />

      {/* Frame overlay */}
      {isReady && framePath && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={framePath}
          alt="Frame overlay"
          className={styles.frameOverlay}
          draggable={false}
        />
      )}

      {/* Countdown overlay */}
      {isCountingDown && (
        <div className={styles.countdownOverlay}>
          <span key={countdown} className={styles.countdownNumber}>
            {countdown}
          </span>
        </div>
      )}

      {/* Filter label badge */}
      {isReady && filter !== 'Normal' && (
        <div className={styles.filterBadge}>{filter}</div>
      )}
    </div>
  );
}
