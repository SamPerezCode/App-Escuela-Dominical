import { useState, useEffect } from "react";

function useFetch(){
    const [data, setData] = useState(null);

    // Nos permite hacer la petición HTTP
    useEffect(() => {
        fetch(url) // dirección de la API
            .then((response) => response.json) // Nos regresa una promesa y al tener la respuesta la volvemos un JSON
            .then((data) => setData(data)); // Obtenemso al data y la seteamos en el estado
    }, []);

    return data;

}
export default useFetch;