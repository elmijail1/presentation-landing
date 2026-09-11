import { pastWorkData } from "../data/pastWorkData";
import { PastWorkItem } from "./PastWorkItem";

interface IPastWorkProps {
  isIntroComplete: boolean;
}

export function PastWork({ isIntroComplete }: IPastWorkProps) {
  return (
    <div
      className={`flex flex-col items-center w-[90%] mt-4 ${isIntroComplete ? "opacity-100" : "opacity-0 h-0"}`}
    >
      <h2 className="text-center max-md:w-70">What I've worked on ⏮️</h2>
      <p className="text-center text-2xl text-gray-400 mt-2 mb-4">
        You can find my full portfolio on{" "}
        <a
          href="https://github.com/elmijail1"
          target="_blank"
          className="underline transition-colors ease-in duration-300 hover:bg-linear-to-r hover:bg-clip-text hover:text-transparent hover:from-teal-400 hover:to-teal-500 hover:decoration-teal-500"
          rel="nofollow noopener noreferrer"
        >
          GitHub
        </a>
        . But here are a few highlights.
      </p>
      <div className="flex flex-col gap-8 mt-2 md:flex-row md:items-start md:flex-wrap md:justify-center">
        {pastWorkData.map((d) => (
          <PastWorkItem data={d} />
        ))}
      </div>
    </div>
  );
}
