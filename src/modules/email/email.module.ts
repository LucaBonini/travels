import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TourModule } from '../tour/tour.module';
import { EmailConsumer } from './email.processor';
import { EmailService } from './email.service';

@Module({
  imports: [
    TourModule,
    BullModule.registerQueueAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'travelers',
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT')
        }
      })
    })
  ],
  providers: [EmailService, EmailConsumer]
})
export class EmailModule {}
