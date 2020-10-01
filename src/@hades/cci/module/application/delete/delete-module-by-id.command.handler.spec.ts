import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteModuleByIdCommandHandler } from './delete-module-by-id.command-handler';
import { modules } from '@hades/cci/module/infrastructure/seeds/module.seed';
import { DeleteModuleByIdCommand } from './delete-module-by-id.command';
import { DeleteModuleByIdService } from './delete-module-by-id.service';

describe('DeleteModuleByIdCommandHandler', () => 
{
    let commandHandler: DeleteModuleByIdCommandHandler;
    let service: DeleteModuleByIdService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteModuleByIdCommandHandler,
                {
                    provide: DeleteModuleByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteModuleByIdCommandHandler>(DeleteModuleByIdCommandHandler);
        service         = module.get<DeleteModuleByIdService>(DeleteModuleByIdService);
    });

    describe('main', () => 
    {
        test('DeleteModuleByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteModuleByIdService', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteModuleByIdCommand(
                    modules[0].id,
                
                )
            )).toBe(undefined);
        });
    });
});