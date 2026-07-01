import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAdmin } = useContext(AuthContext);

  return isAdmin ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;