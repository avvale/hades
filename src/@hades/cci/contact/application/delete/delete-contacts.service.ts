import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IContactRepository } from './../../domain/contact.repository';
import { AddContactsContextEvent } from './../events/add-contacts-context.event';

@Injectable()
export class DeleteContactsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IContactRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<void>
    {   
        // get object to delete
        const contacts = await this.repository.get(queryStatement);

        await this.repository.delete(queryStatement);

        // create AddContactsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const contactsRegistered = this.publisher.mergeObjectContext(new AddContactsContextEvent(contacts));

        contactsRegistered.deleted(); // apply event to model events
        contactsRegistered.commit(); // commit all events of model
    }
}