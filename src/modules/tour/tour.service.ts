import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTourInput } from './dto/create-tour.input';
import { UpdateTourInput } from './dto/update-tour.input';
import { TourRepository } from './repositories/tour.repository';
import * as moment from 'moment';
import { LessThan } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TravelerRepository } from './repositories/traveler.repository';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(TourRepository)
    private readonly tourRepository: TourRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly travelerRepository: TravelerRepository
  ) {}

  async create(createTourInput: CreateTourInput) {
    const tour = this.tourRepository.create(createTourInput);
    const { id } = await this.tourRepository.save(tour);
    return await this.tourRepository.findOne(id);
  }

  findOne(id: string) {
    return this.tourRepository.findOne(id);
  }

  async update(id: string, updateTourInput: UpdateTourInput) {
    const tour = await this.tourRepository.findOne({ id });
    if (!tour) {
      throw new NotFoundException('tour not found');
    }
    let existingTravelers = [];
    if (updateTourInput.travelers) {
      existingTravelers = await this.travelerRepository.getByEmails(updateTourInput.travelers.map(t => t.email));
      if (existingTravelers) {
        updateTourInput.travelers = updateTourInput.travelers.map(traveler => {
          return existingTravelers.find(t => t.email == traveler.email) || traveler;
        })
      }
    }

    return await this.tourRepository.save({
      ...tour,
      ...updateTourInput,
    }, {reload: true});
  }

  async remove(id: string) {
    const res = await this.tourRepository.delete(id);
    return !!res.affected;
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async findUpcomingsAndNotify() {
    const fiveDaysAHead = moment().add(5, 'days').toDate();
    const tours = await this.tourRepository.find({
      notificationSent: false,
      startingDate: LessThan(fiveDaysAHead)
    });

    const toNotify = await this.tourRepository.save(
      tours.map((tour) => {
        tour.notificationSent = true;
        return tour;
      })
    );
    this.eventEmitter.emit('notify.travelers', toNotify);
  }
}
