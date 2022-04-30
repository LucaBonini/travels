import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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

  @Query(() => [Tour], { name: 'tour' })
  findAll() {
    return this.tourService.findAll();
  }

  @Query(() => Tour, { name: 'tour' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tourService.findOne(id);
  }

  @Mutation(() => Tour)
  updateTour(@Args('updateTourInput') updateTourInput: UpdateTourInput) {
    return this.tourService.update(updateTourInput.id, updateTourInput);
  }

  @Mutation(() => Tour)
  removeTour(@Args('id', { type: () => Int }) id: number) {
    return this.tourService.remove(id);
  }
}
