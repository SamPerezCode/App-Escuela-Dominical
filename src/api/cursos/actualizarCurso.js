const API_URL = import.meta.env.VITE_API_URL;

const editarCurso = async (id, datos) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_URL}/api/cursos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(datos)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Error al actualizar el curso")
        }
        return result;
    } catch (error) {
        console.error("Error al actualizar curso: ", error);
        return null;
    }
}

export default editarCurso;