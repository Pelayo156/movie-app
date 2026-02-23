import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { accountService } from "../../services/accountService";
import { useAuth } from "../../context/AuthContext";

type Props = {
  icon: IconDefinition;
  message: string[];
  mediaType: "tv" | "movie";
  actionListType: "favorites" | "watchlater";
};

function AccountActionButton(props: Props) {
  const { user, sessionId } = useAuth();
  const mediaId = useParams().id;

  const [isOnActionList, setIsOnActionList] = useState<boolean>();

  useEffect(() => {
    fetchIsOnActionList();
  }, []);

  const fetchIsOnActionList = async () => {
    let response;
    if (props.actionListType == "favorites") {
      console.log(props.mediaType);
      if (props.mediaType == "movie") {
        response = await accountService.isFavoriteMovie(
          user ? user.id : null,
          mediaId ? parseInt(mediaId) : null
        );
      }

      if (props.mediaType == "tv") {
        response = await accountService.isFavoriteTVShow(
          user ? user.id : null,
          mediaId ? parseInt(mediaId) : null
        );
      }
    }

    setIsOnActionList(response);
  };

  // Función para quitar o agregar a lista de acción (favoritos o ver más tarde)
  const addRemoveFromActionList = async () => {
    // Validar que existan los datos necesarios
    if (!user?.id || !sessionId) {
      console.error("Usuario no autenticado.");
      return;
    }

    if (!mediaId) {
      console.error("No existe ID de contenido.");
      return;
    }

    if (isOnActionList == undefined) {
      console.error(
        "No se pudo identificar si contenido pertenecía a lista correspondiente."
      );
      return;
    }

    let response;
    if (props.actionListType === "favorites") {
      response = await accountService.toggleFavorite(
        user.id,
        sessionId,
        props.mediaType,
        parseInt(mediaId),
        !isOnActionList
      );
    }

    fetchIsOnActionList();
  };

  return (
    <div className="relative flex items-center group">
      <button
        className="flex items-center justify-center text-white text-xl font-bold w-12 h-12 rounded-full bg-blue-950"
        onClick={addRemoveFromActionList}
      >
        <FontAwesomeIcon
          icon={props.icon}
          className={`text-lg ${isOnActionList ? "text-yellow-400" : ""}`}
        />
      </button>
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max
               invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity
               bg-blue-950 text-white text-sm font-bold rounded-md px-3 py-1"
      >
        {!isOnActionList ? props.message[0] : props.message[1]}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-blue-950"></div>
      </div>
    </div>
  );
}
export default AccountActionButton;
