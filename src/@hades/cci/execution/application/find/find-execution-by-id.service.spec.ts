import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { executions } from '@hades/cci/execution/infrastructure/seeds/execution.seed';
import { FindExecutionByIdService } from './find-execution-by-id.service';
import { ExecutionId } from './../../domain/value-objects';
import { IExecutionRepository } from './../../domain/execution.repository';
import { MockExecutionRepository } from './../../infrastructure/mock/mock-execution.repository';

describe('FindExecutionByIdService', () => 
{
    let service: FindExecutionByIdService;
    let repository: IExecutionRepository;
    let mockRepository: MockExecutionRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindExecutionByIdService,
                MockExecutionRepository,
                { 
                    provide: IExecutionRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindExecutionByIdService);
        repository      = module.get(IExecutionRepository);
        mockRepository  = module.get(MockExecutionRepository);
    });

    describe('main', () => 
    {
        test('FindExecutionByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find execution by id', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ExecutionId(executions[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});