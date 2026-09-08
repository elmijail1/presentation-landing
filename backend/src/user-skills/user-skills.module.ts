import { Module } from '@nestjs/common';
import { UserSkillsResolver } from './user-skills.resolver.js';
import { UserSkillsService } from './user-skills.service.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [UsersModule],
  providers: [UserSkillsResolver, UserSkillsService],
  exports: [UserSkillsService],
})
export class UserSkillsModule {}
