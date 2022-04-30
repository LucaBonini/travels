import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Travel } from '../entities/travel.entity';

@ObjectType()
export class TravelPaginatedResult {
  @Field(() => [Travel])
  travels: Travel[];

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;

  @Field(() => Int)
  pageCount: number;
}
