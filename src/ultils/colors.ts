import { formatHex8, oklch, parse } from "culori";



export function hexToOklch(hex: string): string {
  if (!hex) return ''; // evita erro com undefined/null

  const parsed = parse(hex);
  if (!parsed) throw new Error('Cor inválida');

  const oklchColor = oklch(parsed);
  if (!oklchColor || oklchColor.l == null || oklchColor.c == null)
    throw new Error('Conversão para OKLCH falhou');

  let { l, c, h, alpha = 1 } = oklchColor;

  // Força h para 0 caso seja undefined e c seja muito pequeno (neutros)
  if (typeof h !== 'number' || isNaN(h)) h = 0;

  const round = (n: number) => Math.round(n * 100) / 100;
  const format = (n: number) => round(n).toFixed(2); // 2 casas

  return `oklch(${format(l)} ${format(c)} ${format(h)} / ${format(alpha)})`;
}



export function oklchToHex(corOklch: string): string {
  if (!corOklch) return '';

  const regex = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/i;
  const match = corOklch.trim().match(regex);

  if (!match) throw new Error('Formato inválido de OKLCH');

  let [, l, c, h, alpha] = match;

  const color = {
    mode: 'oklch',
    l: Math.min(1, Math.max(0, parseFloat(l))),
    c: parseFloat(c),
    h: parseFloat(h),
    alpha: alpha !== undefined ? Math.min(1, Math.max(0, parseFloat(alpha))) : 1,
  } as const;

  return formatHex8(color);
}



type TypeCorData = {
  keyColorData: string;
  calc: number[];
  isHex?: boolean;
};

export function culoriCalc({ keyColorData, calc, isHex = false }: TypeCorData): string {


  const keyColor = keyColorData.match(/oklch\(([^)]+)\)/)?.[1].split(/[\s\/]+/);
  if (!keyColor) return '';

  const corBaseData = keyColor.map(Number);
  const [l, c, h, alpha = 1] = corBaseData;

  const corBase = oklch({ l, c, h, alpha, mode: "oklch" });

  const newColor = oklch({
    l: corBase.l + calc[0],
    c: corBase.c + calc[1],
    h: (corBase.h ?? 0) + calc[2],
    alpha: calc.length === 4 ? (corBase.alpha ?? 1) + calc[3] : (corBase.alpha ?? 1),
    mode: "oklch"
  });

  if (isHex) {
    return formatHex8(newColor); // ex: "#ffaaeecc"
  }

  // 👉 Força retorno com alpha SEMPRE visível, mesmo que seja 1
  const lFix = newColor.l.toFixed(2);
  const cFix = newColor.c.toFixed(2);
  const hFix = (newColor.h ?? 0).toFixed(2);
  const aFix = newColor.alpha?.toFixed(2) ?? "1.0";

  return `oklch(${lFix} ${cFix} ${hFix} / ${aFix})`;
}