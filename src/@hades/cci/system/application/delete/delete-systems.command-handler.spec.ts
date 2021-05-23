import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteSystemsCommandHandler } from './delete-systems.command-handler';
import { DeleteSystemsCommand } from './delete-systems.command';
import { DeleteSystemsService } from './delete-systems.service';

describe('DeleteSystemsCommandHandler', () =>
{
    let commandHandler: DeleteSystemsCommandHandler;
    let service: DeleteSystemsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteSystemsCommandHandler,
                {
                    provide: DeleteSystemsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteSystemsCommandHandler>(DeleteSystemsCommandHandler);
        service         = module.get<DeleteSystemsService>(DeleteSystemsService);
    });

    describe('main', () =>
    {
        test('DeleteSystemsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteSystemsCommand()
            )).toBe(undefined);
        });
    });
});