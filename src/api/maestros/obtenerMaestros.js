const API_URL = import.meta.env.VITE_API_URL;

const obtenerMaestros = async (token) => {
    try {
        const response = await fetch(`${API_URL}/api/maestros`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener los maestros");
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener maestros: ", error);
        return [];
    }
};

export default obtenerMaestros;
