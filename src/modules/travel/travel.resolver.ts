import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { TravelService } from './travel.service';
import { Travel } from './entities/travel.entity';
import { CreateTravelInput } from './dto/create-travel.input';
import { UpdateTravelInput } from './dto/update-travel.input';
import { TravelPaginatedResult } from './types/travel-paginated-result.type';
import { PaginationInput } from './dto/pagination.input';

@Resolver(() => Travel)
export class TravelResolver {
  constructor(private readonly travelService: TravelService) {}

  @Mutation(() => Travel)
  createTravel(
    @Args('createTravelInput') createTravelInput: CreateTravelInput,
  ) {
    return this.travelService.create(createTravelInput);
  }

  @Query(() => TravelPaginatedResult, { name: 'travels' })
  findAll(@Args('paginationInput') paginationInput: PaginationInput) {
    return this.travelService.findAll(paginationInput);
  }

  @Query(() => Travel, { name: 'travel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.travelService.findOne(id);
  }

  @Mutation(() => Travel)
  updateTravel(
    @Args('updateTravelInput') updateTravelInput: UpdateTravelInput,
  ) {
    return this.travelService.update(updateTravelInput.id, updateTravelInput);
  }

  @Mutation(() => Boolean)
  removeTravel(@Args('id', { type: () => ID }) id: string) {
    return this.travelService.remove(id);
  }
}
