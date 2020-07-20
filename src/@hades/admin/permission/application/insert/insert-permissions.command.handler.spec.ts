import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertPermissionsCommandHandler } from './insert-permissions.command-handler';
import { permissions } from '@hades/admin/permission/infrastructure/seeds/permission.seed';
import { InsertPermissionsCommand } from './insert-permissions.command';
import { InsertPermissionsService } from './insert-permissions.service';

describe('InsertPermissionsCommandHandler', () => 
{
    let commandHandler: InsertPermissionsCommandHandler;
    let service: InsertPermissionsService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertPermissionsCommandHandler,
                {
                    provide: InsertPermissionsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<InsertPermissionsCommandHandler>(InsertPermissionsCommandHandler);
        service         = module.get<InsertPermissionsService>(InsertPermissionsService);
    });

    it('InsertPermissionsCommandHandler should be defined', () => 
    {
        expect(commandHandler).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertPermissionsCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        it('should return an permission created', async () => 
        {
            expect(await commandHandler.execute(
                new InsertPermissionsCommand(
                    permissions
                
                )
            )).toBe(undefined);
        });
    });
});