import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateJobsDetailCommandHandler } from './create-jobs-detail.command-handler';
import { jobsDetail } from '@hades/bplus-it-sappi/job-detail/infrastructure/seeds/job-detail.seed';
import { CreateJobsDetailCommand } from './create-jobs-detail.command';
import { CreateJobsDetailService } from './create-jobs-detail.service';

describe('CreateJobsDetailCommandHandler', () => 
{
    let commandHandler: CreateJobsDetailCommandHandler;
    let service: CreateJobsDetailService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateJobsDetailCommandHandler,
                {
                    provide: CreateJobsDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateJobsDetailCommandHandler>(CreateJobsDetailCommandHandler);
        service         = module.get<CreateJobsDetailService>(CreateJobsDetailService);
    });

    describe('main', () => 
    {
        test('CreateJobsDetailCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an jobDetail created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateJobsDetailCommand(
                    jobsDetail
                
                )
            )).toBe(undefined);
        });
    });
});