import { graphqlClient } from "../lib/graphqlClient";
import type { TUserSkill } from "../types";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

const USER_SKILLS_QUERY = gql`
  query UserSkills($userId: ID!) {
    userSkills(userId: $userId) {
      id
      skillId
      knowledgeStatus
    }
  }
`;
type TUserSkillsQueryResponse = {
  userSkills: Pick<TUserSkill, "id" | "skillId" | "knowledgeStatus">[];
};

export function useUserSkills(userId: string | null) {
  return useQuery({
    queryKey: ["userSkills", userId],
    queryFn: () =>
      graphqlClient.request<TUserSkillsQueryResponse>(USER_SKILLS_QUERY, {
        userId,
      }),
    select: (data) => data.userSkills,
    enabled: userId !== null,
  });
}
