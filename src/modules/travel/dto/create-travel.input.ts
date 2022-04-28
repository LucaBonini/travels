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
  
  @Field(() => Boolean, {nullable: false})
  isPublic: boolean

  @Field(() => String, { description: 'Example field (placeholder)', nullable: false })
  slug: string;

  @Field(() => String, {nullable: false})
  name: string

  @Field(() => String, {nullable: false})
  description: string

  @Field(() => Int, {nullable: false})
  nDays: number

  @Field(() => MoodsInput, {nullable: false})
  moods: MoodsInput
}
