// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login to access this page.");
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
