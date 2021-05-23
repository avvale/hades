import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { jobsDetail } from '@hades/cci/job-detail/infrastructure/seeds/job-detail.seed';
import { UpdateJobDetailService } from './update-job-detail.service';
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
    JobDetailEndAt,
    JobDetailCreatedAt,
    JobDetailUpdatedAt,
    JobDetailDeletedAt,
} from './../../domain/value-objects';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { MockJobDetailRepository } from './../../infrastructure/mock/mock-job-detail.repository';

describe('UpdateJobDetailService', () =>
{
    let service: UpdateJobDetailService;
    let repository: IJobDetailRepository;
    let mockRepository: MockJobDetailRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateJobDetailService,
                MockJobDetailRepository,
                {
                    provide: IJobDetailRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateJobDetailService);
        repository      = module.get(IJobDetailRepository);
        mockRepository  = module.get(MockJobDetailRepository);
    });

    describe('main', () =>
    {
        test('UpdateJobDetailService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a jobDetail and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new JobDetailId(jobsDetail[0].id),
                    tenantId: new JobDetailTenantId(jobsDetail[0].tenantId),
                    tenantCode: new JobDetailTenantCode(jobsDetail[0].tenantCode),
                    systemId: new JobDetailSystemId(jobsDetail[0].systemId),
                    systemName: new JobDetailSystemName(jobsDetail[0].systemName),
                    executionId: new JobDetailExecutionId(jobsDetail[0].executionId),
                    executionType: new JobDetailExecutionType(jobsDetail[0].executionType),
                    executionExecutedAt: new JobDetailExecutionExecutedAt(jobsDetail[0].executionExecutedAt),
                    executionMonitoringStartAt: new JobDetailExecutionMonitoringStartAt(jobsDetail[0].executionMonitoringStartAt),
                    executionMonitoringEndAt: new JobDetailExecutionMonitoringEndAt(jobsDetail[0].executionMonitoringEndAt),
                    status: new JobDetailStatus(jobsDetail[0].status),
                    name: new JobDetailName(jobsDetail[0].name),
                    returnCode: new JobDetailReturnCode(jobsDetail[0].returnCode),
                    node: new JobDetailNode(jobsDetail[0].node),
                    user: new JobDetailUser(jobsDetail[0].user),
                    startAt: new JobDetailStartAt(jobsDetail[0].startAt),
                    endAt: new JobDetailEndAt(jobsDetail[0].endAt),
                }
            )).toBe(undefined);
        });
    });
});