import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";

export enum EKnowledgeStatus {
    HAS = "HAS",
    WANTS_TO_LEARN = "WANTS_TO_LEARN"
}

registerEnumType(EKnowledgeStatus, {
  name: 'EKnowledgeStatus',
});

@ObjectType()
export class MUserSkill {
    @Field(() => ID)
    id!: string

    @Field(() => ID)
    userId!: string

    @Field(() => ID)
    skillId!: string

    @Field(() => EKnowledgeStatus, { nullable: true })
    knowledgeStatus?: EKnowledgeStatus
    
    @Field()
    lookingForDevsWithIt: boolean    
}