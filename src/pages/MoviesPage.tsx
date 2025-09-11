import CategoryButton from "../components/ui/CategoryButton";

function MoviesPage() {
  return (
    <div className="mt-20">
        {/* CATEGORÍAS */}
      <div className="flex gap-10">
        <CategoryButton />
        <CategoryButton />
        <CategoryButton />
      </div>
    </div>
  );
}
export default MoviesPage;
