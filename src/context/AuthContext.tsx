import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { APITmdbUserResponse } from "../types/authentication.types";

// Se define qué tendrá el context
interface AuthContextType {
  user: APITmdbUserResponse | null;
  sessionId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: APITmdbUserResponse, sessionId: string) => void;
  logout: () => void;
}

// Se crea el context inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Se crea el proveedor
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<APITmdbUserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = () => {
      const storedSession = localStorage.getItem("tmdb_session_id");
      const storedUser = localStorage.getItem("tmdb_user");

      if (storedSession && storedUser) {
        setSessionId(storedSession);
        setUser(JSON.parse(storedUser));
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Función de login para guardar variables en estado y localStorage
  const login = (userData: APITmdbUserResponse, sessionId: string) => {
    setUser(userData);
    setSessionId(sessionId);
    localStorage.setItem("tmdb_session_id", sessionId);
    localStorage.setItem("tmdb_user", JSON.stringify(userData));
  };

  // Función de logout para limpiar variables
  const logout = () => {
    setUser(null);
    localStorage.removeItem("tmdb_session_id");
    localStorage.removeItem("tmdb_account_id");
    localStorage.removeItem("tmdb_user");
    sessionStorage.removeItem("request_token");
  };

  // valores compartidos con toda la APP
  const value = {
    user,
    sessionId,
    isAuthenticated: !!user, // Es true si es que user existe
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Renderizamos los hijos solo cuando terminamos de verificar la sesión */}
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para no usar useContext en cada archivo
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
