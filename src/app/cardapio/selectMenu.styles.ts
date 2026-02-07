export const selectMenuStyles = {
    overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm",

    modal:
        "w-dvw xl:w-[40dvw] fhd:w-[30dvw] " + // Largura
        "h-dvh xl:h-[97dvh] fhd:h-[90dvh] " + // Altura
        "bg-zinc-950 px-5 py-4 xl:rounded-xl",

    grid: "grid h-full grid-cols-1 grid-rows-[minmax(0,0.22fr)_minmax(0,1.35fr)_minmax(0,0.55fr)_minmax(0,1.4fr)_minmax(0,0.24fr)] gap-2 ",

    header: "flex items-center justify-center gap-1",
    title: "basis-[88%] min-w-0 text-lg sm:text-xl font-semibold text-zinc-50 leading-tight truncate",
    closeBtn: "cursor-pointer select-none text-red-400 hover:text-red-300 transition text-lg rounded-md px-2 py-1 hover:bg-red-500/10",

    imageFoodContainer: "h-full flex items-center justify-center",
    imageFood: "h-full w-auto object-contain object-center",


    descriptionContainer: "rounded-lg border border-zinc-800 bg-zinc-900/40 p-3",
    description: "text-sm text-zinc-300 leading-relaxed line-clamp-3",

    optionsContainer: "min-h-0 overflow-y-auto rounded-xl border border-zinc-800 p-2",

    emptyText: "text-xs sm:text-sm text-zinc-400 text-center",

    footer: "flex items-center gap-3 h-full w-full",
    totalBox: "flex flex-col text-left",
    totalLabel: "text-[11px] text-zinc-400 uppercase tracking-wide",
    totalValue: "text-base font-bold text-dinheiro-6",

    buttonsWrap: "ml-auto flex items-stretch gap-2 h-full",

    finishOverlay: "fixed inset-0 z-60 bg-black/50 backdrop-blur-sm",
} as const;
