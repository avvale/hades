import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { jobsOverview } from '@hades/cci/job-overview/infrastructure/seeds/job-overview.seed';
import { FindJobOverviewByIdService } from './find-job-overview-by-id.service';
import { JobOverviewId } from './../../domain/value-objects';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { MockJobOverviewRepository } from './../../infrastructure/mock/mock-job-overview.repository';

describe('FindJobOverviewByIdService', () =>
{
    let service: FindJobOverviewByIdService;
    let repository: IJobOverviewRepository;
    let mockRepository: MockJobOverviewRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindJobOverviewByIdService,
                MockJobOverviewRepository,
                {
                    provide: IJobOverviewRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindJobOverviewByIdService);
        repository      = module.get(IJobOverviewRepository);
        mockRepository  = module.get(MockJobOverviewRepository);
    });

    describe('main', () =>
    {
        test('FindJobOverviewByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find jobOverview by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new JobOverviewId(jobsOverview[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});