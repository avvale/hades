import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateJobOverviewCommandHandler } from './update-job-overview.command-handler';
import { jobsOverview } from '@hades/cci/job-overview/infrastructure/seeds/job-overview.seed';
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
                    jobsOverview[0].id,
                    jobsOverview[0].tenantId,
                    jobsOverview[0].tenantCode,
                    jobsOverview[0].systemId,
                    jobsOverview[0].systemName,
                    jobsOverview[0].executionId,
                    jobsOverview[0].executionType,
                    jobsOverview[0].executionExecutedAt,
                    jobsOverview[0].executionMonitoringStartAt,
                    jobsOverview[0].executionMonitoringEndAt,
                    jobsOverview[0].cancelled,
                    jobsOverview[0].completed,
                    jobsOverview[0].error,
                )
            )).toBe(undefined);
        });
    });
});