import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateAccountCommandHandler } from './update-account.command-handler';
import { accounts } from '@hades/iam/account/infrastructure/seeds/account.seed';
import { UpdateAccountCommand } from './update-account.command';
import { UpdateAccountService } from './update-account.service';

describe('UpdateAccountCommandHandler', () => 
{
    let commandHandler: UpdateAccountCommandHandler;
    let service: UpdateAccountService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAccountCommandHandler,
                {
                    provide: UpdateAccountService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateAccountCommandHandler>(UpdateAccountCommandHandler);
        service         = module.get<UpdateAccountService>(UpdateAccountService);
    });

    describe('main', () => 
    {
        test('UpdateAccountCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an account created', async () => 
        {
            expect(await commandHandler.execute(
                new UpdateAccountCommand(
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