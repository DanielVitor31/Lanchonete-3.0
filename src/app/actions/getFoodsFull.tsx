import { prisma } from "@/lib/prisma";
import type { Prisma, foods_full } from "@prisma/client";
import type {
  FoodFull,
  FoodVersion,
  FoodAddonCategory,
} from "@/types/type";

function parseJsonArray<T>(value: Prisma.JsonValue | null | undefined): T[] {
  if (!value) return [];
  if (!Array.isArray(value)) return [];
  return value as unknown as T[];
}

export async function getFoodsFull(): Promise<FoodFull[]> {
  const rows: foods_full[] = await prisma.foods_full.findMany();

  const result: FoodFull[] = rows
    // garante pra TS que id_food e name não são null
    .filter(
      (row): row is foods_full & {
        id_food: string;
        name: string;
        xid_categorie: string;
      } => !!row.id_food && !!row.name && !!row.xid_categorie
    )
    .map((row) => {
      const versions = parseJsonArray<FoodVersion>(row.versions);
      const addons = parseJsonArray<FoodAddonCategory>(row.addons);

      return {
        id: row.id_food,                    // agora TS sabe que é string
        name: row.name,
        description: row.description ?? null,
        img: row.img ?? "logos/logo",       // default se vier null
        id_categorie: row.xid_categorie,
        price: Number(row.price ?? 0),      // Decimal | null -> number
        promotion: row.promotion
          ? row.promotion.toString()        // Decimal -> string
          : null,
        stock: row.stock ?? true,           // se vier null, assume true
        sale: row.sale ?? true,
        versions,
        addons,
      };
    });

  return result;
}
