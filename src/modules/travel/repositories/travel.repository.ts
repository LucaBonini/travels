import { EntityRepository, Repository } from 'typeorm';
import { CreateTravelInput } from '../dto/create-travel.input';
import { Travel } from '../entities/travel.entity';

@EntityRepository(Travel)
export class TravelRepository extends Repository<Travel> {
  async createTravel(createTravelInput: CreateTravelInput) {
    const travel = this.create(createTravelInput);
    return await this.save(travel);
  }
}
