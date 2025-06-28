import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useBuscador } from "../../context/BuscadorContext";

import "../header/header.css";
import UserDropdown from "../header/UserDropdown";
import NotificationDropdown from "./NotificationDropdown";

function Header({ user }) {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const { logout } = useAuth();
    const { buscar } = useBuscador();

    const navigate = useNavigate();

    const [texto, setTexto] = useState("");

    // const resultados = buscar(texto);
    const { alumnos, secciones } = buscar(texto);

    const handleCerrarSesion = () => {
        logout();
        navigate("/login");
    };
    const handleNavegar = (ruta) => {
        navigate(ruta);
        setTexto("");
    };


    // const handleResultadoClick = (alumno) => {
    //     navigate(`/dashboard/estudiantes/${alumno.id}`);
    //     setTexto("");
    // };

    return (
        <div className="container-header">
            <div className="container-logo">
                <img src="/image/logo-1.jpeg" alt="Logo-LGC" />
                <h1>EB LGC</h1>
            </div>

            <div className="container-info-header">
                {/* 🔍 Buscador funcional de estudiantes */}
                <div className="buscador-global">
                    <input
                        type="text"
                        placeholder="Buscar en el sistema..."
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                    />
                    {texto && (
                        <ul className="resultados-busqueda">
                            {/* Secciones del sistema */}
                            {secciones.map((sec) => (
                                <li key={sec.ruta} onClick={() => handleNavegar(sec.ruta)}>
                                    Ir a {sec.nombre}
                                </li>
                            ))}

                            {/* Resultados de estudiantes */}
                            {alumnos.map((al) => (
                                <li key={al.id} onClick={() => handleNavegar(`/dashboard/estudiantes/${al.id}`)}>
                                    Estudiante: {al.nombre}
                                </li>
                            ))}

                            {/* Ningún resultado */}
                            {alumnos.length === 0 && secciones.length === 0 && (
                                <li>No se encontraron resultados</li>
                            )}
                        </ul>
                    )}
                </div>

                <div id="container-actionIcons">
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

                    <UserDropdown user={user} onCerrarSesion={handleCerrarSesion} />
                </div>
            </div>
        </div>
    );
}

export default Header;
