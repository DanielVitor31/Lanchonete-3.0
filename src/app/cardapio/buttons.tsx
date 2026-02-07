"use client";

import { buttonClasses } from "@/styles/preset";
import type { OrderArrayChosenType } from "@/types/typeFood";

type Props = {
    setPageCurrentIndex: (valor: number) => void;
    handleOrderFinish: () => void;
    // handleOrderFinish: () => void;
    pageCurrentName: string;
    pageCurrentIndex: number;
    complementSelect: OrderArrayChosenType;
}

export default function ButtonsElement({ setPageCurrentIndex, handleOrderFinish, pageCurrentName, pageCurrentIndex, complementSelect }: Props) {


    return (
        <>
            <button
                type="button"
                onClick={() => setPageCurrentIndex(pageCurrentIndex - 1)}
                className={`${buttonClasses} h-full px-3 py-0 text-xs md:text-sm`}
                disabled={pageCurrentIndex === 0}
            >
                Voltar
            </button>
            {pageCurrentName !== "orderEnd" ? (
                <button
                    type="button"
                    onClick={() => setPageCurrentIndex(pageCurrentIndex + 1)}
                    className={`${buttonClasses} h-full px-3 py-0 text-xs md:text-sm`}
                    disabled={!(["versions", "extraIgrediens"].includes(pageCurrentName)) && !(complementSelect.addons.has(pageCurrentName))}
                >
                    Próximo
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => handleOrderFinish()}
                    className={`${buttonClasses} h-full px-3 py-0 text-xs md:text-sm`}
                >
                    Finalizar
                </button>
            )}
        </>
    )
}


