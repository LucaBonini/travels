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
    @InjectRepository(TourRepository)
    private readonly tourRepository: TourRepository,
    @InjectRepository(TravelerRepository)
    private readonly travelerRepository: TravelerRepository,
  ) {}

  async create(createTourInput: CreateTourInput) {
    const tour = this.tourRepository.create(createTourInput);
    const { id } = await this.tourRepository.save(tour);
    return await this.tourRepository.findOne(id);
  }

  findAll() {
    return this.tourRepository.find();
  }

  findOne(id: string) {
    return this.tourRepository.findOne(id);
  }

  async update(id: string, updateTourInput: UpdateTourInput) {
    const tour = await this.tourRepository.findOne({ id });
    if (!tour) {
      throw new NotFoundException('tour not found');
    }

    await this.tourRepository.save({
      ...tour,
      ...updateTourInput,
      travelers: [
        ...(tour.travelers || []),
        ...(updateTourInput.travelers || []),
      ],
    });
    return this.tourRepository.findOne(id);
  }

  async remove(id: string) {
    const res = await this.tourRepository.delete(id);
    return !!res.affected;
  }
}
