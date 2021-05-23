import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteExecutionsService } from './delete-executions.service';
import { IExecutionRepository } from './../../domain/execution.repository';
import { MockExecutionRepository } from './../../infrastructure/mock/mock-execution.repository';

describe('DeleteExecutionsService', () =>
{
    let service: DeleteExecutionsService;
    let repository: IExecutionRepository;
    let mockRepository: MockExecutionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteExecutionsService,
                MockExecutionRepository,
                {
                    provide: IExecutionRepository,
                    useValue: {
                        get: (queryStatement) => {},
                        delete: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteExecutionsService);
        repository      = module.get(IExecutionRepository);
        mockRepository  = module.get(MockExecutionRepository);
    });

    describe('main', () =>
    {
        test('DeleteExecutionsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete execution and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});