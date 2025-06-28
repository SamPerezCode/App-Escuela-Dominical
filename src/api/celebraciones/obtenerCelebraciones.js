const API_URL = import.meta.env.VITE_API_URL;

const obtenerCelebraciones = async (token) => {
    try {
        const res = await fetch(`${API_URL}/api/celebraciones`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        if (!res.ok) throw new Error("Error al obtener celebraciones");

        return await res.json();
    } catch (error) {
        console.error("Error al obtener celebraciones:", error);
        return { data: [] };
    }
};

export default obtenerCelebraciones;
