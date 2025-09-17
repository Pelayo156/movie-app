import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import SocialLink from "../ui/SocialLink";

function Footer() {
  return (
    <footer className="flex flex-col md:flex-row bg-black text-white p-5 md:p-10 items-center">
      {/* Columna izquierda (vacía, pero mantiene la estructura flex) */}
      <div className="w-full md:w-1/3 order-3 md:order-1 mt-5 md:mt-0"></div>

      {/* Sección central: Email Subscription */}
      <div className="flex flex-col items-center w-full md:w-1/3 order-1 md:order-2 text-center">
        <FontAwesomeIcon icon={faEnvelope} className="text-2xl md:text-3xl" />
        <label
          className="mb-3 md:mb-5 text-base md:text-lg font-extralight px-2"
          htmlFor="clientEmail"
        >
          Ingresa tu email para contactarte conmigo
        </label>
        <input
          className="w-[80%] sm:w-[60%] md:w-[55%] p-1 border bg-gray-900 border-gray-500 text-white font-extralight rounded-full focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent mb-5 md:mb-0"
          type="email"
          name="clientEmail"
          id="clientEmail"
        />
      </div>

      {/* Sección derecha: Social Links */}
      <div className="flex justify-center items-center space-x-4 w-full md:w-1/3 order-2 md:order-3 mt-5 md:mt-0">
        <SocialLink
          socialIcon={faLinkedin}
          link="https://cl.linkedin.com/in/bastian-molina-quiroga-167a46292"
          iconColor="text-blue-700"
        />
        <SocialLink
          socialIcon={faGithub}
          link="https://github.com/Pelayo156"
          iconColor="text-orange-600"
        />
      </div>
    </footer>
  );
}
export default Footer;
