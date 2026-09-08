import { Module } from '@nestjs/common';
import { MatchResolver } from './match.resolver.js';
import { MatchService } from './match.service.js';
import { SkillsModule } from '../skills/skills.module.js';
import { UserSkillsModule } from '../user-skills/user-skills.module.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [SkillsModule, UserSkillsModule, UsersModule],
  providers: [MatchResolver, MatchService],
})
export class MatchModule {}
