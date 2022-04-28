import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTravelInput } from './dto/create-travel.input';
import { UpdateTravelInput } from './dto/update-travel.input';
import { TravelRepository } from './repositories/travel.repository';

@Injectable()
export class TravelService {

  constructor(
    @InjectRepository(TravelRepository) private readonly travelRepository: TravelRepository
  ) {}

  create(createTravelInput: CreateTravelInput) {
    return this.travelRepository.createTravel(createTravelInput);
  }

  findAll() {
    return `This action returns all travel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} travel`;
  }

  update(id: string, updateTravelInput: UpdateTravelInput) {
    return `This action updates a #${id} travel`;
  }

  remove(id: number) {
    return `This action removes a #${id} travel`;
  }
}
