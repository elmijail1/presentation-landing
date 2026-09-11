import { type BaseUIEvent, Form } from "@base-ui/react";
import { useEffect, useState } from "react";
import type { TMatcherStage, TMatchResults } from "../types";
import { MatchResults } from "./MatchResults";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSubmitMatch } from "../hooks/useSubmitMatch";
import { ToastMatcherFailure } from "./Toasts";
import { findMatchingTier } from "../data/matchResultsData";

const SAVED_MATCH_RESULT = "saved-match-result";

interface IMatcherProps {
  isIntroComplete: boolean;
  guestUserIdState: string | null;
  setGuestUserIdStateAndStorage: (id: string) => void;
}

export function Matcher({
  isIntroComplete,
  guestUserIdState,
  setGuestUserIdStateAndStorage,
}: IMatcherProps) {
  const [skills, setSkills] = useState<string[]>([""]);
  const [stage, setStage] = useState<TMatcherStage>("form");
  const [matchResult, setMatchResult] = useState<TMatchResults>({
    score: 0,
    comment: "",
  });
  const [showErrorToast, setShowErrorToast] = useState(false);
  const submitMatch = useSubmitMatch();

  useEffect(() => {
    try {
      const savedMatchResult = localStorage.getItem(SAVED_MATCH_RESULT);
      if (savedMatchResult) {
        const score = Number(savedMatchResult);
        if (!Number.isNaN(score)) {
          setStage("match");
          setMatchResult({ score, comment: findMatchingTier(score).comment });
        } else {
          localStorage.removeItem(SAVED_MATCH_RESULT);
        }
      }
    } catch {
      console.warn("Failed to check the local storage for saved match results");
    }
  }, []);

  function updateSkill(index: number, value: string) {
    setSkills((prev) => prev.map((skill, i) => (i === index ? value : skill)));
  }
  function addSkillField() {
    if (skills.length < 5) {
      setSkills((prev) => [...prev, ""]);
    }
  }
  function removeSkillField(index: number) {
    if (skills.length > 1) {
      setSkills((prev) => prev.filter((_i, ind) => index !== ind));
    }
  }

  useEffect(() => {
    if (!showErrorToast) return;
    const timeoutId = setTimeout(() => setShowErrorToast(false), 2000);
    return () => clearTimeout(timeoutId);
  }, [showErrorToast]);

  function handleSubmit(e: BaseUIEvent<React.SubmitEvent<HTMLFormElement>>) {
    e.preventDefault();
    const nonEmptySkills = skills.map((s) => s.trim()).filter(Boolean);
    if (nonEmptySkills.length === 0) return;

    setStage("loading");
    submitMatch.mutate(
      { userId: guestUserIdState, skillNames: nonEmptySkills },
      {
        onSuccess: (data) => {
          const { submitMatch: matchResponse } = data;
          const returnedUserId = matchResponse.userId;
          if (returnedUserId !== guestUserIdState) {
            setGuestUserIdStateAndStorage(returnedUserId);
          }
          const score = Math.ceil(
            (matchResponse.matchedSkills.length /
              (matchResponse.matchedSkills.length +
                matchResponse.missingSkillNames.length)) *
              100,
          );

          try {
            if (score >= 70) {
              localStorage.setItem(SAVED_MATCH_RESULT, String(score));
            } else {
              localStorage.removeItem(SAVED_MATCH_RESULT);
            }
          } catch {
            console.warn("Failed to update the saved match result locally");
          }

          const thresholdData = findMatchingTier(score);
          setMatchResult({
            score: score >= 10 ? score : 10,
            comment: thresholdData.comment,
          });
          setStage("match");
          setSkills([""]);
        },
        onError: () => {
          setStage("form");
          setShowErrorToast(true);
        },
      },
    );
  }

  if (isIntroComplete && stage === "match") {
    return (
      <MatchResults stage={stage} setStage={setStage} data={matchResult} />
    );
  }

  return (
    <div
      className={`relative mt-10 w-[90%] flex flex-col items-center text-center duration-1000 transition-all ease-out ${isIntroComplete && ["form", "loading"].includes(stage) ? "opacity-100" : "opacity-0 h-0"}`}
    >
      <h2>What skills are you looking for in a developer? 👀</h2>
      <p className="text-2xl text-gray-400 mt-2 mb-4">
        Enter up to 5 most important skills to see how well I match your case!
      </p>
      <Form onSubmit={handleSubmit} className="w-[70%] max-w-150">
        <div className="flex flex-col gap-2">
          {skills.map((skill, index) => {
            const key = index;
            return (
              <div key={key} className="relative">
                <Input
                  type="text"
                  placeholder="Enter skill"
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  className="bg-white h-10 p-8 placeholder:text-gray-300 placeholder:text-xl text-center text-xl md:text-xl font-normal"
                  disabled={stage !== "form"}
                />
                {index !== 0 && (
                  <button
                    type="button"
                    className="absolute rotate-45 -top-1 right-1 text-gray-500 cursor-pointer hover:brightness-90"
                    onClick={() => removeSkillField(index)}
                  >
                    +
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex justify-center gap-2 md:justify-around md:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={addSkillField}
            className="cursor-pointer text-xl h-10 p-7 font-bold rounded-4xl"
            disabled={skills.length > 4 || stage !== "form"}
          >
            Add skill
          </Button>
          <Button
            type="submit"
            disabled={
              (skills.length === 1 && !skills[0].length) || stage !== "form"
            }
            className="cursor-pointer text-xl h-10 p-7 font-bold rounded-4xl bg-linear-to-r from-teal-400 to-teal-500 hover:brightness-90"
          >
            Check match
          </Button>
        </div>
      </Form>
      {showErrorToast && <ToastMatcherFailure />}
      {stage === "loading" && (
        <div className="absolute w-full h-full flex items-center justify-center">
          <div className="animate-pulse text-gray-700 p-4 bg-gray-200 rounded-4xl">
            ⏳ Loading...
          </div>
        </div>
      )}
    </div>
  );
}
