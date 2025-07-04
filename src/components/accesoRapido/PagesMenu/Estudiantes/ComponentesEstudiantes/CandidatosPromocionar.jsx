// 👇 Igual, todo tu import original...
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { estudiantes } from "../../../../../data/dataEstudiantes";
import { calcularEdad } from "../../../../../utils/calcularEdad";
import "./CandidatosPromocionar.css";

function CandidatosPromocionar() {
    const navigate = useNavigate();

    // NUEVO: versión responsive para menú móvil
    const [esMovil, setEsMovil] = useState(window.innerWidth < 640);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setEsMovil(window.innerWidth < 640);
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuAbierto(false);
            }
        };

        window.addEventListener("resize", handleResize);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="container-candidatos-promocionar">
            <div className="header-candidatos">
                <h1>Candidatos a promocionar</h1>

                {/* Desktop: botón volver */}
                {!esMovil && (
                    <button className="btn-volver-candidato" onClick={() => navigate("/dashboard/estudiantes")}>
                        ← <span>Regresar</span>
                    </button>
                )}

                {/* Móvil: menú */}
                {esMovil && (
                    <div className="acciones-header-info-estudiante" ref={menuRef}>
                        <img
                            src="/image/menu-vertical.svg"
                            alt="acciones"
                            className="icono-menu"
                            onClick={() => setMenuAbierto(!menuAbierto)}
                        />
                        {menuAbierto && (
                            <ul className="dropdown-opciones">
                                <li onClick={() => navigate("/dashboard/estudiantes")}>← Regresar</li>
                            </ul>
                        )}
                    </div>
                )}
            </div>

            {/* 🔥 TU TABLA NO SE TOCA 🔥 */}
            <div className="tabla-candidatos-container">
                <table className="tabla-candidatos">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Curso actual</th>
                            <th>Curso a avanzar</th>
                            <th>Edad</th>
                            <th>Fecha de nacimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estudiantes.map((est) => (
                            <tr key={est.id}>
                                <td
                                    className="nombre-alumno"
                                    onClick={() => navigate(`/dashboard/estudiantes/${est.id}`)}
                                >
                                    {est.nombre}
                                </td>
                                <td>{`Curso ${Math.floor(Math.random() * 5) + 1}`}</td>
                                <td>{`Curso ${Math.floor(Math.random() * 5) + 2}`}</td>
                                <td>{calcularEdad(est.fechaNacimiento)} años</td>
                                <td>{est.fechaNacimiento}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CandidatosPromocionar;
