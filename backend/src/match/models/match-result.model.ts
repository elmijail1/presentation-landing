import { Field, ObjectType } from '@nestjs/graphql';
import { MSkill } from '../../skills/models/skill.model.js';

@ObjectType()
export class MMatchResult {
  @Field(() => [MSkill])
  matchedSkills!: MSkill[];

  @Field(() => [String])
  missingSkillNames!: string[];
}
