import { Field, ID, InputType } from "@nestjs/graphql"

@InputType()
export class TravelerInput {

  @Field(() => String)
  fullname: string

  @Field(() => String)
  email: string
}