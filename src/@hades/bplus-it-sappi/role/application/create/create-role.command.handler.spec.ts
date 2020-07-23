import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateRoleCommandHandler } from './create-role.command-handler';
import { roles } from '@hades/bplus-it-sappi/role/infrastructure/seeds/role.seed';
import { CreateRoleCommand } from './create-role.command';
import { CreateRoleService } from './create-role.service';

describe('CreateRoleCommandHandler', () => 
{
    let commandHandler: CreateRoleCommandHandler;
    let service: CreateRoleService;

    beforeEach(async () => 
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
                    roles[0].id,
                    roles[0].tenantId,
                    roles[0].tenantCode,
                    roles[0].name,
                    
                )
            )).toBe(undefined);
        });
    });
});