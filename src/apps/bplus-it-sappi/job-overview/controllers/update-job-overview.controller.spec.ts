import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateJobOverviewController } from './update-job-overview.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsOverview } from '@hades/bplus-it-sappi/job-overview/infrastructure/seeds/job-overview.seed';

describe('UpdateJobOverviewController', () => 
{
    let controller: UpdateJobOverviewController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                UpdateJobOverviewController
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

        controller  = module.get<UpdateJobOverviewController>(UpdateJobOverviewController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateJobOverviewController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateJobOverviewController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a jobOverview created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsOverview[0])));
            expect(await controller.main(jobsOverview[0])).toBe(jobsOverview[0]);
        });
    });
});