import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type Props = {
  title: string;
  icon: IconDefinition;
  isActive: boolean;
  onClick: () => void;
};

function CategoryButton(props: Props) {
  return (
    <div
      className={`flex flex-col items-center gap-2 cursor-pointer ${
        props.isActive ? "scale-110" : "hover:scale-110"
      } transform transition-transform duration-300 ease-in-out`}
      onClick={props.onClick}
    >
      {/* Círculo */}
      <div
        className={`
          flex items-center justify-center
          w-20 h-20 sm:w-24 sm:h-24 rounded-full
          border-2 transition-all duration-300
          ${
            props.isActive
              ? "bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border-white/30 shadow-lg shadow-cyan-500/20 text-white"
              : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30"
          }
        `}
      >
        <FontAwesomeIcon icon={props.icon} className="text-2xl sm:text-3xl" />
      </div>

      {/* Texto debajo */}
      <p
        className={`font-bold text-sm sm:text-base transition-colors duration-300 ${
          props.isActive ? "text-white" : "text-gray-400 hover:text-white"
        }`}
      >
        {props.title}
      </p>
    </div>
  );
}

export default CategoryButton;
