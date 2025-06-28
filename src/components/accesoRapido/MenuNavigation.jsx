import "../accesoRapido/menuNavigation.css";
import { useAuth } from "../../context/AuthContext";
import tienePermiso from "../../constants/rolesPermisos";
import { Link } from "react-router-dom";

const secciones = [
    { id: "estudiantes", label: "Estudiantes", icon: "/image/studens.svg" },
    { id: "periodos", label: "Periodos", icon: "/image/period.svg" },
    { id: "maestros", label: "Maestros", icon: "/image/teacher.svg" },
    { id: "cursos", label: "Cursos", icon: "/image/cours.svg" },
    { id: "celebraciones", label: "Celebraciones", icon: "/image/church.svg" },
    { id: "lecciones", label: "Lecciones", icon: "/image/lessons.svg" },
    { id: "asistencias", label: "Asistencias", icon: "/image/assists.svg" },
    { id: "salones", label: "Salones", icon: "/image/classroom.svg" },
    { id: "reportes-estadisticas", label: "Reportes y estadísticas", icon: "/image/reports-statistics.svg" },
    { id: "gestor-usuario", label: "Gestor de usuario", icon: "/image/user.svg" },
];



function MenuNavigation() {
    const { user } = useAuth();
    // console.log("Usuario en MenuNavigation:", user);
    // Esperar a que el usuario esté cargado
    if (!user) {
        return null; // o un loader si prefieres
    }
    // const duplicados = secciones
    //     .map(sec => sec.id)
    //     .filter((id, index, self) => self.indexOf(id) !== index);
    // console.log("Duplicados:", duplicados);

    // console.log(secciones.map(sec => sec.id));


    return (
        <div className="container-acceso-rapido">
            <nav className="menu-principal">
                <ul>
                    {secciones.map((sec) =>
                        tienePermiso(user?.rol, sec.id) ? (
                            <li key={sec.id}>
                                <Link to={`/dashboard/${sec.id}`}>
                                    <img src={sec.icon} alt={sec.label} /> {sec.label}
                                </Link>
                            </li>
                        ) : null
                    )}
                </ul>
            </nav>
        </div>
    );
}





export default MenuNavigation;
