const API_URL = import.meta.env.VITE_API_URL;

export default async function obtenerCursosPeriodo(periodoId, token) {
    try {
        const response = await fetch(
            `${API_URL}/api/periodos/${periodoId}/cursos`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const result = await response.json();

        if (!response.ok)
            throw new Error(result.message || "Error al obtener cursos del periodo");
        return result;
    } catch (error) {
        console.error("Error en obtenerCursosPeriodo:", error);
        return null;
    }
}
