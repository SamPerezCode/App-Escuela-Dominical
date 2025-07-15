import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../api/auth/login";
import { useAuth } from "../context/AuthContext";
import "../css/Login.css";

function Login() {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUsuario(usuario, password);
            login(data.user, data.user.token);
            navigate("/dashboard");
        } catch (error) {
            setError(`redenciales incorrectas. Intenta nuevamente. ${error}`);
        }
    };

    return (
        <div className="login-container">


            <form className="login-form" onSubmit={handleSubmit}>
                <h1 className="login-title">ED LGC</h1>
                <div className="login-logo">
                    <img
                        className="logo-login"
                        src="/image/cruz-negro.png"
                        alt="Logo LGC"
                    />
                </div>
                <h1 className="login-title-2">Iniciar Sesión</h1>

                <div className="login-fields">
                    <input
                        className="login-input"
                        type="text"
                        name="usuario"
                        placeholder="Ingresar usuario"
                        required
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                    <input
                        className="login-input"
                        type="password"
                        name="password"
                        placeholder="Ingresar contraseña"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="login-button" type="submit">
                        Ingresar
                    </button>
                </div>

                {error && <p className="login-error">{error}</p>}
            </form>
        </div>
    );
}

export default Login;
