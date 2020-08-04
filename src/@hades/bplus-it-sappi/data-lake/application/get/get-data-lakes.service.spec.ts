import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetDataLakesService } from './get-data-lakes.service';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { MockDataLakeRepository } from './../../infrastructure/mock/mock-data-lake.repository';

describe('GetDataLakesService', () => 
{
    let service: GetDataLakesService;
    let repository: IDataLakeRepository;
    let mockRepository: MockDataLakeRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetDataLakesService,
                MockDataLakeRepository,
                { 
                    provide: IDataLakeRepository,
                    useValue: {
                        get: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(GetDataLakesService);
        repository      = module.get(IDataLakeRepository);
        mockRepository  = module.get(MockDataLakeRepository);
    });

    describe('main', () => 
    {
        test('GetDataLakesService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should get dataLakes', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main([])).toBe(mockRepository.collectionSource);
        });
    });
});