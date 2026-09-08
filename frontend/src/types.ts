type TSkillMyRelation = "HAVE" | "WANT_TO_LEARN" | null;
export type TSkillMyRelationProp = NonNullable<TSkillMyRelation>;

export type TSkill = {
  id: string;
  name: string;
  myRelation: TSkillMyRelation;
};

export type TMatcherStage = "form" | "loading" | "match";
export type TMatchResultData = {
  score: number;
  comment: string;
};
