import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./InfoPeriodos.css";

function InfoPeriodos() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const from = location.state?.from || "/dashboard/periodos";

    const [menuAbierto, setMenuAbierto] = useState(false);
    const dropdownRef = useRef(null);
    const [esMovil, setEsMovil] = useState(window.innerWidth < 640);

    const periodoNombre = id === "1" ? "2024-2025" : "2025-2026"; // 🔁 Simulación de nombre de periodo

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
        switch (accion) {
            case "volver":
                navigate(from);
                break;
            case "estudiantes":
                console.log("Ir a estudiantes del periodo");
                break;
            case "asistencia":
                console.log("Ir a asistencia");
                break;
            case "lecciones":
                console.log("Ir a lecciones");
                break;
            default:
                break;
        }
    };

    return (
        <div className="info-periodo">
            <div className="header-info-periodo">
                <div className="title-info-periodo">
                    <h1>Periodo: {periodoNombre}</h1>

                    <div className="acciones-header-periodo" ref={dropdownRef}>
                        {/* Solo en escritorio */}
                        {!esMovil && (
                            <button className="btn-volver" onClick={() => handleAccion("volver")}>
                                ← Regresar
                            </button>
                        )}

                        {/* Solo en móvil */}
                        <img
                            src="/image/menu-vertical.svg"
                            alt="acciones"
                            className="icono-menu"
                            onClick={() => setMenuAbierto(!menuAbierto)}
                        />

                        {menuAbierto && (
                            <ul className="dropdown-opciones">
                                {esMovil && <li onClick={() => handleAccion("volver")}>← Regresar</li>}
                                <li onClick={() => handleAccion("estudiantes")}>Estudiantes</li>
                                <li onClick={() => handleAccion("asistencia")}>Asistencia</li>
                                <li onClick={() => handleAccion("lecciones")}>Lecciones</li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div className="acciones-periodo">
                <button className="btn-activar">Activar Periodo</button>
                <button className="btn-cerrar" onClick={() => navigate("/dashboard/periodos")}>
                    Cerrar Periodo
                </button>
            </div>
        </div>
    );
}

export default InfoPeriodos;
