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

  async findByNameOrVariant(rawName: string): Promise<MSkill | null> {
    const viaVariant = await this.prisma.skillNameVariant.findFirst({
      where: { spelling: { equals: rawName, mode: `insensitive` } },
      include: { skill: true },
    });
    if (viaVariant) return viaVariant.skill;

    return this.prisma.skill.findFirst({
      where: { name: { equals: rawName, mode: 'insensitive' } },
    });
  }
}
