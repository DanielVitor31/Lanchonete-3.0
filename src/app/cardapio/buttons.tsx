"use client";

import { supabaseStorageURL, moneyFormatBRL } from "@/ultils/ultils";
import { useState } from "react";
import { buttonClasses } from "@/styles/preset";
import type { Option, PagesType } from "./functions";


type Props = {
    setPageCurrent: (valor: number) => void;
    handleOrderFinish: () => void;
    page: PagesType;
    optionsSelect: { [key: number]: number };
}

export default function ButtonsElement({ setPageCurrent, handleOrderFinish, page, optionsSelect }: Props) {



    return (
        <>
            <button
                type="button"
                onClick={() => setPageCurrent(page.current - 1)}
                className={`${buttonClasses} px-3 py-1 text-xs md:text-sm`}
                disabled={page.min === page.current}
            >
                Voltar
            </button>
            {page.last !== page.current ? (
                <button
                    type="button"
                    onClick={() => setPageCurrent(page.current + 1)}
                    className={`${buttonClasses} px-3 py-1 text-xs md:text-sm`}
                    disabled={!(page.current in optionsSelect)}
                >
                    Próximo
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => handleOrderFinish()}
                    className={`${buttonClasses} px-3 py-1 text-xs md:text-sm`}
                >
                    Finalizar
                </button>
            )}
        </>
    )
}
