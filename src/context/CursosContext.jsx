import { createContext, useContext, useEffect, useState } from "react";
import obtenerCursos from "../api/cursos/obtenerCursos";

const CursosContext = createContext();

export const CursosProvider = ({ children }) => {
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        recargarCursos();
    }, []);

    const recargarCursos = async () => {
        const token = localStorage.getItem("token");
        const res = await obtenerCursos(token);
        setCursos(res.data || []);
    };

    return (
        <CursosContext.Provider value={{ cursos, setCursos, recargarCursos }}>
            {children}
        </CursosContext.Provider>
    );
};

export const useCursos = () => useContext(CursosContext);
