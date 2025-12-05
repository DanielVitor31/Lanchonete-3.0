type Props = {
  open: (value: null) => void;
};


export default function SelectMenu({ open }: Props) {
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
            onClick={(e) => e.stopPropagation()} 
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

            <div className="space-y-2">
              <button className="w-full px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm text-left">
                Opção 1
              </button>
              <button className="w-full px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm text-left">
                Opção 2
              </button>
            </div>
          </div>
        </div>
  );
}
