const API_URL = import.meta.env.VITE_API_URL;

export async function editarAlumno(id, datos) {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/api/alumnos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(datos)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Error al actualizar alumno");
        }

        return result;
    } catch (error) {
        console.error("Error actualizando alumno:", error);
        return null;
    }
}
