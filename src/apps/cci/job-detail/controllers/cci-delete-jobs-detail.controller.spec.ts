import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciDeleteJobsDetailController } from './cci-delete-jobs-detail.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsDetail } from '@hades/cci/job-detail/infrastructure/seeds/job-detail.seed';

describe('CciDeleteJobsDetailController', () =>
{
    let controller: CciDeleteJobsDetailController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciDeleteJobsDetailController
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

        controller  = module.get<CciDeleteJobsDetailController>(CciDeleteJobsDetailController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CciDeleteJobsDetailController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an jobsDetail deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsDetail)));
            expect(await controller.main()).toBe(jobsDetail);
        });
    });
});