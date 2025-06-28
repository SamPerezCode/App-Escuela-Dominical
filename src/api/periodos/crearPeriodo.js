const API_URL = import.meta.env.VITE_API_URL;

const crearPeriodo = async (data) => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/api/periodos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) throw new Error(result.message);
        return result;

    } catch (error) {
        console.error("Error al crear periodo:", error.message);
        return null;
    }
};

export default crearPeriodo;
