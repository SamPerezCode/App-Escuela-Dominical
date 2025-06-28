import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAlumnos } from "../context/AlumnosContext";
import { Outlet } from "react-router-dom";

import MenuNavigation from "../components/accesoRapido/MenuNavigation";
import Header from "../components/header/Header";
import PanelAdmin from "../components/panelAdministrativo/PanelAdmin";
import ModalCumpleanios from "../components/panelAdministrativo/components-panel/ModalCumpleanios";

import "../css/Dashboard.css";

function Dashboard() {
    const { user } = useAuth();
    const location = useLocation();
    const { alumnos } = useAlumnos();

    const [mostrarModal, setMostrarModal] = useState(false);
    const [cumplesHoy, setCumplesHoy] = useState([]);

    const estaEnSubRuta =
        location.pathname.startsWith("/dashboard/") &&
        location.pathname !== "/dashboard";

    useEffect(() => {
        if (alumnos.length === 0) return;

        const yaMostrado = sessionStorage.getItem("modalCumpleHoy");
        if (yaMostrado) return;

        const hoy = new Date();
        const hoyStr = hoy.toISOString().slice(5, 10); // "MM-DD"

        const cumpleanieros = alumnos.filter(
            (a) => a.fecha_nacimiento?.slice(5, 10) === hoyStr
        );

        if (cumpleanieros.length > 0) {
            const timer = setTimeout(() => {
                setCumplesHoy(cumpleanieros);
                setMostrarModal(true);
                sessionStorage.setItem("modalCumpleHoy", "true");
                console.log("🎉 Mostrando modal de cumpleaños", cumpleanieros);
            }, 10000); // ⏱️ Espera 10 segundos

            return () => clearTimeout(timer); // 🔒 Limpia si se desmonta antes
        }
    }, [alumnos]);



    if (!user) return null;

    return (
        <>
            <div className="container-Dashboard">
                <div className="conatiner-header-menu">
                    <div className="container-header-movil">
                        <Header user={user} />
                    </div>
                    <div className="container-menu-desktop">
                        <MenuNavigation
                            rol={user.rol}
                            className="menu-navigation-desktop"
                        />
                    </div>
                </div>

                <div className="container-panel">
                    <div className="container-header-desktop">
                        <Header user={user} />
                    </div>

                    <div className="container-menu-movil">
                        <MenuNavigation rol={user.rol} className="menu-navigation-movil" />
                    </div>

                    <div className="container-panelAdmin-dashboard">
                        {estaEnSubRuta ? (
                            <details className="panel-admin-desplegable">
                                <summary>
                                    Panel administrativo
                                    <span className="caret-icon">▼</span>
                                </summary>
                                <PanelAdmin rol={user.rol} />
                            </details>
                        ) : (
                            <div className="panel-admin-fijo">
                                <PanelAdmin rol={user.rol} />
                            </div>
                        )}

                        <div className="contenido-dinamico">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de cumpleaños */}
            {mostrarModal && (
                <ModalCumpleanios
                    cumpleanieros={cumplesHoy}
                    onClose={() => setMostrarModal(false)}
                />
            )}
        </>
    );
}

export default Dashboard;
