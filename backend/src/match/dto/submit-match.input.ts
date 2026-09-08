import { Field, ID, InputType } from '@nestjs/graphql';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsOptional,
  IsString,
} from 'class-validator';
import { MATCH_ARRAY_LIMITS } from '../../config.js';

@InputType()
export class SubmitMatchInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  userId?: string;

  @Field(() => [String])
  @ArrayMinSize(MATCH_ARRAY_LIMITS.min)
  @ArrayMaxSize(MATCH_ARRAY_LIMITS.max)
  @IsString({ each: true })
  skillNames!: string[];
}
