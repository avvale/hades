import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteResourcesCommandHandler } from './delete-resources.command-handler';
import { DeleteResourcesCommand } from './delete-resources.command';
import { DeleteResourcesService } from './delete-resources.service';

describe('DeleteResourcesCommandHandler', () =>
{
    let commandHandler: DeleteResourcesCommandHandler;
    let service: DeleteResourcesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteResourcesCommandHandler,
                {
                    provide: DeleteResourcesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteResourcesCommandHandler>(DeleteResourcesCommandHandler);
        service         = module.get<DeleteResourcesService>(DeleteResourcesService);
    });

    describe('main', () =>
    {
        test('DeleteResourcesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteResourcesCommand()
            )).toBe(undefined);
        });
    });
});