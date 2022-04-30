import { EntityRepository, Repository } from 'typeorm';
import { CreateTravelInput } from '../dto/create-travel.input';
import { Travel } from '../entities/travel.entity';

@EntityRepository(Travel)
export class TravelRepository extends Repository<Travel> {
  async createTravel(createTravelInput: CreateTravelInput) {
    const travel = this.create(createTravelInput);
    travel.nNights = travel.nDays - 1 > 0 ? travel.nDays - 1 : 0;
    return await this.save(travel);
  }
}
