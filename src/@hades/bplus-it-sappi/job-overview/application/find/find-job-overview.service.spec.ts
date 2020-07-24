import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindJobOverviewService } from './find-job-overview.service';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { MockJobOverviewRepository } from './../../infrastructure/mock/mock-job-overview.repository';

describe('FindJobOverviewService', () => 
{
    let service: FindJobOverviewService;
    let repository: IJobOverviewRepository;
    let mockRepository: MockJobOverviewRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindJobOverviewService,
                MockJobOverviewRepository,
                { 
                    provide: IJobOverviewRepository,
                    useValue: {
                        find: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindJobOverviewService);
        repository      = module.get(IJobOverviewRepository);
        mockRepository  = module.get(MockJobOverviewRepository);
    });

    describe('main', () => 
    {
        test('FindJobOverviewService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find jobOverview', async () => 
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main([])).toBe(mockRepository.collectionSource[0]);
        });
    });
});