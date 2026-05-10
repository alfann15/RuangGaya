'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './SocialModal.module.css';

export default function SocialModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const modalContent = isOpen ? (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Temukan Kami</h3>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Tutup">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className={styles.socialList}>
          {/* TikTok */}
          <a href="https://www.tiktok.com/@alfann062" target="_blank" rel="noopener noreferrer" className={styles.socialItem}>
            <div className={styles.iconWrap} style={{ color: '#000' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </div>
            <div className={styles.socialText}>
              <span className={styles.socialName}>TikTok</span>
              <span className={styles.socialHandle}>@alfann062</span>
            </div>
          </a>

          {/* Facebook */}
          <a href="https://www.facebook.com/alfan151106" target="_blank" rel="noopener noreferrer" className={styles.socialItem}>
            <div className={styles.iconWrap} style={{ color: '#1877F2' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </div>
            <div className={styles.socialText}>
              <span className={styles.socialName}>Facebook</span>
              <span className={styles.socialHandle}>Alfan</span>
            </div>
          </a>

          {/* Discord */}
          <a href="https://discord.gg/YOUR_DISCORD_LINK" target="_blank" rel="noopener noreferrer" className={styles.socialItem}>
            <div className={styles.iconWrap} style={{ color: '#5865F2' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19.7 4.9a18.2 18.2 0 0 0-5.8-1.8.1.1 0 0 0-.1.04 13.5 13.5 0 0 0-.7 1.5 17.6 17.6 0 0 0-5.2 0 11.6 11.6 0 0 0-.7-1.5.1.1 0 0 0-.1-.04 18.2 18.2 0 0 0-5.8 1.8c-.04.02-.04.04-.04.06C-.3 12.1.4 19.2 2.6 24c.02.04.04.05.06.05 1.8 1.3 3.5 2 5.6 2 .04 0 .08-.02.1-.06.4-.6.8-1.2 1.2-1.9.02-.04 0-.1-.04-.1-1.3-.5-2.5-1-3.6-1.7-.06-.04-.06-.1-.02-.15.1-.1.2-.2.3-.3.04-.03.08-.03.1-.01 7.6 3.5 15.3 0 15.4 0 .04-.02.08-.02.1.01.1.1.2.2.3.3.04.05.04.1-.02.15-1.1.7-2.3 1.2-3.6 1.7-.04.01-.06.07-.04.1.3.6.7 1.3 1.2 1.9.02.04.06.06.1.06 2-.1 3.8-.8 5.6-2 .04 0 .06-.02.06-.05 2.2-4.8 3-11.9.4-19.1-.02-.02-.02-.04-.04-.06zM8.5 16.5c-1.3 0-2.4-1.2-2.4-2.7s1.1-2.7 2.4-2.7c1.3 0 2.4 1.2 2.4 2.7s-1.1 2.7-2.4 2.7zm7 0c-1.3 0-2.4-1.2-2.4-2.7s1.1-2.7 2.4-2.7c1.3 0 2.4 1.2 2.4 2.7s-1.1 2.7-2.4 2.7z"></path>
              </svg>
            </div>
            <div className={styles.socialText}>
              <span className={styles.socialName}>Discord</span>
              <span className={styles.socialHandle}>Join Server</span>
            </div>
          </a>

          {/* GitHub */}
          <a href="https://github.com/alfann15/RuangGaya" target="_blank" rel="noopener noreferrer" className={styles.socialItem}>
            <div className={styles.iconWrap} style={{ color: '#333' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </div>
            <div className={styles.socialText}>
              <span className={styles.socialName}>GitHub Repo</span>
              <span className={styles.socialHandle}>Source Code</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className={`btn-secondary ${styles.triggerBtn}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
        Sosmed
      </button>

      {/* Render modal in portal to break out of any backdrop-filter containing blocks */}
      {mounted && typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  );
}
