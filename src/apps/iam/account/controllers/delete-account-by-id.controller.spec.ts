import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAccountByIdController } from './delete-account-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { accounts } from '@hades/iam/account/infrastructure/seeds/account.seed';

describe('DeleteAccountByIdController', () => 
{
    let controller: DeleteAccountByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteAccountByIdController
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

        controller  = module.get<DeleteAccountByIdController>(DeleteAccountByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('DeleteAccountByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an account deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await controller.main(accounts[0].id)).toBe(accounts[0]);
        });
    });
});