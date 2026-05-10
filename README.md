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
| ✨ **Frame & Latar Kustom** | Dukungan warna latar belakang bebas (color picker) dan frame gambar wallpaper. |
| 🧸 **Sistem Stiker Dinamis** | Tambahkan stiker lucu sesukamu! Stiker bisa di-*drag*, *resize*, dan diputar (*rotate*) sesuka hati. |
| 🎨 **6 Filter Foto** | Normal, B&W, Vintage, Vivid, Pastel, Warm |
| ⏱️ **Fitur Studio** | Timer otomatis (3/5/10 detik), auto-shoot, tambah teks dengan warna kustom pada bagian bawah strip. |
| 💾 **Simpan & Bagikan** | Download langsung JPG resolusi tinggi (skala sempurna dengan layar), atau **unduh via QR Code** ke HP kamu! |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) — App Router + TypeScript + API Routes
- **Styling**: Vanilla CSS Modules + Container Queries + Google Fonts (Nunito)
- **Tema**: Pink pastel 🌸 — cute & playful
- **Rendering**: Client-side canvas logic + `react-moveable` untuk manipulasi elemen
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

## 🖼️ Menambah Frame Background Kustom

Sistem frame latar belakang RuangGaya sangat fleksibel. Ada dua jenis konfigurasi background yang bisa ditambahkan melalui file konfigurasi `lib/config.ts`:

### Tipe 1 — Solid Color / Warna Dasar
Hanya menggunakan warna solid dan border. Warna ini juga bisa diubah *on-the-fly* oleh user menggunakan Color Picker di UI.

```ts
{
  id: 'pink',
  name: 'Pink Soft',
  bgColor: '#FFF0F5',
  borderColor: '#F4C0D1',
  bgImage: null,
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
  bgImage: '/backgrounds/bg-taman.jpg',
}
```

---

## 🧸 Sistem Stiker Dinamis (Auto-Load)

RuangGaya kini mendukung penambahan stiker yang sepenuhnya fleksibel! Stiker akan dimuat **otomatis** oleh aplikasi tanpa perlu mendaftarkannya satu per satu ke dalam kode sumber.

**Cara Tambah Stiker Baru:**
1. Masukkan file gambar (`.png`, `.jpg`, `.gif`) yang memiliki latar transparan ke dalam folder `public/overlays/`.
2. Buka tab **Stiker** di aplikasi.
3. Aplikasi akan langsung mendeteksi semua file di folder tersebut dan menampilkannya sebagai opsi stiker.
4. Klik untuk menambah stiker, lalu geser, perbesar, dan putar posisinya!

> **Tips:** Gunakan stiker berformat PNG dengan resolusi secukupnya (misal: 300x300px) agar performa aplikasi tetap cepat!

---

## 📁 Struktur Proyek

```
app/
  page.tsx              # Landing page
  layout.tsx            # Root layout + font
  globals.css           # Design system (CSS variables)
  api/
    stickers/route.ts   # API baca otomatis folder stiker
    photos/[id]/route.ts# API endpoint untuk share foto in-memory
  share/[id]/           # UI halaman download via HP (QR)
  studio/               # Studio utama photobooth
hooks/
  useWebcam.ts          # getUserMedia lifecycle HD (1280x720)
  usePhotobooth.ts      # State management photobooth
lib/
  config.ts             # TEMPLATES, FRAMES, FILTERS
  capture.ts            # Logic Canvas API, DOMMatrix, & Object-fit Crop
  photo-store.ts        # Temporal in-memory photo saver
public/                 # Asset statis
  backgrounds/          # Folder untuk wallpaper frame kustom
  overlays/             # Folder otomatis untuk memuat stiker dinamis
  templates/            # Preview layout / template
```

---

Dibuat dengan untuk semua momen indah.
