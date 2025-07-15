const API_URL = import.meta.env.VITE_API_URL;

const registrarCurso = async (datos) => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/api/cursos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(datos)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Error al registrar curso")
        }

        return result;

    } catch (error) {
        console.error("Error registrado curso: ", error);
        return null
    }

}

export default registrarCurso;