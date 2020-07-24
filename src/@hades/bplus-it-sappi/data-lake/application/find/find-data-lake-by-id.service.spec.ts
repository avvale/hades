import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { dataLakes } from '@hades/bplus-it-sappi/data-lake/infrastructure/seeds/data-lake.seed';
import { FindDataLakeByIdService } from './find-data-lake-by-id.service';
import { DataLakeId } from './../../domain/value-objects';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { MockDataLakeRepository } from './../../infrastructure/mock/mock-data-lake.repository';

describe('FindDataLakeByIdService', () => 
{
    let service: FindDataLakeByIdService;
    let repository: IDataLakeRepository;
    let mockRepository: MockDataLakeRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindDataLakeByIdService,
                MockDataLakeRepository,
                { 
                    provide: IDataLakeRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindDataLakeByIdService);
        repository      = module.get(IDataLakeRepository);
        mockRepository  = module.get(MockDataLakeRepository);
    });

    describe('main', () => 
    {
        test('FindDataLakeByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find dataLake by id', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new DataLakeId(dataLakes[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});