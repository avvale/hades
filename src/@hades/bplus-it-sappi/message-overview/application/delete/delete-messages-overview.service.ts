import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';

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

        // TODO a falta de definir eventos
        // insert EventBus in object, to be able to apply and commit events
        // const messagesOverviewRegistered = this.publisher.mergeObjectContext(messagesOverview);
        
        // messagesOverviewRegistered.deleted(messagesOverview); // apply event to model events
        // messagesOverviewRegistered.commit(); // commit all events of model
    }
}