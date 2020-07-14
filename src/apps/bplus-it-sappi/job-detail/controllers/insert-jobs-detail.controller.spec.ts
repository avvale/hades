import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertJobsDetailController } from './insert-jobs-detail.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsDetail } from '@hades/bplus-it-sappi/job-detail/infrastructure/seeds/job-detail.seed';

describe('InsertJobsDetailController', () => 
{
    let controller: InsertJobsDetailController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                InsertJobsDetailController
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

        controller  = module.get<InsertJobsDetailController>(InsertJobsDetailController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertJobsDetailController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertJobsDetailController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an jobsDetail created', async () => 
        {
            expect(await controller.main(jobsDetail)).toBe(undefined);
        });
    });
});