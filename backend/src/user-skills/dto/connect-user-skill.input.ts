import { Field, ID, InputType } from '@nestjs/graphql';
import { EKnowledgeStatus } from '../model/user-skill.model.js';

@InputType()
export class ConnectUserSkillInput {
  @Field(() => ID)
  userId!: string;

  @Field(() => ID)
  skillId!: string;

  @Field(() => EKnowledgeStatus, { nullable: true })
  knowledgeStatus?: EKnowledgeStatus;

  @Field({ nullable: true, defaultValue: false })
  lookingForDevsWithIt?: boolean;
}
