import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../api/auth/login";
import { useAuth } from "../context/AuthContext";
import "../css/Login.css";




function Login() {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Usuario:", usuario);
        // console.log("Password:", password);
        try {
            const data = await loginUsuario(usuario, password);

            login(data.user, data.user.token);

            console.log(`${data.user.username} logueado`)
            navigate("/dashboard")
        } catch (error) {
            setError("Credenciales incorrectas. Intenta nuevamente.")
        }
    };

    return (
        <>
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1 className="login-title">Iniciar Sesión</h1>

                    <div className="login-fields">
                        <input
                            className="login-input"
                            type="text"
                            name="usuario"
                            placeholder="Ingresar username"
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
                    {error && <p className="login-error">{error} </p>}
                </form>
            </div>
        </>
    );
}

export default Login;
