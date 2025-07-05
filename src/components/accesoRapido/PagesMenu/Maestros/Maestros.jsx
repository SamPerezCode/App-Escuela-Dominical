import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import TablaMaestros from "./TablaMaestros";
import "../Maestros/Maestros.css";
import { useGrupos } from "../../../../context/GruposContext";
import { useMaestros } from "../../../../context/MaestrosContext";


function Maestros() {
    const navigate = useNavigate();
    const [esMovil, setEsMovil] = useState(window.innerWidth < 640);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const dropdownRef = useRef(null);

    const { grupos, cargarGrupos } = useGrupos();
    const { maestros, recargarMaestros } = useMaestros();

    useEffect(() => {
        cargarGrupos();
        recargarMaestros();
    }, []);

    useEffect(() => {
        const handleResize = () => setEsMovil(window.innerWidth < 640);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setMenuAbierto(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="maestros">
            <div className="header-maestros">
                <div className="title-maestros">
                    <h1>Maestros</h1>
                    <div className="acciones-header-maestros" ref={dropdownRef}>
                        {!esMovil && (
                            <>
                                <button className="btn-volver-maestro" onClick={() => navigate("/dashboard")}>
                                    ← Regresar
                                </button>
                                <button className="btn-registrar-maestro" onClick={() => navigate("/dashboard/registrar-maestro")}>
                                    + Registrar
                                </button>
                            </>
                        )}

                        <img
                            src="/image/menu-vertical.svg"
                            alt="Opciones"
                            className="icono-menu"
                            onClick={() => setMenuAbierto(!menuAbierto)}
                        />

                        {menuAbierto && (
                            <ul className="dropdown-opciones">
                                {esMovil && (
                                    <>
                                        <li onClick={() => navigate("/dashboard")}>← Regresar</li>
                                        <li onClick={() => navigate("/dashboard/registrar-maestro")}>Registrar maestro</li>
                                    </>
                                )}
                                <li onClick={() => navigate("/dashboard/cumpleanios")}>Cumpleaños de Maestros</li>
                            </ul>
                        )}
                    </div>
                </div>

                <div className="container-info-maestros">
                    <TablaMaestros
                        grupos={grupos}
                        maestros={maestros} />
                </div>
            </div>
        </div>
    );
}

export default Maestros;
