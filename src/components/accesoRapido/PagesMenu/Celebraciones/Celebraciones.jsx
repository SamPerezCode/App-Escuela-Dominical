// src/components/accesoRapido/PagesMenu/Celebraciones/Celebraciones.jsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useCelebraciones } from "../../../../context/CelebracionesContext";
import TablaCelebraciones from "./TablaCelebraciones";
import "./Celebraciones.css";

function Celebraciones() {
    const navigate = useNavigate();
    const [esMovil, setEsMovil] = useState(window.innerWidth < 640);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const menuRef = useRef(null);
    const { celebraciones, recargarCelebraciones } = useCelebraciones();

    useEffect(() => {
        recargarCelebraciones(); // ✅
    }, []);

    useEffect(() => {
        const handleResize = () => setEsMovil(window.innerWidth < 640);
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuAbierto(false);
            }
        };

        window.addEventListener("resize", handleResize);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="celebraciones">
            <div className="header-celebraciones">
                <div className="title-celebraciones">
                    <h1>Celebraciones</h1>

                    <div className="acciones-celebraciones" ref={menuRef}>
                        {/* Botón ← Regresar solo visible en pantallas grandes */}
                        {!esMovil && (
                            <button className="btn-volver" onClick={() => navigate("/dashboard")}>
                                ← Regresar
                            </button>
                        )}

                        <img
                            src="/image/menu-vertical.svg"
                            alt="Opciones"
                            className="menu-icon"
                            onClick={() => setMenuAbierto(!menuAbierto)}
                        />
                        {menuAbierto && (
                            <ul className="dropdown-opciones">
                                {esMovil && (
                                    <li onClick={() => navigate("/dashboard")}>← Regresar</li>
                                )}
                                <li onClick={() => navigate("/dashboard/registrar-celebracion")}>
                                    Registrar celebración
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div className="container-info-celebraciones">
                <TablaCelebraciones celebraciones={celebraciones} />
            </div>
        </div>
    );
}

export default Celebraciones;
