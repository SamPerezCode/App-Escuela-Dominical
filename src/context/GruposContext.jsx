import { createContext, useContext, useState } from "react";
import obtenerGrupos from "../api/grupos/obtenerGrupos";

const GruposContext = createContext();

export const GruposProvider = ({ children }) => {
    const [grupos, setGrupos] = useState([]);

    const cargarGrupos = async () => {
        const token = localStorage.getItem("token");
        const data = await obtenerGrupos(token);
        setGrupos(data?.data || []);
    };

    return (
        <GruposContext.Provider value={{ grupos, cargarGrupos }}>
            {children}
        </GruposContext.Provider>
    );
};

export const useGrupos = () => useContext(GruposContext);
