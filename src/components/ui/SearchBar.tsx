import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onSearch: (text: string, isFirstSearch: boolean) => void;
};

function SearchBar(props: Props) {
  //Función para enviar lo que escribió el usuario en el inputText a la función de búsqueda correspondiente
  const handleSearch = () => {
    // Obtener valor del input
    const input = document.getElementById("search") as HTMLInputElement;
    const searchText = input?.value || "";

    // Se llama a la función entregada en las props para hacer la búsqueda
    props.onSearch(searchText, true);
  };

  return (
    <div className="mt-10 grid grid-cols-6 gap-4">
      {/* BUSCADOR */}
      <div className="col-span-4 col-start-2">
        <input
          type="text"
          id="search"
          name="search"
          className="w-full p-4 rounded-full bg-gray-50/10 text-white font-light"
        />
      </div>
      <div className="col-span-1 flex items-center">
        <button
          className="p-4 bg-gray-50/10  rounded-full"
          onClick={handleSearch}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-xl text-white"
          />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
