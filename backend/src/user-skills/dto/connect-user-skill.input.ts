import { Field, ID, InputType } from '@nestjs/graphql';
import { EKnowledgeStatus } from '../model/user-skill.model.js';
import { IsOptional } from 'class-validator';

@InputType()
export class ConnectUserSkillInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  userId?: string;

  @Field(() => ID)
  skillId!: string;

  @Field(() => EKnowledgeStatus, { nullable: true })
  knowledgeStatus?: EKnowledgeStatus;

  @Field({ nullable: true, defaultValue: false })
  lookingForDevsWithIt?: boolean;
}
