// src/components/accesoRapido/PagesMenu/Celebraciones/TablaCelebraciones.jsx
import { useNavigate } from "react-router-dom";
import "./TablaCelebraciones.css";

function TablaCelebraciones({ celebraciones }) {
    const navigate = useNavigate();

    if (celebraciones.length === 0) {
        return <p>No hay celebraciones registradas.</p>;
    }

    return (
        <table className="tabla-celebraciones">
            <thead>
                <tr>
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
                {celebraciones.map((celebracion) => (
                    <tr key={celebracion.id}>
                        <td>
                            <button
                                className="nombre-celebracion"
                                onClick={() => navigate(`/dashboard/celebraciones/${celebracion.id}`)}
                            >
                                {celebracion.nombre}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TablaCelebraciones;
