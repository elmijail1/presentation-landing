import { UserSkillsService } from './user-skills.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersService } from '../users/users.service.js';
import { EKnowledgeStatus, type MUserSkill } from './model/user-skill.model.js';
import type { MUser } from '../users/models/user.model.js';

describe('UserSkillsService', () => {
  let userSkillsService: UserSkillsService;
  let prisma: PrismaService;
  let usersService: UsersService;

  const resolvedUser: MUser = {
    id: 'resolved-user-id',
    name: 'Test User',
    registeredOn: new Date(),
  };

  const mockUserSkill: MUserSkill = {
    id: 'user-skill-1',
    userId: resolvedUser.id,
    skillId: 'skill-1',
    knowledgeStatus: EKnowledgeStatus.HAS,
    lookingForDevsWithIt: true,
  };

  beforeEach(() => {
    prisma = {
      userSkill: {
        upsert: vi.fn().mockResolvedValue(mockUserSkill),
      },
    } as unknown as PrismaService;

    usersService = {
      findOrCreate: vi.fn().mockResolvedValue(resolvedUser),
    } as unknown as UsersService;

    userSkillsService = new UserSkillsService(prisma, usersService);
  });

  it('resolves the user via findOrCreate and upserts keyed on the resolved user id, forwarding explicit values', async () => {
    await userSkillsService.connect(
      'raw-input-user-id',
      'skill-1',
      EKnowledgeStatus.HAS,
      true,
    );

    expect(usersService.findOrCreate).toHaveBeenCalledWith('raw-input-user-id');
    expect(prisma.userSkill.upsert).toHaveBeenCalledWith({
      where: { userId_skillId: { userId: resolvedUser.id, skillId: 'skill-1' } },
      create: {
        userId: resolvedUser.id,
        skillId: 'skill-1',
        knowledgeStatus: EKnowledgeStatus.HAS,
        lookingForDevsWithIt: true,
      },
      update: {
        knowledgeStatus: EKnowledgeStatus.HAS,
        lookingForDevsWithIt: true,
      },
    });
  });

  it('passes knowledgeStatus and lookingForDevsWithIt through as undefined when omitted, rather than defaulting them', async () => {
    await userSkillsService.connect('raw-input-user-id', 'skill-1');

    expect(prisma.userSkill.upsert).toHaveBeenCalledWith({
      where: { userId_skillId: { userId: resolvedUser.id, skillId: 'skill-1' } },
      create: {
        userId: resolvedUser.id,
        skillId: 'skill-1',
        knowledgeStatus: undefined,
        lookingForDevsWithIt: undefined,
      },
      update: {
        knowledgeStatus: undefined,
        lookingForDevsWithIt: undefined,
      },
    });
  });

  it('returns whatever prisma.userSkill.upsert resolves to', async () => {
    const result = await userSkillsService.connect('raw-input-user-id', 'skill-1');

    expect(result).toBe(mockUserSkill);
  });
});
