import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { jobsOverview } from '@hades/bplus-it-sappi/job-overview/infrastructure/seeds/job-overview.seed';
import { DeleteJobOverviewByIdService } from './delete-job-overview-by-id.service';
import { JobOverviewId } from './../../domain/value-objects';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { MockJobOverviewRepository } from './../../infrastructure/mock/mock-job-overview.repository';

describe('DeleteJobOverviewByIdService', () => 
{
    let service: DeleteJobOverviewByIdService;
    let repository: IJobOverviewRepository;
    let mockRepository: MockJobOverviewRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteJobOverviewByIdService,
                MockJobOverviewRepository,
                { 
                    provide: IJobOverviewRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteJobOverviewByIdService);
        repository      = module.get(IJobOverviewRepository);
        mockRepository  = module.get(MockJobOverviewRepository);
    });

    describe('main', () => 
    {
        test('DeleteJobOverviewByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete jobOverview and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new JobOverviewId(jobsOverview[0].id)
            )).toBe(undefined);
        });
    });
});