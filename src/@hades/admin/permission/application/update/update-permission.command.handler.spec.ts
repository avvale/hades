import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdatePermissionCommandHandler } from './update-permission.command-handler';
import { permissions } from '@hades/admin/permission/infrastructure/seeds/permission.seed';
import { UpdatePermissionCommand } from './update-permission.command';
import { UpdatePermissionService } from './update-permission.service';

describe('UpdatePermissionCommandHandler', () => 
{
    let commandHandler: UpdatePermissionCommandHandler;
    let service: UpdatePermissionService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdatePermissionCommandHandler,
                {
                    provide: UpdatePermissionService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdatePermissionCommandHandler>(UpdatePermissionCommandHandler);
        service         = module.get<UpdatePermissionService>(UpdatePermissionService);
    });

    describe('main', () => 
    {
        test('UpdatePermissionCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an permission created', async () => 
        {
            expect(await commandHandler.execute(
                new UpdatePermissionCommand(
                    permissions[0].id,
                    permissions[0].boundedContextId,
                    permissions[0].name,
                    
                )
            )).toBe(undefined);
        });
    });
});