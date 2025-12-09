"use client";

import { supabaseStorageURL, moneyFormatBRL } from "@/ultils/ultils";
import { useState } from "react";
import { buttonClasses } from "@/styles/preset";
import type { Option } from "./functions";


type Props = {
    setOptionsNumber: (valor: number) => void;
    optionsNumber: number;
    pagsMin: number;
    pagsMax: number;
    optionsSelect: { [key: number]: number };
}

export default function ButtonsElement({ setOptionsNumber, optionsNumber, pagsMin, pagsMax, optionsSelect }: Props) {



    return (
        <>
            <button
                type="button"
                onClick={() => setOptionsNumber(optionsNumber - 1)}
                className={`${buttonClasses} px-3 py-1 text-xs md:text-sm`}
                disabled={pagsMin === optionsNumber}
            >
                Voltar
            </button>
            {pagsMax !== optionsNumber ? (
                <button
                    type="button"
                    onClick={() => setOptionsNumber(optionsNumber + 1)}
                    className={`${buttonClasses} px-3 py-1 text-xs md:text-sm`}
                    disabled={!(optionsNumber in optionsSelect)}
                >
                    Próximo
                </button>
            ) : (
                <button
                    type="button"
                    // onClick={() => handleOrderFinish()}
                    className={`${buttonClasses} px-3 py-1 text-xs md:text-sm`}
                    disabled={!(optionsNumber in optionsSelect)}
                >
                    Finalizar
                </button>
            )}
        </>
    )
}
