export function BannerItem({ icon, header, description }) {
  return (
    <div className="max-md flex flex-col max-md:items-center max-md:justify-center max-md:text-center">
      <div className="flex h-auto w-fit justify-center rounded-full bg-yellow-400 p-5 text-3xl max-md:text-xl">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-yellow-400 max-sm:text-base">
        {header}
      </h2>
      <p className="flex flex-row text-sm font-semibold max-sm:text-xs">
        {description}
      </p>
    </div>
  );
}
