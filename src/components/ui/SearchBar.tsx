import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onSearch: (text: string, isFirstSearch: boolean) => void;
};

function SearchBar(props: Props) {
  const handleSearch = () => {
    const input = document.getElementById("search") as HTMLInputElement;
    const searchText = input?.value || "";
    props.onSearch(searchText, true);
  };

  return (
    // En móvil: padding lateral generoso. En desktop: grid centrado como antes
    <div className="mt-8 md:mt-10 flex items-center gap-3 px-4 sm:px-10 md:px-0 md:grid md:grid-cols-6 md:gap-4">
      {/* Input: ancho completo en móvil, col-span-4 centrado en desktop */}
      <input
        type="text"
        id="search"
        name="search"
        className="flex-1 md:col-span-4 md:col-start-2 w-full p-3 md:p-4 rounded-full bg-gray-50/10 text-white font-light"
      />
      {/* Botón: se mantiene junto al input sin pegarse al borde */}
      <div className="flex items-center md:col-span-1">
        <button
          className="p-3 md:p-4 bg-gray-50/10 rounded-full border-2 border-transparent 
                     hover:border-2 hover:border-white/80 hover:scale-105 
                     ease-in-out transition-colors duration-200"
          onClick={handleSearch}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg md:text-xl text-white" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
