"use client";
import { useState } from "react";

export default function ComandasPage() {
    const menuItems = [
        "Temas",
        "Dashboard",
        "Perfil",
        "Configurações",
        "Status",
        "Notificações",
        "Relatórios",
        "Usuários",
        "Segurança",
        "Suporte"
    ];

    const [selectedItem, setSelectedItem] = useState(menuItems[0]);

    return (
        <section className="bg-blue-400 w-dvw h-dvh">
            <div className="bg-green-400">
                <div className="flex gap-2 overflow-y-auto px-3 ">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            className={`py-3 border-b-3 border-transparent ${selectedItem === item ? 'text-blue-600 border-b-blue-600' : ''}`}
                            onClick={() => setSelectedItem(item)}>
                            {item}
                        </button>
                    ))}
                </div>
            </div>
            <div className="bg-red-400 h-full">
                items
            </div>
        </section>
    );
}
