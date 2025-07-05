import { createContext, useContext, useEffect, useState } from "react";
import obtenerPeriodos from "../api/periodos/obtenerPeriodos";

const PeriodosContext = createContext();

export const PeriodosProvider = ({ children }) => {
    const [periodos, setPeriodos] = useState([]);
    const [periodoActivo, setPeriodoActivo] = useState(null);

    const recargarPeriodos = async () => {
        const token = localStorage.getItem("token");
        const response = await obtenerPeriodos(token);
        const lista = response?.data || [];
        setPeriodos(lista);

        const ahoraUTC = new Date().getTime();
        // console.log("🕒 Fecha ahora UTC:", new Date(ahoraUTC).toISOString());

        const activo = lista.find((p) => {
            const inicioUTC = new Date(p.fecha_inicio).getTime();
            const finUTC = new Date(p.fecha_fin).getTime();

            // console.log(`Verificando ${p.nombre} desde ${new Date(inicioUTC).toISOString()} hasta ${new Date(finUTC).toISOString()}`);

            return ahoraUTC >= inicioUTC && ahoraUTC <= finUTC;
        });

        // console.log("Periodo activo:", activo);

        setPeriodoActivo(activo || null);
        return activo;
    };


    useEffect(() => {
        recargarPeriodos();
    }, []);

    return (
        <PeriodosContext.Provider
            value={{ periodos, periodoActivo, recargarPeriodos }}
        >
            {children}
        </PeriodosContext.Provider>
    );
};

export const usePeriodos = () => useContext(PeriodosContext);
