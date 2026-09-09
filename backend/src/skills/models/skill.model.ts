import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { EMySkillRelation } from '../../generated/prisma/enums.js';

export { EMySkillRelation };

registerEnumType(EMySkillRelation, {
  name: 'EMySkillRelation',
});

@ObjectType()
export class MSkill {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => EMySkillRelation, { nullable: true })
  myRelation: EMySkillRelation | null;
}
