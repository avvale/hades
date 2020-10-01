import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { executions } from '@hades/cci/execution/infrastructure/seeds/execution.seed';
import { CreateExecutionService } from './create-execution.service';
import { 
    ExecutionId,
    ExecutionTenantId,
    ExecutionTenantCode,
    ExecutionSystemId,
    ExecutionSystemName,
    ExecutionVersion,
    ExecutionType,
    ExecutionExecutedAt,
    ExecutionMonitoringStartAt,
    ExecutionMonitoringEndAt
    
} from './../../domain/value-objects';
import { IExecutionRepository } from './../../domain/execution.repository';
import { MockExecutionRepository } from './../../infrastructure/mock/mock-execution.repository';

describe('CreateExecutionService', () => 
{
    let service: CreateExecutionService;
    let repository: IExecutionRepository;
    let mockRepository: MockExecutionRepository;

    beforeAll(async () => 
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
                        create: (item) => {}
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
            expect(await service.main(
                new ExecutionId(executions[0].id),
                new ExecutionTenantId(executions[0].tenantId),
                new ExecutionTenantCode(executions[0].tenantCode),
                new ExecutionSystemId(executions[0].systemId),
                new ExecutionSystemName(executions[0].systemName),
                new ExecutionVersion(executions[0].version),
                new ExecutionType(executions[0].type),
                new ExecutionExecutedAt(executions[0].executedAt),
                new ExecutionMonitoringStartAt(executions[0].monitoringStartAt),
                new ExecutionMonitoringEndAt(executions[0].monitoringEndAt),
                
            )).toBe(undefined);
        });
    });
});