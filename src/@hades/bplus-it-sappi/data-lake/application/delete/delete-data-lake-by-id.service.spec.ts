import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { dataLakes } from '@hades/bplus-it-sappi/data-lake/infrastructure/seeds/data-lake.seed';
import { DeleteDataLakeByIdService } from './delete-data-lake-by-id.service';
import { DataLakeId } from './../../domain/value-objects';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { MockDataLakeRepository } from './../../infrastructure/mock/mock-data-lake.repository';

describe('DeleteDataLakeByIdService', () => 
{
    let service: DeleteDataLakeByIdService;
    let repository: IDataLakeRepository;
    let mockRepository: MockDataLakeRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteDataLakeByIdService,
                MockDataLakeRepository,
                { 
                    provide: IDataLakeRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteDataLakeByIdService);
        repository      = module.get(IDataLakeRepository);
        mockRepository  = module.get(MockDataLakeRepository);
    });

    describe('main', () => 
    {
        test('DeleteDataLakeByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete dataLake and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new DataLakeId(dataLakes[0].id)
            )).toBe(undefined);
        });
    });
});