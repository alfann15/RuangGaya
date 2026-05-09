import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
      {/* Decorative Bubbles */}
      <div className="rg-bubble rg-bubble-1" />
      <div className="rg-bubble rg-bubble-2" />
      <div className="rg-bubble rg-bubble-3" />
      <div className="rg-bubble rg-bubble-4" />
      <div className="rg-bubble rg-bubble-5" />

      {/* ═══ Header ═══ */}
      <header className={styles.header}>
        <span className={styles.logo}>RuangGaya</span>
        <nav className={styles.nav}>
          <Link href="/studio" className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
            📷 Buka Studio
          </Link>
        </nav>
      </header>

      {/* ═══ Hero ═══ */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.badge}>✨ Free & No Sign-up Needed</p>
          <h1 className={styles.heroTitle}>
            Foto bareng,<br />
            <span className={styles.highlight}>kenangan abadi</span> 🎀
          </h1>
          <p className={styles.heroDesc}>
            Buat photo strip cantik langsung dari browser kamu. Pilih frame, 
            jepret momen terbaik, dan simpan hasilnya dalam hitungan detik!
          </p>
          <div className={styles.heroActions}>
            <Link href="/studio" className="btn-primary" id="cta-mulai-foto">
              <span>Mulai Foto</span>
              <span>→</span>
            </Link>
            <p className={styles.heroCta}>Tidak perlu install apapun 🌸</p>
          </div>
        </div>

        <div className={styles.heroIllustration}>
          <div className="animate-float">
            <CameraIllustration />
          </div>
        </div>
      </section>

      {/* ═══ Feature Cards ═══ */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Semua yang kamu butuhkan 💖</h2>
        <div className={styles.featureGrid}>
          <FeatureCard
            emoji="🖼️"
            title="Pilih Frame Cantik"
            desc="Koleksi frame Pink estetik siap pakai. Frame bisa kamu ganti kapan saja!"
            color="#fde8f0"
          />
          <FeatureCard
            emoji="📸"
            title="Jepret & Ekspresi"
            desc="Timer otomatis, auto-shoot, dan filter foto real-time biar hasil makin kece!"
            color="#f4e8ff"
          />
          <FeatureCard
            emoji="💾"
            title="Simpan & Bagikan"
            desc="Download photo strip kualitas tinggi. Langsung share ke sosmed!"
            color="#e8f5ff"
          />
        </div>
      </section>

      {/* ═══ CTA Banner ═══ */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerContent}>
          <h2>Siap bikin kenangan? 🎀</h2>
          <p>Gratis selamanya, langsung dari browser kamu</p>
          <Link href="/studio" className="btn-primary" id="cta-bottom" style={{ marginTop: '16px' }}>
            <span>Mulai Foto Sekarang</span>
            <span>✨</span>
          </Link>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className={styles.footer}>
        <span className={styles.footerLogo}>RuangGaya</span>
        <span className={styles.footerDivider}>·</span>
        <span className={styles.footerCredit}>
          Dibuat dengan 💖 untuk semua momen indah
        </span>
      </footer>
    </main>
  );
}

// ─── Feature Card ────────────────────────────────────────────
function FeatureCard({
  emoji,
  title,
  desc,
  color,
}: {
  emoji: string;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <div className="rg-card" style={{ textAlign: 'center' }}>
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          margin: '0 auto 16px',
        }}
      >
        {emoji}
      </div>
      <h3 style={{ fontSize: '1.1rem', marginBottom: 8, color: 'var(--rg-dark)' }}>{title}</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--rg-muted)', lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

// ─── Camera SVG Illustration ──────────────────────────────────
function CameraIllustration() {
  return (
    <svg
      width="320"
      height="280"
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ilustrasi kamera photobooth"
    >
      {/* Camera body */}
      <rect x="40" y="80" width="240" height="160" rx="24" fill="#F4C0D1" />
      <rect x="50" y="90" width="220" height="140" rx="18" fill="#FBEAF0" />

      {/* Lens outer */}
      <circle cx="160" cy="165" r="56" fill="#D4537E" opacity="0.25" />
      <circle cx="160" cy="165" r="46" fill="#D4537E" opacity="0.35" />
      <circle cx="160" cy="165" r="36" fill="#D4537E" />
      <circle cx="160" cy="165" r="26" fill="#F4C0D1" />
      <circle cx="160" cy="165" r="16" fill="#993556" />
      {/* Lens glare */}
      <circle cx="152" cy="157" r="5" fill="white" opacity="0.6" />

      {/* Viewfinder bump */}
      <rect x="120" y="60" width="80" height="28" rx="10" fill="#ED93B1" />
      <rect x="130" y="66" width="60" height="16" rx="7" fill="#F4C0D1" />

      {/* Flash */}
      <rect x="260" y="68" width="22" height="14" rx="5" fill="#FFD6E8" />

      {/* Shutter button */}
      <circle cx="268" cy="100" r="12" fill="#D4537E" />
      <circle cx="268" cy="100" r="7" fill="#993556" />

      {/* Photo strip coming out */}
      <rect x="110" y="228" width="100" height="50" rx="6" fill="white" stroke="#F4C0D1" strokeWidth="2" />
      <rect x="118" y="236" width="30" height="22" rx="3" fill="#FDE8F0" />
      <rect x="154" y="236" width="30" height="22" rx="3" fill="#FDE8F0" />
      <line x1="118" y1="265" x2="182" y2="265" stroke="#F4C0D1" strokeWidth="1.5" />
      <line x1="118" y1="270" x2="160" y2="270" stroke="#F4C0D1" strokeWidth="1.5" />

      {/* Sparkles */}
      <text x="32" y="60" fontSize="22" fill="#ED93B1">✦</text>
      <text x="272" y="50" fontSize="16" fill="#D4537E">✦</text>
      <text x="18" y="200" fontSize="14" fill="#F4C0D1">⭐</text>
      <text x="286" y="210" fontSize="18" fill="#ED93B1">✦</text>
      <text x="140" y="42" fontSize="12" fill="#D4537E">✿</text>
    </svg>
  );
}
