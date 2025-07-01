import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { eliminarAlumno } from "../../../../api/alumnos/eliminarAlumno";
import { useAlumnos } from "../../../../context/AlumnosContext";
import ToggleSwitch from "./ToggleSwitchEstudiante";
import "./tablaEstudiantes.css";


function TablaEstudiantes({ estudiantes }) {
    const navigate = useNavigate();
    const { eliminarAlumnoDelContexto } = useAlumnos();
    const [estadoEstudiantes, setEstadoEstudiantes] = useState({});
    const [esMovil, setEsMovil] = useState(window.innerWidth < 640);
    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const estudiantesPorPagina = 10;

    useEffect(() => {
        // Inicializa estado de activación local
        const estadoInicial = {};
        estudiantes.forEach((est) => {
            estadoInicial[est.id] = est.estado === "activo";
        });
        setEstadoEstudiantes(estadoInicial);
    }, [estudiantes]);

    useEffect(() => {
        const handleResize = () => setEsMovil(window.innerWidth < 640);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda]);

    const estudiantesFiltrados = estudiantes.filter((est) =>
        est.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const totalPaginas = Math.ceil(estudiantesFiltrados.length / estudiantesPorPagina);
    const inicio = (paginaActual - 1) * estudiantesPorPagina;
    const fin = inicio + estudiantesPorPagina;
    const estudiantesPagina = estudiantesFiltrados.slice(inicio, fin);

    const handleEliminar = async (id) => {
        const confirmar = window.confirm("¿Deseas eliminar este estudiante?");
        if (!confirmar) return;

        const eliminado = await eliminarAlumno(id);
        if (eliminado) {
            eliminarAlumnoDelContexto(id);
            alert("Estudiante eliminado correctamente.");
        } else {
            alert("Hubo un error al eliminar el estudiante.");
        }
    };


    return (
        <div className="tabla-estudiantes-container">
            <div className="buscador-estudiantes">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>

            <table className="tabla-estudiantes">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Fecha de nacimiento</th>
                        <th>Teléfono</th>
                        <th>Acudiente</th>
                        <th>Tel. Acudiente</th>
                        <th>Dirección</th>
                        {!esMovil && <th>Acciones</th>} {/* ✅ solo si no es móvil */}
                    </tr>
                </thead>
                <tbody>
                    {estudiantesPagina.length > 0 ? (
                        estudiantesPagina.map((est) => (
                            <tr key={est.id}>
                                <td
                                    className="nombre-alumno"
                                    onClick={() => navigate(`/dashboard/estudiantes/${est.id}`)}
                                    style={{ cursor: "pointer", color: "var(--link-color)" }}
                                >
                                    {est.nombre}
                                </td>
                                <td>{est.fecha_nacimiento?.slice(0, 10)}</td>
                                <td>{est.telefono}</td>
                                <td>{est.acudiente}</td>
                                <td>{est.acudiente_telefono}</td>
                                <td>{est.direccion}</td>

                                {!esMovil && (
                                    <td>
                                        <div className="acciones-estudiante">
                                            <img
                                                src="/image/edit.svg"
                                                alt="Editar"
                                                className="icono-accion"
                                                onClick={() => navigate(`/dashboard/estudiantes/${est.id}`)}
                                            />
                                            <img
                                                src="/image/delete.svg"
                                                alt="Eliminar"
                                                className="icono-accion"
                                                onClick={() => handleEliminar(est.id)}
                                            />
                                            <ToggleSwitch
                                                checked={estadoEstudiantes[est.id] || false}
                                                onChange={() =>
                                                    setEstadoEstudiantes((prev) => ({
                                                        ...prev,
                                                        [est.id]: !prev[est.id],
                                                    }))
                                                }
                                            />
                                        </div>
                                    </td>
                                )}

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>
                                No hay estudiantes encontrados.
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

export default TablaEstudiantes;
