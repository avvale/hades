import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteJobsDetailController } from './delete-jobs-detail.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsDetail } from '@hades/bplus-it-sappi/job-detail/infrastructure/seeds/job-detail.seed';

describe('DeleteJobsDetailController', () => 
{
    let controller: DeleteJobsDetailController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteJobsDetailController
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

        controller  = module.get<DeleteJobsDetailController>(DeleteJobsDetailController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteJobsDetailController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteJobsDetailController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an jobsDetail deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsDetail)));
            expect(await controller.main([])).toBe(jobsDetail);
        });
    });
});