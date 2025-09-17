import CategoryButton from "../components/ui/CategoryButton";
import { faStar, faVideoCamera, faMedal, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

function MoviesPage() {
  return (
    <div className="bg-gray-950 mt-20">
      {/* CATEGORÍAS */}
      <div className="flex gap-20 justify-center py-20">
        <CategoryButton title="Popular" icon={faStar} />
        <CategoryButton title="En Cartelera" icon={faVideoCamera} />
        <CategoryButton title="Próximamente" icon={faCalendarDays} />
        <CategoryButton title="Más Valorado" icon={faMedal} />
      </div>

      {/* LISTA DE PELÍCULAS */}
    </div>
  );
}
export default MoviesPage;
