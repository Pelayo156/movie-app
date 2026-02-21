import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

function ProtectedRoute({ children, redirectTo = "/" }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  // Si no está autenticado, redirige a página de inicio
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si está autenticado, muestra el contenido
  return <>{children}</>;
}

export default ProtectedRoute;
