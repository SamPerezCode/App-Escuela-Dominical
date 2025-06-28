const API_URL = import.meta.env.VITE_API_URL;

export async function eliminarAlumno(id) {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/api/alumnos/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Error al eliminar alumno");
        }

        return result;
    } catch (error) {
        console.error("Error eliminando alumno:", error);
        return null;
    }
}
