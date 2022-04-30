import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class PaginationInput {

  @Field(() =>  Int, {defaultValue: 1, nullable: true})
  page: number

  @Field(() =>  Int, {defaultValue: 10, nullable: true})
  pageSize: number

  @Field(() => String, {nullable: true})
  slug?: string

  @Field(() => String, {nullable: true})
  name?: string

  @Field(() => Int, {nullable: true})
  numberOfDays?: number
}