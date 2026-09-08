import { join } from 'node:path';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SkillsModule } from './skills/skills.module.js';
import { UsersModule } from './users/users.module.js';
import { UserSkillsModule } from './user-skills/user-skills.module.js';
import { MatchModule } from './match/match.module.js';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    SkillsModule,
    UsersModule,
    UserSkillsModule,
    MatchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
