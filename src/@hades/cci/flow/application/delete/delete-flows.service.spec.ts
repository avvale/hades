import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteFlowsService } from './delete-flows.service';
import { IFlowRepository } from './../../domain/flow.repository';
import { MockFlowRepository } from './../../infrastructure/mock/mock-flow.repository';

describe('DeleteFlowsService', () =>
{
    let service: DeleteFlowsService;
    let repository: IFlowRepository;
    let mockRepository: MockFlowRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteFlowsService,
                MockFlowRepository,
                {
                    provide: IFlowRepository,
                    useValue: {
                        get: (queryStatement) => {},
                        delete: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteFlowsService);
        repository      = module.get(IFlowRepository);
        mockRepository  = module.get(MockFlowRepository);
    });

    describe('main', () =>
    {
        test('DeleteFlowsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete flow and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});