import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { EMySkillRelation, MSkill } from './models/skill.model.js';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(myRelation?: EMySkillRelation): Promise<MSkill[]> {
    return this.prisma.skill.findMany({
      where: myRelation ? { myRelation } : undefined,
    });
  }
}
