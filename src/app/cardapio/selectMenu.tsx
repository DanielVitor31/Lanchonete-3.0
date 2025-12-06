import { supabaseStorageURL, moneyFormatBRL } from "@/ultils/ultils";
import type {
  FoodFull,
  FoodVersion,
  FoodAddonCategory,
  FoodsFullResult,
  FoodsGrouped,
  FoodWithVersionsMap,
} from "@/types/type";
import { useState } from "react";
import { X } from "lucide-react";
import { buttonClasses } from "@/styles/preset"

type Props = {
  open: (value: null) => void;
  foods: FoodsGrouped;
  food: FoodWithVersionsMap;
  foods_categories_obj: {[key: string]: string};
};

type Option = FoodWithVersionsMap | FoodVersion;


export default function SelectMenu({ open, foods, food, foods_categories_obj }: Props) {
  const foodVersionsOBJ = foods[food.id_categorie][food.id].versions
  const foodVersions = !!foodVersionsOBJ ? Object.values(foodVersionsOBJ) : []
  const foodAddons = foods[food.id_categorie][food.id].addons
  const foodOptions: Option[][] = [foodVersions];
  const [optionsNumber, setOptionsNumber] = useState<number>(foodVersions.length > 0 ? 0 : 1);

  if (!!foodAddons) {
    foodAddons.map((addon) => {
      const _categorieArray: Option[] = [];
      addon.items.map((addonItem) => {
        const _food = foods[addon.category_id][addonItem.id_food]
        const _foodVersion = !!addonItem.id_food_version ? _food.versions[addonItem.id_food_version] : _food
        const _foodprice = addonItem.free === true ? { ..._foodVersion, price: 0 } : _foodVersion
        _categorieArray.push(_foodprice)
      })
      foodOptions.push(_categorieArray);
    })
  }
  const pagsMax = foodOptions.length -1




  // console.log("versão1", foodVersions)
  // console.log("addons2", foodOptions)
  // console.log("addons3", foodOptions)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[55vh] h-[78vh] rounded-2xl bg-zinc-900 border border-zinc-700 p-4 shadow-xl">
        <div className="h-full grid grid-rows-[0.4fr_5fr_2fr_5fr_1fr] items-center gap-2 overflow-hidden ">

          {/* Cabeçalho */}
          <div className="flex items-center justify-between bg-blue-900">
            <h2 className="text-lg font-semibold">
              Mini menu
            </h2>
            <button
              className="cursor-pointer select-none text-zinc-400 hover:text-zinc-200 text-sm"
              onClick={() => open(null)}
            >
              <X size={28} />
            </button>
          </div>

          {/* IMAGEM */}
          <div
            className="w-50 h-60 bg-cover bg-center mb-1 mx-auto bg-orange-300"
            style={{ backgroundImage: `url("${supabaseStorageURL(food.img)}")` }}
          />

          {/* Descrição */}
          <p
            className="w-full h-full text-center text-xs md:text-sm text-zinc-300 line-clamp-2 bg-purple-400">
            {food.description}
          </p>

          {/* Addons */}
          <div className="h-full bg-green-300">
            {foodOptions[optionsNumber].map((option) => (
              <div key={option.id}>
                <p>{optionsNumber === 0 ? "Versão" : foods_categories_obj[option.id_categorie]}</p>
                <div>
                  <p>{option.name}</p>
                  <p>{option.price}</p>
                </div>
              </div>
            ))};
          </div>


          {/* footer */}
          <div className="h-full">
            <p className="text-sm md:text-base font-bold bg-red-300">
              {moneyFormatBRL(food.price)}
            </p>
            <button
            onClick={() => setOptionsNumber(optionsNumber + 1)}
            className={buttonClasses}
            disabled={pagsMax === optionsNumber }
            >
              Proximo
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
