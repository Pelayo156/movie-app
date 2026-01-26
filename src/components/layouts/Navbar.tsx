// src/components/Navbar.tsx
import { useState } from "react"; // Importa useState
import MenuButton from "../ui/MenuButton";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlus,
  faBars,
  faTimes,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons"; // Importa faBars y faTimes
import logoUrl from "../../assets/logo3.png";
import { authenticationService } from "../../services/authenticationService";
import type { APITmdbCreateNewTokenResponse } from "../../types/authentication.types";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para el menú móvil

  const [requestToken, setRequestToken] =
    useState<APITmdbCreateNewTokenResponse>();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const login = async () => {
    // Se pide un token de ingreso
    const response = await authenticationService.createRequestToken();
    setRequestToken(response);

    // Se guarda token en localStorage
    sessionStorage.setItem("request_token", response.request_token);
  };

  return (
    <nav className="flex px-4 md:px-10 lg:px-20 h-20 justify-between items-center bg-black shadow-2xl fixed top-0 left-0 right-0 z-50">
      <Link to="/" onClick={closeMobileMenu}>
        {" "}
        <img src={logoUrl} className="w-32 md:w-40" alt="Logo" />{" "}
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
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />{" "}
          {/* Cambia el ícono según el estado */}
        </button>
      </div>

      <div className="hidden md:flex flex-grow justify-center space-x-8 lg:space-x-14">
        {" "}
        <MenuButton text="Películas" url="/movies" />
        <MenuButton text="TV Shows" url="/tv" />
        <MenuButton text="Celebridades" url="/celebrities" />
      </div>

      <div className="hidden md:flex space-x-3">
        {" "}
        <FontAwesomeIcon
          icon={faRightToBracket}
          className="text-white text-xl cursor-pointer hover:text-gray-300"
          onClick={login}
        />
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
    </nav>
  );
}
export default Navbar;
