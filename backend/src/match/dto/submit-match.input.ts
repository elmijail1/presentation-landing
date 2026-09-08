import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class SubmitMatchInput {
  @Field(() => ID)
  userId!: string;

  @Field(() => [String])
  skillNames!: string[];
}
