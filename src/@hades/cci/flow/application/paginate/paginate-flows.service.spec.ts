import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { PaginateFlowsService } from './paginate-flows.service';
import { IFlowRepository } from './../../domain/flow.repository';
import { MockFlowRepository } from './../../infrastructure/mock/mock-flow.repository';

describe('PaginateFlowsService', () =>
{
    let service: PaginateFlowsService;
    let repository: IFlowRepository;
    let mockRepository: MockFlowRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                PaginateFlowsService,
                MockFlowRepository,
                {
                    provide: IFlowRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(PaginateFlowsService);
        repository      = module.get(IFlowRepository);
        mockRepository  = module.get(MockFlowRepository);
    });

    describe('main', () =>
    {
        test('PaginateFlowsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate flows', async () =>
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            })));
            expect(await service.main({
                offset: 0,
                limit: 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            });
        });
    });
});