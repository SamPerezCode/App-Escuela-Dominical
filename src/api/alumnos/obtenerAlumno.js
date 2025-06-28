export async function obtenerAlumno(id) {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/alumnos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Si la respuesta no es JSON válida o da error 404:
        if (!response.ok) {
            const textoPlano = await response.text(); // intentar leer como texto
            console.error("Respuesta no válida:", textoPlano);
            throw new Error(`Error al obtener alumno: ${response.status}`);
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error al obtener alumno:", error);
        return null;
    }
}
