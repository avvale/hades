import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateContactCommandHandler } from './create-contact.command-handler';
import { contacts } from '@hades/bplus-it-sappi/contact/infrastructure/seeds/contact.seed';
import { CreateContactCommand } from './create-contact.command';
import { CreateContactService } from './create-contact.service';

describe('CreateContactCommandHandler', () => 
{
    let commandHandler: CreateContactCommandHandler;
    let service: CreateContactService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateContactCommandHandler,
                {
                    provide: CreateContactService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateContactCommandHandler>(CreateContactCommandHandler);
        service         = module.get<CreateContactService>(CreateContactService);
    });

    describe('main', () => 
    {
        test('CreateContactCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateContactService', async () => 
        {
            expect(await commandHandler.execute(
                new CreateContactCommand(
                    contacts[0].id,
                    contacts[0].tenantId,
                    contacts[0].tenantCode,
                    contacts[0].systemId,
                    contacts[0].systemName,
                    contacts[0].roleId,
                    contacts[0].roleName,
                    contacts[0].name,
                    contacts[0].surname,
                    contacts[0].email,
                    contacts[0].mobile,
                    contacts[0].area,
                    contacts[0].hasConsentEmail,
                    contacts[0].hasConsentMobile,
                    contacts[0].isActive,
                    
                )
            )).toBe(undefined);
        });
    });
});