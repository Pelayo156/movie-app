function MovieCardSkeleton() {
  return (
    <div className="animate-pulse flex-shrink-0 w-32 sm:w-36 md:w-40">
      <div className="bg-gray-700 rounded-lg w-full h-48 sm:h-52 md:h-56" />
      <div className="mt-2 bg-gray-700 rounded h-4 w-3/4" />
      <div className="mt-1 bg-gray-700 rounded h-3 w-1/2" />
    </div>
  );
}

export default MovieCardSkeleton;
