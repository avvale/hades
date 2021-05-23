import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
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
import { CciContact } from './../../domain/contact.aggregate';
import { contacts } from './../seeds/contact.seed';

@Injectable()
export class MockContactSeeder extends MockSeeder<CciContact>
{
    public collectionSource: CciContact[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let contact of contacts)
        {
            this.collectionSource.push(
                CciContact.register(
                    new ContactId(contact.id),
                    new ContactTenantId(contact.tenantId),
                    new ContactTenantCode(contact.tenantCode),
                    new ContactSystemId(contact.systemId),
                    new ContactSystemName(contact.systemName),
                    new ContactRoleId(contact.roleId),
                    new ContactRoleName(contact.roleName),
                    new ContactName(contact.name),
                    new ContactSurname(contact.surname),
                    new ContactEmail(contact.email),
                    new ContactMobile(contact.mobile),
                    new ContactArea(contact.area),
                    new ContactHasConsentEmail(contact.hasConsentEmail),
                    new ContactHasConsentMobile(contact.hasConsentMobile),
                    new ContactIsActive(contact.isActive),
                    new ContactCreatedAt({currentTimestamp: true}),
                    new ContactUpdatedAt({currentTimestamp: true}),
                    new ContactDeletedAt(null),
                )
            );
        }
    }
}