import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed';
import { UpdateSummaryService } from './update-summary.service';
import { 
    SummaryId, 
    SummaryTagId, 
    SummaryTenantId, 
    SummaryAccessAt, 
    SummaryCounter, 
    SummaryCreatedAt, 
    SummaryUpdatedAt, 
    SummaryDeletedAt
    
} from './../../domain/value-objects';
import { ISummaryRepository } from './../../domain/summary.repository';
import { MockSummaryRepository } from './../../infrastructure/mock/mock-summary.repository';

describe('UpdateSummaryService', () => 
{
    let service: UpdateSummaryService;
    let repository: ISummaryRepository;
    let mockRepository: MockSummaryRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateSummaryService,
                MockSummaryRepository,
                { 
                    provide: ISummaryRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateSummaryService);
        repository      = module.get(ISummaryRepository);
        mockRepository  = module.get(MockSummaryRepository);
    });

    describe('main', () => 
    {
        test('UpdateSummaryService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should update a summary and emit event', async () => 
        {
            expect(await service.main(
                new SummaryId(summaries[0].id),
                new SummaryTagId(summaries[0].tagId),
                new SummaryTenantId(summaries[0].tenantId),
                new SummaryAccessAt(summaries[0].accessAt),
                new SummaryCounter(summaries[0].counter),
                
            )).toBe(undefined);
        });
    });
});