# RuangGaya 🎀

> Aplikasi web photobooth cute & playful — foto bareng, kenangan abadi!

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Vanilla CSS Modules + Google Fonts (Nunito)
- **Tema**: Pink pastel cute & playful

## Fitur

- 📸 Live webcam dengan CSS filter real-time (Normal, B&W, Vintage, Vivid, Pastel, Warm)
- 🖼️ 5 template photo strip (2×1, 3×1, 4×1, 2×2, 2×3)
- ✨ Frame overlay PNG dengan area transparan
- ⏱️ Timer foto (3/5/10 detik) + Auto Shoot semua slot
- 💾 Download strip foto sebagai JPG
- 📱 Responsive (mobile-friendly)

## Quick Start

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Menambah Frame Kustom

1. Taruh frame PNG di `/public/frames/frame-{id}.png`
2. Tambahkan entri di `lib/config.ts` → `FRAMES` array
3. Frame PNG harus memiliki area foto **transparan** (alpha = 0) dan dekorasi sudah include

## Menambah Template

Edit `lib/config.ts` → `TEMPLATES` array, tentukan `slots`, `cols`, dan `previewImg`.

## Placeholder Assets

Untuk meregenerasi placeholder template & frame:

```bash
npm install canvas --save-dev
node scripts/generate-placeholders.mjs
```

## Struktur Direktori

```
app/
  page.tsx              # Landing page
  layout.tsx            # Root layout + font
  globals.css           # Design system (CSS variables)
  studio/
    page.tsx            # Studio halaman utama
    components/
      Viewfinder.tsx    # Live webcam + frame overlay
      Sidebar.tsx       # Template/frame/filter picker
      SlotStrip.tsx     # Thumbnail slot foto
      StudioControls.tsx # Tombol capture/timer/auto
      ResultPreview.tsx  # Preview & download strip
hooks/
  useWebcam.ts          # getUserMedia lifecycle
  usePhotobooth.ts      # State management photobooth
lib/
  config.ts             # TEMPLATES, FRAMES, FILTERS config
  capture.ts            # captureFrame + buildStripCanvas
public/
  frames/               # Frame PNG (ganti dengan asset kamu)
  templates/            # Template preview JPG
```

---

Dibuat dengan 💖 untuk semua momen indah.
