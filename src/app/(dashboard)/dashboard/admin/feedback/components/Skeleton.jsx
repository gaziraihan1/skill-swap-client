const Skeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-200 h-40 rounded"
        ></div>
      ))}
    </div>
  );
};

export default Skeleton;
