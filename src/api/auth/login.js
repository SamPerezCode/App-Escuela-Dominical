const API_URL = import.meta.env.VITE_API_URL;

export async function loginUsuario(username, password) {
    try {
        const response = await fetch(`${API_URL}/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password})
        });

        if (!response.ok) {
            throw new Error("Error en las credenciales")
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        throw Error;
        
    }
}