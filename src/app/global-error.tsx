"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  const isDbError =
    error.message === "DB_ERROR" || error.message === "DB_EMPTY";

  return (
    <html lang="pt-BR">
      <body>
        {isDbError ? (
          <>
            <h1>Erro ao acessar o banco de dados</h1>
            <p>Tente novamente mais tarde. Se o problema persistir, fale com o suporte.</p>
            <button onClick={reset}>Tentar novamente</button>
          </>
        ) : (
          <>
            <h1>Erro inesperado</h1>
            <p>{error.message}</p>
            <button onClick={reset}>Tentar novamente</button>
          </>
        )}
      </body>
    </html>
  );
}
