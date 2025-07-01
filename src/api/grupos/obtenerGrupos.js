// api/grupos/obtenerGrupos.js
const API_URL = import.meta.env.VITE_API_URL;

export default async function obtenerGrupos(token) {
    try {
        const response = await fetch(`${API_URL}/api/grupos`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (!response.ok) throw new Error(result.message || "Error al obtener grupos");
        return result;
    } catch (err) {
        console.error("Error al obtener grupos:", err);
        return null;
    }
}
