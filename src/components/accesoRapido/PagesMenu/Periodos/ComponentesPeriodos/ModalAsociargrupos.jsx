import { useState } from "react";
import crearGrupo from "../../../../../api/grupos/crearGrupo";
import "./ModalAsociarGrupos.css";

function ModalAsociarGrupo({
    isOpen,
    onClose,
    curso,
    celebracionesDisponibles,
    maestrosDisponibles,
    grupos,
    onGuardarGrupo,
}) {
    const [celebracionId, setCelebracionId] = useState("");
    const [maestrosSeleccionados, setMaestrosSeleccionados] = useState([]);

    if (!isOpen) return null;

    // ✅ Filtro solo si hay celebración seleccionada
    const maestrosFiltrados =
        celebracionId !== ""
            ? maestrosDisponibles.filter((maestro) => {
                return !grupos.some(
                    (grupo) =>
                        grupo.celebracion.id === parseInt(celebracionId) &&
                        grupo.maestros.some((m) => m.id === maestro.id)
                );
            })
            : [];

    console.log("✅ Maestros filtrados para celebración:", celebracionId, maestrosFiltrados);

    const handleCheckboxChange = (id) => {
        if (maestrosSeleccionados.includes(id)) {
            setMaestrosSeleccionados((prev) => prev.filter((m) => m !== id));
        } else {
            if (maestrosSeleccionados.length < 2) {
                setMaestrosSeleccionados((prev) => [...prev, id]);
            } else {
                alert("Solo puedes seleccionar máximo 2 maestros.");
            }
        }
    };

    const handleGuardar = async () => {
        if (!celebracionId || maestrosSeleccionados.length === 0) {
            alert("Selecciona una celebración y al menos un maestro.");
            return;
        }

        const grupo = {
            celebracion_id: parseInt(celebracionId),
            curso_periodo_id: curso.curso_periodo_id,
            maestros: maestrosSeleccionados,
        };

        try {
            const creado = await crearGrupo(grupo);
            if (!creado) throw new Error("No se pudo crear el grupo.");

            alert("Grupo asignado correctamente.");
            if (onGuardarGrupo) onGuardarGrupo(grupo);
            onClose();
        } catch (err) {
            console.error(err);
            alert(err.message || "Error al crear grupo.");
        }
    };

    return (
        <div className="modal-asociar-grupo__backdrop">
            <div className="modal-asociar-grupo__content">
                <h2>Asignar celebración y maestros</h2>
                <p>
                    Curso: <strong>{curso.nombre}</strong>
                </p>

                <label htmlFor="celebracion-select">Celebración:</label>
                <select
                    id="celebracion-select"
                    value={celebracionId}
                    onChange={(e) => {
                        setCelebracionId(e.target.value);
                        setMaestrosSeleccionados([]);
                    }}
                >
                    <option value="">-- Selecciona --</option>
                    {celebracionesDisponibles.map((cel) => (
                        <option key={cel.id} value={cel.id}>
                            {cel.nombre}
                        </option>
                    ))}
                </select>

                <div className="modal-asociar-grupo__maestros">
                    {celebracionId === "" ? (
                        <p style={{ fontStyle: "italic", color: "#777" }}>
                            Selecciona primero una celebración.
                        </p>
                    ) : maestrosFiltrados.length > 0 ? (
                        maestrosFiltrados.map((m) => (
                            <label key={m.id} className="modal-asociar-grupo__checkbox">
                                <input
                                    type="checkbox"
                                    checked={maestrosSeleccionados.includes(m.id)}
                                    onChange={() => handleCheckboxChange(m.id)}
                                />
                                {m.nombre}
                            </label>
                        ))
                    ) : (
                        <p style={{ color: "#dc2626" }}>
                            No hay maestros disponibles para esta celebración.
                        </p>
                    )}
                </div>

                <div className="modal-asociar-grupo__acciones">
                    <button className="btn-guardar" onClick={handleGuardar}>
                        Guardar
                    </button>
                    <button className="btn-cerrar" onClick={onClose}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalAsociarGrupo;
