import { Injectable } from '@nestjs/common';
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
    private readonly travelRepository: TravelRepository,
  ) {}

  create(createTravelInput: CreateTravelInput) {
    return this.travelRepository.createTravel(createTravelInput);
  }

  async findAll(paginationInput: PaginationInput) {
    const { page, pageSize, slug, name, numberOfDays, sort, orderBy } =
      paginationInput;
    let where = {};
    if (slug) {
      where = {
        ...where,
        slug: Like(`%${slug}%`),
      };
    }
    if (name) {
      where = {
        ...where,
        name: Like(`%${name}%`),
      };
    }
    if (numberOfDays) {
      where = {
        ...where,
        nDays: numberOfDays,
      };
    }

    let options: any = {
      take: pageSize,
      skip: pageSize * (page - 1),
      where,
    };

    if (orderBy) {
      options.order = {
        [orderBy]: sort,
      };
    }
    const [result, total] = await this.travelRepository.findAndCount(options);

    return {
      travels: result,
      page,
      pageCount: total / pageSize > 1 ? total / pageSize : 1,
      pageSize,
    };
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
