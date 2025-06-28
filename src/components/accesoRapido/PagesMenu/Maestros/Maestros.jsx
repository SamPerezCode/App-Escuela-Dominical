import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import TablaMaestros from "./TablaMaestros";
import "../Maestros/Maestros.css";
import { useMaestros } from "../../../../context/MaestrosContext";

function Maestros() {
    const navigate = useNavigate();
    const [menuAbierto, setMenuAbierto] = useState(false);
    const dropdownRef = useRef(null);
    const [esMovil, setEsMovil] = useState(window.innerWidth < 640);
    const { maestros, recargarMaestros } = useMaestros(); // ✅ Corrección aquí

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setMenuAbierto(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleResize = () => setEsMovil(window.innerWidth < 640);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleAccion = (accion) => {
        setMenuAbierto(false);
        if (accion === "volver") navigate("/dashboard");
        if (accion === "registrar") navigate("/dashboard/registrar-maestro");
    };

    useEffect(() => {
        recargarMaestros();
    }, []);

    return (
        <div className="maestros">
            <div className="header-maestros">
                <div className="title-maestros">
                    <h1>Maestros</h1>

                    <div className="acciones-header-maestros" ref={dropdownRef}>
                        {!esMovil && (
                            <button className="btn-volver" onClick={() => navigate("/dashboard")}>
                                ← Regresar
                            </button>
                        )}

                        <img
                            src="/image/menu-vertical.svg"
                            alt="acciones"
                            className="icono-menu"
                            onClick={() => setMenuAbierto(!menuAbierto)}
                        />

                        {menuAbierto && (
                            <ul className="dropdown-opciones">
                                {esMovil && (
                                    <li onClick={() => handleAccion("volver")}>← Regresar</li>
                                )}
                                <li onClick={() => handleAccion("registrar")}>Registrar maestro</li>
                            </ul>
                        )}
                    </div>
                </div>

                <div className="container-info-maestros">
                    <TablaMaestros maestros={maestros} />
                </div>
            </div>
        </div>
    );
}

export default Maestros;
