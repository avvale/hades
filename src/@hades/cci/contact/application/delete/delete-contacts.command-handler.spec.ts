import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteContactsCommandHandler } from './delete-contacts.command-handler';
import { DeleteContactsCommand } from './delete-contacts.command';
import { DeleteContactsService } from './delete-contacts.service';

describe('DeleteContactsCommandHandler', () =>
{
    let commandHandler: DeleteContactsCommandHandler;
    let service: DeleteContactsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteContactsCommandHandler,
                {
                    provide: DeleteContactsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteContactsCommandHandler>(DeleteContactsCommandHandler);
        service         = module.get<DeleteContactsService>(DeleteContactsService);
    });

    describe('main', () =>
    {
        test('DeleteContactsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteContactsCommand()
            )).toBe(undefined);
        });
    });
});