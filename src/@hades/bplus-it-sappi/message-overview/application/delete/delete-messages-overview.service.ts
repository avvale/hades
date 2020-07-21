import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { AddMessagesOverviewContextEvent } from './../events/add-messages-overview-context.event';

@Injectable()
export class DeleteMessagesOverviewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IMessageOverviewRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const messagesOverview = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);

        // create AddMessagesOverviewContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const messagesOverviewRegistered = this.publisher.mergeObjectContext(new AddMessagesOverviewContextEvent(messagesOverview));

        messagesOverviewRegistered.deleted(); // apply event to model events
        messagesOverviewRegistered.commit(); // commit all events of modelx
    }
}