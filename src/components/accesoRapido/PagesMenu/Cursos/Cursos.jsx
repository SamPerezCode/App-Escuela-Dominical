import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCursos } from "../../../../context/CursosContext";
import TablaCursos from "./TablaCursos";
import "./Cursos.css";




function Cursos() {
    const navigate = useNavigate();
    const [menuAbierto, setMenuAbierto] = useState(false);
    const dropdownRef = useRef(null);
    const [esMovil, setEsMovil] = useState(window.innerWidth < 640);
    const { cursos, recargarCursos } = useCursos();

    useEffect(() => {
        recargarCursos();
    }, [])

    // Detectar clic fuera del dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setMenuAbierto(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Detectar tamaño de pantalla
    useEffect(() => {
        const handleResize = () => setEsMovil(window.innerWidth < 640);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleAccion = (accion) => {
        setMenuAbierto(false);
        if (accion === "volver") navigate("/dashboard");
        if (accion === "crear") {
            // Aquí va la navegación a registrar curso
            navigate("/dashboard/registrar-curso");
        }
        if (accion === "actuales") {
            navigate("/dashboard/cursos-actuales");
        }
    };

    return (
        <div className="cursos">
            <div className="header-cursos">
                <div className="title-cursos">
                    <h1>Cursos</h1>

                    <div className="acciones-header-cursos" ref={dropdownRef}>
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
                                <li onClick={() => handleAccion("crear")}>Crear curso</li>
                                <li onClick={() => handleAccion("actuales")}>Cursos actuales</li>
                            </ul>
                        )}
                    </div>
                </div>

                <div className="container-info-cursos">
                    <TablaCursos cursos={cursos} />
                </div>
            </div>

        </div>
    );
}

export default Cursos;
