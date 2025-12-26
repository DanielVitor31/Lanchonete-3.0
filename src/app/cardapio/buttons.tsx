"use client";

import type { OrderArrayChosenType } from "@/types/typeFood";
import { buttonClasses } from "@/styles/preset";


type Props = {
    setPageCurrentIndex: (valor: number) => void;
    // handleOrderFinish: () => void;
    pageCurrentName: string;
    pageCurrentIndex: number;
    complementSelect: OrderArrayChosenType;
    pageAddons: number;
}

export default function ButtonsElement({ setPageCurrentIndex,  pageCurrentName, pageCurrentIndex, complementSelect, pageAddons }: Props) {



    return (
        <>
            <button
                type="button"
                onClick={() => setPageCurrentIndex(pageCurrentIndex - 1)}
                className={`${buttonClasses} px-3 py-1 text-xs md:text-sm`}
                disabled={pageCurrentIndex ===  0}
            >
                Voltar
            </button>
            {pageCurrentName !== "orderEnd" ? (
                <button
                    type="button"
                    onClick={() => setPageCurrentIndex(pageCurrentIndex + 1)}
                    className={`${buttonClasses} px-3 py-1 text-xs md:text-sm`}
                    disabled={ !(["versions", "extraIgrediens"].includes(pageCurrentName))  && complementSelect[2][pageAddons] === undefined}
                >
                    Próximo
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => console.log("Finalizar pedido")}
                    className={`${buttonClasses} px-3 py-1 text-xs md:text-sm`}
                >
                    Finalizar
                </button>
            )}
        </>
    )
}
