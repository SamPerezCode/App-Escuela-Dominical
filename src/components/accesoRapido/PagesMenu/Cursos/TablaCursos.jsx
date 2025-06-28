import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TablaCursos.css";

function TablaCursos({ cursos }) {
    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const cursosPorPagina = 10;
    const navigate = useNavigate();

    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda]);

    const cursosFiltrados = cursos.filter((curso) =>
        curso.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const totalPaginas = Math.ceil(cursosFiltrados.length / cursosPorPagina);
    const inicio = (paginaActual - 1) * cursosPorPagina;
    const fin = inicio + cursosPorPagina;
    const cursosPagina = cursosFiltrados.slice(inicio, fin);

    return (
        <div className="tabla-cursos-container">
            {cursosFiltrados.length > 5 && (
                <div className="buscador-cursos">
                    <input
                        type="text"
                        placeholder="Buscar por nombre del curso..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
            )}

            <table className="tabla-cursos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad mínima</th>
                        <th>Edad máxima</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {cursosPagina.length > 0 ? (
                        cursosPagina.map((curso) => (
                            <tr key={curso.id}>
                                <td
                                    className="nombre-curso"
                                    onClick={() => navigate(`/dashboard/cursos/${curso.id}`)}
                                    style={{ cursor: "pointer", color: "var(--link-color)" }}
                                >
                                    {curso.nombre}
                                </td>
                                <td>{curso.edad_minima}</td>
                                <td>{curso.edad_maxima}</td>
                                <td>{curso.estado}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center" }}>
                                No hay cursos encontrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {totalPaginas > 1 && (
                <div className="paginacion-cursos">
                    <button
                        onClick={() => setPaginaActual(paginaActual - 1)}
                        disabled={paginaActual === 1}
                    >
                        ← Anterior
                    </button>
                    <span>Página {paginaActual} de {totalPaginas}</span>
                    <button
                        onClick={() => setPaginaActual(paginaActual + 1)}
                        disabled={paginaActual === totalPaginas}
                    >
                        Siguiente →
                    </button>
                </div>
            )}
        </div>
    );
}

export default TablaCursos;
