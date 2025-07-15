import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCursos } from "../../../../context/CursosContext";
import "./RegistrarCurso.css";


function RegistrarCurso() {
    const navigate = useNavigate();
    const { registrarCurso } = useCursos();
    const [esMovil, setEsMovil] = useState(window.innerWidth < 640);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const dropdownRef = useRef(null);

    const [formData, setFormData] = useState({
        nombre: "",
        edad_minima: "",
        edad_maxima: "",
    });

    // ✅ Manejadores de pantalla y clic afuera
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoCurso = {
            nombre: formData.nombre,
            edad_minima: parseInt(formData.edad_minima),
            edad_maxima: parseInt(formData.edad_maxima)
        };

        const resultado = await registrarCurso(nuevoCurso);

        if (resultado) {
            alert("Curso creado correctamente ✅");
            navigate("/dashboard/cursos");
        } else {
            alert("Hubo un error al crear el curso");
        }
    };



    return (
        <div className="registro-curso">
            <div className="header-registro-curso">
                <h1>Registrar nuevo curso</h1>

                <div className="acciones-header-curso" ref={dropdownRef}>
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

            <form className="formulario-curso" onSubmit={handleSubmit}>
                <label>Nombre del curso *</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Adolescentes"
                />

                <label>Edad mínima *</label>
                <input
                    type="number"
                    name="edad_minima"
                    value={formData.edad_minima}
                    onChange={handleChange}
                    required
                    placeholder="Ej: 13"
                />

                <label>Edad máxima *</label>
                <input
                    type="number"
                    name="edad_maxima"
                    value={formData.edad_maxima}
                    onChange={handleChange}
                    required
                    placeholder="Ej: 14"
                />

                <div className="acciones-form">
                    <button type="submit" className="btn-guardar">Guardar</button>
                    <button type="button" className="btn-cancelar" onClick={() => navigate("/dashboard/cursos")}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegistrarCurso;
