import type { Genre } from "../../types/tvSeries.types";
import { faList, faHeart, faBookmark } from "@fortawesome/free-solid-svg-icons";
import AccountActionButton from "../ui/AccountActionButton";

type Props = {
  backdrop_path: string | undefined;
  poster_path: string | undefined;
  title: string | undefined;
  release_date: string | undefined;
  genres: Genre[] | undefined;
  runtime?: number | undefined;
  seasons?: number | undefined;
  vote_average: number | undefined;
  overview: string | undefined;
};

const apiImageUrl = import.meta.env.VITE_API_IMAGE_URL;
function PosterDetail(props: Props) {
  return (
    // Contenedor principal: Ajuste de altura y padding vertical para móvil. Fondo oscuro.
    <div className="relative w-full h-auto min-h-[70vh] md:min-h-[60vh] pb-10 md:pb-0 bg-black pt-4 md:pt-0">
      {/* Imagen de fondo (backdrop) - Oculta en pantallas muy pequeñas, visible con ancho reducido en sm, más ancho en md. */}
      {/* Usamos un degradado más fuerte para asegurar contraste con el texto en móviles. */}
      <div
        className="hidden sm:block absolute top-0 right-0 h-full w-full sm:w-3/5 lg:w-3/5 bg-cover bg-top"
        style={{
          backgroundImage: `url(${apiImageUrl}/original/${props?.backdrop_path})`,
        }}
      ></div>

      {/* Capa de oscurecimiento y blur sobre el backdrop - Asegura legibilidad del texto */}
      <div className="absolute inset-0 bg-black/80 sm:bg-black/60 md:bg-black/40 backdrop-blur-sm sm:backdrop-blur-md"></div>

      {/* Degradado de izquierda a derecha (overlay) - Ajusta el porcentaje para móviles */}
      <div className="absolute inset-0 bg-gradient-to-r from-black from-[70%] sm:from-[45%] to-transparent to-[30%] sm:to-[55%]"></div>

      {/* Degradado de izquierda a derecha para asegurar el fondo negro */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>

      {/* Contenido principal (Poster y Texto) - Usamos flex-col en móvil y flex-row en md */}
      <div className="relative z-10 flex flex-col md:flex-row h-full items-center justify-center md:justify-start pt-8 md:pt-0">
        {/* Contenedor del poster (imagen) y el texto. Margen y centrado para móvil. */}
        <div className="flex flex-col items-center md:flex-row mt-0 md:mt-[2%] mx-auto md:ml-[15%] px-4 md:px-0">
          <img
            // Altura y ancho responsivos para el póster. Centrado en móvil.
            className="h-64 w-auto sm:h-80 md:h-[calc(60vh-6rem)] flex-shrink-0 rounded-lg md:rounded-xl shadow-lg mb-6 md:mb-0"
            src={`${apiImageUrl}/w500/${props?.poster_path}`}
            alt={`Poster de ${props?.title}`}
          />

          {/* Cuerpo de texto para poster de Película - Flex-col, gap, márgenes y ancho responsivos */}
          <div className="flex flex-col gap-4 md:gap-6 ml-0 md:ml-12 max-w-full md:max-w-xl lg:max-w-4xl px-4 md:px-0 text-center md:text-left">
            <div>
              {props?.title && props.release_date && (
                // Título de la película - Tamaño de texto responsivo
                <div className="text-white text-3xl sm:text-4xl font-bold">
                  {`${props.title} (${props.release_date.slice(0, 4)})`}
                </div>
              )}
              {/* Detalles (fecha, géneros, duración) - Centrado en móvil, tamaño de texto responsivo */}
              <div className="flex flex-wrap justify-center md:justify-start gap-x-2 text-gray-400 text-sm sm:text-base mt-2">
                {props.release_date && (
                  <div>{props?.release_date.replaceAll("-", "/")}</div>
                )}
                {props.genres && props.release_date && <div>-</div>}{" "}
                {/* Mostrar '-' solo si hay fecha Y géneros */}
                {props.genres && (
                  <div className="flex flex-wrap justify-center md:justify-start gap-x-1">
                    {props?.genres.map((genre, index) => (
                      <span key={genre.id}>
                        {genre.name}
                        {index < (props.genres?.length || 1) - 1 && ", "}
                      </span>
                    ))}
                  </div>
                )}
                {(props.runtime || props.seasons) &&
                  (props.genres || props.release_date) && <div>-</div>}{" "}
                {/* Mostrar '-' solo si hay duración/temporadas Y géneros/fecha */}
                <div>
                  {props.runtime && `${props.runtime}m`}
                  {props.seasons &&
                    `${props.seasons} ${
                      props.seasons > 1 ? "Temporadas" : "Temporada"
                    }`}
                </div>
              </div>
            </div>

            {/* Símbolo de porcentaje para la puntuación - Centrado en móvil, tamaño responsivo */}
            <div className="flex gap-3 items-center justify-center md:justify-start mt-4">
              {props?.vote_average && (
                <div className="flex items-center justify-center text-white text-base sm:text-xl font-bold w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-800 border-2 sm:border-4 border-emerald-600">
                  {(props.vote_average * 10).toPrecision(2)}%
                </div>
              )}
              <div className="text-white text-sm sm:text-base font-bold">
                Puntuación
                <br />
                Usuarios
              </div>
            </div>

            {/* Botones de Acción - Flex-wrap y centrado en móvil */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-5 mt-4">
              <AccountActionButton icon={faList} message="Agregar a la lista" />
              <AccountActionButton
                icon={faHeart}
                message="Marcar como favorito"
              />
              <AccountActionButton
                icon={faBookmark}
                message="Agregar a ver más tarde"
              />
            </div>

            {/* Descripción General - Texto y título responsivos, centrado en móvil */}
            <div className="flex flex-col gap-2 md:gap-3 mt-4">
              <div className="text-white text-xl sm:text-2xl font-bold">
                Descripción General
              </div>
              <div className="text-white text-sm sm:text-md text-justify">
                {props?.overview}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PosterDetail;
