import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteContactByIdCommandHandler } from './delete-contact-by-id.command-handler';
import { contacts } from '@hades/bplus-it-sappi/contact/infrastructure/seeds/contact.seed';
import { DeleteContactByIdCommand } from './delete-contact-by-id.command';
import { DeleteContactByIdService } from './delete-contact-by-id.service';

describe('DeleteContactByIdCommandHandler', () => 
{
    let commandHandler: DeleteContactByIdCommandHandler;
    let service: DeleteContactByIdService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteContactByIdCommandHandler,
                {
                    provide: DeleteContactByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteContactByIdCommandHandler>(DeleteContactByIdCommandHandler);
        service         = module.get<DeleteContactByIdService>(DeleteContactByIdService);
    });

    describe('main', () => 
    {
        test('DeleteContactByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteContactByIdService', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteContactByIdCommand(
                    contacts[0].id,
                
                )
            )).toBe(undefined);
        });
    });
});