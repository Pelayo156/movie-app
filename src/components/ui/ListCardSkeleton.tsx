function ListCardSkeleton() {
  return (
    <div
      className="w-40 sm:w-44 md:w-48 lg:w-52 xl:w-56
                  rounded-xl"
    >
      <div className="w-full aspect-[2/3] bg-gray-700 rounded-xl animate-pulse"></div>
    </div>
  );
}

export default ListCardSkeleton;
