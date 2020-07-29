import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindSummaryService } from './find-summary.service';
import { ISummaryRepository } from './../../domain/summary.repository';
import { MockSummaryRepository } from './../../infrastructure/mock/mock-summary.repository';

describe('FindSummaryService', () => 
{
    let service: FindSummaryService;
    let repository: ISummaryRepository;
    let mockRepository: MockSummaryRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindSummaryService,
                MockSummaryRepository,
                { 
                    provide: ISummaryRepository,
                    useValue: {
                        find: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindSummaryService);
        repository      = module.get(ISummaryRepository);
        mockRepository  = module.get(MockSummaryRepository);
    });

    describe('main', () => 
    {
        test('FindSummaryService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find summary', async () => 
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main([])).toBe(mockRepository.collectionSource[0]);
        });
    });
});