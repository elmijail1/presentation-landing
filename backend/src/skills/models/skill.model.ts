import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";

export enum EMySkillRelation {
	HAVE = "HAVE",
	WANT_TO_LEARN = "WANT_TO_LEARN",
}

registerEnumType(EMySkillRelation, {
	name: "EMySkillRelation",
});

@ObjectType()
export class MSkill {
	@Field(() => ID)
	id!: string;

	@Field()
	name!: string;

	@Field(() => EMySkillRelation)
	myRelation: EMySkillRelation;
}
