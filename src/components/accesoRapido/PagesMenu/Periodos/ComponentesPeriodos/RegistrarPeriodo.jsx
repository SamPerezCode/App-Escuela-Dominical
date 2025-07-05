import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import crearPeriodo from "../../../../../api/periodos/crearPeriodo";
import "./RegistrarPeriodo.css";

function RegistrarPeriodo() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/dashboard/periodos";

    const [formData, setFormData] = useState({
        nombre: "",
        fecha_inicio: "",
        fecha_fin: "",
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const creado = await crearPeriodo(formData);
        if (creado) {
            alert("Periodo creado correctamente");
            navigate(from);
        } else {
            alert("Ocurrió un error al crear el periodo");
        }
    };

    return (
        <div className="registro-periodos">
            <div className="header-periodos-form">
                <h1>Crear periodo</h1>

                {!esMovil && (
                    <button className="btn-volver-periodo" onClick={() => navigate(from)}>
                        ← Regresar
                    </button>
                )}

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
                                <li onClick={() => navigate(from)}>← Regresar</li>
                            </ul>
                        )}
                    </div>
                )}
            </div>

            <form className="formulario-periodos" onSubmit={handleSubmit}>
                <div className="grupo-formulario">
                    <label>Nombre del periodo *</label>
                    <input
                        type="text"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Ej: Calendario 2025-2026"
                    />
                </div>

                <div className="grupo-formulario">
                    <label>Fecha de inicio *</label>
                    <input
                        type="date"
                        name="fecha_inicio"
                        required
                        value={formData.fecha_inicio}
                        onChange={handleChange}
                    />
                </div>

                <div className="grupo-formulario">
                    <label>Fecha de fin *</label>
                    <input
                        type="date"
                        name="fecha_fin"
                        required
                        value={formData.fecha_fin}
                        onChange={handleChange}
                    />
                </div>

                <div className="acciones-periodos">
                    <button type="submit" className="btn-guardar">
                        Guardar
                    </button>
                    <button
                        type="button"
                        className="btn-cancelar"
                        onClick={() => navigate(from)}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegistrarPeriodo;
