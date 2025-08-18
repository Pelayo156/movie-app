type Props = {
  poster_path: string;
  title: string;
  release_date: string;
};

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;
function MovieCard(props: Props) {
  return (
    <div className="flex-shrink-0 w-44">
      <div
        className="flex flex-col max-w-sm rounded-xl overflow-hidden bg-white shadow-lg
                            transition-all duration-200 ease-in-out 
                            hover:scale-105 hover:shadow-xl
                            hover:outline-4 hover:outline-white"
      >
        <img
          className="w-auto h-full object-contain"
          src={`${apiImageUrl}/w500/${props.poster_path}`}
          alt="image"
        />
      </div>
      {/* Contenido de la tarjeta */}
      <div className="p-2 flex flex-col flex-grow">
        {/* Título de la película */}
        <h3 className="text-md font-bold text-white">{props.title}</h3>

        {/* Fecha de lanzamiento */}
        <h2 className="text-sm text-gray-400">{props.release_date}</h2>
      </div>
    </div>
  );
}

export default MovieCard;
