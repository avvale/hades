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
export class UpdateContactService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IContactRepository
    ) {}

    public async main(
        id: ContactId,
        tenantId?: ContactTenantId,
        systemId?: ContactSystemId,
        systemName?: ContactSystemName,
        roleId?: ContactRoleId,
        roleName?: ContactRoleName,
        name?: ContactName,
        surname?: ContactSurname,
        email?: ContactEmail,
        mobile?: ContactMobile,
        area?: ContactArea,
        hasConsentEmail?: ContactHasConsentEmail,
        hasConsentMobile?: ContactHasConsentMobile,
        isActive?: ContactIsActive,
        flowsId?: ContactFlowsId,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const contact = BplusItSappiContact.register(
            id,
            tenantId,
            systemId,
            systemName,
            roleId,
            roleName,
            name,
            surname,
            email,
            mobile,
            area,
            hasConsentEmail,
            hasConsentMobile,
            isActive,
            flowsId,
            null,
            new ContactUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(contact);        
            
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const contactRegister = this.publisher.mergeObjectContext(
            await this.repository.findById(id)
        );
        
        contactRegister.updated(contact); // apply event to model events
        contactRegister.commit(); // commit all events of model
    }
}