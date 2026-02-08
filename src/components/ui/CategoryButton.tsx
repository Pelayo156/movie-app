import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type Props = {
  title: string;
  icon: IconDefinition;
  isActive: boolean;
  onClick: () => void;
};

function CategoryButton(props: Props) {
  // Variable para guardar estilos en caso de que la categoría no esté activa
  const noActiveStyles =
    "border-transparent hover:border-white/80 transition-colors duration-300 ease-in-out";

  // Variable para guardar estilos en caso de que la categoría no esté activa
  const activeStyles = "border-white/80 transition-colors";
  return (
    <div
      className={`group flex flex-col items-center gap-2 ${
        props.isActive ? "scale-110" : "hover:scale-110"
      } hover:scale-110 transform transition-transform duration-300 ease-in-out`}
      onClick={props.onClick}
    >
      <div
        className={`flex flex-col items-center justify-center
                 p-8 sm:p-10 md:px-10 md:py-10
                 bg-gray-800 text-white text-xl font-semibold rounded-full cursor-pointer
                 border-2 ${props.isActive ? activeStyles : noActiveStyles}`}
      >
        <button>
          <FontAwesomeIcon
            icon={props.icon}
            size="2x"
            className="sm:text-3xl lg:text-4xl"
          />
        </button>
      </div>
      <p
        className={`text-gray-400 font-bold ${
          props.isActive ? "text-white" : "group-hover:text-white"
        } text-sm sm:text-base md:text-lg`}
      >
        {props.title}
      </p>
    </div>
  );
}
export default CategoryButton;
