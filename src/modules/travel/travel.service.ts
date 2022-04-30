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

  async findAll(page: number, pageSize: number) {
    const [ result, total ] = await this.travelRepository.findAndCount({
      take: pageSize,
      skip: pageSize * (page - 1)
    });

    console.log(total, 'total')

    return {
      travels: result,
      page,
      pageCount: total / pageSize,
      pageSize
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} travel`;
  }

  update(id: string, updateTravelInput: UpdateTravelInput) {
    return `This action updates a #${id} travel`;
  }

  async remove(id: string) {
    const res = await this.travelRepository.delete(id);
    return !!res.affected;
  }
}
