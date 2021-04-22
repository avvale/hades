// ignored file
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { rolesToCreate } from '@hades/iam/role/infrastructure/seeds/role-to-create.seed';
import { UpdateRoleCommandHandler } from './update-role.command-handler';
import { UpdateRoleCommand } from './update-role.command';
import { UpdateRoleService } from './update-role.service';

describe('UpdateRoleCommandHandler', () =>
{
    let commandHandler: UpdateRoleCommandHandler;
    let service: UpdateRoleService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateRoleCommandHandler,
                {
                    provide: UpdateRoleService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateRoleCommandHandler>(UpdateRoleCommandHandler);
        service         = module.get<UpdateRoleService>(UpdateRoleService);
    });

    describe('main', () =>
    {
        test('UpdateRoleCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an role created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateRoleCommand(
                    {
                        id: rolesToCreate[0].id,
                        name: rolesToCreate[0].name,
                        isMaster: rolesToCreate[0].isMaster,
                        permissionIds: rolesToCreate[0].permissionIds,
                        accountIds: rolesToCreate[0].accountIds,
                    }
                )
            )).toBe(undefined);
        });
    });
});