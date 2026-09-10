import type { TPastWorkDataItem } from "../data/pastWorkData";

interface IPastWorkItem {
  data: TPastWorkDataItem;
}

export function PastWorkItem({ data }: IPastWorkItem) {
  return (
    <div className="flex md:flex-col gap-4 justify-around md:gap-2">
      <div>
        <img
          className="inset-shadow-initial shadow-xl w-60 h-40 md:w-90 md:h-50 rounded-2xl object-cover"
          src={data.imgSrc}
        />
      </div>
      <div className="max-w-90">
        <h3 className="text-3xl">{data.projectName}</h3>
        <h4 className="text-xl text-gray-500 -mt-1">
          {data.isCommercial ? "Commercial" : "Personal"}
        </h4>
        <div className="flex divide-x divide-gray-500">
          {data.fields.map((f) => (
            // add some separator
            <p
              className="text-lg font-semibold text-gray-500 leading-4 px-2 first:pl-0"
              key={f}
            >
              {f}
            </p>
          ))}
        </div>
        <div className="text-xl font-semibold text-gray-700 mt-2 leading-[1.45rem]">
          {data.description}
        </div>
        <div className="flex gap-2 mt-3">
          <a
            href={data.linkLive}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-xl text-white bg-linear-to-r from-teal-400 to-teal-500 px-3 py-1 rounded-2xl hover:brightness-90"
          >
            See live
          </a>
          {data.linkRepo && (
            <a
              href={data.linkRepo}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-xl text-white bg-linear-to-r from-purple-400 to-purple-500 px-3 py-1 rounded-2xl hover:brightness-90"
            >
              Repo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
