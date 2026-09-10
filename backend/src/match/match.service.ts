import { Injectable } from '@nestjs/common';
import { SkillsService } from '../skills/skills.service.js';
import { UserSkillsService } from '../user-skills/user-skills.service.js';
import { MMatchResult } from './models/match-result.model.js';
import { EMySkillRelation } from '../skills/models/skill.model.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class MatchService {
  constructor(
    private readonly skillsService: SkillsService,
    private readonly userSkillsService: UserSkillsService,
    private readonly usersService: UsersService,
  ) {}

  async submit(
    userId: string | undefined,
    skillNames: string[],
  ): Promise<MMatchResult> {
    const user = await this.usersService.findOrCreate(userId);
    const result: MMatchResult = {
      userId: user.id,
      matchedSkills: [],
      missingSkillNames: [],
    };

    for (const rawName of skillNames) {
      const skill = await this.skillsService.findByNameOrVariant(rawName);
      if (skill) {
        await this.userSkillsService.connect(
          user.id,
          skill.id,
          undefined,
          true,
        );
        if (skill.myRelation === EMySkillRelation.HAVE) {
          result.matchedSkills.push(skill);
        } else {
          result.missingSkillNames.push(rawName);
        }
      } else {
        result.missingSkillNames.push(rawName);
      }
    }
    return result;
  }
}
