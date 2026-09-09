import { Injectable } from '@nestjs/common';
import { EKnowledgeStatus, MUserSkill } from './model/user-skill.model.js';
import { userSkillsData } from './user-skills.data.js';
import { randomUUID } from 'crypto';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class UserSkillsService {
  constructor(private readonly usersService: UsersService) {}

  async connect(
    userId: string | undefined,
    skillId: string,
    knowledgeStatus?: EKnowledgeStatus,
    lookingForDevsWithIt?: boolean,
  ): Promise<MUserSkill> {
    const user = await this.usersService.findOrCreate(userId);
    const userIdSafe = user.id;

    const existing = userSkillsData.find(
      (userSkill) =>
        userSkill.userId === userIdSafe && userSkill.skillId === skillId,
    );
    if (existing) {
      if (knowledgeStatus !== undefined) {
        existing.knowledgeStatus = knowledgeStatus;
      }
      if (lookingForDevsWithIt !== undefined) {
        existing.lookingForDevsWithIt = lookingForDevsWithIt;
      }
      return existing;
    }

    const newUserSkill: MUserSkill = {
      id: randomUUID(),
      userId: userIdSafe,
      skillId,
      knowledgeStatus,
      lookingForDevsWithIt:
        lookingForDevsWithIt !== undefined ? lookingForDevsWithIt : false,
    };
    userSkillsData.push(newUserSkill);
    return newUserSkill;
  }

  findByUser(userId: string): MUserSkill[] {
    return userSkillsData.filter((userSkill) => userSkill.userId === userId);
  }
}
