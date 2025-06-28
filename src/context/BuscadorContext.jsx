import { createContext, useContext } from "react";
import { useAlumnos } from "./AlumnosContext";

const BuscadorContext = createContext();

export const BuscadorProvider = ({ children }) => {
    const { alumnos } = useAlumnos();

    const seccionesSistema = [
        { nombre: "Estudiantes", ruta: "/dashboard/estudiantes" },
        { nombre: "Registrar estudiante", ruta: "/dashboard/registrar-estudiantes" },
        { nombre: "Cumpleaños", ruta: "/dashboard/cumpleanios" },
        { nombre: "Periodos", ruta: "/dashboard/periodos" },
        { nombre: "Maestros", ruta: "/dashboard/maestros" },
    ];

    const buscar = (termino) => {
        const texto = termino.toLowerCase();

        const alumnosCoinciden = alumnos.filter((al) =>
            al.nombre.toLowerCase().includes(texto)
        );

        const seccionesCoinciden = seccionesSistema.filter((sec) =>
            sec.nombre.toLowerCase().includes(texto)
        );

        return {
            alumnos: alumnosCoinciden,
            secciones: seccionesCoinciden,
        };
    };

    return (
        <BuscadorContext.Provider value={{ buscar }}>
            {children}
        </BuscadorContext.Provider>
    );
};

// ✅ Asegúrate de incluir esto
export const useBuscador = () => useContext(BuscadorContext);
