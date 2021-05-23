import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { contacts } from '@hades/cci/contact/infrastructure/seeds/contact.seed';
import { UpdateContactCommandHandler } from './update-contact.command-handler';
import { UpdateContactCommand } from './update-contact.command';
import { UpdateContactService } from './update-contact.service';

describe('UpdateContactCommandHandler', () =>
{
    let commandHandler: UpdateContactCommandHandler;
    let service: UpdateContactService;

    beforeAll(async () =>
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