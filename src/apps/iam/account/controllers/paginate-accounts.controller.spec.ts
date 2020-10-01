import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateAccountsController } from './paginate-accounts.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { accounts } from '@hades/iam/account/infrastructure/seeds/account.seed';

describe('PaginateAccountsController', () => 
{
    let controller: PaginateAccountsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                PaginateAccountsController
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

        controller  = module.get<PaginateAccountsController>(PaginateAccountsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('PaginateAccountsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a accounts', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accounts)));
            expect(await controller.main()).toBe(accounts);
        });
    });
});