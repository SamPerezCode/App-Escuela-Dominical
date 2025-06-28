import { createContext, useContext, useEffect, useState } from "react";
import obtenerPeriodos from "../api/periodos/obtenerPeriodos";

const PeriodosContext = createContext();

const PeriodosProvider = ({ children }) => {
    const [periodos, setPeriodos] = useState([]); // 🔁 Capitaliza "setPeriodos" por consistencia

    useEffect(() => {
        recargarPeriodos();
    }, []);

    const recargarPeriodos = async () => {
        const token = localStorage.getItem("token");
        const response = await obtenerPeriodos(token);
        setPeriodos(response?.data || []);
    };

    return (
        <PeriodosContext.Provider value={{ periodos, setPeriodos, recargarPeriodos }}>
            {children}
        </PeriodosContext.Provider>
    );
};

export default PeriodosProvider;

export const usePeriodos = () => useContext(PeriodosContext);

