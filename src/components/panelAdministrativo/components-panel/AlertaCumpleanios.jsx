// src/components/panelAdministrativo/AlertaCumpleanos.jsx
import { useNavigate } from "react-router-dom";
import "../components-panel/AlertaCumpleanios.css";

function AlertaCumpleanos() {
    const navigate = useNavigate();

    return (
        <div className="alerta-cumple-container">
            <div className="alerta-cumple-header">
                <h1>Alertas de cumpleaños</h1>
                <button className="btn-volver" onClick={() => navigate("/dashboard")}>
                    ← Regresar
                </button>
            </div>

            <div className="alerta-cumple-botones">
                <button
                    className="btn-cumple"
                    onClick={() => navigate("/dashboard/cumpleanios")}
                >
                    🎓 Cumpleaños estudiantes
                </button>

                <button className="btn-cumple" disabled>
                    👨‍🏫 Cumpleaños maestros
                </button>
            </div>
        </div>
    );
}

export default AlertaCumpleanos;
