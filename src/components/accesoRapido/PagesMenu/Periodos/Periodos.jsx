import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { usePeriodos } from "../../../../context/PeriodosContext";
import TablaPeriodos from "./TablaPeriodos";
import "./Periodos.css";


function Periodos() {
    const navigate = useNavigate();
    const [esMovil, setEsMovil] = useState(window.innerWidth < 640);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const menuRef = useRef(null);
    const { periodos, recargarPeriodos } = usePeriodos();

    useEffect(() => {
        recargarPeriodos(); // ✅
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
        <div className="periodos">
            <div className="header-periodos">
                <div className="title-periodos">
                    <h1>Periodos</h1>

                    <div className="acciones-periodos" ref={menuRef}>
                        {/* Botón ← Regresar solo visible en pantallas grandes */}
                        <button className="btn-volver-periodo" onClick={() => navigate("/dashboard")}>
                            ←  Regresar
                        </button>

                        {/* Menú de opciones */}
                        <img
                            src="/image/menu-vertical.svg"
                            alt="Opciones"
                            className="menu-icon"
                            onClick={() => setMenuAbierto(!menuAbierto)}
                        />
                        {menuAbierto && (
                            <ul className="dropdown-opciones">
                                {esMovil && (
                                    <li onClick={() => navigate("/dashboard")}>Volver al panel</li>
                                )}
                                <li onClick={() => navigate("/dashboard/registrar-periodo")}>Crear periodo</li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div className="container-info-periodos">
                <TablaPeriodos periodos={periodos} />
            </div>
        </div>
    );
}

export default Periodos;
