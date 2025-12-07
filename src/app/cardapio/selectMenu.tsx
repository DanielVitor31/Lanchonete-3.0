import { supabaseStorageURL, moneyFormatBRL } from "@/ultils/ultils";
import type {
  FoodVersion,
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
  foods_categories_obj: { [key: string]: string };
};

type Option = FoodWithVersionsMap | FoodVersion;


export default function SelectMenu({ open, foods, food, foods_categories_obj }: Props) {
  const foodVersions = Object.values(foods[food.id_categorie][food.id].versions)
  const foodAddons = foods[food.id_categorie][food.id].addons
  const foodOptions: Option[][] = [foodVersions];

  if (foodAddons) {
    foodAddons.forEach((addon) => {
      const categoryArray: Option[] = addon.items.map((addonItem) => {
        const foodBase = foods[addon.category_id][addonItem.id_food];
        const foodVersion = addonItem.id_food_version
          ? foodBase.versions[addonItem.id_food_version]
          : foodBase;

        return addonItem.free ? { ...foodVersion, price: 0 } : foodVersion;
      });

      foodOptions.push(categoryArray);
    });
  }

  const hasVersion = foodVersions.length > 0
  const initialPrice = hasVersion ? foodVersions[0].price : food.price
  const pagsMin = hasVersion ? 0 : 1
  const pagsMax = foodOptions.length - 1
  const [optionsNumber, setOptionsNumber] = useState<number>(pagsMin);
  const [price, setPrices] = useState<number[]>([initialPrice]);
  const priceTotal = price.reduce((total, value) => total + value, 0);
  const [optionsSelect, setOptionsSelect] = useState<{ [key: number]: number }>({ 0: 0 });




  // console.log("versão1", foodVersions)
  console.log("addons2", foods)
  //console.log("addons3", foodOptions)
  //console.log("addons4", optionsSelect)
  //console.log("addons5", optionsNumber)
  //console.log("addons6", foods_categories_obj[foodOptions[optionsNumber][0].id_categorie])
  //console.log("addons7",foodOptions[optionsNumber][0].id_categorie)
  //console.log("addons8", foods_categories_obj[foodOptions[optionsNumber][0].id_categorie])

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
          <div className="h-full bg-green-300 overflow-y-auto">
            <p>{optionsNumber === 0 ? "Versão" : foods_categories_obj[foodOptions[optionsNumber][0].id_categorie]}</p>

            {foodOptions[optionsNumber].map((option, indice) => {
              const _optionSelect = optionsSelect[optionsNumber] === indice
              return (
                <div
                  key={option.id}
                  className="flex px-4 items-center justify-between bg-yellow-400"
                  onClick={() => {
                    setOptionsSelect((prev) => ({ ...prev, [optionsNumber]: indice }));
                    setPrices((prev) => {
                      const clone = [...prev];
                      clone[optionsNumber] = option.price;
                      return clone;
                    });
                  }}
                >

                  <div

                  >
                    <p>{option.name}</p>
                    <p>{moneyFormatBRL(option.price)}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full bg-blue-500${!!_optionSelect ? "" : "/70"}`}></div>

                </div>
              )
            })}
          </div>


          {/* footer */}
          <div className="h-full flex">
            <p className="text-sm md:text-base font-bold bg-red-300">
              {moneyFormatBRL(priceTotal)}
            </p>
            <div>
              <button
               type="button"
                onClick={() => setOptionsNumber(optionsNumber - 1)}
                className={buttonClasses}
                disabled={pagsMin === optionsNumber}
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => setOptionsNumber(optionsNumber + 1)}
                className={`${buttonClasses}`}
                disabled={pagsMax === optionsNumber || !(optionsNumber in optionsSelect)}
              >
                Proximo
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
