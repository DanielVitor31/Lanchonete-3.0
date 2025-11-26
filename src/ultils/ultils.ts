export const moneyFormatBRL = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export const supabaseStorageURL = (pasta: string, arquivo: string) => 
  `https://tcbwhkdbktgzelgtyzgv.supabase.co/storage/v1/object/public/image/${pasta}/${arquivo}`;