import { CreateTourInput } from './create-tour.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { TravelerInput } from './traveler.input';

@InputType()
export class UpdateTourInput extends PartialType(CreateTourInput) {
  @Field(() => ID)
  id: string;

  @Field(() => [TravelerInput], { nullable: true })
  travelers?: TravelerInput[];
}
