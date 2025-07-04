import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAlumnos } from "../../../../../context/AlumnosContext";
import "../../Estudiantes/ComponentesEstudiantes/Cumpleanios.css";

const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function Cumpleanios() {
    const [mesSeleccionado, setMesSeleccionado] = useState(null);
    const [desplegarMeses, setDesplegarMeses] = useState(false);
    const [esMovil, setEsMovil] = useState(window.innerWidth < 640);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { alumnos } = useAlumnos();

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

    const filtrarPorMes = (mesIndex) =>
        alumnos.filter((est) => {
            const [, mes] = est.fecha_nacimiento.split("-");
            return parseInt(mes, 10) - 1 === mesIndex;
        });

    const handleMesClick = (mesIndex) => {
        setMesSeleccionado(mesIndex);
        setDesplegarMeses(false);
    };

    return (
        <div className="container-contenido-cumple">
            <div className="header-cumpleanios">
                <h1 className="title-cumpleanios">Cumpleaños</h1>

                {!esMovil ? (
                    <button
                        className="btn-volver-cumple"
                        onClick={() => navigate("/dashboard/estudiantes")}
                    >
                        ← <span>Regresar</span>
                    </button>
                ) : (
                    <div className="acciones-header-cumple" ref={menuRef}>
                        <img
                            src="/image/menu-vertical.svg"
                            alt="Opciones"
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

            <div className="dropdown-meses">
                <button
                    className="boton-mes"
                    onClick={() => setDesplegarMeses(!desplegarMeses)}
                >
                    {mesSeleccionado !== null ? meses[mesSeleccionado] : "Selecciona un mes"}
                </button>
                {desplegarMeses && (
                    <ul className="lista-meses">
                        {meses.map((mes, i) => (
                            <li key={i} onClick={() => handleMesClick(i)}>
                                {mes}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {mesSeleccionado !== null && (
                <div className="tabla-cumple-container">
                    <table className="tabla-cumple">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Día de Cumpleaños</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtrarPorMes(mesSeleccionado).length > 0 ? (
                                filtrarPorMes(mesSeleccionado).map((est) => {
                                    const dia = est.fecha_nacimiento.split("-")[2].slice(0, 2);
                                    return (
                                        <tr key={est.id}>
                                            <td>{est.nombre}</td>
                                            <td>{dia}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="2" className="sin-cumples">
                                        Este mes no hay cumpleaños
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Cumpleanios;
