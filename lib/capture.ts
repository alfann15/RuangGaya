import { FilterType, FILTER_CSS, Frame, TemplateId, getOverlayPath } from './config';
import { PlacedSticker, STICKERS } from './stickers';

/**
 * Capture raw frame (no filter) — mirrored horizontally.
 * Filter applied later at export time.
 */
export function captureRawFrame(
  video: HTMLVideoElement,
  width = 1200, // Higher resolution for crisper output
  height = 900  // 4:3 ratio matches our slots
): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Calculate crop to center the video (like object-fit: cover)
  // Webcam is usually 16:9 (e.g., 1280x720), canvas is 4:3
  const videoRatio = video.videoWidth / video.videoHeight;
  const canvasRatio = width / height;

  let sx = 0, sy = 0, sw = video.videoWidth, sh = video.videoHeight;

  if (videoRatio > canvasRatio) {
    // Video is wider than canvas — crop horizontally
    sw = video.videoHeight * canvasRatio;
    sx = (video.videoWidth - sw) / 2;
  } else {
    // Video is taller than canvas — crop vertically
    sh = video.videoWidth / canvasRatio;
    sy = (video.videoHeight - sh) / 2;
  }

  // Mirror horizontally
  ctx.translate(width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, width, height);

  return canvas.toDataURL('image/jpeg', 0.95);
}

interface BuildStripOptions {
  slots: (string | null)[];
  cols: number;
  /** Template ID — used to resolve per-template overlayPath */
  templateId: TemplateId;
  frame: Frame;
  slotW?: number;
  slotH?: number;
  gap?: number;
  padding?: number;
  stripText?: string;
  filter?: FilterType;
  placedStickers?: PlacedSticker[];
}

/**
 * Compose the final photo strip canvas.
 * Layer order (bottom → top):
 *   1. Frame background color (always painted first as fallback)
 *   2. Background image (bgImage), if set — covers full strip area
 *   3. Photos in grid with optional CSS filter
 *   4. Overlay PNG (overlayPath), if set — covers photos area, transparent cutouts show through
 *   5. Stickers (draggable decorations)
 *   6. Strip text footer
 */
export async function buildStripCanvas({
  slots,
  cols,
  templateId,
  frame,
  slotW = 400,
  slotH = 300,
  gap = 14,
  padding = 24,
  stripText = '',
  filter = 'Normal',
  placedStickers = [],
}: BuildStripOptions): Promise<HTMLCanvasElement> {
  const rows = Math.ceil(slots.length / cols);
  const footerH = stripText.trim() ? 56 : 0;
  const totalW = padding * 2 + cols * slotW + (cols - 1) * gap;
  const photoAreaH = padding * 2 + rows * slotH + (rows - 1) * gap;
  const totalH = photoAreaH + footerH;

  const canvas = document.createElement('canvas');
  canvas.width = totalW;
  canvas.height = totalH;
  const ctx = canvas.getContext('2d')!;

  // ── 1. Frame background color (fallback, always rendered) ───────
  ctx.fillStyle = frame.bgColor;
  ctx.fillRect(0, 0, totalW, totalH);

  // ── 2. Background image (wallpaper behind photos) ───────────────
  if (frame.bgImage) {
    try {
      const bgImg = await loadImage(frame.bgImage);
      // Cover: maintain aspect ratio, crop to fill
      const imgRatio = bgImg.width / bgImg.height;
      const canvasRatio = totalW / totalH;
      let sx = 0, sy = 0, sw = bgImg.width, sh = bgImg.height;
      if (imgRatio > canvasRatio) {
        sw = bgImg.height * canvasRatio;
        sx = (bgImg.width - sw) / 2;
      } else {
        sh = bgImg.width / canvasRatio;
        sy = (bgImg.height - sh) / 2;
      }
      ctx.drawImage(bgImg, sx, sy, sw, sh, 0, 0, totalW, totalH);
    } catch {
      // bgImage load failed — bgColor fallback already painted
    }
  }

  // ── 3. Photos in slots ──────────────────────────────────────────
  const cssFilter = FILTER_CSS[filter];
  for (let i = 0; i < slots.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = padding + col * (slotW + gap);
    const y = padding + row * (slotH + gap);

    // Slot border (thin outline around each photo)
    ctx.fillStyle = frame.borderColor;
    ctx.fillRect(x - 2, y - 2, slotW + 4, slotH + 4);

    if (slots[i]) {
      const img = await loadImage(slots[i]!);
      if (cssFilter !== 'none') ctx.filter = cssFilter;
      ctx.drawImage(img, x, y, slotW, slotH);
      ctx.filter = 'none';
    } else {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(x, y, slotW, slotH);
    }
  }

  // ── 4. Overlay PNG (Photoshop transparent overlay on top of photos)
  const resolvedOverlay = getOverlayPath(frame.overlayPath, templateId);
  if (resolvedOverlay) {
    try {
      const overlayImg = await loadImage(resolvedOverlay);
      // Render overlay to fill exactly the photo area (not the footer)
      ctx.drawImage(overlayImg, 0, 0, totalW, photoAreaH);
    } catch {
      // overlay load failed — skip silently
    }
  }

  // ── 5. Stickers ─────────────────────────────────────────────────
  for (const ps of placedStickers) {
    const def = STICKERS.find((s) => s.id === ps.stickerId);
    if (!def) continue;
    const stickerSize = Math.min(totalW, photoAreaH) * 0.15 * ps.scale;
    const px = (ps.x / 100) * totalW;
    const py = (ps.y / 100) * photoAreaH;
    try {
      const sImg = await loadImage(def.path);
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate((ps.rotation * Math.PI) / 180);
      if (ps.hueRotate && ps.hueRotate > 0) {
        ctx.filter = `brightness(0) saturate(100%) invert(50%) sepia(100%) saturate(500%) hue-rotate(${ps.hueRotate}deg)`;
      }
      ctx.drawImage(sImg, -stickerSize / 2, -stickerSize / 2, stickerSize, stickerSize);
      ctx.filter = 'none';
      ctx.restore();
    } catch { /* skip sticker */ }
  }

  // ── 6. Strip text footer ────────────────────────────────────────
  if (stripText.trim()) {
    const fy = photoAreaH;
    const isDark = isColorDark(frame.bgColor);
    ctx.fillStyle = isDark ? '#ffffff' : frame.borderColor;
    ctx.font = `bold 22px "Nunito", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(stripText, totalW / 2, fy + footerH / 2);
  }

  return canvas;
}

/** Simple luminance-based dark color check */
function isColorDark(hex: string): boolean {
  const c = hex.replace('#', '');
  if (c.length < 6) return false;
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}
