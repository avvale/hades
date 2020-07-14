import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindJobDetailByIdController } from './find-job-detail-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsDetail } from '@hades/bplus-it-sappi/job-detail/infrastructure/seeds/job-detail.seed';

describe('FindJobDetailByIdController', () => 
{
    let controller: FindJobDetailByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                FindJobDetailByIdController
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

        controller  = module.get<FindJobDetailByIdController>(FindJobDetailByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindJobDetailByIdController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindJobDetailByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an jobDetail by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsDetail[0])));
            expect(await controller.main(jobsDetail[0].id)).toBe(jobsDetail[0]);
        });
    });
});