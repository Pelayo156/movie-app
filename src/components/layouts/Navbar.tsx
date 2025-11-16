// src/components/Navbar.tsx
import React, { useState } from "react"; // Importa useState
import MenuButton from "../ui/MenuButton";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlus,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"; // Importa faBars y faTimes
import logoUrl from "../../assets/logo3.png";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para el menú móvil

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="flex px-4 md:px-10 lg:px-20 h-20 justify-between items-center bg-black shadow-2xl fixed top-0 left-0 right-0 z-50">
      <Link to="/" onClick={closeMobileMenu}>
        {" "}
        {/* Cierra el menú si se hace clic en el logo */}
        <img src={logoUrl} className="w-32 md:w-40" alt="Logo" />{" "}
        {/* Ajuste de tamaño de logo para responsividad */}
      </Link>

      {/* Ícono de Hamburguesa (visible solo en pantallas pequeñas) */}
      <div className="md:hidden flex items-center space-x-3">
        {/* Íconos de usuario y añadir (visibles en móvil también) */}
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

      {/* Menú de Navegación Principal (oculto en pantallas pequeñas, visible en medianas y grandes) */}
      <div className="hidden md:flex flex-grow justify-center space-x-8 lg:space-x-14">
        {" "}
        {/* flex-grow para centrar */}
        <MenuButton text="Películas" url="/movies" />
        <MenuButton text="TV Shows" url="/tv" />
        <MenuButton text="Personas" url="#" />
      </div>

      {/* Íconos de Usuario y Añadir (ocultos en pantallas pequeñas si ya se muestran en el menú hamburguesa, o visibles en medianas y grandes) */}
      {/* Decidí moverlos al lado del ícono de hamburguesa para móviles */}
      <div className="hidden md:flex space-x-3">
        {" "}
        {/* Solo visible en md y mayores */}
        <FontAwesomeIcon
          icon={faPlus}
          className="text-white text-xl cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faUser}
          className="text-white text-xl cursor-pointer"
        />
      </div>

      {/* Menú Desplegable para Móviles (aparece al hacer clic en la hamburguesa) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black flex flex-col items-center py-4 shadow-lg z-40">
          <MenuButton
            text="Películas"
            url="/movies"
            onClick={closeMobileMenu}
          />
          <MenuButton text="TV Shows" url="#" onClick={closeMobileMenu} />
          <MenuButton text="Personas" url="#" onClick={closeMobileMenu} />
          {/* Opcional: Puedes incluir aquí los iconos de usuario y añadir si no los pusiste al lado de la hamburguesa */}
          {/*
          <div className="flex space-x-4 mt-4">
              <FontAwesomeIcon icon={faPlus} className="text-white text-xl cursor-pointer" onClick={closeMobileMenu} />
              <FontAwesomeIcon icon={faUser} className="text-white text-xl cursor-pointer" onClick={closeMobileMenu} />
          </div>
          */}
        </div>
      )}
    </nav>
  );
}
export default Navbar;
