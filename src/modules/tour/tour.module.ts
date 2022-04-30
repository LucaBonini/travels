import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourResolver } from './tour.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourRepository } from './repositories/tour.repository';
import { TravelerRepository } from './repositories/traveler.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TourRepository, TravelerRepository])
  ],
  providers: [TourResolver, TourService],
  exports: [TourService],
})
export class TourModule {}
