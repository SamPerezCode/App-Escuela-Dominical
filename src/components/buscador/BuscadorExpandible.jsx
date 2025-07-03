import { useRef, useEffect } from "react";
import "../buscador/BuscadorExpandible.css"

export default function BuscadorExpandible({
    placeholder = "Buscar...",
    texto,
    setTexto,
    isOpen,
    setIsOpen,
    children,
}) {
    const buscadorRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (buscadorRef.current && !buscadorRef.current.contains(e.target)) {
                setIsOpen(false);
                setTexto("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [buscadorRef, setIsOpen, setTexto]);

    return (
        <div
            ref={buscadorRef}
            className={`buscador-expandible ${isOpen ? "activo" : ""}`}
        >
            <input
                type="text"
                placeholder={placeholder}
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                className="input-expandible"
            />
            <button
                className="btn-lupa-inside"
                onClick={() => {
                    if (isOpen) {
                        setIsOpen(false);
                        setTexto("");
                    } else {
                        setIsOpen(true);
                    }
                }}
                type="button"
            >
                <img src="/image/find.svg" alt="Buscar" />
            </button>

            {children}
        </div>
    );
}
