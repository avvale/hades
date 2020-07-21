import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IContactRepository } from './../../domain/contact.repository';
import { AddContactsContextEvent } from './../events/add-contacts-context.event';

@Injectable()
export class DeleteContactsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IContactRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const contacts = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);

        // create AddContactsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const contactsRegistered = this.publisher.mergeObjectContext(new AddContactsContextEvent(contacts));

        contactsRegistered.deleted(); // apply event to model events
        contactsRegistered.commit(); // commit all events of modelx
    }
}