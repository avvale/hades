import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { jobsOverview } from '@hades/bplus-it-sappi/job-overview/infrastructure/seeds/job-overview.seed';
import { CreateJobOverviewService } from './create-job-overview.service';
import { 
    JobOverviewId, 
    JobOverviewTenantId, 
    JobOverviewTenantCode, 
    JobOverviewSystemId, 
    JobOverviewSystemName, 
    JobOverviewExecutionId, 
    JobOverviewExecutionType, 
    JobOverviewExecutionExecutedAt, 
    JobOverviewExecutionMonitoringStartAt, 
    JobOverviewExecutionMonitoringEndAt, 
    JobOverviewCancelled, 
    JobOverviewCompleted, 
    JobOverviewError
    
} from './../../domain/value-objects';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { MockJobOverviewRepository } from './../../infrastructure/mock/mock-job-overview.repository';

describe('CreateJobOverviewService', () => 
{
    let service: CreateJobOverviewService;
    let repository: IJobOverviewRepository;
    let mockRepository: MockJobOverviewRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateJobOverviewService,
                MockJobOverviewRepository,
                { 
                    provide: IJobOverviewRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateJobOverviewService);
        repository      = module.get(IJobOverviewRepository);
        mockRepository  = module.get(MockJobOverviewRepository);
    });

    describe('main', () => 
    {
        test('CreateJobOverviewService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create a jobOverview and emit event', async () => 
        {
            expect(await service.main(
                new JobOverviewId(jobsOverview[0].id),
                new JobOverviewTenantId(jobsOverview[0].tenantId),
                new JobOverviewTenantCode(jobsOverview[0].tenantCode),
                new JobOverviewSystemId(jobsOverview[0].systemId),
                new JobOverviewSystemName(jobsOverview[0].systemName),
                new JobOverviewExecutionId(jobsOverview[0].executionId),
                new JobOverviewExecutionType(jobsOverview[0].executionType),
                new JobOverviewExecutionExecutedAt(jobsOverview[0].executionExecutedAt),
                new JobOverviewExecutionMonitoringStartAt(jobsOverview[0].executionMonitoringStartAt),
                new JobOverviewExecutionMonitoringEndAt(jobsOverview[0].executionMonitoringEndAt),
                new JobOverviewCancelled(jobsOverview[0].cancelled),
                new JobOverviewCompleted(jobsOverview[0].completed),
                new JobOverviewError(jobsOverview[0].error),
                
            )).toBe(undefined);
        });
    });
});