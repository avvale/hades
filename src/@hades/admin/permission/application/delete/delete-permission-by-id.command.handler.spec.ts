import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeletePermissionByIdCommandHandler } from './delete-permission-by-id.command-handler';
import { permissions } from '@hades/admin/permission/infrastructure/seeds/permission.seed';
import { DeletePermissionByIdCommand } from './delete-permission-by-id.command';
import { DeletePermissionByIdService } from './delete-permission-by-id.service';

describe('DeletePermissionByIdCommandHandler', () => 
{
    let commandHandler: DeletePermissionByIdCommandHandler;
    let service: DeletePermissionByIdService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeletePermissionByIdCommandHandler,
                {
                    provide: DeletePermissionByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeletePermissionByIdCommandHandler>(DeletePermissionByIdCommandHandler);
        service         = module.get<DeletePermissionByIdService>(DeletePermissionByIdService);
    });

    it('DeletePermissionByIdCommandHandler should be defined', () => 
    {
        expect(commandHandler).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('DeletePermissionByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        it('should return void', async () => 
        {
            expect(await commandHandler.execute(
                new DeletePermissionByIdCommand(
                    permissions[0].id,
                
                )
            )).toBe(undefined);
        });
    });
});