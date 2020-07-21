import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed';
import { DeleteSummaryByIdService } from './delete-summary-by-id.service';
import { SummaryId } from './../../domain/value-objects';
import { ISummaryRepository } from '../../domain/summary.repository';
import { MockSummaryRepository } from '../../infrastructure/mock/mock-summary.repository';

describe('DeleteSummaryByIdService', () => 
{
    let service: DeleteSummaryByIdService;
    let repository: ISummaryRepository;
    let mockRepository: MockSummaryRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteSummaryByIdService,
                MockSummaryRepository,
                { 
                    provide: ISummaryRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteSummaryByIdService);
        repository      = module.get(ISummaryRepository);
        mockRepository  = module.get(MockSummaryRepository);
    });

    describe('main', () => 
    {
        it('DeleteSummaryByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        it('should delete summary and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new SummaryId(summaries[0].id)
            )).toBe(undefined);
        });
    });
});