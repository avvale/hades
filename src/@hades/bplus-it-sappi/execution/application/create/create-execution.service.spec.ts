import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { executions } from '@hades/bplus-it-sappi/execution/infrastructure/seeds/execution.seed';
import { CreateExecutionService } from './create-execution.service';
import { 
    ExecutionId, 
    ExecutionTenantId, 
    ExecutionSystemId, 
    ExecutionType, 
    ExecutionMonitoringStartAt, 
    ExecutionMonitoringEndAt, 
    ExecutionExecutedAt
    
} from './../../domain/value-objects';
import { IExecutionRepository } from '../../domain/execution.repository';
import { MockExecutionRepository } from '../../infrastructure/mock/mock-execution.repository';

describe('CreateExecutionService', () => 
{
    let service: CreateExecutionService;
    let repository: IExecutionRepository;
    let mockRepository: MockExecutionRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateExecutionService,
                MockExecutionRepository,
                { 
                    provide: IExecutionRepository,
                    useValue: {
                        create: (item) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateExecutionService);
        repository      = module.get(IExecutionRepository);
        mockRepository  = module.get(MockExecutionRepository);
    });

    describe('main', () => 
    {
        test('CreateExecutionService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create a execution and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ExecutionId(executions[0].id),
                new ExecutionTenantId(executions[0].tenantId),
                new ExecutionSystemId(executions[0].systemId),
                new ExecutionType(executions[0].type),
                new ExecutionMonitoringStartAt(executions[0].monitoringStartAt),
                new ExecutionMonitoringEndAt(executions[0].monitoringEndAt),
                new ExecutionExecutedAt(executions[0].executedAt),
                
            )).toBe(undefined);
        });
    });
});