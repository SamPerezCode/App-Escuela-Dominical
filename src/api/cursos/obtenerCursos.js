const API_URL = import.meta.env.VITE_API_URL;

const obtenerCursos = async (token) => {
    try {
        const res = await fetch(`${API_URL}/api/cursos`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        if (!res.ok) throw new Error("Error al obtener cursos");
        

        return await res.json();
    } catch (error) {
        console.error("Error al obtener cursos:", error);
        return { data: [] };
    }
};

export default obtenerCursos;
