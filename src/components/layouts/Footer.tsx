import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import SocialLink from "../ui/SocialLink";

function Footer() {
  return (
    <footer className="flex flex-col md:flex-row bg-black text-white p-5 md:p-10 items-center">
      {/* Columna izquierda (vacía, pero mantiene la estructura flex) */}
      <div className="w-full md:w-1/3 order-3 md:order-1 mt-5 md:mt-0"></div>

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
