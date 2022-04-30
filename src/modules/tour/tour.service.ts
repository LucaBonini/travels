import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTourInput } from './dto/create-tour.input';
import { UpdateTourInput } from './dto/update-tour.input';
import { Traveler } from './entities/traveler.entity';
import { TourRepository } from './repositories/tour.repository';
import { TravelerRepository } from './repositories/traveler.repository';

@Injectable()
export class TourService {

  constructor(
    @InjectRepository(TourRepository) private readonly tourRepository: TourRepository,
    @InjectRepository(TravelerRepository) private readonly travelerRepository: TravelerRepository
  ) {}

  async create(createTourInput: CreateTourInput) {
    const tour = this.tourRepository.create(createTourInput);
    const { id } = await this.tourRepository.save(tour);
    return await this.tourRepository.findOne(id);
  }

  findAll() {
    return `This action returns all tour`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tour`;
  }

  async update(id: string, updateTourInput: UpdateTourInput) {
    // const travelers = updateTourInput.travelers;
    // let travelersIds: Traveler[] = [];
    // if (travelers && travelers.length) {
    //   const travelerEntities = this.travelerRepository.create(travelers);
    //   travelersIds = (await this.travelerRepository.save(travelerEntities));
    // }
    const tour = await this.tourRepository.findOne({id});
    if (!tour) {
      throw new NotFoundException('tour not found');
    }
    // const tourUpdated = {
    //   ...updateTourInput,
    //   travelers: travelersIds
    // };
    
    await this.tourRepository.save({
      ...tour, 
      ...updateTourInput, 
      travelers: [
        ...(tour.travelers || []),
        ...(updateTourInput.travelers || [])
    ]});
    return this.tourRepository.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} tour`;
  }
}
