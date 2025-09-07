import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
    isOpen: boolean,
    onClose: () => void,
    videoKey: string,
    movieTitle: string
}

function TrailerModal(props: Props) {
    useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        props.onClose();
      }
    };

    if (props.isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [props.isOpen, props.onClose]);

  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
        onClick={props.onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-6xl mx-4 bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-850 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white truncate">
            Trailer - {props.movieTitle}
          </h2>
          <button
            onClick={props.onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Cerrar modal"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        
        {/* Video Container */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={`https://www.youtube.com/embed/${props.videoKey}?autoplay=1&rel=0&modestbranding=1`}
            title={`Trailer de ${props.movieTitle}`}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );

}
export default TrailerModal;