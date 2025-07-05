import { createContext, useContext, useState } from "react";
import obtenerGrupos from "../api/grupos/obtenerGrupos";

const GruposContext = createContext();

export const GruposProvider = ({ children }) => {
    const [grupos, setGrupos] = useState([]);

    const cargarGrupos = async () => {
        const token = localStorage.getItem("token");
        const response = await obtenerGrupos(token);
        // console.log("📦 Datos crudos de grupos:", response);
        setGrupos(response?.data || []);
    };


    return (
        <GruposContext.Provider value={{ grupos, cargarGrupos }}>
            {children}
        </GruposContext.Provider>
    );
};

export const useGrupos = () => useContext(GruposContext);
