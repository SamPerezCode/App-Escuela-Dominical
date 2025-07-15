import React from "react";
import "./ToggleSwitch.css";

function ToggleSwitch({ isActive, onToggle }) {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isActive} onChange={onToggle} />
      <span className="toggle-slider"></span>
    </label>
  );
}

export default ToggleSwitch;
