import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IContactRepository } from '@hades/cci/contact/domain/contact.repository';
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
    ContactDeletedAt
    
} from '@hades/cci/contact/domain/value-objects';
import { CciContact } from './../../domain/contact.aggregate';
import { contacts } from './../seeds/contact.seed';

@Injectable()
export class MockContactRepository extends MockRepository<CciContact> implements IContactRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CciContact';
    public collectionSource: CciContact[];
    public deletedAtInstance: ContactDeletedAt = new ContactDeletedAt(null);
    
    constructor() 
    {
        super();
        this.createSourceMockData();
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>contacts)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(CciContact.register(
                    new ContactId(itemCollection.id),
                    new ContactTenantId(itemCollection.tenantId),
                    new ContactTenantCode(itemCollection.tenantCode),
                    new ContactSystemId(itemCollection.systemId),
                    new ContactSystemName(itemCollection.systemName),
                    new ContactRoleId(itemCollection.roleId),
                    new ContactRoleName(itemCollection.roleName),
                    new ContactName(itemCollection.name),
                    new ContactSurname(itemCollection.surname),
                    new ContactEmail(itemCollection.email),
                    new ContactMobile(itemCollection.mobile),
                    new ContactArea(itemCollection.area),
                    new ContactHasConsentEmail(itemCollection.hasConsentEmail),
                    new ContactHasConsentMobile(itemCollection.hasConsentMobile),
                    new ContactIsActive(itemCollection.isActive),
                    new ContactCreatedAt(itemCollection.createdAt),
                    new ContactUpdatedAt(itemCollection.updatedAt),
                    new ContactDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }
}