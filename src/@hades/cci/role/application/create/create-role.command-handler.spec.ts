import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { roles } from '@hades/cci/role/infrastructure/seeds/role.seed';
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
                        id: roles[0].id,
                        tenantId: roles[0].tenantId,
                        tenantCode: roles[0].tenantCode,
                        name: roles[0].name,
                    }
                )
            )).toBe(undefined);
        });
    });
});