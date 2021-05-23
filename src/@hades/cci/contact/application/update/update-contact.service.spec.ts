import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { contacts } from '@hades/cci/contact/infrastructure/seeds/contact.seed';
import { UpdateContactService } from './update-contact.service';
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
    ContactIsActive,
    ContactCreatedAt,
    ContactUpdatedAt,
    ContactDeletedAt,
} from './../../domain/value-objects';
import { IContactRepository } from './../../domain/contact.repository';
import { MockContactRepository } from './../../infrastructure/mock/mock-contact.repository';

describe('UpdateContactService', () =>
{
    let service: UpdateContactService;
    let repository: IContactRepository;
    let mockRepository: MockContactRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateContactService,
                MockContactRepository,
                {
                    provide: IContactRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateContactService);
        repository      = module.get(IContactRepository);
        mockRepository  = module.get(MockContactRepository);
    });

    describe('main', () =>
    {
        test('UpdateContactService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a contact and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new ContactId(contacts[0].id),
                    tenantId: new ContactTenantId(contacts[0].tenantId),
                    tenantCode: new ContactTenantCode(contacts[0].tenantCode),
                    systemId: new ContactSystemId(contacts[0].systemId),
                    systemName: new ContactSystemName(contacts[0].systemName),
                    roleId: new ContactRoleId(contacts[0].roleId),
                    roleName: new ContactRoleName(contacts[0].roleName),
                    name: new ContactName(contacts[0].name),
                    surname: new ContactSurname(contacts[0].surname),
                    email: new ContactEmail(contacts[0].email),
                    mobile: new ContactMobile(contacts[0].mobile),
                    area: new ContactArea(contacts[0].area),
                    hasConsentEmail: new ContactHasConsentEmail(contacts[0].hasConsentEmail),
                    hasConsentMobile: new ContactHasConsentMobile(contacts[0].hasConsentMobile),
                    isActive: new ContactIsActive(contacts[0].isActive),
                }
            )).toBe(undefined);
        });
    });
});