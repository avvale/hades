import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetExecutionsService } from './get-executions.service';
import { IExecutionRepository } from './../../domain/execution.repository';
import { MockExecutionRepository } from './../../infrastructure/mock/mock-execution.repository';

describe('GetExecutionsService', () =>
{
    let service: GetExecutionsService;
    let repository: IExecutionRepository;
    let mockRepository: MockExecutionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetExecutionsService,
                MockExecutionRepository,
                {
                    provide: IExecutionRepository,
                    useValue: {
                        get: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(GetExecutionsService);
        repository      = module.get(IExecutionRepository);
        mockRepository  = module.get(MockExecutionRepository);
    });

    describe('main', () =>
    {
        test('GetExecutionsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get executions', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});