import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateJobsOverviewCommandHandler } from './create-jobs-overview.command-handler';
import { jobsOverview } from '@hades/bplus-it-sappi/job-overview/infrastructure/seeds/job-overview.seed';
import { CreateJobsOverviewCommand } from './create-jobs-overview.command';
import { CreateJobsOverviewService } from './create-jobs-overview.service';

describe('CreateJobsOverviewCommandHandler', () => 
{
    let commandHandler: CreateJobsOverviewCommandHandler;
    let service: CreateJobsOverviewService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateJobsOverviewCommandHandler,
                {
                    provide: CreateJobsOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateJobsOverviewCommandHandler>(CreateJobsOverviewCommandHandler);
        service         = module.get<CreateJobsOverviewService>(CreateJobsOverviewService);
    });

    describe('main', () => 
    {
        test('CreateJobsOverviewCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an jobOverview created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateJobsOverviewCommand(
                    jobsOverview
                
                )
            )).toBe(undefined);
        });
    });
});