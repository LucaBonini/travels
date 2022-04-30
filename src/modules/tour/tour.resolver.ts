import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TourService } from './tour.service';
import { Tour } from './entities/tour.entity';
import { CreateTourInput } from './dto/create-tour.input';
import { UpdateTourInput } from './dto/update-tour.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { RoleEnum } from '../auth/entities/role.entity';
import { Roles } from '../auth/decorators/role.decorator';
import { RolesGuard } from '../auth/guard/role.guard';

@Resolver(() => Tour)
export class TourResolver {
  constructor(private readonly tourService: TourService) {}

  @Mutation(() => Tour)
  @Roles(RoleEnum.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  createTour(@Args('createTourInput') createTourInput: CreateTourInput) {
    return this.tourService.create(createTourInput);
  }

  @Query(() => [Tour], { name: 'tours' })
  findAll() {
    return this.tourService.findAll();
  }

  @Query(() => Tour, { name: 'tour' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.tourService.findOne(id);
  }

  @Mutation(() => Tour)
  @Roles(RoleEnum.ADMIN, RoleEnum.EDITOR)
  @UseGuards(GqlAuthGuard, RolesGuard)
  updateTour(@Args('updateTourInput') updateTourInput: UpdateTourInput) {
    return this.tourService.update(updateTourInput.id, updateTourInput);
  }

  @Mutation(() => Boolean)
  @Roles(RoleEnum.ADMIN, RoleEnum.EDITOR) // should an editore be able to delete it?
  @UseGuards(GqlAuthGuard, RolesGuard)
  removeTour(@Args('id', { type: () => ID }) id: string) {
    return this.tourService.remove(id);
  }
}
