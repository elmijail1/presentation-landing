import { Injectable } from '@nestjs/common';
import { EKnowledgeStatus, MUserSkill } from './model/user-skill.model.js';
import { UsersService } from '../users/users.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UserSkillsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async connect(
    userId: string | undefined,
    skillId: string,
    knowledgeStatus?: EKnowledgeStatus,
    lookingForDevsWithIt?: boolean,
  ): Promise<MUserSkill> {
    const user = await this.usersService.findOrCreate(userId);
    return this.prisma.userSkill.upsert({
      where: { userId_skillId: { userId: user.id, skillId } },
      create: {
        userId: user.id,
        skillId,
        knowledgeStatus,
        lookingForDevsWithIt,
      },
      update: {
        knowledgeStatus,
        lookingForDevsWithIt,
      },
    });
  }

  findByUser(userId: string): Promise<MUserSkill[]> {
    return this.prisma.userSkill.findMany({ where: { userId } });
  }
}
