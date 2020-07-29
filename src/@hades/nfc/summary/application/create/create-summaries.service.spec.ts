import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateSummariesService } from './create-summaries.service';
import { ISummaryRepository } from './../../domain/summary.repository';
import { MockSummaryRepository } from './../../infrastructure/mock/mock-summary.repository';

describe('CreateSummariesService', () => 
{
    let service: CreateSummariesService;
    let repository: ISummaryRepository;
    let mockRepository: MockSummaryRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateSummariesService,
                MockSummaryRepository,
                { 
                    provide: ISummaryRepository,
                    useValue: {
                        insert: (items) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateSummariesService);
        repository      = module.get(ISummaryRepository);
        mockRepository  = module.get(MockSummaryRepository);
    });

    describe('main', () => 
    {
        test('CreateSummariesService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create summaries and emit event', async () => 
        {
            expect(await service.main(
                mockRepository.collectionSource
            )).toBe(undefined);
        });
    });
});