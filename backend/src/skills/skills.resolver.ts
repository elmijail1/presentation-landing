import { Args, Query, Resolver } from '@nestjs/graphql';
import { EMySkillRelation, MSkill } from './models/skill.model.js';
import { SkillsService } from './skills.service.js';

@Resolver(() => MSkill)
export class SkillsResolver {
  constructor(private readonly skillsService: SkillsService) {}

  @Query(() => [MSkill])
  skills(
    @Args('myRelation', { type: () => EMySkillRelation, nullable: true })
    myRelation?: EMySkillRelation,
  ): Promise<MSkill[]> {
    return this.skillsService.findAll(myRelation);
  }
}
