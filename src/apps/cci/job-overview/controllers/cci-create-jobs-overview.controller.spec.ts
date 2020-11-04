import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateJobsOverviewController } from './cci-create-jobs-overview.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsOverview } from '@hades/cci/job-overview/infrastructure/seeds/job-overview.seed';

describe('CciCreateJobsOverviewController', () => 
{
    let controller: CciCreateJobsOverviewController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciCreateJobsOverviewController
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

        controller  = module.get<CciCreateJobsOverviewController>(CciCreateJobsOverviewController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CciCreateJobsOverviewController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an jobsOverview created', async () => 
        {
            expect(await controller.main(jobsOverview)).toBe(undefined);
        });
    });
});