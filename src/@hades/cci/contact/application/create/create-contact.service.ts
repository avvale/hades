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
import { CciContact } from './../../domain/contact.aggregate';

@Injectable()
export class CreateContactService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IContactRepository
    ) {}

    public async main(
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
        
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const contact = CciContact.register(
            id,
            tenantId,
            tenantCode,
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
            new ContactCreatedAt(Utils.nowTimestamp()),
            new ContactUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // create
        await this.repository.create(contact);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const contactRegister = this.publisher.mergeObjectContext(
            contact
        );
        
        contactRegister.created(contact); // apply event to model events
        contactRegister.commit(); // commit all events of model
    }
}