export const rolPermisos = {
    admin: [
        "estudiantes",
        "periodos",
        "maestros",
        "cursos",
        "celebraciones",
        "lecciones",
        "asistencias",
        "reportes-estadisticas",
        "salones",
        "gestor-usuario",
    ],
    maestro: ["estudiantes", "cursos", "lecciones", "asistencias", "salones"],
};

const tienePermiso = (rol, seccion) => {
    return rolPermisos[rol]?.includes(seccion);
};

export default tienePermiso;
