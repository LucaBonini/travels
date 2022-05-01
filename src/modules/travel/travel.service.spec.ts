import { Test, TestingModule } from '@nestjs/testing';
import { TravelRepository } from './repositories/travel.repository';
import { TravelResolver } from './travel.resolver';
import { TravelService } from './travel.service';

describe('TravelService', () => {
  let service: TravelService;
  let travelRepository;

  const createTravelInput = {
      isPublic: true,
      slug: "first travel",
      name: "first travel name",
      description: "description first travel",
      nDays: 10,
      moods: {
        nature: 100,
        relax: 20,
        history: 50,
        culture: 100,
        party: 40
      }
  }
  const mockCreatedValue = {
    isPublic: true,
    slug: "first travel",
    name: "first travel name",
    description: "description first travel",
    nDays: 10,
    nNights: 9,
    moods: {
      nature: 100,
      relax: 20,
      history: 50,
      culture: 100,
      party: 40
    }
}

  const mockTravelRepository = () => ({
    createTravel: jest.fn(),
    findAndCount: jest.fn(),
    delete: jest.fn(),
    update: jest.fn()
  })

  const mockTravelResolver = () => ({});

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TravelService,
        { provide: TravelRepository, useFactory: mockTravelRepository },
        { provide: TravelResolver, useFactory: mockTravelResolver }
      ]
    }).compile();

    service = module.get<TravelService>(TravelService);
    travelRepository = module.get<TravelRepository>(TravelRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create travel', () => {
    it('should create a travel and return a travel entity', async () => {
      travelRepository.createTravel.mockResolvedValue(mockCreatedValue);
      expect(travelRepository.createTravel).not.toHaveBeenCalled();
      const result = await service.create(createTravelInput);
      expect(result).toStrictEqual(mockCreatedValue);
      expect(result).toHaveProperty('nNights');
      expect(result.nNights).toBe(createTravelInput.nDays - 1);
    })
  })
});
