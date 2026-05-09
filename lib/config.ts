// ═══ RuangGaya — Central Configuration ═══

export const TEMPLATES = [
  { id: '2x1', label: '2×1 Strip', slots: 2, cols: 1, previewImg: '/templates/tmpl-2x1.jpg' },
  { id: '3x1', label: '3×1 Strip', slots: 3, cols: 1, previewImg: '/templates/tmpl-3x1.jpg' },
  { id: '4x1', label: '4×1 Strip', slots: 4, cols: 1, previewImg: '/templates/tmpl-4x1.jpg' },
  { id: '2x2', label: '2×2 Grid',  slots: 4, cols: 2, previewImg: '/templates/tmpl-2x2.jpg' },
  { id: '2x3', label: '2×3 Grid',  slots: 6, cols: 2, previewImg: '/templates/tmpl-2x3.jpg' },
] as const;

export type Template = (typeof TEMPLATES)[number];
export type TemplateId = Template['id'];

/**
 * Resolve the overlay PNG path for a given template.
 *
 * overlayPath can be:
 *   - null                  → no overlay
 *   - string                → same PNG for ALL templates
 *   - Record<TemplateId, string> → different PNG per template
 *     (use '_default' key as fallback if specific template not found)
 */
export function getOverlayPath(
  overlayPath: FrameConfig['overlayPath'],
  templateId: TemplateId
): string | null {
  if (!overlayPath) return null;
  if (typeof overlayPath === 'string') return overlayPath;
  // Per-template map
  return overlayPath[templateId] ?? overlayPath['_default'] ?? null;
}

// ─────────────────────────────────────────────────────────────────────
//  Frame Configuration
//
//  Setiap frame bisa memiliki kombinasi dari properti berikut:
//
//  bgColor     — warna latar belakang strip (wajib, digunakan sebagai fallback)
//  borderColor — warna border tipis di sekeliling setiap slot foto
//  bgImage     — (opsional) path ke gambar/foto yang dijadikan LATAR BELAKANG strip
//                  Taruh file di /public/frames/ lalu isi path-nya.
//                  Contoh: '/frames/bg-taman.jpg'
//                  Gambar akan di-crop "cover" untuk memenuhi area strip.
//
//  overlayPath — (opsional) path ke PNG Photoshop TRANSPARAN yang dirender
//                  DI ATAS foto sebagai dekorasi (border, bunga, sudut, dll).
//                  Area foto di PNG harus transparan (hapus di Photoshop).
//                  Taruh file di /public/frames/ lalu isi path-nya.
//                  Contoh: '/frames/overlay-bunga.png'
//
//  Kombinasi yang tersedia:
//    ① bgColor saja           → background warna solid (default)
//    ② bgColor + bgImage      → foto/wallpaper sebagai background
//    ③ bgColor + overlayPath  → warna solid + dekorasi PNG di atas foto
//    ④ bgImage + overlayPath  → foto background + dekorasi PNG di atas foto
//
//  CARA TAMBAH FRAME BARU:
//    1. Taruh file gambar/PNG di folder  d:\app-project\RuangGaya\public\frames\
//    2. Tambah entri baru di array FRAMES di bawah ini
//    3. Simpan file → app akan langsung update (hot reload)
// ─────────────────────────────────────────────────────────────────────

export interface FrameConfig {
  id: string;
  name: string;
  bgColor: string;
  borderColor: string;
  /** Path ke gambar background (jpg/png). null = tidak ada. */
  bgImage: string | null;
  /**
   * Path ke PNG Photoshop overlay transparan.
   *
   * Bisa berupa:
   *   - null            → tidak ada overlay
   *   - string          → satu PNG yang sama untuk SEMUA layout/template
   *   - object          → PNG berbeda untuk setiap template:
   *       { '2x1': '/frames/...', '3x1': '/frames/...', '_default': '/frames/...' }
   *     Gunakan kunci '_default' sebagai fallback jika template tidak ditemukan.
   */
  overlayPath: string | Partial<Record<TemplateId | '_default', string>> | null;
}

