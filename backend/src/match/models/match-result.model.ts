import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MSkill } from '../../skills/models/skill.model.js';

@ObjectType()
export class MMatchResult {
  @Field(() => ID)
  userId!: string;

  @Field(() => [MSkill])
  matchedSkills!: MSkill[];

  @Field(() => [String])
  missingSkillNames!: string[];
}
