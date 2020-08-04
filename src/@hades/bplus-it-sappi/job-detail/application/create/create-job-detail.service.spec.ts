import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { jobsDetail } from '@hades/bplus-it-sappi/job-detail/infrastructure/seeds/job-detail.seed';
import { CreateJobDetailService } from './create-job-detail.service';
import { 
    JobDetailId, 
    JobDetailTenantId, 
    JobDetailTenantCode, 
    JobDetailSystemId, 
    JobDetailSystemName, 
    JobDetailExecutionId, 
    JobDetailExecutionType, 
    JobDetailExecutionExecutedAt, 
    JobDetailExecutionMonitoringStartAt, 
    JobDetailExecutionMonitoringEndAt, 
    JobDetailStatus, 
    JobDetailName, 
    JobDetailReturnCode, 
    JobDetailNode, 
    JobDetailUser, 
    JobDetailStartAt, 
    JobDetailEndAt
    
} from './../../domain/value-objects';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { MockJobDetailRepository } from './../../infrastructure/mock/mock-job-detail.repository';

describe('CreateJobDetailService', () => 
{
    let service: CreateJobDetailService;
    let repository: IJobDetailRepository;
    let mockRepository: MockJobDetailRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateJobDetailService,
                MockJobDetailRepository,
                { 
                    provide: IJobDetailRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateJobDetailService);
        repository      = module.get(IJobDetailRepository);
        mockRepository  = module.get(MockJobDetailRepository);
    });

    describe('main', () => 
    {
        test('CreateJobDetailService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create a jobDetail and emit event', async () => 
        {
            expect(await service.main(
                new JobDetailId(jobsDetail[0].id),
                new JobDetailTenantId(jobsDetail[0].tenantId),
                new JobDetailTenantCode(jobsDetail[0].tenantCode),
                new JobDetailSystemId(jobsDetail[0].systemId),
                new JobDetailSystemName(jobsDetail[0].systemName),
                new JobDetailExecutionId(jobsDetail[0].executionId),
                new JobDetailExecutionType(jobsDetail[0].executionType),
                new JobDetailExecutionExecutedAt(jobsDetail[0].executionExecutedAt),
                new JobDetailExecutionMonitoringStartAt(jobsDetail[0].executionMonitoringStartAt),
                new JobDetailExecutionMonitoringEndAt(jobsDetail[0].executionMonitoringEndAt),
                new JobDetailStatus(jobsDetail[0].status),
                new JobDetailName(jobsDetail[0].name),
                new JobDetailReturnCode(jobsDetail[0].returnCode),
                new JobDetailNode(jobsDetail[0].node),
                new JobDetailUser(jobsDetail[0].user),
                new JobDetailStartAt(jobsDetail[0].startAt),
                new JobDetailEndAt(jobsDetail[0].endAt),
                
            )).toBe(undefined);
        });
    });
});