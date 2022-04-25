import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginResponse {

  @Field(type => String)
  accessToken: string
}