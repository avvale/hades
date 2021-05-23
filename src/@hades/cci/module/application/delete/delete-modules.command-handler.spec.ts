import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteModulesCommandHandler } from './delete-modules.command-handler';
import { DeleteModulesCommand } from './delete-modules.command';
import { DeleteModulesService } from './delete-modules.service';

describe('DeleteModulesCommandHandler', () =>
{
    let commandHandler: DeleteModulesCommandHandler;
    let service: DeleteModulesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteModulesCommandHandler,
                {
                    provide: DeleteModulesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteModulesCommandHandler>(DeleteModulesCommandHandler);
        service         = module.get<DeleteModulesService>(DeleteModulesService);
    });

    describe('main', () =>
    {
        test('DeleteModulesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteModulesCommand()
            )).toBe(undefined);
        });
    });
});