const API_URL = import.meta.env.VITE_API_URL;


const obtenerPeriodos = async (token) => {
    try {
        const response = await fetch(`${API_URL}/api/periodos`, {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Error al obtener los periodos");
        }

        return await response.json();
    } catch (error) {
        console.log("Error al obtener los periodos", error);
        return null;
    }
}

export default obtenerPeriodos;