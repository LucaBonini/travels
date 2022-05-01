import { Test, TestingModule } from '@nestjs/testing';
import { TravelRepository } from './repositories/travel.repository';
import { TravelResolver } from './travel.resolver';
import { TravelService } from './travel.service';
import * as travels from '../../../data/travels.json';
import { Order } from './dto/pagination.input';

describe('TravelService', () => {
  let service: TravelService;
  let travelRepository;
  const mockTravels = travels.map((travel) => ({ ...travel, travelers: [] }));
  const mockTravelsResult = {
    travels: mockTravels,
    page: 1,
    pageCount: 1,
    pageSize: mockTravels.length
  };

  const updateTravelInput = {
    id: 'd408be33-aa6a-4c73-a2c8-58a70ab2ba4d',
    slug: 'jordan-360',
    name: 'Jordan 360 degree',
    description:
      'Jordan 360°: the perfect tour to discover the suggestive Wadi Rum desert, the ancient beauty of Petra, and much more.\n\nVisiting Jordan is one of the most fascinating things that everyone has to do once in their life.You are probably wondering "Why?". Well, that\'s easy: because this country keeps several passions! During our tour in Jordan, you can range from well-preserved archaeological masterpieces to trekkings, from natural wonders excursions to ancient historical sites, from camels trek in the desert to some time to relax.\nDo not forget to float in the Dead Sea and enjoy mineral-rich mud baths, it\'s one of the most peculiar attractions. It will be a tour like no other: this beautiful country leaves a memorable impression on everyone.',
    numberOfDays: 8,
    isPublic: true,
    nDays: 10,
    moods: {
      nature: 80,
      relax: 20,
      history: 90,
      culture: 30,
      party: 10
    }
  };

  const paginationInput = {
    page: 1,
    pageSize: mockTravels.length,
    sort: Order.ASC
  };

  const createTravelInput = {
    isPublic: true,
    slug: 'first travel',
    name: 'first travel name',
    description: 'description first travel',
    nDays: 10,
    moods: {
      nature: 100,
      relax: 20,
      history: 50,
      culture: 100,
      party: 40
    }
  };
  const mockCreatedValue = {
    isPublic: true,
    slug: 'first travel',
    name: 'first travel name',
    description: 'description first travel',
    nDays: 10,
    nNights: 9,
    moods: {
      nature: 100,
      relax: 20,
      history: 50,
      culture: 100,
      party: 40
    }
  };

  const mockTravelRepository = () => ({
    createTravel: jest.fn(),
    findAndCount: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn()
  });

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
    });
  });

  describe('find all travels', () => {
    it('should find the travels based on the search input', async () => {
      expect(travelRepository.findAll).not.toHaveBeenCalled();
      travelRepository.findAndCount.mockResolvedValue([
        mockTravels,
        mockTravels.length
      ]);
      const result = await service.findAll(paginationInput);
      expect(result.page).toBe(paginationInput.page);
      expect(result.pageCount).toBe(1);
      expect(result.pageSize).toBe(paginationInput.pageSize);
      expect(result.travels.length).toBe(mockTravels.length);
    });
  });

  describe('remove travel by id', () => {
    it('should remove the travel by id and return true', async () => {
      expect(travelRepository.delete).not.toHaveBeenCalled();
      travelRepository.delete.mockResolvedValue({ affected: 1 });
      const result = await service.remove(
        'd408be33-aa6a-4c73-a2c8-58a70ab2ba4d'
      );
      expect(result).toBe(true);
    });
  });

  describe('update travel', () => {
    it('should update travel data', async () => {
      expect(travelRepository.findOne).not.toHaveBeenCalled();
      expect(travelRepository.save).not.toHaveBeenCalled();
      travelRepository.findOne.mockResolvedValue(mockTravels[0]);
      travelRepository.save.mockResolvedValue({
        ...mockTravels[0],
        ...updateTravelInput
      });
      const result = await service.update(
        'd408be33-aa6a-4c73-a2c8-58a70ab2ba4d',
        updateTravelInput
      );
      expect(result.nDays).toBe(updateTravelInput.nDays);
      expect(result.name).toBe(updateTravelInput.name);
      expect(result.isPublic).toBe(updateTravelInput.isPublic);
    });
  });
});
