import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateAccountCommandHandler } from './create-account.command-handler';
import { accounts } from '@hades/iam/account/infrastructure/seeds/account.seed';
import { CreateAccountCommand } from './create-account.command';
import { CreateAccountService } from './create-account.service';

describe('CreateAccountCommandHandler', () =>
{
    let commandHandler: CreateAccountCommandHandler;
    let service: CreateAccountService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAccountCommandHandler,
                {
                    provide: CreateAccountService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateAccountCommandHandler>(CreateAccountCommandHandler);
        service         = module.get<CreateAccountService>(CreateAccountService);
    });

    describe('main', () =>
    {
        test('CreateAccountCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateAccountService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAccountCommand(
                    accounts[0].id,
                    accounts[0].type,
                    accounts[0].email,
                    accounts[0].isActive,
                    accounts[0].clientId,
                    accounts[0].dApplicationCodes,
                    accounts[0].dPermissions,
                    accounts[0].dTenants,
                    accounts[0].data,
                    accounts[0].roleIds,
                    accounts[0].tenantIds,
                )
            )).toBe(undefined);
        });
    });
});