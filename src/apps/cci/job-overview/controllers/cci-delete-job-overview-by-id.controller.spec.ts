import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciDeleteJobOverviewByIdController } from './cci-delete-job-overview-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsOverview } from '@hades/cci/job-overview/infrastructure/seeds/job-overview.seed';

describe('CciDeleteJobOverviewByIdController', () =>
{
    let controller: CciDeleteJobOverviewByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciDeleteJobOverviewByIdController
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

        controller  = module.get<CciDeleteJobOverviewByIdController>(CciDeleteJobOverviewByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CciDeleteJobOverviewByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an jobOverview deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsOverview[0])));
            expect(await controller.main(jobsOverview[0].id)).toBe(jobsOverview[0]);
        });
    });
});