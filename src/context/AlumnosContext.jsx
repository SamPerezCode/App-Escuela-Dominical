import { createContext, useContext, useState, useEffect } from "react";
import obtenerAlumnos from "../api/alumnos/obtenerAlumnos";

const AlumnosContext = createContext();

export const AlumnosProvider = ({ children }) => {
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        recargarAlumnos();
    }, []);

    // ✅ Nueva función para volver a obtener los alumnos desde la API
    const recargarAlumnos = async () => {
        const token = localStorage.getItem("token");
        const data = await obtenerAlumnos(token);
        setAlumnos(data?.data || []);
    };

    // ✅ Función para eliminar un alumno del estado local
    const eliminarAlumnoDelContexto = (id) => {
        setAlumnos((prev) => prev.filter((alumno) => alumno.id !== parseInt(id)));
    };
    const hoy = new Date();

    const cumpleHoy = alumnos.filter((a) => {
        const fecha = new Date(a.fecha_nacimiento);
        return (
            fecha.getDate() === hoy.getDate() &&
            fecha.getMonth() === hoy.getMonth()
        );
    });


    return (
        <AlumnosContext.Provider
            value={{
                alumnos,
                setAlumnos,
                recargarAlumnos,
                eliminarAlumnoDelContexto,
                cumpleHoy
            }}
        >
            {children}
        </AlumnosContext.Provider>
    );
};

export const useAlumnos = () => useContext(AlumnosContext);
