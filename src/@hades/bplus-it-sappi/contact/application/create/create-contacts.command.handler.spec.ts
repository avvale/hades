import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateContactsCommandHandler } from './create-contacts.command-handler';
import { contacts } from '@hades/bplus-it-sappi/contact/infrastructure/seeds/contact.seed';
import { CreateContactsCommand } from './create-contacts.command';
import { CreateContactsService } from './create-contacts.service';

describe('CreateContactsCommandHandler', () => 
{
    let commandHandler: CreateContactsCommandHandler;
    let service: CreateContactsService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateContactsCommandHandler,
                {
                    provide: CreateContactsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateContactsCommandHandler>(CreateContactsCommandHandler);
        service         = module.get<CreateContactsService>(CreateContactsService);
    });

    describe('main', () => 
    {
        test('CreateContactsCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an contact created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateContactsCommand(
                    contacts
                
                )
            )).toBe(undefined);
        });
    });
});