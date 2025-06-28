import { createContext, useContext, useEffect, useState } from "react";
import { useAlumnos } from "./AlumnosContext";

const NotificacionesContext = createContext();

export const useNotificaciones = () => useContext(NotificacionesContext);

export const NotificacionesProvider = ({ children }) => {
    const { alumnos } = useAlumnos();
    const [notificaciones, setNotificaciones] = useState([]);
    const [vistas, setVistas] = useState(false); // 👈 estado para saber si ya se vieron

    useEffect(() => {
        const hoy = new Date().toISOString().slice(5, 10); // MM-DD
        const cumpleanieros = alumnos.filter(
            (a) => a.fecha_nacimiento?.slice(5, 10) === hoy
        );

        const notifs = cumpleanieros.map((a) => ({
            tipo: "cumpleaños",
            mensaje: `🎉 Hoy es el cumpleaños de ${a.nombre}`,
            id: a.id,
        }));

        setNotificaciones(notifs);
        setVistas(false); // 👈 resetear si hay nuevos
    }, [alumnos]);

    const marcarComoVistas = () => setVistas(true);

    return (
        <NotificacionesContext.Provider value={{ notificaciones, vistas, marcarComoVistas }}>
            {children}
        </NotificacionesContext.Provider>
    );
};
