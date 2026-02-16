// src/components/Navbar.tsx
import { useEffect, useState } from "react"; // Importa useState
import MenuButton from "../ui/MenuButton";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlus,
  faBars,
  faTimes,
  faRightToBracket,
  faHeart,
  faRightFromBracket,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons"; // Importa faBars y faTimes
import logoUrl from "../../assets/logo3.png";
import { authenticationService } from "../../services/authenticationService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, sessionId, isAuthenticated, logout } = useAuth();

  // Estado para el menú móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Variable para guardar estado de menú para ícono de usuario
  const [isUserOpen, setIsUserOpen] = useState<boolean>(false);

  // Variable para guardar estado de modal para confirmar cierre de sesión
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);

  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const login = async () => {
    try {
      // Se pide un token de ingreso
      const response = await authenticationService.createRequestToken();

      if (!response || !response.request_token) {
        console.error("No se pudo obtener el token");
        return;
      }

      // Se guarda token en localStorage
      sessionStorage.setItem("request_token", response.request_token);

      // URL de retorno
      const redirectUrl = window.location.origin + "/auth/callback";

      console.log(
        `https://www.themoviedb.org/authenticate/${response.request_token}?redirect_to=${redirectUrl}`,
      );

      // Se redirige al usuario a login de TMDB para validar el token
      window.location.href = `https://www.themoviedb.org/authenticate/${response.request_token}?redirect_to=${redirectUrl}`;
    } catch (error) {
      console.error("Error en login: ", error);
    }
  };

  // Función manejadora para iniciar el proceso de logout
  const handleLogoutClick = () => {
    setIsUserOpen(false);
    setShowLogoutConfirm(true);
  };

  const handleLogout = async () => {
    var response;
    try {
      // Se llama a endpoit para eliminar la sesión del usuario
      response = await authenticationService.deleteSession(
        sessionId ? sessionId : "",
      );
    } catch (err) {
      toast.error("Error al cerrar sesión");
      setShowLogoutConfirm(false);
      return;
    }

    if (response.success) {
      // Se sacan variables de sesión del localStorage
      logout();

      toast.success("Sesión cerrada correctamente");
      setShowLogoutConfirm(false);
      navigate("/");
    }
  };

  return (
    <nav className="flex px-4 md:px-10 lg:px-20 h-20 justify-between items-center bg-black shadow-2xl fixed top-0 left-0 right-0 z-50">
      <Link to="/" onClick={closeMobileMenu}>
        <img src={logoUrl} className="w-32 md:w-40" alt="Logo" />
      </Link>

      <div className="md:hidden flex items-center space-x-3">
        <FontAwesomeIcon
          icon={faPlus}
          className="text-white text-xl cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faUser}
          className="text-white text-xl cursor-pointer"
        />
        <button
          onClick={toggleMobileMenu}
          className="text-white text-2xl focus:outline-none"
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
          {/* Cambia el ícono según el estado */}
        </button>
      </div>

      <div className="hidden md:flex flex-grow justify-center space-x-8 lg:space-x-14">
        <MenuButton text="Películas" url="/movies" />
        <MenuButton text="TV Shows" url="/tv" />
        <MenuButton text="Celebridades" url="/celebrities" />
      </div>

      <div className="hidden md:flex space-x-3">
        {isAuthenticated ? (
          <div>
            <FontAwesomeIcon
              icon={faUser}
              className="text-white text-xl cursor-pointer hover:text-gray-300"
              onClick={() => setIsUserOpen(!isUserOpen)}
            />

            {isUserOpen && (
              <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-lg bg-black shadow-xl ring-1 ring-black ring-opacity-5 border border-gray-700 animate-in fade-in zoom-in-95 duration-100">
                {/* Encabezado del menú */}
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="truncate text-sm font-medium text-white">
                    {user?.username || "Usuario"}
                  </p>
                </div>

                {/* Opciones de Navegación */}
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="group flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={() => setIsUserOpen(false)} // Cerrar al hacer click
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      className="mr-3 h-4 w-4 text-gray-400"
                    />
                    Mi Perfil
                  </Link>

                  <Link
                    to="#"
                    className="group flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={() => setIsUserOpen(false)}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="mr-3 h-4 w-4 text-gray-400"
                    />
                    Favoritos
                  </Link>
                </div>

                {/* Separador y Logout */}
                <div className="border-t border-gray-700 py-1">
                  <button
                    onClick={handleLogoutClick}
                    className="group flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className="mr-3 h-4 w-4 text-gray-400"
                    />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <FontAwesomeIcon
            icon={faRightToBracket}
            className="text-white text-xl cursor-pointer hover:text-gray-300"
            onClick={login}
          />
        )}
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black flex flex-col items-center py-4 shadow-lg z-40">
          <MenuButton
            text="Películas"
            url="/movies"
            onClick={closeMobileMenu}
          />
          <MenuButton text="TV Shows" url="/tv" onClick={closeMobileMenu} />
          <MenuButton
            text="Celebridades"
            url="/celebrities"
            onClick={closeMobileMenu}
          />
        </div>
      )}

      {/* --- MODAL DE CONFIRMACIÓN CIERRE DE SESIÓN --- */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop (Fondo oscuro borroso) */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowLogoutConfirm(false)}
          ></div>

          {/* Caja del Modal */}
          <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl bg-gray-900 border border-gray-700 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              {/* Ícono de alerta */}
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-900/30">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="h-6 w-6 text-red-500"
                />
              </div>

              <h3 className="mb-2 text-lg font-bold text-white">
                ¿Cerrar sesión?
              </h3>
              <p className="text-sm text-gray-400">
                ¿Estás seguro de que quieres salir de tu cuenta? Tendrás que
                volver a ingresar tus credenciales.
              </p>
            </div>

            {/* Botones de Acción */}
            <div className="grid grid-cols-2 gap-px bg-gray-700 border-t border-gray-700">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="block w-full py-3 text-sm font-semibold text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="block w-full py-3 text-sm font-bold text-red-500 hover:bg-red-950/30 hover:text-red-400 transition-colors"
              >
                Sí, Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
export default Navbar;
