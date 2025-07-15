import { createContext, useContext, useState } from "react";
import obtenerGrupos from "../api/grupos/obtenerGrupos";
import guardarGrupoAPI from "../api/grupos/guardarGrupo";

const GruposContext = createContext();

export const GruposProvider = ({ children }) => {
    const [grupos, setGrupos] = useState([]);

    const cargarGrupos = async () => {
        const token = localStorage.getItem("token");
        const response = await obtenerGrupos(token);
        // console.log("Datos crudos de grupos:", response);
        setGrupos(response?.data || []);
    };

    const guardarGrupo = async (grupo) => {
        const res = await guardarGrupoAPI(grupo);
        if (res) {
            await cargarGrupos(); // refresca lista
        }
        return res;
    };


    return (
        <GruposContext.Provider value={{ grupos, cargarGrupos, guardarGrupo }}>
            {children}
        </GruposContext.Provider>
    );
};

export const useGrupos = () => useContext(GruposContext);
