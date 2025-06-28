const API_URL = import.meta.env.VITE_API_URL;

const registrarMaestro = async (datos) => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}/api/maestros`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(datos)
        });
        
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Error al registrar maestro")
        }

        return result;
        
    } catch (error) {
        console.error("Error registrado maestro: ", error);
        return null
    }

}

export default registrarMaestro;

/*
Content-Type: application/json
→ Le dice al servidor que estás enviando un cuerpo en formato JSON.

Authorization: Bearer <token>
→ Necesario para que el backend reconozca que estás autenticado.

JSON.stringify(datos)
→ Convierte un objeto JS a string para enviarlo en el body de la petición.
*/
