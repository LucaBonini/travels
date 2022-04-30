import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { TravelService } from './travel.service';
import { Travel } from './entities/travel.entity';
import { CreateTravelInput } from './dto/create-travel.input';
import { UpdateTravelInput } from './dto/update-travel.input';
import { TravelPaginatedResult } from './types/travel-paginated-result.type';
import { PaginationInput } from './dto/pagination.input';
import {
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { RoleEnum } from '../auth/entities/role.entity';
import { RolesGuard } from '../auth/guard/role.guard';

@Resolver(() => Travel)
export class TravelResolver {
  constructor(private readonly travelService: TravelService) {}

  @Mutation(() => Travel)
  @Roles(RoleEnum.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  createTravel(
    @Args('createTravelInput') createTravelInput: CreateTravelInput,
  ) {
    return this.travelService.create(createTravelInput);
  }

  @Query(() => TravelPaginatedResult, { name: 'travels' })
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Args('paginationInput') paginationInput: PaginationInput) {
    return this.travelService.findAll(paginationInput);
  }

  @Query(() => Travel, { name: 'travel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.travelService.findOne(id);
  }

  @Mutation(() => Travel)
  @Roles(RoleEnum.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  updateTravel(
    @Args('updateTravelInput') updateTravelInput: UpdateTravelInput,
  ) {
    return this.travelService.update(updateTravelInput.id, updateTravelInput);
  }

  @Mutation(() => Boolean)
  @Roles(RoleEnum.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  removeTravel(@Args('id', { type: () => ID }) id: string) {
    return this.travelService.remove(id);
  }
}
