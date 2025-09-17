import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type Props = {
  title: string;
  icon: IconDefinition;
};

function CategoryButton(props: Props) {
  return (
    <div className="group flex flex-col items-center gap-2 hover:scale-110 transform transition-transform duration-300 ease-in-out">
      <div
        className="flex flex-col px-10 py-12 bg-gray-800 text-white text-xl font-semibold rounded-full cursor-pointer
                 border-2 border-transparent
                 hover:border-white/80
                 transition-colors duration-300 ease-in-out"
      >
        <button>
          <FontAwesomeIcon icon={props.icon} size="3x" />
        </button>
      </div>
      <p className="text-gray-400 font-bold group-hover:text-white">{props.title}</p>
    </div>
  );
}
export default CategoryButton;
