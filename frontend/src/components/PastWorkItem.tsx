import type { TPastWorkDataItem } from "../data/pastWorkData";

interface IPastWorkItem {
  data: TPastWorkDataItem;
}

export function PastWorkItem({ data }: IPastWorkItem) {
  return (
    <div className="flex flex-col max-md:items-center gap-4 justify-around md:gap-2">
      <img
        className="inset-shadow-initial shadow-xl w-60 h-40 md:w-90 md:h-50 rounded-2xl object-cover"
        src={data.imgSrc}
      />
      <div className="max-w-90 md:mt-3">
        <h3 className="text-3xl max-md:text-center">{data.projectName}</h3>
        <h4 className="text-xl max-md:text-center text-gray-500 -mt-1">
          {data.isCommercial ? "Commercial" : "Personal"}
        </h4>
        <div className="flex divide-x divide-gray-500 max-md:justify-center">
          {data.fields.map((f) => (
            <p
              className="text-lg font-semibold text-gray-500 leading-4 px-2 first:pl-0"
              key={f}
            >
              {f}
            </p>
          ))}
        </div>
        <div className="text-xl font-semibold text-gray-700 mt-2 leading-[1.45rem] max-md:text-center">
          {data.description}
        </div>
        <div className="flex gap-2 max-md:gap-4 mt-3 max-md:justify-center">
          <a
            href={data.linkLive}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-xl text-white bg-linear-to-r from-teal-400 to-teal-500 px-3 py-1 max-md:px-4 max-md:py-2 rounded-2xl hover:brightness-90"
          >
            See live
          </a>
          {data.linkRepo && (
            <a
              href={data.linkRepo}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-xl text-white bg-linear-to-r from-purple-400 to-purple-500 px-3 py-1 max-md:px-4 max-md:py-2 rounded-2xl hover:brightness-90"
            >
              Repo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
