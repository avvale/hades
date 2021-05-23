import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { jobsOverview } from '@hades/cci/job-overview/infrastructure/seeds/job-overview.seed';
import { CreateJobOverviewCommandHandler } from './create-job-overview.command-handler';
import { CreateJobOverviewCommand } from './create-job-overview.command';
import { CreateJobOverviewService } from './create-job-overview.service';

describe('CreateJobOverviewCommandHandler', () =>
{
    let commandHandler: CreateJobOverviewCommandHandler;
    let service: CreateJobOverviewService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateJobOverviewCommandHandler,
                {
                    provide: CreateJobOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateJobOverviewCommandHandler>(CreateJobOverviewCommandHandler);
        service         = module.get<CreateJobOverviewService>(CreateJobOverviewService);
    });

    describe('main', () =>
    {
        test('CreateJobOverviewCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateJobOverviewService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateJobOverviewCommand(
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