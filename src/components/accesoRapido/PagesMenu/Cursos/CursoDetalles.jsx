// src/componentes/dashboard/Cursos/CursoDetalle.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useCursos } from "../../../../context/CursosContext";
import { useAlumnos } from "../../../../context/AlumnosContext";
import { useEffect, useState } from "react";
import { calcularEdad } from "../../../../utils/calcularEdad";
import "./CursoDetalles.css";

function CursoDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cursos } = useCursos();
    const { alumnos } = useAlumnos();
    const [curso, setCurso] = useState(null);

    useEffect(() => {
        const cursoSeleccionado = cursos.find(c => c.id === parseInt(id));
        setCurso(cursoSeleccionado);
    }, [id, cursos]);

    if (!curso) return <p>Cargando curso...</p>;

    const alumnosFiltrados = alumnos.filter((alumno) => {
        const edad = calcularEdad(alumno.fecha_nacimiento);
        return edad >= curso.edad_minima && edad <= curso.edad_maxima;
    });

    return (
        <div className="curso-detalle">
            <div className="header-curso-detalle">
                <h1>Curso: {curso.nombre}</h1>
                <button className="btn-volver" onClick={() => navigate("/dashboard/cursos")}>← Regresar</button>
            </div>

            <div className="info-curso">
                <p><strong>Edad mínima:</strong> {curso.edad_minima} años</p>
                <p><strong>Edad máxima:</strong> {curso.edad_maxima} años</p>
                <p><strong>Estado:</strong> {curso.estado}</p>
            </div>

            <h2>Estudiantes en este curso</h2>
            {alumnosFiltrados.length > 0 ? (
                <ul className="lista-alumnos">
                    {alumnosFiltrados.map(al => (
                        <li
                            key={al.id}
                            className="nombre-alumno"
                            onClick={() =>
                                navigate(`/dashboard/estudiantes/${al.id}`, {
                                    state: { from: `/dashboard/cursos/${curso.id}` }, // ← Aquí indicamos de dónde venimos
                                })
                            }
                        >
                            {al.nombre} ({calcularEdad(al.fecha_nacimiento)} años)
                        </li>

                    ))}
                </ul>
            ) : (
                <p>No hay estudiantes en este curso actualmente.</p>
            )}
        </div>
    );
}

export default CursoDetalle;
