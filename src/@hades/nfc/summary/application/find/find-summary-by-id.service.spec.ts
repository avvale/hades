import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed';
import { FindSummaryByIdService } from './find-summary-by-id.service';
import { SummaryId } from './../../domain/value-objects';
import { ISummaryRepository } from './../../domain/summary.repository';
import { MockSummaryRepository } from './../../infrastructure/mock/mock-summary.repository';

describe('FindSummaryByIdService', () => 
{
    let service: FindSummaryByIdService;
    let repository: ISummaryRepository;
    let mockRepository: MockSummaryRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindSummaryByIdService,
                MockSummaryRepository,
                { 
                    provide: ISummaryRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindSummaryByIdService);
        repository      = module.get(ISummaryRepository);
        mockRepository  = module.get(MockSummaryRepository);
    });

    describe('main', () => 
    {
        test('FindSummaryByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find summary by id', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new SummaryId(summaries[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});