import type { TKnowledgeStatus } from "../types";
import { useSkills } from "../hooks/useSkills";
import { TableSkills } from "./TableSkills";
import { useUserSkills } from "../hooks/useUserSkills";
import { useMemo } from "react";
import { useConnectUserSkill } from "../hooks/useConnectUserSkill";

function getCheckedSkillIds(
  userSkills:
    | { skillId: string; knowledgeStatus: TKnowledgeStatus }[]
    | undefined,
  status: TKnowledgeStatus,
): Set<string> {
  if (!userSkills) return new Set();
  return new Set(
    userSkills
      .filter((userSkill) => userSkill.knowledgeStatus === status)
      .map((userSkill) => userSkill.skillId),
  );
}

interface ITableSectionProp {
  isIntroComplete: boolean;
  guestUserIdState: string | null;
  setGuestUserIdStateAndStorage: (id: string) => void;
}

export function TablesSection({
  isIntroComplete,
  guestUserIdState,
  setGuestUserIdStateAndStorage,
}: ITableSectionProp) {
  const {
    data: haveSkills,
    isLoading: isLoadingHaveSkills,
    isError: isErrorHaveSkills,
  } = useSkills("HAVE");
  const {
    data: wantToLearnSkills,
    isLoading: isLoadingWantToLearnSkills,
    isError: isErrorWantToLearnSkills,
  } = useSkills("WANT_TO_LEARN");
  const { data: userSkills } = useUserSkills(guestUserIdState);
  const connectUserSkill = useConnectUserSkill();

  const haveCheckedSkillIds = useMemo(
    () => getCheckedSkillIds(userSkills, "HAS"),
    [userSkills],
  );
  const wantToLearnCheckedSkillIds = useMemo(
    () => getCheckedSkillIds(userSkills, "WANTS_TO_LEARN"),
    [userSkills],
  );

  function handleToggle(
    skillId: string,
    skillKnowledge: "HAS" | "WANTS_TO_LEARN",
    checked: boolean,
  ) {
    connectUserSkill.mutate(
      {
        userId: guestUserIdState,
        skillId,
        knowledgeStatus: checked ? skillKnowledge : null,
      },
      {
        onSuccess: (data) => {
          const receivedUserId = data.connectUserSkill.userId;
          if (receivedUserId !== guestUserIdState) {
            setGuestUserIdStateAndStorage(receivedUserId);
          }
        },
      },
    );
  }

  return (
    <div
      className={`w-[90%] text-4xl font-bold duration-1000 transition-all ease-out ${isIntroComplete ? "opacity-100" : "opacity-0 h-0"}`}
    >
      <div className="flex max-md:flex-col w-full mt-2 gap-4 max-md:gap-10 justify-between">
        <TableSkills
          caption="Skills I have 🔨"
          skills={haveSkills ?? []}
          isLoading={isLoadingHaveSkills}
          isError={isErrorHaveSkills}
          checkedSkillIds={haveCheckedSkillIds}
          color="orange"
          secondColHeader="Have it too?"
          onToggle={(skillId, checked) => handleToggle(skillId, "HAS", checked)}
        />
        <TableSkills
          caption="Skills I want to learn 🧠"
          skills={wantToLearnSkills ?? []}
          isLoading={isLoadingWantToLearnSkills}
          isError={isErrorWantToLearnSkills}
          checkedSkillIds={wantToLearnCheckedSkillIds}
          color="purple"
          secondColHeader="Want to learn it too?"
          onToggle={(skillId, checked) =>
            handleToggle(skillId, "WANTS_TO_LEARN", checked)
          }
        />
      </div>
    </div>
  );
}
