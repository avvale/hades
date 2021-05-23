import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { contacts } from '@hades/cci/contact/infrastructure/seeds/contact.seed';
import { CreateContactCommandHandler } from './create-contact.command-handler';
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
                    {
                        id: contacts[0].id,
                        tenantId: contacts[0].tenantId,
                        tenantCode: contacts[0].tenantCode,
                        systemId: contacts[0].systemId,
                        systemName: contacts[0].systemName,
                        roleId: contacts[0].roleId,
                        roleName: contacts[0].roleName,
                        name: contacts[0].name,
                        surname: contacts[0].surname,
                        email: contacts[0].email,
                        mobile: contacts[0].mobile,
                        area: contacts[0].area,
                        hasConsentEmail: contacts[0].hasConsentEmail,
                        hasConsentMobile: contacts[0].hasConsentMobile,
                        isActive: contacts[0].isActive,
                    }
                )
            )).toBe(undefined);
        });
    });
});