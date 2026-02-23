import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { accountService } from "../../services/accountService";
import { useAuth } from "../../context/AuthContext";
// Opcional: Si tienes estos tipos exportados en types, impórtalos de ahí
import type { MediaAction, MediaType } from "../../types/account.types";

type Props = {
  icon: IconDefinition;
  message: string[];
  mediaType: MediaType;
  actionListType: MediaAction;
};

function AccountActionButton(props: Props) {
  const { user, sessionId } = useAuth();
  const mediaId = useParams().id;

  const [isOnActionList, setIsOnActionList] = useState<boolean>();

  useEffect(() => {
    if (mediaId && sessionId) {
      fetchIsOnActionList();
    }
  }, [mediaId, sessionId, props.mediaType, props.actionListType]);

  const fetchIsOnActionList = async () => {
    if (!mediaId || !sessionId) return;

    // Nos trae todos los estados (favorito y watchlist) al mismo tiempo
    const states = await accountService.getAccountStates(
      parseInt(mediaId),
      props.mediaType,
      sessionId,
    );

    // Evaluamos directamente con la prop
    if (props.actionListType === "favorite") {
      setIsOnActionList(states.favorite);
    } else {
      setIsOnActionList(states.watchlist);
    }
  };

  // Función para quitar o agregar a lista de acción
  const addRemoveFromActionList = async () => {
    if (!user?.id || !sessionId) {
      console.error("Usuario no autenticado.");
      return;
    }

    if (!mediaId || isOnActionList === undefined) {
      console.error("Faltan datos para realizar la acción.");
      return;
    }

    // UI OPTIMISTA: Cambiamos el estado visual al instante para una mejor experiencia
    const newState = !isOnActionList;
    setIsOnActionList(newState);

    try {
      // Llamada directa a nuestro servicio unificado
      await accountService.toggleMediaStatus(
        user.id,
        sessionId,
        props.mediaType,
        parseInt(mediaId),
        props.actionListType, // Usamos la prop directamente
        newState,
      );
    } catch (error) {
      console.error("Error al actualizar la lista:", error);
      // Si la API falla, revertimos el botón a su estado original
      setIsOnActionList(!newState);
    }
  };

  return (
    <div className="relative flex items-center group">
      <button
        className="flex items-center justify-center text-white text-xl font-bold w-12 h-12 rounded-full bg-blue-950 transition-colors hover:bg-blue-900"
        onClick={addRemoveFromActionList}
      >
        <FontAwesomeIcon
          icon={props.icon}
          className={`text-lg transition-colors duration-300 ${
            isOnActionList ? "text-yellow-400" : ""
          }`}
        />
      </button>
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max
               invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity
               bg-blue-950 text-white text-sm font-bold rounded-md px-3 py-1 z-50"
      >
        {!isOnActionList ? props.message[0] : props.message[1]}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-blue-950"></div>
      </div>
    </div>
  );
}

export default AccountActionButton;
