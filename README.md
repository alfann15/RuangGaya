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

**RuangGaya** adalah aplikasi photobooth online gratis berbasis browser — tidak perlu install, tidak perlu akun. Pilih template strip foto, tambah frame cantik, jepret momen terbaik, lalu download hasilnya langsung ke galeri kamu!

---

## 🎯 Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 📸 **Live Webcam HD** | Resolusi tangkapan tinggi (1200x900) dengan auto-crop (object-fit cover) untuk mengatasi distorsi kamera. |
| 🖼️ **5 Template Strip** | 2×1, 3×1, 4×1, 2×2, 2×3 — pilih sesuai selera |
| ✨ **Frame & Latar Kustom** | Dukungan warna latar belakang bebas (color picker), frame gambar wallpaper, dan overlay PNG (bisa disesuaikan per layout template). |
| 🎨 **6 Filter Foto** | Normal, B&W, Vintage, Vivid, Pastel, Warm |
| ⏱️ **Fitur Studio** | Timer otomatis (3/5/10 detik), auto-shoot, tambah teks pada bagian bawah strip, & dekorasi stiker geser. |
| 💾 **Simpan & Bagikan** | Download langsung JPG resolusi tinggi, atau **unduh via QR Code** ke HP kamu! |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) — App Router + TypeScript
- **Styling**: Vanilla CSS Modules + Google Fonts (Nunito)
- **Tema**: Pink pastel 🌸 — cute & playful
- **Rendering**: Client-side only (no DB)
- **Export**: Canvas API → JPEG download
- **Share**: Memori server temporal untuk unduhan QR Code.

---

## 🚀 Cara Menjalankan Lokal

```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

> **Catatan:** Browser perlu izin kamera. Pastikan kamu membuka via `localhost` (bukan `file://`) agar `getUserMedia` bisa berjalan.

---

## 🖼️ Menambah Frame Kustom

Sistem frame RuangGaya sangat fleksibel. Ada **tiga jenis** kombinasi frame yang bisa ditambahkan melalui file konfigurasi `lib/config.ts`:

### Tipe 1 — Solid Color / Warna Dasar
Hanya menggunakan warna solid dan border. Warna ini juga bisa diubah *on-the-fly* oleh user menggunakan Color Picker di UI.

```ts
{
  id: 'pink',
  name: 'Pink Soft',
  bgColor: '#FFF0F5',
  borderColor: '#F4C0D1',
  bgImage: null,
  overlayPath: null,
}
```

### Tipe 2 — Frame Latar Gambar (Wallpaper / bgImage)
Gambar/foto dirender **di belakang** foto-foto pengguna. Cocok untuk frame bermotif kertas, langit, dll.

```ts
{
  id: 'bg-taman',
  name: 'Taman Bunga',
  bgColor: '#2D5A27',          // fallback jika gambar gagal load
  borderColor: '#ffffff',
  bgImage: '/frames/bg-taman.jpg',
  overlayPath: null,
}
```

### Tipe 3 — Frame Overlay PNG Photoshop (Per-Layout)
PNG transparan yang dibuat di Photoshop dirender **di atas foto** sebagai bingkai/dekorasi. 
Kamu dapat menetapkan file PNG yang berbeda-beda agar desain bingkainya presisi untuk setiap layout potongan (2x1, 2x2, dst).

```ts
{
  id: 'floral-frame',
  name: 'Bunga Cantik',
  bgColor: '#FFF0F5',
  borderColor: '#D4537E',
  bgImage: null,
  overlayPath: {
    '2x1': '/frames/frame-floral-2x1.png',
    '3x1': '/frames/frame-floral-3x1.png',
    '4x1': '/frames/frame-floral-4x1.png',
    '2x2': '/frames/frame-floral-2x2.png',
    '2x3': '/frames/frame-floral-2x3.png',
    '_default': '/frames/frame-floral-2x1.png'
  },
}
```

> **Spesifikasi PNG:**
> - Gunakan PNG yang mendukung transparency (alpha = 0) pada area tempat foto akan muncul.
> - Resolusi disarankan untuk PNG menyesuaikan layout yang dihasilkan (misal 448x976 px untuk 3x1).
> - Generate otomatis dimensi mockup dengan: `node scripts/generate-assets.mjs`

---

## 🔄 Regenerasi Placeholder Assets

RuangGaya dilengkapi dengan script untuk men-generate otomatis aset-aset placeholder (stiker, frame mockup semua dimensi, dan thumbnail template):

```bash
npm install canvas --save-dev
node scripts/generate-assets.mjs
```

---

## 📁 Struktur Proyek

```
app/
  page.tsx              # Landing page
  layout.tsx            # Root layout + font
  globals.css           # Design system (CSS variables)
  api/photos/[id]/      # Endpoint share QR foto in-memory
  share/[id]/           # UI halaman download via HP (QR)
  studio/               # Studio utama
hooks/
  useWebcam.ts          # getUserMedia lifecycle HD (1280x720)
  usePhotobooth.ts      # State management photobooth
lib/
  config.ts             # TEMPLATES, FRAMES, FILTERS
  capture.ts            # Logic Canvas API & Object-fit Crop
  photo-store.ts        # Temporal in-memory photo saver
public/                 # Asset statis, template thumbnail, frames
scripts/
  generate-assets.mjs   # Script generator PNG otomatis
```

---

Dibuat dengan 💖 untuk semua momen indah.
