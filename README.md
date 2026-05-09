<div align="center">

<br />

# 🎀 RuangGaya

### Aplikasi Web Photobooth Cute & Playful

**Foto bareng, kenangan abadi.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![CSS Modules](https://img.shields.io/badge/CSS-Modules-pink)](https://github.com/css-modules/css-modules)
[![License: MIT](https://img.shields.io/badge/License-MIT-pink.svg)](LICENSE)

<br />

![RuangGaya Banner](https://placehold.co/900x300/FFF0F5/D4537E?text=RuangGaya+🎀+Photobooth)

</div>

---

## ✨ Tentang RuangGaya

**RuangGaya** adalah aplikasi photobooth online gratis berbasis browser — tidak perlu install, tidak perlu akun. Pilih template strip foto, tambah frame cantik, jepret momen terbaik, lalu download hasilnya langsung ke perangkat kamu!

---

## 🎯 Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 📸 **Live Webcam** | Viewfinder real-time dengan mirror horizontal |
| 🖼️ **5 Template Strip** | 2×1, 3×1, 4×1, 2×2, 2×3 — pilih sesuai selera |
| ✨ **Frame Overlay PNG** | Frame dekoratif dengan area foto transparan |
| 🎨 **6 Filter Foto** | Normal, B&W, Vintage, Vivid, Pastel, Warm |
| ⏱️ **Timer Foto** | 3, 5, atau 10 detik — siap-siap dulu! |
| ⚡ **Auto Shoot** | Isi semua slot otomatis tanpa klik berkali-kali |
| ✏️ **Teks Strip** | Tambah nama / tanggal acara di bagian bawah strip |
| 💾 **Download JPG** | Export photo strip kualitas tinggi langsung ke perangkat |
| 📱 **Responsive** | Nyaman dipakai di desktop maupun mobile |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) — App Router + TypeScript
- **Styling**: Vanilla CSS Modules + Google Fonts (Nunito)
- **Tema**: Pink pastel 🌸 — cute & playful
- **Rendering**: Client-side only (no server, no DB)
- **Export**: Canvas API → JPEG download

---

## 🚀 Cara Menjalankan Lokal

```bash
# Clone repo
git clone https://github.com/USERNAME_KAMU/ruanggaya.git
cd ruanggaya

# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

> **Catatan:** Browser perlu izin kamera. Pastikan kamu membuka via `localhost` (bukan `file://`) agar `getUserMedia` bisa berjalan.

---

## 📁 Struktur Proyek

```
ruanggaya/
├── app/
│   ├── page.tsx                   # Landing page
│   ├── layout.tsx                 # Root layout + font Nunito
│   ├── globals.css                # Design system & CSS variables
│   └── studio/
│       ├── page.tsx               # Studio halaman utama
│       └── components/
│           ├── Viewfinder.tsx     # Live webcam + frame overlay
│           ├── Sidebar.tsx        # Template/frame/filter picker
│           ├── SlotStrip.tsx      # Thumbnail slot foto
│           ├── StudioControls.tsx # Tombol capture/timer/auto
│           └── ResultPreview.tsx  # Preview & download strip
├── hooks/
│   ├── useWebcam.ts               # getUserMedia lifecycle
│   └── usePhotobooth.ts           # State management photobooth
├── lib/
│   ├── config.ts                  # TEMPLATES, FRAMES, FILTERS
│   └── capture.ts                 # captureFrame + buildStripCanvas
├── public/
│   ├── frames/                    # Frame PNG (ganti dengan asset kamu)
│   └── templates/                 # Template preview JPG
└── scripts/
    └── generate-placeholders.mjs  # Generator asset placeholder
```

---

## 🖼️ Menambah Frame Kustom

Frame PNG dibuat di Photoshop/Figma dengan spesifikasi:
- Area foto = **transparan** (alpha = 0)
- Dekorasi/stiker sudah termasuk di dalam PNG
- Ukuran disarankan: **640×480px** atau **1280×960px**

**Langkah:**
1. Taruh file di `public/frames/frame-{id}.png`
2. Daftarkan di `lib/config.ts` → array `FRAMES`:

```ts
{ id: 'myframe', name: 'Frame Buatan Saya', path: '/frames/frame-myframe.png' }
```

---

## 🎨 CSS Variables (Design System)

```css
--rg-bg:      #FFF0F5   /* Background utama */
--rg-surface: #FBEAF0   /* Surface cards */
--rg-card:    #F4C0D1   /* Border & accent ringan */
--rg-accent:  #D4537E   /* Warna aksen utama */
--rg-dark:    #993556   /* Aksen gelap */
--rg-text:    #4B1528   /* Teks utama */
--rg-muted:   #C06080   /* Teks sekunder */
```

---

## 🔄 Regenerasi Placeholder Assets

```bash
npm install canvas --save-dev
node scripts/generate-placeholders.mjs
```

---

## 📝 Lisensi

MIT © RuangGaya — Dibuat dengan 💖 untuk semua momen indah.
