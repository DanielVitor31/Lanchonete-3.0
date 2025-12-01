import { formatHex8, oklch, formatCss, parse } from "culori";

type TypeCorData = {
  keyColorData: string;
  calc: number[];
  isHex?: boolean;
};

// regex fora da função pra não recriar toda chamada
const OKLCH_REGEX =
  /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/i;

export function culoriCalc(keyColorData: string,calc: number[],isHex = false): string {

  const match = keyColorData.trim().match(OKLCH_REGEX);
  if (!match) return ""; // mesmo comportamento "falha silenciosa" se não bater

  // captura direta
  let [, lStr, cStr, hStr, alphaStr] = match;

  const baseL = Number(lStr);
  const baseC = Number(cStr);
  const baseH = Number(hStr);
  const baseA = alphaStr !== undefined ? Number(alphaStr) : 1;

  // offsets (se não tiver índice, considera 0)
  const dL = calc[0] ?? 0;
  const dC = calc[1] ?? 0;
  const dH = calc[2] ?? 0;
  const dA = calc[3] ?? 0;

  const newColor = oklch({
    mode: "oklch",
    l: baseL + dL,
    c: baseC + dC,
    h: baseH + dH,
    alpha: baseA + dA,
  });

  if (isHex) {
    return formatHex8(newColor); // ex: "#ffaaeecc"
  }

  // força retorno com alpha sempre visível
  const lFix = newColor.l.toFixed(2);
  const cFix = newColor.c.toFixed(2);
  const hFix = (newColor.h ?? 0).toFixed(2);
  const aFix = (newColor.alpha ?? 1).toFixed(2);

  return `oklch(${lFix} ${cFix} ${hFix} / ${aFix})`;
}


/**
 * Converte qualquer cor CSS compatível (rgb, rgba, lab, oklab, oklch,
 * color(display-p3), etc) para OKLCH.
 *
 * Se não for possível converter, retorna null.
 */
export function normalizeToOklch(input: string): string | null {
  if (!input) return null;

  const trimmed = input.trim();

  try {
    const parsed = parse(trimmed);

    if (!parsed) {
      return null; // não é cor válida
    }

    // Na sua versão, o formato certo é:
    // formatCss(color)
    const asOklch = formatCss(oklch(parsed));

    // pode vir null se algo der ruim
    return asOklch ?? null;
  } catch {
    return null;
  }

}