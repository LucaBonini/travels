import { CreateTravelInput, MoodsInput } from './create-travel.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTravelInput extends PartialType(CreateTravelInput) {
  @Field(() => ID)
  id: string

  @Field(() => Boolean)
  isPublic: boolean

  @Field(() => String, { description: 'Example field (placeholder)' })
  slug: string;

  @Field(() => String)
  name: string

  @Field(() => String)
  description: string

  @Field(() => Int)
  nDays: number

  @Field(() => MoodsInput)
  moods: MoodsInput
}
