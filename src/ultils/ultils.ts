export const moneyFormatBRL = (value: number) =>
  value
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
    .normalize("NFKC")
    .replace(/\s+/g, ' ');


export const supabaseStorageURL = (arquivo: string) =>
  `https://tcbwhkdbktgzelgtyzgv.supabase.co/storage/v1/object/public/image/${arquivo}.webp`;



export function colect_colors(list: string[]) {
  const styles = getComputedStyle(document.documentElement);
  const result: { [key: string]: string } = {};

  for (const v of list) {
    result[v] = styles.getPropertyValue(v).trim();
  }

  return result;
}


export function calcHours(dateStr: string | null, horas: number): boolean {
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

type ArrayToKeyedObjectParams<T, K extends keyof T> = {
  key: K
  obj: T[]
}

export function arrayObjToObjKey<T, K extends keyof T>({ key, obj }: ArrayToKeyedObjectParams<T, K>): Record<string, T> {
  return obj.reduce((acc, item) => {

    const index = String(item[key])
    acc[index] = item

    return acc
  }, {} as Record<string, T>)
}


type invertObject<T extends Record<PropertyKey, PropertyKey>> = {
  [K in keyof T as T[K]]: K
};

export function invertObject<T extends Record<PropertyKey, PropertyKey>>(obj: T): invertObject<T> {
  return (Object.keys(obj) as Array<keyof T>).reduce((acc, key) => {
    const value = obj[key];
    (acc as Record<PropertyKey, PropertyKey>)[value] = key;
    return acc;
  }, {} as invertObject<T>);
}


export function arrayToMap<T, K extends string | number>(
  rows: T[],
  getKey: (row: T) => K
): Map<string, T> {
  const m = new Map<string, T>();
  for (const row of rows) m.set(String(getKey(row)), row);
  return m;
}



function isPlainObject(v: any): v is Record<string, any> {
  if (!v || typeof v !== "object") return false;
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === null;
}

function isEntriesArray(v: any): v is [any, any][] {
  return (
    Array.isArray(v) &&
    (v.length === 0 || (Array.isArray(v[0]) && v[0].length === 2))
  );
}

// =====================
// Runtime: Map -> DTO
// =====================
export function deepMapToDTO<T>(value: T): any {
  if (value instanceof Map) {
    return Array.from(value.entries()).map(([k, v]) => [k, deepMapToDTO(v)]);
  }

  if (Array.isArray(value)) {
    return value.map(deepMapToDTO);
  }

  if (isPlainObject(value)) {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(value)) out[k] = deepMapToDTO(v);
    return out;
  }

  return value;
}

// =====================
// Runtime: DTO -> Map
// =====================
export function deepDTOToMap<T>(value: T): any {
  if (isEntriesArray(value)) {
    return new Map(value.map(([k, v]) => [k, deepDTOToMap(v)]));
  }

  if (Array.isArray(value)) {
    return value.map(deepDTOToMap);
  }

  if (isPlainObject(value)) {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(value)) out[k] = deepDTOToMap(v);
    return out;
  }

  return value;
}



