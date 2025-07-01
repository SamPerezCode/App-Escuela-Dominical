import { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import ModalAsociarGrupo from "./ModalAsociargrupos";
import eliminarGrupo from "../../../../../api/grupos/eliminarGrupo";
import { useAlumnos } from "../../../../../context/AlumnosContext"; // 👈 Trae los alumnos si quieres filtrar aquí
import "./CardCursoPeriodo.css";

function CardCursoPeriodo({
  curso,
  cantidadAlumnos,
  gruposPorCurso,
  grupos,
  celebracionesDisponibles,
  maestrosDisponibles,
  onActualizarGrupos
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuAbiertoId, setMenuAbiertoId] = useState(null);

  const { alumnos } = useAlumnos(); // 👈 Siempre tienes acceso al contexto global

  // ✅ Asegúrate de filtrar por activos y rango de edad
  const alumnosFiltrados = alumnos?.filter(
    (a) =>
      a.activo &&
      a.edad >= curso.edad_minima &&
      a.edad <= curso.edad_maxima
  ) || [];

  // console.log(`🎓 Curso: ${curso.nombre}`);
  // console.log(`✅ Alumnos activos filtrados:`, alumnosFiltrados);

  const toggleMenu = (grupoId) => {
    if (menuAbiertoId === grupoId) {
      setMenuAbiertoId(null);
    } else {
      setMenuAbiertoId(grupoId);
    }
  };

  const handleEliminarGrupo = async (grupoId) => {
    const confirmado = confirm("¿Estás seguro de eliminar este grupo?");
    if (!confirmado) return;

    const eliminado = await eliminarGrupo(grupoId);
    if (eliminado) {
      alert("Grupo eliminado correctamente.");
      if (onActualizarGrupos) onActualizarGrupos();
    } else {
      alert("No se pudo eliminar el grupo.");
    }
    setMenuAbiertoId(null);
  };

  return (
    <div className="card-curso-periodo">
      <div className="card-curso-periodo__header">
        <h3>{curso.nombre}</h3>
        <ToggleSwitch
          isActive={curso.estado === "activo"}
          onToggle={() => {
            console.log(`Toggle curso: ${curso.nombre}`);
          }}
        />
      </div>

      <p className="card-curso-periodo__edad">
        Edad: {curso.edad_minima} - {curso.edad_maxima}
      </p>

      <p className="card-curso-periodo__cantidad">
        {alumnosFiltrados.length > 0 ? "Alumnos" : "Sin alumnos"}: {alumnosFiltrados.length}
      </p>

      <div className="card-curso-periodo__grupos">
        {gruposPorCurso.length > 0 ? (
          gruposPorCurso.map((grupo) => (
            <div key={grupo.id} className="grupo-item">
              <div className="grupo-header">
                <strong>{grupo.celebracion.nombre}</strong>
                <div className="grupo-menu">
                  <img
                    src="/image/menu-vertical.svg"
                    alt="acciones"
                    className="icono-menu"
                    onClick={() => toggleMenu(grupo.id)}
                  />
                  {menuAbiertoId === grupo.id && (
                    <ul className="dropdown-opciones">
                      <li onClick={() => handleEliminarGrupo(grupo.id)}>Eliminar grupo</li>
                    </ul>
                  )}
                </div>
              </div>
              <ul>
                {grupo.maestros.map((m) => (
                  <li key={m.id}>{m.nombre}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="sin-grupos">No hay maestros asignados aún en celebraciones.</p>
        )}
      </div>

      <button
        className="card-curso-periodo__btn-asociar"
        onClick={() => setIsModalOpen(true)}
      >
        Asignar maestros a curso
      </button>

      <ModalAsociarGrupo
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        curso={curso}
        celebracionesDisponibles={celebracionesDisponibles}
        maestrosDisponibles={maestrosDisponibles}
        grupos={grupos}
        onGuardarGrupo={(grupo) => {
          console.log("Grupo guardado:", grupo);
          if (onActualizarGrupos) onActualizarGrupos();
        }}
      />
    </div>
  );
}

export default CardCursoPeriodo;
