// ignored file
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { rolesToCreate } from '@hades/iam/role/infrastructure/seeds/roles-to-create.seed';
import { CreateRoleCommandHandler } from './create-role.command-handler';
import { CreateRoleCommand } from './create-role.command';
import { CreateRoleService } from './create-role.service';

describe('CreateRoleCommandHandler', () =>
{
    let commandHandler: CreateRoleCommandHandler;
    let service: CreateRoleService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateRoleCommandHandler,
                {
                    provide: CreateRoleService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateRoleCommandHandler>(CreateRoleCommandHandler);
        service         = module.get<CreateRoleService>(CreateRoleService);
    });

    describe('main', () =>
    {
        test('CreateRoleCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateRoleService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateRoleCommand(
                    {
                        id : rolesToCreate[0].id,
                        name : rolesToCreate[0].name,
                        isMaster : rolesToCreate[0].isMaster,
                        permissionIds : rolesToCreate[0].permissionIds,
                        accountIds : rolesToCreate[0].accountIds,
                    }
                )
            )).toBe(undefined);
        });
    });
});