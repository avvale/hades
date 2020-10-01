import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { PaginateExecutionsService } from './paginate-executions.service';
import { IExecutionRepository } from './../../domain/execution.repository';
import { MockExecutionRepository } from './../../infrastructure/mock/mock-execution.repository';

describe('PaginateExecutionsService', () => 
{
    let service: PaginateExecutionsService;
    let repository: IExecutionRepository;
    let mockRepository: MockExecutionRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                PaginateExecutionsService,
                MockExecutionRepository,
                { 
                    provide: IExecutionRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(PaginateExecutionsService);
        repository      = module.get(IExecutionRepository);
        mockRepository  = module.get(MockExecutionRepository);
    });

    describe('main', () => 
    {
        test('PaginateExecutionsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should paginate executions', async () => 
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