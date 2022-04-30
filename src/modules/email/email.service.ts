import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';
import { Tour } from '../tour/entities/tour.entity';

@Injectable()
export class EmailService {

  constructor(
    @InjectQueue('travelers') private travelersQueue: Queue
  ) {}

  @OnEvent('notify.travelers')
  notifyTravelers(tours: Tour[]) {
    tours.forEach(tour => {
      Promise.all(tour.travelers?.map(traveler => {
        return this.travelersQueue.add('email-departue', traveler)
      }))
      .then(res => {
        console.log(`Emails for tour "${tour.name}" sent`);
      })
    })
  }
}
