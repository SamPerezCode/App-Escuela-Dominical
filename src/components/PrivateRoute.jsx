import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null; // o <Spinner />

    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
