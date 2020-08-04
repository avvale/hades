import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateJobsOverviewService } from './create-jobs-overview.service';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { MockJobOverviewRepository } from './../../infrastructure/mock/mock-job-overview.repository';

describe('CreateJobsOverviewService', () => 
{
    let service: CreateJobsOverviewService;
    let repository: IJobOverviewRepository;
    let mockRepository: MockJobOverviewRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateJobsOverviewService,
                MockJobOverviewRepository,
                { 
                    provide: IJobOverviewRepository,
                    useValue: {
                        insert: (items) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateJobsOverviewService);
        repository      = module.get(IJobOverviewRepository);
        mockRepository  = module.get(MockJobOverviewRepository);
    });

    describe('main', () => 
    {
        test('CreateJobsOverviewService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create jobsOverview and emit event', async () => 
        {
            expect(await service.main(
                mockRepository.collectionSource
            )).toBe(undefined);
        });
    });
});