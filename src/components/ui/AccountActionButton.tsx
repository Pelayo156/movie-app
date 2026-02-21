import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type Props = {
  icon: IconDefinition;
  message: string;
};

function AccountActionButton(props: Props) {
  return (
    <div className="relative flex items-center group">
      <button className="flex items-center justify-center text-white text-xl font-bold w-12 h-12 rounded-full bg-blue-950">
        <FontAwesomeIcon icon={props.icon} className="text-lg" />
      </button>
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max
               invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity
               bg-blue-950 text-white text-sm font-bold rounded-md px-3 py-1"
      >
        {props.message}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-blue-950"></div>
      </div>
    </div>
  );
}
export default AccountActionButton;
