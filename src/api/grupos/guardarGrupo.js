

const API_URL = import.meta.env.VITE_API_URL;

export default async function guardarGrupo(grupo) {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/api/grupos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(grupo),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Error al guardar grupo");
        }

        return result; // Devuelve la respuesta
    } catch (error) {
        console.error("Error guardando grupo:", error);
        return null;
    }
}
