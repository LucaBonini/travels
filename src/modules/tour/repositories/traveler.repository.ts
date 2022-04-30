import { EntityRepository, Repository } from 'typeorm';
import { Traveler } from '../entities/traveler.entity';

@EntityRepository(Traveler)
export class TravelerRepository extends Repository<Traveler> {}
