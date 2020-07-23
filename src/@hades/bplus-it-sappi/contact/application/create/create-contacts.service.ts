import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
    
} from './../../domain/value-objects';
import { IContactRepository } from './../../domain/contact.repository';
import { BplusItSappiContact } from './../../domain/contact.aggregate';
import { AddContactsContextEvent } from './../events/add-contacts-context.event';

@Injectable()
export class CreateContactsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IContactRepository
    ) {}

    public async main(
        contacts: {
            id: ContactId,
            tenantId: ContactTenantId,
            tenantCode: ContactTenantCode,
            systemId: ContactSystemId,
            systemName: ContactSystemName,
            roleId: ContactRoleId,
            roleName: ContactRoleName,
            name: ContactName,
            surname: ContactSurname,
            email: ContactEmail,
            mobile: ContactMobile,
            area: ContactArea,
            hasConsentEmail: ContactHasConsentEmail,
            hasConsentMobile: ContactHasConsentMobile,
            isActive: ContactIsActive,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateContacts = contacts.map(contact => BplusItSappiContact.register(
            contact.id,
            contact.tenantId,
            contact.tenantCode,
            contact.systemId,
            contact.systemName,
            contact.roleId,
            contact.roleName,
            contact.name,
            contact.surname,
            contact.email,
            contact.mobile,
            contact.area,
            contact.hasConsentEmail,
            contact.hasConsentMobile,
            contact.isActive,
            new ContactCreatedAt(Utils.nowTimestamp()),
            new ContactUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateContacts);

        // create AddContactsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const contactsRegistered = this.publisher.mergeObjectContext(new AddContactsContextEvent(aggregateContacts));
 
        contactsRegistered.created(); // apply event to model events
        contactsRegistered.commit(); // commit all events of model
    }
}