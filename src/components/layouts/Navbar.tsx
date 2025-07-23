import MenuButton from "../ui/MenuButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import logoUrl from "../../assets/logo.svg";

function Navbar() {
  return (
    <nav className="flex px-20 h-15 items-center justify-between space-x-4 bg-blue-950">
      <div className="flex space-x-4">
        <a href="/" className="flex justify-center">
          <img src={logoUrl} className="w-50" />
        </a>
        <MenuButton text="Movies" url="#" />
        <MenuButton text="TV Shows" url="#" />
        <MenuButton text="People" url="#" />
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
