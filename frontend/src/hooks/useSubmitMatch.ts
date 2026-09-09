import { graphqlClient } from "../lib/graphqlClient";
import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

const SUBMIT_MATCH_MUTATION = gql`
  mutation SubmitMatch($input: SubmitMatchInput!) {
    submitMatch(input: $input) {
      userId
      matchedSkills {
        id
      }
      missingSkillNames
    }
  }
`;

type TSubmitMatchResponse = {
  submitMatch: {
    userId: string;
    matchedSkills: { id: string }[];
    missingSkillNames: string[];
  };
};

type TSubmitMatchInput = {
  userId: string | null;
  skillNames: string[];
};

export function useSubmitMatch() {
  return useMutation({
    mutationFn: (input: TSubmitMatchInput) =>
      graphqlClient.request<TSubmitMatchResponse>(SUBMIT_MATCH_MUTATION, {
        input,
      }),
  });
}
