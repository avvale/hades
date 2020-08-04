import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateRolesCommandHandler } from './create-roles.command-handler';
import { roles } from '@hades/bplus-it-sappi/role/infrastructure/seeds/role.seed';
import { CreateRolesCommand } from './create-roles.command';
import { CreateRolesService } from './create-roles.service';

describe('CreateRolesCommandHandler', () => 
{
    let commandHandler: CreateRolesCommandHandler;
    let service: CreateRolesService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateRolesCommandHandler,
                {
                    provide: CreateRolesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateRolesCommandHandler>(CreateRolesCommandHandler);
        service         = module.get<CreateRolesService>(CreateRolesService);
    });

    describe('main', () => 
    {
        test('CreateRolesCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an role created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateRolesCommand(
                    roles
                
                )
            )).toBe(undefined);
        });
    });
});