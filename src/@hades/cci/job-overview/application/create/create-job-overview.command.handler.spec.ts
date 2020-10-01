import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateJobOverviewCommandHandler } from './create-job-overview.command-handler';
import { jobsOverview } from '@hades/cci/job-overview/infrastructure/seeds/job-overview.seed';
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