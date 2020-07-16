import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IContactRepository } from './../../domain/contact.repository';

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

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const contactsRegistered = this.publisher.mergeObjectContext(contacts);
        
        // contactsRegistered.deleted(contacts); // apply event to model events
        // contactsRegistered.commit(); // commit all events of model
    }
}