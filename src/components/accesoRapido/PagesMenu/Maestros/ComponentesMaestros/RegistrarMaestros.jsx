import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import registrarMaestro from "../../../../../api/maestros/crearMaestro";
import "./RegistrarMaestro.css";
import { usePeriodos } from "../../../../../context/PeriodosContext";

function RegistrarMaestro() {
    const { recargarPeriodos } = usePeriodos();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/dashboard/maestros";

    const [formData, setFormData] = useState({
        nombre: "",
        telefono: "",
        fecha_nacimiento: "",
        estado: "activo",
    });

    const [esMovil, setEsMovil] = useState(window.innerWidth < 640);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        recargarPeriodos();
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
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const maestroARegistrar = {
            nombre: formData.nombre,
            telefono: formData.telefono,
            fecha_nacimiento: formData.fecha_nacimiento,
            estado: "activo",
        };

        const exito = await registrarMaestro(maestroARegistrar);

        if (exito) {
            // ⚡ Refresca periodos y guarda la respuesta
            const activo = await recargarPeriodos();

            const confirmar = window.confirm(
                "✅ Maestro registrado correctamente.\n\n⚡ Para asociar este maestro a un curso y celebración, utiliza la vista Periodos.\n\n¿Quieres ir ahora?"
            );

            console.log("🚦 Periodo activo disponible:", activo);

            if (confirmar) {
                if (activo && activo.id) {
                    navigate(`/dashboard/periodos/${activo.id}`);
                } else {
                    alert("❌ No hay periodo activo detectado. Redirígete manualmente.");
                    navigate("/dashboard/periodos");
                }
            } else {
                navigate(from);
            }
        } else {
            alert("❌ Error al registrar maestro");
        }
    };




    return (
        <div className="registro-maestro">
            <div className="header-registro">
                <div className="title-registro">
                    <h1>Registrar maestro</h1>

                    <div className="acciones-maestros" ref={menuRef}>
                        {/* Botón volver escritorio */}
                        {!esMovil && (
                            <button
                                className="btn-volver-maestro"
                                onClick={() => navigate(from)}
                            >
                                ← Regresar
                            </button>
                        )}

                        {/* Menú móvil */}
                        <img
                            src="/image/menu-vertical.svg"
                            alt="Opciones"
                            className="menu-icon"
                            onClick={() => setMenuAbierto(!menuAbierto)}
                        />

                        {menuAbierto && (
                            <ul className="dropdown-opciones">
                                {esMovil && (
                                    <li onClick={() => navigate(from)}>← Regresar</li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <form className="registro-formulario-maestro" onSubmit={handleSubmit}>
                <div className="campo-formulario">
                    <label>Nombre completo</label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre completo"
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
                        placeholder="Teléfono del maestro"
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

                <div className="acciones-bottom">
                    <button type="submit" className="btn-accion guardar">
                        Registrar maestro
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

export default RegistrarMaestro;
