/**
 * Conversão de cor sem dependência: OKLCH → sRGB → luminância WCAG.
 * Usado pelo auditor para medir contraste nos dois temas.
 */

export interface Rgb {
  r: number;
  g: number;
  b: number;
  /** 0–1 */
  a: number;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** oklch(L C H / A) → sRGB 0–1 com gama aplicada. */
export function oklchToRgb(L: number, C: number, hDeg: number, alpha = 1): Rgb {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  const lin = {
    r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  };

  const gamma = (c: number) => {
    const v = clamp01(c);
    return v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055;
  };

  return { r: gamma(lin.r), g: gamma(lin.g), b: gamma(lin.b), a: alpha };
}

/** Compõe uma cor com alfa sobre um fundo opaco. */
export function over(fg: Rgb, bg: Rgb): Rgb {
  return {
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  };
}

/** Mistura em oklab, como o color-mix(in oklab, …) do CSS. */
export function mixOklab(aL: number[], bL: number[], pct: number): number[] {
  const t = pct / 100;
  return aL.map((v, i) => v * t + (bL[i] ?? 0) * (1 - t));
}

function relativeLuminance({ r, g, b }: Rgb): number {
  const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** Contraste WCAG 2.1 entre duas cores opacas. 1–21. */
export function contrast(a: Rgb, b: Rgb): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** `oklch(0.52 0.18 27 / 0.4)` → componentes. Devolve null se não casar. */
export function parseOklch(value: string): { L: number; C: number; H: number; a: number } | null {
  const m = value
    .trim()
    .match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+)\s*)?\)$/);
  if (!m) return null;
  return { L: Number(m[1]), C: Number(m[2]), H: Number(m[3]), a: m[4] === undefined ? 1 : Number(m[4]) };
}

/** `#1a2b3c` ou `#abc` → sRGB 0–1. Devolve null se não casar. */
export function parseHex(value: string): Rgb | null {
  const m = value.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  const h = m[1]!;
  const full = h.length === 3 ? h.split("").map((ch) => ch + ch).join("") : h;
  return {
    r: parseInt(full.slice(0, 2), 16) / 255,
    g: parseInt(full.slice(2, 4), 16) / 255,
    b: parseInt(full.slice(4, 6), 16) / 255,
    a: 1,
  };
}
