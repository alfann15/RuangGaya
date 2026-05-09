import { FilterType, FILTER_CSS } from './config';

/**
 * Capture a single frame from a video element onto a canvas,
 * applying the selected CSS filter via canvas CanvasRenderingContext2D filter.
 * Returns a JPEG dataURL.
 */
export function captureFrame(
  video: HTMLVideoElement,
  filter: FilterType,
  width = 640,
  height = 480
): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Mirror horizontally (same as live viewfinder)
  ctx.translate(width, 0);
  ctx.scale(-1, 1);

  // Apply CSS filter via canvas filter API
  const cssFilter = FILTER_CSS[filter];
  if (cssFilter !== 'none') {
    ctx.filter = cssFilter;
  }

  ctx.drawImage(video, 0, 0, width, height);
  return canvas.toDataURL('image/jpeg', 0.92);
}

interface BuildStripOptions {
  slots: (string | null)[];
  cols: number;
  slotW?: number;
  slotH?: number;
  gap?: number;
  padding?: number;
  framePath: string | null;
  stripText?: string;
  bgColor?: string;
}

/**
 * Compose the final photobooth strip canvas from all captured slot images.
 * Returns a Promise<HTMLCanvasElement>.
 */
export async function buildStripCanvas({
  slots,
  cols,
  slotW = 400,
  slotH = 300,
  gap = 12,
  padding = 20,
  framePath,
  stripText = '',
  bgColor = '#FFF0F5',
}: BuildStripOptions): Promise<HTMLCanvasElement> {
  const rows = Math.ceil(slots.length / cols);
  const footerH = stripText ? 52 : 0;

  const totalW = padding * 2 + cols * slotW + (cols - 1) * gap;
  const totalH = padding * 2 + rows * slotH + (rows - 1) * gap + footerH;

  const canvas = document.createElement('canvas');
  canvas.width = totalW;
  canvas.height = totalH;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, totalW, totalH);

  // Draw each slot image
  for (let i = 0; i < slots.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = padding + col * (slotW + gap);
    const y = padding + row * (slotH + gap);

    if (slots[i]) {
      const img = await loadImage(slots[i]!);
      ctx.drawImage(img, x, y, slotW, slotH);
    } else {
      // Empty slot placeholder
      ctx.fillStyle = '#F4C0D1';
      ctx.fillRect(x, y, slotW, slotH);
      ctx.fillStyle = '#C06080';
      ctx.font = '20px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('📷', x + slotW / 2, y + slotH / 2 + 8);
    }
  }

  // Overlay frame PNG
  if (framePath) {
    try {
      const frameImg = await loadImage(framePath);
      ctx.drawImage(frameImg, 0, 0, totalW, totalH - footerH);
    } catch {
      // Frame load failed — skip
    }
  }

  // Strip text footer
  if (stripText) {
    const fy = totalH - footerH;
    ctx.fillStyle = '#D4537E';
    ctx.fillRect(0, fy, totalW, footerH);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 22px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(stripText, totalW / 2, fy + footerH / 2);
  }

  return canvas;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
