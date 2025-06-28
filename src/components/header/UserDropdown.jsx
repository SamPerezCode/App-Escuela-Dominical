import { useState, useRef, useEffect } from "react";
import "./UserDropdown.css";

function UserDropdown({ user, onCerrarSesion }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Función para obtener iniciales del nombre
    const getIniciales = (user) => {
        if (!user) return null;

        if (user.nombre) {
            const palabras = user.nombre.trim().split(" ");
            if (palabras.length === 1) {
                return palabras[0].slice(0, 2).toUpperCase();
            }
            return (palabras[0][0] + palabras[1][0]).toUpperCase();
        }

        if (user.username) {
            const partes = user.username.split(".");
            if (partes.length === 1) {
                return partes[0].slice(0, 2).toUpperCase();
            }
            return (partes[0][0] + partes[1][0]).toUpperCase();
        }

        return null;
    };



    return (
        <div id="avatar" ref={dropdownRef}>
            <div
                className="avatar-iniciales"
                onClick={() => setIsOpen(!isOpen)}
            >
                {getIniciales(user)}
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    <p><strong>{user.username}</strong></p>
                    <p className="user-role">{user.rol}</p>
                    <hr />
                    {/* <button onClick={onVerPerfil} className="dropdown-btn">Ver perfil</button> */}
                    <button onClick={onCerrarSesion} className="dropdown-btn">Cerrar sesión</button>
                </div>
            )}
        </div>
    );
}

export default UserDropdown;
