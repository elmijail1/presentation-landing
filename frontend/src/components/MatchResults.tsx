import type { TMatcherStage, TMatchResults } from "../types";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { ToastCopyFailure, ToastCopySuccess } from "./Toasts";
import type React from "react";
import { Button } from "./ui/button";
import { EMAIL_ADDRESS, URL_GITHUB, URL_LINKEDIN } from "@/data/publicContacts";

interface IMatchResultsProps {
  stage: TMatcherStage;
  setStage: React.Dispatch<React.SetStateAction<TMatcherStage>>;
  data: TMatchResults;
}

export function MatchResults({ stage, setStage, data }: IMatchResultsProps) {
  function determineColor() {
    if (data.score >= 60) {
      return "from-teal-400 to-teal-500";
    } else if (data.score >= 30) {
      return "from-amber-400 to-amber-500";
    } else {
      return "from-orange-400 to-orange-500";
    }
  }
  const { justCopied, copyFailed, copy } = useCopyToClipboard();
  const buttonVisibilityStyles =
    data.score >= 70
      ? "text-lg h-8 p-4 font-normal"
      : "text-xl text-white hover:text-brightness-90 h-10 p-7 font-bold bg-linear-to-r from-teal-400 to-teal-500";

  return (
    <div
      className={`mt-10 w-[90%] flex flex-col items-center gap-2 duration-1000 transition-all ease-out ${stage === "match" ? "opacity-100" : "opacity-0 h-0 hidden"}`}
    >
      <h2>How do we match? 👀</h2>
      <p
        className={`text-6xl font-extrabold bg-linear-to-r bg-clip-text text-transparent ${determineColor()}`}
      >
        {data.score}%
      </p>
      <div className="w-full text-3xl text-gray-500 flex flex-col gap-1 items-center text-center max-w-[80%]">
        <p>{data.comment} Reach out in any way you like:</p>
        <ul className="list-disc text-left underline leading-12">
          <li>
            <a href={URL_LINKEDIN} target="_blank" rel="noopener">
              LinkedIn
            </a>
          </li>
          <li>
            <button
              type="button"
              className="underline cursor-pointer"
              onClick={() => copy(EMAIL_ADDRESS)}
            >
              Email
            </button>
          </li>
          <li>
            <a href={URL_GITHUB} target="_blank" rel="noopener">
              GitHub
            </a>
          </li>
        </ul>
      </div>
      <Button
        type="button"
        variant="outline"
        className={`cursor-pointer hover:brightness-90 rounded-4xl ${buttonVisibilityStyles}`}
        onClick={() => setStage("form")}
      >
        Try other skills
      </Button>
      {justCopied && <ToastCopySuccess />}
      {copyFailed && <ToastCopyFailure />}
    </div>
  );
}
