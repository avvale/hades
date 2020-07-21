import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateJobsOverviewController } from './create-jobs-overview.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsOverview } from '@hades/bplus-it-sappi/job-overview/infrastructure/seeds/job-overview.seed';

describe('CreateJobsOverviewController', () => 
{
    let controller: CreateJobsOverviewController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CreateJobsOverviewController
            ],
            providers: [
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {},
                    }
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {},
                    }
                },
            ]
        }).compile();

        controller  = module.get<CreateJobsOverviewController>(CreateJobsOverviewController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CreateJobsOverviewController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an jobsOverview created', async () => 
        {
            expect(await controller.main(jobsOverview)).toBe(undefined);
        });
    });
});