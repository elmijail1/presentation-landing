import { SkillsService } from './skills.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { EMySkillRelation, type MSkill } from './models/skill.model.js';

describe('SkillsService', () => {
  let skillsService: SkillsService;
  let prisma: PrismaService;

  const skill: MSkill = {
    id: 'skill-1',
    name: 'JavaScript',
    myRelation: EMySkillRelation.HAVE,
  };

  beforeEach(() => {
    prisma = {
      skillNameVariant: {
        findFirst: vi.fn(),
      },
      skill: {
        findFirst: vi.fn(),
      },
    } as unknown as PrismaService;

    skillsService = new SkillsService(prisma);
  });

  it('returns the skill found via a name variant, without querying skill.findFirst', async () => {
    (
      prisma.skillNameVariant.findFirst as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce({ id: 'variant-1', spelling: 'JS', skillId: skill.id, skill });

    const result = await skillsService.findByNameOrVariant('JS');

    expect(result).toBe(skill);
    expect(prisma.skill.findFirst).not.toHaveBeenCalled();
  });

  it('falls back to a direct name match when no variant is found', async () => {
    (
      prisma.skillNameVariant.findFirst as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce(null);
    (prisma.skill.findFirst as ReturnType<typeof vi.fn>).mockResolvedValueOnce(skill);

    const result = await skillsService.findByNameOrVariant('JavaScript');

    expect(result).toBe(skill);
  });

  it('returns null when neither a variant nor a direct name match is found', async () => {
    (
      prisma.skillNameVariant.findFirst as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce(null);
    (prisma.skill.findFirst as ReturnType<typeof vi.fn>).mockResolvedValueOnce(null);

    const result = await skillsService.findByNameOrVariant('some-unknown-skill');

    expect(result).toBeNull();
  });
});
