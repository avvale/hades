import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { executions } from '@hades/bplus-it-sappi/execution/infrastructure/seeds/execution.seed';
import { DeleteExecutionByIdService } from './delete-execution-by-id.service';
import { ExecutionId } from './../../domain/value-objects';
import { IExecutionRepository } from '../../domain/execution.repository';
import { MockExecutionRepository } from '../../infrastructure/mock/mock-execution.repository';

describe('DeleteExecutionByIdService', () => 
{
    let service: DeleteExecutionByIdService;
    let repository: IExecutionRepository;
    let mockRepository: MockExecutionRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteExecutionByIdService,
                MockExecutionRepository,
                { 
                    provide: IExecutionRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteExecutionByIdService);
        repository      = module.get(IExecutionRepository);
        mockRepository  = module.get(MockExecutionRepository);
    });

    describe('main', () => 
    {
        it('DeleteExecutionByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        it('should delete execution and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ExecutionId(executions[0].id)
            )).toBe(undefined);
        });
    });
});