
import "./ModalCumpleanios.css";

function ModalCumpleanios({ cumpleanieros, onClose }) {
    return (
        <div className="modal-cumple-overlay">
            <div className="modal-cumple-content">
                <h2>🎉 ¡Cumpleaños hoy!</h2>
                <ul>
                    {cumpleanieros.map((est) => (
                        <li key={est.id}>
                            {est.nombre} - 🎂 {est.fecha_nacimiento?.slice(0, 10)}
                        </li>
                    ))}
                </ul>
                <button onClick={onClose} className="btn-cerrar">Cerrar</button>
            </div>
        </div>
    );
}

export default ModalCumpleanios;
