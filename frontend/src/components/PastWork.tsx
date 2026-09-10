import { pastWorkData } from "../data/pastWorkData";
import { PastWorkItem } from "./PastWorkItem";

interface IPastWorkProps {
  isIntroComplete: boolean;
}

export function PastWork({ isIntroComplete }: IPastWorkProps) {
  return (
    <div
      className={`flex flex-col items-center gap-4 w-[90%] mt-4 ${isIntroComplete ? "opacity-100" : "opacity-0 h-0"}`}
    >
      <h2>What I've worked on ⏮️</h2>
      <div className="flex flex-col gap-8 mt-2 md:flex-row md:items-start md:flex-wrap md:justify-center">
        {pastWorkData.map((d) => (
          <PastWorkItem data={d} />
        ))}
      </div>
    </div>
  );
}
