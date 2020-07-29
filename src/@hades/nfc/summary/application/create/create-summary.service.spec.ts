import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed';
import { CreateSummaryService } from './create-summary.service';
import { 
    SummaryId, 
    SummaryTagId, 
    SummaryTenantId, 
    SummaryAccessAt, 
    SummaryCounter
    
} from './../../domain/value-objects';
import { ISummaryRepository } from './../../domain/summary.repository';
import { MockSummaryRepository } from './../../infrastructure/mock/mock-summary.repository';

describe('CreateSummaryService', () => 
{
    let service: CreateSummaryService;
    let repository: ISummaryRepository;
    let mockRepository: MockSummaryRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateSummaryService,
                MockSummaryRepository,
                { 
                    provide: ISummaryRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateSummaryService);
        repository      = module.get(ISummaryRepository);
        mockRepository  = module.get(MockSummaryRepository);
    });

    describe('main', () => 
    {
        test('CreateSummaryService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create a summary and emit event', async () => 
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