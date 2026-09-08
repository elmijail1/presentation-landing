import { Injectable } from '@nestjs/common';
import { EKnowledgeStatus, MUserSkill } from './model/user-skill.model.js';
import { userSkillsData } from './user-skills.data.js';
import { randomUUID } from 'crypto';

@Injectable()
export class UserSkillsService {
  connect(
    userId: string,
    skillId: string,
    knowledgeStatus?: EKnowledgeStatus,
    lookingForDevsWithIt?: boolean,
  ): MUserSkill {
    const existing = userSkillsData.find(
      (userSkill) =>
        userSkill.userId === userId && userSkill.skillId === skillId,
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
      userId,
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
