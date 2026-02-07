export const complementsStyles = {
    optionContainer: "group flex w-full h-full flex-col justify-between rounded-xl border px-3 py-2 text-left text-xs transition-all shadow-sm hover:shadow-md appearance-none bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40",

    header: "mb-2 flex items-center justify-between gap-2",

    imageAddonContainer: "h-12 w-12 rounded-lg overflow-hidden bg-zinc-800 shrink-0 relative",

    ballOutside: "flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
    ballInside: "h-2.5 w-2.5 rounded-full transition-colors",

    buttonsQtyContainer: "flex items-center overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800 h-8",

    buttonsQty:
        "flex h-full w-8 items-center justify-center border-l border-zinc-700 " +
        "text-sm font-bold text-zinc-200 " +
        "hover:bg-zinc-700 " +
        "disabled:opacity-40 disabled:cursor-not-allowed",




} as const;
