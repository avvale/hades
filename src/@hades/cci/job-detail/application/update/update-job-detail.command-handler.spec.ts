import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { jobsDetail } from '@hades/cci/job-detail/infrastructure/seeds/job-detail.seed';
import { UpdateJobDetailCommandHandler } from './update-job-detail.command-handler';
import { UpdateJobDetailCommand } from './update-job-detail.command';
import { UpdateJobDetailService } from './update-job-detail.service';

describe('UpdateJobDetailCommandHandler', () =>
{
    let commandHandler: UpdateJobDetailCommandHandler;
    let service: UpdateJobDetailService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateJobDetailCommandHandler,
                {
                    provide: UpdateJobDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateJobDetailCommandHandler>(UpdateJobDetailCommandHandler);
        service         = module.get<UpdateJobDetailService>(UpdateJobDetailService);
    });

    describe('main', () =>
    {
        test('UpdateJobDetailCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an jobDetail created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateJobDetailCommand(
                    {
                        id: jobsDetail[0].id,
                        tenantId: jobsDetail[0].tenantId,
                        tenantCode: jobsDetail[0].tenantCode,
                        systemId: jobsDetail[0].systemId,
                        systemName: jobsDetail[0].systemName,
                        executionId: jobsDetail[0].executionId,
                        executionType: jobsDetail[0].executionType,
                        executionExecutedAt: jobsDetail[0].executionExecutedAt,
                        executionMonitoringStartAt: jobsDetail[0].executionMonitoringStartAt,
                        executionMonitoringEndAt: jobsDetail[0].executionMonitoringEndAt,
                        status: jobsDetail[0].status,
                        name: jobsDetail[0].name,
                        returnCode: jobsDetail[0].returnCode,
                        node: jobsDetail[0].node,
                        user: jobsDetail[0].user,
                        startAt: jobsDetail[0].startAt,
                        endAt: jobsDetail[0].endAt,
                    }
                )
            )).toBe(undefined);
        });
    });
});