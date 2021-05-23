import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { jobsDetail } from '@hades/cci/job-detail/infrastructure/seeds/job-detail.seed';
import { CreateJobDetailCommandHandler } from './create-job-detail.command-handler';
import { CreateJobDetailCommand } from './create-job-detail.command';
import { CreateJobDetailService } from './create-job-detail.service';

describe('CreateJobDetailCommandHandler', () =>
{
    let commandHandler: CreateJobDetailCommandHandler;
    let service: CreateJobDetailService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateJobDetailCommandHandler,
                {
                    provide: CreateJobDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateJobDetailCommandHandler>(CreateJobDetailCommandHandler);
        service         = module.get<CreateJobDetailService>(CreateJobDetailService);
    });

    describe('main', () =>
    {
        test('CreateJobDetailCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateJobDetailService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateJobDetailCommand(
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