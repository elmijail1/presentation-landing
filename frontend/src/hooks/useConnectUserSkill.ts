import { graphqlClient } from "../lib/graphqlClient";
import type { TKnowledgeStatus } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";

const CONNECT_USER_SKILL_MUTATION = gql`
  mutation ConnectUserSkill($input: ConnectUserSkillInput!) {
    connectUserSkill(input: $input) {
      id
      userId
      skillId
      knowledgeStatus
      lookingForDevsWithIt
    }
  }
`;

type TConnectUserSkillResponse = {
  connectUserSkill: {
    id: string;
    userId: string;
    skillId: string;
    knowledgeStatus: TKnowledgeStatus;
    lookingForDevsWithIt: boolean;
  };
};

type TConnectUserSkillInput = {
  userId: string | null;
  skillId: string;
  knowledgeStatus: TKnowledgeStatus;
};

export function useConnectUserSkill() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: TConnectUserSkillInput) =>
      graphqlClient.request<TConnectUserSkillResponse>(
        CONNECT_USER_SKILL_MUTATION,
        { input },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSkills"] });
    },
  });
}
