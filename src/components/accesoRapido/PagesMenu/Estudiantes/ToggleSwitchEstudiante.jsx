import React from 'react';
import './ToggleSwitchEstudiante.css';

function ToggleSwitch({ isActive, onToggle }) {
    return (
        <label className="switch-toggle">
            <input
                type="checkbox"
                checked={isActive}
                onChange={onToggle} // por ahora no hace nada
            // disabled // 👈 Deshabilitado porque aún no hay backend
            />
            <span className="slider-toggle round"></span>
        </label>
    );
}

export default ToggleSwitch;
