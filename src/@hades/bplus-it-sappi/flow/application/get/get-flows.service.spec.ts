import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetFlowsService } from './get-flows.service';
import { IFlowRepository } from './../../domain/flow.repository';
import { MockFlowRepository } from './../../infrastructure/mock/mock-flow.repository';

describe('GetFlowsService', () => 
{
    let service: GetFlowsService;
    let repository: IFlowRepository;
    let mockRepository: MockFlowRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetFlowsService,
                MockFlowRepository,
                { 
                    provide: IFlowRepository,
                    useValue: {
                        get: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(GetFlowsService);
        repository      = module.get(IFlowRepository);
        mockRepository  = module.get(MockFlowRepository);
    });

    describe('main', () => 
    {
        test('GetFlowsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should get flows', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main([])).toBe(mockRepository.collectionSource);
        });
    });
});