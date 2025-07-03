import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useBuscador } from "../../context/BuscadorContext";

import BuscadorExpandible from "../buscador/BuscadorExpandible";
import "../header/header.css";
import UserDropdown from "../header/UserDropdown";
import NotificationDropdown from "./NotificationDropdown";

function Header({ user }) {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const { logout } = useAuth();
    const { buscar } = useBuscador();
    const navigate = useNavigate();

    const [texto, setTexto] = useState("");
    const [buscadorAbierto, setBuscadorAbierto] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    const { alumnos, secciones } = buscar(texto);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleCerrarSesion = () => {
        logout();
        navigate("/login");
    };

    const handleNavegar = (ruta) => {
        navigate(ruta);
        setTexto("");
        setBuscadorAbierto(false);
    };

    return (
        <div className="container-header">
            <div className="container-logo">
                <img
                    className="logo-header logo-light"
                    src="/image/cruz-negro.png"
                    alt="Logo-LGC Light"
                />
                <img
                    className="logo-header logo-dark"
                    src="/image/cruz-blanco.png"
                    alt="Logo-LGC Dark"
                />
                {(!isMobile || !buscadorAbierto) && <h1>EB LGC</h1>}
            </div>

            <div className="container-info-header">
                <BuscadorExpandible
                    placeholder="Buscar..."
                    texto={texto}
                    setTexto={setTexto}
                    isOpen={buscadorAbierto}
                    setIsOpen={setBuscadorAbierto}
                >
                    {texto && (
                        <ul className="resultados-busqueda">
                            {secciones.map((sec) => (
                                <li key={sec.ruta} onClick={() => handleNavegar(sec.ruta)}>
                                    Ir a {sec.nombre}
                                </li>
                            ))}
                            {alumnos.map((al) => (
                                <li
                                    key={al.id}
                                    onClick={() =>
                                        handleNavegar(`/dashboard/estudiantes/${al.id}`)
                                    }
                                >
                                    Estudiante: {al.nombre}
                                </li>
                            ))}
                            {alumnos.length === 0 && secciones.length === 0 && (
                                <li>No se encontraron resultados</li>
                            )}
                        </ul>
                    )}
                </BuscadorExpandible>

                <div id="container-actionIcons">
                    {(!isMobile || !buscadorAbierto) && (
                        <>
                            <NotificationDropdown />

                            <div id="mode">
                                <button onClick={toggleDarkMode}>
                                    {isDarkMode ? (
                                        <img src="/image/mode-light.svg" alt="modo claro" />
                                    ) : (
                                        <img src="/image/mode-dark.svg" alt="modo oscuro" />
                                    )}
                                </button>
                            </div>
                        </>
                    )}

                    {/* ✅ Siempre visible: UserDropdown */}
                    <UserDropdown user={user} onCerrarSesion={handleCerrarSesion} />
                </div>
            </div>
        </div>
    );
}

export default Header;
