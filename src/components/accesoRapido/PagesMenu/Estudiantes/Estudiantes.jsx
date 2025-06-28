import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import TablaEstudiantes from "./TablaEstudiantes";
import "../Estudiantes/Estudiantes.css";
import { useAlumnos } from "../../../../context/AlumnosContext";

function Estudiantes() {
  const navigate = useNavigate();
  const [esMovil, setEsMovil] = useState(window.innerWidth < 640);
  const { alumnos, recargarAlumnos } = useAlumnos();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    recargarAlumnos();
  }, []);

  // Cerrar si se hace clic afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
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
  })

  return (
    <div className="estudiantes">
      <div className="header-estudiantes">
        <div className="title-estudiantes">
          <h1>Estudiantes</h1>
          <div className="acciones-header" ref={menuRef}>
            {/* Botones visibles en escritorio */}
            <button className="btn-volver-estudiante" onClick={() => navigate("/dashboard")}>
              ← Regresar
            </button>
            <button className="btn-registrar-estudiante" onClick={() => navigate("/dashboard/registrar-estudiantes")}>
              + Registrar
            </button>

            {/* Menú desplegable en móvil */}
            <img
              src="/image/menu-vertical.svg"
              alt="Opciones"
              className="icono-menu"
              onClick={() => setMenuAbierto(!menuAbierto)}
            />
            {menuAbierto && (
              <ul className="dropdown-opciones">
                {esMovil && (
                  <>
                    <li onClick={() => navigate("/dashboard")}>Volver al panel</li>
                    <li onClick={() => navigate("/dashboard/registrar-estudiantes")}>Registrar estudiante</li>
                  </>
                )}
                <li onClick={() => navigate("/dashboard/candidatos-promocionar")}>Promociones futuras</li>
                <li onClick={() => navigate("/dashboard/cumpleanios")}>Cumpleaños</li>
              </ul>
            )}
          </div>

        </div>


        <div className="container-info-estudiantes">
          <TablaEstudiantes estudiantes={alumnos} />
        </div>
      </div>
    </div>
  );
}

export default Estudiantes;
