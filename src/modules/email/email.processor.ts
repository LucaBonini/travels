import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Traveler } from '../tour/entities/traveler.entity';

@Processor('travelers')
export class EmailConsumer {
  @Process('email-departue')
  sendDepartueEmail(job: Job<Traveler>) {
    const { data } = job;
    console.log(`Hey ${data.fullname} is almost time to leave! Excited?`);
  }
}
