import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { CreateTravelInput } from './dto/create-travel.input';
import { PaginationInput } from './dto/pagination.input';
import { UpdateTravelInput } from './dto/update-travel.input';
import { TravelRepository } from './repositories/travel.repository';

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(TravelRepository)
    private readonly travelRepository: TravelRepository
  ) {}

  create(createTravelInput: CreateTravelInput) {
    try {
      return this.travelRepository.createTravel(createTravelInput);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAll(paginationInput: PaginationInput) {
    const { page, pageSize, slug, name, numberOfDays, sort, orderBy } =
      paginationInput;
    let where = {};
    if (slug) {
      where = {
        ...where,
        slug: Like(`%${slug}%`)
      };
    }
    if (name) {
      where = {
        ...where,
        name: Like(`%${name}%`)
      };
    }
    if (numberOfDays) {
      where = {
        ...where,
        nDays: numberOfDays
      };
    }

    let options: any = {
      take: pageSize,
      skip: pageSize * (page - 1),
      where
    };

    if (orderBy) {
      options.order = {
        [orderBy]: sort
      };
    }
    const [result, total] = await this.travelRepository.findAndCount(options);
    return {
      travels: result,
      page,
      pageCount: total / pageSize > 1 ? total / pageSize : 1,
      pageSize
    };
  }

  findOne(id: string) {
    return this.travelRepository.findOne(id);
  }

  async update(id: string, updateTravelInput: UpdateTravelInput) {
    const travel = await this.travelRepository.findOne(id);
    if (!travel) {
      throw new NotFoundException('travel not found');
    }
    return await this.travelRepository.save({
      ...travel,
      ...updateTravelInput
    });
  }

  async remove(id: string) {
    const res = await this.travelRepository.delete(id);
    return !!res.affected;
  }
}
