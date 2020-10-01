import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { contacts } from '@hades/cci/contact/infrastructure/seeds/contact.seed';
import { CreateContactService } from './create-contact.service';
import { 
    ContactId,
    ContactTenantId,
    ContactTenantCode,
    ContactSystemId,
    ContactSystemName,
    ContactRoleId,
    ContactRoleName,
    ContactName,
    ContactSurname,
    ContactEmail,
    ContactMobile,
    ContactArea,
    ContactHasConsentEmail,
    ContactHasConsentMobile,
    ContactIsActive
    
} from './../../domain/value-objects';
import { IContactRepository } from './../../domain/contact.repository';
import { MockContactRepository } from './../../infrastructure/mock/mock-contact.repository';

describe('CreateContactService', () => 
{
    let service: CreateContactService;
    let repository: IContactRepository;
    let mockRepository: MockContactRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateContactService,
                MockContactRepository,
                { 
                    provide: IContactRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateContactService);
        repository      = module.get(IContactRepository);
        mockRepository  = module.get(MockContactRepository);
    });

    describe('main', () => 
    {
        test('CreateContactService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create a contact and emit event', async () => 
        {
            expect(await service.main(
                new ContactId(contacts[0].id),
                new ContactTenantId(contacts[0].tenantId),
                new ContactTenantCode(contacts[0].tenantCode),
                new ContactSystemId(contacts[0].systemId),
                new ContactSystemName(contacts[0].systemName),
                new ContactRoleId(contacts[0].roleId),
                new ContactRoleName(contacts[0].roleName),
                new ContactName(contacts[0].name),
                new ContactSurname(contacts[0].surname),
                new ContactEmail(contacts[0].email),
                new ContactMobile(contacts[0].mobile),
                new ContactArea(contacts[0].area),
                new ContactHasConsentEmail(contacts[0].hasConsentEmail),
                new ContactHasConsentMobile(contacts[0].hasConsentMobile),
                new ContactIsActive(contacts[0].isActive),
                
            )).toBe(undefined);
        });
    });
});