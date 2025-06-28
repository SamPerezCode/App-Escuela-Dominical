// src/utils/calcularEdad.js

/**
 * Calcula la edad en años según la fecha de nacimiento.
 * @param {string | Date} fechaNacimiento - Fecha en formato ISO o Date
 * @returns {number} Edad en años
 */
export function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    return edad;
}
