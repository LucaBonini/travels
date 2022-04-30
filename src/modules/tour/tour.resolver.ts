import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { TourService } from './tour.service';
import { Tour } from './entities/tour.entity';
import { CreateTourInput } from './dto/create-tour.input';
import { UpdateTourInput } from './dto/update-tour.input';

@Resolver(() => Tour)
export class TourResolver {
  constructor(
    private readonly tourService: TourService
    ) {}

  @Mutation(() => Tour)
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
  updateTour(@Args('updateTourInput') updateTourInput: UpdateTourInput) {
    return this.tourService.update(updateTourInput.id, updateTourInput);
  }

  @Mutation(() => Boolean)
  removeTour(@Args('id', { type: () => ID }) id: string) {
    return this.tourService.remove(id);
  }
}
