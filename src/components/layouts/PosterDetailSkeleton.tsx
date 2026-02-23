function PosterDetailSkeleton() {
  return (
    <div className="relative w-full min-h-[70vh] md:min-h-[60vh] pb-10 bg-black animate-pulse">
      <div className="relative z-10 flex flex-col md:flex-row h-full items-center justify-center md:justify-start pt-8 md:pt-0">
        <div className="flex flex-col items-center md:flex-row mt-0 md:mt-[2%] mx-auto md:ml-[15%] px-4 md:px-0">
          {/* Skeleton del poster */}
          <div className="h-64 w-44 sm:h-80 sm:w-52 md:h-[calc(60vh-6rem)] md:w-56 bg-gray-700 rounded-lg md:rounded-xl flex-shrink-0 mb-6 md:mb-0" />

          {/* Skeleton del texto */}
          <div className="flex flex-col gap-4 md:gap-6 ml-0 md:ml-12 max-w-full md:max-w-xl lg:max-w-4xl px-4 md:px-0 w-full">
            {/* Título */}
            <div className="h-8 bg-gray-700 rounded w-3/4 mx-auto md:mx-0" />
            {/* Subtítulo (fecha, géneros) */}
            <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto md:mx-0" />

            {/* Puntuación */}
            <div className="flex gap-3 items-center justify-center md:justify-start mt-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-700" />
              <div className="h-4 bg-gray-700 rounded w-20" />
            </div>

            {/* Descripción */}
            <div className="flex flex-col gap-2 mt-4">
              <div className="h-5 bg-gray-700 rounded w-40 mx-auto md:mx-0" />
              <div className="h-4 bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-700 rounded w-5/6" />
              <div className="h-4 bg-gray-700 rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PosterDetailSkeleton;
