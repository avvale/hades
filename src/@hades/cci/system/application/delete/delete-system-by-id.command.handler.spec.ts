import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteSystemByIdCommandHandler } from './delete-system-by-id.command-handler';
import { systems } from '@hades/cci/system/infrastructure/seeds/system.seed';
import { DeleteSystemByIdCommand } from './delete-system-by-id.command';
import { DeleteSystemByIdService } from './delete-system-by-id.service';

describe('DeleteSystemByIdCommandHandler', () => 
{
    let commandHandler: DeleteSystemByIdCommandHandler;
    let service: DeleteSystemByIdService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteSystemByIdCommandHandler,
                {
                    provide: DeleteSystemByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteSystemByIdCommandHandler>(DeleteSystemByIdCommandHandler);
        service         = module.get<DeleteSystemByIdService>(DeleteSystemByIdService);
    });

    describe('main', () => 
    {
        test('DeleteSystemByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteSystemByIdService', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteSystemByIdCommand(
                    systems[0].id,
                )
            )).toBe(undefined);
        });
    });
});