import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CardCursoPeriodo from "./CardCursoPeriodo";

import { useCursoPeriodo } from "../../../../../context/CursoPeriodoContext";
import { useCelebraciones } from "../../../../../context/CelebracionesContext";
import { useMaestros } from "../../../../../context/MaestrosContext";
import { usePeriodos } from "../../../../../context/PeriodosContext";
import { useAlumnos } from "../../../../../context/AlumnosContext";
import { useGrupos } from "../../../../../context/GruposContext";

import "./InfoPeriodos.css";

function InfoPeriodos() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { periodos } = usePeriodos();
  const { alumnos } = useAlumnos();
  const { cursosPeriodo, cargarCursosPeriodo } = useCursoPeriodo();
  const { celebraciones } = useCelebraciones();
  const { maestros } = useMaestros();
  const { grupos, cargarGrupos } = useGrupos();

  const periodo = periodos.find((p) => p.id === parseInt(id));
  const location = useLocation();
  const from = location.state?.from || "/dashboard/periodos";

  const [menuAbierto, setMenuAbierto] = useState(false);
  const dropdownRef = useRef(null);
  const [esMovil, setEsMovil] = useState(window.innerWidth < 640);

  // ✅ Cargar cursos y todos los grupos
  useEffect(() => {
    cargarCursosPeriodo(id);
    cargarGrupos(id);
  }, [id]);

  const handleActualizarGrupos = () => {
    cargarGrupos(id);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => setEsMovil(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAccion = (accion) => {
    setMenuAbierto(false);
    switch (accion) {
      case "volver":
        navigate(from);
        break;
      case "estudiantes":
        console.log("Ir a estudiantes del periodo");
        break;
      case "asistencia":
        console.log("Ir a asistencia");
        break;
      case "lecciones":
        console.log("Ir a lecciones");
        break;
      default:
        break;
    }
  };

  // console.log("✅ Todos los grupos del periodo:", grupos);

  return (
    <div className="info-periodo">
      <div className="header-info-periodo">
        <div className="title-info-periodo">
          <h1>Periodo: {periodo?.nombre}</h1>

          <div className="acciones-header-periodo" ref={dropdownRef}>
            {!esMovil && (
              <button
                className="btn-volver"
                onClick={() => handleAccion("volver")}
              >
                ← Regresar
              </button>
            )}

            <img
              src="/image/menu-vertical.svg"
              alt="acciones"
              className="icono-menu"
              onClick={() => setMenuAbierto(!menuAbierto)}
            />

            {menuAbierto && (
              <ul className="dropdown-opciones">
                {esMovil && (
                  <li onClick={() => handleAccion("volver")}>← Regresar</li>
                )}
                <li onClick={() => handleAccion("estudiantes")}>Estudiantes</li>
                <li onClick={() => handleAccion("asistencia")}>Asistencia</li>
                <li onClick={() => handleAccion("lecciones")}>Lecciones</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <section className="info-periodo__cursos">
        <h2 className="info-periodo__cursos-title">Cursos vinculados</h2>
        <div className="info-periodo__cursos-list">
          {cursosPeriodo.map((curso) => {
            const alumnosFiltrados = alumnos.filter(
              (a) => a.activo && a.edad >= curso.edad_minima && a.edad <= curso.edad_maxima
            );

            // console.log(alumnosFiltrados);


            const gruposPorCurso = grupos.filter(
              (g) => g.curso_periodo.curso_periodo_id === curso.curso_periodo_id
            );

            // console.log(`Grupos para ${curso.nombre}:`, gruposPorCurso);

            return (
              <CardCursoPeriodo
                key={curso.curso_periodo_id}
                curso={curso}
                cantidadAlumnos={alumnosFiltrados.length}
                gruposPorCurso={gruposPorCurso}
                grupos={grupos}
                celebracionesDisponibles={celebraciones}
                maestrosDisponibles={maestros}
                onActualizarGrupos={handleActualizarGrupos}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default InfoPeriodos;
