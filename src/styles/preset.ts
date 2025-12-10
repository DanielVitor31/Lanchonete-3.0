  export const buttonClasses = `
    // Estilo Base
    text-white font-semibold py-3 px-6 
    rounded-full 
    shadow-md 
    // Garante a suavidade, reduzimos para 150ms para um clique mais responsivo
    transition-all duration-150 ease-in-out 
    // PREPARA o elemento para a transformação de escala no clique
    transform
    
    // 💡 AJUSTE: Usa o cursor padrão, eliminando o "dedinho"
    cursor-pointer
    
    // Estilo Habilitado (Normal + Hover)
    bg-indigo-600 
    // Mantém a mudança de cor no hover
    hover:bg-indigo-700 
    
    // 💡 NOVO: Efeito de Pressionar no clique
    active:scale-98 
    
    // Estilo Desabilitado 
    disabled:bg-indigo-400 
    disabled:shadow-none 
    // Mantemos o cursor de proibido para o estado desabilitado
    disabled:cursor-not-allowed 
`;