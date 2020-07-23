import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateRoleCommandHandler } from './update-role.command-handler';
import { roles } from '@hades/bplus-it-sappi/role/infrastructure/seeds/role.seed';
import { UpdateRoleCommand } from './update-role.command';
import { UpdateRoleService } from './update-role.service';

describe('UpdateRoleCommandHandler', () => 
{
    let commandHandler: UpdateRoleCommandHandler;
    let service: UpdateRoleService;

    beforeEach(async () => 
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
                    roles[0].id,
                    roles[0].tenantId,
                    roles[0].tenantCode,
                    roles[0].name,
                    
                )
            )).toBe(undefined);
        });
    });
});