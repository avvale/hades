import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateDataLakesService } from './create-data-lakes.service';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { MockDataLakeRepository } from './../../infrastructure/mock/mock-data-lake.repository';

describe('CreateDataLakesService', () =>
{
    let service: CreateDataLakesService;
    let repository: IDataLakeRepository;
    let mockRepository: MockDataLakeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateDataLakesService,
                MockDataLakeRepository,
                {
                    provide: IDataLakeRepository,
                    useValue: {
                        insert: (items) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateDataLakesService);
        repository      = module.get(IDataLakeRepository);
        mockRepository  = module.get(MockDataLakeRepository);
    });

    describe('main', () =>
    {
        test('CreateDataLakesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create dataLakes and emit event', async () =>
        {
            expect(await service.main(
                mockRepository.collectionSource
            )).toBe(undefined);
        });
    });
});