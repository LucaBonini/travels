import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import * as moment from 'moment';
import { TourRepository } from './repositories/tour.repository';
import { TravelerRepository } from './repositories/traveler.repository';
import { TourService } from './tour.service';

describe('TourService', () => {
  let service: TourService;
  let tourRepository;
  let travelerRepository;

  const mockToursRepository = () => ({
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn()
  });

  const mockTravelerRepository = () => ({
    getByEmails: jest.fn()
  });

  const mockEventEmitter = () => ({
    emit: jest.fn()
  })

  const createTourInput: any = {
    "travel": "1ba2894f-baf2-49a2-8478-fb3006a50c1d",
    "name": "new Tour 1",
    "price": 55599,
    "startingDate": moment("2022-05-04T17:30:15+05:30").toDate(),
    "endingDate": moment("2022-05-27T17:30:15+05:30").toDate()
  };

  const updateTourInput = {
		"id": "f8257be7-d419-4e43-844b-2a9b7d8a11b9",
		"name": "first tour",
		"travelers": [
			{
				"fullname": "fikayo tomori",
				"email": "fikayotomori@acmilan.it"
			},
			{
				"fullname": "stefano pioli",
				"email": "stefanopioli@acmilan.it"
			}
		]
	}

  const fetchedTour = {
    "id": "f8257be7-d419-4e43-844b-2a9b7d8a11b9",
    "travel": "1ba2894f-baf2-49a2-8478-fb3006a50c1d",
    "name": "new Tour 1",
    "price": 55599,
    "startingDate": moment("2022-05-04T17:30:15+05:30").toDate(),
    "endingDate": moment("2022-05-27T17:30:15+05:30").toDate(),
    "travelers": []
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TourService,
        { provide: TourRepository, useFactory: mockToursRepository},
        { provide: TravelerRepository, useFactory: mockTravelerRepository},
        { provide: EventEmitter2, useFactory: mockEventEmitter}
      ]
    }).compile();

    service = module.get<TourService>(TourService);
    travelerRepository = module.get<TravelerRepository>(TravelerRepository);
    tourRepository = module.get<TourRepository>(TourRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create tour', () => {
    it('should create tour and return Tour entity', async () => {
      expect(tourRepository.create).not.toHaveBeenCalled();
      expect(tourRepository.save).not.toHaveBeenCalled();
      const id = randomUUID()
      const tour = {...createTourInput, id}
      tourRepository.create.mockResolvedValue(tour);
      tourRepository.save.mockResolvedValue(tour);
      tourRepository.findOne.mockResolvedValue(tour);
      const result = await service.create(createTourInput);
      expect(result).toBe(tour);
      expect(result.id).toBe(id);
    })
  });

  describe('update tour', () => {
    it('should update tour', async () => {
      expect(tourRepository.save).not.toHaveBeenCalled();
      expect(tourRepository.findOne).not.toHaveBeenCalled();
      expect(travelerRepository.getByEmails).not.toHaveBeenCalled();
      tourRepository.findOne.mockResolvedValue(undefined);
      expect(service.update('fakeId', updateTourInput)).rejects.toThrow();
      tourRepository.findOne.mockResolvedValue(fetchedTour);
      travelerRepository.getByEmails.mockResolvedValue([]);
      tourRepository.save.mockResolvedValue({...fetchedTour, ...updateTourInput})
      const result = await service.update(updateTourInput.id, updateTourInput);
      expect(result).toMatchObject({...fetchedTour, ...updateTourInput});
    })
  })

  describe('remove tour by id', () => {
    it('should remove the tour by given id', async () => {
      expect(tourRepository.delete).not.toHaveBeenCalled();
      tourRepository.delete.mockResolvedValue({affected: 1});
      let result = await service.remove('f8257be7-d419-4e43-844b-2a9b7d8a11b9');
      expect(result).toBeTruthy();
      tourRepository.delete.mockResolvedValue({affected: 0});
      result = await service.remove('fakeId');
      expect(result).toBeFalsy();
    })
  })
});
