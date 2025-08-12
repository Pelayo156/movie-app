import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type Props = {
  socialIcon: IconDefinition;
  iconColor: string;
  link: string;
};

function SocialLink(props: Props) {
  return (
    <a
      className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-white/90 cursor-pointer transition-colors duration-300 ease-in-out"
      target="_blank"
      href={props.link}
    >
      <FontAwesomeIcon
        icon={props.socialIcon}
        className={`text-3xl ${props.iconColor}`}
      />
    </a>
  );
}
export default SocialLink;
