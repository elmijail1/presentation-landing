import { MatchService } from './match.service.js';
import { SkillsService } from '../skills/skills.service.js';
import { UserSkillsService } from '../user-skills/user-skills.service.js';
import { UsersService } from '../users/users.service.js';
import { EMySkillRelation } from '../skills/models/skill.model.js';
import type { MUser } from '../users/models/user.model.js';

describe('MatchService', () => {
  let matchService: MatchService;
  let skillsService: SkillsService;
  let userSkillsService: UserSkillsService;
  let usersService: UsersService;

  const mockUser: MUser = {
    id: 'user-1',
    name: 'Test User',
    registeredOn: new Date(),
  };

  beforeEach(() => {
    skillsService = {
      findByNameOrVariant: vi.fn(),
    } as unknown as SkillsService;

    userSkillsService = {
      connect: vi.fn(),
    } as unknown as UserSkillsService;

    usersService = {
      findOrCreate: vi.fn().mockResolvedValue(mockUser),
    } as unknown as UsersService;

    matchService = new MatchService(
      skillsService,
      userSkillsService,
      usersService,
    );
  });

  it('counts a found skill with myRelation HAVE as matched, and connects it with lookingForDevsWithIt: true', async () => {
    const skill = {
      id: 'skill-1',
      name: 'React',
      myRelation: EMySkillRelation.HAVE,
    };
    (
      skillsService.findByNameOrVariant as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce(skill);

    const result = await matchService.submit(mockUser.id, ['react']);

    expect(result.matchedSkills).toEqual([skill]);
    expect(result.missingSkillNames).toEqual([]);
    expect(userSkillsService.connect).toHaveBeenCalledWith(
      mockUser.id,
      skill.id,
      undefined,
      true,
    );
  });

  it('counts a found skill with myRelation WANT_TO_LEARN as missing, not matched', async () => {
    const skill = {
      id: 'skill-2',
      name: 'Docker',
      myRelation: EMySkillRelation.WANT_TO_LEARN,
    };
    (
      skillsService.findByNameOrVariant as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce(skill);

    const result = await matchService.submit(mockUser.id, ['docker']);

    expect(result.matchedSkills).toEqual([]);
    expect(result.missingSkillNames).toEqual(['docker']);
    expect(userSkillsService.connect).toHaveBeenCalledWith(
      mockUser.id,
      skill.id,
      undefined,
      true,
    );
  });

  it('counts an unrecognized name as missing, and never calls connect for it', async () => {
    (
      skillsService.findByNameOrVariant as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce(null);

    const result = await matchService.submit(mockUser.id, [
      'some-unknown-skill',
    ]);

    expect(result.matchedSkills).toEqual([]);
    expect(result.missingSkillNames).toEqual(['some-unknown-skill']);
    expect(userSkillsService.connect).not.toHaveBeenCalled();
  });

  it('returns the userId resolved by usersService.findOrCreate, not the raw input', async () => {
    const resolvedUser: MUser = { ...mockUser, id: 'resolved-user-id' };
    (
      usersService.findOrCreate as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce(resolvedUser);
    (
      skillsService.findByNameOrVariant as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce(null);

    const result = await matchService.submit(undefined, ['react']);

    expect(result.userId).toBe('resolved-user-id');
  });
});
