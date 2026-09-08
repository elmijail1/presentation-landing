import { Module } from '@nestjs/common';
import { UserSkillsResolver } from './user-skills.resolver.js';
import { UserSkillsService } from './user-skills.service.js';

@Module({
  providers: [UserSkillsResolver, UserSkillsService],
  exports: [UserSkillsService],
})
export class UserSkillsModule {}
