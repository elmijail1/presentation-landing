import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MMatchResult } from './models/match-result.model.js';
import { MatchService } from './match.service.js';
import { SubmitMatchInput } from './dto/submit-match.input.js';

@Resolver(() => MMatchResult)
export class MatchResolver {
  constructor(private readonly matchService: MatchService) {}

  @Mutation(() => MMatchResult)
  submitMatch(@Args('input') input: SubmitMatchInput): MMatchResult {
    return this.matchService.submit(input.userId, input.skillNames);
  }
}
