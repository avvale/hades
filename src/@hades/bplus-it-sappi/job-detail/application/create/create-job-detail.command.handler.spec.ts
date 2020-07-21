import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateJobDetailCommandHandler } from './create-job-detail.command-handler';
import { jobsDetail } from '@hades/bplus-it-sappi/job-detail/infrastructure/seeds/job-detail.seed';
import { CreateJobDetailCommand } from './create-job-detail.command';
import { CreateJobDetailService } from './create-job-detail.service';

describe('CreateJobDetailCommandHandler', () => 
{
    let commandHandler: CreateJobDetailCommandHandler;
    let service: CreateJobDetailService;

    beforeEach(async () => 
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
                    jobsDetail[0].id,
                    jobsDetail[0].tenantId,
                    jobsDetail[0].systemId,
                    jobsDetail[0].systemName,
                    jobsDetail[0].executionId,
                    jobsDetail[0].executionType,
                    jobsDetail[0].executionExecutedAt,
                    jobsDetail[0].executionMonitoringStartAt,
                    jobsDetail[0].executionMonitoringEndAt,
                    jobsDetail[0].status,
                    jobsDetail[0].name,
                    jobsDetail[0].returnCode,
                    jobsDetail[0].node,
                    jobsDetail[0].user,
                    
                )
            )).toBe(undefined);
        });
    });
});