import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { dataLakes } from '@hades/cci/data-lake/infrastructure/seeds/data-lake.seed';
import { UpdateDataLakeService } from './update-data-lake.service';
import {
    DataLakeId,
    DataLakeTenantId,
    DataLakeExecutionId,
    DataLakeTenantCode,
    DataLakePayload,
    DataLakeCreatedAt,
    DataLakeUpdatedAt,
    DataLakeDeletedAt,
} from './../../domain/value-objects';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { MockDataLakeRepository } from './../../infrastructure/mock/mock-data-lake.repository';

describe('UpdateDataLakeService', () =>
{
    let service: UpdateDataLakeService;
    let repository: IDataLakeRepository;
    let mockRepository: MockDataLakeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateDataLakeService,
                MockDataLakeRepository,
                {
                    provide: IDataLakeRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateDataLakeService);
        repository      = module.get(IDataLakeRepository);
        mockRepository  = module.get(MockDataLakeRepository);
    });

    describe('main', () =>
    {
        test('UpdateDataLakeService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a dataLake and emit event', async () =>
        {
            expect(await service.main(
                new DataLakeId(dataLakes[0].id),
                new DataLakeTenantId(dataLakes[0].tenantId),
                new DataLakeExecutionId(dataLakes[0].executionId),
                new DataLakeTenantCode(dataLakes[0].tenantCode),
                new DataLakePayload(dataLakes[0].payload),
            )).toBe(undefined);
        });
    });
});