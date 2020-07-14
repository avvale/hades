import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateExecutionsController } from './paginate-executions.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { executions } from '@hades/bplus-it-sappi/execution/infrastructure/seeds/execution.seed';

describe('PaginateExecutionsController', () => 
{
    let controller: PaginateExecutionsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                PaginateExecutionsController
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

        controller  = module.get<PaginateExecutionsController>(PaginateExecutionsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('PaginateExecutionsController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('PaginateExecutionsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a executions', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(executions)));
            expect(await controller.main([], [])).toBe(executions);
        });
    });
});