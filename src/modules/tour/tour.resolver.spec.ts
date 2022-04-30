import { Test, TestingModule } from '@nestjs/testing';
import { TourResolver } from './tour.resolver';
import { TourService } from './tour.service';

describe('TourResolver', () => {
  let resolver: TourResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TourResolver, TourService],
    }).compile();

    resolver = module.get<TourResolver>(TourResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