export const FRAMES: FrameConfig[] = [
  // ── Solid color frames ───────────────────────────────────────────
  {
    id: 'white',
    name: 'White Clean',
    bgColor: '#FFFFFF',
    borderColor: '#E8E8E8',
    bgImage: null,
    overlayPath: null,
  },
  {
    id: 'pink',
    name: 'Pink Soft',
    bgColor: '#FFF0F5',
    borderColor: '#F4C0D1',
    bgImage: null,
    overlayPath: null,
  },
  {
    id: 'dark-pink',
    name: 'Dark Rose',
    bgColor: '#993556',
    borderColor: '#D4537E',
    bgImage: null,
    overlayPath: null,
  },
  {
    id: 'black',
    name: 'Classic Black',
    bgColor: '#1A1A1A',
    borderColor: '#333333',
    bgImage: null,
    overlayPath: null,
  },
  {
    id: 'lavender',
    name: 'Lavender',
    bgColor: '#F0EAFF',
    borderColor: '#C9B8F0',
    bgImage: null,
    overlayPath: null,
  },
  {
    id: 'mint',
    name: 'Mint Fresh',
    bgColor: '#EAFAF4',
    borderColor: '#A8E6CF',
    bgImage: null,
    overlayPath: null,
  },
  {
    id: 'nude',
    name: 'Nude Beige',
    bgColor: '#F5EDE0',
    borderColor: '#D4B896',
    bgImage: null,
    overlayPath: null,
  },

  // ── Frame gambar background ──────────────────────────────────────
  // Taruh file di /public/frames/ lalu uncomment / tambah entri:
  //
  // {
  //   id: 'bg-taman',
  //   name: 'Taman Bunga',
  //   bgColor: '#2D5A27',          // fallback jika gambar gagal load
  //   borderColor: '#ffffff',
  //   bgImage: '/frames/bg-taman.jpg',
  //   overlayPath: null,
  // },
  // {
  //   id: 'bg-starry',
  //   name: 'Starry Night',
  //   bgColor: '#0d1b2a',
  //   borderColor: '#7ecfff',
  //   bgImage: '/frames/bg-starry.jpg',
  //   overlayPath: null,
  // },

  // ── Frame Overlay PNG Photoshop ──────────────────────────────────
  // PNG harus punya area TRANSPARAN di tempat foto akan muncul.
  // Taruh file di /public/frames/ lalu uncomment / tambah entri:
  //
  // {
  //   id: 'overlay-bunga',
  //   name: 'Bunga Cantik',
  //   bgColor: '#FFF0F5',
  //   borderColor: '#F4C0D1',
  //   bgImage: null,
  //   overlayPath: '/frames/overlay-bunga.png',
  // },
  // {
  //   id: 'overlay-vintage',
  //   name: 'Vintage Border',
  //   bgColor: '#F5EDE0',
  //   borderColor: '#D4B896',
  //   bgImage: '/frames/bg-paper.jpg',   // bisa kombinasi bgImage + overlayPath
  //   overlayPath: '/frames/overlay-vintage.png',
  // },

  // ── Existing custom frames (placeholder PNGs) ────────────────────
  {
    id: 'custom-1',
    name: 'Floral Dots',
    bgColor: '#FFF0F5',
    borderColor: '#D4537E',
    bgImage: null,
    overlayPath: {
      '2x1': '/frames/frame-floral-2x1.png',
      '3x1': '/frames/frame-floral-3x1.png',
      '4x1': '/frames/frame-floral-4x1.png',
      '2x2': '/frames/frame-floral-2x2.png',
      '2x3': '/frames/frame-floral-2x3.png',
      '_default': '/frames/frame-floral-2x1.png',
    },
  },
  {
    id: 'custom-2',
    name: 'Kawaii Corner',
    bgColor: '#FFF0F5',
    borderColor: '#ED93B1',
    bgImage: null,
    overlayPath: {
      '2x1': '/frames/frame-kawaii-2x1.png',
      '3x1': '/frames/frame-kawaii-3x1.png',
      '4x1': '/frames/frame-kawaii-4x1.png',
      '2x2': '/frames/frame-kawaii-2x2.png',
      '2x3': '/frames/frame-kawaii-2x3.png',
      '_default': '/frames/frame-kawaii-2x1.png',
    },
  },
  {
    id: 'custom-3',
    name: 'Simple Elegance',
    bgColor: '#FFF0F5',
    borderColor: '#993556',
    bgImage: null,
    overlayPath: {
      '2x1': '/frames/frame-simple-2x1.png',
      '3x1': '/frames/frame-simple-3x1.png',
      '4x1': '/frames/frame-simple-4x1.png',
      '2x2': '/frames/frame-simple-2x2.png',
      '2x3': '/frames/frame-simple-2x3.png',
      '_default': '/frames/frame-simple-2x1.png',
    },
  },
  {
    id: 'custom-4',
    name: 'Retro Lines',
    bgColor: '#FFF0F5',
    borderColor: '#C06080',
    bgImage: null,
    overlayPath: {
      '2x1': '/frames/frame-retro-2x1.png',
      '3x1': '/frames/frame-retro-3x1.png',
      '4x1': '/frames/frame-retro-4x1.png',
      '2x2': '/frames/frame-retro-2x2.png',
      '2x3': '/frames/frame-retro-2x3.png',
      '_default': '/frames/frame-retro-2x1.png',
    },
  },
];

export type Frame = FrameConfig;

export const FILTERS = ['Normal', 'B&W', 'Vintage', 'Vivid', 'Pastel', 'Warm'] as const;
export type FilterType = (typeof FILTERS)[number];

/** Map filter name → CSS filter string */
export const FILTER_CSS: Record<FilterType, string> = {
  Normal:  'none',
  'B&W':   'grayscale(100%)',
  Vintage: 'sepia(60%) contrast(90%) brightness(90%)',
  Vivid:   'saturate(180%) contrast(110%)',
  Pastel:  'saturate(60%) brightness(110%)',
  Warm:    'sepia(30%) saturate(140%) brightness(105%)',
};

export const TIMER_OPTIONS = [3, 5, 10] as const;
export type TimerOption = (typeof TIMER_OPTIONS)[number];
