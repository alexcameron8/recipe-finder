export function BannerItem({ icon, header, description }) {
  return (
    <div className="flex flex-col">
      <div className="flex h-auto w-fit justify-center rounded-full bg-yellow-400 p-5 text-3xl max-md:text-xl">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-yellow-400 max-sm:text-lg">
        {header}
      </h2>
      <p className="flex flex-row text-sm font-semibold">{description}</p>
    </div>
  );
}
