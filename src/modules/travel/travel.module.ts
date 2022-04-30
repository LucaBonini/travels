import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelResolver } from './travel.resolver';
import { TravelRepository } from './repositories/travel.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TravelRepository])],
  providers: [TravelResolver, TravelService]
})
export class TravelModule {}
