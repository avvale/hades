import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertJobsOverviewController } from './insert-jobs-overview.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsOverview } from '@hades/bplus-it-sappi/job-overview/infrastructure/seeds/job-overview.seed';

describe('InsertJobsOverviewController', () => 
{
    let controller: InsertJobsOverviewController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                InsertJobsOverviewController
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

        controller  = module.get<InsertJobsOverviewController>(InsertJobsOverviewController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertJobsOverviewController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertJobsOverviewController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an jobsOverview created', async () => 
        {
            expect(await controller.main(jobsOverview)).toBe(undefined);
        });
    });
});