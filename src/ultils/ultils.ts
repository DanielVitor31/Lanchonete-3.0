export const moneyFormatBRL = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export const supabaseStorageURL = (pasta: string, arquivo: string) => 
  `https://tcbwhkdbktgzelgtyzgv.supabase.co/storage/v1/object/public/image/${pasta}/${arquivo}`;



export function colect_colors(list: string[]) {
  const styles = getComputedStyle(document.documentElement);
  const result: { [key: string]: string } = {};

  for (const v of list) {
    result[v] = styles.getPropertyValue(v).trim();
  }

  return result;
}


export function calcHours(dateStr: string | null , horas: number): boolean {
  if (!dateStr) return false; 

  const time = new Date(dateStr).getTime();

  
  if (isNaN(time)) return false;

  return Date.now() - time >= horas * 60 * 60 * 1000;
}



type CssVarItem = {
  name: string;
  value: string;
};

export function applyCssVars(items: CssVarItem[]) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  items.forEach(({ name, value }) => {
    root.style.setProperty(name, value);
  });
}
