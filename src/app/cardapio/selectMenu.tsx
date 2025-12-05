import { supabaseStorageURL, moneyFormatBRL } from "@/ultils/ultils";
import type {
  FoodFull,
  FoodVersion,
  FoodAddonCategory,
  FoodsFullResult,
  FoodsGrouped,
  FoodWithVersionsMap,
} from "@/types/type";

type Props = {
  open: (value: null) => void;
  foods: FoodsGrouped;
  food: FoodWithVersionsMap;
};


export default function SelectMenu({ open, foods, food }: Props) {
  const foodVersionsOBJ = foods[food.id_categorie][food.id].versions
  const foodVersions = !!foodVersionsOBJ ? Object.values(foodVersionsOBJ) : null

  return (
    <div
      className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/60
            backdrop-blur-sm
          "
    >
      <div
        className="
              w-80 max-w-[90%]
              rounded-2xl
              bg-zinc-900
              border border-zinc-700
              p-4
              shadow-xl
            "
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Mini menu</h2>
          <button
            className="text-zinc-400 hover:text-zinc-200 text-sm"
            onClick={() => open(null)}
          >
            fechar
          </button>
        </div>

        <div className="
              grid grid-rows-[1fr_1fr_1fr]
              items-center
              gap-6
            ">
          <div
            className="
                    w-24 h-24
                    md:w-28 md:h-28
                    bg-zinc-800
                    bg-cover bg-center
                    mb-1
                    mx-auto
                  "
            style={{ backgroundImage: `url("${supabaseStorageURL(food.img)}")` }}
          />

          <p className="w-full text-center text-base md:text-lg font-semibold">
            {food.name}
          </p>

          <p
            className="
                      w-full text-center
                      text-xs md:text-sm
                      text-zinc-300
                      line-clamp-2
                    "
          >
            {food.description}
          </p>

          <p className="w-full text-center text-sm md:text-base font-bold mt-1">
            {moneyFormatBRL(food.price)}
          </p>

        </div>
      </div>
    </div>
  );
}
