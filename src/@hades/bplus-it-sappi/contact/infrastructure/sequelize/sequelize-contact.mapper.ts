import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiContact } from './../../domain/contact.aggregate';
import { 
    ContactId, 
    ContactTenantId, 
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
    
} from './../../domain/value-objects';

export class SequelizeContactMapper implements SequelizeMapper
{
    mapToAggregate(contact: ObjectLiteral | ObjectLiteral[]): BplusItSappiContact | BplusItSappiContact[]
    {
        if (Array.isArray(contact))
        {
            return contact.map(item => BplusItSappiContact.register(
                    new ContactId(item.id),
                    new ContactTenantId(item.tenantId),
                    new ContactSystemId(item.systemId),
                    new ContactSystemName(item.systemName),
                    new ContactRoleId(item.roleId),
                    new ContactRoleName(item.roleName),
                    new ContactName(item.name),
                    new ContactSurname(item.surname),
                    new ContactEmail(item.email),
                    new ContactMobile(item.mobile),
                    new ContactArea(item.area),
                    new ContactHasConsentEmail(item.hasConsentEmail),
                    new ContactHasConsentMobile(item.hasConsentMobile),
                    new ContactIsActive(item.isActive),
                    new ContactCreatedAt(item.createdAt),
                    new ContactUpdatedAt(item.updatedAt),
                    new ContactDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
        return BplusItSappiContact.register(
            new ContactId(contact.id),
            new ContactTenantId(contact.tenantId),
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
            new ContactCreatedAt(contact.createdAt),
            new ContactUpdatedAt(contact.updatedAt),
            new ContactDeletedAt(contact.deletedAt),
            
        );
    }
}