import { createContext, useState, useEffect, useContext } from "react";
import obtenerMaestros from "../api/maestros/obtenerMaestros";

const MaestrosContext = createContext();

export const MaestrosProvider = ({ children }) => {
    const [maestros, setMaestros] = useState([]);

    useEffect(() => {
        recargarMaestros();
    }, []);

    // Obtener maestros desde la API
    const recargarMaestros = async () => {
        const token = localStorage.getItem("token");
        const data = await obtenerMaestros(token);
        setMaestros(data?.data || [])
    };
    const eliminarMaestroDelContexto = (id) => {
        setMaestros((prev) => prev.filter((maestro) => maestro.id !== parseInt(id)));
    }




    return (
        <MaestrosContext.Provider
            value={{
                maestros,
                setMaestros,
                recargarMaestros,
                eliminarMaestroDelContexto
            }}
        >

            {children}
        </MaestrosContext.Provider>

    );
}

export const useMaestros = () => useContext(MaestrosContext);