import { Module } from '@nestjs/common';
import { MatchResolver } from './match.resolver.js';
import { MatchService } from './match.service.js';
import { SkillsModule } from '../skills/skills.module.js';
import { UserSkillsModule } from '../user-skills/user-skills.module.js';

@Module({
  imports: [SkillsModule, UserSkillsModule],
  providers: [MatchResolver, MatchService],
})
export class MatchModule {}
