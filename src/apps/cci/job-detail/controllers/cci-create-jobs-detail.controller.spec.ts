import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateJobsDetailController } from './cci-create-jobs-detail.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsDetail } from '@hades/cci/job-detail/infrastructure/seeds/job-detail.seed';

describe('CciCreateJobsDetailController', () => 
{
    let controller: CciCreateJobsDetailController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciCreateJobsDetailController
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

        controller  = module.get<CciCreateJobsDetailController>(CciCreateJobsDetailController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CciCreateJobsDetailController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an jobsDetail created', async () => 
        {
            expect(await controller.main(jobsDetail)).toBe(undefined);
        });
    });
});