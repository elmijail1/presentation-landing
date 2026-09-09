import { Mutation, Resolver } from '@nestjs/graphql';
import { MUser } from './models/user.model.js';
import { UsersService } from './users.service.js';

@Resolver(() => MUser)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => MUser)
  createGuestUser(): Promise<MUser> {
    return this.usersService.create();
  }
}
