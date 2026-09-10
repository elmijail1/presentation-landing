import { UsersService } from './users.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { MUser } from './models/user.model.js';

describe('UsersService', () => {
  let usersService: UsersService;
  let prisma: PrismaService;

  const existingUser: MUser = {
    id: 'existing-user-id',
    name: 'Existing User',
    registeredOn: new Date(),
  };

  const newUser: MUser = {
    id: 'new-user-id',
    name: 'New Guest',
    registeredOn: new Date(),
  };

  beforeEach(() => {
    prisma = {} as unknown as PrismaService;
    usersService = new UsersService(prisma);
  });

  it('returns the existing user when userId is given and it resolves to one, without creating a new one', async () => {
    vi.spyOn(usersService, 'findById').mockResolvedValueOnce(existingUser);
    const createSpy = vi.spyOn(usersService, 'create');

    const result = await usersService.findOrCreate(existingUser.id);

    expect(result).toBe(existingUser);
    expect(createSpy).not.toHaveBeenCalled();
  });

  it('creates a new user when userId is given but does not resolve to an existing one', async () => {
    vi.spyOn(usersService, 'findById').mockResolvedValueOnce(null);
    vi.spyOn(usersService, 'create').mockResolvedValueOnce(newUser);

    const result = await usersService.findOrCreate('stale-user-id');

    expect(result).toBe(newUser);
  });

  it('creates a new user directly, without calling findById, when userId is omitted', async () => {
    const findByIdSpy = vi.spyOn(usersService, 'findById');
    vi.spyOn(usersService, 'create').mockResolvedValueOnce(newUser);

    const result = await usersService.findOrCreate();

    expect(result).toBe(newUser);
    expect(findByIdSpy).not.toHaveBeenCalled();
  });
});
