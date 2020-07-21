import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateContactCommandHandler } from './update-contact.command-handler';
import { contacts } from '@hades/bplus-it-sappi/contact/infrastructure/seeds/contact.seed';
import { UpdateContactCommand } from './update-contact.command';
import { UpdateContactService } from './update-contact.service';

describe('UpdateContactCommandHandler', () => 
{
    let commandHandler: UpdateContactCommandHandler;
    let service: UpdateContactService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateContactCommandHandler,
                {
                    provide: UpdateContactService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateContactCommandHandler>(UpdateContactCommandHandler);
        service         = module.get<UpdateContactService>(UpdateContactService);
    });

    describe('main', () => 
    {
        test('UpdateContactCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an contact created', async () => 
        {
            expect(await commandHandler.execute(
                new UpdateContactCommand(
                    contacts[0].id,
                    contacts[0].tenantId,
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