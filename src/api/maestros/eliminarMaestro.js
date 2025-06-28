const API_URL = import.meta.env.VITE_API_URL;

const eliminarMaestro = async (id) => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/api/maestros/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

        const result = await response.json();

        if(!response.ok) {
            throw new Error("Error al eliminar maestro")
        }

        return result;

    } catch (error) {
        console.error("Error al eliminar maestro", error);
        return null;
    }
}

export default eliminarMaestro;