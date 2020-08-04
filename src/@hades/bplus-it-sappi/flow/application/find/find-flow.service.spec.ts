import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindFlowService } from './find-flow.service';
import { IFlowRepository } from './../../domain/flow.repository';
import { MockFlowRepository } from './../../infrastructure/mock/mock-flow.repository';

describe('FindFlowService', () => 
{
    let service: FindFlowService;
    let repository: IFlowRepository;
    let mockRepository: MockFlowRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindFlowService,
                MockFlowRepository,
                { 
                    provide: IFlowRepository,
                    useValue: {
                        find: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindFlowService);
        repository      = module.get(IFlowRepository);
        mockRepository  = module.get(MockFlowRepository);
    });

    describe('main', () => 
    {
        test('FindFlowService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find flow', async () => 
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main([])).toBe(mockRepository.collectionSource[0]);
        });
    });
});