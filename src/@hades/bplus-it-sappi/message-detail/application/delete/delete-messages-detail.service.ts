import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { AddMessagesDetailContextEvent } from './../events/add-messages-detail-context.event';

@Injectable()
export class DeleteMessagesDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IMessageDetailRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const messagesDetail = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);

        // create AddMessagesDetailContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const messagesDetailRegistered = this.publisher.mergeObjectContext(new AddMessagesDetailContextEvent(messagesDetail));

        messagesDetailRegistered.deleted(); // apply event to model events
        messagesDetailRegistered.commit(); // commit all events of modelx
    }
}