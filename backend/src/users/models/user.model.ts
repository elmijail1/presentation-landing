import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MUser {
    @Field(() => ID)
    id!: string

    @Field()
    name!: string

    @Field()
    registeredOn!: Date
}