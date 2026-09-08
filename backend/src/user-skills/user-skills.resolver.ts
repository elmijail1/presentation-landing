import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MUserSkill } from './model/user-skill.model.js';
import { UserSkillsService } from './user-skills.service.js';
import { ConnectUserSkillInput } from './dto/connect-user-skill.input.js';

@Resolver(() => MUserSkill)
export class UserSkillsResolver {
  constructor(private readonly userSkillsService: UserSkillsService) {}

  @Mutation(() => MUserSkill)
  connectUserSkill(@Args('input') input: ConnectUserSkillInput): MUserSkill {
    return this.userSkillsService.connect(
      input.userId,
      input.skillId,
      input.knowledgeStatus,
      input.lookingForDevsWithIt,
    );
  }

  @Query(() => [MUserSkill])
  userSkills(@Args('userId', { type: () => ID }) userId: string): MUserSkill[] {
    return this.userSkillsService.findByUser(userId);
  }
}
