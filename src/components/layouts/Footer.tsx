import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import SocialLink from "../ui/SocialLink";

function Footer() {
  return (
    <footer className="flex bg-black text-white p-10">
      <div className="w-1/3"></div>
      <div className="flex flex-col items-center w-1/3">
        <FontAwesomeIcon icon={faEnvelope} className="text-3xl" />
        <label className="mb-5 text-lg font-extralight" htmlFor="clientEmail">
          Ingresa tu email para contactarte conmigo
        </label>
        <input
          className="w-[55%] p-1 border bg-gray-900 border-gray-500 text-white font-extralight rounded-full focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
          type="email"
          name="clientEmail"
          id="clientEmail"
        />
      </div>
      <div className="flex justify-center items-center space-x-4 w-1/3">
        <SocialLink
          socialIcon={faLinkedin}
          link="https://cl.linkedin.com/"
          iconColor="text-blue-700"
        />
        <SocialLink
          socialIcon={faGithub}
          link="https://github.com/"
          iconColor="text-orange-600"
        />
      </div>
    </footer>
  );
}
export default Footer;
