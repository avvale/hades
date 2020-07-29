import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';

// custom items
import { PaginateSummariesService } from './paginate-summaries.service';
import { ISummaryRepository } from './../../domain/summary.repository';
import { MockSummaryRepository } from './../../infrastructure/mock/mock-summary.repository';

describe('PaginateSummariesService', () => 
{
    let service: PaginateSummariesService;
    let repository: ISummaryRepository;
    let mockRepository: MockSummaryRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                PaginateSummariesService,
                MockSummaryRepository,
                { 
                    provide: ISummaryRepository,
                    useValue: {
                        paginate: (queryStatements, constraints) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(PaginateSummariesService);
        repository      = module.get(ISummaryRepository);
        mockRepository  = module.get(MockSummaryRepository);
    });

    describe('main', () => 
    {
        test('PaginateSummariesService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should paginate summaries', async () => 
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            })));
            expect(await service.main([
                {
                    'command': Command.OFFSET,
                    'value': 0
                },
                {
                    'command': Command.LIMIT,
                    'value': 10
                }
            ], [])).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            });
        });
    });
});