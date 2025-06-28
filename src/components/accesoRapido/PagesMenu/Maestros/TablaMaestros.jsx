import { useNavigate } from "react-router-dom";
import "../Maestros/TablaMaestros.css";

function TablaMaestros({ maestros }) {
    const navigate = useNavigate();

    return (
        <div className="tabla-maestros-container">
            <table className="tabla-maestros">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Telefono</th>
                        <th>Celebracion</th>
                        <th>Curso</th>
                    </tr>
                </thead>
                <tbody>
                    {maestros.map((maestro) => (
                        <tr key={maestro.id}>
                            <td>
                                <button
                                    className="nombre-maestro"
                                    onClick={() => navigate(`/dashboard/maestro/${maestro.id}`)}
                                >
                                    {maestro.nombre}
                                </button>
                            </td>
                            <td>{maestro.telefono}</td>
                            <td>{maestro.horarioCulto}</td>
                            <td>{maestro.curso}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaMaestros;
