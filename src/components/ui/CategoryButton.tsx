import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type Props = {
  title: string;
  icon: IconDefinition;
  onClick: () => void;
};

function CategoryButton(props: Props) {
  return (
    <div
      className="group flex flex-col items-center gap-2 hover:scale-110 transform transition-transform duration-300 ease-in-out"
      onClick={props.onClick}
    >
      <div
        className="flex flex-col items-center justify-center
                 p-8 sm:p-10 md:px-10 md:py-10
                 bg-gray-800 text-white text-xl font-semibold rounded-full cursor-pointer
                 border-2 border-transparent
                 hover:border-white/80
                 transition-colors duration-300 ease-in-out"
      >
        <button>
          <FontAwesomeIcon
            icon={props.icon}
            size="2x"
            className="sm:text-3xl lg:text-4xl"
          />
        </button>
      </div>
      <p className="text-gray-400 font-bold group-hover:text-white text-sm sm:text-base md:text-lg">
        {props.title}
      </p>
    </div>
  );
}
export default CategoryButton;
