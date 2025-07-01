const API_URL = import.meta.env.VITE_API_URL;

export default async function eliminarGrupo(id) {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/api/grupos/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message || "Error al eliminar el grupo");
        }

        return true;
    } catch (err) {
        console.error("Error al eliminar grupo:", err);
        return false;
    }
}
