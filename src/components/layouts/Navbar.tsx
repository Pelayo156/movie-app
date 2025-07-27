import MenuButton from "../ui/MenuButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import logoUrl from "../../assets/logo3.png";

function Navbar() {
  return (
    <nav className="flex px-20 h-20 justify-between items-center space-x-4 bg-black shadow-2xl">
      <a href="/">
        <img src={logoUrl} className="w-40" />
      </a>
      <div className="flex space-x-15">
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
