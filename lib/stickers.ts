// ═══ RuangGaya — Sticker System (PNG-based) ═══
// Taruh file PNG stiker di: /public/stickers/sticker-{id}.png

export interface StickerDef {
  id: string;
  label: string;
  path: string; // path ke file PNG di /public/
}

export interface PlacedSticker {
  uid: string;       // unique instance ID
  stickerId: string; // matches StickerDef.id
  x: number;         // % dari kiri (0–100)
  y: number;         // % dari atas (0–100)
  scale: number;     // 1.0 = normal
  rotation: number;  // derajat
  hueRotate: number; // derajat hue-rotate (0-360)
}

// ─── Daftar Stiker ─────────────────────────────────────────────
// Tambah stiker baru: taruh PNG di /public/stickers/, lalu daftarkan di sini.
export const STICKERS: StickerDef[] = [
  { id: 'sticker-01', label: 'Stiker 1',  path: '/stickers/sticker-01.png' },
  { id: 'sticker-02', label: 'Stiker 2',  path: '/stickers/sticker-02.png' },
  { id: 'sticker-03', label: 'Stiker 3',  path: '/stickers/sticker-03.png' },
  { id: 'sticker-04', label: 'Stiker 4',  path: '/stickers/sticker-04.png' },
  { id: 'sticker-05', label: 'Stiker 5',  path: '/stickers/sticker-05.png' },
  { id: 'sticker-06', label: 'Stiker 6',  path: '/stickers/sticker-06.png' },
  { id: 'sticker-07', label: 'Stiker 7',  path: '/stickers/sticker-07.png' },
  { id: 'sticker-08', label: 'Stiker 8',  path: '/stickers/sticker-08.png' },
  { id: 'sticker-09', label: 'Stiker 9',  path: '/stickers/sticker-09.png' },
  { id: 'sticker-10', label: 'Stiker 10', path: '/stickers/sticker-10.png' },
  { id: 'sticker-11', label: 'Stiker 11', path: '/stickers/sticker-11.png' },
  { id: 'sticker-12', label: 'Stiker 12', path: '/stickers/sticker-12.png' },
  { id: 'sticker-13', label: 'Stiker 13', path: '/stickers/sticker-13.png' },
  { id: 'sticker-14', label: 'Stiker 14', path: '/stickers/sticker-14.png' },
  { id: 'sticker-15', label: 'Stiker 15', path: '/stickers/sticker-15.png' },
  { id: 'sticker-16', label: 'Stiker 16', path: '/stickers/sticker-16.png' },
];
