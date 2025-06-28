// src/components/accesoRapido/PagesMenu/Estudiantes/ComponentesEstudiantes/CandidatosPromocionar.jsx
import { useNavigate } from "react-router-dom";
import { estudiantes } from "../../../../../data/dataEstudiantes";
import "./CandidatosPromocionar.css";
import { calcularEdad } from "../../../../../utils/calcularEdad";

// Función para calcular edad

function CandidatosPromocionar() {
    const navigate = useNavigate();

    return (
        <div className="container-candidatos-promocionar">
            <div className="header-candidatos">
                <h1>Candidatos a promocionar</h1>
                <button className="btn-volver" onClick={() => navigate("/dashboard/estudiantes")}>
                    ←  Regresar
                </button>
            </div>

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
                                    style={{ cursor: "pointer", color: "var(--link-color)" }}
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
