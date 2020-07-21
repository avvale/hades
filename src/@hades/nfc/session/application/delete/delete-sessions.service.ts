import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ISessionRepository } from './../../domain/session.repository';
import { AddSessionsContextEvent } from './../events/add-sessions-context.event';

@Injectable()
export class DeleteSessionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISessionRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<void>
    {   
        // get object to delete
        const sessions = await this.repository.get(queryStatements);

        await this.repository.delete(queryStatements);

        // create AddSessionsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const sessionsRegistered = this.publisher.mergeObjectContext(new AddSessionsContextEvent(sessions));

        sessionsRegistered.deleted(); // apply event to model events
        sessionsRegistered.commit(); // commit all events of modelx
    }
}