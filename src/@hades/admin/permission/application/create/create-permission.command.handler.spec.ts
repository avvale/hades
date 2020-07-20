import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreatePermissionCommandHandler } from './create-permission.command-handler';
import { permissions } from '@hades/admin/permission/infrastructure/seeds/permission.seed';
import { CreatePermissionCommand } from './create-permission.command';
import { CreatePermissionService } from './create-permission.service';

describe('CreatePermissionCommandHandler', () => 
{
    let commandHandler: CreatePermissionCommandHandler;
    let service: CreatePermissionService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreatePermissionCommandHandler,
                {
                    provide: CreatePermissionService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreatePermissionCommandHandler>(CreatePermissionCommandHandler);
        service         = module.get<CreatePermissionService>(CreatePermissionService);
    });

    it('CreatePermissionCommandHandler should be defined', () => 
    {
        expect(commandHandler).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreatePermissionCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        it('should return an permission created', async () => 
        {
            expect(await commandHandler.execute(
                new CreatePermissionCommand(
                    permissions[0].id,
                    permissions[0].boundedContextId,
                    permissions[0].name,
                    
                )
            )).toBe(undefined);
        });
    });
});