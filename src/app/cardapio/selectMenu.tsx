"use client";

import { supabaseStorageURL, moneyFormatBRL } from "@/ultils/ultils";
import type { OrderArrayType } from "@/types/typeFood";
import { useState, useMemo, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { loadAddons, pagesNavFunc, pricesCalc, orderArrayStringFunc, orderStringFunc } from "./functions"
import AddonsElement from "./complements"
import ButtonsElement from "./buttons"
import Check from "./check";
import createOrderDB from "./createOrderDB";
import type { FoodFullMap, FoodFull, Version, ExtraIngredient, Addon, Food } from "./actions/getFoodsGrouped"
import FinishNav from "./finishNav"
import Image from "next/image";

import { selectMenuStyles as s } from "./selectMenu.styles";




type Props = {
  open: (value: null | string) => void;
  foods: FoodFullMap;
  food: FoodFull;
};


export default function SelectMenu({ open, foods, food }: Props) {
  // Variaveis apenas para facilitar a leitura
  const { versions: fV, extra_ingredients: fI, addons: fA, ...foodSimpleObj } = food // Comida simples sem versão, ingredientes extras ou complementos
  const foodVersions = [...food.versions.values()];
  const foodAddons = useMemo(() => loadAddons([...food.addons.values()], foods), [food, foods]);
  const foodExtraIgrediens = [...food.extra_ingredients.values()];


  // Verifica se o alimento possui complementos, versões ou ingredientes extras
  const hasVersion = foodVersions.length > 0;
  const hasExtraIgrediens = foodExtraIgrediens.length > 0;
  const hasAddons = foodAddons.size > 0;
  const foodSimple = !hasVersion && !hasAddons && !hasExtraIgrediens

  // Arrays do pedido
  const OrderArray: OrderArrayType = { versions: foodVersions, extraIngredients: foodExtraIgrediens, addons: foodAddons };
  const [versionChosen, setVersionChosen] = useState<Version | undefined>(foodVersions[0]);
  const [extraIngredients, setExtraIngredients] = useState(new Map<string, ExtraIngredient>())
  const [addons, setAddons] = useState(new Map<string, Addon>())


  // Configuração das páginas de navegação
  const pagesNav = pagesNavFunc(hasVersion, hasExtraIgrediens, [...foodAddons.keys()]);
  const [pageCurrentIndex, setPageCurrentIndex] = useState(0);
  const pageCurrentName = pagesNav[pageCurrentIndex];
  const pagMax = pagesNav.length;
  const optionsContainerRef = useRef<HTMLElement | null>(null);

  // Estado dos complementos escolhidos
  const complementSelect = useMemo(() => { return { versions: versionChosen, extraIngredients: extraIngredients, addons: addons } }, [versionChosen, extraIngredients, addons]);

  const [orderFinish, setOrderFinish] = useState(false);

  useEffect(() => {
    const el = optionsContainerRef.current;
    if (el) el.scrollTop = 0;
  }, [pageCurrentIndex]);


  const priceTotal = useMemo(() => {
    return pricesCalc(complementSelect, food);
  }, [complementSelect])

  const orderArrayString = orderArrayStringFunc(complementSelect, foodSimpleObj);
  const orderString = orderStringFunc(orderArrayString, priceTotal);

  const handleSelectOption = (complement: Version | Addon | ExtraIngredient, qty?: number) => {
    //Seta a nova versão
    if ("id_food_version" in complement && !("id_foods_addon" in complement)) return setVersionChosen(complement)
    // alterar a quantidade dos ingredientes extras
    if ("id_extra_ingredient" in complement) {
      setExtraIngredients(prev => {
        const map = new Map(prev);
        const key = complement.id_extra_ingredient;

        map.set(key, {
          ...(map.get(key) ?? complement),
          qty_chosen: qty!,
        });

        return map;
      });
    }
    //Setar addon
    if ("id_foods_addon" in complement) {
      setAddons((prev) => {
        const map = new Map(prev)
        map.set(complement.name_category, (complement as Addon))
        return map
      })
    }
  };

  const handleOrderFinish = async () => {
    await createOrderDB({ food: foodSimpleObj, total_price: priceTotal, orderString: orderString, orderReady: complementSelect });
    setOrderFinish(true);
  }


  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <div className={s.grid}>
          {/* Cabeçalho */}
          <header className={s.header}>
            <h2 className={s.title}>
              {food.name}
            </h2>

            <button
              className={s.closeBtn}
              onClick={() => open(null)}
              type="button"
            >
              <X size={25} />
            </button>
          </header>

          {/* Imagem principal */}
          <div className={s.imageFoodContainer}>
            <Image
              src={supabaseStorageURL(food.img)}
              alt={food.name}
              width={520}
              height={520}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 420px, 520px"
              className={s.imageFood}
              loading="lazy"
            />
          </div>


          {/* Descrição */}
          <div className={s.descriptionContainer}>
            <p className={s.description}>
              {food.description}
            </p>
          </div>

          {/* Opções (versões / addons) */}
          <section ref={optionsContainerRef} className={s.optionsContainer}>
            {pageCurrentName !== "orderEnd" ? (
              <>
                {pageCurrentName === "versions" && (
                  <AddonsElement
                    handleSelectOption={handleSelectOption}
                    complements={OrderArray.versions}
                    getNameComplement={"Versões"}
                    getId={(y) => y.id_food_version}
                    getName={(y) => `${y.name_food} (${y.name})`}
                    getPrice={(y) => y.price}
                    getSelect={(y) => y.id_food_version === complementSelect.versions?.id_food_version}
                    pageCurrentIndex={pageCurrentIndex}
                    pagMax={pagMax}
                  />
                )}
                {pageCurrentName === "extraIgrediens" && (
                  <AddonsElement
                    handleSelectOption={handleSelectOption}
                    complements={OrderArray.extraIngredients}
                    getNameComplement={"Ingredientes Extras"}
                    getId={(y) => y.id_extra_ingredient}
                    getName={(y) => y.name}
                    getImg={(y) => y.img}
                    getPrice={(y) => y.price}
                    getQty={(y) => complementSelect.extraIngredients.get(y.id_extra_ingredient)?.qty_chosen ?? 0}
                    getMax={(y) => y.qty_max}
                    pageCurrentIndex={pageCurrentIndex}
                    pagMax={pagMax}
                  />
                )}
                {pageCurrentName !== "extraIgrediens" && pageCurrentName !== "versions" && (
                  <AddonsElement
                    handleSelectOption={handleSelectOption}
                    complements={OrderArray.addons.get(pageCurrentName)!}
                    getNameComplement={pageCurrentName}
                    getId={(y) => y.id_foods_addon}
                    getName={(y) => y.name}
                    getImg={(y) => y.img}
                    getPrice={(y) => y.price}
                    getSelect={(y) => y.id_foods_addon === complementSelect.addons.get(pageCurrentName)?.id_foods_addon}
                    pageCurrentIndex={pageCurrentIndex}
                    pagMax={pagMax}
                  />
                )}
              </>
            )
              : (
                <>
                  {foodSimple ? (
                    <p className={s.emptyText}>
                      Esse item não possui versões ou complementos.
                    </p>
                  ) : (
                    <Check data={orderArrayString} />
                  )}
                </>
              )
            }

          </section>


          {/* Footer */}
          <footer className={s.footer}>
            <div className={s.totalBox}>
              <span className={s.totalLabel}>
                Valor Total
              </span>
              <span className={s.totalValue}>
                {moneyFormatBRL(priceTotal)}
              </span>
            </div>

            <div className={s.buttonsWrap}>
              <ButtonsElement handleOrderFinish={handleOrderFinish} setPageCurrentIndex={setPageCurrentIndex} pageCurrentName={pageCurrentName} pageCurrentIndex={pageCurrentIndex} complementSelect={complementSelect} />
            </div>
          </footer>
        </div>
      </div>
      {orderFinish && (
        <div className={s.finishOverlay}>
          <FinishNav open={open} />
        </div>
      )}
    </div>
  );
}
