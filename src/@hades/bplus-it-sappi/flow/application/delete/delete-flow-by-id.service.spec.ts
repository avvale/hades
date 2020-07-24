import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { flows } from '@hades/bplus-it-sappi/flow/infrastructure/seeds/flow.seed';
import { DeleteFlowByIdService } from './delete-flow-by-id.service';
import { FlowId } from './../../domain/value-objects';
import { IFlowRepository } from './../../domain/flow.repository';
import { MockFlowRepository } from './../../infrastructure/mock/mock-flow.repository';

describe('DeleteFlowByIdService', () => 
{
    let service: DeleteFlowByIdService;
    let repository: IFlowRepository;
    let mockRepository: MockFlowRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteFlowByIdService,
                MockFlowRepository,
                { 
                    provide: IFlowRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteFlowByIdService);
        repository      = module.get(IFlowRepository);
        mockRepository  = module.get(MockFlowRepository);
    });

    describe('main', () => 
    {
        test('DeleteFlowByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete flow and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new FlowId(flows[0].id)
            )).toBe(undefined);
        });
    });
});