import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./TablaPeriodos.css";

function TablaPeriodos({ periodos }) {
    const navigate = useNavigate();
    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const periodosPorPagina = 10;

    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda]);

    const periodosFiltrados = periodos.filter((p) =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const totalPaginas = Math.ceil(periodosFiltrados.length / periodosPorPagina);
    const inicio = (paginaActual - 1) * periodosPorPagina;
    const fin = inicio + periodosPorPagina;
    const periodosPagina = periodosFiltrados.slice(inicio, fin);

    return (
        <div className="tabla-periodos-container">

            {/* 🔍 Mostrar buscador solo si hay más de 5 periodos */}
            {periodos.length > 5 && (
                <div className="buscador-periodos">
                    <input
                        type="text"
                        placeholder="Buscar periodo..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
            )}

            <table className="tabla-periodos">
                <thead>
                    <tr>
                        <th>Periodo</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha de Fin</th>
                    </tr>
                </thead>
                <tbody>
                    {periodosPagina.length > 0 ? (
                        periodosPagina.map((periodo) => (
                            <tr key={periodo.id}>
                                <td>
                                    <button
                                        className="nombre-periodo"
                                        onClick={() => navigate(`/dashboard/periodos/${periodo.id}`)}
                                    >
                                        {periodo.nombre}
                                    </button>
                                </td>
                                <td>{new Date(periodo.fecha_inicio).toLocaleDateString("es-CO")}</td>
                                <td>{new Date(periodo.fecha_fin).toLocaleDateString("es-CO")}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: "center" }}>
                                No hay periodos encontrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Mostrar paginación solo si hay más de una página */}
            {totalPaginas > 1 && (
                <div className="paginacion-periodos">
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

export default TablaPeriodos;
