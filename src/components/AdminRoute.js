import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user } = useAuth();

  // not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // not admin
  if (user !== "admin@gmail.com") {
    return <Navigate to="/" />;
  }

  // allowed
  return children;
}