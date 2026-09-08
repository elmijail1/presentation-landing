import { graphqlClient } from "../lib/graphqlClient";
import type { TSkill, TSkillMyRelationProp } from "../types";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

const SKILLS_QUERY = gql`
  query Skills($myRelation: EMySkillRelation) {
    skills(myRelation: $myRelation) {
      id
      name
      myRelation
    }
  }
`;

type TSkillsQueryResponse = {
  skills: TSkill[];
};

export function useSkills(myRelation: TSkillMyRelationProp) {
  return useQuery({
    queryKey: ["skills", myRelation],
    queryFn: () =>
      graphqlClient.request<TSkillsQueryResponse>(SKILLS_QUERY, { myRelation }),
    select: (data) => data.skills,
  });
}
