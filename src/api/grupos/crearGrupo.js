// src/api/grupos/crearGrupo.js

const API_URL = import.meta.env.VITE_API_URL;

export default async function crearGrupo(grupo) {
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
            throw new Error(result.message || "Error al crear grupo");
        }

        return result; // Devuelve la respuesta para manejarla en el modal
    } catch (error) {
        console.error("Error creando grupo:", error);
        return null;
    }
}
