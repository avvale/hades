import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { jobsOverview } from '@hades/cci/job-overview/infrastructure/seeds/job-overview.seed';
import { UpdateJobOverviewCommandHandler } from './update-job-overview.command-handler';
import { UpdateJobOverviewCommand } from './update-job-overview.command';
import { UpdateJobOverviewService } from './update-job-overview.service';

describe('UpdateJobOverviewCommandHandler', () =>
{
    let commandHandler: UpdateJobOverviewCommandHandler;
    let service: UpdateJobOverviewService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateJobOverviewCommandHandler,
                {
                    provide: UpdateJobOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateJobOverviewCommandHandler>(UpdateJobOverviewCommandHandler);
        service         = module.get<UpdateJobOverviewService>(UpdateJobOverviewService);
    });

    describe('main', () =>
    {
        test('UpdateJobOverviewCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an jobOverview created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateJobOverviewCommand(
                    {
                        id: jobsOverview[0].id,
                        tenantId: jobsOverview[0].tenantId,
                        tenantCode: jobsOverview[0].tenantCode,
                        systemId: jobsOverview[0].systemId,
                        systemName: jobsOverview[0].systemName,
                        executionId: jobsOverview[0].executionId,
                        executionType: jobsOverview[0].executionType,
                        executionExecutedAt: jobsOverview[0].executionExecutedAt,
                        executionMonitoringStartAt: jobsOverview[0].executionMonitoringStartAt,
                        executionMonitoringEndAt: jobsOverview[0].executionMonitoringEndAt,
                        cancelled: jobsOverview[0].cancelled,
                        completed: jobsOverview[0].completed,
                        error: jobsOverview[0].error,
                    }
                )
            )).toBe(undefined);
        });
    });
});