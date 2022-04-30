import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { Travel } from 'src/modules/travel/entities/travel.entity';
import { TravelerInput } from './traveler.input';

@InputType()
export class CreateTourInput {
  @Field(() => String)
  travel: Travel;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  startingDate: Date;

  @Field(() => Date)
  endingDate: Date;

  @Field(() => Int)
  price: number;

  // @Field(() => [TravelerInput], {nullable: true})
  // travelers: TravelerInput[]
}
