import { useNavigate } from "react-router-dom";

import "../panelAdministrativo/panelAdmin.css";
import { useAlumnos } from "../../context/AlumnosContext";


function PanelAdmin() {
    const navigate = useNavigate();
    const { alumnos } = useAlumnos();

    const hoy = new Date();
    const cumpleMes = alumnos.filter((a) => {
        return new Date(a.fecha_nacimiento).getMonth() === hoy.getMonth();
    });

    return (
        <div id="container-panelAdministrativo">
            <div className="" id="asistencia-semana">
                <h2>Asistencia de la semana</h2>
                <img src="/image/asistencia.svg" alt="" />
            </div>

            <div className="" id="lecciones-semana">
                <h2>Lecciones de la semana</h2>
                <img src="/image/lecciones.svg" alt="" />
            </div>

            <div className="" id="cumpleanos" onClick={() => navigate("/dashboard/alerta-cumpleanios")}>
                <h2>Alerta de cumpleaños</h2>
                <span className="badge">{cumpleMes.length}</span>
                <img src="/image/birthday.svg" alt="" />
            </div>

            <div className="" id="ofrenda">
                <h2>Ofrenda recogida en la semana</h2>
                <img src="/image/money.svg" alt="" />
            </div>

            <div className="" id="reporte-asistencia">
                <h2>Reporte de asistencia</h2>
                <img src="/image/report.svg" alt="" />
            </div>
        </div>
    );
}

export default PanelAdmin;
