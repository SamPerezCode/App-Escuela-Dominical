import { useState, useRef, useEffect } from "react";
import { useAlumnos } from "../../context/AlumnosContext";
import { useNavigate } from "react-router-dom";
import "./NotificationDropdown.css";

function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [vistas, setVistas] = useState(false);
    const dropdownRef = useRef(null);
    const { alumnos } = useAlumnos();
    const navigate = useNavigate();

    const [notificaciones, setNotificaciones] = useState([]);

    useEffect(() => {
        // Detectar si ya se vieron hoy
        const hoy = new Date().toISOString().slice(0, 10); // formato "YYYY-MM-DD"
        const notiVistas = sessionStorage.getItem("notificacionesVistasFecha");

        if (notiVistas === hoy) {
            setVistas(true);
        }

        // Buscar cumpleaños de hoy
        const hoyStr = new Date().toISOString().slice(5, 10); // MM-DD
        const cumpleanieros = alumnos.filter(
            (a) => a.fecha_nacimiento?.slice(5, 10) === hoyStr
        );

        if (cumpleanieros.length > 0) {
            setNotificaciones([
                {
                    tipo: "cumpleaños",
                    mensaje: `🎂 Hay ${cumpleanieros.length} estudiante(s) cumpliendo años hoy.`,
                    ruta: "/dashboard/cumpleanios",
                },
            ]);
        }
    }, [alumnos]);

    // Cerrar si hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleVerNotificaciones = () => {
        setIsOpen(!isOpen);
        setVistas(true);
        const hoy = new Date().toISOString().slice(0, 10);
        sessionStorage.setItem("notificacionesVistasFecha", hoy);
    };

    const handleClickNotificacion = (ruta) => {
        navigate(ruta);
        setIsOpen(false);
    };

    return (
        <div className="notification-wrapper" ref={dropdownRef}>
            <div
                className="notification"
                onClick={handleVerNotificaciones}
                style={{ cursor: "pointer", position: "relative" }}
            >
                <img src="/image/notifications.svg" alt="notificaciones" />
                {!vistas && notificaciones.length > 0 && (
                    <span className="notificacion-badge"></span>
                )}
            </div>

            {isOpen && (
                <div className="notification-dropdown">
                    {notificaciones.length > 0 ? (
                        <>
                            <p className="notification-title">Notificaciones</p>
                            <ul>
                                {notificaciones.map((n, i) => (
                                    <li
                                        key={i}
                                        onClick={() => handleClickNotificacion(n.ruta)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {n.mensaje}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p className="notification-empty">No hay notificaciones por ahora.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default NotificationDropdown;
