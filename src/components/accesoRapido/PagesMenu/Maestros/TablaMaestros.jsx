import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Maestros/TablaMaestros.css";

function TablaMaestros({ grupos = [], maestros = [] }) {
    const navigate = useNavigate();

    // 🔍 Construir lista final combinada (como ya lo tienes)
    const maestroAsignaciones = grupos.flatMap((grupo) =>
        grupo.maestros.map((maestro) => ({
            id: maestro.id,
            nombre: maestro.nombre,
            telefono: maestro.telefono,
            celebracion: grupo.celebracion?.nombre || "No asignado",
            curso: grupo.curso_periodo?.curso?.nombre || "No asignado",
            grupoId: grupo.id,
        }))
    );

    const idsAsignados = maestroAsignaciones.map((m) => m.id);

    const maestrosSinAsignar = maestros
        .filter((m) => !idsAsignados.includes(m.id))
        .map((m) => ({
            id: m.id,
            nombre: m.nombre,
            telefono: m.telefono,
            celebracion: "No asignado",
            curso: "No asignado",
            grupoId: "sin-grupo",
        }));

    const listaFinal = [...maestroAsignaciones, ...maestrosSinAsignar];


    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const maestrosPorPagina = 5;

    useEffect(() => {
        setPaginaActual(1); // Reinicio paginación al buscar
    }, [busqueda]);

    const maestrosFiltrados = listaFinal.filter((m) =>
        m.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const totalPaginas = Math.ceil(maestrosFiltrados.length / maestrosPorPagina);
    const inicio = (paginaActual - 1) * maestrosPorPagina;
    const fin = inicio + maestrosPorPagina;
    const maestrosPagina = maestrosFiltrados.slice(inicio, fin);

    return (
        <div className="tabla-maestros-container">
            <div className="buscador-estudiantes">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>

            <table className="tabla-maestros">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Celebración</th>
                        <th>Curso</th>
                    </tr>
                </thead>
                <tbody>
                    {maestrosPagina.length > 0 ? (
                        maestrosPagina.map((maestro) => (
                            <tr
                                key={`${maestro.id}-${maestro.grupoId}-${maestro.celebracion}-${maestro.curso}`}
                            >
                                <td>
                                    <button
                                        className="nombre-maestro"
                                        onClick={() =>
                                            navigate(`/dashboard/maestro/${maestro.id}`)
                                        }
                                    >
                                        {maestro.nombre}
                                    </button>
                                </td>
                                <td>{maestro.telefono}</td>
                                <td>{maestro.celebracion}</td>
                                <td>{maestro.curso}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center" }}>
                                No hay maestros encontrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="paginacion-estudiantes">
                <button
                    onClick={() => setPaginaActual(paginaActual - 1)}
                    disabled={paginaActual === 1}
                >
                    ← Anterior
                </button>
                <span>
                    Página {paginaActual} de {totalPaginas}
                </span>
                <button
                    onClick={() => setPaginaActual(paginaActual + 1)}
                    disabled={paginaActual === totalPaginas}
                >
                    Siguiente →
                </button>
            </div>
        </div>
    );
}

export default TablaMaestros;
