import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { EKnowledgeStatus } from '../../generated/prisma/enums.js';

export { EKnowledgeStatus };

registerEnumType(EKnowledgeStatus, {
  name: 'EKnowledgeStatus',
});

@ObjectType()
export class MUserSkill {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  userId!: string;

  @Field(() => ID)
  skillId!: string;

  @Field(() => EKnowledgeStatus, { nullable: true })
  knowledgeStatus: EKnowledgeStatus | null;

  @Field()
  lookingForDevsWithIt: boolean;
}
