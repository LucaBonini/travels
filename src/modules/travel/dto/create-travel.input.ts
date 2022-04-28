import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { Moods } from '../entities/travel.entity';

@InputType()
export class MoodsInput {
  @Field(() => Int)
  nature: number;
  @Field(() => Int)
  relax: number;
  @Field(() => Int)
  history: number;
  @Field(() => Int)
  culture: number;
  @Field(() => Int)
  party: number;
}

@InputType()
export class CreateTravelInput {
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
