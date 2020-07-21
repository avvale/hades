import { AggregateRoot } from '@nestjs/cqrs';
import { BplusItSappiContact } from './../../domain/contact.aggregate';
import { CreatedContactEvent } from './created-contact.event';
import { DeletedContactEvent } from './deleted-contact.event';
import { CreatedContactsEvent } from './created-contacts.event';
import { DeletedContactsEvent } from './deleted-contacts.event';

export class AddContactsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: BplusItSappiContact[] = []
    ) {
        super();
    }

    *[Symbol.iterator]()
    { 
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot; 
    }

    created()
    {
        this.apply(
            new CreatedContactsEvent(
                this.aggregateRoots.map(contact => 
                    new CreatedContactEvent(
                        contact.id.value,
                        contact.tenantId.value,
                        contact.systemId.value,
                        contact.systemName.value,
                        contact.roleId?.value,
                        contact.roleName?.value,
                        contact.name.value,
                        contact.surname?.value,
                        contact.email.value,
                        contact.mobile?.value,
                        contact.area?.value,
                        contact.hasConsentEmail.value,
                        contact.hasConsentMobile.value,
                        contact.isActive.value,
                        contact.createdAt?.value,
                        contact.updatedAt?.value,
                        contact.deletedAt?.value,
                        
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedContactsEvent(
                this.aggregateRoots.map(contact => 
                    new DeletedContactEvent(
                        contact.id.value,
                        contact.tenantId.value,
                        contact.systemId.value,
                        contact.systemName.value,
                        contact.roleId?.value,
                        contact.roleName?.value,
                        contact.name.value,
                        contact.surname?.value,
                        contact.email.value,
                        contact.mobile?.value,
                        contact.area?.value,
                        contact.hasConsentEmail.value,
                        contact.hasConsentMobile.value,
                        contact.isActive.value,
                        contact.createdAt?.value,
                        contact.updatedAt?.value,
                        contact.deletedAt?.value,
                           
                    )
                )
            )
        );
    }   
}