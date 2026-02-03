import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import type { Result } from "../../types/movieLists.types";

type Props = {
  onSearch: (text: string) => Result;
};

function SearchBar(props: Props) {
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
        <button className="p-4 bg-gray-50/10  rounded-full">
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
