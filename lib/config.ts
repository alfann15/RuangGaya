// ═══ RuangGaya — Central Configuration ═══

export const TEMPLATES = [
  {
    id: '2x1',
    label: '2×1 Strip',
    slots: 2,
    cols: 1,
    previewImg: '/templates/tmpl-2x1.jpg',
  },
  {
    id: '3x1',
    label: '3×1 Strip',
    slots: 3,
    cols: 1,
    previewImg: '/templates/tmpl-3x1.jpg',
  },
  {
    id: '4x1',
    label: '4×1 Strip',
    slots: 4,
    cols: 1,
    previewImg: '/templates/tmpl-4x1.jpg',
  },
  {
    id: '2x2',
    label: '2×2 Grid',
    slots: 4,
    cols: 2,
    previewImg: '/templates/tmpl-2x2.jpg',
  },
  {
    id: '2x3',
    label: '2×3 Grid',
    slots: 6,
    cols: 2,
    previewImg: '/templates/tmpl-2x3.jpg',
  },
] as const;

export type Template = (typeof TEMPLATES)[number];

export const FRAMES = [
  { id: 'none', name: 'No Frame', path: null },
  { id: 'floral', name: 'Floral Pink', path: '/frames/frame-floral.png' },
  { id: 'kawaii', name: 'Kawaii Stars', path: '/frames/frame-kawaii.png' },
  { id: 'simple', name: 'Simple', path: '/frames/frame-simple.png' },
  { id: 'retro', name: 'Retro', path: '/frames/frame-retro.png' },
] as const;

export type Frame = (typeof FRAMES)[number];

export const FILTERS = ['Normal', 'B&W', 'Vintage', 'Vivid', 'Pastel', 'Warm'] as const;
export type FilterType = (typeof FILTERS)[number];

/** Map filter name → CSS filter string for <video> element */
export const FILTER_CSS: Record<FilterType, string> = {
  Normal: 'none',
  'B&W': 'grayscale(100%)',
  Vintage: 'sepia(60%) contrast(90%) brightness(90%)',
  Vivid: 'saturate(180%) contrast(110%)',
  Pastel: 'saturate(60%) brightness(110%)',
  Warm: 'sepia(30%) saturate(140%) brightness(105%)',
};

export const TIMER_OPTIONS = [3, 5, 10] as const;
export type TimerOption = (typeof TIMER_OPTIONS)[number];
