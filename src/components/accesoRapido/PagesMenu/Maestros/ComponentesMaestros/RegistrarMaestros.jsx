import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import obtenerCursos from "../../../../../api/cursos/obtenerCursos";
import obtenerCelebraciones from "../../../../../api/celebraciones/obtenerCelebraciones";
import registrarMaestro from "../../../../../api/maestros/crearMaestro";

function RegistrarMaestro() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/dashboard/maestros";

    const [formData, setFormData] = useState({
        nombre: "",
        telefono: "",
        fecha_nacimiento: "",
        estado: "activo", // Fijo por ahora
        curso_id: "",
        celebracion_id: ""
    });

    const [cursos, setCursos] = useState([]);
    const [celebraciones, setCelebraciones] = useState([]);
    const [esMovil, setEsMovil] = useState(window.innerWidth < 640);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const cargarDatos = async () => {
            const token = localStorage.getItem("token");
            const cursosData = await obtenerCursos(token);
            const celebracionesData = await obtenerCelebraciones(token);
            setCursos(cursosData.data || []);
            setCelebraciones(celebracionesData.data || []);
        };

        cargarDatos();
    }, []);

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
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Solo enviamos lo que el backend necesita
        const maestroARegistrar = {
            nombre: formData.nombre,
            telefono: formData.telefono,
            fecha_nacimiento: formData.fecha_nacimiento,
            estado: "activo"
        };

        const exito = await registrarMaestro(maestroARegistrar);

        if (exito) {
            alert("Maestro registrado correctamente");
            navigate(from);
        } else {
            alert("Error al registrar maestro");
        }
    };

    return (
        <div className="registro-estudiantes">
            <div className="registro-header">
                <h1>Registrar nuevo maestro</h1>

                {!esMovil && (
                    <button className="btn-volver" onClick={() => navigate(from)}>
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

            <form className="registro-formulario" onSubmit={handleSubmit}>
                <div className="campo-formulario">
                    <label>Nombre completo</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="campo-formulario">
                    <label>Teléfono</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="campo-formulario">
                    <label>Fecha de nacimiento</label>
                    <input
                        type="date"
                        name="fecha_nacimiento"
                        value={formData.fecha_nacimiento}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Estos campos son visuales por ahora, no se envían al backend */}
                <div className="campo-formulario">
                    <label>Horario de celebración (sin efecto por ahora)</label>
                    <select name="celebracion_id" value={formData.celebracion_id} onChange={handleChange}>
                        <option value="">-- Selecciona una celebración --</option>
                        {celebraciones.map((c) => (
                            <option key={c.id} value={c.id}>{c.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="campo-formulario">
                    <label>Curso asignado (sin efecto por ahora)</label>
                    <select name="curso_id" value={formData.curso_id} onChange={handleChange}>
                        <option value="">-- Selecciona un curso --</option>
                        {cursos.map((c) => (
                            <option key={c.id} value={c.id}>{c.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="acciones-bottom">
                    <button type="submit" className="btn-accion guardar">Registrar maestro</button>
                    <button type="button" className="btn-cancelar" onClick={() => navigate(from)}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default RegistrarMaestro;
