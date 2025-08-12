import MenuButton from "../ui/MenuButton";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import logoUrl from "../../assets/logo3.png";

function Navbar() {
  return (
    <nav className="flex px-20 h-20 justify-between items-center space-x-4 bg-black shadow-2xl fixed top-0 left-0 right-0 z-50">
      <Link to="/">
        <img src={logoUrl} className="w-40" />
      </Link>
      <div className="flex space-x-14">
        <MenuButton text="Películas" url="#" />
        <MenuButton text="TV Shows" url="#" />
        <MenuButton text="Personas" url="#" />
      </div>

      <div className="flex space-x-3">
        <FontAwesomeIcon
          icon={faPlus}
          className="text-white text-xl cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faUser}
          className="text-white text-xl cursor-pointer"
        />
      </div>
    </nav>
  );
}
export default Navbar;
