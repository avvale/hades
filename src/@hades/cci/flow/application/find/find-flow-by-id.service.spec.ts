import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { flows } from '@hades/cci/flow/infrastructure/seeds/flow.seed';
import { FindFlowByIdService } from './find-flow-by-id.service';
import { FlowId } from './../../domain/value-objects';
import { IFlowRepository } from './../../domain/flow.repository';
import { MockFlowRepository } from './../../infrastructure/mock/mock-flow.repository';

describe('FindFlowByIdService', () =>
{
    let service: FindFlowByIdService;
    let repository: IFlowRepository;
    let mockRepository: MockFlowRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindFlowByIdService,
                MockFlowRepository,
                {
                    provide: IFlowRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindFlowByIdService);
        repository      = module.get(IFlowRepository);
        mockRepository  = module.get(MockFlowRepository);
    });

    describe('main', () =>
    {
        test('FindFlowByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find flow by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new FlowId(flows[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});