import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
    ContactFlowsId, 
    ContactCreatedAt, 
    ContactUpdatedAt, 
    ContactDeletedAt
    
} from './../../domain/value-objects';
import { IContactRepository } from './../../domain/contact.repository';
import { BplusItSappiContact } from './../../domain/contact.aggregate';

@Injectable()
export class InsertContactsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IContactRepository
    ) {}

    public async main(
        contacts: {
            id: ContactId,
            tenantId: ContactTenantId,
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
            flowsId: ContactFlowsId,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateContacts = contacts.map(contact => BplusItSappiContact.register(
            contact.id,
            contact.tenantId,
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
            contact.flowsId,
            new ContactCreatedAt(Utils.nowTimestamp()),
            new ContactUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateContacts);

        // TODO a falta de definir eventos
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        // const contactsRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id)
        // );
        // 
        // contactsRegistered.created(contacts); // apply event to model events
        // contactsRegistered.commit(); // commit all events of model
    }
}