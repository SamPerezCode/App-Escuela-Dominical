import { createContext, useContext, useState } from "react";
import obtenerCursosPeriodo from "../api/periodos/obtenerCursosPeriodo";

const CursoPeriodoContext = createContext();

export const CursoPeriodoProvider = ({ children }) => {
  const [cursosPeriodo, setCursosPeriodo] = useState([]);

  const cargarCursosPeriodo = async (periodoId) => {
    const token = localStorage.getItem("token");
    const data = await obtenerCursosPeriodo(periodoId, token);
    setCursosPeriodo(data?.data || []);
  };

  return (
    <CursoPeriodoContext.Provider
      value={{ cursosPeriodo, cargarCursosPeriodo }}
    >
      {children}
    </CursoPeriodoContext.Provider>
  );
};

export const useCursoPeriodo = () => useContext(CursoPeriodoContext);
