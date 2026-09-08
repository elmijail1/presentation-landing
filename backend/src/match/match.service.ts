import { Injectable } from '@nestjs/common';
import { SkillsService } from '../skills/skills.service.js';
import { UserSkillsService } from '../user-skills/user-skills.service.js';
import { MMatchResult } from './models/match-result.model.js';
import { EMySkillRelation } from '../skills/models/skill.model.js';

@Injectable()
export class MatchService {
  constructor(
    private readonly skillsService: SkillsService,
    private readonly userSkillsService: UserSkillsService,
  ) {}

  submit(userId: string, skillNames: string[]): MMatchResult {
    const allSkills = this.skillsService.findAll();
    const result: MMatchResult = { matchedSkills: [], missingSkillNames: [] };

    for (const rawName of skillNames) {
      const skill = allSkills.find(
        (s) => s.name.toLowerCase() === rawName.toLowerCase(),
      );
      if (skill) {
        this.userSkillsService.connect(userId, skill.id, undefined, true);
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
