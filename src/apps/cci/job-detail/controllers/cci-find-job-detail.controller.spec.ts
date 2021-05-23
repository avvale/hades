import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciFindJobDetailController } from './cci-find-job-detail.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsDetail } from '@hades/cci/job-detail/infrastructure/seeds/job-detail.seed';

describe('CciFindJobDetailController', () =>
{
    let controller: CciFindJobDetailController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciFindJobDetailController
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

        controller  = module.get<CciFindJobDetailController>(CciFindJobDetailController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CciFindJobDetailController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a jobDetail', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsDetail[0])));
            expect(await controller.main()).toBe(jobsDetail[0]);
        });
    });
});