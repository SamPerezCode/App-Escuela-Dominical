import { createContext, useContext, useState, useEffect } from "react";

// 1. Crear el contexto
const AuthContext = createContext();

// 2. Hook personalizado para acceder al contexto
export const useAuth = () => useContext(AuthContext);

// 3. Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Usuario autenticado
    const [token, setToken] = useState(null); // Token JWT
    const [loading, setLoading] = useState(true); // ⬅️ NUEVO: controla carga inicial

    // 4. Cargar token y usuario desde localStorage al iniciar
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }

        setLoading(false); // ⬅️ Una vez verificado, marcamos como cargado
    }, []);

    // 5. Login (guardar usuario y token)
    const login = (userData, token) => {
        const userWithRole = { ...userData, rol: "admin" }; // ⚠️ Temporal
        setUser(userWithRole);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(userWithRole));
        localStorage.setItem("token", token);

        // ✅ Cuando el backend ya devuelva el rol, simplemente usar:
        // setUser(userData);
        // localStorage.setItem("user", JSON.stringify(userData));
    };

    // 6. Logout (cerrar sesión y limpiar todo)
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        sessionStorage.removeItem("modalCumpleHoy");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                loading, // ⬅️ importante para PrivateRoute
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};



