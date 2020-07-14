import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiContact } from './contact.aggregate';
import { ContactResponse } from './contact.response';
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
    
} from './value-objects';

export class ContactMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param contact
     */
    mapObjectToAggregate(contact: ObjectLiteral): BplusItSappiContact
    {
        return this.makeAggregate(contact);
    }

    /**
     * Map array of objects to array aggregates
     * @param contacts 
     */
    mapObjectsToAggregates(contacts: ObjectLiteral[]): BplusItSappiContact[]
    {
        return contacts.map(contact  => this.makeAggregate(contact ));
    }

    /**
     * Map aggregate to response
     * @param contact 
     */
    mapAggregateToResponse(contact: BplusItSappiContact): ContactResponse
    {
        return this.makeResponse(contact);
    }

    /**
     * Map array of aggregates to array responses
     * @param contacts
     */
    mapAggregatesToResponses(contacts: BplusItSappiContact[]): ContactResponse[]
    {
        return contacts.map(contact => this.makeResponse(contact));
    }

    private makeAggregate(contact: ObjectLiteral): BplusItSappiContact
    {
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

    private makeResponse(contact: BplusItSappiContact): ContactResponse
    {
        return new ContactResponse(
            contact.id.value,
            contact.tenantId.value,
            contact.systemId.value,
            contact.systemName.value,
            contact.roleId.value,
            contact.roleName.value,
            contact.name.value,
            contact.surname.value,
            contact.email.value,
            contact.mobile.value,
            contact.area.value,
            contact.hasConsentEmail.value,
            contact.hasConsentMobile.value,
            contact.isActive.value,
            contact.createdAt.value,
            contact.updatedAt.value,
            contact.deletedAt.value,
            
        );
    }
}