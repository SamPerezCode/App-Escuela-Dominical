import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAlumnos } from "../../../../../../context/AlumnosContext";
import { editarAlumno } from "../../../../../../api/alumnos/editarAlumno";
import { eliminarAlumno } from "../../../../../../api/alumnos/eliminarAlumno";
import "./InfoEstudiante.css";



function InfoEstudiante() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/dashboard/estudiantes";
    const { alumnos, eliminarAlumnoDelContexto } = useAlumnos();

    const [formData, setFormData] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);

    // 👇 NUEVO: Responsive y menú
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

    useEffect(() => {
        const estudiante = alumnos.find((a) => a.id === parseInt(id));
        if (estudiante) setFormData(estudiante);
    }, [alumnos, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleGuardar = async () => {
        const alumnoEditado = {
            ...formData,
            fecha_nacimiento: formData.fecha_nacimiento?.slice(0, 10),
        };

        const actualizado = await editarAlumno(id, alumnoEditado);
        if (actualizado) {
            alert("Estudiante actualizado correctamente");
            setModoEdicion(false);
        } else {
            alert("Ocurrió un error al actualizar.");
        }
    };

    const handleEliminar = async () => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este alumno?");
        if (!confirmar) return;

        const eliminado = await eliminarAlumno(id);
        if (eliminado) {
            eliminarAlumnoDelContexto(id);
            alert("Alumno eliminado correctamente");
            navigate("/dashboard/estudiantes");
        } else {
            alert("Ocurrió un error al eliminar.");
        }
    };

    const handleCancelarEdicion = () => {
        const estudianteOriginal = alumnos.find((a) => a.id === parseInt(id));
        setFormData(estudianteOriginal);
        setModoEdicion(false);
    };

    if (!formData) return <p>Cargando estudiante...</p>;

    return (
        <div className="registro-estudiantes">
            <div className="registro-header">
                <h1>Información estudiante</h1>

                {/* Acciones en escritorio */}
                {!esMovil && (
                    <div className="acciones-header-info-estudiante">
                        <button className="btn-volver-estudiante" onClick={() => navigate(from)}>
                            ← Regresar
                        </button>
                    </div>
                )}

                {/* Acciones en móvil */}
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


            <form className="registro-formulario">
                <div className="campo-formulario">
                    <label>Nombre completo</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        disabled={!modoEdicion}
                    />
                </div>
                <div className="campo-formulario">
                    <label>Fecha de nacimiento</label>
                    <input
                        type="date"
                        name="fecha_nacimiento"
                        value={formData.fecha_nacimiento?.slice(0, 10) || ""}
                        onChange={handleChange}
                        disabled={!modoEdicion}
                    />
                </div>
                <div className="campo-formulario">
                    <label>Teléfono</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono || ""}
                        onChange={handleChange}
                        disabled={!modoEdicion}
                    />
                </div>
                <div className="campo-formulario">
                    <label>Acudiente</label>
                    <input
                        type="text"
                        name="acudiente"
                        value={formData.acudiente || ""}
                        onChange={handleChange}
                        disabled={!modoEdicion}
                    />
                </div>
                <div className="campo-formulario">
                    <label>Tel. Acudiente</label>
                    <input
                        type="text"
                        name="acudiente_telefono"
                        value={formData.acudiente_telefono || ""}
                        onChange={handleChange}
                        disabled={!modoEdicion}
                    />
                </div>
                <div className="campo-formulario">
                    <label>Dirección</label>
                    <input
                        type="text"
                        name="direccion"
                        value={formData.direccion || ""}
                        onChange={handleChange}
                        disabled={!modoEdicion}
                    />
                </div>

                <div className="acciones-bottom">
                    {modoEdicion ? (
                        <>
                            <button type="button" className="btn-accion guardar" onClick={handleGuardar}>
                                Guardar cambios
                            </button>
                            <button type="button" className="btn-accion cancelar" onClick={handleCancelarEdicion}>
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <button type="button" className="btn-accion editar" onClick={() => setModoEdicion(true)}>
                                Editar
                            </button>
                            <button type="button" className="btn-accion eliminar" onClick={handleEliminar}>
                                Eliminar
                            </button>

                        </>
                    )}
                </div>
            </form>
        </div>
    );
}

export default InfoEstudiante;
