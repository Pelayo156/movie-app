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
    <div className="relative w-full h-[60 vh] pb-10 bg-black">
      <div
        className="absolute top-0 right-0 h-full w-3/5 bg-cover bg-top"
        style={{
          backgroundImage: `url(${apiImageUrl}/original/${props?.backdrop_path})`,
        }}
      ></div>

      <div className="absolute top-0 right-0 h-full w-3/5 bg-black/40 backdrop-blur-sm"></div>

      <div className="absolute inset-0 bg-gradient-to-r from-black from-[45%] to-transparent to-[55%]"></div>

      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
      <div className="relative z-10 flex h-full items-center">
        <div className="flex mt-[2%] ml-[15%]">
          <img
            className="h-[calc(60vh-6rem)] w-auto flex-shrink-0 rounded-xl"
            src={`${apiImageUrl}/w500/${props?.poster_path}`}
            alt={`Poster de ${props?.title}`}
          />

          {/* Cuerpo de texto para poster de Película */}
          <div className="flex flex-col gap-6 ml-12 max-w-4xl">
            <div>
              {props?.title && props.release_date && (
                <div className="text-white text-4xl font-bold">
                  {`${props.title} (${props.release_date.slice(0, 4)})`}
                </div>
              )}
              <div className="flex gap-2 text-gray-400">
                {props.release_date && (
                  <div>{props?.release_date.replaceAll("-", "/")}</div>
                )}
                <div>-</div>
                {props.genres && (
                  <div>
                    {props?.genres.map((genre, index) =>
                      index <
                      (props.genres?.length ? props.genres?.length : 1) - 1
                        ? `${genre.name}, `
                        : genre.name
                    )}
                  </div>
                )}
                <div>-</div>
                <div>
                  {props.runtime && `${props.runtime}m`}

                  {props.seasons &&
                    `${props.seasons} ${
                      props.seasons > 1 ? "Temporadas" : "Temporada"
                    }`}
                </div>
              </div>
            </div>

            {/* Símbolo de porcentaje para la puntuación de la película */}
            <div className="flex gap-3 items-center">
              {props?.vote_average && (
                <div className="flex items-center justify-center text-white text-xl font-bold w-14 h-14 rounded-full bg-gray-800 border-4 border-emerald-600">
                  {(props.vote_average * 10).toPrecision(2)}%
                </div>
              )}
              <div className="text-white font-bold">
                Puntuación
                <br />
                Usuarios
              </div>
            </div>

            {/* Botones de Acción para el usuario con respecto a la película */}
            <div className="flex gap-5">
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

            <div className="flex flex-col gap-3">
              <div className="text-white text-2xl font-bold">
                Descripción General
              </div>
              <div className="text-white text-md text-justify">
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
