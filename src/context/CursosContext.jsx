import { createContext, useContext, useEffect, useState } from "react";
import obtenerCursos from "../api/cursos/obtenerCursos";
import editarCurso from "../api/cursos/actualizarCurso";
import eliminarCurso from "../api/cursos/eliminarCurso";
import registrarCurso from "../api/cursos/crearCurso";


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

    const actualizarCurso = async (id, datos) => {
        const actualizado = await editarCurso(id, datos);
        if (actualizado) {
            await recargarCursos();
        }
        return actualizado;
    };

    const eliminarCursoContext = async (id) => {
        const eliminado = await eliminarCurso(id);
        if (eliminado) {
            await recargarCursos();
        }
        return eliminado;
    };
    const registrarCursoContext = async (datos) => {
        const creado = await registrarCurso(datos);
        if (creado) {
            await recargarCursos();
        }
        return creado;
    };


    return (
        <CursosContext.Provider
            value={{
                cursos,
                setCursos,
                recargarCursos,
                actualizarCurso,
                eliminarCurso: eliminarCursoContext,
                registrarCurso: registrarCursoContext

            }}
        >
            {children}
        </CursosContext.Provider>
    );
};

export const useCursos = () => useContext(CursosContext);
