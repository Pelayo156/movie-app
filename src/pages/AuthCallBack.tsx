import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticationService } from "../services/authenticationService";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function AuthCallBack() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const requestToken = params.get("request_token");
        const approved = params.get("approved");

        console.log("Token:", requestToken);
        console.log("¿Aprobado?:", approved);

        // Verificar que esté aprobado y tenga token
        if (approved !== "true" || !requestToken) {
          setError("Autenticación cancelada o token inválido");
          setIsLoading(false);
          return;
        }

        // 1. Crear sesión con token aprobado
        const sessionData =
          await authenticationService.createSession(requestToken);

        if (!sessionData.success) {
          throw new Error("No se pudo crear la sesión");
        }

        const sessionId = sessionData.session_id;

        // 2. Se obtiene información del usuario con sessionId recibida
        const userData =
          await authenticationService.getAccountDetails(sessionId);

        // 3. Guardar información de usuario en context y localStorage
        login(userData, sessionId);
        console.log("Autenticación exitosa");

        // 4. Se envía mensaje de éxito y se redirige a usuario a página principal
        toast.success("Sesión iniciada correctamente");
        navigate("/");
      } catch (error) {
        console.error("Error en autenticación: ", error);
        setIsLoading(false);
      }
    };

    handleAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        {isLoading && !error && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white text-xl">Procesando autenticación...</p>
          </>
        )}

        {error && (
          <>
            <p className="text-red-500 text-xl mb-4">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Volver a intentar
            </button>
          </>
        )}

        {!isLoading && !error && (
          <p className="text-green-500 text-xl">Autenticación exitosa</p>
        )}
      </div>
    </div>
  );
}
export default AuthCallBack;
