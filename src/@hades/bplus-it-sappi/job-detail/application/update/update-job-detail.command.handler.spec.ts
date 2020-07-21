import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateJobDetailCommandHandler } from './update-job-detail.command-handler';
import { jobsDetail } from '@hades/bplus-it-sappi/job-detail/infrastructure/seeds/job-detail.seed';
import { UpdateJobDetailCommand } from './update-job-detail.command';
import { UpdateJobDetailService } from './update-job-detail.service';

describe('UpdateJobDetailCommandHandler', () => 
{
    let commandHandler: UpdateJobDetailCommandHandler;
    let service: UpdateJobDetailService;

    beforeEach(async () => 
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