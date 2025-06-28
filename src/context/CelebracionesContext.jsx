import { createContext, useContext, useEffect, useState } from "react";
import obtenerCelebraciones from "../api/celebraciones/obtenerCelebraciones";

const CelebracionesContext = createContext();

export const CelebracionesProvider = ({ children }) => {
    const [celebraciones, setCelebraciones] = useState([]);

    useEffect(() => {
        recargarCelebraciones();
    }, []);

    const recargarCelebraciones = async () => {
        const token = localStorage.getItem("token");
        const res = await obtenerCelebraciones(token);
        setCelebraciones(res.data || []);
    };

    return (
        <CelebracionesContext.Provider value={{ celebraciones, setCelebraciones, recargarCelebraciones }}>
            {children}
        </CelebracionesContext.Provider>
    );
};

export const useCelebraciones = () => useContext(CelebracionesContext);
