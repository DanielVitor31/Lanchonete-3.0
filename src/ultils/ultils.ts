export const moneyFormatBRL = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

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

type ArrayToKeyedObjectParams<T, K extends keyof T> = {
  key: K
  obj: T[]
}

export function arrayObjToObjKey<T, K extends keyof T>({key, obj}: ArrayToKeyedObjectParams<T, K>): Record<string, T> {
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





export const extrackTitleVersion = (nameVersion: string) =>  nameVersion.replace(")", "").split(" (");

