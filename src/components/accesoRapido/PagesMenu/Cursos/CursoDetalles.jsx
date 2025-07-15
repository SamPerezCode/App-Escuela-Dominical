import { useParams, useNavigate } from "react-router-dom";
import { useCursos } from "../../../../context/CursosContext";
import { useEffect, useState, useRef } from "react";
import ToggleSwitch from "../../../ToggleSwitch/ToggleSwitch";
import "./CursoDetalles.css";

function CursoDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cursos } = useCursos();
    const [curso, setCurso] = useState(null);
    const { actualizarCurso } = useCursos();
    const { eliminarCurso } = useCursos();

    const [esMovil, setEsMovil] = useState(window.innerWidth < 640);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const dropdownRef = useRef(null);

    const [editando, setEditando] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        edad_minima: "",
        edad_maxima: "",
        estado: "activo",
    });

    useEffect(() => {
        const cursoSeleccionado = cursos.find(c => c.id === parseInt(id));
        if (cursoSeleccionado) {
            setCurso(cursoSeleccionado);
            setFormData({
                nombre: cursoSeleccionado.nombre,
                edad_minima: cursoSeleccionado.edad_minima,
                edad_maxima: cursoSeleccionado.edad_maxima,
                estado: cursoSeleccionado.estado,
            });
        }
    }, [id, cursos]);

    useEffect(() => {
        const handleResize = () => setEsMovil(window.innerWidth < 640);
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
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

    if (!curso) return <p>Cargando curso...</p>;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEstadoToggle = () => {
        setFormData(prev => ({
            ...prev,
            estado: prev.estado === "activo" ? "inactivo" : "activo"
        }));
    };


    const handleEliminar = async () => {
        const confirmado = confirm(`¿Seguro que deseas eliminar el curso "${curso.nombre}"?`);
        if (confirmado) {
            const eliminado = await eliminarCurso(curso.id);
            if (eliminado) {
                alert(`Curso "${curso.nombre}" eliminado ✅`);
                navigate("/dashboard/cursos");
            } else {
                alert("No se pudo eliminar el curso.");
            }
        }
    };

    const handleSubmit = async () => {
        const datos = {
            nombre: formData.nombre,
            edad_minima: parseInt(formData.edad_minima),
            edad_maxima: parseInt(formData.edad_maxima),
            estado: formData.estado,
        };

        const res = await actualizarCurso(curso.id, datos);
        if (res) {
            alert("Curso actualizado correctamente ✅");
            navigate("/dashboard/cursos");
        } else {
            alert("Hubo un error al actualizar el curso.");
        }
    };




    return (
        <div className="curso-detalle">
            <div className="header-curso-detalle">
                <h1>Curso: {curso.nombre}</h1>

                <div className="acciones-header-curso-detalle" ref={dropdownRef}>
                    {!esMovil && (
                        <button className="btn-volver" onClick={() => navigate("/dashboard/cursos")}>
                            ← Regresar
                        </button>
                    )}

                    {esMovil && (
                        <>
                            <img
                                src="/image/menu-vertical.svg"
                                alt="acciones"
                                className="icono-menu"
                                onClick={() => setMenuAbierto(!menuAbierto)}
                            />
                            {menuAbierto && (
                                <ul className="dropdown-opciones">
                                    <li onClick={() => navigate("/dashboard/cursos")}>← Regresar</li>
                                </ul>
                            )}
                        </>
                    )}
                </div>
            </div>

            {!editando ? (
                <div className="info-curso">
                    <p><strong>Edad mínima:</strong> {curso.edad_minima} años</p>
                    <p><strong>Edad máxima:</strong> {curso.edad_maxima} años</p>
                    <p><strong>Estado:</strong> {curso.estado}</p>
                </div>
            ) : (
                <div className="form-editar-curso">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                    />

                    <label>Edad mínima:</label>
                    <input
                        type="number"
                        name="edad_minima"
                        value={formData.edad_minima}
                        onChange={handleInputChange}
                    />

                    <label>Edad máxima:</label>
                    <input
                        type="number"
                        name="edad_maxima"
                        value={formData.edad_maxima}
                        onChange={handleInputChange}
                    />

                    <label className="label-estado">
                        Estado:
                        <ToggleSwitch
                            isActive={formData.estado === "activo"}
                            onToggle={handleEstadoToggle}
                        />
                    </label>



                    <div className="acciones-form">
                        <button className="btn-guardar" onClick={handleSubmit}>Guardar</button>
                        <button className="btn-cancelar" onClick={() => setEditando(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            <div className="acciones-curso-detalle-final">
                {!editando && (
                    <>
                        <button className="btn-editar" onClick={() => setEditando(true)}>Editar curso</button>
                        <button className="btn-eliminar" onClick={handleEliminar}>Eliminar curso</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default CursoDetalle;
