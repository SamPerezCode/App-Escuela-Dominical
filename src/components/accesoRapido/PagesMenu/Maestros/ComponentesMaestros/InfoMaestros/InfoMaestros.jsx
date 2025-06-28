import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "../InfoMaestros/InfoMaestros.css";
import { useMaestros } from "../../../../../../context/MaestrosContext";
import editarMaestro from "../../../../../../api/maestros/editarMaestro";

function InfoMaestro() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/dashboard/maestros";

    const { maestros, recargarMaestros } = useMaestros();
    const [maestro, setMaestro] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);

    const [formData, setFormData] = useState({
        nombre: "",
        telefono: "",
        fecha_nacimiento: "",
        estado: "activo"
    });

    // Responsividad y menú
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
        recargarMaestros();
    }, []);

    useEffect(() => {
        const m = maestros.find(m => m.id === parseInt(id));
        if (m) {
            setMaestro(m);
            setFormData({
                nombre: m.nombre,
                telefono: m.telefono,
                fecha_nacimiento: m.fecha_nacimiento,
                estado: m.estado
            });
        }
    }, [id, maestros]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGuardar = async () => {
        const maestroEditado = {
            ...formData,
            fecha_nacimiento: formData.fecha_nacimiento?.slice(0, 10),
            estado: "activo"
        };
        // ✅ Log para depurar
        console.log("Editando maestro ID:", id);
        console.log("Datos a enviar:", formData);

        const actualizado = await editarMaestro(id, maestroEditado);

        if (actualizado) {
            alert("Maestro actualizado correctamente");
            setMaestro(maestroEditado);
            setModoEdicion(false);
        } else {
            alert("Ocurrió un error al actualizar.");
        }
    };

    const handleCancelarEdicion = () => {
        setFormData(maestro);
        setModoEdicion(false);
    };

    if (!maestro) return <p>Cargando maestro...</p>;

    return (
        <div className="registro-estudiantes">
            <div className="registro-header">
                <h1>Información maestro</h1>

                {/* Acciones escritorio */}
                {!esMovil && (
                    <button className="btn-volver" onClick={() => navigate(from)}>
                        ← Regresar
                    </button>
                )}

                {/* Acciones móvil */}
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
                    <label>Teléfono</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
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
                            <button type="button" className="btn-accion eliminar" onClick={() => alert("Eliminar aún no implementado")}>
                                Eliminar
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}

export default InfoMaestro;
