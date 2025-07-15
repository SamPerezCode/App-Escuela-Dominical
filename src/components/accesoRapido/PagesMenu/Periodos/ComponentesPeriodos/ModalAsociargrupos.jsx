import { useEffect, useState } from "react";
import guardarGrupo from "../../../../../api/grupos/guardarGrupo";
import "./ModalAsociarGrupos.css";

function ModalAsociarGrupo({
    isOpen,
    onClose,
    curso,
    celebracionesDisponibles,
    maestrosDisponibles,
    grupos,
    onGuardarGrupo,
    grupoExistente,
}) {
    const [celebracionId, setCelebracionId] = useState("");
    const [maestrosSeleccionados, setMaestrosSeleccionados] = useState([]);

    useEffect(() => {
        if (isOpen) {
            if (grupoExistente) {
                setCelebracionId(grupoExistente.celebracion.id.toString());
                setMaestrosSeleccionados(grupoExistente.maestros.map((m) => m.id));
            } else {
                setCelebracionId("");
                setMaestrosSeleccionados([]);
            }
        }
    }, [isOpen, grupoExistente]);

    if (!isOpen) return null;

    const maestrosFiltrados =
        celebracionId !== ""
            ? maestrosDisponibles.filter((maestro) => {
                const estaEnOtroGrupo = grupos.some((grupo) => {
                    const mismoGrupo = grupoExistente && grupo.id === grupoExistente.id;
                    return (
                        grupo.celebracion.id === parseInt(celebracionId) &&
                        grupo.maestros.some((m) => m.id === maestro.id) &&
                        !mismoGrupo
                    );
                });

                return !estaEnOtroGrupo || maestrosSeleccionados.includes(maestro.id);
            })
            : [];

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

        const datosGrupo = {
            celebracion_id: parseInt(celebracionId),
            curso_periodo_id: curso.curso_periodo_id,
            maestros: maestrosSeleccionados,
        };

        try {
            let result;
            if (grupoExistente) {
                result = await guardarGrupo({ id: grupoExistente.id, ...datosGrupo });
            } else {
                result = await guardarGrupo(datosGrupo);
            }

            if (!result) throw new Error("No se pudo guardar el grupo.");

            alert(grupoExistente ? "Grupo actualizado correctamente." : "Grupo creado correctamente.");
            if (onGuardarGrupo) onGuardarGrupo(result);
            onClose();
        } catch (err) {
            console.error(err);
            alert(err.message || "Error al guardar grupo.");
        }
    };

    return (
        <div className="modal-asociar-grupo__backdrop" onClick={onClose}>
            <div
                className="modal-asociar-grupo__content"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>{grupoExistente ? "Editar grupo" : "Asignar celebración y maestros"}</h2>
                <p>
                    Curso: <strong>{curso.nombre}</strong>
                </p>

                <label>Celebración:</label>
                <select
                    value={celebracionId}
                    disabled={!!grupoExistente}
                    onChange={(e) => {
                        if (!grupoExistente) {
                            setCelebracionId(e.target.value);
                            setMaestrosSeleccionados([]);
                        }
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
                        {grupoExistente ? "Actualizar" : "Guardar"}
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
