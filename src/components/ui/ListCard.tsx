import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  id: number;
  title: string;
  poster_path: string;
};

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;
function ListCard(props: Props) {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const handleImageLoaded = () => {
    setIsImageLoaded(true);
  };

  return (
    <Link to={`/movie/${props.id}`} key={props.id}>
      <div
        className="w-40 sm:w-44 md:w-48 lg:w-52 xl:w-56
                        rounded-xl border-2 border-transparent 
                        hover:border-2 hover:border-white hover:scale-105 
                        transform transition-all duration-300 ease-in-out cursor-pointer"
      >
        <img
          src={
            props.poster_path
              ? `${apiImageUrl}/w300/${props.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={props.title}
          className={`w-full h-auto object-cover rounded-xl transition-opacity duration-500 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleImageLoaded}
        />
      </div>
    </Link>
  );
}

export default ListCard;
