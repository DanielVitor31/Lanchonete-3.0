import Link from "next/link";
import createOrder from "../cardapio/createOrderDB"

export default function OrderStatus() {


  return (
    <main className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4">
      <section className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center space-y-6">

        <h1 className="text-xl font-semibold text-white">
          Item adicionado ao carrinho
        </h1>

        <p className="text-sm text-zinc-400">
          Escolha o próximo passo
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/cardapio"
            className="w-full rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white py-3 transition text-center"
          //onClick={() => handleSelectOption("cart")}
          >
            Continuar comprando
          </Link>

          <Link
            href="/checkout"
            prefetch={false}
            className="w-full rounded-lg bg-base-tematica-1 hover:bg-tematica-2 text-black font-medium py-3 transition text-center"
          >
            Finalizar compra
          </Link>
        </div>
      </section>
    </main>
  );
}
